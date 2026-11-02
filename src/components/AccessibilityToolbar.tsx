'use client';

import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import { Volume2, VolumeX, Eye, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const AccessibilityToolbar: React.FC = () => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    speakText,
    isSpeaking,
    stopSpeaking
  } = useAccessibility();

  const { language, setLanguage, t } = useLanguage();

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const summary = language === 'hi' 
        ? 'संजीवनी स्वास्थ्य पोर्टल में आपका स्वागत है। यहां आप सरकारी और निजी अस्पतालों में डॉक्टरों की ओपीडी अपॉइंटमेंट बुक कर सकते हैं। आपातकालीन सहायता के लिए 108 डायल करें।'
        : 'Welcome to Sanjeevani Health Portal. Book OPD appointments in Government and Private hospitals. For emergency ambulance, dial 108.';
      speakText(summary);
    }
  };

  return (
    <div className="accessibility-bar bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Emergency Alert Banner */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full text-xs animate-pulse">
            <PhoneCall className="w-3 h-3" />
            24x7 Emergency: 108 / 112
          </span>
          <span className="hidden sm:inline text-slate-400">
            {language === 'hi' ? 'आपातकालीन एम्बुलेंस व ट्रॉमा सहायता' : 'Toll-free National Ambulance & Trauma Helpline'}
          </span>
        </div>

        {/* Right: Accessibility Controls & Language */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Read Aloud */}
          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
              isSpeaking ? 'bg-amber-500 text-black border-amber-400' : 'hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Read text aloud for accessibility"
            aria-label="Text to speech reader"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isSpeaking ? 'Stop Audio' : 'Screen Reader'}</span>
          </button>

          {/* High Contrast Mode */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
              highContrast ? 'bg-yellow-400 text-black font-bold border-yellow-300' : 'hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Toggle High Contrast Mode"
            aria-label="High contrast view"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">High Contrast</span>
          </button>

          {/* Font Resizing Controls */}
          <div className="flex items-center border border-slate-700 rounded overflow-hidden">
            <button
              onClick={decreaseFontSize}
              className={`px-1.5 py-0.5 hover:bg-slate-800 font-semibold ${fontSize === 'sm' ? 'text-cyan-400' : 'text-slate-300'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={resetFontSize}
              className={`px-1.5 py-0.5 hover:bg-slate-800 font-semibold border-x border-slate-700 ${fontSize === 'md' ? 'text-cyan-400' : 'text-slate-300'}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={increaseFontSize}
              className={`px-1.5 py-0.5 hover:bg-slate-800 font-semibold ${fontSize === 'lg' || fontSize === 'xl' ? 'text-cyan-400' : 'text-slate-300'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                language === 'en' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                language === 'hi' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
