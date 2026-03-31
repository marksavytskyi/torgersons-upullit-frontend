# YardTrack - Smart Salvage Yard Platform

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- `/` - Home / Marketing Landing
- `/inventory` - Browse all vehicles (with live client-side filtering)
- `/inventory/[id]` - Vehicle detail with full specs and slot location
- `/slot/[slotCode]` - Public slot page (QR code destination, mobile-first)
- `/yard-map` - Visual yard grid with color-coded slot status
- `/admin` - Admin demo panel (all UI, no backend required)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React

## Mock Data

See `src/data/mockData.ts` — 10 vehicles, 16 slots (rows A-D, 4 slots each).

Replace API calls in `src/lib/api.ts` with real backend endpoints when ready.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── inventory/          # Inventory list + detail
│   ├── slot/[slotCode]/    # QR scan destination
│   ├── yard-map/           # Visual yard grid
│   └── admin/              # Admin demo panel
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Button, Badge, StatusPill, Card, UpdatedAt
│   ├── home/               # All home page sections
│   ├── inventory/          # VehicleCard, SearchBar, FilterBar
│   ├── slot/               # SlotView
│   └── yard-map/           # YardGrid, SlotCell
├── data/
│   └── mockData.ts         # 10 vehicles + 16 slots
├── lib/
│   ├── api.ts              # API abstraction (currently wraps mock data)
│   └── utils.ts            # formatUpdatedAt, maskVin, etc.
└── types/
    └── index.ts            # TypeScript types
```

## Design

- Light theme with amber (#f59e0b) accent
- Slate dark (#0f172a) secondary
- Inter font
- Status pills: green (available), amber (reserved), red (removed), blue (pending)
