# Harbor Roster

A week-view booking board for a small harbor. The harbormaster sees every booking for the week on a single board, filters it by equipment type, and acts on a booking (mark open, swap, delete) from a per-booking menu.

![stack](https://img.shields.io/badge/stack-React%2019%20%2B%20Vite-2f6fed)

## Features

- 24-hour week board with a sticky hour gutter and day header
- Overlapping bookings are packed into side-by-side lanes
- Equipment filter (berth / crane / launch)
- Per-booking action menu
- Responsive shell: sidebar on desktop, push drawer below 768px

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script          | What it does                                                               |
| --------------- | -------------------------------------------------------------------------- |
| `npm run dev`   | Vite dev server                                                            |
| `npm run build` | Type-check and production build                                            |
| `npm test`      | Unit tests (Vitest)                                                        |
| `npm run e2e`   | Playwright smoke tests (desktop + mobile) on their own dev server at :5179 |

Run `npx playwright install chromium` once before the first `npm run e2e`.

## Data model

Booking times are harbor-local wall-clock strings (`YYYY-MM-DDTHH:mm`) with no timezone. The sample in
`src/data/roster.ts` is made-up equipment for the week of **Feb 9, 2026**, including every booking that touches that week. The labels are berths, cranes, and launches. The repository does not store personal or customer data.

```
src/
  components/   AppShell, WeekBoard, DayColumn, ShiftCard, ShiftMenu, Toolbar
  hooks/        useElementWidth, useDismiss
  lib/          time helpers and day-column layout
  data/         sample bookings
```

## Next

The booking editor and swap actions are still previews. The rest of the planned work, about 29 hours, is in [ROADMAP.md](ROADMAP.md).

## License

MIT
