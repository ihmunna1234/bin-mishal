'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  Clock,
  Building2,
} from 'lucide-react';

interface BranchInfo {
  id: string;
  name: string;
  city: 'Riyadh' | 'Dammam' | 'Madinah' | 'Jeddah';
  address: string;
  addressBn: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  hours: string;
  manager: string;
}

const branchesData: BranchInfo[] = [
  {
    id: 'riyadh',
    name: 'Riyadh Batha Head Office',
    city: 'Riyadh',
    address: 'Batha Commercial Center, Opposite Al-Rajhi Tower, Riyadh 12633',
    addressBn: 'বাতহা বাণিজ্যিক সেন্টার, আল-রাজহি টাওয়ারের বিপরীতে, রিয়াদ',
    phone: '+966 11 401 2345',
    whatsapp: '966501112233',
    googleMapsUrl: 'https://maps.google.com/?q=24.6333,46.7167',
    hours: '8:00 AM - 10:30 PM (Sat - Thu)',
    manager: 'Abdullah Al-Mansoor',
  },
  {
    id: 'dammam',
    name: 'Dammam Regional Branch',
    city: 'Dammam',
    address: 'King Fahd Road, Central Commercial Area, Dammam 32241',
    addressBn: 'কিং ফাহাদ রোড, কেন্দ্রীয় বাণিজ্যিক এলাকা, দাম্মাম',
    phone: '+966 13 801 2345',
    whatsapp: '966502223344',
    googleMapsUrl: 'https://maps.google.com/?q=26.4207,50.0888',
    hours: '8:30 AM - 10:00 PM (Sat - Thu)',
    manager: 'Tariq Al-Zahrani',
  },
  {
    id: 'madinah',
    name: 'Madinah Central Branch',
    city: 'Madinah',
    address: 'Northern Central Area, 300m from Al-Masjid an-Nabawi, Madinah',
    addressBn: 'উত্তর কেন্দ্রীয় এলাকা, মসজিদ-উন-নববীর ৩০০ মিটারের মধ্যে, মদিনা',
    phone: '+966 14 801 2345',
    whatsapp: '966503334455',
    googleMapsUrl: 'https://maps.google.com/?q=24.4672,39.6112',
    hours: '8:00 AM - 11:00 PM (Everyday)',
    manager: 'Faisal Al-Harbi',
  },
  {
    id: 'jeddah',
    name: 'Jeddah Al-Balad Branch',
    city: 'Jeddah',
    address: 'Al-Balad Heritage District, Corniche Road, Jeddah 22236',
    addressBn: 'আল-বালাদ এলাকা, কর্নিশ রোড, জেদ্দা',
    phone: '+966 12 601 2345',
    whatsapp: '966504445566',
    googleMapsUrl: 'https://maps.google.com/?q=21.4858,39.1925',
    hours: '8:30 AM - 10:00 PM (Sat - Thu)',
    manager: 'Sami Al-Gamdi',
  },
];

export default function BranchFinder() {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const filteredBranches =
    selectedCity === 'All'
      ? branchesData
      : branchesData.filter((b) => b.city === selectedCity);

  return (
    <section id="branches" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A4B2F]/90 text-[#E5C158] text-xs font-bold border border-emerald-700">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Kingdom Wide Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Saudi Arabia Branch Locations
          </h2>
          <p className="text-sm text-slate-300">
            রিয়াদ, দাম্মাম, মদিনা ও জেদ্দায় আমাদের নিজস্ব ব্রাঞ্চ থেকে সরাসরি সেবা নিন।
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', 'Riyadh', 'Dammam', 'Madinah', 'Jeddah'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCity === city
                  ? 'gold-gradient-bg text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {city === 'All' ? 'All Saudi Branches' : city}
            </button>
          ))}
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="rounded-3xl bg-slate-800/90 border border-slate-700/80 p-7 hover:border-[#0F6C44] transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-700">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-extrabold uppercase text-[#E5C158] tracking-wider">
                        {branch.city} Region
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{branch.name}</h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-[#064e3b] text-emerald-300 text-[11px] font-bold border border-emerald-800 shrink-0">
                    Active Branch
                  </span>
                </div>

                {/* Branch Details */}
                <div className="space-y-3.5 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-100">{branch.address}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{branch.addressBn}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{branch.hours}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                    <span className="font-mono font-bold text-slate-200">{branch.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700">
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=Assalamu%20Alaikum,%20I%20need%20assistance%20from%20${encodeURIComponent(
                    branch.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#0F6C44] hover:bg-[#0A4B2F] text-white font-extrabold text-xs shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold text-xs border border-slate-600 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
