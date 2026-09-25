# Harbor Roster

A week-view shift roster for small outpatient clinics. Managers see every shift for the week on a single board,
filter it by role, and act on individual shifts (mark open, swap, delete) from a per-shift menu.

![stack](https://img.shields.io/badge/stack-React%2019%20%2B%20Vite-2f6fed)

## Features

- 24-hour week board with a sticky hour gutter and day header
- Overlapping shifts are packed into side-by-side lanes
- Role filter (nurse / technician / front desk)
- Per-shift action menu
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

Shift times are clinic-local wall-clock strings (`YYYY-MM-DDTHH:mm`) with no timezone. The sample data in
`src/data/roster.ts` is an export for the week of **Feb 9, 2026**, and includes every shift that touches that week.

```
src/
  components/   AppShell, WeekBoard, DayColumn, ShiftCard, ShiftMenu, Toolbar
  hooks/        useElementWidth, useDismiss
  lib/          time helpers and day-column layout
  data/         sample roster
```

## License

MIT
