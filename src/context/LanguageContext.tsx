'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const TRANSLATIONS: Translations = {
  // Navigation & Branding
  portalName: {
    en: 'Sanjeevani Health Portal',
    hi: 'संजीवनी स्वास्थ्य सेवा पोर्टल'
  },
  portalSubtitle: {
    en: 'Unified National Hospital & OPD Appointment System',
    hi: 'एकीकृत राष्ट्रीय अस्पताल एवं ओपीडी परामर्श प्रणाली'
  },
  home: { en: 'Home', hi: 'होम' },
  govtHospitals: { en: 'Government Hospitals', hi: 'सरकारी अस्पताल' },
  privateHospitals: { en: 'Private Hospitals', hi: 'निजी अस्पताल' },
  departments: { en: 'Departments', hi: 'चिकित्सा विभाग' },
  findDoctor: { en: 'Find a Doctor', hi: 'डॉक्टर खोजें' },
  bookAppointment: { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  myAppointments: { en: 'My Appointments', hi: 'मेरी नियुक्तियां' },
  emergency: { en: 'Emergency 24x7', hi: 'आपातकालीन 24x7' },
  bloodBank: { en: 'Blood Bank', hi: 'ब्लड बैंक' },
  schemes: { en: 'Health Schemes', hi: 'स्वास्थ्य योजनाएं' },
  hospitalLocator: { en: 'Hospital Locator', hi: 'अस्पताल खोजक नक्शा' },
  adminDashboard: { en: 'Hospital Admin', hi: 'अस्पताल एडमिन' },
  superAdmin: { en: 'Super Admin', hi: 'सुपर एडमिन' },
  aboutUs: { en: 'About Us', hi: 'हमारे बारे में' },
  contactUs: { en: 'Helpdesk & Grievance', hi: 'सहायता एवं संपर्क' },

  // Hero Section
  heroTitle: {
    en: 'Unified Healthcare Access for Every Indian Citizen',
    hi: 'हर नागरिक के लिए सुलभ, पारदर्शी और त्वरित स्वास्थ्य सेवा'
  },
  heroSubtitle: {
    en: 'Connect seamlessly with public and private healthcare facilities. Check live doctor rosters, verify government health schemes, and book OPD tokens instantly without queueing.',
    hi: 'सरकारी और निजी अस्पतालों से सीधे जुड़ें। डॉक्टरों की उपलब्धता जांचें, सरकारी योजनाओं का लाभ लें और बिना लंबी कतार के ओपीडी टोकन बुक करें।'
  },
  searchPlaceholder: {
    en: 'Search hospitals, doctors, departments, city or pin code...',
    hi: 'अस्पताल, डॉक्टर का नाम, विभाग, शहर या पिन कोड खोजें...'
  },
  searchButton: { en: 'Search', hi: 'खोजें' },

  // Quick Action Cards
  govtCardTitle: { en: 'Government Hospitals Division', hi: 'सरकारी अस्पताल प्रभाग' },
  govtCardDesc: {
    en: 'Explore AIIMS, Medical Colleges, District Hospitals & PHCs. 100% Free / Nominal OPD registration, generic medicines, and Ayushman Bharat PM-JAY coverage.',
    hi: 'एम्स, मेडिकल कॉलेज, जिला अस्पताल व प्राथमिक स्वास्थ्य केंद्र खोजें। निःशुल्क ओपीडी टोकन, जन औषधि दवाइयां व आयुष्मान भारत योजना।'
  },
  privateCardTitle: { en: 'Private Hospitals Division', hi: 'निजी अस्पताल प्रभाग' },
  privateCardDesc: {
    en: 'Discover multi-specialty hospitals, NABH-accredited facilities, transparent consultation fees, cashless insurance TPA, and online teleconsultation.',
    hi: 'सुपर स्पेशियलिटी अस्पताल खोजें। पारदर्शी परामर्श शुल्क, कैशलेस स्वास्थ्य बीमा, एनएबीएच मान्यता और ऑनलाइन वीडियो परामर्श।'
  },
  exploreGovt: { en: 'Explore Government Hospitals', hi: 'सरकारी अस्पताल देखें' },
  explorePrivate: { en: 'Explore Private Hospitals', hi: 'निजी अस्पताल देखें' },

  // Common UI
  filterBy: { en: 'Filter By', hi: 'फ़िल्टर करें' },
  allStates: { en: 'All States', hi: 'सभी राज्य' },
  allDistricts: { en: 'All Districts / Cities', hi: 'सभी जिले / शहर' },
  allTypes: { en: 'All Hospital Types', hi: 'सभी प्रकार के अस्पताल' },
  verifiedBadge: { en: 'Verified Facility', hi: 'सत्यापित संस्थान' },
  nabhBadge: { en: 'NABH Accredited', hi: 'एनएबीएच मान्यता प्राप्त' },
  freeOpdBadge: { en: 'Free / ₹0 OPD Fee', hi: 'निःशुल्क ओपीडी' },
  pmjayAccepted: { en: 'Ayushman PM-JAY Empaneled', hi: 'आयुष्मान भारत संबद्ध' },
  viewDetails: { en: 'View Hospital Profile', hi: 'अस्पताल विवरण देखें' },
  bookNow: { en: 'Book OPD Slot', hi: 'ओपीडी स्लॉट बुक करें' },
  emergencyCall: { en: 'Casualty / Emergency Desk', hi: 'आपातकालीन डेस्क' },
  opdHours: { en: 'OPD Hours', hi: 'ओपीडी समय' },
  consultationFee: { en: 'Consultation Fee', hi: 'परामर्श शुल्क' },
  qualifications: { en: 'Qualifications', hi: 'योग्यता' },
  experience: { en: 'Experience', hi: 'अनुभव' },
  years: { en: 'years', hi: 'वर्ष' },
  availableToday: { en: 'Available Today', hi: 'आज उपलब्ध' },
  nextAvailable: { en: 'Next Available', hi: 'अगला उपलब्ध स्लॉट' },
  status: { en: 'Status', hi: 'स्थिति' },
  emergencyNotice: {
    en: 'For life-threatening emergencies, dial 112 or 108 immediately. This portal is for outpatient appointments and non-critical care.',
    hi: 'गंभीर आपात स्थिति में तुरंत 112 या 108 डायल करें। यह पोर्टल ओपीडी परामर्श और सामान्य चिकित्सकीय सेवाओं हेतु है।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('sanjeevani_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sanjeevani_lang', lang);
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language] || TRANSLATIONS[key]['en'] || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
