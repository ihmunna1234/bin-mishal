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
  Compass,
  CheckCircle2,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Soft Azure Sky Hero Card Container matching attached design */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-white border border-blue-100 p-8 sm:p-12 lg:p-16 shadow-xl shadow-blue-500/5 overflow-hidden">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/15 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#2563eb] text-xs font-bold shadow-sm border border-blue-200">
                <Sparkles className="w-4 h-4 text-[#2563eb]" />
                <span className="uppercase tracking-wider">ELEVATE YOUR TRAVEL JOURNEY</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Experience The Magic Of <span className="text-[#2563eb]">Flight & Travel!</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
                সৌদি আরবে আপনার <span className="text-[#2563eb] font-extrabold">উমরাহ ভিসা, বিমান টিকিট, পাসপোর্ট তথ্য (মালুমাত), ইনভেস্টর লাইসেন্স</span> এবং প্রবাসী সরকারি সকল সেবার একমাত্র নির্ভরযোগ্য প্রতিষ্ঠান।
              </p>

              {/* Action Buttons with Electric Blue Pill Styling */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                >
                  <span>Book A Trip Now</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </a>

                <a
                  href="#tracker"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm border border-slate-200 shadow-md transition-all"
                >
                  <Search className="w-4 h-4 text-[#2563eb]" />
                  <span>Track Application</span>
                </a>
              </div>

              {/* Partner Badges / Features */}
              <div className="pt-6 border-t border-blue-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-extrabold text-[#2563eb]">15+</p>
                  <p className="text-xs font-semibold text-slate-600">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#2563eb]">50K+</p>
                  <p className="text-xs font-semibold text-slate-600">Happy Travelers</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#2563eb]">4 KSA</p>
                  <p className="text-xs font-semibold text-slate-600">Major Branches</p>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Column matching image layout */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-blue-100 space-y-6">
                {/* Header Badge inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Bin Misal SkyDesk</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Saudi Arabia & Worldwide</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    24/7 Active
                  </span>
                </div>

                {/* Services Checklist Cards */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900">Passport Malumat (Absher)</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Instant Jawazat portal updating for new Bangladeshi passports.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900">Umrah & Nusuk Permits</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Makkah & Madinah 5-star hotel bookings and Rawdah permits.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900">MISA Investor License</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        100% foreign business ownership setup in Saudi Arabia.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating "Know More" Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-xs font-extrabold">Awesome Destinations</p>
                    <p className="text-[10px] text-blue-100">Discover packages to Makkah, Madinah & worldwide.</p>
                  </div>
                  <a
                    href="https://wa.me/966501112233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
