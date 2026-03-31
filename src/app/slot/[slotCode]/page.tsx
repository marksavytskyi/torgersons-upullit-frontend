import React from 'react';
import { notFound } from 'next/navigation';
import { getSlotByCode } from '@/lib/api';
import { MOCK_SLOTS } from '@/data/mockData';
import { SlotView } from '@/components/slot/SlotView';

interface PageProps {
  params: { slotCode: string };
}

export async function generateStaticParams() {
  return MOCK_SLOTS.map((s) => ({ slotCode: encodeURIComponent(s.slotCode) }));
}

export async function generateMetadata({ params }: PageProps) {
  const decoded = decodeURIComponent(params.slotCode);
  const slot = await getSlotByCode(decoded);
  if (!slot) return { title: 'Slot Not Found' };

  const vehicleTitle = slot.currentVehicle
    ? `${slot.currentVehicle.year} ${slot.currentVehicle.make} ${slot.currentVehicle.model}`
    : 'Empty';

  return {
    title: `Slot ${slot.slotCode} — ${vehicleTitle}`,
    description: `Real-time status for Slot ${slot.slotCode} in the Torgerson's U-Pull-It yard.`,
  };
}

export default async function SlotPage({ params }: PageProps) {
  const decoded = decodeURIComponent(params.slotCode);
  const slot = await getSlotByCode(decoded);

  if (!slot) {
    notFound();
  }

  return <SlotView slot={slot} />;
}
