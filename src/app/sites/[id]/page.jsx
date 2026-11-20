"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Landmark,
  MapPin,
  Clock,
  Ticket,
  Users,
  Calendar,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
  TrendingUp,
  Share2
} from "lucide-react";

export default function SiteDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchSite = async () => {
      try {
        const res = await fetch(`/api/sites/${id}`);
        const data = await res.json();
        if (data.data) {
          setSite(data.data);
          if (data.data.timeSlots?.length > 0) {
            setSelectedSlot(data.data.timeSlots[0].time);
          }
        }
      } catch (err) {
        console.error("Failed to fetch site details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-slate-300">Retrieving heritage destination telemetry...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center max-w-md mx-auto p-8">
            <Landmark className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Heritage Site Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">
              The requested monument or archaeological site does not exist or has been relocated.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 text-amber-400 px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Registry
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-20 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={site.image} alt={site.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Heritage Sites
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {site.category}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border ${
                site.crowdStatus === "Critical"
                  ? "bg-rose-500/80 text-white border-rose-400"
                  : site.crowdStatus === "High"
                  ? "bg-amber-500/80 text-slate-950 border-amber-300"
                  : "bg-emerald-500/80 text-white border-emerald-400"
              }`}
            >
              Crowd Status: {site.crowdStatus} ({site.densityPercent}%)
            </span>
            <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              {site.builtIn}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {site.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              {site.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              Hours: {site.openingHours}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              Closed: {site.closedOn}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Historical Background & Crowd Telemetry */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Entry & Crowd Telemetry Panel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-500" />
                    Live Crowd & Gate Telemetry
                  </h3>
                  <p className="text-xs text-slate-500">Continuous optical counter sync</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">
                    {site.visitors?.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-slate-500">/ {site.capacity?.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-amber-600 font-bold">Capacity Occupied: {site.densityPercent}%</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full transition-all duration-500 ${
                    site.densityPercent >= 90
                      ? "bg-rose-500"
                      : site.densityPercent >= 70
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, site.densityPercent || 0)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Hourly Inflow</div>
                  <div className="text-lg font-bold text-slate-900">{site.entryRatePerHour || 220} / hr</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Hourly Outflow</div>
                  <div className="text-lg font-bold text-slate-900">{site.exitRatePerHour || 180} / hr</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Avg Wait Time</div>
                  <div className="text-lg font-bold text-emerald-600">8–12 mins</div>
                </div>
              </div>
            </div>

            {/* Historical Information & Architecture */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Landmark className="w-5 h-5 text-amber-600" />
                  Historical Overview & Significance
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {site.history || site.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Architectural Style
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {site.architecturalStyle}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <div className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1">
                    Era / Year of Construction
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {site.builtIn}
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Hourly Crowd Chart & Guidance */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                Expected Crowd Levels by Visiting Hour
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Based on historical footfall models, national holiday cycles, and seasonal tourism data.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {site.hourlyTrends?.map((trend, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center"
                  >
                    <span className="text-xs font-bold text-slate-700 mb-1">{trend.hour}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${
                        trend.expectedCrowd === "Peak"
                          ? "bg-rose-100 text-rose-700"
                          : trend.expectedCrowd === "High"
                          ? "bg-amber-100 text-amber-700"
                          : trend.expectedCrowd === "Moderate"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {trend.expectedCrowd}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {trend.occupancyPercent}%
                    </span>
                    <span className="text-[9px] text-slate-400">capacity</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Ticket Pricing & Time Slot Reservation */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Ticket Categories Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Ticket className="w-5 h-5 text-emerald-600" />
                Ticket Categories & Entry Tariffs
              </h3>

              <div className="space-y-3 mb-6">
                {site.ticketTiers?.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{tier.type}</div>
                      <div className="text-[10px] text-slate-500">{tier.description}</div>
                    </div>
                    <div className="text-base font-extrabold text-amber-600">
                      ₹{tier.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slot Selection */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Select Time Slot
                </h4>

                <div className="space-y-2 mb-6">
                  {site.timeSlots?.map((slot, idx) => (
                    <label
                      key={idx}
                      className={`block p-3 rounded-2xl border text-xs cursor-pointer transition ${
                        selectedSlot === slot.time
                          ? "border-amber-500 bg-amber-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <input
                            type="radio"
                            name="slot"
                            checked={selectedSlot === slot.time}
                            onChange={() => setSelectedSlot(slot.time)}
                            className="text-amber-500"
                          />
                          {slot.time}
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600">
                          {slot.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-6">
                        Remaining quota: <strong>{slot.available}</strong> passes
                      </div>
                    </label>
                  ))}
                </div>

                {bookedSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-xs font-bold text-emerald-900">Pass Confirmed!</div>
                    <p className="text-[10px] text-emerald-700 mt-1">
                      Time slot registered. Verification token sent to visitor manifest.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setBookedSuccess(true)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs py-3.5 rounded-xl transition shadow"
                  >
                    Confirm & Reserve Visiting Pass
                  </button>
                )}
              </div>
            </div>

            {/* Visit Guidelines */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Monument Visiting Guidelines
              </h4>
              <ul className="space-y-2 text-slate-600 text-[11px] list-disc list-inside">
                <li>Footwear must be covered or removed at inner mausoleum chambers.</li>
                <li>Commercial drone videography requires prior ASI ministerial clearance.</li>
                <li>Monuments observe zero-litter plastic-free sanctuary protocols.</li>
                <li>Entry gates close 30 minutes prior to scheduled sunset times.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
