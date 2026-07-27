'use client';

import React, { useState } from 'react';
import {
  KanbanSquare,
  Table as TableIcon,
  Search,
  Filter,
  Plus,
  MessageSquare,
  UserCheck,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';
import { InquiryStatus, ServiceCategory } from '@/types';

interface KanbanInquiry {
  id: string;
  tracking_code: string;
  client_name: string;
  client_phone: string;
  service_category: ServiceCategory;
  status: InquiryStatus;
  branch_name: string;
  assigned_agent: string;
  notes: string;
  created_at: string;
}

const initialInquiries: KanbanInquiry[] = [
  {
    id: 'inq-1',
    tracking_code: '100001',
    client_name: 'Mohammed Al-Otaibi',
    client_phone: '+966 55 123 4567',
    service_category: 'Umrah',
    status: 'New',
    branch_name: 'Riyadh Batha Head Office',
    assigned_agent: 'Unassigned',
    notes: 'Family Umrah package inquiry for 5 adults starting next Friday.',
    created_at: '2026-07-26',
  },
  {
    id: 'inq-2',
    tracking_code: '100002',
    client_name: 'Tariq Rahman',
    client_phone: '+966 56 987 6543',
    service_category: 'MISA Investor License',
    status: 'Processing',
    branch_name: 'Riyadh Batha Head Office',
    assigned_agent: 'Sami Al-Mansoor',
    notes: '100% foreign ownership investment company application under MISA.',
    created_at: '2026-07-24',
  },
  {
    id: 'inq-3',
    tracking_code: '100003',
    client_name: 'Faisal Khan',
    client_phone: '+966 54 112 2334',
    service_category: 'Flight Ticketing',
    status: 'Completed',
    branch_name: 'Dammam Regional Branch',
    assigned_agent: 'Tariq Al-Zahrani',
    notes: 'Direct flights Dammam to Dhaka round trip issued.',
    created_at: '2026-07-20',
  },
  {
    id: 'inq-4',
    tracking_code: '100004',
    client_name: 'Abdullah Al-Ghamdi',
    client_phone: '+966 50 334 4556',
    service_category: 'Ziyarah Visa',
    status: 'Action Required',
    branch_name: 'Madinah Central Branch',
    assigned_agent: 'Faisal Al-Harbi',
    notes: 'Missing updated copy of sponsor Iqama. Please submit via WhatsApp.',
    created_at: '2026-07-22',
  },
  {
    id: 'inq-5',
    tracking_code: '100005',
    client_name: 'Shahid Islam',
    client_phone: '+966 55 667 7889',
    service_category: 'Qiwa/Amel Issues',
    status: 'Processing',
    branch_name: 'Jeddah Al-Balad Branch',
    assigned_agent: 'Sami Al-Gamdi',
    notes: 'Sponsor transfer contract pending approval on Qiwa portal.',
    created_at: '2026-07-25',
  },
  {
    id: 'inq-6',
    tracking_code: '100006',
    client_name: 'Kabir Hossain',
    client_phone: '+966 53 111 2222',
    service_category: 'Passport Malumat',
    status: 'New',
    branch_name: 'Riyadh Batha Head Office',
    assigned_agent: 'Unassigned',
    notes: 'Absher passport update request for renewed Bangladeshi passport.',
    created_at: '2026-07-27',
  },
];

const columns: { title: string; status: InquiryStatus; color: string; border: string }[] = [
  { title: 'New Leads', status: 'New', color: 'bg-blue-950/80 text-blue-300', border: 'border-blue-800' },
  { title: 'Processing', status: 'Processing', color: 'bg-amber-950/80 text-amber-300', border: 'border-amber-800' },
  { title: 'Action Needed', status: 'Action Required', color: 'bg-red-950/80 text-red-300', border: 'border-red-800' },
  { title: 'Completed', status: 'Completed', color: 'bg-emerald-950/80 text-emerald-300', border: 'border-emerald-800' },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<KanbanInquiry[]>(initialInquiries);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Move status handler
  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.tracking_code.includes(searchTerm) ||
      item.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client_phone.includes(searchTerm);

    const matchesBranch =
      selectedBranch === 'All' || item.branch_name.toLowerCase().includes(selectedBranch.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || item.service_category === selectedCategory;

    return matchesSearch && matchesBranch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <KanbanSquare className="w-6 h-6 text-amber-400" />
            Inquiries Operations Board
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, assign, and update Saudi document processing files across all physical branches.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'kanban' ? 'bg-emerald-800 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-emerald-800 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code, name, or phone..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Saudi Branches</option>
            <option value="Riyadh">Riyadh Batha Head Office</option>
            <option value="Dammam">Dammam Regional Branch</option>
            <option value="Madinah">Madinah Central Branch</option>
            <option value="Jeddah">Jeddah Al-Balad Branch</option>
          </select>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Service Categories</option>
            <option value="Umrah">Umrah</option>
            <option value="Flight Ticketing">Flight Ticketing</option>
            <option value="Passport Malumat">Passport Malumat</option>
            <option value="Ziyarah Visa">Ziyarah Visa</option>
            <option value="MISA Investor License">MISA Investor License</option>
            <option value="Qiwa/Amel Issues">Qiwa/Amel Issues</option>
          </select>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {columns.map((col) => {
            const colInquiries = filteredInquiries.filter((item) => item.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl"
              >
                {/* Column Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${col.color}`}>
                      {col.title}
                    </span>
                    <span className="text-xs font-bold text-slate-400">({colInquiries.length})</span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 min-h-[400px]">
                  {colInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800/90 hover:border-emerald-600/60 shadow-md space-y-3 transition-all group"
                    >
                      {/* Card Top Header */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-extrabold text-xs text-amber-400">
                          #{inquiry.tracking_code}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                          {inquiry.service_category}
                        </span>
                      </div>

                      {/* Client Info */}
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {inquiry.client_name}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{inquiry.client_phone}</p>
                      </div>

                      {/* Remarks / Notes */}
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        {inquiry.notes}
                      </p>

                      {/* Branch & Agent */}
                      <div className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <span>Branch:</span>
                          <span className="text-slate-200 font-semibold">{inquiry.branch_name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Agent:</span>
                          <span className="text-amber-400 font-medium">{inquiry.assigned_agent}</span>
                        </div>
                      </div>

                      {/* Status Change Selector & WhatsApp Trigger */}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value as InquiryStatus)}
                          className="bg-slate-950 text-[10px] font-bold text-slate-300 px-2 py-1 rounded border border-slate-800 focus:outline-none cursor-pointer"
                        >
                          <option value="New">Move to New</option>
                          <option value="Processing">Move to Processing</option>
                          <option value="Action Required">Move to Action Needed</option>
                          <option value="Completed">Move to Completed</option>
                        </select>

                        <a
                          href={`https://wa.me/${inquiry.client_phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                            inquiry.client_name
                          )},%20regarding%20your%20Bin%20Misal%20inquiry%20%23${inquiry.tracking_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-colors"
                          title="Launch WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                        </a>
                      </div>
                    </div>
                  ))}

                  {colInquiries.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                      No inquiries in this column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DENSE TABLE VIEW */
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Tracking Code</th>
                  <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Service Category</th>
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">Assigned Agent</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      #{inquiry.tracking_code}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{inquiry.client_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{inquiry.client_phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">{inquiry.service_category}</td>
                    <td className="py-3.5 px-4 text-slate-400">{inquiry.branch_name}</td>
                    <td className="py-3.5 px-4 text-amber-400">{inquiry.assigned_agent}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value as InquiryStatus)}
                        className="bg-slate-900 text-xs font-bold text-slate-200 px-2 py-1 rounded border border-slate-700 cursor-pointer"
                      >
                        <option value="New">New Leads</option>
                        <option value="Processing">Processing</option>
                        <option value="Action Required">Action Required</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${inquiry.client_phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(
                          inquiry.client_name
                        )},%20regarding%20your%20inquiry%20%23${inquiry.tracking_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
