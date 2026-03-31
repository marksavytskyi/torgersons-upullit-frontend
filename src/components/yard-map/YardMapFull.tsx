'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES } from '@/data/mockData';
import { Car, Building2, Info, MapPin, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { formatUpdatedAt } from '@/lib/utils';
import { Vehicle } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlotInfo {
  code: string;
  zone: string;
  occupied: boolean;
  vehicle?: { year: number; make: string; model: string; status: string; id: string; image: string };
}

// ─── Zone color palette ───────────────────────────────────────────────────────
const ZONE_COLORS: Record<string, {
  bg: string; border: string; label: string; text: string;
  slotFree: string; slotOcc: string; slotHover: string;
}> = {
  A:  { bg:'#16a34a', border:'#15803d', label:'#fff', text:'#14532d', slotFree:'#bbf7d0', slotOcc:'#16a34a', slotHover:'#22c55e' },
  B:  { bg:'#d97706', border:'#b45309', label:'#fff', text:'#78350f', slotFree:'#fde68a', slotOcc:'#d97706', slotHover:'#f59e0b' },
  C:  { bg:'#ca8a04', border:'#a16207', label:'#fff', text:'#713f12', slotFree:'#fef08a', slotOcc:'#ca8a04', slotHover:'#eab308' },
  D:  { bg:'#dc2626', border:'#b91c1c', label:'#fff', text:'#7f1d1d', slotFree:'#fecaca', slotOcc:'#dc2626', slotHover:'#ef4444' },
  E1: { bg:'#2563eb', border:'#1d4ed8', label:'#fff', text:'#1e3a8a', slotFree:'#bfdbfe', slotOcc:'#2563eb', slotHover:'#3b82f6' },
  E2: { bg:'#0284c7', border:'#0369a1', label:'#fff', text:'#0c4a6e', slotFree:'#bae6fd', slotOcc:'#0284c7', slotHover:'#0ea5e9' },
  F:  { bg:'#0d9488', border:'#0f766e', label:'#fff', text:'#134e4a', slotFree:'#99f6e4', slotOcc:'#0d9488', slotHover:'#14b8a6' },
  G:  { bg:'#64748b', border:'#475569', label:'#fff', text:'#1e293b', slotFree:'#cbd5e1', slotOcc:'#64748b', slotHover:'#94a3b8' },
  H:  { bg:'#ea580c', border:'#c2410c', label:'#fff', text:'#431407', slotFree:'#fed7aa', slotOcc:'#ea580c', slotHover:'#f97316' },
};

// ─── Build slots for a zone ───────────────────────────────────────────────────
function makeSlots(
  zone: string,
  count: number,
  vehicleMap: Map<string, SlotInfo['vehicle']>
): SlotInfo[] {
  return Array.from({ length: count }, (_, i) => {
    const code = `${zone}-${String(i + 1).padStart(2, '0')}`;
    const vehicle = vehicleMap.get(code);
    return { code, zone, occupied: !!vehicle, vehicle };
  });
}

// ─── Single slot cell ─────────────────────────────────────────────────────────
function SlotCell({
  slot,
  colors,
  onClick,
  highlighted,
}: {
  slot: SlotInfo;
  colors: typeof ZONE_COLORS[string];
  onClick: (s: SlotInfo) => void;
  highlighted: boolean;
}) {
  return (
    <div
      id={`slot-${slot.code}`}
      onClick={() => onClick(slot)}
      className="cursor-pointer rounded transition-all duration-150 flex items-center justify-center flex-shrink-0"
      style={{
        width: 11,
        height: 8,
        backgroundColor: highlighted
          ? '#f97316'
          : slot.occupied
          ? colors.slotOcc
          : colors.slotFree,
        border: highlighted
          ? '1.5px solid #fff'
          : `1px solid ${slot.occupied ? colors.border : '#00000015'}`,
        position: 'relative',
        fontSize: 4,
        fontWeight: 700,
        color: (highlighted || slot.occupied) ? '#fff' : colors.text,
        boxShadow: highlighted
          ? '0 0 0 2px rgba(249,115,22,0.6)'
          : undefined,
        transform: highlighted ? 'scale(1.3)' : 'scale(1)',
        zIndex: highlighted ? 20 : 1,
        borderRadius: 2,
      }}
      title={`${slot.code}${slot.vehicle ? ` — ${slot.vehicle.year} ${slot.vehicle.make} ${slot.vehicle.model}` : ' — Free'}`}
    >
      {slot.occupied ? <Car style={{ width: 5, height: 5 }} /> : <span>{String(slot.code.split('-')[1])}</span>}
    </div>
  );
}

// ─── Zone block ───────────────────────────────────────────────────────────────
function ZoneBlock({
  zoneId, label, slots, cols, onSlotClick, highlightedCode,
}: {
  zoneId: string; label: string; slots: SlotInfo[];
  cols: number; onSlotClick: (s: SlotInfo) => void; highlightedCode: string | null;
}) {
  const colors = ZONE_COLORS[zoneId] ?? ZONE_COLORS['A'];
  const occupied = slots.filter((s) => s.occupied).length;
  const rows: SlotInfo[][] = [];
  for (let i = 0; i < slots.length; i += cols) rows.push(slots.slice(i, i + cols));

  return (
    <div className="rounded-xl overflow-hidden shadow-md flex-shrink-0"
      style={{ border: `2px solid ${colors.border}`, backgroundColor: colors.bg + '18' }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ backgroundColor: colors.bg }}>
        <span style={{ color: colors.label, fontWeight: 900, fontSize: 18, letterSpacing: 1 }}>{label}</span>
        <span style={{ color: colors.label + 'cc', fontSize: 10, fontWeight: 600 }}>{occupied}/{slots.length}</span>
      </div>
      <div className="p-1.5 flex flex-col gap-0.5">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-0.5">
            {row.map((slot) => (
              <SlotCell
                key={slot.code}
                slot={slot}
                colors={colors}
                onClick={onSlotClick}
                highlighted={highlightedCode === slot.code}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Vehicle list card ────────────────────────────────────────────────────────
function VehicleListCard({
  vehicle,
  isActive,
  onClick,
}: {
  vehicle: Vehicle;
  isActive: boolean;
  onClick: () => void;
}) {
  const zone = vehicle.slotCode?.split('-')[0] ?? 'A';
  const colors = ZONE_COLORS[zone] ?? ZONE_COLORS['A'];

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
        isActive
          ? 'border-orange-400 bg-orange-50 shadow-md'
          : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
      }`}
    >
      {/* Photo */}
      <div className="relative w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make}`}
          className="w-full h-full object-cover"
        />
        {isActive && (
          <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-500 drop-shadow" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-black text-sm leading-tight truncate ${isActive ? 'text-orange-600' : 'text-slate-900'}`}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="text-slate-400 text-xs mt-0.5 truncate">{vehicle.lotNumber}</p>

        <div className="flex items-center gap-2 mt-2">
          {/* Slot badge */}
          <span
            className="text-[10px] font-black px-2 py-0.5 rounded-lg"
            style={{ backgroundColor: colors.bg, color: colors.label }}
          >
            {vehicle.slotCode}
          </span>
          {/* Updated */}
          <span className="flex items-center gap-1 text-slate-400 text-[10px]">
            <Clock className="w-3 h-3" />
            {formatUpdatedAt(vehicle.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const PAGE_SIZE = 5;

export function YardMapFull() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [highlightedCode, setHighlightedCode] = useState<string | null>(
    searchParams.get('slot')
  );
  const [page, setPage] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // If opened with ?slot=X — scroll to it after mount
  useEffect(() => {
    const slot = searchParams.get('slot');
    if (!slot) return;
    setHighlightedCode(slot);
    setTimeout(() => {
      document.getElementById(`slot-${slot}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 300);
  }, [searchParams]);

  // Build vehicle lookup map
  const vehicleMap = useMemo(() => {
    const m = new Map<string, SlotInfo['vehicle']>();
    for (const v of MOCK_VEHICLES) {
      if (v.slotCode) {
        m.set(v.slotCode, {
          year: v.year, make: v.make, model: v.model,
          status: v.status, id: v.id, image: v.images[0],
        });
      }
    }
    return m;
  }, []);

  const zones = useMemo(() => ({
    A:  makeSlots('A',  50, vehicleMap),
    B:  makeSlots('B',  50, vehicleMap),
    C:  makeSlots('C',  50, vehicleMap),
    D:  makeSlots('D', 100, vehicleMap),
    E1: makeSlots('E1', 50, vehicleMap),
    E2: makeSlots('E2', 60, vehicleMap),
    F:  makeSlots('F',  50, vehicleMap),
    G:  makeSlots('G',  30, vehicleMap),
    H:  makeSlots('H',  10, vehicleMap),
  }), [vehicleMap]);

  const totalSlots = 450;
  const totalOcc   = Object.values(zones).flat().filter((s) => s.occupied).length;

  // Paginated vehicle list
  const vehicles = MOCK_VEHICLES;
  const totalPages = Math.ceil(vehicles.length / PAGE_SIZE);
  const pageVehicles = vehicles.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // When a vehicle is selected from list — highlight its slot + scroll map to it
  const handleVehicleClick = (v: Vehicle) => {
    if (!v.slotCode) return;
    setHighlightedCode(v.slotCode);

    // Scroll the slot cell into view inside the map
    setTimeout(() => {
      const el = document.getElementById(`slot-${v.slotCode}`);
      if (el && mapRef.current) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 50);
  };

  // Clicking a slot on the map highlights it
  const handleSlotClick = (s: SlotInfo) => {
    setHighlightedCode(s.code === highlightedCode ? null : s.code);
  };

  // Clear highlight when clicking elsewhere
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest('[id^="slot-"]') &&
        !(e.target as HTMLElement).closest('.vehicle-list-card')
      ) {
        // don't clear automatically
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const highlighted = highlightedCode
    ? vehicles.find((v) => v.slotCode === highlightedCode)
    : null;

  return (
    <div className="flex gap-5 items-start">

      {/* ══ LEFT: Map ════════════════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        {/* Stats bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-5 bg-white rounded-2xl border border-slate-100 shadow-card px-5 py-3 flex-1">
            <div className="text-center">
              <p className="text-xl font-black text-slate-900">{totalSlots}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total</p>
            </div>
            <div className="w-px h-6 bg-slate-100" />
            <div className="text-center">
              <p className="text-xl font-black text-orange-500">{totalOcc}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Occupied</p>
            </div>
            <div className="w-px h-6 bg-slate-100" />
            <div className="text-center">
              <p className="text-xl font-black text-emerald-500">{totalSlots - totalOcc}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Available</p>
            </div>
          </div>
          {highlightedCode && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 font-black text-sm">{highlightedCode}</span>
              <button
                onClick={() => setHighlightedCode(null)}
                className="text-orange-400 hover:text-orange-600 ml-1 text-xs font-bold"
              >✕</button>
            </div>
          )}
        </div>

        {/* Map canvas */}
        <div
          ref={mapRef}
          className="bg-[#2d4a1e] rounded-3xl p-4 shadow-2xl"
        >
          <div>

            {/* ── TOP ROW: A + C + Building H ── */}
            <div className="flex gap-3 mb-3 items-start">
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="A" label="A" slots={zones.A.slice(0,25)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="A" label="A" slots={zones.A.slice(25,50)} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="C" label="C" slots={zones.C.slice(0,25)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="C" label="C" slots={zones.C.slice(25,50)} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex-1" />
              {/* Building H */}
              <div className="bg-[#f5f0e8] border-2 border-[#d4c5a0] rounded-xl shadow-lg overflow-hidden flex-shrink-0" style={{ width: 160 }}>
                <div className="bg-[#8b7355] text-white text-center py-1.5 font-black text-xs tracking-wider flex items-center justify-center gap-1">
                  <Building2 className="w-3 h-3" /> H — INTAKE
                </div>
                <div className="p-1.5 flex flex-wrap gap-0.5">
                  {zones.H.map((slot) => (
                    <SlotCell key={slot.code} slot={slot} colors={ZONE_COLORS['H']}
                      onClick={handleSlotClick} highlighted={highlightedCode === slot.code} />
                  ))}
                </div>
                <div className="bg-[#c8a96e] text-white text-center py-1 text-[10px] font-bold tracking-widest">
                  ENTRANCE →
                </div>
              </div>
            </div>

            {/* ── MIDDLE ROW: E1/E2 + D + F ── */}
            <div className="flex gap-3 mb-3 items-start">
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="E1" label="E" slots={zones.E1.slice(0,25)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="E1" label="E" slots={zones.E1.slice(25,50)} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="E2" label="E" slots={zones.E2.slice(0,30)}  cols={30} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="E2" label="E" slots={zones.E2.slice(30,60)} cols={30} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="D" label="D" slots={zones.D.slice(0,25)}   cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="D" label="D" slots={zones.D.slice(25,50)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="D" label="D" slots={zones.D.slice(50,75)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="D" label="D" slots={zones.D.slice(75,100)} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex-1" />
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="F" label="F" slots={zones.F.slice(0,25)}  cols={13} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="F" label="F" slots={zones.F.slice(25,50)} cols={13} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
            </div>

            {/* ── BOTTOM ROW: A(2) + B + G + Staging ── */}
            <div className="flex gap-3 items-start">
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="A" label="A" slots={zones.A.slice(0,25).map(s=>({...s,code:'A2-'+s.code.split('-')[1]}))}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="A" label="A" slots={zones.A.slice(25,50).map(s=>({...s,code:'A3-'+s.code.split('-')[1]}))} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="B" label="B" slots={zones.B.slice(0,25)}  cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="B" label="B" slots={zones.B.slice(25,50)} cols={25} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
              </div>
              <div className="flex-1" />
              <div className="flex flex-col gap-2">
                <ZoneBlock zoneId="G" label="G" slots={zones.G.slice(0,15)}  cols={8} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <ZoneBlock zoneId="G" label="G" slots={zones.G.slice(15,30)} cols={8} onSlotClick={handleSlotClick} highlightedCode={highlightedCode} />
                <div className="bg-slate-600/30 border border-slate-500/40 rounded-xl px-3 py-2 text-center">
                  <p className="text-slate-300 text-[10px] font-bold tracking-widest">STAGING AREA</p>
                </div>
              </div>
            </div>

          </div>

          {/* Zone legend */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Info className="w-3 h-3" /> Zone Key
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ZONE_COLORS).map(([id, c]) => (
                <div key={id} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1">
                  <span className="w-3 h-3 rounded flex-shrink-0" style={{ backgroundColor: c.bg }} />
                  <span className="text-white/70 text-[10px] font-semibold">Zone {id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ RIGHT: Vehicle list ═══════════════════════════════════════════════ */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-3">

        {/* Panel header */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card px-4 py-3">
          <p className="font-black text-slate-900 text-sm">Vehicles in Yard</p>
          <p className="text-slate-400 text-xs mt-0.5">{vehicles.length} total · click to locate on map</p>
        </div>

        {/* Highlighted vehicle detail */}
        {highlighted && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl overflow-hidden shadow-md">
            <img
              src={highlighted.images[0]}
              alt={`${highlighted.year} ${highlighted.make}`}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="font-black text-slate-900 text-sm">
                  {highlighted.year} {highlighted.make} {highlighted.model}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-orange-500 text-white">
                  {highlighted.slotCode}
                </span>
                <span className="text-slate-400 text-[10px]">{highlighted.lotNumber}</span>
              </div>
              <button
                onClick={() => router.push(`/inventory/${highlighted.id}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-xs transition-colors"
              >
                View Full Details →
              </button>
            </div>
          </div>
        )}

        {/* Scrollable list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="divide-y divide-slate-50 px-2 py-1">
            {pageVehicles.map((v) => (
              <div key={v.id} className="vehicle-list-card py-1">
                <VehicleListCard
                  vehicle={v}
                  isActive={highlightedCode === v.slotCode}
                  onClick={() => handleVehicleClick(v)}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500 font-semibold">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
