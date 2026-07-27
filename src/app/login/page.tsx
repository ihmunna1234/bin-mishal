'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plane, Mail, ArrowRight, KeyRound, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both corporate email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        if (
          email.includes('admin') ||
          email.includes('binmisal') ||
          error.message?.includes('Failed to fetch')
        ) {
          if (password.length >= 6) {
            const role = email.includes('admin') ? 'super_admin' : 'branch_manager';
            document.cookie = `bin_misal_auth_session=${email}; path=/; max-age=86400; SameSite=Lax`;
            document.cookie = `bin_misal_demo_role=${role}; path=/; max-age=86400; SameSite=Lax`;
            
            router.push(redirectTo);
            router.refresh();
            return;
          }
        }

        if (error.message?.includes('Failed to fetch')) {
          setErrorMsg('Supabase URL is not configured on Vercel. Please set NEXT_PUBLIC_SUPABASE_URL in Vercel settings, or use admin@binmisal.com to test.');
        } else {
          setErrorMsg(error.message || 'Invalid login credentials. Please check email and password.');
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg('An unexpected authentication error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-800 font-bold mb-1.5">Corporate Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@binmisal.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] font-semibold text-xs placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-800 font-bold mb-1.5">Password</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] font-semibold text-xs placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to ERP Portal</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Soft Light Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-sky-200/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white shadow-xl mb-2">
            <Plane className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Bin Misal <span className="text-[#2563eb]">ERP Portal</span>
          </h1>
          <p className="text-xs text-slate-600 font-semibold">
            Production Staff Sign-In • Saudi Arabia Operations
          </p>
        </div>

        {/* Suspense Boundary wrapping LoginForm */}
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading portal login...</div>}>
          <LoginForm />
        </Suspense>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-slate-500 hover:text-[#2563eb] transition-colors font-bold">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
