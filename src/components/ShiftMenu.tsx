import { useRef } from 'react';
import type { Shift } from '../data/roster';
import { staffById } from '../data/roster';
import { useDismiss } from '../hooks/useDismiss';
import { formatClock, parseLocal, weekdayOf } from '../lib/time';
import { Portal } from './Portal';
import './ShiftMenu.css';

export type ShiftAction = 'edit' | 'swap' | 'toggle-open' | 'delete';

interface Props {
  shift: Shift;
  anchor: HTMLButtonElement;
  onClose: () => void;
  onAction: (action: ShiftAction, shift: Shift) => void;
}

const MENU_WIDTH = 224;

export function ShiftMenu({ shift, anchor, onClose, onAction }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, onClose, anchor);

  const rect = anchor.getBoundingClientRect();
  const start = parseLocal(shift.start);
  const end = parseLocal(shift.end);
  const person = staffById[shift.staffId];

  const items: { action: ShiftAction; label: string; danger?: boolean }[] = [
    { action: 'edit', label: 'Edit shift…' },
    { action: 'swap', label: 'Swap with…' },
    { action: 'toggle-open', label: shift.status === 'open' ? 'Assign to ' + person.name : 'Mark as open shift' },
    { action: 'delete', label: 'Delete shift', danger: true },
  ];

  return (
    <Portal>
      <div
        ref={ref}
        className="shift-menu"
        role="menu"
        aria-label={`Actions for ${person.name}`}
        style={{ top: rect.bottom + 4, left: rect.right - MENU_WIDTH, width: MENU_WIDTH }}
      >
        <div className="shift-menu__header">
          <strong>{person.name}</strong>
          <span>
            {weekdayOf(start.date)} {formatClock(start.minutes)} – {weekdayOf(end.date)} {formatClock(end.minutes)}
          </span>
        </div>
        {items.map((item) => (
          <button
            key={item.action}
            type="button"
            role="menuitem"
            className={`shift-menu__item${item.danger ? ' is-danger' : ''}`}
            onClick={() => onAction(item.action, shift)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </Portal>
  );
}
