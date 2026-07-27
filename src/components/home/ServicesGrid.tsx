'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Moon,
  Plane,
  FileCheck,
  UserCheck,
  Building2,
  Briefcase,
  PackageCheck,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import ServiceInquiryModal from '@/components/services/ServiceInquiryModal';

const services = [
  {
    id: 'umrah-tourism',
    slug: 'umrah-tourism',
    title: 'Umrah & Nusuk Services',
    titleBn: 'উমরাহ প্যাকেজ ও নুশুক পারমিট',
    category: 'Umrah',
    icon: Moon,
    badge: 'Popular',
    desc: 'Complete Umrah visa processing, Nusuk Rawdah permit, luxury 5-star & 3-star hotel booking in Makkah & Madinah, and private transport.',
    highlights: ['Nusuk App Permit Assistance', 'Makkah/Madinah Hotels', 'Ziyarah Bus & Private GMC'],
  },
  {
    id: 'flight-ticketing',
    slug: 'flight-ticketing',
    title: 'Flight Ticketing',
    titleBn: 'আন্তর্জাতিক বিমান টিকিট বুকিং',
    category: 'Flight Ticketing',
    icon: Plane,
    badge: 'Best Rate',
    desc: 'Direct flight reservations from Saudi Arabia (Riyadh, Jeddah, Dammam, Madinah) to Bangladesh, India, Pakistan, and worldwide.',
    highlights: ['Saudia, Biman, FlyNas, Gulf Air', 'Date Change & Refund Desk', 'Excess Baggage Allowance'],
  },
  {
    id: 'passport-malumat',
    slug: 'passport-malumat',
    title: 'Passport Malumat (Absher)',
    titleBn: 'পাসপোর্ট তথ্য মালুমাত ও আবশের আপডেট',
    category: 'Passport Malumat',
    icon: FileCheck,
    badge: '24h Fast Track',
    desc: 'Immediate updating of new passport details in Jawazat / Absher system following passport renewal or lost passport issuance.',
    highlights: ['Jawazat Portal Sync', 'No Iqama Blockage', 'Express 24-Hour Processing'],
  },
  {
    id: 'ziyarah-visa',
    slug: 'ziyarah-visa',
    title: 'Ziyarah & Visit Visas',
    titleBn: 'জিয়ারাহ ও ফ্যামিলি ভিজিট ভিসা',
    category: 'Ziyarah Visa',
    icon: UserCheck,
    badge: 'Family Desk',
    desc: 'Single & multiple entry family visit visa application, extension, medical insurance, and MOFA approval assistance.',
    highlights: ['MOFA Family Visit Visa', 'Multi-Entry Stamping', 'Insurance & Extension'],
  },
  {
    id: 'business-misa-license',
    slug: 'business-misa-license',
    title: 'MISA Foreign Investor License',
    titleBn: 'এমআইএসএ (MISA) ইনভেস্টর লাইসেন্স ও সিআর',
    category: 'MISA Investor License',
    icon: Building2,
    badge: 'Corporate',
    desc: 'Complete assistance for foreign businessmen to establish 100% owned commercial enterprises in Saudi Arabia under Ministry of Investment.',
    highlights: ['100% Foreign Ownership', 'Commercial Registration (CR)', 'Bank Account Opening'],
  },
  {
    id: 'visa-amel-services',
    slug: 'visa-amel-services',
    title: 'Qiwa & Amel Resolution',
    titleBn: 'কিওয়া (Qiwa) ও আমেল স্পন্সরশিপ সার্ভিস',
    category: 'Qiwa/Amel Issues',
    icon: Briefcase,
    badge: 'HRSD Legal',
    desc: 'Expat labor transfer resolution, Qiwa contract verification, Nitaqat compliance check, and Absher Kafeel transfer troubleshooting.',
    highlights: ['Qiwa Contract Transfer', 'Absher Sponsorship Sync', 'Labor Court Clearance'],
  },
  {
    id: 'cargo',
    slug: 'cargo',
    title: 'Cargo & Logistics',
    titleBn: 'কার্গো ও মালামাল পরিবহন সার্ভিস',
    category: 'Cargo',
    icon: PackageCheck,
    badge: 'Door to Door',
    desc: 'Door-to-door air and sea cargo services from Saudi Arabia to South Asian countries with full tracking and insurance.',
    highlights: ['Door-to-Door Delivery', 'Customs Clearance', 'Real-Time Tracking'],
  },
];

export default function ServicesGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const openInquiryModal = (title: string, category: string) => {
    setSelectedTitle(title);
    setSelectedCategory(category);
    setModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-[#2563eb] text-xs font-bold border border-blue-200">
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            <span>Popular Travel & Expat Destinations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Popular Services & Destinations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            সৌদি আরবে প্রবাসী ভাইদের জন্য সর্বোচ্চ বিশ্বস্ততা ও নিরাপত্তার সাথে সব ধরণের সরকারি ও ভ্রমণ সেবা।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-white p-7 border border-slate-200/80 hover:border-[#2563eb]/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center shadow-sm group-hover:bg-[#2563eb] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-[#2563eb] border border-blue-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-[#2563eb] mb-3">{service.titleBn}</p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">{service.desc}</p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Grid */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <span>View Requirements</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => openInquiryModal(service.title, service.category)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Inquire & Assign Branch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Interactive Service Inquiry & Branch Assignment Modal */}
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle={selectedTitle}
        serviceCategory={selectedCategory}
      />
    </section>
  );
}
