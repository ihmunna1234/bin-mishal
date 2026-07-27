import Hero from '@/components/home/Hero';
import StatusTracker from '@/components/home/StatusTracker';
import ServicesGrid from '@/components/home/ServicesGrid';
import BranchFinder from '@/components/home/BranchFinder';
import { ShieldCheck, HelpCircle, PhoneCall, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Public Application Status Tracker */}
      <StatusTracker />

      {/* 3. Core Expat & Travel Services Grid */}
      <ServicesGrid />

      {/* 4. Interactive Branch Finder */}
      <BranchFinder />

      {/* 5. Expat Trust & FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Saudi Expat Help Desk</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-sm text-slate-600">
              সৌদি আরবে অবস্থানরত প্রবাসীদের প্রয়োজনীয় প্রশ্নের উত্তর ও সমাধান।
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                পাসপোর্ট তথ্য (মালুমাত) আপডেট করতে কত সময় লাগে?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                বিন মিসাল ট্রাভেলস এর রিয়াদ, দাম্মাম বা মদিনা ব্রাঞ্চে ডকুমেন্ট জমা দিলে ২৪ ঘণ্টার মধ্যে জাওয়াজাত ও আবশের (Absher) সিস্টেমে আপনার নতুন পাসপোর্ট তথ্য আপডেট করে দেওয়া হয়।
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                ২০২৬ সালে উমরাহ ভিসার সাথে রওজা শরিফ পারমিট কীভাবে পাব?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                আমাদের প্রতিটি উমরাহ প্যাকেজে ভিসার পাশাপাশি নুশুক (Nusuk) অ্যাপের মাধ্যমে মদিনা রওজা শরিফের জিয়ারত পারমিট ও মক্কা-মদিনার হোটেল বুকিং কনফার্ম করা হয়।
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                MISA ইনভেস্টর লাইসেন্স খুললে কী কী সুবিধা পাওয়া যায়?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                MISA (Ministry of Investment) লাইসেন্সের মাধ্যমে বিদেশি নাগরিকরা ১০০% নিজস্ব মালিকানায় সৌদি আরবে বৈধ কোম্পানি গঠন, কমার্শিয়াল রেজিস্ট্রেশন (CR) ও ব্যাংক অ্যাকাউন্ট পরিচালনা করতে পারেন।
              </p>
            </div>
          </div>

          {/* Bottom CTA Callout */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-emerald-800">
            <div>
              <h3 className="text-xl font-extrabold text-white">Need Urgent Visa or Passport Assistance?</h3>
              <p className="text-xs text-emerald-200 mt-1">
                Our team is available 24/7 across Riyadh, Dammam, Madinah, and Jeddah.
              </p>
            </div>

            <a
              href="https://wa.me/966501112233"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact WhatsApp Hotline</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
