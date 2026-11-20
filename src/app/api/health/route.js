import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";

export async function GET() {
  const isDbConnected = await connectDB();
  return NextResponse.json({
    status: "ok",
    service: "HeritagePulse Next.js API",
    mode: isDbConnected ? "live" : "demo",
    timestamp: new Date().toISOString(),
  });
}
