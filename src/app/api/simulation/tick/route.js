import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Site from "@/lib/models/Site";
import Alert from "@/lib/models/Alert";
import { sitesStore, alertsStore, activityStore, calculateDensity } from "@/lib/demoStore";

export async function POST() {
  try {
    const isDb = await connectDB();
    let sites = [];

    if (isDb) {
      sites = await Site.find();
    } else {
      sites = sitesStore;
    }

    const updatedSites = [];

    for (const site of sites) {
      // Fluctuate visitors by random delta
      const deltaPercent = (Math.random() - 0.48) * 0.12; // -6% to +6%
      const currentPct = site.visitors / site.capacity;
      const newPct = Math.max(0.1, Math.min(0.96, currentPct + deltaPercent));
      const newVisitors = Math.round(site.capacity * newPct);

      // Randomize hourly entry/exit flow
      const newEntryRate = Math.round(150 + Math.random() * 320);
      const newExitRate = Math.round(120 + Math.random() * 290);

      if (isDb) {
        site.visitors = newVisitors;
        site.entryRatePerHour = newEntryRate;
        site.exitRatePerHour = newExitRate;
        await site.save();
        updatedSites.push(site.toObject());
      } else {
        site.visitors = newVisitors;
        site.entryRatePerHour = newEntryRate;
        site.exitRatePerHour = newExitRate;
        updatedSites.push({ ...site });
      }

      // Check for alert conditions
      const density = calculateDensity(newVisitors, site.capacity);
      if (density.status === "Critical" || density.status === "High") {
        const existingAlert = isDb
          ? await Alert.findOne({ siteId: String(site._id), acknowledged: false })
          : alertsStore.some(a => (a.siteId === site.id || a.siteId === String(site._id)) && !a.acknowledged);

        if (!existingAlert) {
          const alertData = {
            siteId: site.id || String(site._id),
            siteName: site.name,
            severity: density.status === "Critical" ? "critical" : "high",
            message:
              density.status === "Critical"
                ? `High crowd surge detected: ${site.name} at ${density.percent}% capacity (${newVisitors}/${site.capacity}). Staggered gate throttle advised.`
                : `Elevated crowd density at ${site.name} (${density.percent}% capacity). Monitoring queue build-up.`,
            acknowledged: false,
            createdAt: new Date().toISOString(),
          };

          if (isDb) {
            await Alert.create(alertData);
          } else {
            alertsStore.unshift({ ...alertData, id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}` });
          }
        }
      }
    }

    activityStore.unshift({
      id: `act-${Date.now()}`,
      text: `Live crowd simulation sync completed: ${updatedSites.length} heritage sites updated with sensor metrics.`,
      time: new Date().toISOString(),
      icon: "refresh",
    });

    return NextResponse.json({
      message: "Simulation tick applied successfully.",
      count: updatedSites.length,
      mode: isDb ? "live" : "demo",
    });
  } catch (error) {
    console.error("Simulation tick error:", error);
    return NextResponse.json({ message: "Simulation tick failed." }, { status: 500 });
  }
}
