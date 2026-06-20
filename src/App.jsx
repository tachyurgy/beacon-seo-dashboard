import { useEffect, useRef, useState } from "react";
import { SITES } from "./data";
import ScoreRing from "./components/ScoreRing";
import CoreWebVitals from "./components/CoreWebVitals";
import SeoChecklist from "./components/SeoChecklist";
import KeywordTable from "./components/KeywordTable";
import IssuesList from "./components/IssuesList";
import ResponsivePreview from "./components/ResponsivePreview";
import { IconBeacon, IconSun, IconMoon } from "./components/Icons";

const SCAN_STEPS = [
  "Fetching page…",
  "Auditing performance…",
  "Analyzing on-page SEO…",
  "Checking Core Web Vitals…",
  "Scoring accessibility…",
  "Compiling report…",
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("beacon-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("beacon-theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [siteIndex, setSiteIndex] = useState(0);
  const [urlInput, setUrlInput] = useState(SITES[0].url);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [runKey, setRunKey] = useState(0); // forces gauge re-animate
  const timers = useRef([]);

  const site = SITES[siteIndex];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const runAudit = (index) => {
    const idx = index ?? siteIndex;
    clearTimers();
    setScanning(true);
    setProgress(0);
    setStep(0);
    const total = 1900;
    const stepCount = SCAN_STEPS.length;
    for (let i = 1; i <= stepCount; i++) {
      timers.current.push(
        setTimeout(() => {
          setStep(i - 1);
          setProgress(Math.round((i / stepCount) * 100));
        }, (total / stepCount) * (i - 1) + 80)
      );
    }
    timers.current.push(
      setTimeout(() => {
        setScanning(false);
        setSiteIndex(idx);
        setUrlInput(SITES[idx].url);
        setRunKey((k) => k + 1);
      }, total)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runAudit();
  };

  const selectSite = (idx) => {
    setUrlInput(SITES[idx].url);
    runAudit(idx);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><IconBeacon /></span>
          <div className="brand-text">
            <span className="brand-name">Beacon</span>
            <span className="brand-tag">SEO &amp; Site-Health Dashboard</span>
          </div>
          <span className="demo-badge" title="All numbers are illustrative sample data, not a live crawl.">
            Demo data
          </span>
        </div>

        <form className="search" onSubmit={onSubmit}>
          <input
            className="search-input"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            aria-label="Site URL to audit"
            spellCheck="false"
          />
          <button className="btn-run" type="submit" disabled={scanning}>
            {scanning ? "Scanning…" : "Run audit"}
          </button>
        </form>

        <button className="theme-toggle" onClick={toggleTheme}
                aria-label="Toggle color theme">
          {theme === "dark" ? <IconSun /> : <IconMoon />}
        </button>
      </header>

      <main className="content">
        <div className="site-tabs">
          <span className="site-tabs-label">Example sites:</span>
          {SITES.map((s, i) => (
            <button
              key={s.id}
              className={`site-tab ${i === siteIndex && !scanning ? "active" : ""}`}
              onClick={() => selectSite(i)}
              disabled={scanning}
            >
              <span className="site-tab-name">{s.url}</span>
              <span className="site-tab-type">{s.type}</span>
            </button>
          ))}
        </div>

        {scanning ? (
          <div className="scanner" role="status" aria-live="polite">
            <div className="scan-ring">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="34" className="scan-track" fill="none" strokeWidth="5" />
                <circle cx="40" cy="40" r="34" className="scan-arc" fill="none" strokeWidth="5"
                        strokeLinecap="round" />
              </svg>
              <span className="scan-pct">{progress}%</span>
            </div>
            <div className="scan-step">{SCAN_STEPS[step]}</div>
            <div className="scan-bar"><div className="scan-fill" style={{ width: `${progress}%` }} /></div>
            <div className="scan-target">Auditing <strong>{urlInput}</strong></div>
          </div>
        ) : (
          <div className="results" key={runKey}>
            <div className="result-head">
              <div>
                <h1 className="result-title">{site.label}</h1>
                <p className="result-sub">
                  <a href={`https://${site.url}`} className="result-url"
                     onClick={(e) => e.preventDefault()}>{site.url}</a>
                  <span className="result-type">{site.type}</span>
                </p>
              </div>
              <span className="result-time">Audited just now · demo snapshot</span>
            </div>

            <section className="panel panel-rings">
              <div className="rings-grid">
                <ScoreRing label="Performance" value={site.scores.performance} delay={0} />
                <ScoreRing label="SEO" value={site.scores.seo} delay={120} />
                <ScoreRing label="Accessibility" value={site.scores.accessibility} delay={240} />
                <ScoreRing label="Best Practices" value={site.scores.bestPractices} delay={360} />
              </div>
            </section>

            <div className="grid-two">
              <section className="panel">
                <h2 className="panel-title">Core Web Vitals
                  <span className="panel-note">field-data thresholds</span></h2>
                <CoreWebVitals vitals={site.vitals} />
              </section>

              <section className="panel">
                <h2 className="panel-title">Prioritized issues</h2>
                <IssuesList issues={site.issues} />
              </section>
            </div>

            <div className="grid-two">
              <section className="panel">
                <h2 className="panel-title">On-page SEO audit</h2>
                <SeoChecklist items={site.seoChecklist} />
              </section>

              <section className="panel">
                <h2 className="panel-title">Responsive preview
                  <span className="panel-note">{site.url}</span></h2>
                <ResponsivePreview site={site} />
              </section>
            </div>

            <section className="panel">
              <h2 className="panel-title">Keyword rankings
                <span className="panel-note">click a column to sort</span></h2>
              <KeywordTable keywords={site.keywords} />
            </section>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>
          Built by <a href="https://consulting.levelbrook.com" target="_blank" rel="noreferrer">Levelbrook Consulting</a>
          {" · "}React + Vite · Demo data for illustration
        </span>
        <a href="https://github.com/tachyurgy/beacon-seo-dashboard" target="_blank" rel="noreferrer" className="footer-gh">
          Source on GitHub
        </a>
      </footer>
    </div>
  );
}
