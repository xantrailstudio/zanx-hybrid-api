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

  if (!imageUrl) {
    return NextResponse.json(
      { error: 'Missing image URL' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // Validate URL format
    new URL(imageUrl);
  } catch (e) {
    return NextResponse.json(
      { error: 'Invalid image URL format' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // 1. Fetch the source image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.statusText}` },
        { status: response.status, headers: corsHeaders }
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'URL did not point to a valid image' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: 'Source image has no body' },
        { status: 500, headers: corsHeaders }
      );
    }

    // 2. Convert Web ReadableStream to Node.js Readable stream
    // @ts-ignore - response.body is a Web ReadableStream
    const nodeStream = Readable.fromWeb(response.body);

    // 3. Initialize sharp transformer
    const transformer = sharp().jpeg({
      quality: 90,
      progressive: true,
    });

    // 4. Pipe source stream into sharp
    const transformedStream = nodeStream.pipe(transformer);

    // 5. Convert Node.js Readable back to Web ReadableStream for NextResponse
    const webStream = Readable.toWeb(transformedStream) as ReadableStream;

    // 6. Return the streaming response
    return new NextResponse(webStream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate',
        'Content-Disposition': 'inline; filename="converted.jpg"',
      },
    });
  } catch (error: any) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Internal server error during conversion', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
