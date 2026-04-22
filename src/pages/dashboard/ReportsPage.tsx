import { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000/api/reports";

const severityStyles: any = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-yellow-100 text-yellow-600",
  High: "bg-orange-100 text-orange-600",
  Critical: "bg-red-100 text-red-600",
};

const statusStyles: any = {
  Pending: "bg-gray-100 text-gray-600",
  Verified: "bg-blue-100 text-blue-600",
  Assigned: "bg-purple-100 text-purple-600",
  Resolved: "bg-green-100 text-green-600",
};

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const formatted = data.map((r: any) => ({
        id: r.id,
        location: r.incidentLocation,
        type: r.incidentType,
        severity: r.incidentSeverity,
        status: "Pending",
        description: r.incidentDescription,
        timestamp: r.timestamp,
      }));

      setReports(formatted);
    } catch (err) {
      console.error("Error fetching reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Incident Reports
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and verify public incident submissions
        </p>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-6 py-6" colSpan={5}>
                  Loading reports...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td className="px-6 py-6" colSpan={5}>
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {report.location}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {report.type}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        severityStyles[report.severity] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {report.severity}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        statusStyles[report.status]
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelected(report)}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:scale-105 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* Selected Report Details */}
      {selected && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Report Details
          </h3>

          <p>
            <strong>Location:</strong> {selected.location}
          </p>

          <p className="mt-2">
            <strong>Type:</strong> {selected.type}
          </p>

          <p className="mt-2">
            <strong>Severity:</strong> {selected.severity}
          </p>

          <p className="mt-2">
            <strong>Description:</strong> {selected.description}
          </p>

          {selected.timestamp && (
            <p className="mt-2 text-sm text-slate-500">
              {selected.timestamp}
            </p>
          )}

          <button
            onClick={() => setSelected(null)}
            className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
};

export default ReportsPage;