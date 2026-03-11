import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nuvic Demo Hub',
  description: 'Private Whop dashboard app for owner operations.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
