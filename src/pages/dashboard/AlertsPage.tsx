import { useState } from "react";

const dummyAlerts = [
  {
    id: 1,
    location: "Vijayawada",
    type: "Flood",
    severity: "High",
    status: "Active",
  },
  {
    id: 2,
    location: "Hyderabad",
    type: "Heatwave",
    severity: "Medium",
    status: "Monitoring",
  },
  {
    id: 3,
    location: "Chennai",
    type: "Cyclone",
    severity: "Critical",
    status: "Emergency",
  },
];

const severityStyles: any = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-yellow-100 text-yellow-600",
  High: "bg-orange-100 text-orange-600",
  Critical: "bg-red-100 text-red-600",
};

const AlertsPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredAlerts =
    filter === "All"
      ? dummyAlerts
      : dummyAlerts.filter((alert) => alert.severity === filter);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Active Alerts
        </h1>
        <p className="text-slate-500 mt-2">
          Monitor and manage real-time disaster alerts
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        {["All", "Low", "Medium", "High", "Critical"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
              filter === level
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAlerts.map((alert) => (
              <tr
                key={alert.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium text-slate-700">
                  {alert.location}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {alert.type}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      severityStyles[alert.severity]
                    }`}
                  >
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AlertsPage;