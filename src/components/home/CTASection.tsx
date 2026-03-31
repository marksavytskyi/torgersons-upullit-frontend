import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Phone, MapPin } from 'lucide-react';

export function CTASection() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA block */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden px-8 py-16 lg:px-16 text-center">
          {/* Background dots */}
          <div className="absolute inset-0 bg-dots opacity-10" />
          {/* Orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
              </span>
              200+ Vehicles In Stock
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
              Ready to Find<br />Your Part?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Browse our full inventory, find your vehicle's slot code, and walk straight to it.
              No guessing, no wasted trips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 shadow-brand hover:shadow-brand-lg text-base"
              >
                Browse Full Inventory
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/yard-map"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-10 py-4 rounded-2xl border border-white/15 transition-all duration-200 text-base"
              >
                View Yard Map
              </Link>
            </div>

            {/* Info row */}
            <div className="border-t border-slate-700 pt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span><strong className="text-slate-200">Mon–Sat</strong> 8AM – 5PM</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span><strong className="text-slate-200">Sunday</strong> 9AM – 3PM</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:5551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Napavine, WA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
