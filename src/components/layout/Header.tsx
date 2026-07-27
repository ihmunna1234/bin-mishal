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
    contactUs: 'WhatsApp Support',
  },
  BN: {
    topBarNotice: 'সৌদি আরবে প্রবাসী ভাইদের বিশ্বস্ত ট্রাভেল ও পাসপোর্ট সার্ভিস',
    callUs: 'হটলাইন:',
    trackDoc: 'স্ট্যাটাস চেক',
    services: 'সেবাসমূহ',
    branches: 'ব্রাঞ্চ সমূহ',
    about: 'আমাদের সম্পর্কে',
    contactUs: 'হোয়াটসঅ্যাপ সাপোর্ট',
  },
  AR: {
    topBarNotice: 'خدمات السفر والوافدين المعتمدة في المملكة العربية السعودية',
    callUs: 'الخط الساخن:',
    trackDoc: 'متابعة الطلب',
    services: 'الخدمات',
    branches: 'الفروع',
    about: 'من نحن',
    contactUs: 'دعم الواتساب',
  },
};

export default function Header() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-emerald-100">
      {/* Top Banner Bar with Saudi Emerald Green #0F6C44 & Warm Gold Accent */}
      <div className="bg-[#064e3b] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="font-medium tracking-wide text-emerald-100">{t.topBarNotice}</span>
          </div>

          <div className="flex items-center gap-6 text-emerald-200">
            <a
              href="tel:+966501112233"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold">{t.callUs} +966 50 111 2233</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0A4B2F] hover:bg-[#0F6C44] text-[#E5C158] transition-all border border-emerald-700/60"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-extrabold text-xs">{currentLang}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-slate-900 border border-emerald-700 rounded-lg shadow-xl z-50 py-1 text-xs">
                  <button
                    onClick={() => {
                      setCurrentLang('EN');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#0F6C44] flex items-center justify-between ${
                      currentLang === 'EN' ? 'text-[#D4AF37] font-bold' : 'text-slate-200'
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
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#0F6C44] flex items-center justify-between ${
                      currentLang === 'BN' ? 'text-[#D4AF37] font-bold' : 'text-slate-200'
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
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#0F6C44] flex items-center justify-between ${
                      currentLang === 'AR' ? 'text-[#D4AF37] font-bold' : 'text-slate-200'
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F6C44] to-[#064e3b] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform border border-emerald-600">
            <Compass className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#064e3b] group-hover:text-[#0F6C44] transition-colors">
                Bin Misal
              </span>
              <span className="font-bold text-xl text-[#D4AF37]">Travels</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
              KSA Expat & Corporate Services
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link
            href="/#services"
            className="hover:text-[#0F6C44] transition-colors py-1 flex items-center gap-1"
          >
            {t.services}
          </Link>
          <Link
            href="/#branches"
            className="hover:text-[#0F6C44] transition-colors py-1 flex items-center gap-1"
          >
            <Building2 className="w-4 h-4 text-[#0F6C44]" />
            {t.branches}
          </Link>
          <Link
            href="/#tracker"
            className="hover:text-[#0F6C44] transition-colors py-1 flex items-center gap-1 text-[#064e3b] font-bold"
          >
            <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />
            {t.trackDoc}
          </Link>
        </nav>

        {/* Primary Customer CTA Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/966501112233"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F6C44] hover:bg-[#0A4B2F] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.contactUs}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#064e3b] hover:bg-slate-100"
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
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-emerald-50 hover:text-[#0F6C44]"
          >
            {t.services}
          </Link>
          <Link
            href="/#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-emerald-50 hover:text-[#0F6C44]"
          >
            {t.branches}
          </Link>
          <Link
            href="/#tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-[#064e3b] hover:bg-emerald-50"
          >
            {t.trackDoc}
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://wa.me/966501112233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0F6C44] text-white font-bold text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.contactUs}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
