/**
 * All roster times are clinic-local wall-clock values ("YYYY-MM-DDTHH:mm")
 * with no zone attached. Date arithmetic goes through UTC so the browser's
 * own timezone never leaks into the schedule.
 */
export type LocalDateTime = string;
export type LocalDate = string;

export const MINUTES_PER_DAY = 24 * 60;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseLocal(value: LocalDateTime): { date: LocalDate; minutes: number } {
  const [date, time = '00:00'] = value.split('T');
  const [h, m] = time.split(':').map(Number);
  return { date, minutes: h * 60 + m };
}

function toUTC(date: LocalDate): Date {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function fromUTC(d: Date): LocalDate {
  return d.toISOString().slice(0, 10);
}

export function addDays(date: LocalDate, n: number): LocalDate {
  const d = toUTC(date);
  d.setUTCDate(d.getUTCDate() + n);
  return fromUTC(d);
}

export function weekDates(monday: LocalDate): LocalDate[] {
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function formatClock(minutes: number, style: 'full' | 'compact' = 'full'): string {
  const m = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const h24 = Math.floor(m / 60);
  const mins = m % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const pm = h24 >= 12;
  if (style === 'compact') {
    return `${h12}${mins ? `:${String(mins).padStart(2, '0')}` : ''}${pm ? 'p' : 'a'}`;
  }
  return `${h12}:${String(mins).padStart(2, '0')} ${pm ? 'PM' : 'AM'}`;
}

export function formatRange(start: number, end: number, style: 'full' | 'compact' = 'full'): string {
  return style === 'compact'
    ? `${formatClock(start, 'compact')}–${formatClock(end, 'compact')}`
    : `${formatClock(start)} – ${formatClock(end)}`;
}

export function weekdayOf(date: LocalDate): string {
  return WEEKDAYS[toUTC(date).getUTCDay()];
}

export function dayOfMonth(date: LocalDate): number {
  return toUTC(date).getUTCDate();
}

export function formatWeekRange(monday: LocalDate): string {
  const start = toUTC(monday);
  const end = toUTC(addDays(monday, 6));
  const sm = MONTHS[start.getUTCMonth()];
  const em = MONTHS[end.getUTCMonth()];
  const year = end.getUTCFullYear();
  return sm === em
    ? `${sm} ${start.getUTCDate()} – ${end.getUTCDate()}, ${year}`
    : `${sm} ${start.getUTCDate()} – ${em} ${end.getUTCDate()}, ${year}`;
}
