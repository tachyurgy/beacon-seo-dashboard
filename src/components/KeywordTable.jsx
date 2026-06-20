import { useMemo, useState } from "react";

const COLUMNS = [
  { key: "keyword", label: "Keyword", align: "left" },
  { key: "position", label: "Position", align: "right" },
  { key: "change", label: "Change", align: "right" },
  { key: "volume", label: "Volume", align: "right" },
  { key: "url", label: "URL", align: "left" },
];

export default function KeywordTable({ keywords }) {
  const [sort, setSort] = useState({ key: "position", dir: "asc" });

  const sorted = useMemo(() => {
    const arr = [...keywords];
    arr.sort((a, b) => {
      let av = a[sort.key];
      let bv = b[sort.key];
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [keywords, sort]);

  const toggle = (key) => {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  return (
    <div className="kw-wrap">
      <table className="kw-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`kw-th align-${col.align} ${sort.key === col.key ? "sorted" : ""}`}
                onClick={() => toggle(col.key)}
                aria-sort={sort.key === col.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
              >
                <span>{col.label}</span>
                <span className="kw-arrow">
                  {sort.key === col.key ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.keyword}>
              <td className="kw-keyword">{row.keyword}</td>
              <td className="align-right kw-pos">{row.position}</td>
              <td className="align-right">
                <span className={`kw-change ${row.change > 0 ? "up" : row.change < 0 ? "down" : "flat"}`}>
                  {row.change > 0 ? `▲ ${row.change}` : row.change < 0 ? `▼ ${Math.abs(row.change)}` : "—"}
                </span>
              </td>
              <td className="align-right kw-vol">{row.volume.toLocaleString()}</td>
              <td className="kw-url"><code>{row.url}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
