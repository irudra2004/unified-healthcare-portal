'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Cross, PhoneCall, ShieldCheck, Heart, ExternalLink, HelpCircle, FileCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Emergency Advisory Box */}
        <div className="bg-gradient-to-r from-red-950/80 via-red-900/60 to-slate-900 border border-red-800/80 rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 flex-shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {language === 'hi' ? 'चिकित्सकीय आपात स्थिति सहायता (24x7)' : 'Critical Medical Emergency Hotline'}
                <span className="text-xs bg-red-600 text-white font-extrabold px-2 py-0.5 rounded">Toll-Free</span>
              </h4>
              <p className="text-xs sm:text-sm text-red-200/90 mt-0.5">
                {language === 'hi' 
                  ? 'गंभीर स्थिति में बिना किसी देरी के 108 या 112 डायल करें। नजदीकी सरकारी व निजी ट्रॉमा सेंटर 24 घंटे खुले हैं।' 
                  : 'For immediate life-saving ambulance dispatch and polytrauma triage, dial 108 or 112 without delay.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/emergency"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 text-center w-full md:w-auto"
            >
              {language === 'hi' ? 'आपातकालीन निर्देशिका खोलें' : 'View Emergency Directory'}
            </Link>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Cross className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                SANJEEVANI CARE
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'भारत का एकीकृत राष्ट्रीय अस्पताल एवं ओपीडी परामर्श पोर्टल। देश भर के सरकारी एवं निजी अस्पतालों में पारदर्शी, डिजिटल व कतार-मुक्त स्वास्थ्य सेवा सुनिश्चित करना हमारा संकल्प है।'
                : 'India unified public and private hospital discovery and OPD appointment ecosystem. Empowering citizens with transparent doctor rosters, verified health schemes, and queue-free clinic tokens.'}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>National Health Authority & Directorate General of Health Services (DGHS) compliant</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>support@sanjeevanicare.gov.in / helpdesk@sanjeevani.org</span>
              </p>
            </div>
          </div>

          {/* Hospital Divisions */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase">
              {language === 'hi' ? 'अस्पताल प्रभाग' : 'Hospital Divisions'}
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/govt-hospitals" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('govtHospitals')}
                </Link>
              </li>
              <li>
                <Link href="/private-hospitals" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  {t('privateHospitals')}
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-blue-400 transition-colors">
                  {t('departments')} (19 Specialties)
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-blue-400 transition-colors">
                  {t('findDoctor')}
                </Link>
              </li>
              <li>
                <Link href="/locator" className="hover:text-blue-400 transition-colors">
                  {t('hospitalLocator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Citizen Healthcare Services */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase">
              {language === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Citizen Services'}
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/appointments/book" className="hover:text-blue-400 transition-colors">
                  {t('bookAppointment')}
                </Link>
              </li>
              <li>
                <Link href="/appointments/my-appointments" className="hover:text-blue-400 transition-colors">
                  {t('myAppointments')}
                </Link>
              </li>
              <li>
                <Link href="/blood-bank" className="hover:text-red-400 transition-colors">
                  {t('bloodBank')} (Live Stock)
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-emerald-400 transition-colors">
                  {t('schemes')} (Ayushman PM-JAY)
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-red-400 transition-colors">
                  24x7 Ambulance & Casualty
                </Link>
              </li>
            </ul>
          </div>

          {/* Administration & Official Portals */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase">
              {language === 'hi' ? 'प्रशासन एवं पोर्टल' : 'Portals & Admin'}
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/admin/hospital" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Hospital Admin Desk</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/super" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Super Admin Portal</span>
                </Link>
              </li>
              <li>
                <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Ayushman BIS Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cghs.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>CGHS Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://abdm.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>ABDM - Ayushman Bharat Digital</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Sanjeevani Unified Health Portal. Built for Indian Citizen Healthcare Access.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Grievance & Support</Link>
            <span>•</span>
            <span>Accessibility (WCAG 2.1 AA)</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
