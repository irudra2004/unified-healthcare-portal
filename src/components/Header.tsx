'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Stethoscope, 
  CalendarCheck, 
  Search, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  Cross, 
  HeartPulse,
  Droplet,
  MapPin,
  FileText,
  UserCheck
} from 'lucide-react';
import { AccessibilityToolbar } from './AccessibilityToolbar';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/govt-hospitals', label: t('govtHospitals'), isGovt: true },
    { href: '/private-hospitals', label: t('privateHospitals'), isPrivate: true },
    { href: '/departments', label: t('departments') },
    { href: '/doctors', label: t('findDoctor') },
    { href: '/appointments/book', label: t('bookAppointment'), highlight: true },
    { href: '/appointments/my-appointments', label: t('myAppointments') },
    { href: '/emergency', label: t('emergency'), isEmergency: true },
  ];

  const secondaryLinks = [
    { href: '/blood-bank', label: t('bloodBank'), icon: Droplet },
    { href: '/schemes', label: t('schemes'), icon: ShieldCheck },
    { href: '/locator', label: t('hospitalLocator'), icon: MapPin },
    { href: '/admin/hospital', label: t('adminDashboard'), icon: Building2 },
    { href: '/admin/super', label: t('superAdmin'), icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <AccessibilityToolbar />

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cross className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {language === 'hi' ? 'संजीवनी' : 'SANJEEVANI'}
                </span>
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wider">
                  Care
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {language === 'hi' 
                  ? 'एकीकृत राष्ट्रीय अस्पताल एवं ओपीडी पोर्टल' 
                  : 'Unified Government & Private Healthcare Portal'}
              </p>
            </div>
          </Link>

          {/* Center: Dual Divisions Badge Pill */}
          <div className="hidden lg:flex items-center p-1 bg-slate-100/90 rounded-full border border-slate-200 text-xs font-semibold">
            <Link 
              href="/govt-hospitals" 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                pathname === '/govt-hospitals' 
                  ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                  : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {t('govtHospitals')}
            </Link>
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <Link 
              href="/private-hospitals" 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                pathname === '/private-hospitals' 
                  ? 'bg-purple-600 text-white shadow-sm font-bold' 
                  : 'text-purple-800 hover:bg-purple-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              {t('privateHospitals')}
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/doctors"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors border border-transparent hover:border-blue-200"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>{t('findDoctor')}</span>
            </Link>

            <Link
              href="/appointments/book"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('bookAppointment')}</span>
            </Link>

            <Link
              href="/emergency"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
              title="24x7 Emergency Services"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>108 / 112</span>
            </Link>
          </div>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1 flex-wrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : link.isEmergency
                      ? 'text-red-600 font-bold hover:bg-red-50'
                      : link.isGovt
                      ? 'text-emerald-700 font-semibold hover:bg-emerald-50'
                      : link.isPrivate
                      ? 'text-purple-700 font-semibold hover:bg-purple-50'
                      : 'hover:bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            {secondaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Link
              href="/govt-hospitals"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex flex-col items-center justify-center text-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              {t('govtHospitals')}
            </Link>
            <Link
              href="/private-hospitals"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-bold text-xs flex flex-col items-center justify-center text-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              {t('privateHospitals')}
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === link.href ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              Healthcare Modules
            </div>
            {secondaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/appointments/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-lg shadow"
            >
              {t('bookAppointment')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
