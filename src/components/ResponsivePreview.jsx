import { useState } from "react";

const DEVICES = {
  mobile: { label: "Mobile", w: 150, h: 300 },
  tablet: { label: "Tablet", w: 240, h: 300 },
  desktop: { label: "Desktop", w: 420, h: 264 },
};

export default function ResponsivePreview({ site }) {
  const [device, setDevice] = useState("desktop");
  const d = DEVICES[device];

  return (
    <div className="rp">
      <div className="rp-toggle" role="tablist" aria-label="Device size">
        {Object.entries(DEVICES).map(([key, val]) => (
          <button
            key={key}
            role="tab"
            aria-selected={device === key}
            className={`rp-btn ${device === key ? "active" : ""}`}
            onClick={() => setDevice(key)}
          >
            {val.label}
          </button>
        ))}
      </div>
      <div className="rp-stage">
        <div
          className={`rp-frame rp-${device}`}
          style={{ width: d.w, height: d.h }}
        >
          {/* mock browser chrome */}
          <div className="rp-chrome">
            <span className="rp-dot" /><span className="rp-dot" /><span className="rp-dot" />
            <span className="rp-addr">{site.url}</span>
          </div>
          <div className="rp-mock">
            <div className="rp-nav">
              <div className="rp-logo" />
              {device !== "mobile" && (
                <div className="rp-links">
                  <span /><span /><span />
                </div>
              )}
              {device === "mobile" && <div className="rp-burger" />}
            </div>
            <div className="rp-hero" />
            <div className={`rp-cards rp-cards-${device}`}>
              <div /><div />{device !== "mobile" && <div />}
              {device === "desktop" && <div />}
            </div>
            <div className="rp-lines">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>
      <p className="rp-caption">{d.w} × {d.h} px preview · {DEVICES[device].label}</p>
    </div>
  );
}
