# HeritagePulse – Smart Heritage Site Crowd Management System

Next.js full-stack smart tourism and crowd management platform for major Indian heritage destinations, including the Taj Mahal, Amber Fort, Qutub Minar, Hampi, Konark Sun Temple, and National Museums.

Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, **Recharts**, and **MongoDB / Mongoose** (with seamless zero-configuration in-memory demo mode fallback).

---

## 🌟 Key Features

1. **Heritage Site Discovery & Historical Information**
   - Comprehensive destination profiles (Historical significance, architectural style, built-in era, opening hours, visitor rules).
   - High-definition photography and location metadata.

2. **Real-Time Crowd Density Meter**
   - Live visitor headcounts mapped against certified safe maximum capacities.
   - Four-state mathematical crowd classification:
     - **Low** (<40%)
     - **Moderate** (40–69%)
     - **High** (70–89%)
     - **Critical** (≥90%)

3. **Quota-Bounded Time-Slot Reservation**
   - Staggered visiting windows (Sunrise, Morning, Afternoon, Sunset) with remaining seat quotas.
   - Interactive booking simulation modal.

4. **Transparent Ticket Tariffs**
   - Distinct pricing tiers for Indian Citizens, SAARC/BIMSTEC visitors, Foreign Tourists, Students, and Children.

5. **Live Gate Entry & Exit Telemetry**
   - Real-time throughput metrics (hourly entry flow, exit flow, and average queue wait times).

6. **Interactive Sensor Simulation Engine**
   - Integrated `/api/simulation/tick` endpoint allowing evaluators and staff to simulate live visitor count fluctuations and crowd alert triggers in real time.

7. **Operations Control Center (Dashboard)**
   - High-density monitoring console for site administrators.
   - 7-day tourist volume trends (Recharts area charts).
   - Capacity ratio distribution (Recharts donut charts).
   - Real-time crowd threshold alert triage and acknowledgement workflow.
   - Audit activity log.

---

## 🚀 Quick Start

### 1. Requirements
- Node.js 20.x or 22.x
- npm

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be live at: **http://localhost:3000**

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔑 Demo Administrator Credentials

The application includes an automatic in-memory demo store that activates when no MongoDB database is provided:
- **Email:** `admin@heritagepulse.local`
- **Password:** `admin123`

*(On the `/login` screen, click the **"Auto-Fill Evaluator Demo Credentials"** button for instant one-click login).*

---

## 📁 Project Architecture

```
257project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/login/route.js        # JWT admin authentication
│   │   │   ├── dashboard/route.js         # Operations intelligence aggregate
│   │   │   ├── sites/route.js             # Sites listing & registration
│   │   │   ├── sites/[id]/route.js        # Single destination telemetry & update
│   │   │   ├── alerts/route.js            # Crowd alerts feed
│   │   │   ├── alerts/[id]/acknowledge/   # Alert acknowledgement
│   │   │   ├── simulation/tick/route.js   # Live sensor walk simulation
│   │   │   └── health/route.js            # Service health monitor
│   │   ├── dashboard/
│   │   │   ├── layout.jsx                 # Operations control room sidebar & bar
│   │   │   ├── page.jsx                   # Overview dashboard & Recharts
│   │   │   ├── sites/page.jsx             # Site capacity management & CRUD
│   │   │   ├── analytics/page.jsx         # Flow curves & peak hours modeling
│   │   │   └── alerts/page.jsx            # Crowd alert monitoring & triage
│   │   ├── sites/[id]/page.jsx            # Destination details, history, tickets & slots
│   │   ├── login/page.jsx                 # Secure staff authentication
│   │   ├── layout.jsx                     # Root Next.js layout
│   │   ├── page.jsx                       # Public heritage tourism portal
│   │   └── globals.css                    # Tailwind CSS v4 styling
│   ├── components/
│   │   ├── Navbar.jsx                     # Modern sticky navigation
│   │   └── Footer.jsx                     # Heritage preservation footer
│   └── lib/
│       ├── auth.js                        # JWT verification & cookies/headers
│       ├── database.js                    # MongoDB connection with demo fallback
│       ├── demoStore.js                   # Pre-seeded heritage data & simulation store
│       └── models/                        # Mongoose data schemas (Site, Alert, User)
├── package.json
└── README.md
```

---

## 🏛️ Monitored Heritage Sites Pre-Seeded
1. **Taj Mahal**, Agra, Uttar Pradesh (Mughal Architecture, 1631–1648 AD)
2. **Amber Fort & Palace**, Jaipur, Rajasthan (Rajput-Mughal Fusion, 1592 AD)
3. **Qutub Minar & Complex**, New Delhi (Indo-Islamic Afghan Style, 1199 AD)
4. **National Museum**, Janpath, New Delhi (Classical Indian Heritage, 1949)
5. **Hampi Group of Monuments**, Vijayanagara, Karnataka (Dravidian Architecture, 14th–16th Century)
6. **Konark Sun Temple**, Konark, Odisha (Kalinga Architectural Marvel, 1250 CE)
