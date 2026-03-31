import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import { Vehicle } from '@/types';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatUpdatedAt } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 border border-slate-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: '16/10' }}>
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Slot badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-lg tracking-wider">
            {vehicle.slotCode}
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-3 right-3">
          <StatusPill status={vehicle.status} size="sm" />
        </div>

        {/* Updated badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-lg">
          <Clock className="w-3 h-3" />
          {formatUpdatedAt(vehicle.updatedAt)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-black text-slate-900 text-base leading-tight mb-0.5 group-hover:text-orange-500 transition-colors duration-200">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.trim && (
          <p className="text-slate-400 text-xs mb-2.5">{vehicle.trim}</p>
        )}

        {/* Lot number */}
        <span className="inline-block text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg mb-3">
          {vehicle.lotNumber}
        </span>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-medium">Slot {vehicle.slotCode}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-orange-500 text-xs font-bold group-hover:gap-1.5 transition-all duration-150">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
