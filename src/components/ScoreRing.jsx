import { useEffect, useRef, useState } from "react";

function rateColor(v) {
  if (v >= 90) return "var(--good)";
  if (v >= 50) return "var(--warn)";
  return "var(--bad)";
}

export default function ScoreRing({ label, value, delay = 0 }) {
  const [shown, setShown] = useState(0);
  const raf = useRef();

  useEffect(() => {
    let start;
    const dur = 1100;
    const begin = performance.now() + delay;
    const tick = (now) => {
      if (now < begin) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      if (start === undefined) start = now;
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, delay]);

  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - shown / 100);
  const color = rateColor(value);

  return (
    <div className="ring">
      <svg viewBox="0 0 128 128" width="128" height="128" role="img"
           aria-label={`${label} score ${value} out of 100`}>
        <circle cx="64" cy="64" r={r} className="ring-track" strokeWidth="9" fill="none" />
        <circle
          cx="64" cy="64" r={r} strokeWidth="9" fill="none"
          stroke={color} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          transform="rotate(-90 64 64)"
        />
        <text x="64" y="64" className="ring-value" style={{ fill: color }}
              textAnchor="middle" dominantBaseline="central">{shown}</text>
      </svg>
      <span className="ring-label">{label}</span>
    </div>
  );
}
