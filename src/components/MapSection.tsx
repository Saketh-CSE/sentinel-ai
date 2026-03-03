import { mockDisasters, DisasterData } from "@/data/mockData";
import SeverityBadge from "./SeverityBadge";

interface MapSectionProps {
  onSelectDisaster: (d: DisasterData) => void;
}

const MapSection = ({ onSelectDisaster }: MapSectionProps) => {
  return (
    <section className="mx-auto max-w-5xl px-4">
      <h2 className="mb-4 text-xl font-bold text-foreground">Live Disaster Map</h2>
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=68.0,6.0,97.0,37.0&layer=mapnik"
          className="h-[400px] w-full border-0 sm:h-[500px]"
          loading="lazy"
          title="Disaster Map"
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {mockDisasters.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectDisaster(d)}
            className="card-elevated flex items-center gap-3 rounded-lg p-3 text-left transition-shadow hover:shadow-md"
          >
            <div className={`h-3 w-3 rounded-full ${d.severity === "critical" ? "bg-severity-critical" : d.severity === "warning" ? "bg-severity-warning" : "bg-severity-normal"}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{d.type}</p>
              <p className="text-xs text-muted-foreground">{d.location}</p>
            </div>
            <SeverityBadge severity={d.severity} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default MapSection;
