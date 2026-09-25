import { useCallback, useMemo, useState } from 'react';
import { AppShell } from './components/AppShell';
import { ShiftMenu, type ShiftAction } from './components/ShiftMenu';
import { Toolbar } from './components/Toolbar';
import { WeekBoard } from './components/WeekBoard';
import { CLINIC, shifts as initialShifts, staffById, type Role, type Shift } from './data/roster';
import { addDays, parseLocal, weekDates } from './lib/time';

type Filter = Role | 'all';

export default function App() {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [weekStart, setWeekStart] = useState(CLINIC.week);
  const [filter, setFilter] = useState<Filter>('all');
  const [menu, setMenu] = useState<{ shift: Shift; anchor: HTMLButtonElement } | null>(null);
  const [status, setStatus] = useState('');

  const visible = useMemo(() => {
    const days = weekDates(weekStart);
    return shifts.filter(
      (s) =>
        days.includes(parseLocal(s.start).date) &&
        (filter === 'all' || staffById[s.staffId].role === filter),
    );
  }, [shifts, weekStart, filter]);

  const closeMenu = useCallback(() => setMenu(null), []);

  const openMenu = useCallback((shift: Shift, anchor: HTMLButtonElement) => {
    setMenu((current) => (current?.shift.id === shift.id ? null : { shift, anchor }));
  }, []);

  const handleAction = (action: ShiftAction, shift: Shift) => {
    const name = staffById[shift.staffId].name;
    if (action === 'toggle-open') {
      setShifts((all) =>
        all.map((s) => (s.id === shift.id ? { ...s, status: s.status === 'open' ? 'assigned' : 'open' } : s)),
      );
      setStatus(shift.status === 'open' ? `Shift assigned to ${name}` : `${name}'s shift marked as open`);
    } else if (action === 'delete') {
      setShifts((all) => all.filter((s) => s.id !== shift.id));
      setStatus(`Deleted ${name}'s shift`);
    } else {
      setStatus(action === 'edit' ? 'Shift editor is not available in this preview' : 'Shift swaps are not available in this preview');
    }
    closeMenu();
  };

  return (
    <AppShell>
      <Toolbar
        weekStart={weekStart}
        filter={filter}
        shiftCount={visible.length}
        status={status}
        onFilter={setFilter}
        onWeek={(d) => {
          closeMenu();
          setWeekStart((w) => addDays(w, d * 7));
        }}
      />
      {visible.length === 0 && weekStart !== CLINIC.week ? (
        <p className="empty">No shifts have been published for this week yet.</p>
      ) : (
        <WeekBoard
          weekStart={weekStart}
          shifts={visible}
          openMenuId={menu?.shift.id ?? null}
          onOpenMenu={openMenu}
        />
      )}
      {menu && <ShiftMenu shift={menu.shift} anchor={menu.anchor} onClose={closeMenu} onAction={handleAction} />}
    </AppShell>
  );
}
