"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  Calendar,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(console.error);
  }, []);

  const hourlyFlowData = [
    { hour: "06 AM", TajMahal: 420, AmberFort: 120, QutubMinar: 80 },
    { hour: "08 AM", TajMahal: 880, AmberFort: 320, QutubMinar: 210 },
    { hour: "10 AM", TajMahal: 1450, AmberFort: 680, QutubMinar: 490 },
    { hour: "12 PM", TajMahal: 1200, AmberFort: 740, QutubMinar: 580 },
    { hour: "02 PM", TajMahal: 950, AmberFort: 610, QutubMinar: 510 },
    { hour: "04 PM", TajMahal: 1380, AmberFort: 820, QutubMinar: 720 },
    { hour: "06 PM", TajMahal: 1100, AmberFort: 450, QutubMinar: 640 },
  ];

  const weekdayWeekendComparison = [
    { day: "Mon", weekday: 3200, weekend: 0 },
    { day: "Tue", weekday: 3450, weekend: 0 },
    { day: "Wed", weekday: 3600, weekend: 0 },
    { day: "Thu", weekday: 3800, weekend: 0 },
    { day: "Fri", weekday: 2900, weekend: 0 },
    { day: "Sat", weekday: 0, weekend: 6400 },
    { day: "Sun", weekday: 0, weekend: 7200 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Crowd Analytics & Footfall Modeling
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Predictive flow metrics, hourly bottleneck patterns, and weekend capacity surge projections.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Peak Crowd Window</div>
          <div className="text-2xl font-black text-slate-900">10:00 AM – 12:30 PM</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Average 88% capacity utilization</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weekend Surge Multiplier</div>
          <div className="text-2xl font-black text-slate-900">2.18x Normal Flow</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">Staggered time-slots strictly enforced</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Safest Visiting Period</div>
          <div className="text-2xl font-black text-emerald-600">06:00 – 08:30 AM</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Under 40% density across all sites</div>
        </div>
      </div>

      {/* Hourly Flow Chart by Monument */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Hourly Crowd Density by Monument
            </h3>
            <p className="text-xs text-slate-500">Taj Mahal vs Amber Fort vs Qutub Minar gate through-counts</p>
          </div>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Today's Telemetry
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyFlowData}>
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Line type="monotone" dataKey="TajMahal" stroke="#d97706" strokeWidth={3} name="Taj Mahal, Agra" />
              <Line type="monotone" dataKey="AmberFort" stroke="#0f766e" strokeWidth={2.5} name="Amber Fort, Jaipur" />
              <Line type="monotone" dataKey="QutubMinar" stroke="#6366f1" strokeWidth={2.5} name="Qutub Minar, Delhi" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekday vs Weekend Footfall Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Weekday vs Weekend Tourist Volume
            </h3>
            <p className="text-xs text-slate-500">Historical comparison highlighting weekend bottleneck risks</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdayWeekendComparison}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar dataKey="weekday" fill="#94a3b8" name="Weekday Footfall" radius={[6, 6, 0, 0]} />
              <Bar dataKey="weekend" fill="#f59e0b" name="Weekend Surge Volume" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
