import type { Metadata } from 'next';
import { Lexend_Deca } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const lexendDeca = Lexend_Deca({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventFlow',
  description: 'EventFlow is a platform where you can find and share events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={lexendDeca.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
