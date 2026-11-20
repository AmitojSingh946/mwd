import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    siteId: { type: String, required: true },
    siteName: { type: String, required: true },
    severity: { type: String, enum: ["moderate", "high", "critical"], required: true },
    message: { type: String, required: true },
    acknowledged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Alert || mongoose.model("Alert", alertSchema);
