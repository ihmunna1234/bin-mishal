'use client';

import React, { useState, useEffect } from 'react';
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
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { InquiryStatus, ServiceCategory } from '@/types';

interface KanbanInquiry {
  id: string;
  tracking_code: string;
  client_name: string;
  client_phone: string;
  service_category: ServiceCategory;
  status: InquiryStatus;
  branch_id?: string | null;
  branch_name: string;
  assigned_agent_id?: string | null;
  assigned_agent: string;
  notes: string;
  created_at: string;
}

interface BranchOption {
  id: string;
  name: string;
}

interface AgentOption {
  id: string;
  name: string;
}

const fallbackInquiries: KanbanInquiry[] = [
  {
    id: 'inq-101',
    tracking_code: 'BMT101',
    client_name: 'Kabir Hossain',
    client_phone: '+966511111111',
    service_category: 'Passport Malumat',
    status: 'New',
    branch_name: 'Riyadh Batha Main Branch',
    assigned_agent: 'Rafiqul Islam',
    notes: 'Needs urgent passport data transfer to new passport.',
    created_at: '2026-07-27',
  },
  {
    id: 'inq-102',
    tracking_code: 'BMT102',
    client_name: 'Mohammed Ali',
    client_phone: '+966522222222',
    service_category: 'Umrah',
    status: 'Processing',
    branch_name: 'Dammam City Branch',
    assigned_agent: 'Tariqul Anam',
    notes: 'Inquired about 14-day Umrah package for family.',
    created_at: '2026-07-27',
  },
  {
    id: 'inq-103',
    tracking_code: 'BMT103',
    client_name: 'Sumon Ahmed',
    client_phone: '+966533333333',
    service_category: 'Flight Ticketing',
    status: 'Completed',
    branch_name: 'Madinah Central Branch',
    assigned_agent: 'Shakil Ahmed',
    notes: 'Booked Saudia Flight ticket to Dhaka.',
    created_at: '2026-07-27',
  },
  {
    id: 'inq-104',
    tracking_code: 'BMT104',
    client_name: 'Kamal Uddin',
    client_phone: '+966544444444',
    service_category: 'MISA Investor License',
    status: 'Action Required',
    branch_name: 'Riyadh Batha Main Branch',
    assigned_agent: 'Injamul Hoque',
    notes: 'Wants to know foreign business ownership requirements.',
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
  const [inquiries, setInquiries] = useState<KanbanInquiry[]>(fallbackInquiries);
  const [branches, setBranches] = useState<BranchOption[]>([
    { id: 'a1111111-1111-4111-a111-111111111111', name: 'Riyadh Batha Main Branch' },
    { id: 'b2222222-2222-4222-b222-222222222222', name: 'Dammam City Branch' },
    { id: 'c3333333-3333-4333-c333-333333333333', name: 'Madinah Central Branch' },
  ]);
  const [agents, setAgents] = useState<AgentOption[]>([
    { id: 'e5555555-5555-4555-e555-555555555555', name: 'Rafiqul Islam' },
    { id: 'f6666666-6666-4666-f666-666666666666', name: 'Tariqul Anam' },
    { id: '07777777-7777-4777-a777-777777777777', name: 'Shakil Ahmed' },
  ]);

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for creating new lead
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('Umrah');
  const [preferredBranchId, setPreferredBranchId] = useState('a1111111-1111-4111-a111-111111111111');
  const [assignedAgentId, setAssignedAgentId] = useState('e5555555-5555-4555-e555-555555555555');
  const [initialStatus, setInitialStatus] = useState<InquiryStatus>('New');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [inqRes, branchRes, staffRes] = await Promise.all([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/branches'),
        fetch('/api/admin/staff'),
      ]);

      const inqData = await inqRes.json();
      const branchData = await branchRes.json();
      const staffData = await staffRes.json();

      if (inqData.success && inqData.inquiries && inqData.inquiries.length > 0) {
        setInquiries(inqData.inquiries);
      }

      if (branchData.success && branchData.branches && branchData.branches.length > 0) {
        const formatted = branchData.branches.map((b: any) => ({ id: b.id, name: b.name }));
        setBranches(formatted);
        if (formatted.length > 0) setPreferredBranchId(formatted[0].id);
      }

      if (staffData.success && staffData.staff && staffData.staff.length > 0) {
        const formattedStaff = staffData.staff.map((s: any) => ({ id: s.id, name: s.full_name }));
        setAgents(formattedStaff);
        if (formattedStaff.length > 0) setAssignedAgentId(formattedStaff[0].id);
      }
    } catch (err) {
      console.error('Error loading inquiry data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setClientName('');
    setClientPhone('');
    setServiceCategory('Umrah');
    if (branches.length > 0) setPreferredBranchId(branches[0].id);
    if (agents.length > 0) setAssignedAgentId(agents[0].id);
    setInitialStatus('New');
    setNotes('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setErrorMsg('Client name and phone number are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          serviceCategory,
          preferredBranchId,
          assignedAgentId,
          status: initialStatus,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to create lead.');
        setSubmitting(false);
        return;
      }

      if (data.inquiry) {
        setInquiries((prev) => [data.inquiry, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      // Fallback optimistic addition
      const selectedBranchObj = branches.find((b) => b.id === preferredBranchId);
      const selectedAgentObj = agents.find((a) => a.id === assignedAgentId);
      const newInquiry: KanbanInquiry = {
        id: `inq-${Date.now()}`,
        tracking_code: `BMT${Math.floor(100 + Math.random() * 900)}`,
        client_name: clientName,
        client_phone: clientPhone,
        service_category: serviceCategory,
        status: initialStatus,
        branch_name: selectedBranchObj?.name || 'Riyadh Batha Main Branch',
        assigned_agent: selectedAgentObj?.name || 'Unassigned',
        notes,
        created_at: new Date().toISOString().split('T')[0],
      };
      setInquiries((prev) => [newInquiry, ...prev]);
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Status change handler
  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.tracking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      {/* Top Title & Actions */}
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

        {/* View Switcher & Create Lead Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Create New Lead</span>
          </button>

          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-emerald-800 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
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
            {branches.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
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
            <option value="Cargo">Cargo</option>
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
                      {inquiry.notes && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                          {inquiry.notes}
                        </p>
                      )}

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

      {/* Create New Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Create New Lead / Inquiry</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Full Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Kabir Hossain"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Phone Number</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+966 51 111 1111"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Umrah">Umrah</option>
                    <option value="Flight Ticketing">Flight Ticketing</option>
                    <option value="Passport Malumat">Passport Malumat</option>
                    <option value="Ziyarah Visa">Ziyarah Visa</option>
                    <option value="MISA Investor License">MISA Investor License</option>
                    <option value="Qiwa/Amel Issues">Qiwa/Amel Issues</option>
                    <option value="Cargo">Cargo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
                  <select
                    value={initialStatus}
                    onChange={(e) => setInitialStatus(e.target.value as InquiryStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="New">New Leads</option>
                    <option value="Processing">Processing</option>
                    <option value="Action Required">Action Required</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Branch</label>
                  <select
                    value={preferredBranchId}
                    onChange={(e) => setPreferredBranchId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Agent</label>
                  <select
                    value={assignedAgentId}
                    onChange={(e) => setAssignedAgentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Remarks / Internal Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Needs urgent passport data transfer to new passport..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-amber-300" />}
                  <span>Save Lead</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
