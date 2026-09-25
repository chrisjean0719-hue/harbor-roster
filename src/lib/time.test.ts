import { describe, expect, it } from 'vitest';
import { addDays, formatClock, formatRange, formatWeekRange, parseLocal, weekDates, weekdayOf } from './time';

describe('time', () => {
  it('parses clinic-local timestamps', () => {
    expect(parseLocal('2026-02-13T23:45')).toEqual({ date: '2026-02-13', minutes: 1425 });
    expect(parseLocal('2026-02-14T00:00')).toEqual({ date: '2026-02-14', minutes: 0 });
  });

  it('adds days across month boundaries', () => {
    expect(addDays('2026-02-27', 3)).toBe('2026-03-02');
    expect(weekDates('2026-02-09')).toHaveLength(7);
    expect(weekdayOf('2026-02-15')).toBe('Sun');
  });

  it('formats clock values', () => {
    expect(formatClock(1425)).toBe('11:45 PM');
    expect(formatClock(435)).toBe('7:15 AM');
    expect(formatClock(0)).toBe('12:00 AM');
    expect(formatClock(1425, 'compact')).toBe('11:45p');
    expect(formatClock(420, 'compact')).toBe('7a');
  });

  it('formats ranges', () => {
    expect(formatRange(1425, 435)).toBe('11:45 PM – 7:15 AM');
    expect(formatRange(540, 1020, 'compact')).toBe('9a–5p');
  });

  it('formats the week label', () => {
    expect(formatWeekRange('2026-02-09')).toBe('Feb 9 – 15, 2026');
    expect(formatWeekRange('2026-02-23')).toBe('Feb 23 – Mar 1, 2026');
  });
});
