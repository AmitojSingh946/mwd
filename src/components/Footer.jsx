import Link from "next/link";
import { Landmark, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Landmark className="w-5 h-5 text-amber-400" />
              HeritagePulse
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Tourism & Crowd Management Architecture for high-density heritage sites, national monuments, and archaeological treasures.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Real-time gate telemetry operational
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Featured Sites</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/sites/site-1" className="hover:text-amber-400 transition-colors">Taj Mahal, Agra</Link></li>
              <li><Link href="/sites/site-2" className="hover:text-amber-400 transition-colors">Amber Fort, Jaipur</Link></li>
              <li><Link href="/sites/site-3" className="hover:text-amber-400 transition-colors">Qutub Minar, Delhi</Link></li>
              <li><Link href="/sites/site-5" className="hover:text-amber-400 transition-colors">Hampi Group, Karnataka</Link></li>
              <li><Link href="/sites/site-6" className="hover:text-amber-400 transition-colors">Konark Sun Temple, Odisha</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Visitor Facilities</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Time-Slot Reservation</span></li>
              <li><span className="text-slate-400">Peak Hour Predictions</span></li>
              <li><span className="text-slate-400">Automated Capacity Alerts</span></li>
              <li><span className="text-slate-400">Ticket Categories & Guidance</span></li>
              <li><span className="text-slate-400">Archaeological Guidelines</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Academic Research</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Modern Web Application Engineering (INT 257) Capstone project demonstration. Built with Next.js, React 19, Tailwind CSS, Recharts & MongoDB.
            </p>
            <div className="text-xs text-slate-400">
              Student ID: <span className="font-mono text-amber-400">12408276</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} HeritagePulse Platform. Independent academic engineering demonstration.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-slate-400">Operations Sign In</Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for cultural preservation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
