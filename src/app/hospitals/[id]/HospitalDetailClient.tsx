'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Hospital, Doctor } from '@/types';
import { DoctorCard } from '@/components/DoctorCard';
import { 
  Building2, 
  MapPin, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  CalendarCheck, 
  ExternalLink,
  Info,
  Activity
} from 'lucide-react';

interface HospitalDetailClientProps {
  hospital: Hospital;
  hospitalDoctors: Doctor[];
}

export function HospitalDetailClient({ hospital, hospitalDoctors }: HospitalDetailClientProps) {
  const { language, t } = useLanguage();
  const isGovt = hospital.sector === 'government';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href={isGovt ? '/govt-hospitals' : '/private-hospitals'} className="hover:text-blue-600">
          {isGovt ? 'Government Hospitals' : 'Private Hospitals'}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{hospital.name}</span>
      </div>

      {/* Main Hospital Hero Card */}
      <div className={`rounded-3xl border p-6 sm:p-10 shadow-lg relative overflow-hidden bg-white ${
        isGovt ? 'border-emerald-200' : 'border-purple-200'
      }`}>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                isGovt ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {hospital.type}
              </span>
              {hospital.isVerified && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  {hospital.verificationBadge}
                </span>
              )}
              {hospital.nabhAccredited && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full text-xs font-black">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  NABH Accredited
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {language === 'hi' && hospital.hindiName ? hospital.hindiName : hospital.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{hospital.address}</span>
              </p>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'hi' && hospital.hindiOverview ? hospital.hindiOverview : hospital.overview}
            </p>

            {/* Quick Contact & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[11px]">General Helpline</span>
                <span className="font-bold text-slate-800">{hospital.contactNumber}</span>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-red-700">
                <span className="text-red-400 block text-[11px] font-medium">24x7 Emergency Casualty</span>
                <span className="font-black text-sm">{hospital.emergencyNumber}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Bed Capacity</span>
                <span className="font-bold text-slate-800">{hospital.bedCapacity} Total Beds</span>
              </div>
            </div>
          </div>

          {/* Right Action Box: OPD Timings & Book Button */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <span className="text-slate-400 text-xs font-medium block">Outpatient Department (OPD):</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-blue-600" />
                {hospital.opdTimings}
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-xs font-medium block">Registration / Consultation Fee:</span>
              <span className={`text-lg font-black block mt-0.5 ${isGovt ? 'text-emerald-700' : 'text-purple-700'}`}>
                {hospital.opdFee}
              </span>
            </div>

            <Link
              href={`/appointments/book?hospitalId=${hospital.id}`}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isGovt ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book OPD Token Slot</span>
            </Link>

            <a
              href={`https://maps.google.com/?q=${hospital.latitude},${hospital.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Get Directions on Map</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Walk-in Instructions & Guidelines Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2">
        <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          Reporting & Walk-in Registration Procedures:
        </h3>
        <p className="text-xs text-blue-900 leading-relaxed">
          {hospital.walkInInstructions}
        </p>
      </div>

      {/* Facilities, Diagnostics & Health Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facilities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            Campus Facilities
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {hospital.facilities.map((fac, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Diagnostic Services */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Diagnostic & Lab Services
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {hospital.diagnosticServices.map((diag, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{diag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accepted Schemes & Insurances */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Government Schemes & TPA Insurance
          </h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {hospital.schemesAccepted.map((sch, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {sch}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Cashless Insurance: {hospital.insuranceCashlessAccepted.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Assigned to this Hospital */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Doctors & OPD Duty Schedules at {hospital.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinical faculty and specialists assigned to this hospital campus.
            </p>
          </div>
        </div>

        {hospitalDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitalDoctors.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
            General duty medical officers and emergency registrars are on duty 24x7 in the casualty ward.
          </div>
        )}
      </div>
    </div>
  );
}
