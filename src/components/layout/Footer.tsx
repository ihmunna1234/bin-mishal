import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Phone, Mail, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F6C44] to-[#064e3b] flex items-center justify-center text-[#D4AF37] border border-emerald-600">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Bin Misal <span className="text-[#D4AF37]">Travels</span>
                </span>
                <p className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">
                  Saudi Arabia Corporate Services
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Leading licensed travel agency and expatriate corporate services provider in the Kingdom of Saudi Arabia. Specializing in Umrah visas, flight ticketing, Passport Malumat, MISA investor licensing, and Qiwa labor transfers.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-300 bg-[#064e3b]/80 px-3 py-2 rounded-xl border border-emerald-800/80 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Licensed Travel & Expat Desk • Ministry Registered</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2">
              Our Key Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/umrah-tourism" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> Umrah Packages & Visa Issuance
                </Link>
              </li>
              <li>
                <Link href="/services/flight-ticketing" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> International Flight Ticketing
                </Link>
              </li>
              <li>
                <Link href="/services/passport-malumat" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> Passport Information (Malumat) Update
                </Link>
              </li>
              <li>
                <Link href="/services/ziyarah-visa" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> Family & Commercial Ziyarah Visas
                </Link>
              </li>
              <li>
                <Link href="/services/business-misa-license" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> MISA Foreign Investor Licensing
                </Link>
              </li>
              <li>
                <Link href="/services/visa-amel-services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-500">•</span> Qiwa / Amel Labor Transfer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* KSA Branch Network */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2">
              KSA Branch Network
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Riyadh Batha Head Office:</strong>
                  <p className="text-slate-400">Batha Commercial Center, Riyadh</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Dammam Regional Branch:</strong>
                  <p className="text-slate-400">King Fahd Road, Dammam</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Madinah Central Branch:</strong>
                  <p className="text-slate-400">Near Prophet&apos;s Mosque, Madinah</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Direct Support & Hotline */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2">
              24/7 Expat Helpline
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="tel:+966501112233"
                className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition-colors text-white"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="block text-[10px] text-slate-400">Saudi Arabia Hotline</span>
                  <span className="font-extrabold text-[#E5C158]">+966 50 111 2233</span>
                </div>
              </a>

              <a
                href="https://wa.me/966501112233"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-2xl bg-[#064e3b]/80 border border-emerald-800 hover:border-emerald-500 transition-colors text-white"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="block text-[10px] text-emerald-300">WhatsApp Instant Support</span>
                  <span className="font-bold text-emerald-100">+966 50 111 2233</span>
                </div>
              </a>

              <div className="pt-1">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E5C158] hover:text-[#D4AF37] transition-colors font-extrabold"
                >
                  <span>Staff Internal ERP Login</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bin Misal Travels Ltd. Saudi Arabia. All Rights Reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Saudi Ministry Verification</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
