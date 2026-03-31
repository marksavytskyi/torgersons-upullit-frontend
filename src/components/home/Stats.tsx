import React from 'react';
import { Car, Grid3X3, RefreshCw, Search } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const stats = [
  { icon: Car,       value: '200+',  label: 'Vehicles In Yard',  sub: 'Across all rows'       },
  { icon: Grid3X3,   value: '50',    label: 'Yard Slots',        sub: 'Clearly marked'        },
  { icon: RefreshCw, value: 'Daily', label: 'Photo Updates',     sub: 'Staff-verified'        },
  { icon: Search,    value: 'Free',  label: 'To Search',         sub: 'No account needed'     },
];

export function Stats() {
  return (
    <section className="bg-white py-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden shadow-card">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} variant="up" delay={i * 80} className="bg-white">
                <div className="flex flex-col items-center text-center p-7 group hover:bg-orange-50 transition-colors duration-200 h-full">
                  <div className="flex items-center justify-center w-11 h-11 bg-orange-100 group-hover:bg-orange-500 rounded-2xl mb-4 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-slate-700 mb-0.5">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.sub}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
