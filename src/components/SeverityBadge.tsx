import { Severity } from "@/data/types";

const config: Record<Severity, { label: string; className: string }> = {
  normal: { label: "Low", className: "severity-normal" },
  warning: { label: "Medium", className: "severity-warning" },
  critical: { label: "High", className: "severity-critical" },
};

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const c = config[severity];
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${c.className}`}>
      {c.label}
    </span>
  );
};

export default SeverityBadge;
