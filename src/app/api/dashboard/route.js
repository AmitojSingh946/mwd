import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Site from "@/lib/models/Site";
import Alert from "@/lib/models/Alert";
import { sitesStore, alertsStore, activityStore, calculateDensity } from "@/lib/demoStore";

export async function GET() {
  try {
    const isDb = await connectDB();
    let rawSites = [];
    let rawAlerts = [];

    if (isDb) {
      rawSites = await Site.find().lean();
      if (!rawSites || rawSites.length === 0) {
        await Site.insertMany(sitesStore);
        rawSites = await Site.find().lean();
      }
      rawAlerts = await Alert.find().sort({ createdAt: -1 }).limit(10).lean();
    } else {
      rawSites = sitesStore;
      rawAlerts = alertsStore;
    }

    const sites = rawSites.map(site => {
      const density = calculateDensity(site.visitors, site.capacity);
      return {
        ...site,
        id: site.id || String(site._id),
        densityPercent: density.percent,
        crowdStatus: density.status,
        crowdColor: density.color,
      };
    });

    const totalVisitors = sites.reduce((sum, s) => sum + (s.visitors || 0), 0);
    const totalCapacity = sites.reduce((sum, s) => sum + (s.capacity || 0), 0);
    const averageDensity = totalCapacity > 0 ? Math.round((totalVisitors / totalCapacity) * 100) : 0;
    const activeAlerts = rawAlerts.filter(a => !a.acknowledged).length;

    // Weekly traffic overview
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const traffic = days.map((day, idx) => {
      const factor = idx >= 5 ? 1.45 : (0.8 + (idx * 0.08));
      return {
        day,
        visitors: Math.round((totalVisitors / 7) * factor),
        peakHeadcount: Math.round((totalVisitors / 5) * factor),
      };
    });

    // Distribution by crowd status
    const distribution = [
      { name: "Low", value: sites.filter(s => s.crowdStatus === "Low").length, color: "#10b981" },
      { name: "Moderate", value: sites.filter(s => s.crowdStatus === "Moderate").length, color: "#3b82f6" },
      { name: "High", value: sites.filter(s => s.crowdStatus === "High").length, color: "#f59e0b" },
      { name: "Critical", value: sites.filter(s => s.crowdStatus === "Critical").length, color: "#ef4444" },
    ];

    return NextResponse.json({
      data: {
        totalVisitors,
        totalSites: sites.length,
        averageDensity,
        activeAlerts,
        traffic,
        distribution,
        sites: sites.slice(0, 6),
        alerts: rawAlerts.slice(0, 5),
        activity: activityStore.slice(0, 5),
      },
      mode: isDb ? "live" : "demo",
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ message: "Failed to load dashboard data." }, { status: 500 });
  }
}
