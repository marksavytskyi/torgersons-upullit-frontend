// Yard zone configuration matching real yard layout
// Total: 450 slots across zones A-H

export interface ZoneConfig {
  id: string;
  label: string;
  color: string;           // tailwind bg color
  borderColor: string;
  textColor: string;
  slots: number;
  rows: number;
  cols: number;
  description: string;
}

export const YARD_ZONES: ZoneConfig[] = [
  {
    id: 'A',
    label: 'A',
    color: 'bg-green-500',
    borderColor: 'border-green-600',
    textColor: 'text-green-700',
    slots: 50,
    rows: 2,
    cols: 25,
    description: 'Domestic Sedans & Compacts',
  },
  {
    id: 'B',
    label: 'B',
    color: 'bg-amber-500',
    borderColor: 'border-amber-600',
    textColor: 'text-amber-700',
    slots: 50,
    rows: 2,
    cols: 25,
    description: 'Trucks & SUVs',
  },
  {
    id: 'C',
    label: 'C',
    color: 'bg-yellow-400',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
    slots: 50,
    rows: 2,
    cols: 25,
    description: 'Import Sedans',
  },
  {
    id: 'D',
    label: 'D',
    color: 'bg-red-500',
    borderColor: 'border-red-600',
    textColor: 'text-red-700',
    slots: 100,
    rows: 4,
    cols: 25,
    description: 'Minivans & Crossovers',
  },
  {
    id: 'E1',
    label: 'E',
    color: 'bg-blue-500',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-700',
    slots: 50,
    rows: 2,
    cols: 25,
    description: 'Domestic Full-Size',
  },
  {
    id: 'E2',
    label: 'E',
    color: 'bg-blue-400',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    slots: 60,
    rows: 2,
    cols: 30,
    description: 'Domestic Full-Size (Overflow)',
  },
  {
    id: 'F',
    label: 'F',
    color: 'bg-teal-500',
    borderColor: 'border-teal-600',
    textColor: 'text-teal-700',
    slots: 50,
    rows: 2,
    cols: 25,
    description: 'Import Trucks & Vans',
  },
  {
    id: 'G',
    label: 'G',
    color: 'bg-slate-400',
    borderColor: 'border-slate-500',
    textColor: 'text-slate-600',
    slots: 30,
    rows: 2,
    cols: 15,
    description: 'Parts Vehicles / Stripped',
  },
  {
    id: 'H',
    label: 'H',
    color: 'bg-orange-400',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-700',
    slots: 10,
    rows: 1,
    cols: 10,
    description: 'Intake / New Arrivals',
  },
];

// Generate all 450 slot codes
export function generateSlots() {
  const slots: { code: string; zone: string; row: number; col: number }[] = [];
  
  for (const zone of YARD_ZONES) {
    let count = 0;
    for (let row = 1; row <= zone.rows; row++) {
      for (let col = 1; col <= zone.cols && count < zone.slots; col++) {
        count++;
        slots.push({
          code: `${zone.id}-${String(count).padStart(2, '0')}`,
          zone: zone.id,
          row,
          col,
        });
      }
    }
  }
  
  return slots;
}
