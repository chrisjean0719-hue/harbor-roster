import { KIND_LABEL, assets } from '../data/roster';

export function StaffLegend() {
  return (
    <section className="legend" aria-labelledby="legend-title">
      <h2 id="legend-title" className="legend__title">
        Equipment
      </h2>
      <ul className="legend__list">
        {assets.map((asset) => (
          <li key={asset.id} className="legend__item">
            <span className={`legend__avatar role-${asset.kind}`}>{asset.initials}</span>
            <span className="legend__text">
              <span className="legend__name">{asset.name}</span>
              <span className="legend__role">{KIND_LABEL[asset.kind]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
