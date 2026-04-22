import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import NotFound from "@/pages/NotFound";

import DashboardLayout from "@/layouts/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import MapPage from "@/pages/dashboard/MapPage";
import AlertsPage from "@/pages/dashboard/AlertsPage";
import ReportsPage from "@/pages/dashboard/ReportsPage";
import AuthorityPage from "@/pages/dashboard/AuthorityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>

            {/* Dashboard as Root */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="map" element={<MapPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="authority" element={<AuthorityPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;