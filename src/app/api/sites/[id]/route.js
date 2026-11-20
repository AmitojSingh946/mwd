import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Site from "@/lib/models/Site";
import { sitesStore, calculateDensity, alertsStore } from "@/lib/demoStore";
import { getAuthUser } from "@/lib/auth";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const isDb = await connectDB();

    let site;
    if (isDb) {
      site = await Site.findById(id).lean();
    } else {
      site = sitesStore.find(s => s.id === id || String(s._id) === id);
    }

    if (!site) {
      return NextResponse.json({ message: "Heritage destination not found." }, { status: 404 });
    }

    const density = calculateDensity(site.visitors, site.capacity);
    return NextResponse.json({
      data: {
        ...site,
        id: site.id || String(site._id),
        densityPercent: density.percent,
        crowdStatus: density.status,
        crowdColor: density.color,
      },
      mode: isDb ? "live" : "demo",
    });
  } catch (error) {
    console.error("Single site error:", error);
    return NextResponse.json({ message: "Failed to fetch destination details." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const isDb = await connectDB();

    let updatedSite;
    if (isDb) {
      updatedSite = await Site.findByIdAndUpdate(id, body, { new: true }).lean();
    } else {
      const idx = sitesStore.findIndex(s => s.id === id || String(s._id) === id);
      if (idx === -1) {
        return NextResponse.json({ message: "Site not found." }, { status: 404 });
      }
      sitesStore[idx] = { ...sitesStore[idx], ...body };
      updatedSite = sitesStore[idx];
    }

    const density = calculateDensity(updatedSite.visitors, updatedSite.capacity);
    return NextResponse.json({
      data: {
        ...updatedSite,
        id: updatedSite.id || String(updatedSite._id),
        densityPercent: density.percent,
        crowdStatus: density.status,
      },
      message: "Site updated successfully."
    });
  } catch (error) {
    console.error("Update site error:", error);
    return NextResponse.json({ message: "Failed to update heritage site." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const isDb = await connectDB();

    if (isDb) {
      await Site.findByIdAndDelete(id);
    } else {
      const idx = sitesStore.findIndex(s => s.id === id || String(s._id) === id);
      if (idx !== -1) {
        sitesStore.splice(idx, 1);
      }
    }

    return NextResponse.json({ message: "Heritage destination removed from registry." });
  } catch (error) {
    console.error("Delete site error:", error);
    return NextResponse.json({ message: "Failed to delete site." }, { status: 500 });
  }
}
