import type { Shift } from '../data/roster';
import { layoutDay } from '../lib/layout';
import { weekdayOf } from '../lib/time';
import { ShiftCard } from './ShiftCard';

export const HOUR_HEIGHT = 44;

interface Props {
  date: string;
  shifts: Shift[];
  openMenuId: string | null;
  onOpenMenu: (shift: Shift, anchor: HTMLButtonElement) => void;
}

export function DayColumn({ date, shifts, openMenuId, onOpenMenu }: Props) {
  const positioned = layoutDay(shifts, date, HOUR_HEIGHT);
  const weekend = ['Sat', 'Sun'].includes(weekdayOf(date));

  return (
    <div className={`day-col${weekend ? ' is-weekend' : ''}`} data-date={date}>
      {positioned.map((p) => (
        <ShiftCard
          key={p.shift.id}
          placement={p}
          menuOpen={openMenuId === p.shift.id}
          onOpenMenu={onOpenMenu}
        />
      ))}
    </div>
  );
}
