import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'YardTrack — Smart Salvage Yard Inventory',
    template: '%s | YardTrack',
  },
  description:
    'Find the exact part you need. Know the slot. Skip the guesswork. YardTrack is the smartest way to search a U-Pull-It auto salvage yard.',
  keywords: ['u-pull-it', 'salvage yard', 'auto parts', 'junkyard', 'car parts'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
