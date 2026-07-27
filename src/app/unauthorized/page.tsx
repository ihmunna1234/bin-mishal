import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-950/80 text-red-400 border border-red-800 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Access Denied</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
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
            className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Go to Public Home
          </Link>
        </div>
      </div>
    </div>
  );
}
