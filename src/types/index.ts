export type VehicleStatus = 'available' | 'reserved' | 'removed' | 'pending';
export type SlotStatus = 'occupied' | 'free' | 'reserved';

export interface Vehicle {
  id: string;
  lotNumber: string;
  vin?: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  color?: string;
  sourceName?: string;
  sourceUrl?: string;
  slotCode: string;
  status: VehicleStatus;
  notes?: string;
  updatedAt: string; // ISO string
  images: string[];
  mileage?: number;
  engine?: string;
}

export interface Slot {
  id: string;
  slotCode: string;
  row: string;
  number: number;
  status: SlotStatus;
  qrToken: string;
  currentVehicle: Vehicle | null;
}

export interface SearchFilters {
  query: string;
  year?: number;
  make?: string;
  model?: string;
  status?: VehicleStatus;
}
