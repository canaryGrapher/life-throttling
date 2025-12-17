import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LifeThrottling - Adventure Portfolio',
  description: 'Capturing the essence of freedom through exploration. Exploring the unexplored trails and locations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

