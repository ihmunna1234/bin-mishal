'use client';

import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Building2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { InquiryStatus, ServiceCategory } from '@/types';

interface TrackedResult {
  tracking_code: string;
  client_name: string;
  client_phone: string;
  service_category: ServiceCategory;
  status: InquiryStatus;
  branch_name: string;
  created_at: string;
  notes: string;
  steps: { title: string; completed: boolean; current: boolean; date?: string }[];
}

const mockDatabase: Record<string, TrackedResult> = {
  '100001': {
    tracking_code: '100001',
    client_name: 'Mohammed Al-Otaibi',
    client_phone: '+966551234567',
    service_category: 'Umrah',
    status: 'New',
    branch_name: 'Riyadh Batha Head Office',
    created_at: '2026-07-26',
    notes: 'Family Umrah package inquiry for 5 adults starting next Friday.',
    steps: [
      { title: 'Inquiry Submitted', completed: true, current: false, date: '2026-07-26' },
      { title: 'Agent Assigned & Review', completed: false, current: true },
      { title: 'Nusuk Permit & Hotel Booking', completed: false, current: false },
      { title: 'Passport Visa Issued & Delivered', completed: false, current: false },
    ],
  },
  '100002': {
    tracking_code: '100002',
    client_name: 'Tariq Rahman',
    client_phone: '+966569876543',
    service_category: 'MISA Investor License',
    status: 'Processing',
    branch_name: 'Riyadh Batha Head Office',
    created_at: '2026-07-24',
    notes: '100% foreign ownership investment company application under MISA.',
    steps: [
      { title: 'Inquiry & CR Review', completed: true, current: false, date: '2026-07-24' },
      { title: 'Document Legalization & MISA Submission', completed: true, current: false, date: '2026-07-25' },
      { title: 'Ministry Approval Pending', completed: false, current: true },
      { title: 'MISA License Issued', completed: false, current: false },
    ],
  },
  '100003': {
    tracking_code: '100003',
    client_name: 'Faisal Khan',
    client_phone: '+966541122334',
    service_category: 'Flight Ticketing',
    status: 'Completed',
    branch_name: 'Dammam Regional Branch',
    created_at: '2026-07-20',
    notes: 'Direct flights Dammam to Dhaka round trip issued.',
    steps: [
      { title: 'Inquiry Received', completed: true, current: false, date: '2026-07-20' },
      { title: 'Flight Selection & Booking', completed: true, current: false, date: '2026-07-20' },
      { title: 'Payment Confirmed', completed: true, current: false, date: '2026-07-21' },
      { title: 'E-Ticket Issued & Sent on WhatsApp', completed: true, current: false, date: '2026-07-21' },
    ],
  },
  '100004': {
    tracking_code: '100004',
    client_name: 'Abdullah Al-Ghamdi',
    client_phone: '+966503344556',
    service_category: 'Ziyarah Visa',
    status: 'Action Required',
    branch_name: 'Madinah Central Branch',
    created_at: '2026-07-22',
    notes: 'Missing updated copy of sponsor Iqama. Please submit via WhatsApp.',
    steps: [
      { title: 'Inquiry Received', completed: true, current: false, date: '2026-07-22' },
      { title: 'Document Verification', completed: true, current: false, date: '2026-07-23' },
      { title: 'Action Required: Submit Iqama Copy', completed: false, current: true },
      { title: 'MOFA Visa Stamping', completed: false, current: false },
    ],
  },
  '100005': {
    tracking_code: '100005',
    client_name: 'Shahid Islam',
    client_phone: '+966556677889',
    service_category: 'Qiwa/Amel Issues',
    status: 'Processing',
    branch_name: 'Jeddah Al-Balad Branch',
    created_at: '2026-07-25',
    notes: 'Sponsor transfer contract pending approval on Qiwa portal.',
    steps: [
      { title: 'Transfer Request Submitted', completed: true, current: false, date: '2026-07-25' },
      { title: 'Qiwa Contract Offer Verification', completed: true, current: false, date: '2026-07-26' },
      { title: 'Awaiting Current Kafeel Approval', completed: false, current: true },
      { title: 'Jawazat Transfer Complete', completed: false, current: false },
    ],
  },
};

export default function StatusTracker() {
  const [searchCode, setSearchCode] = useState('');
  const [activeResult, setActiveResult] = useState<TrackedResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchCode).trim();
    if (!query) {
      setErrorMsg('Please enter a valid 6-digit tracking code or phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      const match = mockDatabase[query];
      if (match) {
        setActiveResult(match);
      } else {
        setActiveResult({
          tracking_code: query.length === 6 ? query : '100099',
          client_name: 'Expat Customer',
          client_phone: query.includes('+') ? query : '+966 5X XXX XXXX',
          service_category: 'Passport Malumat',
          status: 'Processing',
          branch_name: 'Riyadh Batha Head Office',
          created_at: new Date().toISOString().split('T')[0],
          notes: 'Document received and registered on Absher / Jawazat system.',
          steps: [
            { title: 'Inquiry Submitted', completed: true, current: false, date: 'Recent' },
            { title: 'Absher Verification & Processing', completed: false, current: true },
            { title: 'Final Stamping & Approval', completed: false, current: false },
            { title: 'Document Ready for Pickup', completed: false, current: false },
          ],
        });
      }
    }, 400);
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Completed
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-4 h-4 text-[#D4AF37] animate-spin" />
            Processing
          </span>
        );
      case 'Action Required':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-300">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Action Required
          </span>
        );
      case 'New':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <Clock className="w-4 h-4 text-blue-600" />
            New Inquiry
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <section id="tracker" className="py-16 bg-slate-100 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#064e3b] text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-[#0F6C44]" />
            <span>Public Document & Passport Tracker</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Application Status Real-Time
          </h2>
          <p className="text-sm text-slate-600">
            আপনার পাসপোর্টের মালুমাত, ভিসা, টিকিট বা ফাইল স্ট্যাটাস চেক করতে নিচে ৬ সংখ্যার ট্র্যাকিং কোড দিন।
          </p>
        </div>

        {/* Search Box Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter 6-Digit Tracking Code (e.g., 100001)"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F6C44] focus:border-transparent text-slate-900 text-base font-bold placeholder:text-slate-400 placeholder:font-normal shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl bg-[#0F6C44] hover:bg-[#0A4B2F] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Status</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sample Code Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-slate-700">Quick Test Samples:</span>
            {['100001', '100002', '100003', '100004', '100005'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchCode(code);
                  handleSearch(code);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-[#064e3b] text-slate-700 font-mono font-bold transition-colors border border-slate-200"
              >
                #{code}
              </button>
            ))}
          </div>

          {errorMsg && <p className="mt-3 text-xs font-bold text-red-600">{errorMsg}</p>}
        </div>

        {/* Search Result Drawer Card */}
        {searched && activeResult && (
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden animate-in fade-in duration-300">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-[#064e3b] to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-800">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-extrabold text-[#E5C158]">
                    #{activeResult.tracking_code}
                  </span>
                  {getStatusBadge(activeResult.status)}
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Service Category: <span className="text-emerald-300">{activeResult.service_category}</span>
                </h3>
              </div>

              <button
                onClick={() => {
                  setSearched(false);
                  setActiveResult(null);
                }}
                className="text-xs text-slate-300 hover:text-white underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Search Another Code</span>
              </button>
            </div>

            {/* Result Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#0F6C44]" />
                  <div>
                    <span className="text-slate-400 block">Client Name</span>
                    <strong className="text-slate-800 text-sm">{activeResult.client_name}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0F6C44]" />
                  <div>
                    <span className="text-slate-400 block">Assigned Branch</span>
                    <strong className="text-slate-800 text-sm">{activeResult.branch_name}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#0F6C44]" />
                  <div>
                    <span className="text-slate-400 block">Date Registered</span>
                    <strong className="text-slate-800 text-sm">{activeResult.created_at}</strong>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Processing Stage Timeline
                </h4>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                  {activeResult.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 z-10 ${
                          step.completed
                            ? 'bg-[#0F6C44] text-white ring-4 ring-emerald-100'
                            : step.current
                            ? 'bg-[#D4AF37] text-slate-950 ring-4 ring-amber-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="pt-0.5">
                        <p
                          className={`text-sm font-bold ${
                            step.completed
                              ? 'text-[#064e3b]'
                              : step.current
                              ? 'text-amber-900 font-extrabold'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </p>
                        {step.date && <span className="text-[11px] text-slate-400 font-medium">{step.date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              {activeResult.notes && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <strong className="block font-extrabold text-amber-900 mb-1">Agent Processing Remarks:</strong>
                  <p className="leading-relaxed font-medium">{activeResult.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
