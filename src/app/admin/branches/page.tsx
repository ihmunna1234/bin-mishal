'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit3,
  MapPin,
  Phone,
  MessageSquare,
  Users,
  CheckCircle2,
  X,
  Search,
  Navigation,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface BranchItem {
  id: string;
  name: string;
  city: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  status: 'active' | 'inactive';
  staffCount: number;
  inquiryCount: number;
}

const fallbackBranches: BranchItem[] = [
  {
    id: 'a1111111-1111-4111-a111-111111111111',
    name: 'Riyadh Batha Main Branch',
    city: 'Riyadh',
    phone: '+966500000001',
    whatsapp: '+966500000001',
    mapsUrl: 'https://maps.google.com/?q=Batha+Commercial+Center+Riyadh',
    status: 'active',
    staffCount: 2,
    inquiryCount: 14,
  },
  {
    id: 'b2222222-2222-4222-b222-222222222222',
    name: 'Dammam City Branch',
    city: 'Dammam',
    phone: '+966500000002',
    whatsapp: '+966500000002',
    mapsUrl: 'https://maps.google.com/?q=King+Fahd+Street+Dammam',
    status: 'active',
    staffCount: 1,
    inquiryCount: 8,
  },
  {
    id: 'c3333333-3333-4333-c333-333333333333',
    name: 'Madinah Central Branch',
    city: 'Madinah',
    phone: '+966500000003',
    whatsapp: '+966500000003',
    mapsUrl: 'https://maps.google.com/?q=Near+Prophets+Mosque+Madinah',
    status: 'active',
    staffCount: 1,
    inquiryCount: 6,
  },
];

export default function BranchManagementPage() {
  const [branches, setBranches] = useState<BranchItem[]>(fallbackBranches);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  // Fetch branches from API on mount
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/branches');
      const data = await res.json();
      if (data.success && data.branches && data.branches.length > 0) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error('Failed to load branches from API:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBranch(null);
    setName('');
    setCity('Riyadh');
    setPhone('');
    setWhatsapp('');
    setMapsUrl('');
    setStatus('active');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (b: BranchItem) => {
    setEditingBranch(b);
    setName(b.name);
    setCity(b.city);
    setPhone(b.phone);
    setWhatsapp(b.whatsapp);
    setMapsUrl(b.mapsUrl);
    setStatus(b.status);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMsg('Branch name and phone number are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          city,
          phone,
          whatsapp,
          mapsUrl,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to save branch.');
        setSubmitting(false);
        return;
      }

      if (data.branch) {
        setBranches((prev) => [data.branch, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error submitting branch:', err);
      // Local optimistic fallback if API is unreachable
      const newBranch: BranchItem = {
        id: `b-${Date.now()}`,
        name,
        city,
        phone,
        whatsapp,
        mapsUrl,
        status,
        staffCount: 1,
        inquiryCount: 0,
      };
      setBranches((prev) => [newBranch, ...prev]);
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-400" />
            Saudi Branch Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure physical offices, contact hotlines, location triggers, and staff allocations.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add New Saudi Branch</span>
        </button>
      </div>

      {/* Branches Table Card */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl relative">
        {loading && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading Saudi Branches...</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Branch Name</th>
                <th className="py-3.5 px-4">Region / City</th>
                <th className="py-3.5 px-4">Phone Hotline</th>
                <th className="py-3.5 px-4">WhatsApp Direct</th>
                <th className="py-3.5 px-4">Active Staff</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {branches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4 font-extrabold text-white">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>{b.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-200">{b.city}</td>
                  <td className="py-4 px-4 font-mono font-medium text-slate-300">{b.phone}</td>
                  <td className="py-4 px-4 font-mono font-medium text-emerald-400">{b.whatsapp}</td>
                  <td className="py-4 px-4 font-bold text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      {b.staffCount} Agents
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'active'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {b.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      title="Edit Branch Details"
                    >
                      <Edit3 className="w-4 h-4 text-amber-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                {editingBranch ? 'Edit Saudi Branch' : 'Add New Saudi Branch'}
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

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Branch Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Riyadh Batha Main Branch"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Region / City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Riyadh">Riyadh</option>
                    <option value="Dammam">Dammam</option>
                    <option value="Madinah">Madinah</option>
                    <option value="Jeddah">Jeddah</option>
                    <option value="Al-Khobar">Al-Khobar</option>
                    <option value="Makkah">Makkah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Hotline</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 50 000 0001"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Direct Number</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+966 50 000 0001"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Address / Google Maps URL</label>
                <input
                  type="text"
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  placeholder="e.g. Batha Commercial Center, Riyadh or https://maps.google.com/..."
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
                  <span>Save Branch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
