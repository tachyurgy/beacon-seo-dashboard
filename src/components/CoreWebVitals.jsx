import { VITALS_META, vitalStatus } from "../data";

const STATUS_TEXT = { good: "Good", ni: "Needs work", fail: "Poor" };

function VitalCard({ vkey, value }) {
  const m = VITALS_META[vkey];
  const status = vitalStatus(vkey, value);
  // position of the marker along the bar (0..100%), clamped
  const pos = Math.min((value / m.max) * 100, 100);
  // threshold marker positions
  const goodPct = (m.good / m.max) * 100;
  const niPct = (m.ni / m.max) * 100;

  return (
    <div className={`vital vital-${status}`}>
      <div className="vital-head">
        <div>
          <span className="vital-label">{m.label}</span>
          <span className="vital-full">{m.full}</span>
        </div>
        <span className={`vital-badge badge-${status}`}>{STATUS_TEXT[status]}</span>
      </div>
      <div className="vital-value">{m.format(value)}</div>
      <div className="vital-bar" aria-hidden="true">
        <div className="vital-seg seg-good" style={{ width: `${goodPct}%` }} />
        <div className="vital-seg seg-ni" style={{ width: `${niPct - goodPct}%` }} />
        <div className="vital-seg seg-fail" style={{ width: `${100 - niPct}%` }} />
        <div className="vital-marker" style={{ left: `${pos}%` }} />
      </div>
      <div className="vital-scale">
        <span>0</span>
        <span>{m.format(m.good)}</span>
        <span>{m.format(m.ni)}</span>
      </div>
    </div>
  );
}

export default function CoreWebVitals({ vitals }) {
  return (
    <div className="vitals-grid">
      {Object.keys(VITALS_META).map((k) => (
        <VitalCard key={k} vkey={k} value={vitals[k]} />
      ))}
    </div>
  );
}
