import { Vehicle, Slot, SearchFilters, VehicleStatus } from '@/types';
import { MOCK_VEHICLES, MOCK_SLOTS } from '@/data/mockData';

// Simulated network delay for realism
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getVehicles(filters?: SearchFilters): Promise<Vehicle[]> {
  await delay(50);
  let vehicles = [...MOCK_VEHICLES];

  if (!filters) return vehicles;

  const { query, year, make, model, status } = filters;

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    vehicles = vehicles.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.lotNumber.toLowerCase().includes(q) ||
        String(v.year).includes(q) ||
        (v.color && v.color.toLowerCase().includes(q)) ||
        (v.trim && v.trim.toLowerCase().includes(q))
    );
  }

  if (year) {
    vehicles = vehicles.filter((v) => v.year === year);
  }

  if (make && make !== 'all') {
    vehicles = vehicles.filter(
      (v) => v.make.toLowerCase() === make.toLowerCase()
    );
  }

  if (model && model !== 'all') {
    vehicles = vehicles.filter(
      (v) => v.model.toLowerCase() === model.toLowerCase()
    );
  }

  if (status && status !== ('all' as VehicleStatus)) {
    vehicles = vehicles.filter((v) => v.status === status);
  }

  return vehicles;
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  await delay(30);
  return MOCK_VEHICLES.find((v) => v.id === id) ?? null;
}

export async function getSlots(): Promise<Slot[]> {
  await delay(50);
  return [...MOCK_SLOTS];
}

export async function getSlotByCode(slotCode: string): Promise<Slot | null> {
  await delay(30);
  return MOCK_SLOTS.find((s) => s.slotCode === slotCode) ?? null;
}

export async function getSlotByQrToken(token: string): Promise<Slot | null> {
  await delay(30);
  return MOCK_SLOTS.find((s) => s.qrToken === token) ?? null;
}

export function getUniqueMakes(): string[] {
  const makes = MOCK_VEHICLES.map((v) => v.make);
  return Array.from(new Set(makes)).sort();
}

export function getUniqueYears(): number[] {
  const years = MOCK_VEHICLES.map((v) => v.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
}
