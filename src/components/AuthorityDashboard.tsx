import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockDisasters } from "@/data/mockData";
import SeverityBadge from "./SeverityBadge";
import { ArrowLeft, MapPin, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface AuthorityDashboardProps {
  onBack: () => void;
}

const AuthorityDashboard = ({ onBack }: AuthorityDashboardProps) => {
  const { user } = useAuth();
  const [available, setAvailable] = useState(user?.isAvailable ?? true);

  if (!user || user.role !== "authority") return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </button>

      <div className="card-elevated rounded-xl p-6">
        <h2 className="text-xl font-bold">Authority Panel</h2>
        <p className="text-sm text-muted-foreground">{user.name} · {user.authorityRole}</p>

        <div className="mt-5 flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <p className="font-medium">Availability Status</p>
            <p className="text-sm text-muted-foreground">{available ? "You are visible to the public" : "You are hidden from requests"}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${available ? "severity-normal-text" : "severity-warning-text"}`}>
              {available ? "Available" : "Not Available"}
            </span>
            <Switch checked={available} onCheckedChange={setAvailable} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border p-4">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Assigned Location</p>
            <p className="text-sm text-muted-foreground">{user.location || "Not assigned"}</p>
          </div>
        </div>
      </div>

      <div className="card-elevated rounded-xl p-6">
        <h3 className="mb-3 text-lg font-bold">Nearby Disasters</h3>
        <div className="space-y-3">
          {mockDisasters.slice(0, 3).map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{d.type} — {d.location}</p>
                  <SeverityBadge severity={d.severity} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{d.description.slice(0, 60)}…</p>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="outline" onClick={() => toast.success("Emergency accepted")} className="h-8 gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Accept
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast.info("Declined")} className="h-8 gap-1 text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5" /> Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
