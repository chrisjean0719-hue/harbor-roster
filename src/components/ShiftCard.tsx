import { useRef } from 'react';
import type { Shift } from '../data/roster';
import { staffById } from '../data/roster';
import { useElementWidth } from '../hooks/useElementWidth';
import type { PositionedShift } from '../lib/layout';
import { formatRange } from '../lib/time';
import './ShiftCard.css';

const COMPACT_BELOW_PX = 150;

interface Props {
  placement: PositionedShift;
  menuOpen: boolean;
  onOpenMenu: (shift: Shift, anchor: HTMLButtonElement) => void;
}

export function ShiftCard({ placement, menuOpen, onOpenMenu }: Props) {
  const { shift, startMin, endMin, top, height, lane, lanes } = placement;
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const person = staffById[shift.staffId];
  const compact = width !== null && width < COMPACT_BELOW_PX;
  const range = formatRange(startMin, endMin, compact ? 'compact' : 'full');

  return (
    <div
      ref={ref}
      className={`shift role-${person.role}${shift.status === 'open' ? ' is-open' : ''}`}
      style={{
        top,
        height,
        left: `calc(${(lane / lanes) * 100}% + 2px)`,
        width: `calc(${100 / lanes}% - 4px)`,
      }}
      data-shift-id={shift.id}
    >
      <div className="shift__name">{shift.status === 'open' ? 'Open shift' : person.name}</div>
      <div className="shift__time">{range}</div>
      {shift.note && <div className="shift__note">{shift.note}</div>}
      <button
        type="button"
        className="shift__more"
        aria-label={`Actions for ${person.name}, ${formatRange(startMin, endMin)}`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={(e) => onOpenMenu(shift, e.currentTarget)}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="3.5" cy="8" r="1.4" fill="currentColor" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" />
          <circle cx="12.5" cy="8" r="1.4" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
