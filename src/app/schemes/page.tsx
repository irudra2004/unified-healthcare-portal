'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HEALTH_SCHEMES } from '@/data/mockData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  PhoneCall, 
  Building2, 
  FileText,
  IndianRupee,
  Users
} from 'lucide-react';

export default function SchemesPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
          Government Health Assurance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'hi' ? 'सरकारी स्वास्थ्य योजनाएं एवं पात्रता' : 'Government Health Schemes & Eligibility'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {language === 'hi'
            ? 'आयुष्मान भारत पीएम-जय, सीजीएचएस, जननी शिशु सुरक्षा और राज्य स्वास्थ्य कोष के अंतर्गत मिलने वाले निःशुल्क इलाज, पात्रता नियम व आवश्यक दस्तावेजों की सम्पूर्ण जानकारी।'
            : 'Comprehensive guidance on Ayushman Bharat PM-JAY, CGHS, JSSK, and state healthcare funds. Verified eligibility criteria, essential documents required, and cashless coverage benefits.'}
        </p>
      </div>

      {/* Schemes List */}
      <div className="space-y-8">
        {HEALTH_SCHEMES.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                  {scheme.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {language === 'hi' && scheme.hindiName ? scheme.hindiName : scheme.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{scheme.ministryOrAuthority}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left sm:text-right w-full sm:w-auto">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Financial Protection</span>
                <span className="text-sm font-black text-emerald-800 block mt-0.5">{scheme.coverageAmount}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{scheme.cashlessHospitalsCount}</span>
              </div>
            </div>

            {/* 3 Column Grid: Key Benefits, Eligibility, Documents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Key Benefits */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-blue-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Key Benefits & Coverage
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {scheme.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-emerald-700">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Who is Eligible?
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {scheme.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-amber-700">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Required Documents
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {scheme.documentsRequired.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Official Link Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                Toll-Free Helpline: <strong>{scheme.tollFreeNumber}</strong>
              </span>

              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Official Portal (Apply / Check Status)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
