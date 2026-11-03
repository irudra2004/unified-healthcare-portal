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
  AlertCircle,
  Map,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Layers,
} from 'lucide-react';

type ViewMode = 'grid' | 'district';

export default function GovtHospitalsPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [onlyPmjay, setOnlyPmjay] = useState(false);
  const [onlyBloodBank, setOnlyBloodBank] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('district');
  const [expandedDistricts, setExpandedDistricts] = useState<Set<string>>(new Set());

  // Filter solely government sector hospitals
  const govtHospitals = useMemo(() => {
    return HOSPITALS.filter(h => h.sector === 'government');
  }, []);

  const types = useMemo(() => {
    const list = Array.from(new Set(govtHospitals.map(h => h.type)));
    return ['All', ...list.sort()];
  }, [govtHospitals]);

  const filteredHospitals = useMemo(() => {
    return govtHospitals.filter(h => {
      const q = search.trim().toLowerCase();
      const matchSearch = q === '' ||
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.district.toLowerCase().includes(q) ||
        h.locality.toLowerCase().includes(q) ||
        h.pincode.includes(q);

      const matchState = selectedState === 'All' || h.state.toLowerCase() === selectedState.toLowerCase();
      const matchType = selectedType === 'All' || h.type === selectedType;
      const matchPmjay = !onlyPmjay || h.schemesAccepted.includes('Ayushman Bharat PM-JAY');
      const matchBloodBank = !onlyBloodBank || h.hasBloodBank;

      return matchSearch && matchState && matchType && matchPmjay && matchBloodBank;
    });
  }, [govtHospitals, search, selectedState, selectedType, onlyPmjay, onlyBloodBank]);

  // Build State → District → Hospitals tree
  const stateDistrictTree = useMemo(() => {
    const tree: Record<string, Record<string, typeof filteredHospitals>> = {};
    for (const h of filteredHospitals) {
      if (!tree[h.state]) tree[h.state] = {};
      if (!tree[h.state][h.district]) tree[h.state][h.district] = [];
      tree[h.state][h.district].push(h);
    }
    return tree;
  }, [filteredHospitals]);

  const sortedStates = useMemo(() => Object.keys(stateDistrictTree).sort(), [stateDistrictTree]);

  const toggleDistrict = (key: string) => {
    setExpandedDistricts(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAllDistricts = () => {
    const keys: string[] = [];
    for (const state of sortedStates) {
      for (const district of Object.keys(stateDistrictTree[state])) {
        keys.push(`${state}__${district}`);
      }
    }
    setExpandedDistricts(new Set(keys));
  };

  const collapseAllDistricts = () => setExpandedDistricts(new Set());

  const handleStateClick = (stateName: string) => {
    if (selectedState === stateName) {
      setSelectedState('All');
    } else {
      setSelectedState(stateName);
      // auto-expand all districts for this state
      const tree = stateDistrictTree;
      if (tree[stateName]) {
        const keys = Object.keys(tree[stateName]).map(d => `${stateName}__${d}`);
        setExpandedDistricts(new Set(keys));
      }
    }
  };

  const stateHospitalCount = (stateName: string) =>
    govtHospitals.filter(h => h.state.toLowerCase() === stateName.toLowerCase()).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">

      {/* ── Banner ── */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-emerald-500/30">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {language === 'hi' ? 'अखिल भारतीय सार्वजनिक स्वास्थ्य सेवा प्रभाग' : 'Pan-India Public Healthcare Directory'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === 'hi'
              ? 'सभी 28 राज्यों एवं 8 केंद्र शासित प्रदेशों के सरकारी अस्पताल'
              : 'Government Hospitals — All 28 States & 8 UTs of India'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {language === 'hi'
              ? 'एम्स, पीजीआईएमईआर, जिपमेर, नेग्रिम्स, रिम्स, शीर्ष राजकीय मेडिकल कॉलेज एवं जिला अस्पतालों की जिलेवार संपूर्ण सत्यापित सूची।'
              : 'Browse AIIMS, PGIMER, JIPMER, NEIGRIHMS, RIMS and all State Medical Colleges & District Hospitals, arranged district-wise inside each state.'}
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/80 text-xs">
          <div>
            <span className="font-bold text-white block">Verified Hospitals:</span>
            <span className="text-emerald-300 font-semibold">{govtHospitals.length}+ Facilities</span>
          </div>
          <div>
            <span className="font-bold text-white block">OPD Registration:</span>
            <span className="text-emerald-300 font-semibold">100% Free / ₹1–₹10</span>
          </div>
          <div>
            <span className="font-bold text-white block">PM-JAY Coverage:</span>
            <span className="text-emerald-300 font-semibold">Universal Cashless</span>
          </div>
          <div>
            <span className="font-bold text-white block">Casualty & Trauma:</span>
            <span className="text-emerald-300 font-semibold">24×7 Active</span>
          </div>
        </div>
      </div>

      {/* ── State quick-select strip ── */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Select State / Union Territory
            </h3>
          </div>
          {selectedState !== 'All' && (
            <button
              onClick={() => { setSelectedState('All'); collapseAllDistricts(); }}
              className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear ({selectedState})
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => { setSelectedState('All'); collapseAllDistricts(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedState === 'All'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All States & UTs ({govtHospitals.length})
          </button>
          {ALL_INDIAN_STATES_AND_UTS.map((stateName) => {
            const count = stateHospitalCount(stateName);
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
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-400 border border-slate-200 opacity-60'
                }`}
              >
                <span>{stateName}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 rounded-full font-bold ${
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

      {/* ── Search, Filter, View Mode ── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by hospital name, district, city, locality, or pin code…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); collapseAllDistricts(); }}
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

        {/* Toggles + View Mode + Count */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyPmjay}
              onChange={(e) => setOnlyPmjay(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PM-JAY Empaneled Only</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyBloodBank}
              onChange={(e) => setOnlyBloodBank(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>🩸 Has Blood Bank</span>
          </label>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-slate-500 font-bold">
              {filteredHospitals.length} facilities{selectedState !== 'All' ? ` in ${selectedState}` : ' pan-India'}
            </span>
            {/* View toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
              <button
                onClick={() => setViewMode('district')}
                title="District-wise view"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === 'district' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                District View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {filteredHospitals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No Government Hospitals Match Your Filter
            {selectedState !== 'All' ? ` in ${selectedState}` : ''}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your search query or selecting a different state.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedState('All');
              setSelectedType('All');
              setOnlyPmjay(false);
              setOnlyBloodBank(false);
              collapseAllDistricts();
            }}
            className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── Grid View ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(h => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      ) : (
        /* ── District-wise Accordion View ── */
        <div className="space-y-6">
          {/* Expand / collapse all */}
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              State → District → Hospitals
            </h2>
            <div className="flex gap-2 text-xs">
              <button
                onClick={expandAllDistricts}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold hover:bg-emerald-100"
              >
                Expand All
              </button>
              <button
                onClick={collapseAllDistricts}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 font-semibold hover:bg-slate-200"
              >
                Collapse All
              </button>
            </div>
          </div>

          {sortedStates.map(state => {
            const districts = Object.keys(stateDistrictTree[state]).sort();
            const totalInState = districts.reduce(
              (acc, d) => acc + stateDistrictTree[state][d].length, 0
            );

            return (
              <div key={state} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* State header */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 border-b border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900">{state}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {districts.length} district{districts.length !== 1 ? 's' : ''} · {totalInState} hospital{totalInState !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-200">
                    {totalInState} Hospitals
                  </span>
                </div>

                {/* Districts inside state */}
                <div className="divide-y divide-slate-100">
                  {districts.map(district => {
                    const key = `${state}__${district}`;
                    const districtHospitals = stateDistrictTree[state][district];
                    const isOpen = expandedDistricts.has(key);

                    return (
                      <div key={key}>
                        {/* District toggle button */}
                        <button
                          onClick={() => toggleDistrict(key)}
                          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left group"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <div>
                              <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                                📍 {district} District
                              </span>
                              <span className="ml-2 text-xs text-slate-400 font-medium">
                                ({districtHospitals.length} hospital{districtHospitals.length !== 1 ? 's' : ''})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Type badges */}
                            <div className="hidden sm:flex flex-wrap gap-1 max-w-xs justify-end">
                              {Array.from(new Set(districtHospitals.map(h => h.type))).slice(0, 2).map(type => (
                                <span
                                  key={type}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200"
                                >
                                  {type.replace('Government ', '').replace(' / National Institute', ' (National)')}
                                </span>
                              ))}
                            </div>
                            {isOpen
                              ? <ChevronDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              : <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            }
                          </div>
                        </button>

                        {/* Hospitals grid (expanded) */}
                        {isOpen && (
                          <div className="px-4 pb-5 pt-2 bg-slate-50/60">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {districtHospitals.map(h => (
                                <HospitalCard key={h.id} hospital={h} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
