# Prediction Market UI

A Next.js app replicating the core Polymarket experience — browse prediction markets, filter by category, and watch prices update in real time.

## Tech Stack

- **Next.js 15** (App Router) — server components, file-based routing, API route handlers
- **TypeScript** — end-to-end type safety
- **Jotai** — atomic state management with derived and per-outcome atoms
- **CSS Modules** — component-scoped styles, no Tailwind

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" > .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/events/
│   │   ├── route.ts              # GET /api/events — lists all events (proxy → Polymarket)
│   │   └── [slug]/route.ts       # GET /api/events/:slug — single event detail
│   ├── event/[slug]/
│   │   └── page.tsx              # Event detail page with per-market outcome tables
│   ├── layout.tsx                # Root layout — wraps app in Jotai Provider + Navbar
│   └── page.tsx                  # Home page — event grid with category filtering
│
├── components/
│   ├── events/
│   │   ├── EventCard.tsx         # Single event card with title, outcomes, volume
│   │   ├── EventGrid.tsx         # Responsive grid of EventCards with skeleton loading
│   │   └── PriceBadge.tsx        # Live-updating price badge with animated progress bar
│   ├── layout/
│   │   └── Navbar.tsx            # Top nav with category filter buttons
│   └── ui/
│       └── SkeletonCard.tsx      # Placeholder skeleton shown during data fetch
│
├── store/
│   ├── eventsAtom.ts             # Atoms for events list, loading, error, category filter
│   └── pricesAtom.ts             # Per-outcome price atoms + batch update atom
│
├── hooks/
│   ├── useEvents.ts              # Fetches events on mount, populates eventsAtom
│   └── useLivePrices.ts          # Seeds price atoms, simulates live updates every 3s
│
├── lib/
│   ├── api.ts                    # Fetch helpers + raw API → normalized type mappers
│   ├── mockData.ts               # 12 mock events mirroring Polymarket API structure
│   └── utils.ts                  # formatVolume ("$1.2M") and formatPrice ("73%")
│
└── types/
    └── index.ts                  # Event, Market, Outcome, PriceUpdate, Category types
```

## Architecture

### Jotai Atom Design

| Atom | Kind | Purpose |
|------|------|---------|
| `eventsAtom` | primitive | Stores the full `Event[]` fetched from the API |
| `selectedCategoryAtom` | primitive | Tracks the active category filter (`"all"`, `"crypto"`, `"sports"`, `"politics"`) |
| `filteredEventsAtom` | derived (read-only) | Automatically recomputes the filtered event list when `eventsAtom` or `selectedCategoryAtom` changes |
| `getPriceAtom(outcomeId)` | factory | Returns (or creates) an individual `atom<number>` for a single outcome's price |
| `applyPriceUpdatesAtom` | write-only | Accepts a batch of `PriceUpdate[]` and distributes each update to the corresponding per-outcome atom |

### Why Per-Outcome Atoms

Each outcome price lives in its own atom. When a price changes, only the `PriceBadge` subscribed to that specific outcome re-renders — the rest of the tree is untouched. Without this, a single price tick would re-render every card in the grid.

### Memoization

`React.memo` wraps `EventCard`, `EventGrid`, `PriceBadge`, and `SkeletonCard`. Combined with the per-outcome atom pattern, this ensures that parent re-renders (e.g., category change) don't cascade into children whose props haven't changed.

## Real-Time Price Updates

1. `useLivePrices` seeds each outcome's atom with its initial price from the API response.
2. A `setInterval` fires every **3 seconds**.
3. On each tick, ~**20%** of outcomes are randomly selected for update. Each selected outcome's price shifts by **+/- 0-3%**, clamped to `[0.01, 0.99]`.
4. Updates are dispatched through `applyPriceUpdatesAtom`, which writes to individual per-outcome atoms.
5. The progress bar in `PriceBadge` uses `transition: width 0.4s ease` for a smooth visual animation between ticks.

## API Proxy

The browser never calls the Polymarket API directly. Instead, Next.js route handlers act as a proxy to avoid CORS issues:

```
Browser  →  /api/events  →  gamma-api.polymarket.com/events?closed=false&limit=50
```

The route handler fetches from the real API, normalizes the response, and returns it to the client. If the upstream call fails, it falls back to mock data transparently.

## Assumptions & Trade-offs

- **Polymarket API unavailable** — `gamma-api.polymarket.com` currently resolves to NXDOMAIN. This was flagged to the recruiter before starting the project. The route handler attempts the real API on every request and falls back to mock data when it fails.
- **Mock data** — `lib/mockData.ts` contains 12 realistic events that mirror the real Polymarket API response structure, so the normalizers and components exercise the same code paths regardless of data source.
- **Simulated prices** — Live price updates are simulated client-side via `setInterval` since there is no WebSocket endpoint available. The simulation uses randomized but bounded changes to keep prices realistic.
- **No authentication or trading** — This is a read-only UI focused on browsing and price display. There is no order book, wallet connection, or trade execution.
- **60-second cache** — The `/api/events` route handler caches responses for 60 seconds (`revalidate: 60`) to reduce redundant upstream calls during development.