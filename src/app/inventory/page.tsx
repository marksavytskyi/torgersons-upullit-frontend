'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Car } from 'lucide-react';
import { Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/data/mockData';
import { getUniqueMakes, getUniqueYears } from '@/lib/api';
import { VehicleCard } from '@/components/inventory/VehicleCard';
import { SearchBar } from '@/components/inventory/SearchBar';
import { FilterBar } from '@/components/inventory/FilterBar';

export default function InventoryPage() {
  const [query, setQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const makes = useMemo(() => getUniqueMakes(), []);
  const years = useMemo(() => getUniqueYears(), []);

  const filteredVehicles = useMemo(() => {
    let vehicles = [...MOCK_VEHICLES];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      vehicles = vehicles.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.lotNumber.toLowerCase().includes(q) ||
          String(v.year).includes(q) ||
          v.color.toLowerCase().includes(q) ||
          (v.trim && v.trim.toLowerCase().includes(q))
      );
    }

    if (selectedMake !== 'all') {
      vehicles = vehicles.filter(
        (v) => v.make.toLowerCase() === selectedMake.toLowerCase()
      );
    }

    if (selectedYear !== 'all') {
      vehicles = vehicles.filter((v) => v.year === parseInt(selectedYear, 10));
    }

    if (selectedStatus !== 'all') {
      vehicles = vehicles.filter((v) => v.status === selectedStatus);
    }

    return vehicles;
  }, [query, selectedMake, selectedYear, selectedStatus]);

  const hasActiveFilters =
    query !== '' ||
    selectedMake !== 'all' ||
    selectedYear !== 'all' ||
    selectedStatus !== 'all';

  const handleReset = () => {
    setQuery('');
    setSelectedMake('all');
    setSelectedYear('all');
    setSelectedStatus('all');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-9 h-9 bg-amber-100 rounded-lg">
              <Car className="w-5 h-5 text-amber-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Vehicle Inventory
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-12">
            Browse all vehicles currently available in the yard. Updated daily.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col gap-4">
          <SearchBar value={query} onChange={setQuery} />
          <FilterBar
            makes={makes}
            years={years}
            selectedMake={selectedMake}
            selectedYear={selectedYear}
            selectedStatus={selectedStatus}
            onMakeChange={setSelectedMake}
            onYearChange={setSelectedYear}
            onStatusChange={setSelectedStatus}
            onReset={handleReset}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {filteredVehicles.length}
            </span>{' '}
            {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}
            {hasActiveFilters && (
              <span className="text-amber-600"> (filtered)</span>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mx-auto mb-4">
              <Car className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No vehicles found
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
