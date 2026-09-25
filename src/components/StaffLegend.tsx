import { ROLE_LABEL, staff } from '../data/roster';

export function StaffLegend() {
  return (
    <section className="legend" aria-labelledby="legend-title">
      <h2 id="legend-title" className="legend__title">
        On the roster
      </h2>
      <ul className="legend__list">
        {staff.map((s) => (
          <li key={s.id} className="legend__item">
            <span className={`legend__avatar role-${s.role}`}>{s.initials}</span>
            <span className="legend__text">
              <span className="legend__name">{s.name}</span>
              <span className="legend__role">{ROLE_LABEL[s.role]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
