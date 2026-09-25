import { useRef } from 'react';
import type { Shift } from '../data/roster';
import { dayOfMonth, formatClock, parseLocal, weekDates, weekdayOf } from '../lib/time';
import { DayColumn } from './DayColumn';
import './WeekBoard.css';

interface Props {
  weekStart: string;
  shifts: Shift[];
  openMenuId: string | null;
  onOpenMenu: (shift: Shift, anchor: HTMLButtonElement) => void;
}

const HOURS = Array.from({ length: 24 }, (_, h) => h);

export function WeekBoard({ weekStart, shifts, openMenuId, onOpenMenu }: Props) {
  const headRef = useRef<HTMLDivElement>(null);
  const days = weekDates(weekStart);

  const syncHead = (e: React.UIEvent<HTMLDivElement>) => {
    if (headRef.current) headRef.current.scrollLeft = e.currentTarget.scrollLeft;
  };

  return (
    <section className="board" aria-label="Week schedule">
      <div className="board__head" ref={headRef}>
        <div className="board__row">
          <div className="board__corner" />
          {days.map((date) => {
            const count = shifts.filter((s) => parseLocal(s.start).date === date).length;
            const weekend = ['Sat', 'Sun'].includes(weekdayOf(date));
            return (
              <div key={date} className={`board__day${weekend ? ' is-weekend' : ''}`}>
                <span className="board__weekday">{weekdayOf(date)}</span>
                <span className="board__date">{dayOfMonth(date)}</span>
                <span className="board__count">{count ? `${count} shift${count > 1 ? 's' : ''}` : '—'}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="board__scroller" onScroll={syncHead}>
        <div className="board__row board__body">
          <div className="board__gutter" aria-hidden="true">
            {HOURS.map((h) => (
              <div key={h} className="board__hour">
                {h === 0 ? '' : formatClock(h * 60, 'compact')}
              </div>
            ))}
          </div>
          {days.map((date) => (
            <DayColumn
              key={date}
              date={date}
              shifts={shifts}
              openMenuId={openMenuId}
              onOpenMenu={onOpenMenu}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
