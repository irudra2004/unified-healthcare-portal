'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Stethoscope, 
  CalendarCheck, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Droplet, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  Activity, 
  HeartHandshake, 
  Sparkles,
  ChevronRight,
  Clock,
  IndianRupee,
  AlertTriangle
} from 'lucide-react';
import { HOSPITALS, MEDICAL_DEPARTMENTS, DOCTORS, HEALTH_SCHEMES } from '@/data/mockData';
import { HospitalCard } from '@/components/HospitalCard';
import { DoctorCard } from '@/components/DoctorCard';

export default function HomePage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/doctors?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const govtHospitals = HOSPITALS.filter(h => h.sector === 'government');
  const privateHospitals = HOSPITALS.filter(h => h.sector === 'private');

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section with Unified Search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6">
        {/* Background glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          {/* Official Portal Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'आयुष्मान भारत डिजिटल मिशन (ABDM) अनुपालित' : 'Ayushman Bharat Digital Mission (ABDM) Aligned'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Hero Headlines */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {language === 'hi' 
                ? 'सरकारी एवं निजी अस्पतालों में डॉक्टर परामर्श व ओपीडी बुकिंग' 
                : 'Unified National Hospital & Doctor Appointment Portal'}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Prominent Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-blue-950/50 flex flex-col sm:flex-row items-center gap-2 border-2 border-white/80">
              <div className="flex items-center gap-3 px-4 py-2 w-full flex-1 text-slate-700">
                <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full text-sm sm:text-base outline-none bg-transparent placeholder:text-slate-400 text-slate-900 font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>{t('searchButton')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Popular:</span>
              <button type="button" onClick={() => router.push('/doctors?dept=cardiology')} className="hover:text-white underline decoration-slate-600">Cardiology</button>
              <span>•</span>
              <button type="button" onClick={() => router.push('/doctors?dept=orthopedics')} className="hover:text-white underline decoration-slate-600">Orthopedics</button>
              <span>•</span>
              <button type="button" onClick={() => router.push('/govt-hospitals?type=AIIMS')} className="hover:text-white underline decoration-slate-600">AIIMS OPD</button>
              <span>•</span>
              <button type="button" onClick={() => router.push('/doctors?dept=pediatrics')} className="hover:text-white underline decoration-slate-600">Child Specialist</button>
            </div>
          </form>

          {/* Quick Metrics Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">100% Free</span>
              <span className="text-xs text-slate-300 font-medium">Govt OPD Registration</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">19+ Depts</span>
              <span className="text-xs text-slate-300 font-medium">Clinical Specialties</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">24x7</span>
              <span className="text-xs text-slate-300 font-medium">Emergency 108/112</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 block">PM-JAY</span>
              <span className="text-xs text-slate-300 font-medium">Ayushman Card Cashless</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Two Large Distinct Division Cards: Government vs Private */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Government Hospital Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500/50 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  PUBLIC HEALTHCARE DIVISION
                </span>
                <span className="text-xs font-semibold text-emerald-200">₹0 - ₹10 OPD Token</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 group-hover:text-emerald-300 transition-colors">
                {t('govtCardTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
                {t('govtCardDesc')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-200 mb-6 bg-black/20 p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AIIMS & Medical Colleges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>District Hospitals & CHCs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Free Generic Medicine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Walk-in + Online Slips</span>
                </div>
              </div>
            </div>

            <Link
              href="/govt-hospitals"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{t('exploreGovt')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Private Hospital Card */}
          <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-500/50 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                  PRIVATE HEALTHCARE DIVISION
                </span>
                <span className="text-xs font-semibold text-purple-200">NABH & JCI Accredited</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 group-hover:text-purple-300 transition-colors">
                {t('privateCardTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed mb-6">
                {t('privateCardDesc')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-purple-200 mb-6 bg-black/20 p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Super-Specialty Centres</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Transparent Fee Roster</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Cashless Insurance TPAs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Teleconsultation Video</span>
                </div>
              </div>
            </div>

            <Link
              href="/private-hospitals"
              className="w-full py-3.5 px-6 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{t('explorePrivate')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Ribbon Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/doctors"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t('findDoctor')}
              </h4>
              <p className="text-[11px] text-slate-500">Rosters & Schedules</p>
            </div>
          </Link>

          <Link
            href="/appointments/book"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {t('bookAppointment')}
              </h4>
              <p className="text-[11px] text-slate-500">Instant OPD Token</p>
            </div>
          </Link>

          <Link
            href="/emergency"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                {t('emergency')}
              </h4>
              <p className="text-[11px] text-slate-500">108 / 112 Ambulance</p>
            </div>
          </Link>

          <Link
            href="/blood-bank"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-500 hover:shadow-md transition-all flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors flex-shrink-0">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                {t('bloodBank')}
              </h4>
              <p className="text-[11px] text-slate-500">Live Component Units</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Popular Medical Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Specialized Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'hi' ? 'प्रमुख चिकित्सा विभाग' : 'Explore Medical Departments'}
            </h2>
          </div>
          <Link
            href="/departments"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>{language === 'hi' ? 'सभी 19 विभाग देखें' : 'View All 19 Departments'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MEDICAL_DEPARTMENTS.slice(0, 6).map((dept) => (
            <Link
              key={dept.id}
              href={`/doctors?dept=${dept.id}`}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {dept.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {dept.treatments[0]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured Government & Private Hospitals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Government Highlights */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? 'प्रमुख सरकारी अस्पताल (मुफ़्त ओपीडी)' : 'Featured Government Hospitals (Free OPD)'}
              </h3>
            </div>
            <Link href="/govt-hospitals" className="text-xs font-bold text-emerald-700 hover:underline">
              {language === 'hi' ? 'सभी सरकारी अस्पताल देखें' : 'View All Public Facilities →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {govtHospitals.slice(0, 3).map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        </div>

        {/* Private Highlights */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600"></span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? 'प्रमुख निजी सुपर-स्पेशियलिटी अस्पताल' : 'Featured Private Super-Specialty Hospitals'}
              </h3>
            </div>
            <Link href="/private-hospitals" className="text-xs font-bold text-purple-700 hover:underline">
              {language === 'hi' ? 'सभी निजी अस्पताल देखें' : 'View All Private Facilities →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateHospitals.slice(0, 3).map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Available Doctors Today */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Confirmed Doctor Duty Rosters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'hi' ? 'उपलब्ध विशेषज्ञ डॉक्टर' : 'Consult with Top Specialists'}
            </h2>
          </div>
          <Link
            href="/doctors"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>{language === 'hi' ? 'सभी डॉक्टर खोजें' : 'View All Doctors'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.slice(0, 3).map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* 7. Government Health Schemes (Ayushman PM-JAY & CGHS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              GOVERNMENT OF INDIA HEALTH SCHEMES
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              {language === 'hi'
                ? 'आयुष्मान भारत पीएम-जय: ₹5,00,000 तक मुफ़्त इलाज'
                : 'Ayushman Bharat PM-JAY: ₹5 Lakh Annual Cashless Health Cover'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? '70 वर्ष या उससे अधिक आयु के सभी वरिष्ठ नागरिकों को अब निःशुल्क स्वास्थ्य सुरक्षा उपलब्ध है। जानिए अपनी पात्रता, जरूरी दस्तावेज और निकटतम संबद्ध अस्पताल।'
                : 'Now universally covers all Senior Citizens aged 70+ years with zero waiting periods. Check your eligibility, required documents, and empaneled hospital network.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/schemes"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'योजनाएं व पात्रता देखें' : 'Explore All Health Schemes'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://beneficiary.nha.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                Check PM-JAY Card Online (NHA)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Announcements & Health Drives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-800 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-950">
                {language === 'hi' ? 'विशेष स्वास्थ्य शिविर एवं टीकाकरण सूचना' : 'Official Health Drives & OPD Announcements'}
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                • <strong>AIIMS New Delhi:</strong> Special Senior Citizen Geriatric OPD counters operational Monday through Saturday in Ground Floor Shatabdi Block.
                <br />
                • <strong>National Immunization:</strong> Pulse Polio and Mission Indradhanush booster vaccines available free at all Community Health Centres (CHCs).
                <br />
                • <strong>Seasonal Advisory:</strong> Fever screening & Dengue rapid NS1 platelet monitoring units are active 24x7 in all district civil hospitals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
