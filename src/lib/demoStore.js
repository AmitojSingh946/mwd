export const demoCredentials = {
  email: "admin@heritagepulse.local",
  password: "admin123",
};

export const initialSites = [
  {
    id: "site-1",
    name: "Taj Mahal",
    category: "Monument",
    location: "Agra, Uttar Pradesh",
    state: "Uttar Pradesh",
    capacity: 3500,
    visitors: 2890,
    entryRatePerHour: 480,
    exitRatePerHour: 410,
    openingHours: "06:00 AM – 06:30 PM (Sunrise to Sunset)",
    closedOn: "Fridays",
    architecturalStyle: "Indo-Islamic Mughal Architecture",
    builtIn: "1631–1648 AD by Emperor Shah Jahan",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80",
    description: "An immense mausoleum of white marble, built in Agra by Mughal emperor Shah Jahan in memory of his favourite wife Mumtaz Mahal. It is the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage.",
    history: "Commissioned in 1631 by Shah Jahan to house the tomb of Mumtaz Mahal, it sits within a 17-hectare complex encompassing a mosque and a guest house. More than 20,000 artisans under the guidance of court architect Ustad Ahmad Lahori carved its intricate pietra dura marble inlays over two decades.",
    ticketTiers: [
      { type: "Indian Citizen", price: 50, currency: "INR", description: "Entry + Main Mausoleum visit (additional ₹200 for inner chamber)" },
      { type: "SAARC & BIMSTEC Visitors", price: 540, currency: "INR", description: "Valid passport or national ID required" },
      { type: "Foreign Tourist", price: 1100, currency: "INR", description: "Priority queue entry + shoe covers and water bottle provided" },
      { type: "Children under 15 Years", price: 0, currency: "INR", description: "Free entry on identity age proof verification" }
    ],
    timeSlots: [
      { time: "06:00 AM - 09:00 AM (Sunrise)", capacity: 900, booked: 840, available: 60, status: "Filling Fast" },
      { time: "09:00 AM - 12:00 PM (Morning)", capacity: 1000, booked: 980, available: 20, status: "Critical Crowding" },
      { time: "12:00 PM - 03:00 PM (Afternoon)", capacity: 800, booked: 420, available: 380, status: "Available" },
      { time: "03:00 PM - 06:30 PM (Sunset)", capacity: 800, booked: 650, available: 150, status: "Moderate" }
    ],
    hourlyTrends: [
      { hour: "06 AM", expectedCrowd: "Moderate", occupancyPercent: 55 },
      { hour: "08 AM", expectedCrowd: "High", occupancyPercent: 78 },
      { hour: "10 AM", expectedCrowd: "Peak", occupancyPercent: 92 },
      { hour: "12 PM", expectedCrowd: "Moderate", occupancyPercent: 62 },
      { hour: "02 PM", expectedCrowd: "Moderate", occupancyPercent: 50 },
      { hour: "04 PM", expectedCrowd: "High", occupancyPercent: 84 },
      { hour: "06 PM", expectedCrowd: "Peak", occupancyPercent: 88 }
    ]
  },
  {
    id: "site-2",
    name: "Amber Fort & Palace",
    category: "Fort",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    capacity: 2500,
    visitors: 1720,
    entryRatePerHour: 240,
    exitRatePerHour: 210,
    openingHours: "08:00 AM – 05:30 PM & 06:30 PM – 09:15 PM (Night Viewing)",
    closedOn: "Open all days",
    architecturalStyle: "Rajput & Hindu-Mughal Fusion",
    builtIn: "1592 AD by Raja Man Singh I",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    description: "Perched high on the rugged Cheel ka Teela (Hill of Eagles), Amber Palace overlooks Maota Lake. Famed for its artistic Hindu-style elements, cobbled paths, majestic gates, and the glittering Sheesh Mahal (Mirror Palace).",
    history: "Constructed of red sandstone and marble, the opulent multi-level palace was the principal residence of the Kachwaha Rajput rulers until Sawai Jai Singh II founded Jaipur city in 1727.",
    ticketTiers: [
      { type: "Indian Citizen", price: 100, currency: "INR", description: "General fort complex entry" },
      { type: "Foreign Tourist", price: 500, currency: "INR", description: "All-access day palace pass" },
      { type: "Indian Student", price: 20, currency: "INR", description: "Valid College/School ID card required" },
      { type: "Composite Tourist Pass", price: 300, currency: "INR", description: "Covers Amber, Hawa Mahal, Jantar Mantar & Albert Hall" }
    ],
    timeSlots: [
      { time: "08:00 AM - 11:00 AM", capacity: 800, booked: 520, available: 280, status: "Available" },
      { time: "11:00 AM - 02:00 PM", capacity: 900, booked: 740, available: 160, status: "Moderate" },
      { time: "02:00 PM - 05:30 PM", capacity: 800, booked: 460, available: 340, status: "Available" }
    ],
    hourlyTrends: [
      { hour: "08 AM", expectedCrowd: "Low", occupancyPercent: 30 },
      { hour: "10 AM", expectedCrowd: "Moderate", occupancyPercent: 65 },
      { hour: "12 PM", expectedCrowd: "High", occupancyPercent: 78 },
      { hour: "02 PM", expectedCrowd: "Moderate", occupancyPercent: 60 },
      { hour: "04 PM", expectedCrowd: "High", occupancyPercent: 72 }
    ]
  },
  {
    id: "site-3",
    name: "Qutub Minar & Complex",
    category: "Monument",
    location: "Mehrauli, New Delhi",
    state: "Delhi",
    capacity: 2000,
    visitors: 1480,
    entryRatePerHour: 310,
    exitRatePerHour: 280,
    openingHours: "07:00 AM – 08:00 PM",
    closedOn: "Open all days",
    architecturalStyle: "Indo-Islamic Afghan Style",
    builtIn: "1199 AD by Qutb-ud-din Aibak",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    description: "A 72.5-meter tapering tower of five distinct storeys, adorned with delicate carvings and Quranic calligraphy. The surrounding archaeological park hosts the mysterious 4th-century rustless Iron Pillar of Chandragupta II.",
    history: "Initiated after the defeat of Delhi's last Hindu ruler in 1192, Aibak built the base storey while successive rulers Iltutmish and Firoz Shah Tughlaq erected the upper marble tiers and balconies.",
    ticketTiers: [
      { type: "Indian Citizen (Online ASI)", price: 40, currency: "INR", description: "Discounted digital ticket QR" },
      { type: "Foreign Tourist", price: 600, currency: "INR", description: "Includes illuminated night walk access" },
      { type: "Children under 15", price: 0, currency: "INR", description: "Free entry" }
    ],
    timeSlots: [
      { time: "07:00 AM - 11:00 AM", capacity: 600, booked: 380, available: 220, status: "Available" },
      { time: "11:00 AM - 03:00 PM", capacity: 700, booked: 590, available: 110, status: "Moderate" },
      { time: "03:00 PM - 08:00 PM", capacity: 700, booked: 510, available: 190, status: "Moderate" }
    ],
    hourlyTrends: [
      { hour: "07 AM", expectedCrowd: "Low", occupancyPercent: 20 },
      { hour: "10 AM", expectedCrowd: "Moderate", occupancyPercent: 55 },
      { hour: "01 PM", expectedCrowd: "Moderate", occupancyPercent: 68 },
      { hour: "04 PM", expectedCrowd: "High", occupancyPercent: 82 },
      { hour: "06 PM", expectedCrowd: "High", occupancyPercent: 74 }
    ]
  },
  {
    id: "site-4",
    name: "National Museum",
    category: "Museum",
    location: "Janpath, New Delhi",
    state: "Delhi",
    capacity: 1200,
    visitors: 480,
    entryRatePerHour: 80,
    exitRatePerHour: 65,
    openingHours: "10:00 AM – 06:00 PM",
    closedOn: "Mondays & National Holidays",
    architecturalStyle: "Modern Classical Indian Heritage",
    builtIn: "Inaugurated 1949",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&q=80",
    description: "One of the premier museums in India, holding over 200,000 historical artifacts covering 5,000 years of civilization—including the Dancing Girl bronze of Harappa and priceless relics of the Buddha.",
    history: "Founded in 1949 by Governor-General C. Rajagopalachari, it displays rare antiquities from pre-historic Indus Valley, Maurya, Gupta, Vijayanagara dynasties, Tanjore paintings, and rare manuscripts.",
    ticketTiers: [
      { type: "Indian Adult", price: 20, currency: "INR", description: "All regular galleries" },
      { type: "Foreign Visitor", price: 650, currency: "INR", description: "Includes comprehensive multilingual audio guide" },
      { type: "Students (Valid ID)", price: 0, currency: "INR", description: "Free academic access" }
    ],
    timeSlots: [
      { time: "10:00 AM - 01:00 PM", capacity: 600, booked: 210, available: 390, status: "Low Crowd" },
      { time: "01:00 PM - 05:00 PM", capacity: 600, booked: 270, available: 330, status: "Low Crowd" }
    ],
    hourlyTrends: [
      { hour: "10 AM", expectedCrowd: "Low", occupancyPercent: 25 },
      { hour: "12 PM", expectedCrowd: "Moderate", occupancyPercent: 40 },
      { hour: "02 PM", expectedCrowd: "Moderate", occupancyPercent: 45 },
      { hour: "04 PM", expectedCrowd: "Low", occupancyPercent: 35 }
    ]
  },
  {
    id: "site-5",
    name: "Hampi Group of Monuments",
    category: "Heritage",
    location: "Vijayanagara, Karnataka",
    state: "Karnataka",
    capacity: 1800,
    visitors: 690,
    entryRatePerHour: 110,
    exitRatePerHour: 95,
    openingHours: "06:00 AM – 06:00 PM",
    closedOn: "Open all days",
    architecturalStyle: "Dravidian & Vijayanagara Style",
    builtIn: "14th–16th Century CE",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b74a?w=1200&q=80",
    description: "The magnificent capital of the Vijayanagara Empire sprawling across 4,100 hectares on the banks of Tungabhadra river. World-renowned for the Stone Chariot, musical pillars of Vittala Temple, and monolithic Ganeshas.",
    history: "Described by European and Persian travelers as one of the richest cities of the world, Hampi reached its zenith under Emperor Krishnadevaraya before its siege in 1565. UNESCO recognized it in 1986.",
    ticketTiers: [
      { type: "Indian Citizen", price: 40, currency: "INR", description: "Covers Vittala Temple, Zenana Enclosure & Museum" },
      { type: "Foreign Tourist", price: 600, currency: "INR", description: "Single-day multi-monument pass" },
      { type: "Children under 15", price: 0, currency: "INR", description: "Complimentary access" }
    ],
    timeSlots: [
      { time: "06:00 AM - 10:00 AM", capacity: 600, booked: 250, available: 350, status: "Available" },
      { time: "10:00 AM - 02:00 PM", capacity: 600, booked: 290, available: 310, status: "Available" },
      { time: "02:00 PM - 06:00 PM", capacity: 600, booked: 150, available: 450, status: "Low Crowd" }
    ],
    hourlyTrends: [
      { hour: "06 AM", expectedCrowd: "Low", occupancyPercent: 20 },
      { hour: "09 AM", expectedCrowd: "Moderate", occupancyPercent: 42 },
      { hour: "12 PM", expectedCrowd: "Moderate", occupancyPercent: 38 },
      { hour: "03 PM", expectedCrowd: "Low", occupancyPercent: 32 },
      { hour: "05 PM", expectedCrowd: "Moderate", occupancyPercent: 45 }
    ]
  },
  {
    id: "site-6",
    name: "Konark Sun Temple",
    category: "Temple",
    location: "Konark, Odisha",
    state: "Odisha",
    capacity: 1500,
    visitors: 1120,
    entryRatePerHour: 220,
    exitRatePerHour: 180,
    openingHours: "06:00 AM – 08:00 PM (Light & Sound Show in Evening)",
    closedOn: "Open all days",
    architecturalStyle: "Kalinga Architectural Marvel",
    builtIn: "1250 CE by King Narasimhadeva I",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=1200&q=80",
    description: "Designed in the shape of a colossal chariot of the Sun God Surya, drawn by seven carved horses and equipped with 24 intricately sculpted stone wheels that function as accurate sundials.",
    history: "Referred to by ancient European mariners as the 'Black Pagoda', the temple was built on the Bay of Bengal coastline. It is an extraordinary testament to 13th-century Eastern Ganga architecture.",
    ticketTiers: [
      { type: "Indian Citizen", price: 40, currency: "INR", description: "Standard archaeological admission" },
      { type: "Foreign Tourist", price: 600, currency: "INR", description: "Includes monument enclosure" },
      { type: "Light & Sound Show", price: 50, currency: "INR", description: "Evening show at 07:00 PM" }
    ],
    timeSlots: [
      { time: "06:00 AM - 10:00 AM", capacity: 500, booked: 320, available: 180, status: "Moderate" },
      { time: "10:00 AM - 02:00 PM", capacity: 500, booked: 440, available: 60, status: "Filling Fast" },
      { time: "02:00 PM - 06:00 PM", capacity: 500, booked: 360, available: 140, status: "Moderate" }
    ],
    hourlyTrends: [
      { hour: "06 AM", expectedCrowd: "Low", occupancyPercent: 28 },
      { hour: "09 AM", expectedCrowd: "High", occupancyPercent: 74 },
      { hour: "12 PM", expectedCrowd: "High", occupancyPercent: 82 },
      { hour: "03 PM", expectedCrowd: "Moderate", occupancyPercent: 65 },
      { hour: "06 PM", expectedCrowd: "Moderate", occupancyPercent: 58 }
    ]
  }
];

export const initialAlerts = [
  {
    id: "alert-1",
    siteId: "site-1",
    siteName: "Taj Mahal",
    severity: "critical",
    message: "Visitor count has reached 83% of peak safe capacity. West gate entry throttling recommended.",
    acknowledged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "alert-2",
    siteId: "site-6",
    siteName: "Konark Sun Temple",
    severity: "high",
    message: "Queue build-up detected at central chariot viewing platform. Staggered batching active.",
    acknowledged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "alert-3",
    siteId: "site-2",
    siteName: "Amber Fort & Palace",
    severity: "moderate",
    message: "Surge expected in afternoon time slot due to regional tour group arrivals.",
    acknowledged: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
  }
];

export const initialActivity = [
  {
    id: "act-1",
    text: "Taj Mahal East Gate automated ticket scanners synced: 480 entries/hr logged",
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    icon: "entry"
  },
  {
    id: "act-2",
    text: "Crowd density threshold alert generated for Taj Mahal (2,890 / 3,500)",
    time: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    icon: "alert"
  },
  {
    id: "act-3",
    text: "Amber Fort afternoon time-slot bookings updated (340 slots remaining)",
    time: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    icon: "slot"
  },
  {
    id: "act-4",
    text: "National Museum digital audio-guide inventory replenished (450 units available)",
    time: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    icon: "info"
  }
];

// In-memory working copies for demo mode
export let sitesStore = initialSites.map(s => ({ ...s }));
export let alertsStore = initialAlerts.map(a => ({ ...a }));
export let activityStore = initialActivity.map(ac => ({ ...ac }));

export function calculateDensity(visitors, capacity) {
  const percent = Math.round((visitors / capacity) * 100);
  let status = "Low";
  let color = "emerald";
  if (percent >= 90) {
    status = "Critical";
    color = "rose";
  } else if (percent >= 70) {
    status = "High";
    color = "amber";
  } else if (percent >= 40) {
    status = "Moderate";
    color = "blue";
  }
  return { percent, status, color };
}
