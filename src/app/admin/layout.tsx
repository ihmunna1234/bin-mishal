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
    document.cookie = 'bin_misal_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'bin_misal_demo_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex">
      {/* Sidebar Desktop (Light Theme) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 shadow-sm">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] flex items-center justify-center text-white border border-blue-400/40 shadow-md">
            <Plane className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-slate-900">
              Bin Misal <span className="text-[#2563eb]">ERP</span>
            </h1>
            <p className="text-[10px] text-[#2563eb] font-bold tracking-wider uppercase">
              Saudi Enterprise Portal
            </p>
          </div>
        </div>

        {/* User Profile Pill */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
              BM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-slate-900 truncate">Staff Account</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">Authenticated Staff</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#2563eb] border border-blue-200">
              AUTHENTICATED
            </span>
            <span className="text-[10px] text-[#2563eb] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
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
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors border border-slate-200"
          >
            <ExternalLink className="w-4 h-4 text-[#2563eb]" />
            <span>Public Website</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 transition-colors border border-red-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top ERP Header (Light Theme) */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Title */}
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-wide">
                Bin Misal Enterprise ERP Portal
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Saudi Arabia Operations & Document Processing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-2xl bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 relative cursor-pointer">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            </button>
          </div>
        </header>

        {/* Main Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex flex-col">
          <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
            <span className="font-extrabold text-slate-900 text-sm">Navigation Menu</span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-2 flex-1 bg-white">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-[#2563eb]"
                >
                  <Icon className="w-5 h-5 text-[#2563eb]" />
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
