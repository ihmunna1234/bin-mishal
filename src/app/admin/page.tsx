'use client';

import React from 'react';
import Link from 'next/link';
import {
  KanbanSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Users,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  FileText,
  Search,
  ChevronRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    {
      label: 'Total Inquiries',
      value: '1,248',
      change: '+14% this month',
      icon: KanbanSquare,
      color: 'text-blue-400',
      bg: 'bg-blue-950/60 border-blue-800/60',
    },
    {
      label: 'Active Processing',
      value: '142',
      change: 'In Progress',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-950/60 border-amber-800/60',
    },
    {
      label: 'Action Required',
      value: '28',
      change: 'Needs Document Copy',
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-950/60 border-red-800/60',
    },
    {
      label: 'Completed Files',
      value: '1,078',
      change: '94% Success Rate',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/60 border-emerald-800/60',
    },
  ];

  const recentInquiries = [
    {
      code: '100001',
      client: 'Mohammed Al-Otaibi',
      phone: '+966 55 123 4567',
      category: 'Umrah',
      branch: 'Riyadh Batha Head Office',
      status: 'New',
      date: '10 mins ago',
    },
    {
      code: '100002',
      client: 'Tariq Rahman',
      phone: '+966 56 987 6543',
      category: 'MISA Investor License',
      branch: 'Riyadh Batha Head Office',
      status: 'Processing',
      date: '1 hour ago',
    },
    {
      code: '100003',
      client: 'Faisal Khan',
      phone: '+966 54 112 2334',
      category: 'Flight Ticketing',
      branch: 'Dammam Regional Branch',
      status: 'Completed',
      date: '3 hours ago',
    },
    {
      code: '100004',
      client: 'Abdullah Al-Ghamdi',
      phone: '+966 50 334 4556',
      category: 'Ziyarah Visa',
      branch: 'Madinah Central Branch',
      status: 'Action Required',
      date: 'Yesterday',
    },
    {
      code: '100005',
      client: 'Shahid Islam',
      phone: '+966 55 667 7889',
      category: 'Qiwa/Amel Issues',
      branch: 'Jeddah Al-Balad Branch',
      status: 'Processing',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Executive ERP Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of Saudi inquiries, branch workloads, and passport file updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105"
          >
            <KanbanSquare className="w-4 h-4" />
            <span>Open Inquiries Board</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${stat.bg} shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-between`}
            >
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="text-3xl font-extrabold text-white mt-1">{stat.value}</p>
                <span className="text-[11px] font-semibold text-emerald-400 block mt-1">
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-xl bg-slate-900/80 ${stat.color} border border-slate-700/60`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Performance Summary & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Workload */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Branch Inquiry Distribution
            </h3>
            <Link href="/admin/branches" className="text-xs text-amber-400 hover:underline">
              Manage Branches
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Riyadh Batha Head Office', count: 540, pct: 45, color: 'bg-emerald-500' },
              { name: 'Dammam Regional Branch', count: 320, pct: 26, color: 'bg-blue-500' },
              { name: 'Madinah Central Branch', count: 240, pct: 19, color: 'bg-amber-500' },
              { name: 'Jeddah Al-Balad Branch', count: 148, pct: 10, color: 'bg-purple-500' },
            ].map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{b.name}</span>
                  <span className="text-slate-400">{b.count} files ({b.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className={`h-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services Breakdown */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Category Volume
          </h3>

          <div className="space-y-2.5 text-xs">
            {[
              { label: 'Passport Malumat', count: 412, badge: 'Popular' },
              { label: 'Umrah & Nusuk', count: 328, badge: 'Seasonal' },
              { label: 'Flight Ticketing', count: 210, badge: 'High Volume' },
              { label: 'Ziyarah Visas', count: 145, badge: 'Family' },
              { label: 'MISA & Qiwa Issues', count: 153, badge: 'Corporate' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800"
              >
                <span className="font-semibold text-slate-200">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">{s.count}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {s.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <KanbanSquare className="w-4 h-4 text-amber-400" />
              Latest Inquiries Logged
            </h3>
            <p className="text-[11px] text-slate-400">Showing last 5 inquiries across all Saudi branches</p>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>View Full Board</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tracking #</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Logged</th>
                <th className="py-3 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.code} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#{inquiry.code}</td>
                  <td className="py-3 px-4 font-semibold text-white">
                    <div>{inquiry.client}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{inquiry.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-200">{inquiry.category}</td>
                  <td className="py-3 px-4 text-slate-400">{inquiry.branch}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inquiry.status === 'Completed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inquiry.status === 'Processing'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : inquiry.status === 'Action Required'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{inquiry.date}</td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                        inquiry.client
                      )},%20regarding%20your%20inquiry%20%23${inquiry.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold text-[11px] border border-emerald-700 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-300" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
