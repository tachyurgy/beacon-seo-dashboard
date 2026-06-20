const SEV_LABEL = { critical: "Critical", warning: "Warning", info: "Info" };

export default function IssuesList({ issues }) {
  return (
    <ul className="issues">
      {issues.map((issue, i) => (
        <li key={i} className={`issue issue-${issue.severity}`}>
          <span className={`sev sev-${issue.severity}`}>{SEV_LABEL[issue.severity]}</span>
          <div className="issue-body">
            <span className="issue-title">{issue.title}</span>
            <span className="issue-impact">{issue.impact}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
