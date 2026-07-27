'use client';

import React from 'react';
import Image from 'next/image';
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
  Compass,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 pt-6 pb-16 lg:pt-8 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Card Container with Animated Flight Background */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-white border border-blue-200/90 p-8 sm:p-14 lg:p-20 shadow-2xl shadow-blue-500/15 overflow-hidden">
          {/* High-Visibility Animated Flight Background Image */}
          <div className="absolute inset-0 z-0 opacity-85 mix-blend-multiply pointer-events-none overflow-hidden">
            <div className="relative w-full h-full animate-flight-pan">
              <Image
                src="/images/hero_flight_bg.png"
                alt="SkyWings Commercial Flight Soaring in Blue Sky"
                fill
                priority
                className="object-cover object-center sm:object-right"
              />
            </div>
          </div>

          {/* Soft Glassy Gradient Vignette Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:to-white/40 z-0 pointer-events-none" />

          {/* Hero Content - Clean & Spacious Layout */}
          <div className="max-w-3xl relative z-10 space-y-7 text-left">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 text-[#2563eb] text-xs font-extrabold shadow-md border border-blue-200 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#2563eb] animate-pulse" />
              <span className="uppercase tracking-wider">PREMIUM SAUDI ARABIA & INTERNATIONAL TRAVEL</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Experience The Magic Of <br className="hidden sm:block" />
              <span className="text-[#2563eb] drop-shadow-xs">Flight & Travel!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-800 max-w-2xl font-bold leading-relaxed drop-shadow-2xs">
              সৌদি আরবে আপনার <span className="text-[#2563eb]">উমরাহ ভিসা, বিমান টিকিট, পাসপোর্ট তথ্য (মালুমাত), ইনভেস্টর লাইসেন্স</span> এবং প্রবাসী সরকারি সকল সেবার একমাত্র নির্ভরযোগ্য প্রতিষ্ঠান।
            </p>

            {/* Action Buttons with Electric Blue Pill Styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 px-9 py-4.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 transition-all transform hover:scale-[1.03] cursor-pointer"
              >
                <span>Book A Trip Now</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </a>

              <a
                href="#tracker"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-full bg-white/95 hover:bg-white text-slate-900 font-extrabold text-sm border border-slate-200/90 shadow-md backdrop-blur-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#2563eb]" />
                <span>Track Application Status</span>
              </a>
            </div>

            {/* Feature Chips Bar */}
            <div className="pt-6 border-t border-blue-200/80 flex flex-wrap items-center gap-3 text-xs font-extrabold text-slate-800">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xs">
                <Plane className="w-4 h-4 text-[#2563eb]" />
                <span>Flight Ticketing</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xs">
                <Moon className="w-4 h-4 text-[#2563eb]" />
                <span>Umrah Nusuk Permits</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xs">
                <FileText className="w-4 h-4 text-[#2563eb]" />
                <span>Passport Malumat</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xs">
                <Building className="w-4 h-4 text-[#2563eb]" />
                <span>MISA Setup</span>
              </div>
            </div>

            {/* Partner Statistics Row */}
            <div className="pt-2 grid grid-cols-3 gap-6 max-w-md text-left">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">15+</p>
                <p className="text-xs font-extrabold text-slate-700 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">50K+</p>
                <p className="text-xs font-extrabold text-slate-700 mt-0.5">Happy Travelers</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">4 KSA</p>
                <p className="text-xs font-extrabold text-slate-700 mt-0.5">Major Branches</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
