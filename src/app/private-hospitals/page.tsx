'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HOSPITALS } from '@/data/mockData';
import { HospitalCard } from '@/components/HospitalCard';
import { 
  Building2, 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Video, 
  CreditCard,
  AlertCircle
} from 'lucide-react';

export default function PrivateHospitalsPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [onlyNabh, setOnlyNabh] = useState(false);
  const [hasEmergency, setHasEmergency] = useState(false);

  // Filter solely private sector hospitals
  const privateHospitals = useMemo(() => {
    return HOSPITALS.filter(h => h.sector === 'private');
  }, []);

  const cities = useMemo(() => {
    const list = Array.from(new Set(privateHospitals.map(h => h.city)));
    return ['All', ...list];
  }, [privateHospitals]);

  const filteredHospitals = useMemo(() => {
    return privateHospitals.filter(h => {
      const matchSearch = search.trim() === '' || 
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city.toLowerCase().includes(search.toLowerCase()) ||
        h.district.toLowerCase().includes(search.toLowerCase()) ||
        h.locality.toLowerCase().includes(search.toLowerCase()) ||
        h.pincode.includes(search);

      const matchCity = selectedCity === 'All' || h.city === selectedCity;
      const matchNabh = !onlyNabh || h.nabhAccredited;
      const matchEmergency = !hasEmergency || h.hasEmergencyCasualty;

      return matchSearch && matchCity && matchNabh && matchEmergency;
    });
  }, [privateHospitals, search, selectedCity, onlyNabh, hasEmergency]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-purple-500/30">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            {language === 'hi' ? 'निजी स्वास्थ्य सेवा प्रभाग' : 'Private Healthcare Division'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === 'hi' ? 'निजी सुपर-स्पेशियलिटी अस्पताल एवं क्लिनिक' : 'Private Hospitals & Multi-Specialty Healthcare'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            {language === 'hi'
              ? 'एनएबीएच व जेसीआई प्रमाणित निजी अस्पताल, पारदर्शी परामर्श शुल्क, विशेषज्ञ डॉक्टर, कैशलेस मेडिक्लेम टीपीए और ऑनलाइन वीडियो कंसल्टेशन की सुविधा।'
              : 'Search and compare premier NABH & JCI accredited private hospitals. Transparent consultation fees, verified specialist profiles, cashless insurance TPA helpdesk, and online teleconsultation.'}
          </p>
        </div>

        {/* Informative Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-800/80 text-xs">
          <div>
            <span className="font-bold text-white block">Accreditation:</span>
            <span className="text-purple-300 font-semibold">NABH & JCI Gold</span>
          </div>
          <div>
            <span className="font-bold text-white block">Cashless TPA:</span>
            <span className="text-purple-300 font-semibold">Star, HDFC, Care & All</span>
          </div>
          <div>
            <span className="font-bold text-white block">Consultation Modes:</span>
            <span className="text-purple-300 font-semibold">In-Person & Teleconsult</span>
          </div>
          <div>
            <span className="font-bold text-white block">Emergency Unit:</span>
            <span className="text-purple-300 font-semibold">24x7 Comprehensive ER</span>
          </div>
        </div>
      </div>

      {/* Insurance & TPA Advisory Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-950">
              {language === 'hi' ? 'कैशलेस मेडिक्लेम एवं स्वास्थ्य बीमा सुविधा' : 'Cashless Health Insurance & Transparent Pricing'}
            </h4>
            <p className="text-xs text-purple-800 mt-0.5">
              All private hospitals listed below feature 24x7 on-premise TPA insurance coordination desks. Bring your Health Card and Photo ID during OPD or admission for quick cashless pre-authorization.
            </p>
          </div>
        </div>
        <Link
          href="/appointments/book?sector=private"
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm whitespace-nowrap transition-colors"
        >
          {language === 'hi' ? 'निजी डॉक्टर अपॉइंटमेंट बुक करें' : 'Book Private Appointment'}
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search private hospitals by name, locality, or specialty..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div className="w-full md:w-56">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-purple-600 bg-white"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyNabh}
              onChange={(e) => setOnlyNabh(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>NABH Accredited Only</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={hasEmergency}
              onChange={(e) => setHasEmergency(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span>24x7 Emergency Casualty</span>
          </label>

          <span className="ml-auto text-slate-400 font-medium">
            Showing {filteredHospitals.length} Private Facilities
          </span>
        </div>
      </div>

      {/* Hospital Listings Grid */}
      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(h => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Private Hospitals Match Your Filters</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try broadening your search keywords or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCity('All');
              setOnlyNabh(false);
              setHasEmergency(false);
            }}
            className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
