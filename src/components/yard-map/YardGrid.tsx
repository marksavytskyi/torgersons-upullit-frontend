import React from 'react';
import { Slot } from '@/types';
import { SlotCell } from './SlotCell';

interface YardGridProps {
  slots: Slot[];
}

export function YardGrid({ slots }: YardGridProps) {
  // Group by row
  const rows = ['A', 'B', 'C', 'D'];
  const slotsByRow: Record<string, Slot[]> = {};

  rows.forEach((row) => {
    slotsByRow[row] = slots
      .filter((s) => s.row === row)
      .sort((a, b) => a.number - b.number);
  });

  const rowLabels: Record<string, string> = {
    A: 'Row A — North Entrance',
    B: 'Row B',
    C: 'Row C',
    D: 'Row D — South End',
  };

  return (
    <div className="flex flex-col gap-6">
      {rows.map((row) => (
        <div key={row}>
          {/* Row header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-8 h-8 bg-slate-800 text-white text-sm font-black rounded-lg flex-shrink-0">
              {row}
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-sm">
                {rowLabels[row]}
              </p>
              <p className="text-xs text-slate-400">
                {slotsByRow[row].filter((s) => s.status === 'occupied').length} occupied ·{' '}
                {slotsByRow[row].filter((s) => s.status === 'free').length} free
              </p>
            </div>
          </div>

          {/* Slot cells */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slotsByRow[row].map((slot) => (
              <SlotCell key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
