"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  Building2,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Activity,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("heritagepulse_token");
    if (!token) {
      token = "demo-admin-token";
      localStorage.setItem("heritagepulse_token", token);
      localStorage.setItem("heritagepulse_user", JSON.stringify({ email: "admin@heritagepulse.local" }));
    }
    const storedUser = localStorage.getItem("heritagepulse_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({ email: "admin@heritagepulse.local" });
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("heritagepulse_token");
    localStorage.removeItem("heritagepulse_user");
    router.push("/login");
  };

  const runSimulationTick = async () => {
    setSimulating(true);
    try {
      await fetch("/api/simulation/tick", { method: "POST" });
      // Trigger a page refresh to pull new stats
      window.dispatchEvent(new Event("heritagepulse_sim_update"));
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setSimulating(false), 500);
    }
  };

  const navLinks = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Heritage Sites", href: "/dashboard/sites", icon: Building2 },
    { label: "Analytics & Flow", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Crowd Alerts", href: "/dashboard/alerts", icon: Bell, badge: "Live" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#142735] text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d1b36a] text-[#142735] flex items-center justify-center font-bold">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">HeritagePulse</div>
              <div className="text-[9px] uppercase tracking-wider text-amber-200/60">Control Center</div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-3 py-2">
            Operations Workspace
          </div>

          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#d1b36a] text-slate-950 shadow-md"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-slate-950 text-white" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-3 py-2">
              Public Portal
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4" />
                View Visitor Portal
              </div>
            </Link>
          </div>
        </div>

        {/* Telemetry Status Box */}
        <div className="p-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Monitoring Active
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed">
              Optical gate counts & ticket time slots continuously synchronizing.
            </p>
          </div>
        </div>

        {/* User Profile & Sign Out */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#d1b36a]/20 text-[#d1b36a] flex items-center justify-center font-bold text-xs shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Site Administrator</div>
              <div className="text-[10px] text-white/40 truncate">{user?.email || "admin@heritagepulse.local"}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="text-white/60 hover:text-white p-1.5 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-500">
              Heritage Operations <span className="mx-1.5">/</span>
              <span className="font-semibold text-slate-800 capitalize">
                {pathname.replace("/dashboard", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Simulate Button */}
            <button
              onClick={runSimulationTick}
              disabled={simulating}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-lg transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${simulating ? "animate-spin text-amber-600" : ""}`} />
              {simulating ? "Simulating..." : "Simulate Gate Fluctuation"}
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Gates Operational
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
