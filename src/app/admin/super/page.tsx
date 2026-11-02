'use client';

import React, { useState } from 'react';
import { HOSPITALS, DOCTORS, INITIAL_APPOINTMENTS } from '@/data/mockData';
import { Hospital } from '@/types';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  FileCheck, 
  BarChart3, 
  ToggleLeft, 
  ToggleRight,
  TrendingUp,
  Download
} from 'lucide-react';

export default function SuperAdminPage() {
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>(HOSPITALS);
  const [activeSubTab, setActiveSubTab] = useState<'hospitals' | 'quality' | 'analytics' | 'audit'>('hospitals');

  const handleToggleVerification = (id: string) => {
    setHospitalsList(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, isVerified: !h.isVerified };
      }
      return h;
    }));
  };

  const govtCount = hospitalsList.filter(h => h.sector === 'government').length;
  const pvtCount = hospitalsList.filter(h => h.sector === 'private').length;
  const verifiedCount = hospitalsList.filter(h => h.isVerified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Directorate General of Health Services (DGHS) Oversight
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          National Central Super-Admin Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          National registry compliance, verified facility credentialing, duplicate detection, and schedule completeness audits.
        </p>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Facilities</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">{hospitalsList.length}</span>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            100% Pan-India Active
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Government Sector</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block mt-1">{govtCount}</span>
          <span className="text-xs text-slate-400 mt-1 block">AIIMS, GMCs & CHCs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Private Sector</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-600 block mt-1">{pvtCount}</span>
          <span className="text-xs text-slate-400 mt-1 block">NABH / JCI Accredited</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Verified Credentials</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-600 block mt-1">{verifiedCount}</span>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">MoHFW Verified</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('hospitals')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'hospitals'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hospital Verification & Registry</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quality')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'quality'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Data Quality & Duplicate Check</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'audit'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Administrative Audit Logs</span>
        </button>
      </div>

      {/* TAB 1: REGISTRY & VERIFICATION TOGGLE */}
      {activeSubTab === 'hospitals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              National Hospital Listing Status & Verification Control
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Hospital Name & City</th>
                  <th className="py-3 px-4">Division & Type</th>
                  <th className="py-3 px-4">Bed Capacity</th>
                  <th className="py-3 px-4">OPD Model</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Super-Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitalsList.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block text-sm">{h.name}</span>
                      <span className="text-[11px] text-slate-500">{h.locality}, {h.city}, {h.state}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase block w-fit mb-1 ${
                        h.sector === 'government' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {h.sector}
                      </span>
                      <span className="text-[11px] text-slate-600 font-medium">{h.type}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {h.bedCapacity} Beds
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">{h.opdFee}</span>
                      <span className="text-[11px] text-slate-400">{h.opdTimings.split('(')[0]}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {h.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleVerification(h.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          h.isVerified
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {h.isVerified ? 'Disable Listing' : 'Approve & Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DATA QUALITY & DUPLICATE CHECKS */}
      {activeSubTab === 'quality' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">
            Automated Duplicate Detection & Completeness Assessment
          </h3>
          <p className="text-xs text-slate-500">
            System scans for duplicate registrations based on geographic latitude/longitude proximity (within 100m) and exact contact number collisions.
          </p>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <strong>Duplicate Scan Passed:</strong> No duplicate facilities or overlapping medical council license IDs detected in the national active registry.
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Facility Schedule Completeness Index:
            </h4>
            <div className="space-y-2 text-xs">
              {hospitalsList.slice(0, 4).map(h => (
                <div key={h.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{h.name}</span>
                  <span className="font-bold text-emerald-700">100% Complete Roster</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">
            National Health Authority Security & Administrative Audit Trail
          </h3>
          <p className="text-xs text-slate-500">
            Immutable system logs recorded under the Digital Personal Data Protection (DPDP) Act 2023.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
              <span className="text-slate-400">[2026-10-30 11:15:20 IST]</span> SUPER_ADMIN: Hospital credential renewal verified for AIIMS New Delhi (Reg #MoHFW-DEL-001).
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
              <span className="text-slate-400">[2026-10-30 09:42:04 IST]</span> SYSTEM: Automated sync with Ayushman Bharat PM-JAY Empaneled Hospital Directory completed. 29,410 national nodes healthy.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
              <span className="text-slate-400">[2026-10-29 18:30:12 IST]</span> HOSPITAL_ADMIN (Safdarjung): Sports Injury Centre OPD room assignments updated for November 2026.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
