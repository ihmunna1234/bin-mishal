'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Phone,
  MessageSquare,
  Globe,
  Menu,
  X,
  FileCheck2,
  Building2,
  Plane,
} from 'lucide-react';
import ServiceInquiryModal from '@/components/services/ServiceInquiryModal';

export default function Header() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const t = {
    topBarMsg: lang === 'bn' ? 'সৌদি আরব প্রবাসী ও ট্রাভেল সেবাসমূহ' : 'Official Saudi Arabia Expat & Travel Services Desk',
    services: lang === 'bn' ? 'সেবাসমূহ' : 'Services',
    branches: lang === 'bn' ? 'ব্রাঞ্চসমূহ' : 'Branches',
    trackDoc: lang === 'bn' ? 'ট্র্যাক স্ট্যাটাস' : 'Track Status',
    contactUs: lang === 'bn' ? 'উমরাহ ও ট্রাভেল বুকিং' : 'Book Trip Now',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        {/* Deep Azure Top Informational Ribbon */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white text-[11px] font-semibold py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
            <span className="truncate">{t.topBarMsg}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:+966501112233"
              className="hover:text-sky-200 transition-colors hidden sm:flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-sky-300" />
              <span>Hotline: +966 50 111 2233</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 text-[10px] font-bold cursor-pointer"
            >
              <Globe className="w-3 h-3 text-sky-200" />
              <span>{lang === 'en' ? 'EN' : 'বাংলা'}</span>
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] flex items-center justify-center text-white border border-blue-500/40 shadow-md group-hover:scale-105 transition-transform">
              <Plane className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-[#2563eb] transition-colors">
                Bin Misal <span className="text-[#2563eb]">Travels</span>
              </span>
              <p className="text-[10px] text-slate-500 font-extrabold tracking-wider uppercase block">
                Saudi Arabia & International Aviation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link
              href="/#services"
              className="hover:text-[#2563eb] transition-colors py-1 flex items-center gap-1"
            >
              {t.services}
            </Link>
            <Link
              href="/#branches"
              className="hover:text-[#2563eb] transition-colors py-1 flex items-center gap-1"
            >
              <Building2 className="w-4 h-4 text-[#2563eb]" />
              {t.branches}
            </Link>
            <Link
              href="/#tracker"
              className="hover:text-[#2563eb] transition-colors py-1 flex items-center gap-1 text-[#1e40af] font-bold"
            >
              <FileCheck2 className="w-4 h-4 text-[#2563eb]" />
              {t.trackDoc}
            </Link>
          </nav>

          {/* Primary Pill Button CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{t.contactUs}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#2563eb] hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-[#2563eb] hover:text-white"
            >
              {t.services}
            </Link>
            <Link
              href="/#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-[#2563eb] hover:text-white"
            >
              {t.branches}
            </Link>
            <Link
              href="/#tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-[#2563eb] hover:text-white"
            >
              {t.trackDoc}
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#2563eb] text-white font-extrabold text-xs shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{t.contactUs}</span>
            </button>
          </div>
        )}
      </header>

      {/* Interactive Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle="Umrah & Expat Travel Inquiry"
        serviceCategory="Umrah"
      />
    </>
  );
}
