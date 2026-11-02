'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MEDICAL_DEPARTMENTS, DOCTORS, HOSPITALS } from '@/data/mockData';
import { 
  Activity, 
  Search, 
  Stethoscope, 
  Building2, 
  CalendarCheck, 
  ChevronRight, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function DepartmentsPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredDepts = useMemo(() => {
    return MEDICAL_DEPARTMENTS.filter(d => {
      const matchSearch = search.trim() === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        (d.hindiName && d.hindiName.includes(search)) ||
        d.treatments.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        d.commonSymptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
      return matchSearch;
    });
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
          Specialized Clinical Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'hi' ? 'चिकित्सा विभाग एवं विशिष्टताएं' : 'Medical Departments & Clinical Specialties'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {language === 'hi'
            ? 'अपनी बीमारी, लक्षण या आवश्यक उपचार के अनुसार विभाग चुनें। प्रत्येक विभाग में सरकारी व निजी अस्पतालों के विशेषज्ञ डॉक्टरों की ड्यूटी सूची व ओपीडी अपॉइंटमेंट उपलब्ध है।'
            : 'Find verified specialists by clinical department. Review common symptoms treated, clinical diagnostic procedures, and real-time doctor availability rosters across public and private hospitals.'}
        </p>

        {/* Search input */}
        <div className="max-w-lg mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by department, symptom (e.g. chest pain, fever), or procedure..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Grid of 19 departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => {
          const deptDocs = DOCTORS.filter(d => d.departmentId === dept.id);
          const govtDocs = deptDocs.filter(d => d.sector === 'government');
          const privateDocs = deptDocs.filter(d => d.sector === 'private');

          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {deptDocs.length} Active Rosters
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-blue-700 font-medium mb-2">
                  {dept.hindiName}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {language === 'hi' && dept.hindiDescription ? dept.hindiDescription : dept.description}
                </p>

                {/* Common Symptoms */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Common Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dept.commonSymptoms.slice(0, 3).map((sym) => (
                      <span key={sym} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Treatments */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Key Treatments & Procedures:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dept.treatments.slice(0, 2).map((trt) => (
                      <span key={trt} className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-100">
                        {trt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 mt-auto">
                <Link
                  href={`/doctors?dept=${dept.id}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Doctors</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/appointments/book?deptId=${dept.id}`}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book OPD</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
