import type { LocalDateTime } from '../lib/time';

export type Kind = 'berth' | 'crane' | 'launch';

export interface Asset {
  id: string;
  name: string;
  kind: Kind;
  initials: string;
}

export interface Shift {
  id: string;
  assetId: string;
  start: LocalDateTime;
  end: LocalDateTime;
  status: 'assigned' | 'open';
  note?: string;
}

export const KIND_LABEL: Record<Kind, string> = {
  berth: 'Berth',
  crane: 'Crane',
  launch: 'Launch',
};

export const HARBOR = { name: 'Sample Harbor', week: '2026-02-09' };

export const assets: Asset[] = [
  { id: 'berth-a1', name: 'Berth A1', kind: 'berth', initials: 'A1' },
  { id: 'berth-b2', name: 'Berth B2', kind: 'berth', initials: 'B2' },
  { id: 'berth-c3', name: 'Berth C3', kind: 'berth', initials: 'C3' },
  { id: 'crane-1', name: 'Crane 1', kind: 'crane', initials: 'C1' },
  { id: 'crane-2', name: 'Crane 2', kind: 'crane', initials: 'C2' },
  { id: 'launch-1', name: 'Launch 1', kind: 'launch', initials: 'L1' },
  { id: 'launch-2', name: 'Launch 2', kind: 'launch', initials: 'L2' },
];

export const assetsById = Object.fromEntries(assets.map((asset) => [asset.id, asset])) as Record<string, Asset>;

/**
 * Fictional sample bookings for the week of Feb 9, 2026.
 * Berths, cranes, and launches are equipment labels, not people.
 * An overnight booking that starts on the previous Sunday is included
 * so the week board has something to show.
 */
export const shifts: Shift[] = [
  { id: 's01', assetId: 'berth-c3', start: '2026-02-08T22:00', end: '2026-02-09T06:00', status: 'assigned', note: 'Overnight hold' },

  // Mon 9
  { id: 's02', assetId: 'berth-a1', start: '2026-02-09T07:00', end: '2026-02-09T15:00', status: 'assigned' },
  { id: 's03', assetId: 'crane-1', start: '2026-02-09T08:00', end: '2026-02-09T12:30', status: 'assigned' },
  { id: 's04', assetId: 'launch-1', start: '2026-02-09T12:30', end: '2026-02-09T17:00', status: 'assigned' },
  { id: 's05', assetId: 'berth-b2', start: '2026-02-09T15:00', end: '2026-02-09T23:00', status: 'assigned' },

  // Tue 10
  { id: 's06', assetId: 'berth-a1', start: '2026-02-10T07:00', end: '2026-02-10T15:00', status: 'assigned' },
  { id: 's07', assetId: 'crane-2', start: '2026-02-10T09:00', end: '2026-02-10T17:30', status: 'assigned' },
  { id: 's08', assetId: 'launch-2', start: '2026-02-10T12:00', end: '2026-02-10T20:00', status: 'open' },

  // Wed 11
  { id: 's09', assetId: 'crane-1', start: '2026-02-11T06:30', end: '2026-02-11T14:30', status: 'assigned' },
  { id: 's10', assetId: 'launch-1', start: '2026-02-11T08:30', end: '2026-02-11T17:00', status: 'assigned' },
  { id: 's11', assetId: 'berth-a1', start: '2026-02-11T15:00', end: '2026-02-11T18:00', status: 'assigned', note: 'Cargo window' },
  { id: 's12', assetId: 'berth-c3', start: '2026-02-11T19:00', end: '2026-02-12T03:30', status: 'assigned' },

  // Thu 12
  { id: 's13', assetId: 'berth-b2', start: '2026-02-12T07:00', end: '2026-02-12T15:00', status: 'assigned' },
  { id: 's14', assetId: 'crane-2', start: '2026-02-12T08:00', end: '2026-02-12T16:00', status: 'assigned' },
  { id: 's15', assetId: 'launch-2', start: '2026-02-12T16:00', end: '2026-02-13T00:00', status: 'assigned' },

  // Fri 13
  { id: 's16', assetId: 'berth-a1', start: '2026-02-13T07:00', end: '2026-02-13T15:00', status: 'assigned' },
  { id: 's17', assetId: 'crane-1', start: '2026-02-13T15:30', end: '2026-02-13T19:30', status: 'assigned' },
  { id: 's18', assetId: 'launch-1', start: '2026-02-13T09:00', end: '2026-02-13T17:00', status: 'assigned' },
  { id: 's19', assetId: 'berth-b2', start: '2026-02-13T23:45', end: '2026-02-14T07:15', status: 'assigned', note: 'Overnight hold' },

  // Sat 14
  { id: 's20', assetId: 'crane-2', start: '2026-02-14T06:00', end: '2026-02-14T14:00', status: 'assigned' },
  { id: 's21', assetId: 'launch-2', start: '2026-02-14T09:00', end: '2026-02-14T13:00', status: 'open' },

  // Sun 15
  { id: 's22', assetId: 'berth-a1', start: '2026-02-15T10:00', end: '2026-02-15T16:00', status: 'assigned' },
  { id: 's23', assetId: 'berth-c3', start: '2026-02-15T22:00', end: '2026-02-16T06:00', status: 'assigned', note: 'Overnight hold' },
];
