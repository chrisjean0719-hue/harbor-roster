import type { LocalDateTime } from '../lib/time';

export type Role = 'nurse' | 'tech' | 'desk';

export interface Staff {
  id: string;
  name: string;
  role: Role;
  initials: string;
}

export interface Shift {
  id: string;
  staffId: string;
  start: LocalDateTime;
  end: LocalDateTime;
  status: 'assigned' | 'open';
  note?: string;
}

export const ROLE_LABEL: Record<Role, string> = {
  nurse: 'Nurse',
  tech: 'Technician',
  desk: 'Front desk',
};

export const CLINIC = { name: 'Northside Clinic', week: '2026-02-09' };

export const staff: Staff[] = [
  { id: 'mchen', name: 'Mei Chen', role: 'nurse', initials: 'MC' },
  { id: 'rokafor', name: 'Ruth Okafor', role: 'nurse', initials: 'RO' },
  { id: 'jalvarez', name: 'Jon Alvarez', role: 'nurse', initials: 'JA' },
  { id: 'pshah', name: 'Priya Shah', role: 'tech', initials: 'PS' },
  { id: 'dkim', name: 'Daniel Kim', role: 'tech', initials: 'DK' },
  { id: 'lmoreau', name: 'Léa Moreau', role: 'desk', initials: 'LM' },
  { id: 'tbaptiste', name: 'Theo Baptiste', role: 'desk', initials: 'TB' },
];

export const staffById = Object.fromEntries(staff.map((s) => [s.id, s])) as Record<string, Staff>;

/**
 * Export from the clinic's scheduling system for the week of Feb 9, 2026.
 * The export includes every shift that touches the week, so a night shift
 * that starts on the previous Sunday is included.
 */
export const shifts: Shift[] = [
  { id: 's01', staffId: 'jalvarez', start: '2026-02-08T22:00', end: '2026-02-09T06:00', status: 'assigned', note: 'Night cover' },

  // Mon 9
  { id: 's02', staffId: 'mchen', start: '2026-02-09T07:00', end: '2026-02-09T15:00', status: 'assigned' },
  { id: 's03', staffId: 'pshah', start: '2026-02-09T08:00', end: '2026-02-09T12:30', status: 'assigned' },
  { id: 's04', staffId: 'lmoreau', start: '2026-02-09T12:30', end: '2026-02-09T17:00', status: 'assigned' },
  { id: 's05', staffId: 'rokafor', start: '2026-02-09T15:00', end: '2026-02-09T23:00', status: 'assigned' },

  // Tue 10
  { id: 's06', staffId: 'mchen', start: '2026-02-10T07:00', end: '2026-02-10T15:00', status: 'assigned' },
  { id: 's07', staffId: 'dkim', start: '2026-02-10T09:00', end: '2026-02-10T17:30', status: 'assigned' },
  { id: 's08', staffId: 'tbaptiste', start: '2026-02-10T12:00', end: '2026-02-10T20:00', status: 'open' },

  // Wed 11
  { id: 's09', staffId: 'pshah', start: '2026-02-11T06:30', end: '2026-02-11T14:30', status: 'assigned' },
  { id: 's10', staffId: 'lmoreau', start: '2026-02-11T08:30', end: '2026-02-11T17:00', status: 'assigned' },
  { id: 's11', staffId: 'mchen', start: '2026-02-11T15:00', end: '2026-02-11T18:00', status: 'assigned', note: 'Vaccine clinic' },
  { id: 's12', staffId: 'jalvarez', start: '2026-02-11T19:00', end: '2026-02-12T03:30', status: 'assigned' },

  // Thu 12
  { id: 's13', staffId: 'rokafor', start: '2026-02-12T07:00', end: '2026-02-12T15:00', status: 'assigned' },
  { id: 's14', staffId: 'dkim', start: '2026-02-12T08:00', end: '2026-02-12T16:00', status: 'assigned' },
  { id: 's15', staffId: 'tbaptiste', start: '2026-02-12T16:00', end: '2026-02-13T00:00', status: 'assigned' },

  // Fri 13
  { id: 's16', staffId: 'mchen', start: '2026-02-13T07:00', end: '2026-02-13T15:00', status: 'assigned' },
  { id: 's17', staffId: 'pshah', start: '2026-02-13T15:30', end: '2026-02-13T19:30', status: 'assigned' },
  { id: 's18', staffId: 'lmoreau', start: '2026-02-13T09:00', end: '2026-02-13T17:00', status: 'assigned' },
  { id: 's19', staffId: 'rokafor', start: '2026-02-13T23:45', end: '2026-02-14T07:15', status: 'assigned', note: 'Night cover' },

  // Sat 14
  { id: 's20', staffId: 'dkim', start: '2026-02-14T06:00', end: '2026-02-14T14:00', status: 'assigned' },
  { id: 's21', staffId: 'tbaptiste', start: '2026-02-14T09:00', end: '2026-02-14T13:00', status: 'open' },

  // Sun 15
  { id: 's22', staffId: 'mchen', start: '2026-02-15T10:00', end: '2026-02-15T16:00', status: 'assigned' },
  { id: 's23', staffId: 'jalvarez', start: '2026-02-15T22:00', end: '2026-02-16T06:00', status: 'assigned', note: 'Night cover' },
];
