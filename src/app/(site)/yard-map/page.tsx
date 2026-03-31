import React, { Suspense } from 'react';
import { YardMapFull } from '@/components/yard-map/YardMapFull';

export const metadata = {
  title: "Yard Map – Torgerson's U-Pull-It",
  description: 'Visual slot map of the full yard with 450 slots across zones A–H.',
};

export default function YardMapPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="section-eyebrow">Interactive</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Yard Map</h1>
          <p className="text-slate-500 mt-1">
            450 slots across 8 zones. Click any slot to see current vehicle info.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={null}>
          <YardMapFull />
        </Suspense>
      </div>
    </main>
  );
}
