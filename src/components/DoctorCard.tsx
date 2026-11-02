'use client';

import React from 'react';
import Link from 'next/link';
import { Doctor } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { 
  User, 
  Building2, 
  GraduationCap, 
  Clock, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  CalendarCheck,
  Video,
  Languages,
  Star
} from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  showScheduleCompact?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, showScheduleCompact = false }) => {
  const { language, t } = useLanguage();
  const isGovt = doctor.sector === 'government';

  const getStatusBadge = () => {
    switch (doctor.availabilityStatus) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            {language === 'hi' ? 'उपलब्ध' : 'Available Today'}
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            {language === 'hi' ? 'अवकाश पर' : 'On Leave'}
          </span>
        );
      case 'Emergency Duty':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            {language === 'hi' ? 'आपातकालीन ड्यूटी' : 'Emergency Duty'}
          </span>
        );
      case 'Slot Full':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {language === 'hi' ? 'स्लॉट पूर्ण' : 'Tokens Full'}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">
      <div>
        {/* Top Header: Avatar + Status + Sector Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-sm flex-shrink-0 ${
              isGovt ? 'bg-gradient-to-tr from-emerald-700 to-teal-500' : 'bg-gradient-to-tr from-purple-700 to-indigo-500'
            }`}>
              {doctor.photoUrl ? (
                <img src={doctor.photoUrl} alt={doctor.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <User className="w-7 h-7" />
              )}
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 line-clamp-1">
                {language === 'hi' && doctor.hindiName ? doctor.hindiName : doctor.name}
              </h4>
              <p className="text-xs text-blue-600 font-semibold">{doctor.designation}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                <span className="text-[11px] text-slate-400">({doctor.reviewsCount} verified reviews)</span>
              </div>
            </div>
          </div>
          <div>
            {getStatusBadge()}
          </div>
        </div>

        {/* Qualifications & Department */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="flex items-center gap-1.5 font-medium">
            <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-800 font-semibold truncate">{doctor.qualifications}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">{doctor.hospitalName}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-700">{doctor.opdRoom}</span>
          </p>
        </div>

        {/* Weekly Schedule Days Pills */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            {language === 'hi' ? 'ओपीडी दिन' : 'Duty Days'}
          </span>
          <div className="flex flex-wrap gap-1">
            {doctor.schedule.map((sch) => (
              <span 
                key={sch.day} 
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200/60"
              >
                {sch.day.substring(0, 3)}: {sch.shifts[0]?.startTime.split(' ')[0]} - {sch.shifts[0]?.endTime.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Consultation Fee & Language */}
        <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100 mb-4">
          <div>
            <span className="text-slate-400 block text-[11px]">{t('consultationFee')}</span>
            <span className={`font-bold text-sm ${isGovt ? 'text-emerald-700' : 'text-purple-700'}`}>
              {doctor.consultationFee === 0 ? 'Free / ₹0 (Govt OPD)' : `₹${doctor.consultationFee}`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">{t('nextAvailable')}</span>
            <span className="font-semibold text-slate-800">{doctor.nextAvailableSlot}</span>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <Link
        href={`/appointments/book?doctorId=${doctor.id}&hospitalId=${doctor.hospitalId}&deptId=${doctor.departmentId}`}
        className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs text-center shadow-sm transition-all flex items-center justify-center gap-2 ${
          doctor.availabilityStatus === 'On Leave'
            ? 'bg-slate-400 cursor-not-allowed pointer-events-none'
            : isGovt
            ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
            : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
        }`}
      >
        <CalendarCheck className="w-4 h-4" />
        <span>{language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book OPD Slot'}</span>
      </Link>
    </div>
  );
};
