"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Landmark,
  Users,
  Clock,
  Ticket,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  Info
} from "lucide-react";

export default function HomePage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [bookingModalSite, setBookingModalSite] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = ["All", "Monument", "Fort", "Museum", "Heritage", "Temple"];

  const fetchSites = async () => {
    try {
      const res = await fetch("/api/sites");
      const data = await res.json();
      if (data.data) {
        setSites(data.data);
      }
    } catch (err) {
      console.error("Failed to load sites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const runSimulation = async () => {
    setSimulating(true);
    try {
      await fetch("/api/simulation/tick", { method: "POST" });
      await fetchSites();
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  const filteredSites = sites.filter((site) => {
    const matchesCategory =
      selectedCategory === "All" ||
      site.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const tajMahal = sites.find((s) => s.name.includes("Taj Mahal")) || sites[0];

  const totalHeadcount = sites.reduce((sum, s) => sum + (s.visitors || 0), 0);
  const totalCapacity = sites.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const avgDensity = totalCapacity > 0 ? Math.round((totalHeadcount / totalCapacity) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Crowd Management & Heritage Tourism Architecture
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Preserving History with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Real-Time Crowd Intelligence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Explore India's most celebrated heritage destinations—including the Taj Mahal, historic forts, and museums. Plan visits with live crowd density meters, time-slot capacities, and transparent ticketing details.
            </p>

            {/* Quick Live Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <div>
                <div className="text-xs text-slate-400">Total Monitored</div>
                <div className="text-2xl font-black text-white">{sites.length || 6} Sites</div>
                <div className="text-[11px] text-amber-300">UNESCO & National Assets</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Live Visitor Count</div>
                <div className="text-2xl font-black text-emerald-400">
                  {totalHeadcount.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-300">Active within complexes</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Avg Density</div>
                <div className="text-2xl font-black text-amber-400">{avgDensity}%</div>
                <div className="text-[11px] text-slate-400">Safe threshold: &lt;80%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Simulate Sensor Flow</div>
                <button
                  onClick={runSimulation}
                  disabled={simulating}
                  className="mt-1 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${simulating ? "animate-spin" : ""}`} />
                  {simulating ? "Syncing..." : "Simulate Tick"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight: The Taj Mahal Experience */}
      {tajMahal && (
        <section id="spotlight" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl overflow-hidden shadow-2xl text-white border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Visual Image & Live Badge */}
                <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full">
                  <img
                    src={tajMahal.image}
                    alt="Taj Mahal, Agra"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      Monument Spotlight
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      UNESCO World Heritage Site
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-300 font-medium">Real-Time Headcount:</span>
                      <span className="font-bold text-emerald-400 text-sm">
                        {tajMahal.visitors?.toLocaleString()} / {tajMahal.capacity?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          tajMahal.densityPercent >= 90
                            ? "bg-rose-500"
                            : tajMahal.densityPercent >= 70
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(100, tajMahal.densityPercent || 75)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                      <span>Density: {tajMahal.densityPercent}%</span>
                      <span>Gate Inflow: {tajMahal.entryRatePerHour || 480}/hr</span>
                      <span>Outflow: {tajMahal.exitRatePerHour || 410}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {tajMahal.location} • {tajMahal.builtIn}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                      {tajMahal.name}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {tajMahal.description}
                    </p>

                    {/* Historical Context */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2">
                        <Info className="w-4 h-4" />
                        Historical Background & Architecture
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {tajMahal.history}
                      </p>
                    </div>

                    {/* Time Slot Capacities */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-sky-400" />
                          Today's Time-Slot Availability
                        </h4>
                        <span className="text-[11px] text-amber-300 font-mono">Live Quotas</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tajMahal.timeSlots?.map((slot, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                          >
                            <div className="flex justify-between items-start text-xs font-medium text-slate-200 mb-1">
                              <span>{slot.time}</span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  slot.status === "Critical Crowding"
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                    : slot.status === "Filling Fast"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                }`}
                              >
                                {slot.status}
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-400">
                              <span>Remaining: <strong className="text-white">{slot.available}</strong> slots</span>
                              <span>Total: {slot.capacity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ticket Pricing Tiers */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                        <Ticket className="w-4 h-4 text-emerald-400" />
                        Ticket Pricing Tiers
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {tajMahal.ticketTiers?.map((tier, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                            <div className="text-[11px] text-slate-400 truncate">{tier.type}</div>
                            <div className="text-lg font-bold text-amber-400">
                              ₹{tier.price}
                            </div>
                            <div className="text-[9px] text-slate-400 line-clamp-1">{tier.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setBookingModalSite(tajMahal)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
                    >
                      <Ticket className="w-4 h-4" />
                      Reserve Taj Mahal Time-Slot
                    </button>
                    <Link
                      href={`/sites/${tajMahal.id}`}
                      className="text-slate-300 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      View Comprehensive Historical Profile
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Exploration Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        
        {/* Section Heading & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              National Heritage Registry
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Browse Monuments, Museums & Forts
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any heritage site to view historical details, ticket tiers, and live entrance flow statistics.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search monuments, city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat
                  ? "bg-slate-900 text-amber-400 shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Heritage Sites Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-slate-200"></div>
            ))}
          </div>
        ) : filteredSites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <Landmark className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No heritage sites match your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching a different term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col group"
              >
                {/* Image Header with density badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-300 font-semibold text-[11px] px-3 py-1 rounded-full border border-white/10">
                    {site.category}
                  </span>

                  {/* Crowd Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow flex items-center gap-1.5 ${
                        site.crowdStatus === "Critical"
                          ? "bg-rose-500/90 text-white border-rose-400"
                          : site.crowdStatus === "High"
                          ? "bg-amber-500/90 text-slate-950 border-amber-300"
                          : site.crowdStatus === "Moderate"
                          ? "bg-sky-500/90 text-white border-sky-400"
                          : "bg-emerald-500/90 text-white border-emerald-400"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      {site.crowdStatus} ({site.densityPercent}%)
                    </span>
                  </div>

                  {/* Built In Era */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs text-amber-300 font-medium">{site.builtIn}</div>
                    <h3 className="text-xl font-bold tracking-tight text-white">{site.name}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{site.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {site.description}
                    </p>

                    {/* Crowd Telemetry Bar */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                      <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                        <span>Live Headcount</span>
                        <span className="font-bold text-slate-900">
                          {site.visitors?.toLocaleString()} / {site.capacity?.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            site.densityPercent >= 90
                              ? "bg-rose-500"
                              : site.densityPercent >= 70
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(100, site.densityPercent || 0)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                        <span>Inflow: {site.entryRatePerHour || 180}/hr</span>
                        <span>Outflow: {site.exitRatePerHour || 150}/hr</span>
                      </div>
                    </div>

                    {/* Ticket & Slot preview */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Entry Fee</span>
                        <strong className="text-slate-900 font-bold">
                          ₹{site.ticketTiers?.[0]?.price || 40}
                        </strong>{" "}
                        <span className="text-[10px] text-slate-500">onwards</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Time Slots</span>
                        <strong className="text-emerald-700 font-bold">
                          {site.timeSlots?.length || 3} Slots Active
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/sites/${site.id}`}
                      className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-1"
                    >
                      Historical Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setBookingModalSite(site)}
                      className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      Book Slot
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* Crowd Safety & Smart Management Architecture Section */}
      <section id="crowd-info" className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              System Architecture & Methodology
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              How HeritagePulse Manages High-Density Crowds
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Designed around IEEE-standard smart tourism and safety principles to prevent bottleneck stampedes, preserve delicate stone carvings, and optimize visitor satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Dynamic Density Indexing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crowd occupancy is categorized across four mathematical states: Low (&lt;40%), Moderate (40–69%), High (70–89%), and Critical (&ge;90%). Automated gate throttle triggers engage before hazardous bottlenecks occur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quota-Bounded Time Slots</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than unregulated entry queues, visitors book staggered entry windows (e.g., Sunrise 06:00–09:00 AM). Each slot possesses finite capacity allocations linked directly to live ticket validation scanners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Predictive Hourly Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Historical tourist records combined with gate sensor metrics forecast expected peak waiting hours, guiding tourists toward serene low-density visiting periods and evening light shows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Simulator Modal */}
      {bookingModalSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                  Time-Slot Ticket Simulator
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {bookingModalSite.name}
                </h3>
                <p className="text-xs text-slate-500">{bookingModalSite.location}</p>
              </div>
              <button
                onClick={() => {
                  setBookingModalSite(null);
                  setBookingSuccess(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Time Slot Confirmed!</h4>
                <p className="text-xs text-slate-600 mb-6 max-w-xs mx-auto">
                  Your simulated entry pass for <strong>{selectedSlot || "Selected Slot"}</strong> has been allocated. Present your confirmation QR at the automated gate.
                </p>
                <button
                  onClick={() => {
                    setBookingModalSite(null);
                    setBookingSuccess(false);
                  }}
                  className="w-full bg-slate-900 text-amber-400 font-bold text-xs py-3 rounded-xl hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Visiting Time Slot
                  </label>
                  <div className="space-y-2">
                    {bookingModalSite.timeSlots?.map((slot, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                          selectedSlot === slot.time
                            ? "border-amber-500 bg-amber-50/50 text-slate-900 font-bold"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="slot"
                            checked={selectedSlot === slot.time}
                            onChange={() => setSelectedSlot(slot.time)}
                            className="text-amber-500 focus:ring-amber-400"
                          />
                          <span>{slot.time}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-normal">
                          {slot.available} seats left
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Number of Visitors
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-10 h-10 rounded-xl border border-slate-200 text-lg font-bold hover:bg-slate-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-slate-900 text-base">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="w-10 h-10 rounded-xl border border-slate-200 text-lg font-bold hover:bg-slate-100 flex items-center justify-center"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-500 ml-auto">
                      Estimated: ₹{(bookingModalSite.ticketTiers?.[0]?.price || 50) * ticketQuantity}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => setBookingModalSite(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setBookingSuccess(true)}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition shadow"
                  >
                    Confirm Time-Slot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
