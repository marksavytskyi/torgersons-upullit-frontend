import React from 'react';
import {
  MapPin, Phone, Mail, Clock, ChevronRight,
  Facebook, Instagram, MessageSquare
} from 'lucide-react';

export const metadata = {
  title: "Hours & Contact — Torgerson's U-Pull-It",
  description: "Yard hours, phone number, address and contact form for Torgerson's U-Pull-It in Napavine, WA.",
};

const schedule = [
  { day: 'Monday',    hours: '8:00 AM – 5:00 PM' },
  { day: 'Tuesday',   hours: '8:00 AM – 5:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Thursday',  hours: '8:00 AM – 5:00 PM' },
  { day: 'Friday',    hours: '8:00 AM – 5:00 PM' },
  { day: 'Saturday',  hours: '8:00 AM – 5:00 PM' },
  { day: 'Sunday',    hours: '9:00 AM – 3:00 PM' },
];

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="bg-slate-900 pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-eyebrow justify-center text-orange-400">We&apos;re here to help</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Hours &amp; Contact
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Come visit us at the yard, give us a call, or send a message — we respond fast.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* ══ LEFT ════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* Hours */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
              <div className="bg-orange-500 px-6 py-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Yard</p>
                  <p className="text-white font-black text-xl">Hours of Operation</p>
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {schedule.map((row) => {
                  // Highlight today client-side via a data attribute trick — safe for SSR
                  return (
                    <div
                      key={row.day}
                      data-day={row.day}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-700">{row.day}</span>
                      <span className="text-sm font-medium text-slate-500">{row.hours}</span>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <p className="text-slate-400 text-xs leading-relaxed">
                  Last entry accepted 30 minutes before closing.
                  Closed on major holidays — call to confirm.
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <p className="font-black text-slate-900 text-lg">Contact Information</p>
              </div>
              <div className="divide-y divide-slate-50">
                <a href="tel:+13605551234"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-orange-100 group-hover:bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Phone</p>
                    <p className="text-slate-900 font-bold text-sm group-hover:text-orange-600 transition-colors">(360) 555-1234</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400" />
                </a>

                <a href="mailto:info@torgersonsupullit.com"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors">info@torgersonsupullit.com</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                </a>

                <a
                  href="https://maps.google.com/?q=1730+Old+Hwy+603+Napavine+WA+98532"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Address</p>
                    <p className="text-slate-900 font-bold text-sm leading-snug group-hover:text-emerald-600 transition-colors">
                      1730 Old Hwy 603<br />
                      <span className="font-medium text-slate-500">Napavine, WA 98532</span>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3 rounded-2xl text-sm transition-colors">
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a href="#" className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3 rounded-2xl text-sm transition-colors"
                style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>

          {/* ══ RIGHT ═══════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* Contact form */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="font-black text-slate-900">Send Us a Message</p>
                  <p className="text-slate-400 text-xs">We typically respond within a few hours.</p>
                </div>
              </div>

              <div className="px-6 py-6 flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">First Name</label>
                    <input type="text" placeholder="John"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Last Name</label>
                    <input type="text" placeholder="Smith"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="(360) 555-0000"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input type="email" placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Subject</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white">
                    <option value="">Select a topic…</option>
                    <option>Part / Vehicle Availability</option>
                    <option>Pricing Question</option>
                    <option>Yard Hours &amp; Location</option>
                    <option>Sell My Vehicle</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea rows={4}
                    placeholder="What part are you looking for? Include year, make, and model if possible…"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none" />
                </div>

                <button
                  type="button"
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm tracking-wide"
                >
                  Send Message →
                </button>

                <p className="text-slate-400 text-xs text-center">
                  Or call us at{' '}
                  <a href="tel:+13605551234" className="text-orange-500 font-bold hover:underline">(360) 555-1234</a>
                </p>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-card relative" style={{ height: 260 }}>
              <iframe
                title="Location"
                src="https://maps.google.com/maps?q=1730+Old+Hwy+603,+Napavine,+WA+98532&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
              <a
                href="https://maps.google.com/?q=1730+Old+Hwy+603+Napavine+WA+98532"
                target="_blank" rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Open in Maps
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
