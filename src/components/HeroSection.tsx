import { SystemStatus } from "@/data/types";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const statusConfig: Record<SystemStatus, { label: string; icon: typeof CheckCircle; className: string }> = {
  normal: { label: "System Normal", icon: CheckCircle, className: "severity-normal" },
  warning: { label: "Warning Active", icon: AlertTriangle, className: "severity-warning" },
  critical: { label: "Critical Alert", icon: XCircle, className: "severity-critical" },
};

interface HeroSectionProps {
  systemStatus: SystemStatus;
}

const HeroSection = ({ systemStatus }: HeroSectionProps) => {
  const status = statusConfig[systemStatus];
  const Icon = status.icon;

  return (
    <section className="py-10 text-center sm:py-14">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Disaster Management AI
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
        Real-time Alerts & Emergency Coordination
      </p>
      <div className="mt-6 flex justify-center">
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}>
          <Icon className="h-4 w-4" />
          {status.label}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
