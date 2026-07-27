'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { AppRole } from '@/types';

interface StaffUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: AppRole;
  branch_name: string;
  active_status: boolean;
  joined_date: string;
}

const initialStaff: StaffUser[] = [
  {
    id: 'usr-1',
    full_name: 'Sheikh Al-Mansoor',
    email: 'admin@binmisal.com',
    phone: '+966 50 111 2233',
    role: 'super_admin',
    branch_name: 'Riyadh Batha Head Office',
    active_status: true,
    joined_date: '2024-01-15',
  },
  {
    id: 'usr-2',
    full_name: 'Sami Al-Mansoor',
    email: 'sami.riyadh@binmisal.com',
    phone: '+966 55 222 3344',
    role: 'branch_manager',
    branch_name: 'Riyadh Batha Head Office',
    active_status: true,
    joined_date: '2024-03-10',
  },
  {
    id: 'usr-3',
    full_name: 'Tariq Al-Zahrani',
    email: 'tariq.dammam@binmisal.com',
    phone: '+966 50 333 4455',
    role: 'branch_manager',
    branch_name: 'Dammam Regional Branch',
    active_status: true,
    joined_date: '2024-05-01',
  },
  {
    id: 'usr-4',
    full_name: 'Faisal Al-Harbi',
    email: 'faisal.madinah@binmisal.com',
    phone: '+966 54 444 5566',
    role: 'agent',
    branch_name: 'Madinah Central Branch',
    active_status: true,
    joined_date: '2025-02-12',
  },
  {
    id: 'usr-5',
    full_name: 'Kabir Ahmed',
    email: 'kabir.agent@binmisal.com',
    phone: '+966 56 555 6677',
    role: 'agent',
    branch_name: 'Riyadh Batha Head Office',
    active_status: true,
    joined_date: '2025-06-20',
  },
];

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<StaffUser[]>(initialStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppRole>('agent');
  const [branchName, setBranchName] = useState('Riyadh Batha Head Office');

  const openInviteModal = () => {
    setEditingStaff(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setRole('agent');
    setBranchName('Riyadh Batha Head Office');
    setIsModalOpen(true);
  };

  const openEditModal = (staff: StaffUser) => {
    setEditingStaff(staff);
    setFullName(staff.full_name);
    setEmail(staff.email);
    setPhone(staff.phone);
    setRole(staff.role);
    setBranchName(staff.branch_name);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((item) =>
          item.id === editingStaff.id
            ? { ...item, full_name: fullName, email, phone, role, branch_name: branchName }
            : item
        )
      );
    } else {
      const newStaff: StaffUser = {
        id: `usr-${Date.now()}`,
        full_name: fullName,
        email,
        phone: phone || '+966 50 000 0000',
        role,
        branch_name: branchName,
        active_status: true,
        joined_date: new Date().toISOString().split('T')[0],
      };
      setStaffList((prev) => [...prev, newStaff]);
    }
    setIsModalOpen(false);
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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
        >
          <UserPlus className="w-4 h-4 text-amber-300" />
          <span>Invite Employee</span>
        </button>
      </div>

      {/* Staff User Table Card */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl">
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
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
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
                {editingStaff ? 'Edit Employee Access' : 'Invite New Employee'}
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
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abdullah Al-Mansoor"
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
                    placeholder="agent@binmisal.com"
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
                    placeholder="+966 50 111 2233"
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
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Riyadh Batha Head Office">Riyadh Batha Head Office</option>
                    <option value="Dammam Regional Branch">Dammam Regional Branch</option>
                    <option value="Madinah Central Branch">Madinah Central Branch</option>
                    <option value="Jeddah Al-Balad Branch">Jeddah Al-Balad Branch</option>
                  </select>
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
                  Save Access Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
