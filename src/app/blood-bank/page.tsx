'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BLOOD_STOCK } from '@/data/mockData';
import { 
  Droplet, 
  Search, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Building2,
  MapPin
} from 'lucide-react';

export default function BloodBankPage() {
  const { language } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchCity, setSearchCity] = useState<string>('');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredStock = useMemo(() => {
    return BLOOD_STOCK.filter(b => {
      const matchGroup = selectedGroup === 'All' || b.bloodGroup === selectedGroup;
      const matchCity = searchCity.trim() === '' || 
        b.city.toLowerCase().includes(searchCity.toLowerCase()) ||
        b.hospitalName.toLowerCase().includes(searchCity.toLowerCase());
      return matchGroup && matchCity;
    });
  }, [selectedGroup, searchCity]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 via-red-900 to-rose-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-rose-500/30">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            e-Raktkosh Aligned Live Roster
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === 'hi' ? 'ब्लड बैंक एवं रक्त उपलब्धता निर्देशिका' : 'Blood Bank & Component Availability'}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
            Verified real-time whole blood, PRBC, and platelet unit reserves across public, private, and Red Cross transfusion centres.
          </p>
        </div>
      </div>

      {/* Blood Group Quick Select Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Filter by Blood Group:
        </label>
        <div className="flex flex-wrap gap-2">
          {bloodGroups.map(bg => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedGroup === bg
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* City search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Filter by city (e.g. New Delhi, Lucknow, Bengaluru) or hospital name..."
          className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder:text-slate-400 text-slate-800 font-medium"
        />
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStock.map(stock => (
          <div
            key={stock.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center font-black text-lg text-rose-600">
                  {stock.bloodGroup}
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 block">{stock.unitsAvailable} Units</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    Updated {stock.lastUpdated}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">{stock.hospitalName}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{stock.city}, {stock.state}</span>
              </p>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                stock.hospitalType === 'Government' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : stock.hospitalType === 'Red Cross'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {stock.hospitalType} Blood Bank
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Stock
              </span>
              <a
                href={`tel:${stock.contactNumber}`}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
