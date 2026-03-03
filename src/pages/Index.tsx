import { useState } from "react";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import MapSection from "@/components/MapSection";
import AuthoritiesPanel from "@/components/AuthoritiesPanel";
import IncidentReport from "@/components/IncidentReport";
import RecentAlerts from "@/components/RecentAlerts";
import AuthorityDashboard from "@/components/AuthorityDashboard";
import { DisasterData } from "@/data/mockData";
import { SystemStatus } from "@/data/types";

const Index = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterData | null>(null);
  const [showAuthorityPanel, setShowAuthorityPanel] = useState(false);
  const systemStatus: SystemStatus = "warning";

  if (showAuthorityPanel) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar onAuthorityPanel={() => setShowAuthorityPanel(true)} />
        <AuthorityDashboard onBack={() => setShowAuthorityPanel(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar onAuthorityPanel={() => setShowAuthorityPanel(true)} />
      <HeroSection systemStatus={systemStatus} />

      <div className="space-y-12 pb-16">
        <SearchSection onSelectDisaster={setSelectedDisaster} />
        <MapSection onSelectDisaster={setSelectedDisaster} />
        <IncidentReport onReport={() => {}} />
        <RecentAlerts />
      </div>

      {selectedDisaster && (
        <AuthoritiesPanel disaster={selectedDisaster} onClose={() => setSelectedDisaster(null)} />
      )}
    </div>
  );
};

export default Index;
