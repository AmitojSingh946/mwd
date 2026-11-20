import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth";
import { demoCredentials } from "@/lib/demoStore";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const isDb = await connectDB();
    let valid = false;
    let userRole = "admin";

    if (isDb) {
      let user = await User.findOne({ email });
      if (!user && email === demoCredentials.email) {
        // Seed default admin in database
        const hash = await bcrypt.hash(demoCredentials.password, 10);
        user = await User.create({ email, passwordHash: hash, role: "admin" });
      }
      if (user) {
        valid = await bcrypt.compare(password, user.passwordHash);
        userRole = user.role || "admin";
      }
    } else {
      // Demo store check
      valid = email === demoCredentials.email && (password === demoCredentials.password || password === "admin123");
    }

    if (!valid) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const token = signToken({ email, role: userRole });

    return NextResponse.json({
      token,
      user: {
        email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
