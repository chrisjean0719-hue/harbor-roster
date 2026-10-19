import type { Kind } from '../data/roster';
import { KIND_LABEL } from '../data/roster';
import { formatWeekRange } from '../lib/time';
import './Toolbar.css';

type Filter = Kind | 'all';

interface Props {
  weekStart: string;
  filter: Filter;
  shiftCount: number;
  status: string;
  onFilter: (f: Filter) => void;
  onWeek: (delta: number) => void;
}

const FILTERS: Filter[] = ['all', 'berth', 'crane', 'launch'];

export function Toolbar({ weekStart, filter, shiftCount, status, onFilter, onWeek }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar__week">
        <div className="toolbar__stepper">
          <button type="button" aria-label="Previous week" onClick={() => onWeek(-1)}>
            ‹
          </button>
          <button type="button" aria-label="Next week" onClick={() => onWeek(1)}>
            ›
          </button>
        </div>
        <div>
          <h1 className="toolbar__title">{formatWeekRange(weekStart)}</h1>
          <p className="toolbar__meta">{`${shiftCount} ${shiftCount === 1 ? 'booking' : 'bookings'} this week`}</p>
        </div>
      </div>

      <div className="toolbar__filters" role="group" aria-label="Filter by equipment">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="chip"
            aria-pressed={filter === f}
            onClick={() => onFilter(f)}
          >
            {f === 'all' ? 'All equipment' : KIND_LABEL[f]}
          </button>
        ))}
      </div>

      <p className="toolbar__status" role="status">
        {status}
      </p>
    </div>
  );
}
