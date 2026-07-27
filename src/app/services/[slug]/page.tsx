'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Moon,
  FileCheck,
  Building2,
  Briefcase,
  Plane,
  UserCheck,
  PackageCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  PhoneCall,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ServiceDetail {
  slug: string;
  title: string;
  titleBn: string;
  category: string;
  icon: any;
  heroBg: string;
  description: string;
  descriptionBn: string;
  requirements: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceDetail> = {
  'umrah-tourism': {
    slug: 'umrah-tourism',
    title: 'Umrah Packages & Nusuk Permit Services',
    titleBn: '২০২৬ উমরাহ প্যাকেজ, হোটেল বুকিং ও নুশুক পারমিট',
    category: 'Umrah & Tourism',
    icon: Moon,
    heroBg: 'from-[#e0f2fe] via-[#f0f9ff] to-white',
    description:
      'Complete end-to-end Umrah visa issuance, Nusuk Rawdah Al-Sharifa permits, 5-star & 3-star hotel reservations in Makkah & Madinah, and luxury private GMC / VIP bus transport for Saudi expatriates and international pilgrims.',
    descriptionBn:
      'সৌদি প্রবাসীদের জন্য উমরাহ ভিসা, মদিনা রওজা শরিফ পারমিট, মক্কা ও মদিনায় আন্তর্জাতিক হোটেল বুকিং এবং ভিআইপি পরিবহনের বিশ্বস্ত ও নির্ভরযোগ্য সমাধান।',
    requirements: [
      'Original Saudi Iqama with minimum 3 months validity',
      'Passport copy with minimum 6 months validity',
      'Passport size photograph with white background',
      'Nusuk app registration details for Rawdah permit',
      'Confirmed travel dates and flight itinerary',
    ],
    processSteps: [
      { step: '1', title: 'Consultation & Package Selection', desc: 'Select your preferred hotel category in Makkah/Madinah and transport mode.' },
      { step: '2', title: 'Document Verification', desc: 'Our agents verify Iqama validity and submit visa/permit files.' },
      { step: '3', title: 'Nusuk Permit & Hotel Confirmation', desc: 'Rawdah Al-Sharifa permit is booked via Nusuk portal with instant vouchers.' },
      { step: '4', title: 'Ticket & Voucher Handover', desc: 'Full package itinerary delivered via WhatsApp and email.' },
    ],
    faqs: [
      {
        q: 'How many days before Umrah should I apply?',
        a: 'We recommend booking 5 to 7 days prior to your intended travel date to ensure optimal Rawdah permit slot selection on the Nusuk app.',
      },
      {
        q: 'Can family members on Visit Visa perform Umrah with us?',
        a: 'Yes, family members on Family Visit or Ziyarah visas can perform Umrah under the unified Nusuk permit system.',
      },
      {
        q: 'প্রবাসীদের জন্য প্যাকেজে পরিবহন কি অন্তর্ভুক্ত?',
        a: 'হ্যাঁ, আমাদের প্রতিটি প্যাকেজে রিয়াদ, দাম্মাম বা জেদ্দা থেকে মক্কা-মদিনায় যাতায়াতের লাক্সারি বাস ও প্রাইভেট জিয়্যারা অন্তর্ভুক্ত।',
      },
    ],
  },
  'passport-malumat': {
    slug: 'passport-malumat',
    title: 'Passport Malumat & Absher Information Update',
    titleBn: 'পাসপোর্ট তথ্য (মালুমাত) ও আবশের আপডেট সার্ভিস',
    category: 'Passport Services',
    icon: FileCheck,
    heroBg: 'from-[#e0f2fe] via-[#f0f9ff] to-white',
    description:
      'Express passport information update (Malumat) on Jawazat and Absher systems following passport renewal, lost passport reissuance, or data correction in Saudi Arabia.',
    descriptionBn:
      'নতুন পাসপোর্ট পাওয়ার পর জাওয়াজাত ও আবশের (Absher) পোর্টালে পাসপোর্ট তথ্য আপডেট করার ২৪ ঘণ্টার মধ্যে এক্সপ্রেস সার্ভিস।',
    requirements: [
      'Original New Renewed Passport',
      'Original Previous Old Passport',
      'Valid Saudi Iqama copy',
      'Employer / Company Sponsor Authorization (if requested by Jawazat)',
    ],
    processSteps: [
      { step: '1', title: 'Passport Verification', desc: 'Drop off original passports at our Riyadh, Dammam, or Madinah office.' },
      { step: '2', title: 'Absher / Jawazat Portal Sync', desc: 'Data submitted directly to Saudi Ministry of Interior systems.' },
      { step: '3', title: '24-Hour Express Clearance', desc: 'Confirmation updated on Absher portal with zero penalty.' },
    ],
    faqs: [
      {
        q: 'নতুন পাসপোর্ট পাওয়ার কতদিনের মধ্যে মালুমাত করতে হয়?',
        a: 'সৌদি জাওয়াজাত নিয়মানুযায়ী নতুন পাসপোর্ট পাওয়ার ৭ দিনের মধ্যে আবশের ও জাওয়াজাতে তথ্য আপডেট করা বাধ্যতামূলক। বিলম্ব হলে জরিমানা প্রযোজ্য হতে পারে।',
      },
      {
        q: 'মালুমাত না করলে কি ইকামা ব্লক হতে পারে?',
        a: 'পাসপোর্ট মেয়াদ শেষ বা নতুন পাসপোর্ট আপডেট না থাকলে এয়ারপোর্ট এক্সিট রি-এন্ট্রি বা ইকামা নবায়নে সমস্যা হতে পারে।',
      },
    ],
  },
  'business-misa-license': {
    slug: 'business-misa-license',
    title: 'MISA Foreign Investor Licensing & Company Setup',
    titleBn: 'এমআইএসএ (MISA) ইনভেস্টর লাইসেন্স ও সিআর রেজিস্ট্রেশন',
    category: 'Business & Investment',
    icon: Building2,
    heroBg: 'from-[#e0f2fe] via-[#f0f9ff] to-white',
    description:
      'Comprehensive setup for foreign entrepreneurs establishing 100% foreign-owned business entities in Saudi Arabia under Ministry of Investment (MISA) regulations, Commercial Registration (CR), and corporate bank accounts.',
    descriptionBn:
      'সৌদি আরবে বিদেশি ব্যবসায়ী হিসেবে ১০০% নিজস্ব মালিকানায় বাণিজ্যিক কোম্পানি (CR) ও এমআইএসএ লাইসেন্স প্রাপ্তির লিগ্যাল কনসালটেন্সি।',
    requirements: [
      'Notarized Commercial Registration from home country',
      'Audited financial statements for past fiscal year',
      'Draft Article of Association (AOA)',
      'Passport copy of foreign investor / shareholder',
    ],
    processSteps: [
      { step: '1', title: 'Document Legalization', desc: 'Attestation from Saudi Embassy and Ministry of Foreign Affairs.' },
      { step: '2', title: 'MISA License Application', desc: 'Submission through foreign investment portal.' },
      { step: '3', title: 'Commercial Registration (CR)', desc: 'Issuance of Ministry of Commerce CR and Chamber seal.' },
      { step: '4', title: 'Bank Account & Qiwa Setup', desc: 'Corporate bank account opening and labor ministry file activation.' },
    ],
    faqs: [
      {
        q: 'Can a Bangladeshi or foreign national own 100% of a company in KSA?',
        a: 'Yes, under MISA regulations, foreign investors can obtain 100% equity ownership across commercial, industrial, and service sectors.',
      },
    ],
  },
  'visa-amel-services': {
    slug: 'visa-amel-services',
    title: 'Qiwa & Amel Sponsorship Transfer Resolution',
    titleBn: 'কিওয়া (Qiwa) কফিল পরিবর্তন ও স্পন্সরশিপ ট্রান্সফার',
    category: 'Labor & Visas',
    icon: Briefcase,
    heroBg: 'from-[#e0f2fe] via-[#f0f9ff] to-white',
    description:
      'Expat labor transfer resolution, Qiwa contract offer verification, Nitaqat compliance check, and Absher Kafeel transfer troubleshooting under Ministry of Human Resources & Social Development (HRSD).',
    descriptionBn:
      'কিওয়া পোর্টালে কফিল পরিবর্তন, আমেল চুক্তি যাচাই এবং স্পন্সরশিপ ট্রান্সফারের সরকারি নিয়মভিত্তিক দ্রুত সমাধান।',
    requirements: [
      'Active Qiwa platform account details',
      'Valid Iqama number',
      'New employer company CR number & Nitaqat color status',
      'Clean labor court and penalty record',
    ],
    processSteps: [
      { step: '1', title: 'Nitaqat & Contract Check', desc: 'Verification of new employer status and pending notices.' },
      { step: '2', title: 'Qiwa Job Offer Acceptance', desc: 'Digital acceptance of employment contract on Qiwa portal.' },
      { step: '3', title: 'Jawazat Transfer Fee & Print', desc: 'Processing through Absher Business and new Iqama card issuance.' },
    ],
    faqs: [
      {
        q: 'কিওয়া পোর্টালে কফিল ট্রান্সফার হতে কত সময় লাগে?',
        a: 'সকল শর্তাবলি পূরণ থাকলে নতুন কোম্পানির প্রস্তাব গ্রহণের ৩ থেকে ৭ কর্মদিবসের মধ্যে ট্রান্সফার সম্পন্ন হয়ে থাকে।',
      },
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    const fallbackService = servicesData['umrah-tourism'];
    return renderServiceDetail(fallbackService, openFaqIndex, setOpenFaqIndex);
  }

  return renderServiceDetail(service, openFaqIndex, setOpenFaqIndex);
}

function renderServiceDetail(
  service: ServiceDetail,
  openFaqIndex: number | null,
  setOpenFaqIndex: (i: number | null) => void
) {
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Service Hero Banner */}
      <section className={`relative bg-gradient-to-b ${service.heroBg} text-slate-900 py-16 lg:py-24 overflow-hidden border-b border-blue-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2563eb] hover:text-[#1d4ed8] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#2563eb] border border-blue-200 text-xs font-extrabold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {service.title}
            </h1>

            <p className="text-sm sm:text-base text-[#2563eb] font-extrabold">{service.titleBn}</p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 font-medium">
              {service.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/966501112233?text=Assalamu%20Alaikum,%20I%20need%20assistance%20with%20${encodeURIComponent(
                  service.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href="tel:+966501112233"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs border border-slate-200 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#2563eb]" />
                <span>Call +966 50 111 2233</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Requirements & Document Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-[#2563eb] pl-4">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Required Documents & Guidelines
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Ensure all documents are ready for submission at Riyadh, Dammam, or Madinah branches.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              {service.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#2563eb] shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline Card (Light Theme) */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-8 rounded-3xl shadow-xl border border-blue-100 space-y-5">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-[#2563eb]" />
              Step-by-Step Application Flow
            </h3>

            <div className="space-y-4 text-xs">
              {service.processSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-extrabold flex items-center justify-center shrink-0 text-xs shadow-sm">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{s.title}</h4>
                    <p className="text-slate-600 text-[11px] mt-0.5 font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-600 font-medium">Common queries regarding {service.title}</p>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#2563eb] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
