'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Search,
} from 'lucide-react';
import ServiceInquiryModal from '@/components/services/ServiceInquiryModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 pt-6 pb-16 lg:pt-8 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sky Hero Container matching reference layout */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e0f2fe] border border-blue-200 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-blue-500/10 overflow-hidden">
          {/* Soaring Airliner Background Image with Smooth Motion Animation */}
          <div className="absolute inset-0 z-0 opacity-95 pointer-events-none overflow-hidden">
            <div className="relative w-full h-full animate-flight-pan">
              <Image
                src="/images/hero_flight_bg.png"
                alt="SkyWings Commercial Flight Soaring in Blue Sky"
                fill
                priority
                className="object-cover object-right sm:object-right"
              />
            </div>
          </div>

          {/* Soft White Left Vignette for Text Legibility (Leaving Right Airliner View Clear) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-0 pointer-events-none" />

          {/* Grid Layout: Left 7 Columns Text & Stats, Right Open Flight Sky */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-[#2563eb] text-xs font-extrabold shadow-sm border border-blue-200 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#2563eb]" />
                <span className="uppercase tracking-wider">ELEVATE YOUR TRAVEL JOURNEY</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Experience The Magic Of <span className="text-[#2563eb]">Flight & Travel!</span>
              </h1>

              {/* Subtitle in Bengali */}
              <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-bold leading-relaxed">
                সৌদি আরবে আপনার <span className="text-[#2563eb] font-extrabold">উমরাহ ভিসা, বিমান টিকিট, পাসপোর্ট তথ্য (মালুমাত), ইনভেস্টর লাইসেন্স</span> এবং প্রবাসী সরকারি সকল সেবার একমাত্র নির্ভরযোগ্য প্রতিষ্ঠান।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book A Trip Now</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>

                <a
                  href="#tracker"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm border border-slate-200/90 shadow-md backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#2563eb]" />
                  <span>Track Application</span>
                </a>
              </div>

              {/* Statistics Row */}
              <div className="pt-6 border-t border-blue-200/80 grid grid-cols-3 gap-4 max-w-lg text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#2563eb]">15+</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#2563eb]">50K+</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Happy Travelers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#2563eb]">4 KSA</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Major Branches</p>
                </div>
              </div>
            </div>

            {/* Right Column: Open Airliner Viewport */}
            <div className="hidden lg:block lg:col-span-5 h-96 relative pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interactive Service Booking Modal */}
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle="General Travel & Umrah Booking"
        serviceCategory="Umrah"
      />
    </section>
  );
}
