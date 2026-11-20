import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Site from "@/lib/models/Site";
import { sitesStore, calculateDensity, activityStore } from "@/lib/demoStore";
import { getAuthUser } from "@/lib/auth";

export async function GET(request) {
  try {
    const isDb = await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q")?.toLowerCase();

    let rawSites = [];
    if (isDb) {
      let filter = {};
      if (category && category !== "All") filter.category = category;
      rawSites = await Site.find(filter).lean();
      if (!rawSites || rawSites.length === 0) {
        // Seed initial data if DB is empty
        await Site.insertMany(sitesStore);
        rawSites = await Site.find(filter).lean();
      }
    } else {
      rawSites = sitesStore;
      if (category && category !== "All") {
        rawSites = rawSites.filter(s => s.category.toLowerCase() === category.toLowerCase());
      }
    }

    if (query) {
      rawSites = rawSites.filter(
        s => s.name.toLowerCase().includes(query) || s.location.toLowerCase().includes(query)
      );
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

    return NextResponse.json({
      data: sites,
      mode: isDb ? "live" : "demo",
      count: sites.length,
    });
  } catch (error) {
    console.error("Sites fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch heritage sites." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized: Admin session required." }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, location, capacity, visitors, description, history, architecturalStyle, builtIn, image } = body;

    if (!name?.trim() || !location?.trim() || !capacity || Number(capacity) < 1) {
      return NextResponse.json({ message: "Name, location, and valid positive capacity are required." }, { status: 400 });
    }

    const isDb = await connectDB();
    const newSite = {
      name: name.trim(),
      category: category || "Monument",
      location: location.trim(),
      state: body.state || location.split(",")[1]?.trim() || "",
      capacity: Number(capacity),
      visitors: Math.max(0, Number(visitors) || 0),
      entryRatePerHour: Number(body.entryRatePerHour) || 120,
      exitRatePerHour: Number(body.exitRatePerHour) || 95,
      openingHours: body.openingHours || "06:00 AM - 06:30 PM",
      closedOn: body.closedOn || "Fridays",
      architecturalStyle: architecturalStyle || "Heritage Architecture",
      builtIn: builtIn || "Historic Period",
      image: image || "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
      description: description || "",
      history: history || description || "",
      ticketTiers: body.ticketTiers || [
        { type: "General Indian Citizen", price: 50, currency: "INR", description: "Standard monument access" },
        { type: "Foreign Tourist", price: 600, currency: "INR", description: "Includes priority entry" },
      ],
      timeSlots: body.timeSlots || [
        { time: "06:00 AM - 10:00 AM", capacity: Math.round(Number(capacity) * 0.4), booked: 120, available: Math.round(Number(capacity) * 0.4) - 120, status: "Available" },
        { time: "10:00 AM - 02:00 PM", capacity: Math.round(Number(capacity) * 0.35), booked: 180, available: Math.round(Number(capacity) * 0.35) - 180, status: "Available" },
        { time: "02:00 PM - 06:30 PM", capacity: Math.round(Number(capacity) * 0.25), booked: 90, available: Math.round(Number(capacity) * 0.25) - 90, status: "Available" },
      ],
      hourlyTrends: body.hourlyTrends || [
        { hour: "08 AM", expectedCrowd: "Low", occupancyPercent: 25 },
        { hour: "11 AM", expectedCrowd: "Moderate", occupancyPercent: 60 },
        { hour: "02 PM", expectedCrowd: "High", occupancyPercent: 80 },
        { hour: "05 PM", expectedCrowd: "Moderate", occupancyPercent: 55 },
      ]
    };

    let saved;
    if (isDb) {
      saved = await Site.create(newSite);
      saved = saved.toObject();
    } else {
      saved = { ...newSite, id: `site-${Date.now()}` };
      sitesStore.unshift(saved);
    }

    activityStore.unshift({
      id: `act-${Date.now()}`,
      text: `${saved.name} added to smart monitoring grid`,
      time: new Date().toISOString(),
      icon: "site"
    });

    const density = calculateDensity(saved.visitors, saved.capacity);
    return NextResponse.json({
      data: {
        ...saved,
        id: saved.id || String(saved._id),
        densityPercent: density.percent,
        crowdStatus: density.status,
      },
      message: "Heritage site added successfully."
    }, { status: 201 });
  } catch (error) {
    console.error("Create site error:", error);
    return NextResponse.json({ message: "Failed to create heritage site." }, { status: 500 });
  }
}
