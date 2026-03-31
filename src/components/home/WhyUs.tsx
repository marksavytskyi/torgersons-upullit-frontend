import React from 'react';
import { ThumbsUp, Camera, Navigation, RefreshCw, Search, LayoutGrid } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const benefits = [
  {
    icon: ThumbsUp,
    title: 'No Wasted Trips',
    description: "Check availability before leaving home. Know exactly what's in the yard — and where it is.",
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: Camera,
    title: 'Photo-Verified',
    description: 'Every vehicle is photographed by staff before listing. What you see is what\'s there.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Navigation,
    title: 'Exact Slot Location',
    description: 'No guessing. Each car has a slot code. Walk directly to Row A, Slot 3. Done.',
    color: 'text-orange-500 bg-orange-50',
  },
  {
    icon: RefreshCw,
    title: 'Always Current',
    description: 'Inventory refreshes daily. Stripped or removed cars drop from the live list immediately.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: Search,
    title: 'Free to Search',
    description: 'Filter by make, model, year, and status from any device. No account, no cost.',
    color: 'text-pink-600 bg-pink-50',
  },
  {
    icon: LayoutGrid,
    title: 'Smart Organization',
    description: 'Our slot system makes the yard easier for customers and staff alike. Less chaos, more finds.',
    color: 'text-emerald-600 bg-emerald-50',
  },
];

export function WhyUs() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="up" className="text-center mb-14">
          <p className="section-eyebrow justify-center">Why Choose Us</p>
          <h2 className="section-heading mb-4">Built for the Modern Parts Shopper</h2>
          <p className="section-sub max-w-xl mx-auto">
            We took the salvage yard and made it work like a tech product — without losing the savings.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <ScrollReveal key={b.title} variant="up" delay={i * 70}>
                <div className="group p-7 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-card-hover transition-all duration-250 card-lift h-full">
                  <div className={`inline-flex items-center justify-center w-11 h-11 ${b.color} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
