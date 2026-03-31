'use client';

import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { VehicleStatus } from '@/types';

interface FilterBarProps {
  makes: string[];
  years: number[];
  selectedMake: string;
  selectedYear: string;
  selectedStatus: string;
  onMakeChange: (make: string) => void;
  onYearChange: (year: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const statusOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'removed', label: 'Removed' },
  { value: 'pending', label: 'Pending' },
];

const SelectWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative">
    {children}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <ChevronDown className="w-4 h-4 text-slate-400" />
    </div>
  </div>
);

export function FilterBar({
  makes,
  years,
  selectedMake,
  selectedYear,
  selectedStatus,
  onMakeChange,
  onYearChange,
  onStatusChange,
  onReset,
  hasActiveFilters,
}: FilterBarProps) {
  const selectClass =
    'appearance-none w-full pl-3 pr-8 py-2.5 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors cursor-pointer';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
        <Filter className="w-4 h-4" />
        <span>Filter:</span>
      </div>

      {/* Make */}
      <SelectWrapper>
        <select
          value={selectedMake}
          onChange={(e) => onMakeChange(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* Year */}
      <SelectWrapper>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={String(year)}>
              {year}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* Status */}
      <SelectWrapper>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className={selectClass}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="text-sm text-amber-600 hover:text-amber-700 font-semibold px-3 py-2 hover:bg-amber-50 rounded-lg transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
