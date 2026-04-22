import { Outlet, NavLink } from "react-router-dom";
import { Bell, Map, FileText, Shield, LayoutDashboard, LogOut } from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b">
          <h1 className="text-xl font-bold text-slate-800">
            Sentinel AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Disaster Management System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          {/* Overview */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Overview
          </NavLink>

          {/* Map */}
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Map size={18} />
            Live Map
          </NavLink>

          {/* Alerts */}
          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Bell size={18} />
            Alerts
          </NavLink>

          {/* Reports */}
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <FileText size={18} />
            Reports
          </NavLink>

          {/* Authority */}
          <NavLink
            to="/authority"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Shield size={18} />
            Authority
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t">
          <button className="flex items-center gap-3 text-sm text-red-500 hover:text-red-600 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            Disaster Control Center
          </h2>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
              System Active
            </span>
            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;