import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Logo size="md" variant="dark" href="/" className="[&_span:first-child>span:first-child]:bg-orange-500 [&_span:last-child>span:first-child]:text-white [&_span:last-child>span:last-child]:text-white" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Torgerson's U-Pull-It is a modern self-service auto salvage yard.
              Search inventory online, find your slot, pull your own parts and save.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>1730 Old Hwy 603, Napavine, WA 98532</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:5551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@torgersonsupullit.com" className="hover:text-white transition-colors">info@torgersonsupullit.com</a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/inventory', label: 'Browse Inventory' },
                { href: '/yard-map',  label: 'Yard Map'         },
                { href: '/#how-it-works', label: 'How It Works' },
                { href: '/admin',     label: 'Admin Panel'      },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Yard Hours
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span>Mon – Fri</span>
                <span className="text-slate-300">8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-slate-300">8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-slate-300">9:00 AM – 3:00 PM</span>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Inventory updated daily
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Torgerson's U-Pull-It. All rights reserved.
          </p>
          <a
            href="https://torgersonsupullit.com"
            className="text-slate-600 hover:text-orange-400 text-sm transition-colors"
          >
            torgersonsupullit.com
          </a>
        </div>
      </div>
    </footer>
  );
}
