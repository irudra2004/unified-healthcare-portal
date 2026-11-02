'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EMERGENCY_CONTACTS, HOSPITALS } from '@/data/mockData';
import { 
  PhoneCall, 
  AlertTriangle, 
  HeartHandshake, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  HelpCircle,
  FileWarning
} from 'lucide-react';

export default function EmergencyPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'National Ambulance', 'Specialized Helplines'];

  const filteredContacts = EMERGENCY_CONTACTS.filter(c => {
    return selectedCategory === 'All' || c.category === selectedCategory;
  });

  const casualtyHospitals = HOSPITALS.filter(h => h.hasEmergencyCasualty);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Critical Medical Disclaimer Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
          <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
            24x7 Critical Medical Assistance
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          {language === 'hi' ? 'आपातकालीन चिकित्सा एवं एम्बुलेंस निर्देशिका' : 'Emergency & Trauma Lifeline Directory'}
        </h1>
        <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'महत्वपूर्ण सूचना: यह वेबसाइट सामान्य ओपीडी नियुक्तियों के लिए है। किसी भी जानलेवा आपात स्थिति (जैसे दिल का दौरा, गंभीर दुर्घटना या सांस लेने में तकलीफ) में तुरंत 112 या 108 डायल करें।'
            : 'IMPORTANT DISCLAIMER: This web portal is an outpatient OPD discovery platform and NOT a substitute for acute emergency medical services. In life-threatening emergencies, dial 112 or 108 immediately.'}
        </p>

        {/* Primary Click-to-Call Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <a
            href="tel:108"
            className="p-4 rounded-2xl bg-white text-slate-900 font-black text-center shadow-lg hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1 active:scale-95"
          >
            <span className="text-2xl text-red-600 flex items-center gap-1.5">
              <PhoneCall className="w-6 h-6 animate-pulse" />
              108
            </span>
            <span className="text-xs text-slate-700 font-bold">National Medical Ambulance</span>
          </a>

          <a
            href="tel:112"
            className="p-4 rounded-2xl bg-white text-slate-900 font-black text-center shadow-lg hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1 active:scale-95"
          >
            <span className="text-2xl text-blue-600 flex items-center gap-1.5">
              <PhoneCall className="w-6 h-6 animate-pulse" />
              112
            </span>
            <span className="text-xs text-slate-700 font-bold">Unified Emergency Response</span>
          </a>

          <a
            href="tel:102"
            className="p-4 rounded-2xl bg-white text-slate-900 font-black text-center shadow-lg hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1 active:scale-95"
          >
            <span className="text-2xl text-emerald-600 flex items-center gap-1.5">
              <PhoneCall className="w-6 h-6 animate-pulse" />
              102
            </span>
            <span className="text-xs text-slate-700 font-bold">Maternal & Infant Ambulance</span>
          </a>
        </div>
      </div>

      {/* Verified National Emergency Contacts */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Verified National Healthcare Helplines
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official 24x7 toll-free hotlines supported by Government of India authorities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2 mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'hi' && contact.hindiService ? contact.hindiService : contact.service}
                  </h4>
                  {contact.is24x7 && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase flex-shrink-0">
                      24x7 Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi' && contact.hindiDescription ? contact.hindiDescription : contact.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{contact.category}</span>
                <a
                  href={`tel:${contact.number.split('/')[0].trim().replace(/\s+/g, '')}`}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-black text-sm rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {contact.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 24x7 Hospital Casualty & Trauma Centres */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            24x7 Hospital Casualty & Trauma Desks
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct casualty desk phone numbers for emergency department patient admission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {casualtyHospitals.map(h => (
            <div key={h.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  h.sector === 'government' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {h.type}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{h.name}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{h.locality}, {h.city}</span>
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-500 block uppercase">Casualty Desk</span>
                  <span className="text-xs font-bold text-red-800">{h.emergencyNumber}</span>
                </div>
                <a
                  href={`tel:${h.emergencyNumber}`}
                  className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  title="Call Casualty"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
