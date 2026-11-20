"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Filter,
  RefreshCw,
  Clock,
  ShieldAlert
} from "lucide-react";

export default function AlertsManagementPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState("all");

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      if (data.data) {
        setAlerts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const acknowledgeAlert = async (id) => {
    const token = localStorage.getItem("heritagepulse_token");
    try {
      await fetch(`/api/alerts/${id}/acknowledge`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === "all") return true;
    return a.severity === filterSeverity;
  });

  const activeCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Crowd Safety & Density Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated threshold notifications triggered when visitor occupancy exceeds safety ceilings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
            {activeCount} Actionable Alerts
          </span>
          <button
            onClick={fetchAlerts}
            className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50"
            title="Refresh alerts"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex gap-2">
        {["all", "critical", "high", "moderate"].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
              filterSeverity === sev
                ? "bg-slate-900 text-amber-400"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {sev} ({sev === "all" ? alerts.length : alerts.filter((a) => a.severity === sev).length})
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-500">Loading alerts...</div>
      ) : filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">All Heritage Complexes Nominal</h3>
          <p className="text-xs text-slate-500 mt-1">
            No crowd threshold breaches matching your selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                alert.acknowledged
                  ? "bg-white border-slate-200 opacity-60"
                  : alert.severity === "critical"
                  ? "bg-rose-50/70 border-rose-200 shadow-sm"
                  : alert.severity === "high"
                  ? "bg-amber-50/70 border-amber-200 shadow-sm"
                  : "bg-sky-50/70 border-sky-200 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    alert.severity === "critical"
                      ? "bg-rose-500 text-white"
                      : alert.severity === "high"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-sky-500 text-white"
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <strong className="text-sm font-bold text-slate-900">
                      {alert.siteName}
                    </strong>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        alert.severity === "critical"
                          ? "bg-rose-600 text-white"
                          : alert.severity === "high"
                          ? "bg-amber-600 text-white"
                          : "bg-sky-600 text-white"
                      }`}
                    >
                      {alert.severity}
                    </span>
                    {alert.acknowledged && (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        • Acknowledged
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>Logged at: {new Date(alert.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {!alert.acknowledged && (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="self-end sm:self-center shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow"
                >
                  Mark Acknowledged
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
