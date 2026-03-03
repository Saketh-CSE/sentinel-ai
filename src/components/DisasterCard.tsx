import { Clock, ShieldAlert } from "lucide-react";
import { DisasterData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import SeverityBadge from "./SeverityBadge";

interface DisasterCardProps {
  disaster: DisasterData;
  onViewAuthorities: () => void;
}

const DisasterCard = ({ disaster, onViewAuthorities }: DisasterCardProps) => {
  return (
    <div className="card-elevated rounded-xl p-5 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{disaster.type}</span>
            <SeverityBadge severity={disaster.severity} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{disaster.location}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{disaster.description}</p>

          <div className="mt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Safety Instructions</p>
            <ul className="space-y-1">
              {disaster.safetyInstructions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {disaster.lastUpdated}
            </span>
            <Button size="sm" variant="outline" onClick={onViewAuthorities}>
              View Nearby Authorities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterCard;
