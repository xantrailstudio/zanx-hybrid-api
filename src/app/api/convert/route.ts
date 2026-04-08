export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { Readable } from 'stream';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');
  const targetFormat = (searchParams.get('to') || 'jpeg').toLowerCase();

  // 1. Invalid URL Check
  if (!imageUrl || !imageUrl.startsWith('http')) {
    return NextResponse.json(
      { error: "Invalid or missing image URL" },
      { status: 400, headers: corsHeaders }
    );
  }

  // 2. Format Support Check
  const supportedFormats = ['jpg', 'jpeg', 'webp', 'avif', 'png'];
  if (!supportedFormats.includes(targetFormat)) {
    return NextResponse.json(
      { error: "Output format not supported." },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // 3. Robust Fetch with Timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s

    const response = await fetch(imageUrl, { signal: controller.signal }).finally(() => {
      clearTimeout(timeoutId);
    });

    if (response.status === 404) {
      return NextResponse.json(
        { error: "Source image not found" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch source image. Ensure the URL is public and CORS-friendly." },
        { status: 400, headers: corsHeaders }
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/') && !contentType.includes('application/octet-stream')) {
      // Some servers use octet-stream for images, we allow it if the user explicitly provided it
    }

    if (!response.body) {
      return NextResponse.json(
        { error: "Unable to fetch source image. Ensure the URL is public and CORS-friendly." },
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Multi-Format Transformer Logic
    let transformer;
    let outputMimeType;
    let extension;

    switch (targetFormat) {
      case 'webp':
        transformer = (sharp().webp({ quality: 80 }) as any).withMetadata(false);
        outputMimeType = 'image/webp';
        extension = 'webp';
        break;
      case 'avif':
        transformer = (sharp().avif({ quality: 50 }) as any).withMetadata(false);
        outputMimeType = 'image/avif';
        extension = 'avif';
        break;
      case 'png':
        transformer = (sharp().png({ compressionLevel: 9 }) as any).withMetadata(false);
        outputMimeType = 'image/png';
        extension = 'png';
        break;
      default: // jpg/jpeg
        transformer = (sharp().jpeg({ quality: 90, progressive: true }) as any).withMetadata(false);
        outputMimeType = 'image/jpeg';
        extension = 'jpg';
        break;
    }

    // 5. Streaming Pipeline
    // @ts-ignore - response.body is a Web ReadableStream
    const nodeStream = Readable.fromWeb(response.body);
    const transformedStream = nodeStream.pipe(transformer);
    const webStream = Readable.toWeb(transformedStream) as ReadableStream;

    return new NextResponse(webStream, {
      headers: {
        ...corsHeaders,
        'Content-Type': outputMimeType,
        'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate',
        'Content-Disposition': `inline; filename="converted.${extension}"`,
      },
    });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Source image request timed out" },
        { status: 504, headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { error: "Unable to fetch source image. Ensure the URL is public and CORS-friendly." },
      { status: 400, headers: corsHeaders }
    );
  }
}
