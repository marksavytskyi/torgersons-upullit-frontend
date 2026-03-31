'use client';

import React, { useState, useMemo } from 'react';
import { Search, Tag, RotateCcw, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { PRICE_LIST, CATEGORIES, PriceItem } from '@/data/priceList';

const CATEGORY_META: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  'ACCESSORY PARTS': { icon: '🔧', color: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  'AXLES':           { icon: '⚙️', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  'DASH / COWL':     { icon: '🎛️', color: 'text-emerald-700',bg: 'bg-emerald-50',border: 'border-emerald-200' },
  'DOORS':           { icon: '🚪', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
};

function fmt(n: number) {
  return n === 0 ? '—' : `$${n.toFixed(2)}`;
}

function CategorySection({ category, items }: { category: string; items: PriceItem[] }) {
  const [open, setOpen] = useState(true);
  const meta = CATEGORY_META[category] ?? { icon: '📦', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' };

  return (
    <div className={`rounded-2xl border ${meta.border} overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-6 py-4 ${meta.bg} hover:brightness-95 transition-all duration-150`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{meta.icon}</span>
          <div className="text-left">
            <h2 className={`font-bold text-base tracking-wide ${meta.color}`}>{category}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{items.length} items</p>
          </div>
        </div>
        {open
          ? <ChevronUp className={`w-4 h-4 ${meta.color}`} />
          : <ChevronDown className={`w-4 h-4 ${meta.color}`} />
        }
      </button>

      {/* Table */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="text-left px-6 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Part Name</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Price</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Core Charge</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Returnable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item, i) => (
                <tr
                  key={i}
                  className="group hover:bg-orange-50/40 transition-colors duration-100"
                >
                  <td className="px-6 py-3.5 font-medium text-slate-800 group-hover:text-slate-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-bold text-slate-900 text-base">{fmt(item.price)}</span>
                    <span className="text-slate-400 text-xs ml-1">/{item.basis}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {item.corePrice > 0 ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 font-semibold text-xs px-2.5 py-1 rounded-full border border-amber-200">
                        <DollarSign className="w-3 h-3" />
                        {item.corePrice.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {item.returnable ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 font-semibold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                        <RotateCcw className="w-3 h-3" />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-slate-100 text-slate-500 text-xs px-2.5 py-1 rounded-full">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function PricesPage() {
  const [search, setSearch]           = useState('');
  const [activeCategory, setCategory] = useState<string>('ALL');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PRICE_LIST.filter(item => {
      const matchCat  = activeCategory === 'ALL' || item.category === activeCategory;
      const matchText = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map: Record<string, PriceItem[]> = {};
    for (const item of filtered) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [filtered]);

  const totalItems = PRICE_LIST.length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center">
            <div className="section-eyebrow justify-center">
              <Tag className="w-3.5 h-3.5" />
              Parts Price List
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              All prices are per-item. Core charges are refunded when the original part is returned.
            </p>

            {/* Stats row */}
            <div className="mt-8 inline-flex items-center gap-6 bg-slate-50 rounded-2xl px-8 py-4 border border-slate-100">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{totalItems}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Parts Listed</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{CATEGORIES.length}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Categories</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Returnable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', ...CATEGORIES].map(cat => {
              const isActive = activeCategory === cat;
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {meta?.icon && <span className="mr-1">{meta.icon}</span>}
                  {cat === 'ALL' ? 'All Categories' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No parts match your search.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {Object.entries(grouped).map(([category, items]) => (
              <CategorySection key={category} category={category} items={items} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-slate-400">
          Prices subject to change without notice. All prices are cash/check pricing. Core charges refunded upon return of original part in acceptable condition.
        </p>
      </div>
    </main>
  );
}
