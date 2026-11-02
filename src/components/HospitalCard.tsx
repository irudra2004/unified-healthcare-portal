'use client';

import React from 'react';
import Link from 'next/link';
import { Hospital } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  IndianRupee, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Droplet, 
  Award,
  ChevronRight,
  CalendarCheck
} from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const { language, t } = useLanguage();
  const isGovt = hospital.sector === 'government';

  return (
    <div className={`rounded-2xl border transition-all duration-200 hover:shadow-lg bg-white overflow-hidden flex flex-col ${
      isGovt ? 'border-emerald-200/80 hover:border-emerald-400' : 'border-purple-200/80 hover:border-purple-400'
    }`}>
      {/* Top Banner Ribbon */}
      <div className={`px-5 py-2.5 text-xs font-bold flex items-center justify-between ${
        isGovt 
          ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white' 
          : 'bg-gradient-to-r from-purple-800 to-purple-700 text-white'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>{hospital.type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {hospital.isVerified && (
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-white" />
              {t('verifiedBadge')}
            </span>
          )}
          {hospital.nabhAccredited && (
            <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-[11px] font-extrabold">
              <Award className="w-3 h-3" />
              NABH
            </span>
          )}
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Hospital Name & Locality */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {language === 'hi' && hospital.hindiName ? hospital.hindiName : hospital.name}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{hospital.locality}, {hospital.city}, {hospital.state} - {hospital.pincode}</span>
          </p>
        </div>

        {/* Key Metrics / Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">{t('opdHours')}</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {hospital.opdTimings}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">{t('consultationFee')}</span>
            <span className={`font-bold mt-0.5 block ${isGovt ? 'text-emerald-700' : 'text-purple-700'}`}>
              {hospital.opdFee}
            </span>
          </div>
        </div>

        {/* Schemes & Facilities Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hospital.schemesAccepted.includes('Ayushman Bharat PM-JAY') && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Ayushman PM-JAY
            </span>
          )}
          {hospital.hasBloodBank && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
              <Droplet className="w-3 h-3 text-red-600" />
              Blood Bank
            </span>
          )}
          {hospital.hasEmergencyCasualty && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
              24x7 Casualty
            </span>
          )}
          {hospital.walkInSupported && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
              Walk-in Tokens
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed flex-1">
          {language === 'hi' && hospital.hindiOverview ? hospital.hindiOverview : hospital.overview}
        </p>

        {/* Emergency contact snippet */}
        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-red-600 font-semibold">
            <PhoneCall className="w-3 h-3" />
            Casualty: {hospital.emergencyNumber}
          </span>
          <span className="text-slate-400 text-[11px]">Beds: {hospital.bedCapacity}</span>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link
            href={`/hospitals/${hospital.id}`}
            className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>{t('viewDetails')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/appointments/book?hospitalId=${hospital.id}`}
            className={`py-2.5 px-3 rounded-xl text-white font-bold text-xs text-center shadow-sm transition-all flex items-center justify-center gap-1.5 ${
              isGovt 
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800' 
                : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>{t('bookNow')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
