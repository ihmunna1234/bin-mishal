'use client';

import React, { useState } from 'react';
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

const initialBranches: BranchItem[] = [
  {
    id: 'b-1',
    name: 'Riyadh Batha Head Office',
    city: 'Riyadh',
    phone: '+966 11 401 2345',
    whatsapp: '+966 50 111 2233',
    mapsUrl: 'https://maps.google.com/?q=24.6333,46.7167',
    status: 'active',
    staffCount: 12,
    inquiryCount: 540,
  },
  {
    id: 'b-2',
    name: 'Dammam Regional Branch',
    city: 'Dammam',
    phone: '+966 13 801 2345',
    whatsapp: '+966 50 222 3344',
    mapsUrl: 'https://maps.google.com/?q=26.4207,50.0888',
    status: 'active',
    staffCount: 6,
    inquiryCount: 320,
  },
  {
    id: 'b-3',
    name: 'Madinah Central Branch',
    city: 'Madinah',
    phone: '+966 14 801 2345',
    whatsapp: '+966 50 333 4455',
    mapsUrl: 'https://maps.google.com/?q=24.4672,39.6112',
    status: 'active',
    staffCount: 4,
    inquiryCount: 240,
  },
  {
    id: 'b-4',
    name: 'Jeddah Al-Balad Branch',
    city: 'Jeddah',
    phone: '+966 12 601 2345',
    whatsapp: '+966 50 444 5566',
    mapsUrl: 'https://maps.google.com/?q=21.4858,39.1925',
    status: 'active',
    staffCount: 3,
    inquiryCount: 148,
  },
];

export default function BranchManagementPage() {
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');

  const openCreateModal = () => {
    setEditingBranch(null);
    setName('');
    setCity('Riyadh');
    setPhone('');
    setWhatsapp('');
    setMapsUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (b: BranchItem) => {
    setEditingBranch(b);
    setName(b.name);
    setCity(b.city);
    setPhone(b.phone);
    setWhatsapp(b.whatsapp);
    setMapsUrl(b.mapsUrl);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingBranch) {
      setBranches((prev) =>
        prev.map((item) =>
          item.id === editingBranch.id
            ? { ...item, name, city, phone, whatsapp, mapsUrl }
            : item
        )
      );
    } else {
      const newBranch: BranchItem = {
        id: `b-${Date.now()}`,
        name,
        city,
        phone,
        whatsapp,
        mapsUrl,
        status: 'active',
        staffCount: 1,
        inquiryCount: 0,
      };
      setBranches((prev) => [...prev, newBranch]);
    }
    setIsModalOpen(false);
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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add New Saudi Branch</span>
        </button>
      </div>

      {/* Branches Table Card */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Branch Name</th>
                <th className="py-3.5 px-4">Region / City</th>
                <th className="py-3.5 px-4">Phone Hotline</th>
                <th className="py-3.5 px-4">WhatsApp Direct</th>
                <th className="py-3.5 px-4">Active Staff</th>
                <th className="py-3.5 px-4">Total Inquiries</th>
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
                  <td className="py-4 px-4 font-bold text-amber-400">{b.inquiryCount}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
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
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Branch Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Riyadh Batha Head Office"
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
                    placeholder="+966 11 401 2345"
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
                    placeholder="+966 50 111 2233"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Google Maps URL</label>
                  <input
                    type="url"
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold shadow-md"
                >
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
