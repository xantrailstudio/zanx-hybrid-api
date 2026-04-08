import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZanX Universal Image API",
  description: "High-speed, headless image conversion API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
