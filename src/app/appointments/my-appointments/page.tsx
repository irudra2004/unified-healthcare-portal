'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Appointment } from '@/types';
import { INITIAL_APPOINTMENTS } from '@/data/mockData';
import { ReceiptModal } from '@/components/ReceiptModal';
import { 
  CalendarCheck, 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  User, 
  Printer, 
  XCircle, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function MyAppointmentsPage() {
  const { language, t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Appointment | null>(null);
  const [cancelModalApt, setCancelModalApt] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Load from local storage and seed with initial appointments
  useEffect(() => {
    const saved = localStorage.getItem('sanjeevani_appointments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAppointments(parsed);
      } catch (e) {
        setAppointments(INITIAL_APPOINTMENTS);
      }
    } else {
      setAppointments(INITIAL_APPOINTMENTS);
      localStorage.setItem('sanjeevani_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
    }
  }, []);

  // Cancel Appointment
  const handleCancel = () => {
    if (!cancelModalApt) return;
    const updated = appointments.map(apt => {
      if (apt.id === cancelModalApt.id) {
        return {
          ...apt,
          status: 'Cancelled' as const,
          cancellationReason: cancelReason || 'Cancelled by Patient'
        };
      }
      return apt;
    });
    setAppointments(updated);
    localStorage.setItem('sanjeevani_appointments', JSON.stringify(updated));
    setCancelModalApt(null);
    setCancelReason('');
  };

  const filtered = appointments.filter(apt => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return apt.appointmentNumber.toLowerCase().includes(q) ||
      apt.hospitalName.toLowerCase().includes(q) ||
      apt.doctorName.toLowerCase().includes(q) ||
      apt.patient.fullName.toLowerCase().includes(q) ||
      apt.patient.phone.includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'hi' ? 'मेरी नियुक्तियां एवं डिजिटल टोकन' : 'My Appointments & Digital Slips'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track confirmed outpatient tokens, download printable receipts, or reschedule visits.
          </p>
        </div>

        <Link
          href="/appointments/book"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book New OPD Appointment</span>
        </Link>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by appointment ID (e.g. SJV-2026-91024), patient name, or phone number..."
          className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder:text-slate-400 text-slate-800 font-medium"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:text-slate-600">
            Clear
          </button>
        )}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((apt) => {
            const isGovt = apt.sector === 'government';
            const isCancelled = apt.status === 'Cancelled';

            return (
              <div
                key={apt.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all ${
                  isCancelled 
                    ? 'border-slate-200 opacity-70 bg-slate-50/50' 
                    : isGovt 
                    ? 'border-emerald-200 shadow-sm hover:border-emerald-300' 
                    : 'border-purple-200 shadow-sm hover:border-purple-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left Info: ID, Hospital & Doctor */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                        {apt.appointmentNumber}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isGovt ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {isGovt ? 'Government Hospital' : 'Private Healthcare'}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isCancelled
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900">{apt.hospitalName}</h4>
                      <p className="text-xs text-blue-600 font-semibold">
                        {apt.doctorName} • {apt.departmentName} ({apt.opdRoom})
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Patient: <strong>{apt.patient.fullName}</strong> ({apt.patient.age} yrs) • Phone: {apt.patient.phone}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Token & Time Slot */}
                  <div className="flex items-center gap-6 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-center pr-4 border-r border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Token</span>
                      <span className="text-2xl font-black text-blue-700 block">#{apt.tokenNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Appointment Slot:</span>
                      <span className="font-bold text-slate-800 text-xs block">
                        {apt.appointmentDate}
                      </span>
                      <span className="text-slate-600">{apt.appointmentTime} ({apt.consultationType})</span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                    <button
                      onClick={() => setSelectedReceipt(apt)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Slip</span>
                    </button>

                    {!isCancelled && (
                      <button
                        onClick={() => setCancelModalApt(apt)}
                        className="px-3.5 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold text-xs rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {isCancelled && apt.cancellationReason && (
                  <div className="mt-3 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    Reason: {apt.cancellationReason}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Appointments Found</h3>
            <p className="text-xs text-slate-500">
              You haven&apos;t booked any appointments yet or none match your search query.
            </p>
            <Link
              href="/appointments/book"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl inline-block mt-2"
            >
              Book Your First Appointment
            </Link>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {cancelModalApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">Cancel Appointment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel appointment <strong>{cancelModalApt.appointmentNumber}</strong> with {cancelModalApt.doctorName} at {cancelModalApt.hospitalName}?
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Reason for Cancellation:</label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Schedule conflict, feeling better..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-rose-600"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalApt(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
              >
                Yes, Cancel Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Slip Modal */}
      {selectedReceipt && (
        <ReceiptModal
          appointment={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
