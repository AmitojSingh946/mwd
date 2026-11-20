"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  RefreshCw,
  Landmark,
  Eye,
  Sliders,
  Sparkles
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function DashboardOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      if (json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const handleSimUpdate = () => {
      fetchDashboard();
    };
    window.addEventListener("heritagepulse_sim_update", handleSimUpdate);
    return () => window.removeEventListener("heritagepulse_sim_update", handleSimUpdate);
  }, []);

  const acknowledgeAlert = async (alertId) => {
    const token = localStorage.getItem("heritagepulse_token");
    try {
      await fetch(`/api/alerts/${alertId}/acknowledge`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500">Loading operations intelligence...</p>
      </div>
    );
  }

  const {
    totalVisitors = 0,
    totalSites = 0,
    averageDensity = 0,
    activeAlerts = 0,
    traffic = [],
    distribution = [],
    sites = [],
    alerts = [],
    activity = []
  } = data || {};

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Control Center Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry from automated gates, optical sensors, and online time-slot manifests.
          </p>
        </div>

        <button
          onClick={() => {
            setRefreshing(true);
            fetchDashboard();
          }}
          disabled={refreshing}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-amber-600" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Live Headcount
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalVisitors.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+6.4% from morning cycle</span>
          </div>
        </div>

        {/* Card 2: Monitored Destinations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Monitored Assets
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalSites} Complexes</div>
          <div className="mt-2 text-[11px] text-slate-500">
            Including Taj Mahal & Amber Fort
          </div>
        </div>

        {/* Card 3: Average Density */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              System Density
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{averageDensity}%</div>
          <div className="mt-2 text-[11px] text-slate-500">
            Aggregate across all complexes
          </div>
        </div>

        {/* Card 4: Active Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Crowd Alerts
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                activeAlerts > 0 ? "bg-rose-50 text-rose-600 animate-pulse" : "bg-slate-50 text-slate-500"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{activeAlerts} Active</div>
          <div className="mt-2 text-[11px] text-rose-600 font-semibold">
            {activeAlerts > 0 ? "Requires staff triage" : "Nominal queue velocity"}
          </div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Visitor Volume Chart (Recharts) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                7-Day Tourist Volume & Peak Flow
              </h3>
              <p className="text-xs text-slate-500">Monitored entrance volume across all gates</p>
            </div>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Live Sensor Aggregate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#d97706"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crowd Density Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
              Crowd Status Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-4">Sites classified by capacity ratio</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
            {distribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name}:</span>
                <strong className="text-slate-900 ml-auto">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Monitored Heritage Sites Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Live Heritage Site Headcount Manifest
            </h3>
            <p className="text-xs text-slate-500">Real-time occupancy across registered national monuments</p>
          </div>
          <Link
            href="/dashboard/sites"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            Manage Sites & Capacities →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Monument / Site</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Live Headcount</th>
                <th className="py-3 px-6">Density Status</th>
                <th className="py-3 px-6">Hourly Gate Rates</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{site.name}</div>
                      <div className="text-[10px] text-slate-400">{site.category} • {site.builtIn}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{site.location}</td>
                  <td className="py-4 px-6">
                    <div className="text-slate-900 font-bold">
                      {site.visitors?.toLocaleString()}{" "}
                      <span className="text-slate-400 font-normal">/ {site.capacity?.toLocaleString()}</span>
                    </div>
                    <div className="w-28 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full ${
                          site.densityPercent >= 90
                            ? "bg-rose-500"
                            : site.densityPercent >= 70
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(100, site.densityPercent || 0)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        site.crowdStatus === "Critical"
                          ? "bg-rose-100 text-rose-800"
                          : site.crowdStatus === "High"
                          ? "bg-amber-100 text-amber-800"
                          : site.crowdStatus === "Moderate"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {site.crowdStatus} ({site.densityPercent}%)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[11px] text-slate-600">
                    <span className="text-emerald-600 font-semibold">+{site.entryRatePerHour || 180} in</span> /{" "}
                    <span className="text-slate-400">-{site.exitRatePerHour || 140} out</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/sites/${site.id}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-900 inline-block"
                      title="View public destination page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Crowd Alerts & System Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alerts Box */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Active Crowd Threshold Alerts
            </h3>
            <Link href="/dashboard/alerts" className="text-xs text-amber-600 hover:underline">
              View All
            </Link>
          </div>

          {alerts.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No unacknowledged crowd alerts at this time.
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                    alert.acknowledged
                      ? "bg-slate-50 border-slate-200 opacity-60"
                      : alert.severity === "critical"
                      ? "bg-rose-50/50 border-rose-200"
                      : "bg-amber-50/50 border-amber-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                      <span>{alert.siteName}</span>
                      <span
                        className={`text-[9px] uppercase px-2 py-0.5 rounded-full ${
                          alert.severity === "critical"
                            ? "bg-rose-600 text-white"
                            : "bg-amber-500 text-slate-950"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] mb-1">
                      {alert.message}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="shrink-0 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Log */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-slate-500" />
            Operations Audit & Activity Feed
          </h3>

          <div className="space-y-4">
            {activity.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600 font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-slate-800 font-medium leading-relaxed">{act.text}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {new Date(act.time).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
