import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dots opacity-60" />

      {/* Top orange accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-3.5 py-2 rounded-full mb-7 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <Zap className="w-3.5 h-3.5" />
              QR-Powered Smart Yard
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-black text-slate-900 leading-[1.04] tracking-tight mb-6 animate-fade-up delay-100">
              Find the Part.
              <br />
              <span className="text-gradient">Know the Slot.</span>
              <br />
              <span className="text-slate-700 text-4xl sm:text-5xl lg:text-5xl font-bold">
                Skip the Guesswork.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-9 animate-fade-up delay-200">
              Torgerson's U-Pull-It gives you photo-verified, slot-mapped inventory
              for every vehicle in the yard. Search from home, walk straight to it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up delay-300">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-brand hover:shadow-brand-lg text-base"
              >
                Browse Inventory
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-2xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md text-base"
              >
                How It Works
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 animate-fade-up delay-400">
              {[
                { icon: CheckCircle2, text: 'Free to search' },
                { icon: CheckCircle2, text: 'Updated daily' },
                { icon: CheckCircle2, text: '200+ vehicles' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Visual mockup ── */}
          <div className="hidden lg:flex flex-col gap-4 items-center justify-center animate-slide-right delay-200">

            {/* Main vehicle card */}
            <div className="w-[320px] bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100 animate-float">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=640&q=80"
                  alt="Vehicle"
                  className="w-full h-48 object-cover"
                />
                {/* Slot badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg tracking-wider">
                    SLOT A-03
                  </span>
                </div>
                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur text-emerald-700 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm border border-emerald-100">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Available
                  </span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="px-5 pb-5 pt-2">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-black text-slate-900 text-lg leading-tight">2019 Ford F-150</p>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">LOT-2024-003 · XLT SuperCrew</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    Row A, Slot 03
                  </div>
                  <span className="text-orange-500 text-xs font-bold flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Live badge */}
            <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-5 py-3.5 shadow-xl w-[320px]">
              <div className="relative">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-bold">Live Inventory</p>
                <p className="text-slate-400 text-xs">10 vehicles tracked across 16 slots</p>
              </div>
              <div className="bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                Live
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
