'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HOSPITALS } from '@/data/mockData';
import { 
  MapPin, 
  Search, 
  Building2, 
  PhoneCall, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function LocatorPage() {
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<'All' | 'government' | 'private'>('All');

  const filteredHospitals = HOSPITALS.filter(h => {
    const matchSector = sectorFilter === 'All' || h.sector === sectorFilter;
    const matchSearch = searchQuery.trim() === '' ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.locality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
          Interactive Geospatial Map
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Hospital Locator & Direction Finder
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore hospital locations, casualty emergency desks, and turn-by-turn navigation across Delhi NCR, UP, and Bengaluru.
        </p>
      </div>

      {/* 2 Column Layout: Interactive List + Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital or city..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Sector toggle */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSectorFilter('All')}
                className={`py-1.5 rounded-lg transition-all ${sectorFilter === 'All' ? 'bg-white text-blue-700 shadow-sm font-bold' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setSectorFilter('government')}
                className={`py-1.5 rounded-lg transition-all ${sectorFilter === 'government' ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-600'}`}
              >
                Govt
              </button>
              <button
                onClick={() => setSectorFilter('private')}
                className={`py-1.5 rounded-lg transition-all ${sectorFilter === 'private' ? 'bg-purple-600 text-white shadow-sm font-bold' : 'text-slate-600'}`}
              >
                Private
              </button>
            </div>
          </div>

          {/* Hospital List Scrollable */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredHospitals.map(h => {
              const isSelected = selectedHospital?.id === h.id;
              const isGovt = h.sector === 'government';

              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHospital(h)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isGovt ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {h.type}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">{h.opdFee}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{h.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{h.locality}, {h.city}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Map Details (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Map display placeholder with real OpenStreetMap iframe */}
          <div className="flex-1 bg-slate-100 relative min-h-[350px]">
            {selectedHospital ? (
              <iframe
                title="Hospital Map View"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedHospital.longitude - 0.02}%2C${selectedHospital.latitude - 0.02}%2C${selectedHospital.longitude + 0.02}%2C${selectedHospital.latitude + 0.02}&layer=mapnik&marker=${selectedHospital.latitude}%2C${selectedHospital.longitude}`}
                className="w-full h-full border-0"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Select a hospital to view coordinates on map
              </div>
            )}
          </div>

          {/* Selected Hospital Quick Details Footer */}
          {selectedHospital && (
            <div className="p-6 border-t border-slate-200 space-y-4 bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedHospital.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedHospital.address}</p>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.latitude},${selectedHospital.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Navigation</span>
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Casualty Helpline</span>
                  <span className="font-bold text-red-600">{selectedHospital.emergencyNumber}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">OPD Hours</span>
                  <span className="font-bold text-slate-800">{selectedHospital.opdTimings.split('(')[0]}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Registration Fee</span>
                  <span className="font-bold text-slate-800">{selectedHospital.opdFee}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-center">
                  <Link
                    href={`/appointments/book?hospitalId=${selectedHospital.id}`}
                    className="text-blue-600 hover:underline font-bold text-xs text-center"
                  >
                    Book OPD Slot →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
