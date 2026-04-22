import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle, Users, FileText, Activity } from "lucide-react";

const Overview = () => {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState(0);
  const [highSeverity, setHighSeverity] = useState(0);
  const [authorities, setAuthorities] = useState(0);
  const [reports, setReports] = useState(0);

  const fetchDashboardData = async () => {
    try {

      const alertsRes = await fetch("http://127.0.0.1:5000/communication_logs");
      const alertsData = await alertsRes.json();

      if (alertsData.logs) {
        setAlerts(alertsData.logs.length);

        const high = alertsData.logs.filter(
          (a: any) => a.severity === "High" || a.severity === "Critical"
        );
        setHighSeverity(high.length);
      }

      const authRes = await fetch("http://127.0.0.1:5000/api/authorities");
      const authData = await authRes.json();
      setAuthorities(authData.length);

      const reportsRes = await fetch("http://127.0.0.1:5000/api/reports");
      const reportsData = await reportsRes.json();
      setReports(reportsData.length);

    } catch (err) {
      console.error("Dashboard data error", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-2">
          Real-time disaster monitoring and coordination system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Active Alerts</h3>
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">{alerts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">High Severity</h3>
            <Activity className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">{highSeverity}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Available Authorities</h3>
            <Users className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">{authorities}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Pending Reports</h3>
            <FileText className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold mt-4">{reports}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/map")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-105 transition"
          >
            View Live Map
          </button>

          <button
            onClick={() => navigate("/alerts")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:scale-105 transition"
          >
            View Alerts
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:scale-105 transition"
          >
            View Reports
          </button>

        </div>
      </div>

    </div>
  );
};

export default Overview;