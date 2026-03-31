import React from 'react';
import Link from 'next/link';
import { Slot } from '@/types';

interface SlotCellProps {
  slot: Slot;
}

const statusStyles: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  occupied: {
    bg: 'bg-amber-50 hover:bg-amber-100',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
    label: 'Occupied',
  },
  free: {
    bg: 'bg-emerald-50 hover:bg-emerald-100',
    border: 'border-emerald-300',
    dot: 'bg-emerald-500',
    label: 'Free',
  },
  reserved: {
    bg: 'bg-slate-100 hover:bg-slate-200',
    border: 'border-slate-300',
    dot: 'bg-slate-400',
    label: 'Reserved',
  },
};

export function SlotCell({ slot }: SlotCellProps) {
  const style = statusStyles[slot.status];

  return (
    <Link
      href={`/slot/${encodeURIComponent(slot.slotCode)}`}
      className={`group block p-4 rounded-xl border-2 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 ${style.bg} ${style.border}`}
    >
      {/* Slot code */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-black text-slate-800 text-base tracking-wide">
          {slot.slotCode}
        </span>
        <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
      </div>

      {/* Status label */}
      <p className="text-xs font-semibold text-slate-500 mb-2">{style.label}</p>

      {/* Vehicle info or empty */}
      {slot.currentVehicle ? (
        <div>
          <p className="text-xs font-semibold text-slate-700 truncate leading-tight">
            {slot.currentVehicle.year} {slot.currentVehicle.make}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {slot.currentVehicle.model}
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Empty</p>
      )}
    </Link>
  );
}
