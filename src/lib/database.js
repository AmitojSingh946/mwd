import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return true;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false;
  }
  try {
    const db = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    isConnected = db.connections[0].readyState === 1;
    return isConnected;
  } catch (error) {
    console.warn("MongoDB connection failed, falling back to demo mode:", error.message);
    return false;
  }
}
