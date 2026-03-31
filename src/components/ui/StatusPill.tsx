import React from 'react';
import { VehicleStatus } from '@/types';

interface StatusPillProps {
  status: VehicleStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  VehicleStatus,
  { label: string; classes: string; dot: string }
> = {
  available: {
    label: 'Available',
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  reserved: {
    label: 'Reserved',
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
  },
  removed: {
    label: 'Removed',
    classes: 'bg-red-50 text-red-600 border border-red-200',
    dot: 'bg-red-500',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-blue-50 text-blue-700 border border-blue-200',
    dot: 'bg-blue-500',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.classes} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
