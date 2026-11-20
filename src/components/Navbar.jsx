"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Landmark, Users, Clock, Ticket, Shield, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    setToken(localStorage.getItem("heritagepulse_token"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3" : "bg-slate-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
              HeritagePulse
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                LIVE
              </span>
            </div>
            <div className="text-xs text-amber-200/60 font-medium">Smart Heritage Tourism Platform</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            Destinations
          </Link>
          <Link href="/#spotlight" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            Taj Mahal Spotlight
          </Link>
          <Link href="/#crowd-info" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            Live Crowd Levels
          </Link>
          <Link href="/#timeslots" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-400" />
            Time Slots
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <Link
              href="/dashboard"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md"
            >
              Control Center
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="border border-slate-700 hover:border-amber-400/50 hover:bg-slate-800 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Staff Login
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 font-medium py-2 hover:text-amber-400"
          >
            Destinations & Monuments
          </Link>
          <Link
            href="/#spotlight"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 font-medium py-2 hover:text-amber-400"
          >
            Taj Mahal Spotlight
          </Link>
          <Link
            href="/#crowd-info"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 font-medium py-2 hover:text-amber-400"
          >
            Live Crowd Tracker
          </Link>
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-amber-500 text-slate-950 font-semibold py-2.5 rounded-lg block text-sm"
            >
              Access Control Center
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
