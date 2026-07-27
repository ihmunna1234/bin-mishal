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
      color: 'text-[#2563eb]',
      bg: 'bg-blue-50/80 border-blue-200/80',
    },
    {
      label: 'Active Processing',
      value: '142',
      change: 'In Progress',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50/80 border-amber-200/80',
    },
    {
      label: 'Action Required',
      value: '28',
      change: 'Needs Document Copy',
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50/80 border-red-200/80',
    },
    {
      label: 'Completed Files',
      value: '1,078',
      change: '94% Success Rate',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/80 border-emerald-200/80',
    },
  ];

  const recentInquiries = [
    {
      code: 'BMT101',
      client: 'Kabir Hossain',
      phone: '+966 51 111 1111',
      category: 'Passport Malumat',
      branch: 'Riyadh Batha Main Branch',
      status: 'New',
      date: '10 mins ago',
    },
    {
      code: 'BMT102',
      client: 'Mohammed Ali',
      phone: '+966 52 222 2222',
      category: 'Umrah',
      branch: 'Dammam City Branch',
      status: 'Processing',
      date: '1 hour ago',
    },
    {
      code: 'BMT103',
      client: 'Sumon Ahmed',
      phone: '+966 53 333 3333',
      category: 'Flight Ticketing',
      branch: 'Madinah Central Branch',
      status: 'Completed',
      date: '3 hours ago',
    },
    {
      code: 'BMT104',
      client: 'Kamal Uddin',
      phone: '+966 54 444 4444',
      category: 'MISA Investor License',
      branch: 'Riyadh Batha Main Branch',
      status: 'Action Required',
      date: 'Yesterday',
    },
    {
      code: 'BMT105',
      client: 'Shahid Islam',
      phone: '+966 55 667 7889',
      category: 'Qiwa/Amel Issues',
      branch: 'Jeddah Al-Balad Branch',
      status: 'Processing',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-8 text-slate-900">
      {/* Page Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Executive ERP Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time tracking of Saudi inquiries, branch workloads, and passport file updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            <KanbanSquare className="w-4 h-4 text-white" />
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
              className={`p-5 rounded-3xl border ${stat.bg} shadow-sm transition-transform hover:scale-[1.02] flex items-center justify-between bg-white`}
            >
              <div>
                <p className="text-xs font-bold text-slate-500">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                <span className="text-[11px] font-bold text-[#2563eb] block mt-1">
                  {stat.change}
                </span>
              </div>
              <div className={`p-3.5 rounded-2xl bg-slate-50 ${stat.color} border border-slate-200`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Performance Summary & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Workload */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#2563eb]" />
              Branch Inquiry Distribution
            </h3>
            <Link href="/admin/branches" className="text-xs text-[#2563eb] hover:underline font-bold">
              Manage Branches
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Riyadh Batha Main Branch', count: 540, pct: 45, color: 'bg-[#2563eb]' },
              { name: 'Dammam City Branch', count: 320, pct: 26, color: 'bg-[#38bdf8]' },
              { name: 'Madinah Central Branch', count: 240, pct: 19, color: 'bg-indigo-500' },
              { name: 'Jeddah Al-Balad Branch', count: 148, pct: 10, color: 'bg-sky-600' },
            ].map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{b.name}</span>
                  <span className="text-slate-500">{b.count} files ({b.pct}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services Breakdown */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2563eb]" />
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
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <span className="font-bold text-slate-800">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#2563eb]">{s.count}</span>
                  <span className="text-[10px] bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-bold">
                    {s.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <KanbanSquare className="w-4 h-4 text-[#2563eb]" />
              Latest Inquiries Logged
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Showing last 5 inquiries across all Saudi branches</p>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs text-[#2563eb] hover:underline flex items-center gap-1 font-bold"
          >
            <span>View Full Board</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3.5 px-4">Tracking #</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Branch</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Logged</th>
                <th className="py-3.5 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-extrabold text-[#2563eb]">#{inquiry.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{inquiry.client}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{inquiry.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{inquiry.category}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{inquiry.branch}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        inquiry.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : inquiry.status === 'Processing'
                          ? 'bg-blue-50 text-[#2563eb] border border-blue-200'
                          : inquiry.status === 'Action Required'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{inquiry.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                        inquiry.client
                      )},%20regarding%20your%20inquiry%20%23${inquiry.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[11px] shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-white" />
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
