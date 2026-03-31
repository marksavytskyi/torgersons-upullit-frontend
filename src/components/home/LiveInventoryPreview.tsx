import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { MOCK_VEHICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/inventory/VehicleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function LiveInventoryPreview() {
  const preview = MOCK_VEHICLES.filter((v) => v.status === 'available').slice(0, 4);

  return (
    <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
          <ScrollReveal variant="left">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <p className="section-eyebrow">Live Inventory</p>
            </div>
            <h2 className="section-heading">Recently Added Vehicles</h2>
            <p className="text-slate-500 mt-2 text-base">
              All vehicles are photo-verified and slot-assigned.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="right">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-bold text-sm border border-orange-200 bg-white hover:bg-orange-50 px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm"
            >
              View All Vehicles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {preview.map((vehicle, i) => (
            <ScrollReveal key={vehicle.id} variant="up" delay={i * 80}>
              <VehicleCard vehicle={vehicle} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal variant="up" delay={200} className="mt-12 text-center">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 shadow-brand hover:shadow-brand-lg text-base"
          >
            View Full Inventory
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
