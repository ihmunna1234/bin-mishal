'use client';

import React from 'react';
import {
  Plane,
  Moon,
  FileText,
  Building,
  ShieldCheck,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  MapPin,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#064e3b] via-[#0F6C44] to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#148C59]/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Badge Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A4B2F]/80 border border-[#D4AF37]/50 text-[#E5C158] text-xs font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Licensed Saudi Travel & Expat Desk • EST. 2010</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Trusted Expat & Travel Services in{' '}
              <span className="gold-gradient-text drop-shadow-sm">Saudi Arabia</span>
            </h1>

            {/* Multilingual Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
              সৌদি আরবে আপনার <span className="text-[#E5C158] font-bold">উমরাহ ভিসা, বিমান টিকিট, পাসপোর্ট তথ্য (মালুমাত), ইনভেস্টর লাইসেন্স</span> এবং কফিল ট্রান্সফার সংক্রান্ত সব জটিল সেবার সমাধান।
            </p>

            {/* Quick Action Category Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <a
                href="#tracker"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A4B2F]/80 hover:bg-[#0F6C44] text-xs text-emerald-100 border border-emerald-600/60 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Passport Malumat</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A4B2F]/80 hover:bg-[#0F6C44] text-xs text-emerald-100 border border-emerald-600/60 transition-colors"
              >
                <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Umrah Packages</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A4B2F]/80 hover:bg-[#0F6C44] text-xs text-emerald-100 border border-emerald-600/60 transition-colors"
              >
                <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Flight Tickets</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A4B2F]/80 hover:bg-[#0F6C44] text-xs text-emerald-100 border border-emerald-600/60 transition-colors"
              >
                <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>MISA License</span>
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#tracker"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl gold-gradient-bg text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Track Application Status</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/966501112233"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0A4B2F]/90 hover:bg-[#0F6C44] text-white font-bold text-sm border border-emerald-600 transition-all"
              >
                <MessageSquare className="w-4.5 h-4.5 text-[#D4AF37]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-[#E5C158]">15+</p>
                <p className="text-xs text-emerald-200">Years Experience</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-[#E5C158]">50K+</p>
                <p className="text-xs text-emerald-200">Expats Serviced</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-[#E5C158]">4 KSA</p>
                <p className="text-xs text-emerald-200">Major Branches</p>
              </div>
            </div>
          </div>

          {/* Right Highlight Card Column */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glassmorphism Hero Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#064e3b]/90 border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Bin Misal Direct Desk
                  </span>
                </div>
                <span className="text-xs text-[#E5C158] bg-amber-950/80 px-2.5 py-1 rounded-md border border-[#D4AF37]/40 font-bold">
                  Instant Support
                </span>
              </div>

              {/* Service Features Highlights */}
              <div className="py-5 space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#064e3b]/50 border border-emerald-800/50">
                  <div className="p-2 rounded-xl bg-[#0A4B2F] text-[#D4AF37] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Passport Malumat & Iqama Update</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Fast tracking of passport information update on Jawazat/Absher portal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#064e3b]/50 border border-emerald-800/50">
                  <div className="p-2 rounded-xl bg-[#0A4B2F] text-[#D4AF37] shrink-0">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Umrah Packages & Nusuk Permit</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Full arrangement for Makkah & Madinah hotel, transport, and Rawdah permits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#064e3b]/50 border border-emerald-800/50">
                  <div className="p-2 rounded-xl bg-[#0A4B2F] text-[#D4AF37] shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">MISA Investor License & CR</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      100% legal business setup and investor licensing in Saudi Arabia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch Quick Indicator */}
              <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                  <span className="font-bold text-slate-200">Branches:</span>
                </div>
                <div className="flex gap-2 text-xs text-emerald-200">
                  <span className="bg-[#0A4B2F] px-2.5 py-0.5 rounded-md border border-emerald-700 font-semibold">Riyadh</span>
                  <span className="bg-[#0A4B2F] px-2.5 py-0.5 rounded-md border border-emerald-700 font-semibold">Dammam</span>
                  <span className="bg-[#0A4B2F] px-2.5 py-0.5 rounded-md border border-emerald-700 font-semibold">Madinah</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
