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
    name: 'Riyadh Batha Main Branch',
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
    name: 'Dammam City Branch',
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
    <section id="branches" className="py-20 bg-[#e0f2fe]/40 border-t border-blue-100 relative text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0f2fe] text-[#2563eb] text-xs font-extrabold border border-blue-200 shadow-2xs">
            <Building2 className="w-4 h-4 text-[#2563eb]" />
            <span>Kingdom Wide Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Our Saudi Arabia Branch Locations
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            রিয়াদ, দাম্মাম, মদিনা ও জেদ্দায় আমাদের নিজস্ব ব্রাঞ্চ থেকে সরাসরি সেবা নিন।
          </p>
        </div>

        {/* City Filter Tabs with Ice Blue Secondary Accent */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', 'Riyadh', 'Dammam', 'Madinah', 'Jeddah'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white hover:bg-[#e0f2fe] text-slate-700 border border-blue-100 shadow-2xs'
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
              className="rounded-3xl bg-white border border-blue-100/90 p-7 hover:border-[#2563eb] transition-all duration-300 flex flex-col justify-between shadow-xl shadow-blue-500/5"
            >
              <div>
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                      <span className="text-[11px] font-extrabold uppercase text-[#2563eb] tracking-wider">
                        {branch.city} Region
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">{branch.name}</h3>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-[#e0f2fe] text-[#2563eb] text-[11px] font-extrabold border border-blue-200 shrink-0">
                    Active Branch
                  </span>
                </div>

                {/* Branch Details */}
                <div className="space-y-3.5 text-xs text-slate-600 mb-6 font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-[#2563eb] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-slate-900">{branch.address}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{branch.addressBn}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                    <span className="font-bold text-slate-800">{branch.hours}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                    <span className="font-mono font-bold text-slate-800">{branch.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=Assalamu%20Alaikum,%20I%20need%20assistance%20from%20${encodeURIComponent(
                    branch.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#1e3a8a] font-extrabold text-xs border border-blue-200 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#2563eb]" />
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
