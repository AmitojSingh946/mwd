import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  capacity: { type: Number, required: true },
  booked: { type: Number, default: 0 },
  available: { type: Number, default: 0 }
});

const ticketTierSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. "Indian Citizen", "Foreign Tourist", "SAARC/BIMSTEC", "Child"
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  description: { type: String, default: "" }
});

const siteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "Monument" }, // Monument, Museum, Fort, Temple, Heritage
    location: { type: String, required: true, trim: true },
    state: { type: String, default: "" },
    capacity: { type: Number, required: true, min: 1 },
    visitors: { type: Number, default: 0, min: 0 },
    entryRatePerHour: { type: Number, default: 120 },
    exitRatePerHour: { type: Number, default: 95 },
    openingHours: { type: String, default: "06:00 AM - 06:30 PM" },
    closedOn: { type: String, default: "Fridays" },
    history: { type: String, default: "" },
    description: { type: String, default: "" },
    architecturalStyle: { type: String, default: "Mughal Architecture" },
    builtIn: { type: String, default: "17th Century" },
    image: { type: String, default: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" },
    ticketTiers: [ticketTierSchema],
    timeSlots: [timeSlotSchema],
    hourlyTrends: [{
      hour: { type: String },
      expectedCrowd: { type: String }, // "Low", "Moderate", "High", "Peak"
      occupancyPercent: { type: Number }
    }]
  },
  { timestamps: true }
);

export default mongoose.models.Site || mongoose.model("Site", siteSchema);
