import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-md text-center space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Access Denied</h1>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          You do not have the required role permissions to access this internal ERP section.
        </p>

        <div className="pt-4 flex justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md"
          >
            Login as Super Admin
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300"
          >
            Go to Public Home
          </Link>
        </div>
      </div>
    </div>
  );
}
