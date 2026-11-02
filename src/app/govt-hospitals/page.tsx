'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HOSPITALS } from '@/data/mockData';
import { ALL_INDIAN_STATES_AND_UTS } from '@/data/states';
import { HospitalCard } from '@/components/HospitalCard';
import { 
  Building2, 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle,
  FileText,
  Map,
  RotateCcw
} from 'lucide-react';

export default function GovtHospitalsPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [onlyPmjay, setOnlyPmjay] = useState(false);
  const [onlyBloodBank, setOnlyBloodBank] = useState(false);

  // Filter solely government sector hospitals
  const govtHospitals = useMemo(() => {
    return HOSPITALS.filter(h => h.sector === 'government');
  }, []);

  const types = useMemo(() => {
    const list = Array.from(new Set(govtHospitals.map(h => h.type)));
    return ['All', ...list];
  }, [govtHospitals]);

  const filteredHospitals = useMemo(() => {
    return govtHospitals.filter(h => {
      const matchSearch = search.trim() === '' || 
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city.toLowerCase().includes(search.toLowerCase()) ||
        h.district.toLowerCase().includes(search.toLowerCase()) ||
        h.locality.toLowerCase().includes(search.toLowerCase()) ||
        h.pincode.includes(search);

      const matchState = selectedState === 'All' || h.state.toLowerCase() === selectedState.toLowerCase();
      const matchType = selectedType === 'All' || h.type === selectedType;
      const matchPmjay = !onlyPmjay || h.schemesAccepted.includes('Ayushman Bharat PM-JAY');
      const matchBloodBank = !onlyBloodBank || h.hasBloodBank;

      return matchSearch && matchState && matchType && matchPmjay && matchBloodBank;
    });
  }, [govtHospitals, search, selectedState, selectedType, onlyPmjay, onlyBloodBank]);

  // Quick State filter helper
  const handleStateClick = (stateName: string) => {
    if (selectedState === stateName) {
      setSelectedState('All');
    } else {
      setSelectedState(stateName);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-emerald-500/30">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {language === 'hi' ? 'अखिल भारतीय सार्वजनिक स्वास्थ्य सेवा प्रभाग' : 'Pan-India Public Healthcare Directory'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === 'hi' ? 'सभी 28 राज्यों एवं 8 केंद्र शासित प्रदेशों के सरकारी अस्पताल' : 'Government Hospitals Across All 28 States & 8 UTs of India'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {language === 'hi'
              ? 'एम्स, केंद्रीय स्वायत्त संस्थान (पीजीआईएमईआर, जिपमेर, नेग्रिम्स, रिम्स), शीर्ष राजकीय मेडिकल कॉलेज और जिला अस्पतालों की संपूर्ण एवं सत्यापित सूची। ओपीडी समय, डॉक्टरों की सूची और निःशुल्क स्वास्थ्य सेवाएं।'
              : 'Browse AIIMS, Institutes of National Importance (PGIMER, JIPMER, NEIGRIHMS, RIMS), State Medical Colleges, and District Hospitals across every single Indian state and Union Territory.'}
          </p>
        </div>

        {/* Informative Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/80 text-xs">
          <div>
            <span className="font-bold text-white block">Covered Regions:</span>
            <span className="text-emerald-300 font-semibold">28 States + 8 UTs</span>
          </div>
          <div>
            <span className="font-bold text-white block">OPD Registration Fee:</span>
            <span className="text-emerald-300 font-semibold">100% Free / ₹1 - ₹10</span>
          </div>
          <div>
            <span className="font-bold text-white block">PM-JAY Coverage:</span>
            <span className="text-emerald-300 font-semibold">Universal Cashless</span>
          </div>
          <div>
            <span className="font-bold text-white block">Casualty & Trauma:</span>
            <span className="text-emerald-300 font-semibold">24x7 Active</span>
          </div>
        </div>
      </div>

      {/* State & Union Territory Quick Selection Strip */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Browse Government Hospitals by State / Union Territory (36 States & UTs):
            </h3>
          </div>
          {selectedState !== 'All' && (
            <button
              onClick={() => setSelectedState('All')}
              className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset State ({selectedState})
            </button>
          )}
        </div>

        {/* State Pill Clouds */}
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedState('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedState === 'All'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All States & UTs ({govtHospitals.length})
          </button>
          {ALL_INDIAN_STATES_AND_UTS.map((stateName) => {
            const count = govtHospitals.filter(h => h.state.toLowerCase() === stateName.toLowerCase()).length;
            const isSelected = selectedState.toLowerCase() === stateName.toLowerCase();
            return (
              <button
                key={stateName}
                onClick={() => handleStateClick(stateName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : count > 0
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>{stateName}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white text-emerald-800' : 'bg-emerald-200 text-emerald-950'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
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
              placeholder="Search by government hospital name, city, locality, district or pin code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 bg-white"
            >
              <option value="All">All States & UTs (36)</option>
              {ALL_INDIAN_STATES_AND_UTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 bg-white"
            >
              {types.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Hospital Types' : t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyPmjay}
              onChange={(e) => setOnlyPmjay(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Ayushman PM-JAY Empaneled</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyBloodBank}
              onChange={(e) => setOnlyBloodBank(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Has Blood Bank</span>
          </label>

          <span className="ml-auto text-slate-500 font-bold">
            Showing {filteredHospitals.length} Government Healthcare Facilities {selectedState !== 'All' ? `in ${selectedState}` : 'Pan-India'}
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
          <h3 className="text-base font-bold text-slate-800">
            No Government Hospitals Match Your Selected Filter ({selectedState})
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your search query or view all states and union territories.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedState('All');
              setSelectedType('All');
              setOnlyPmjay(false);
              setOnlyBloodBank(false);
            }}
            className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
