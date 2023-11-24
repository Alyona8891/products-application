import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Products Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
