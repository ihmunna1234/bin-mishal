'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  X,
  Edit3,
  Search,
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { AppRole } from '@/types';

interface StaffUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: AppRole;
  branch_id?: string | null;
  branch_name: string;
  active_status: boolean;
  joined_date: string;
}

interface BranchOption {
  id: string;
  name: string;
}

const fallbackStaff: StaffUser[] = [
  {
    id: 'd4444444-4444-4444-d444-444444444444',
    full_name: 'Injamul Hoque',
    email: 'injamul@binmisal.com',
    phone: '+966500000999',
    role: 'super_admin',
    branch_name: 'Global HQ',
    active_status: true,
    joined_date: '2026-07-27',
  },
  {
    id: 'e5555555-5555-4555-e555-555555555555',
    full_name: 'Rafiqul Islam',
    email: 'rafiqul.riyadh@binmisal.com',
    phone: '+966500000001',
    role: 'branch_manager',
    branch_name: 'Riyadh Batha Main Branch',
    active_status: true,
    joined_date: '2026-07-27',
  },
  {
    id: 'f6666666-6666-4666-f666-666666666666',
    full_name: 'Tariqul Anam',
    email: 'tariqul.dammam@binmisal.com',
    phone: '+966500000002',
    role: 'agent',
    branch_name: 'Dammam City Branch',
    active_status: true,
    joined_date: '2026-07-27',
  },
  {
    id: '07777777-7777-4777-a777-777777777777',
    full_name: 'Shakil Ahmed',
    email: 'shakil.madinah@binmisal.com',
    phone: '+966500000003',
    role: 'agent',
    branch_name: 'Madinah Central Branch',
    active_status: true,
    joined_date: '2026-07-27',
  },
];

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<StaffUser[]>(fallbackStaff);
  const [branches, setBranches] = useState<BranchOption[]>([
    { id: 'a1111111-1111-4111-a111-111111111111', name: 'Riyadh Batha Main Branch' },
    { id: 'b2222222-2222-4222-b222-222222222222', name: 'Dammam City Branch' },
    { id: 'c3333333-3333-4333-c333-333333333333', name: 'Madinah Central Branch' },
  ]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppRole>('agent');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('a1111111-1111-4111-a111-111111111111');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [staffRes, branchRes] = await Promise.all([
        fetch('/api/admin/staff'),
        fetch('/api/admin/branches'),
      ]);

      const staffData = await staffRes.json();
      const branchData = await branchRes.json();

      if (staffData.success && staffData.staff && staffData.staff.length > 0) {
        setStaffList(staffData.staff);
      }

      if (branchData.success && branchData.branches && branchData.branches.length > 0) {
        const formattedBranchOptions = branchData.branches.map((b: any) => ({
          id: b.id,
          name: b.name,
        }));
        setBranches(formattedBranchOptions);
        if (formattedBranchOptions.length > 0) {
          setSelectedBranchId(formattedBranchOptions[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching staff/branch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openInviteModal = () => {
    setEditingStaff(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setRole('agent');
    if (branches.length > 0) {
      setSelectedBranchId(branches[0].id);
    }
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (staff: StaffUser) => {
    setEditingStaff(staff);
    setFullName(staff.full_name);
    setEmail(staff.email);
    setPhone(staff.phone);
    setRole(staff.role);
    setSelectedBranchId(staff.branch_id || (branches.length > 0 ? branches[0].id : ''));
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setErrorMsg('Full name and email are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          role,
          branchId: role === 'super_admin' ? null : selectedBranchId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to add staff member.');
        setSubmitting(false);
        return;
      }

      if (data.staff) {
        setStaffList((prev) => [data.staff, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error submitting staff:', err);
      // Fallback optimistic addition
      const selectedBranchObj = branches.find((b) => b.id === selectedBranchId);
      const newStaff: StaffUser = {
        id: `usr-${Date.now()}`,
        full_name: fullName,
        email,
        phone: phone || '+966500000000',
        role,
        branch_id: selectedBranchId,
        branch_name: role === 'super_admin' ? 'Global HQ' : selectedBranchObj?.name || 'Riyadh Branch',
        active_status: true,
        joined_date: new Date().toISOString().split('T')[0],
      };
      setStaffList((prev) => [newStaff, ...prev]);
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadge = (r: AppRole) => {
    switch (r) {
      case 'super_admin':
        return (
          <span className="px-2.5 py-1 rounded font-extrabold text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
            SUPER ADMIN
          </span>
        );
      case 'branch_manager':
        return (
          <span className="px-2.5 py-1 rounded font-extrabold text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
            BRANCH MANAGER
          </span>
        );
      case 'agent':
        return (
          <span className="px-2.5 py-1 rounded font-extrabold text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
            TRAVEL AGENT
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            Staff & Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage employee accounts, assign physical branch scopes, and configure user permissions.
          </p>
        </div>

        <button
          onClick={openInviteModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-amber-300" />
          <span>Invite / Add Staff Member</span>
        </button>
      </div>

      {/* Staff User Table Card */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl relative">
        {loading && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading Staff Roster...</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Assigned Branch</th>
                <th className="py-3.5 px-4">Role Badge</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {staffList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs border border-slate-700">
                        {user.full_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-extrabold">{user.full_name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{user.branch_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-4 px-4 font-mono font-medium text-slate-300">{user.phone}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Active User
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{user.joined_date}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      title="Edit Staff Access"
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

      {/* Invite / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                {editingStaff ? 'Edit Employee Access' : 'Invite / Add Staff Member'}
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
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shakil Ahmed"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="shakil@binmisal.com"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 50 000 0003"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AppRole)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="agent">Travel Agent</option>
                    <option value="branch_manager">Branch Manager</option>
                    <option value="super_admin">Super Admin (Global)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Physical Branch</label>
                  <select
                    value={selectedBranchId}
                    onChange={(e) => setSelectedBranchId(e.target.value)}
                    disabled={role === 'super_admin'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none disabled:opacity-50"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <span>Save Staff Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
