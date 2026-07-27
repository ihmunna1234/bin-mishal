'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  PhoneCall,
  MessageSquare,
  Building2,
  ChevronDown,
  Menu,
  X,
  Compass,
  FileCheck2,
  Plane,
} from 'lucide-react';

export type Language = 'EN' | 'BN' | 'AR';

const translations = {
  EN: {
    topBarNotice: 'Official Saudi Arabia Expat & Travel Services Desk',
    callUs: 'Hotline:',
    trackDoc: 'Track Status',
    services: 'Services',
    branches: 'Branches',
    about: 'About Us',
    contactUs: 'Book Trip Now',
  },
  BN: {
    topBarNotice: 'সৌদি আরবে প্রবাসী ভাইদের বিশ্বস্ত ট্রাভেল ও পাসপোর্ট সার্ভিস',
    callUs: 'হটলাইন:',
    trackDoc: 'স্ট্যাটাস চেক',
    services: 'সেবাসমূহ',
    branches: 'ব্রাঞ্চ সমূহ',
    about: 'আমাদের সম্পর্কে',
    contactUs: 'ট্রিপ বুকিং করুন',
  },
  AR: {
    topBarNotice: 'خدمات السفر والوافدين المعتمدة في المملكة العربية السعودية',
    callUs: 'الخط الساخن:',
    trackDoc: 'متابعة الطلب',
    services: 'الخدمات',
    branches: 'الفروع',
    about: 'من نحن',
    contactUs: 'احجز رحلتك الآن',
  },
};

export default function Header() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-100">
      {/* Top Banner Bar with Azure Deep Theme */}
      <div className="bg-[#1e3a8a] text-blue-100 text-xs py-2 px-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
            <span className="font-medium tracking-wide text-blue-100">{t.topBarNotice}</span>
          </div>

          <div className="flex items-center gap-6 text-blue-200">
            <a
              href="tel:+966501112233"
              className="flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="font-semibold">{t.callUs} +966 50 111 2233</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1e40af] hover:bg-[#2563eb] text-white transition-all border border-blue-600/60 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="font-extrabold text-xs">{currentLang}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-slate-900 border border-blue-600 rounded-xl shadow-xl z-50 py-1 text-xs">
                  <button
                    onClick={() => {
                      setCurrentLang('EN');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#2563eb] flex items-center justify-between cursor-pointer ${
                      currentLang === 'EN' ? 'text-[#38bdf8] font-bold' : 'text-slate-200'
                    }`}
                  >
                    <span>English</span>
                    <span>EN</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLang('BN');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#2563eb] flex items-center justify-between cursor-pointer ${
                      currentLang === 'BN' ? 'text-[#38bdf8] font-bold' : 'text-slate-200'
                    }`}
                  >
                    <span>বাংলা</span>
                    <span>BN</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLang('AR');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#2563eb] flex items-center justify-between cursor-pointer ${
                      currentLang === 'AR' ? 'text-[#38bdf8] font-bold' : 'text-slate-200'
                    }`}
                  >
                    <span>العربية</span>
                    <span>AR</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar with Pill Button CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-blue-400/30">
            <Plane className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#0f172a] group-hover:text-[#2563eb] transition-colors">
                Bin Misal
              </span>
              <span className="font-bold text-xl text-[#2563eb]">Travels</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
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
          <a
            href="https://wa.me/966501112233"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>{t.contactUs}</span>
          </a>
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

      {/* Mobile Drawer Navigation */}
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
            className="block px-3 py-2 rounded-md font-bold text-[#1e40af] hover:bg-blue-50"
          >
            {t.trackDoc}
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://wa.me/966501112233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.contactUs}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
