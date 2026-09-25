import { describe, expect, it } from 'vitest';
import type { Shift } from '../data/roster';
import { layoutDay } from './layout';

const shift = (id: string, start: string, end: string): Shift => ({
  id,
  staffId: 'mchen',
  start: `2026-02-10T${start}`,
  end: `2026-02-10T${end}`,
  status: 'assigned',
});

describe('layoutDay', () => {
  it('positions a single shift by hour height', () => {
    const [p] = layoutDay([shift('a', '09:00', '17:00')], '2026-02-10', 40);
    expect(p.top).toBe(360);
    expect(p.height).toBe(320);
    expect(p.lanes).toBe(1);
  });

  it('packs overlapping shifts into lanes', () => {
    const out = layoutDay(
      [shift('a', '07:00', '15:00'), shift('b', '09:00', '13:00'), shift('c', '13:00', '17:00')],
      '2026-02-10',
      40,
    );
    const byId = Object.fromEntries(out.map((p) => [p.shift.id, p]));
    expect(byId.a.lane).toBe(0);
    expect(byId.b.lane).toBe(1);
    expect(byId.c.lane).toBe(1);
    expect(out.every((p) => p.lanes === 2)).toBe(true);
  });

  it('starts a new cluster after a gap', () => {
    const out = layoutDay([shift('a', '07:00', '09:00'), shift('b', '10:00', '12:00')], '2026-02-10', 40);
    expect(out.map((p) => p.lanes)).toEqual([1, 1]);
  });

  it('ignores shifts on other days', () => {
    expect(layoutDay([shift('a', '07:00', '09:00')], '2026-02-11', 40)).toEqual([]);
  });
});
