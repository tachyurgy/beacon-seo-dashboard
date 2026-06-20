import { IconPass, IconWarn, IconFail } from "./Icons";

const ICONS = { pass: IconPass, warn: IconWarn, fail: IconFail };

export default function SeoChecklist({ items }) {
  const passed = items.filter((i) => i.status === "pass").length;
  const warns = items.filter((i) => i.status === "warn").length;
  const fails = items.filter((i) => i.status === "fail").length;

  return (
    <div className="checklist">
      <div className="checklist-summary">
        <span className="cs cs-pass">{passed} passed</span>
        {warns > 0 && <span className="cs cs-warn">{warns} warnings</span>}
        {fails > 0 && <span className="cs cs-fail">{fails} failed</span>}
      </div>
      <ul className="checklist-rows">
        {items.map((item) => {
          const Icon = ICONS[item.status];
          return (
            <li key={item.name} className={`check-row check-${item.status}`}>
              <Icon className={`check-icon check-icon-${item.status}`} />
              <div className="check-text">
                <span className="check-name">{item.name}</span>
                <span className="check-detail">{item.detail}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
