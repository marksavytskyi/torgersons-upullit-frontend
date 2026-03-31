import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Torgerson's U-Pull-It — Salvage Yard Inventory",
    template: "%s | Torgerson's U-Pull-It",
  },
  description:
    "Find the exact part you need. Browse photo-verified, slot-mapped inventory at Torgerson's U-Pull-It auto salvage yard.",
  keywords: ['u-pull-it', 'salvage yard', 'auto parts', 'junkyard', 'car parts', 'Torgersons'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
