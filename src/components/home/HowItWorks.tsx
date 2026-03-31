import React from 'react';
import { Search, MapPin, Wrench } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const steps = [
  {
    icon: Search,
    title: 'Search Online',
    description:
      'Browse our live inventory from home. Filter by make, model, year. See photos and condition — before you drive.',
    color: 'bg-blue-50 text-blue-600',
    num: '01',
  },
  {
    icon: MapPin,
    title: 'Note the Slot',
    description:
      "Every car has a slot code like A-03. You'll see it right on the listing. Walk directly to that row — no more wandering the lot.",
    color: 'bg-orange-50 text-orange-500',
    num: '02',
  },
  {
    icon: Wrench,
    title: 'Pull Your Part',
    description:
      'Walk straight to the right slot. Our rows are clearly marked. Or scan the QR code on the post for live info on the spot.',
    color: 'bg-emerald-50 text-emerald-600',
    num: '03',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="up" className="text-center mb-16">
          <p className="section-eyebrow justify-center">Simple Process</p>
          <h2 className="section-heading mb-4">
            How Torgerson's Works
          </h2>
          <p className="section-sub max-w-xl mx-auto">
            Stop wandering. Start finding. Our slot system eliminates guesswork from salvage shopping.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+3rem)] right-[calc(16.67%+3rem)] h-px bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.title} variant="up" delay={idx * 120}>
                <div className="relative flex flex-col items-center text-center group">
                  {/* Icon circle */}
                  <div className="relative mb-7 z-10">
                    <div className={`flex items-center justify-center w-28 h-28 ${step.color} rounded-3xl shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                      {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
