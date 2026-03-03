import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Severity } from "@/data/types";
import { toast } from "sonner";

interface Report {
  type: string;
  location: string;
  description: string;
  severity: Severity;
  time: string;
}

interface IncidentReportProps {
  onReport: (r: Report) => void;
}

const IncidentReport = ({ onReport }: IncidentReportProps) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("warning");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !location || !description) {
      toast.error("Please fill all fields");
      return;
    }
    onReport({ type, location, description, severity, time: "Just now" });
    toast.success("Incident reported successfully");
    setType("");
    setLocation("");
    setDescription("");
    setSeverity("warning");
  };

  return (
    <section className="mx-auto max-w-2xl px-4">
      <h2 className="mb-4 text-xl font-bold text-foreground">Report an Incident</h2>
      <form onSubmit={handleSubmit} className="card-elevated space-y-4 rounded-xl p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Disaster Type</Label>
            <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. Flood, Fire…" />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or area" />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the situation…" rows={3} />
        </div>
        <div>
          <Label>Severity</Label>
          <div className="mt-1 flex gap-2">
            {(["normal", "warning", "critical"] as Severity[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeverity(s)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${severity === s
                  ? s === "normal" ? "severity-normal" : s === "warning" ? "severity-warning" : "severity-critical"
                  : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
              >
                {s === "normal" ? "Low" : s === "warning" ? "Medium" : "High"}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit">Submit Report</Button>
      </form>
    </section>
  );
};

export default IncidentReport;
