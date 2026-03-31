import { VehicleStatus, SlotStatus } from '@/types';

export function formatUpdatedAt(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Updated just now';
  if (diffHours < 24) return `Updated ${diffHours}h ago`;
  if (diffDays === 1) return 'Updated yesterday';
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 14) return 'Updated last week';
  return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
}

export function getVehicleStatusColor(status: VehicleStatus): string {
  switch (status) {
    case 'available':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'reserved':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'removed':
      return 'bg-red-100 text-red-600 border-red-200';
    case 'pending':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function getSlotStatusColor(status: SlotStatus): string {
  switch (status) {
    case 'occupied':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'free':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'reserved':
      return 'bg-slate-100 text-slate-500 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function maskVin(vin: string | undefined): string {
  if (!vin) return '';
  if (vin.length <= 8) return vin;
  return vin.substring(0, 8) + '*****';
}

export function formatMileage(mileage: number): string {
  return mileage.toLocaleString('en-US') + ' mi';
}
