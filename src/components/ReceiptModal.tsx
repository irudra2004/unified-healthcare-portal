'use client';

import React from 'react';
import { Appointment } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Printer, 
  X, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  User, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  QrCode,
  Download,
  Building2,
  AlertCircle
} from 'lucide-react';

interface ReceiptModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ appointment, onClose }) => {
  const { language } = useLanguage();

  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const isGovt = appointment.sector === 'government';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">
              {language === 'hi' ? 'ओपीडी अपॉइंटमेंट पर्ची (डिजिटल रसीद)' : 'OPD Appointment Slip (Digital Receipt)'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्रिंट करें / PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable OPD Slip Body */}
        <div className="print-container p-6 sm:p-8 space-y-6 bg-white text-slate-900">
          {/* Header of the slip */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">SANJEEVANI CARE</span>
                <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  isGovt ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {isGovt ? 'Government Hospital OPD' : 'Private Healthcare Consultation'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">{appointment.hospitalName}</h3>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{appointment.hospitalAddress}</span>
              </p>
            </div>

            {/* Token Badge */}
            <div className="text-center bg-slate-100 border border-slate-300 rounded-2xl p-3 min-w-[110px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
                OPD Token
              </span>
              <span className="text-3xl font-black text-blue-700 block">
                #{appointment.tokenNumber}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded block mt-0.5">
                {appointment.status}
              </span>
            </div>
          </div>

          {/* Appointment Key Reference Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Appointment ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{appointment.appointmentNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Date & Time</span>
              <span className="font-bold text-slate-900">{appointment.appointmentDate} • {appointment.appointmentTime}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Room / Cabin</span>
              <span className="font-bold text-slate-900">{appointment.opdRoom}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Fee Paid / Due</span>
              <span className="font-bold text-slate-900">
                {appointment.consultationFee === 0 ? 'Free / ₹0 (Govt)' : `₹${appointment.consultationFee}`}
              </span>
            </div>
          </div>

          {/* Patient and Doctor Information Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Patient Details */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Patient Particulars
              </h4>
              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500 text-[11px]">Patient Name:</span>{' '}
                  <span className="font-bold text-slate-900">{appointment.patient.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Age / Gender:</span>{' '}
                  <span className="font-medium text-slate-800">{appointment.patient.age} yrs / {appointment.patient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Mobile:</span>{' '}
                  <span className="font-medium text-slate-800">{appointment.patient.phone}</span>
                </div>
                {appointment.patient.abhaId && (
                  <div>
                    <span className="text-slate-500 text-[11px]">ABHA Health ID:</span>{' '}
                    <span className="font-mono font-semibold text-blue-700">{appointment.patient.abhaId}</span>
                  </div>
                )}
                {appointment.patient.isSeniorCitizenOrDifferentlyAbled && (
                  <span className="inline-block bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                    Senior Citizen / Priority Assistance
                  </span>
                )}
              </div>
            </div>

            {/* Doctor Details */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Consulting Doctor & Specialty
              </h4>
              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500 text-[11px]">Consultant:</span>{' '}
                  <span className="font-bold text-slate-900">{appointment.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Specialty / Dept:</span>{' '}
                  <span className="font-medium text-slate-800">{appointment.departmentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Degree:</span>{' '}
                  <span className="text-slate-700">{appointment.doctorQualification}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Consultation Mode:</span>{' '}
                  <span className="font-semibold text-slate-800">{appointment.consultationType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reporting Instructions */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
            <h5 className="font-bold flex items-center gap-1.5 text-amber-950">
              <Clock className="w-4 h-4 text-amber-700" />
              Reporting Instructions for Hospital Visit:
            </h5>
            <p><strong>Reporting Time:</strong> {appointment.reportingTime}</p>
            <p><strong>Counter Verification:</strong> {appointment.counterInstructions}</p>
            <p><strong>Documents to Bring:</strong> Aadhaar Card / Govt Photo ID, previous treatment prescriptions, diagnostic reports, and ABHA Health Card.</p>
          </div>

          {/* Footer of the slip: Digital Verification Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-slate-300 rounded-lg flex items-center justify-center p-1 bg-slate-50">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div>
                <p className="font-semibold text-slate-700">Digital QR Verification Available</p>
                <p>Present this barcode/QR at hospital registration desk</p>
              </div>
            </div>
            <div className="text-right">
              <p>Booked on: {appointment.bookedAt}</p>
              <p className="font-medium text-slate-700">Sanjeevani Unified Health Platform</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Buttons (Hidden during print) */}
        <div className="no-print bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'hi' ? 'रसीद प्रिंट करें' : 'Print Slip'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
