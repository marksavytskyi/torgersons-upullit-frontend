import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Hash,
  Palette,
  Gauge,
  Settings,
  ExternalLink,
  Info,
  QrCode,
  ChevronRight,
} from 'lucide-react';
import { getVehicleById } from '@/lib/api';
import { MOCK_VEHICLES } from '@/data/mockData';
import { StatusPill } from '@/components/ui/StatusPill';
import { UpdatedAt } from '@/components/ui/UpdatedAt';
import { maskVin, formatMileage } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

// Generate static params for all mock vehicles
export async function generateStaticParams() {
  return MOCK_VEHICLES.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const vehicle = await getVehicleById(params.id);
  if (!vehicle) return { title: 'Vehicle Not Found' };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.lotNumber}`,
    description: `View details for ${vehicle.year} ${vehicle.make} ${vehicle.model} at slot ${vehicle.slotCode}.`,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const vehicle = await getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  const detailItems = [
    {
      icon: Hash,
      label: 'VIN (Partial)',
      value: maskVin(vehicle.vin),
      mono: true,
    },
    {
      icon: Palette,
      label: 'Color',
      value: vehicle.color,
    },
    ...(vehicle.mileage
      ? [
          {
            icon: Gauge,
            label: 'Mileage',
            value: formatMileage(vehicle.mileage),
          },
        ]
      : []),
    ...(vehicle.engine
      ? [
          {
            icon: Settings,
            label: 'Engine',
            value: vehicle.engine,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Inventory
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-3">
            {/* Main image */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-3">
              <img
                src={vehicle.images[0]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full aspect-video object-cover"
              />
            </div>

            {/* Thumbnail strip */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${
                      idx === 0
                        ? 'border-amber-500'
                        : 'border-slate-200 hover:border-amber-300'
                    } transition-colors cursor-pointer`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* How slot system works — bottom section */}
            <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <QrCode className="w-6 h-6 text-amber-400" />
                <h3 className="font-bold text-base">How the Slot System Works</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Every vehicle in our yard is assigned a specific slot with a unique
                code. Each slot has a QR code post. When you arrive at the yard,
                walk to the row letter, then find the slot number — it&apos;s clearly
                marked.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { step: '1', label: 'Note slot code online' },
                  { step: '2', label: 'Walk to correct row' },
                  { step: '3', label: 'Find the slot number' },
                ].map((s) => (
                  <div key={s.step} className="bg-slate-700 rounded-lg p-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-1.5">
                      {s.step}
                    </div>
                    <p className="text-slate-300">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
              {/* Title */}
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.trim && (
                <p className="text-slate-500 text-sm mb-4">{vehicle.trim}</p>
              )}

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {/* Lot number */}
                <span className="font-mono text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg font-medium">
                  {vehicle.lotNumber}
                </span>
                {/* Status */}
                <StatusPill status={vehicle.status} />
              </div>

              {/* Slot badge — prominent */}
              <Link
                href={`/slot/${encodeURIComponent(vehicle.slotCode)}`}
                className="flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-5 hover:bg-amber-100 transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-amber-500 rounded-xl flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-amber-700 font-medium mb-0.5">
                    Slot Location
                  </p>
                  <p className="text-2xl font-black text-amber-800 tracking-widest">
                    {vehicle.slotCode}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Detail items */}
              <div className="divide-y divide-slate-100 mb-5">
                {detailItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`text-sm font-semibold text-slate-800 ${
                          item.mono ? 'font-mono' : ''
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  );
                })}
                {vehicle.sourceName && (
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <ExternalLink className="w-4 h-4" />
                      <span>Source</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {vehicle.sourceName}
                    </span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {vehicle.notes && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-5 text-xs text-blue-700 leading-relaxed">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <p>{vehicle.notes}</p>
                </div>
              )}

              {/* Updated */}
              <div className="mb-5">
                <UpdatedAt isoString={vehicle.updatedAt} />
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href={`/slot/${encodeURIComponent(vehicle.slotCode)}`}
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors shadow-sm text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Find This Car in the Yard
                </Link>
                <Link
                  href="/yard-map"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 transition-colors text-sm"
                >
                  View Yard Map
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
