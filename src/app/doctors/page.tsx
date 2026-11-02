'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { DOCTORS, MEDICAL_DEPARTMENTS, HOSPITALS } from '@/data/mockData';
import { DoctorCard } from '@/components/DoctorCard';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  LayoutGrid,
  CalendarDays
} from 'lucide-react';

export default function DoctorsPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Doctor Rosters...</div>}>
      <DoctorsContent />
    </React.Suspense>
  );
}

function DoctorsContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const initialDept = searchParams.get('dept') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialHospital = searchParams.get('hospital') || 'All';

  const [search, setSearch] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedSector, setSelectedSector] = useState<'All' | 'government' | 'private'>('All');
  const [selectedHospital, setSelectedHospital] = useState(initialHospital);
  const [selectedDay, setSelectedDay] = useState('All');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchSearch = search.trim() === '' ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        (doc.hindiName && doc.hindiName.includes(search)) ||
        doc.qualifications.toLowerCase().includes(search.toLowerCase()) ||
        doc.departmentName.toLowerCase().includes(search.toLowerCase()) ||
        doc.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
        doc.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()));

      const matchDept = selectedDept === 'All' || doc.departmentId === selectedDept;
      const matchSector = selectedSector === 'All' || doc.sector === selectedSector;
      const matchHospital = selectedHospital === 'All' || doc.hospitalId === selectedHospital;
      const matchDay = selectedDay === 'All' || doc.schedule.some(s => s.day === selectedDay);

      return matchSearch && matchDept && matchSector && matchHospital && matchDay;
    });
  }, [search, selectedDept, selectedSector, selectedHospital, selectedDay]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Verified Clinical Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'hi' ? 'डॉक्टर रोस्टर एवं ओपीडी समय सारिणी' : 'Find Doctors & OPD Schedules'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check real-time OPD room assignments, weekly shift timings, and consult fees across government and private hospitals.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card View</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly Roster View</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Text Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor name, qualification, or illness..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Department Select */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 bg-white"
            >
              <option value="All">All Departments (19)</option>
              {MEDICAL_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Sector Select */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 bg-white"
            >
              <option value="All">All Sectors (Govt + Private)</option>
              <option value="government">Government Hospitals Only (₹0 Fee)</option>
              <option value="private">Private Hospitals Only</option>
            </select>
          </div>

          {/* Day of Week Filter */}
          <div>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 bg-white"
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day === 'All' ? 'All Duty Days' : `${day} OPD`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong>{filteredDoctors.length}</strong> verified doctors matching criteria
          </span>
          {(search || selectedDept !== 'All' || selectedSector !== 'All' || selectedDay !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('All');
                setSelectedSector('All');
                setSelectedDay('All');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Content View: Cards vs Weekly Roster Calendar */}
      {viewMode === 'cards' ? (
        filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Doctors Match Your Selection</h3>
            <p className="text-xs text-slate-500">
              Try choosing another department or duty day.
            </p>
          </div>
        )
      ) : (
        /* Weekly Roster Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Doctor & Specialty</th>
                <th className="py-3 px-4">Hospital & Room</th>
                <th className="py-3 px-4">Duty Schedule</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block text-sm">{doc.name}</span>
                    <span className="text-[11px] text-blue-600 font-medium block">{doc.qualifications}</span>
                    <span className="text-[11px] text-slate-400">{doc.departmentName}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{doc.hospitalName}</span>
                    <span className="text-[11px] text-slate-500 block">{doc.opdRoom}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded inline-block mt-0.5 ${
                      doc.sector === 'government' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {doc.sector.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {doc.schedule.map((s) => (
                        <div key={s.day} className="text-[11px]">
                          <strong className="text-slate-800">{s.day}:</strong>{' '}
                          <span className="text-slate-600">{s.shifts[0]?.startTime} - {s.shifts[0]?.endTime} ({s.shifts[0]?.mode})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold text-xs ${doc.sector === 'government' ? 'text-emerald-700' : 'text-purple-700'}`}>
                      {doc.consultationFee === 0 ? 'Free / ₹0' : `₹${doc.consultationFee}`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {doc.availabilityStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/appointments/book?doctorId=${doc.id}&hospitalId=${doc.hospitalId}&deptId=${doc.departmentId}`}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors inline-block"
                    >
                      Book Slot
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
