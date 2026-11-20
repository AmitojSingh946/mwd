import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Alert from "@/lib/models/Alert";
import { alertsStore } from "@/lib/demoStore";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const isDb = await connectDB();

    let updated;
    if (isDb) {
      updated = await Alert.findByIdAndUpdate(id, { acknowledged: true }, { new: true }).lean();
    } else {
      const alert = alertsStore.find(a => a.id === id || String(a._id) === id);
      if (alert) {
        alert.acknowledged = true;
        updated = alert;
      }
    }

    if (!updated) {
      return NextResponse.json({ message: "Alert not found." }, { status: 404 });
    }

    return NextResponse.json({
      data: { ...updated, id: updated.id || String(updated._id) },
      message: "Alert marked as acknowledged.",
    });
  } catch (error) {
    console.error("Acknowledge alert error:", error);
    return NextResponse.json({ message: "Failed to acknowledge alert." }, { status: 500 });
  }
}
