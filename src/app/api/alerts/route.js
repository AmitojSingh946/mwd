import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Alert from "@/lib/models/Alert";
import { alertsStore } from "@/lib/demoStore";

export async function GET() {
  try {
    const isDb = await connectDB();
    let alerts = [];

    if (isDb) {
      alerts = await Alert.find().sort({ createdAt: -1 }).lean();
    } else {
      alerts = alertsStore;
    }

    return NextResponse.json({
      data: alerts.map(a => ({ ...a, id: a.id || String(a._id) })),
      mode: isDb ? "live" : "demo",
    });
  } catch (error) {
    console.error("Alerts error:", error);
    return NextResponse.json({ message: "Failed to fetch alerts." }, { status: 500 });
  }
}
