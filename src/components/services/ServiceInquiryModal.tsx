'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Building2,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  Copy,
  Clock,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  serviceCategory?: string;
  preselectedBranch?: string;
}

const branches = [
  { city: 'Riyadh', name: 'Riyadh Batha Main Branch' },
  { city: 'Dammam', name: 'Dammam City Branch' },
  { city: 'Madinah', name: 'Madinah Central Branch' },
  { city: 'Jeddah', name: 'Jeddah Al-Balad Branch' },
];

export default function ServiceInquiryModal({
  isOpen,
  onClose,
  serviceTitle = 'Umrah & Expat Travel Service',
  serviceCategory = 'Umrah',
  preselectedBranch = 'Riyadh Batha Main Branch',
}: ServiceInquiryModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(preselectedBranch);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Result state after successful DB insertion
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [assignedBranch, setAssignedBranch] = useState<any>(null);
  const [assignedAgent, setAssignedAgent] = useState<any>(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedBranch) {
      setSelectedBranch(preselectedBranch);
    }
  }, [preselectedBranch]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Full Name and Mobile/WhatsApp number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries/public-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: fullName,
          client_phone: phone,
          service_category: serviceCategory,
          service_title: serviceTitle,
          branch_city: selectedBranch,
          notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTrackingCode(data.tracking_code);
        setAssignedBranch(data.assigned_branch);
        setAssignedAgent(data.assigned_agent);
        setWhatsappUrl(data.whatsapp_url);
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Modal submission error:', err);
      setErrorMsg('An unexpected error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (trackingCode) {
      navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetModal = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setNotes('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden text-slate-900">
        {/* Modal Close Button */}
        <button
          onClick={resetModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          /* State 1: Interactive Inquiry & Branch Assignment Form */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header Banner */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#2563eb] text-xs font-extrabold border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>Quick Service Inquiry & Branch Assignment</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {serviceTitle}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                আপনার তথ্য জমা দিলে ডাটাবেজে ইন্সট্যান্ট ট্র্যাকিং কোড তৈরি হবে এবং নিকটস্থ ব্রাঞ্চের কর্মচারী ফাইলটি প্রসেস করবে।
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Customer Full Name */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1.5">
                  Full Name (আপনার নাম) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Injamul Haque / Mohammed Ali"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>
              </div>

              {/* Mobile / WhatsApp Number */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1.5">
                  Mobile / WhatsApp Number (মোবাইল/হোয়াটসঅ্যাপ) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>
              </div>

              {/* Select Nearest Branch Dropdown */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1.5">
                  Select Preferred Branch (নিকটস্থ ব্রাঞ্চ) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none"
                  >
                    {branches.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes or Dates */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1.5">
                  Travel Dates or Special Request (ঐচ্ছিক নোট)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Travel starting next Friday, 5 persons family Umrah package..."
                  rows={2}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Registering Lead in Supabase & Assigning Branch...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Submit & Assign Branch Employee</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* State 2: Success Screen & Direct WhatsApp Link with Pre-filled Code */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Registered!</h3>
              <p className="text-xs text-slate-600 font-medium">
                আপনার সার্ভিস রিকোয়েস্ট সুপাবেজ ডাটাবেজে সংরক্ষিত হয়েছে।
              </p>
            </div>

            {/* Tracking Code Highlight Box */}
            <div className="p-4 rounded-3xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider block">
                Your Official Tracking Code
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-extrabold text-[#2563eb] tracking-widest">
                  #{trackingCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 rounded-full bg-white hover:bg-blue-100 text-xs font-bold text-[#2563eb] border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <span className="text-emerald-600">Copied!</span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Assigned Branch & Staff Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">Assigned Branch:</span>
                <strong className="text-slate-900 font-extrabold">{assignedBranch?.name}</strong>
              </div>

              {assignedAgent && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500 font-bold">Assigned Staff Agent:</span>
                  <strong className="text-[#2563eb] font-extrabold">{assignedAgent.name}</strong>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Call-To-Action Button */}
            <div className="pt-2 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Connect with {assignedBranch?.name || 'Branch'} Agent on WhatsApp</span>
              </a>

              <button
                onClick={resetModal}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold underline cursor-pointer"
              >
                Close Window & Track Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
