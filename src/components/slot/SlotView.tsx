import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, PackageOpen, Info } from 'lucide-react';
import { Slot } from '@/types';
import { StatusPill } from '@/components/ui/StatusPill';
import { UpdatedAt } from '@/components/ui/UpdatedAt';

interface SlotViewProps {
  slot: Slot;
}

export function SlotView({ slot }: SlotViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white font-bold text-sm"
        >
          <span className="text-amber-400">Yard</span>Track
        </Link>
        <Link
          href="/inventory"
          className="text-slate-300 text-xs hover:text-white transition-colors"
        >
          Full Inventory →
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full px-4 py-8">
        {/* Slot header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-2xl shadow-lg mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-xl font-black text-2xl tracking-wider shadow-lg mb-3">
            {slot.slotCode}
          </div>
          <p className="text-slate-500 text-sm">
            Row {slot.row} · Slot {slot.number.toString().padStart(2, '0')}
          </p>
        </div>

        {/* Content based on status */}
        {slot.status === 'free' || slot.currentVehicle === null ? (
          /* Empty slot */
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mx-auto mb-4">
              <PackageOpen className="w-7 h-7 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Slot Available
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              No vehicle is currently parked in this slot.
            </p>
            <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-2.5 rounded-xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Empty — Available for Assignment
            </div>
          </div>
        ) : (
          /* Occupied slot */
          <div>
            {/* Status banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-5">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-semibold text-sm">
                  Slot Occupied
                </p>
                <p className="text-amber-600 text-xs">
                  Vehicle currently in this slot
                </p>
              </div>
            </div>

            {/* Vehicle card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-5">
              {/* Vehicle image */}
              <div className="relative">
                <img
                  src={slot.currentVehicle.images[0]}
                  alt={`${slot.currentVehicle.year} ${slot.currentVehicle.make} ${slot.currentVehicle.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusPill status={slot.currentVehicle.status} size="sm" />
                </div>
              </div>

              {/* Vehicle info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {slot.currentVehicle.year} {slot.currentVehicle.make}{' '}
                      {slot.currentVehicle.model}
                    </h2>
                    {slot.currentVehicle.trim && (
                      <p className="text-slate-500 text-sm">
                        {slot.currentVehicle.trim}
                      </p>
                    )}
                  </div>
                </div>

                {/* Lot number */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg">
                    {slot.currentVehicle.lotNumber}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-0.5">Color</p>
                    <p className="font-semibold text-slate-800">
                      {slot.currentVehicle.color}
                    </p>
                  </div>
                  {slot.currentVehicle.mileage && (
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-400 text-xs mb-0.5">Mileage</p>
                      <p className="font-semibold text-slate-800">
                        {slot.currentVehicle.mileage.toLocaleString()} mi
                      </p>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {slot.currentVehicle.notes && (
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <p>{slot.currentVehicle.notes}</p>
                  </div>
                )}

                {/* Updated */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <UpdatedAt isoString={slot.currentVehicle.updatedAt} />
                  <StatusPill status={slot.currentVehicle.status} size="sm" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/inventory/${slot.currentVehicle.id}`}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-4 rounded-xl transition-colors shadow-sm text-base w-full"
            >
              View Full Details
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Bottom nav */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs mb-3">
            Looking for a different vehicle?
          </p>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold text-sm"
          >
            Browse Full Inventory
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
