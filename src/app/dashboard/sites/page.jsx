"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Users,
  MapPin,
  Check,
  X,
  AlertCircle
} from "lucide-react";

export default function SitesManagementPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  // New site form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Monument",
    location: "",
    capacity: 2000,
    visitors: 800,
    builtIn: "",
    architecturalStyle: "",
    description: "",
    history: "",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
  });

  const fetchSites = async () => {
    try {
      const res = await fetch("/api/sites");
      const data = await res.json();
      if (data.data) {
        setSites(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleCreateSite = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("heritagepulse_token");
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchSites();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSite = async (e) => {
    e.preventDefault();
    if (!editingSite) return;
    const token = localStorage.getItem("heritagepulse_token");
    try {
      const res = await fetch(`/api/sites/${editingSite.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingSite),
      });
      if (res.ok) {
        setEditingSite(null);
        fetchSites();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSite = async (id) => {
    if (!confirm("Are you sure you want to remove this heritage destination from monitoring?")) return;
    const token = localStorage.getItem("heritagepulse_token");
    try {
      await fetch(`/api/sites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSites();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Heritage Sites & Capacity Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register monuments, configure safe visitor volume ceilings, and calibrate gate sensors.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl transition shadow"
        >
          <Plus className="w-4 h-4" />
          Register New Destination
        </button>
      </div>

      {/* Sites List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44">
                <img src={site.image} alt={site.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {site.category}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur shadow ${
                      site.crowdStatus === "Critical"
                        ? "bg-rose-500 text-white"
                        : site.crowdStatus === "High"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {site.crowdStatus} ({site.densityPercent}%)
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{site.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{site.location}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Live Headcount:</span>
                    <strong className="text-slate-900">{site.visitors?.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Design Capacity:</span>
                    <strong className="text-slate-900">{site.capacity?.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hourly Throughput:</span>
                    <span className="text-emerald-600 font-semibold">{site.entryRatePerHour || 180} in / hr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
              <button
                onClick={() => setEditingSite(site)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Limits
              </button>
              <button
                onClick={() => handleDeleteSite(site.id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 transition"
                title="Remove site"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Destination Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Register Heritage Destination</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateSite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Site / Monument Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatehpur Sikri Complex"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Monument">Monument</option>
                    <option value="Fort">Fort</option>
                    <option value="Museum">Museum</option>
                    <option value="Temple">Temple</option>
                    <option value="Heritage">Heritage Complex</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Location / State</label>
                  <input
                    type="text"
                    required
                    placeholder="Agra, Uttar Pradesh"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Safe Max Capacity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Current Visitors</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.visitors}
                    onChange={(e) => setFormData({ ...formData, visitors: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Historical Period / Built In</label>
                <input
                  type="text"
                  placeholder="e.g. 1571 AD by Mughal Emperor Akbar"
                  value={formData.builtIn}
                  onChange={(e) => setFormData({ ...formData, builtIn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Historical Summary</label>
                <textarea
                  rows="3"
                  placeholder="Provide background on the monument, significance and architecture..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-slate-900 text-amber-400 rounded-xl font-bold"
                >
                  Save to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Site Modal */}
      {editingSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Edit {editingSite.name}</h3>
            <p className="text-xs text-slate-500 mb-4">Calibrate capacity threshold and current live headcount.</p>

            <form onSubmit={handleUpdateSite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Max Safe Capacity</label>
                <input
                  type="number"
                  value={editingSite.capacity}
                  onChange={(e) => setEditingSite({ ...editingSite, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Live Visitor Headcount</label>
                <input
                  type="number"
                  value={editingSite.visitors}
                  onChange={(e) => setEditingSite({ ...editingSite, visitors: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSite(null)}
                  className="flex-1 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold"
                >
                  Update Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
