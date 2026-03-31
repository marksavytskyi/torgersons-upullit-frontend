import React from 'react';
import { QrCode, Smartphone, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const points = [
  {
    icon: Smartphone,
    title: 'Works with any phone',
    desc: 'No app download. Point your camera, see the vehicle info in seconds.',
  },
  {
    icon: RefreshCw,
    title: 'Always up to date',
    desc: "Slot page reflects today's status — even if the vehicle changed this morning.",
  },
  {
    icon: CheckCircle2,
    title: 'Full vehicle info',
    desc: 'Year, make, model, lot number, status, photos — right in your browser.',
  },
];

export function QRExplainer() {
  return (
    <section className="bg-slate-950 py-20 lg:py-28 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-light opacity-5" />

      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <ScrollReveal variant="left">
            <p className="section-eyebrow text-orange-400">Slot Technology</p>
            <h2 className="section-heading text-white mb-6">
              Every Slot Has a QR Code
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Each parking slot in our yard has a permanent QR code on a post.
              Point your phone and instantly see what's parked there — or if the slot is empty.
            </p>

            <div className="space-y-6">
              {points.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div key={pt.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-500/15 border border-orange-500/25 rounded-xl flex-shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{pt.title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right: Phone mockup */}
          <ScrollReveal variant="right" className="flex items-center justify-center">
            <div className="relative">
              {/* Phone */}
              <div className="w-[260px] bg-slate-900 border border-slate-800 rounded-[2.5rem] p-3 shadow-2xl shadow-black/50">
                <div className="w-16 h-4 bg-slate-950 rounded-full mx-auto mb-3" />
                <div className="bg-white rounded-[1.75rem] overflow-hidden">
                  {/* Browser bar */}
                  <div className="bg-slate-100 px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 bg-white rounded-md px-2 py-0.5 flex-1 truncate">
                      torgersonsupullit.com/slot/A-03
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                      <span className="text-[11px] font-bold text-emerald-700">Slot Occupied · A-03</span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80"
                      alt="Vehicle"
                      className="w-full h-28 object-cover rounded-xl mb-3"
                    />
                    <p className="font-black text-slate-900 text-sm">2019 Ford F-150</p>
                    <p className="text-slate-400 text-[10px] mb-3">LOT-2024-003 · XLT SuperCrew</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Available</span>
                      <span className="text-orange-500 text-[10px] font-bold">Details →</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>

              {/* QR badge */}
              <div className="absolute -top-5 -right-8 bg-white rounded-2xl p-3 shadow-xl border border-slate-100">
                <QrCode className="w-12 h-12 text-slate-900" />
                <p className="text-[10px] font-bold text-slate-500 text-center mt-1">SCAN ME</p>
              </div>

              {/* Slot post badge */}
              <div className="absolute -bottom-4 -left-6 bg-orange-500 text-white rounded-xl px-3.5 py-2 shadow-brand">
                <p className="text-xs font-black tracking-wider">SLOT A-03</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
