'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  KanbanSquare,
  Building2,
  Users,
  BookOpen,
  LogOut,
  Plane,
  Menu,
  X,
  Bell,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Inquiries Board', icon: KanbanSquare },
  { href: '/admin/branches', label: 'Branch Management', icon: Building2 },
  { href: '/admin/staff', label: 'Staff & Access', icon: Users },
  { href: '/admin/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSignOut = () => {
    // Clear cookies & session
    document.cookie = 'bin_misal_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'bin_misal_demo_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] flex items-center justify-center text-white border border-blue-500/40 shadow-md">
            <Plane className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white">
              Bin Misal <span className="text-[#38bdf8]">ERP</span>
            </h1>
            <p className="text-[10px] text-sky-400 font-medium tracking-wider uppercase">
              Saudi Enterprise Portal
            </p>
          </div>
        </div>

        {/* User Profile Pill */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1e40af] text-white flex items-center justify-center font-extrabold text-xs border border-blue-600">
              BM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-white truncate">Staff Account</p>
              <p className="text-[10px] text-slate-400 truncate">Authenticated Staff</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#1e3a8a] text-sky-200 border border-blue-800">
              ROLE: AUTHENTICATED
            </span>
            <span className="text-[10px] text-sky-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              KSA Active
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md border border-blue-500'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <ExternalLink className="w-4 h-4 text-[#38bdf8]" />
            <span>Public Website</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-xs font-bold text-red-300 transition-colors border border-red-900/50 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top ERP Header */}
        <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Title */}
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wide">
                Bin Misal Enterprise ERP Portal
              </h2>
              <p className="text-[10px] text-slate-400">
                Saudi Arabia Operations & Document Processing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            </button>
          </div>
        </header>

        {/* Main Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="font-bold text-white text-sm">Navigation Menu</span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-[#1e3a8a] hover:text-[#38bdf8]"
                >
                  <Icon className="w-5 h-5 text-[#38bdf8]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
