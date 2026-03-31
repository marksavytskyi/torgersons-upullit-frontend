'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
  { href: '/',          label: 'Home'           },
  { href: '/inventory', label: 'Inventory'      },
  { href: '/prices',    label: 'Price List'     },
  { href: '/yard-map',  label: 'Yard Map'       },
  { href: '/contact',   label: 'Hours & Contact'},
];

function FindUsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Find Us</h2>
            <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              1730 Old Hwy 603, Napavine, WA 98532
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map */}
        <div className="h-72 sm:h-80 bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.5!2d-122.9!3d46.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1730+Old+Hwy+603%2C+Napavine%2C+WA+98532!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Torgerson's U-Pull-It location"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center gap-3 bg-slate-50 border-t border-slate-100">
          <div className="flex-1 grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div><span className="font-semibold text-slate-800">Mon–Fri</span><br />8:00 AM – 5:00 PM</div>
            <div><span className="font-semibold text-slate-800">Sat</span><br />8:00 AM – 4:00 PM</div>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=1730+Old+Hwy+603,+Napavine,+WA+98532"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm flex-shrink-0"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [mapOpen, setMapOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeMap = useCallback(() => setMapOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e2e8f0]'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" variant="dark" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'text-orange-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setMapOpen(true)}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Find Us
              </button>
              <div className="w-px h-5 bg-slate-200" />
              <Link
                href="/admin"
                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === '/admin'
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                Admin
              </Link>
              <Link
                href="/inventory"
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Browse Parts
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setMapOpen(true); }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              Find Us
            </button>
            <Link href="/admin" className="px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-slate-50 transition-colors">Admin</Link>
            <div className="pt-2 pb-1">
              <Link
                href="/inventory"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors w-full"
              >
                Browse Parts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mapOpen && <FindUsModal onClose={closeMap} />}
    </>
  );
}
