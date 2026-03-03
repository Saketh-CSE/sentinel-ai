import { X, Phone } from "lucide-react";
import { mockAuthorities } from "@/data/mockData";
import { DisasterData } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const roleColors: Record<string, string> = {
  Doctor: "bg-severity-info",
  Police: "bg-primary",
  Fire: "bg-severity-critical",
  Rescue: "bg-severity-warning",
  Volunteer: "bg-severity-normal",
};

interface AuthoritiesPanelProps {
  disaster: DisasterData;
  onClose: () => void;
}

const AuthoritiesPanel = ({ disaster, onClose }: AuthoritiesPanelProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="card-elevated mx-4 w-full max-w-lg rounded-xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Nearby Authorities</h2>
            <p className="text-sm text-muted-foreground">{disaster.location} — {disaster.type}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {mockAuthorities.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-primary-foreground ${roleColors[a.role] || "bg-muted"}`}>
                  {a.role[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.role} · {a.distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.availability === "Available" ? "severity-normal" : "severity-warning"}`}>
                  {a.availability}
                </span>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0" asChild>
                  <a href={`tel:${a.contact}`}><Phone className="h-3.5 w-3.5" /></a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthoritiesPanel;
