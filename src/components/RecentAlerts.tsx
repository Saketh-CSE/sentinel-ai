import { mockDisasters } from "@/data/mockData";
import SeverityBadge from "./SeverityBadge";
import { Clock } from "lucide-react";

const RecentAlerts = () => {
  return (
    <section className="mx-auto max-w-3xl px-4">
      <h2 className="mb-4 text-xl font-bold text-foreground">Recent Alerts</h2>
      <div className="space-y-2">
        {mockDisasters.map((d) => (
          <div
            key={d.id}
            className="card-elevated flex items-center justify-between rounded-lg px-4 py-3 transition-shadow hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${d.severity === "critical" ? "bg-severity-critical" : d.severity === "warning" ? "bg-severity-warning" : "bg-severity-normal"}`} />
              <div>
                <p className="text-sm font-semibold">{d.type} — {d.location}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {d.lastUpdated}
                </p>
              </div>
            </div>
            <SeverityBadge severity={d.severity} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentAlerts;
