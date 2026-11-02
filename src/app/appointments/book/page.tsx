'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { HOSPITALS, MEDICAL_DEPARTMENTS, DOCTORS } from '@/data/mockData';
import { Appointment, Sector } from '@/types';
import { ReceiptModal } from '@/components/ReceiptModal';
import { 
  CalendarCheck, 
  Building2, 
  User, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  IndianRupee,
  PhoneCall,
  Check
} from 'lucide-react';

export default function BookAppointmentPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading OPD Booking Gateway...</div>}>
      <BookAppointmentContent />
    </React.Suspense>
  );
}

function BookAppointmentContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const preHospitalId = searchParams.get('hospitalId') || '';
  const preDeptId = searchParams.get('deptId') || '';
  const preDoctorId = searchParams.get('doctorId') || '';
  const preSector = (searchParams.get('sector') as Sector) || 'government';

  // Step state: 1 to 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [selectedSector, setSelectedSector] = useState<Sector>(preSector);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(preHospitalId);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(preDeptId);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preDoctorId);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-31');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM');
  const [consultationType, setConsultationType] = useState<'In-Person' | 'Teleconsultation'>('In-Person');

  // Patient inputs
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [abhaId, setAbhaId] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [agreeConsent, setAgreeConsent] = useState<boolean>(true);

  // Booking result & Modal
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Auto-fill logic from query parameters
  useEffect(() => {
    if (preHospitalId) {
      const hosp = HOSPITALS.find(h => h.id === preHospitalId);
      if (hosp) {
        setSelectedHospitalId(hosp.id);
        setSelectedSector(hosp.sector);
      }
    }
    if (preDeptId) setSelectedDeptId(preDeptId);
    if (preDoctorId) {
      setSelectedDoctorId(preDoctorId);
      const doc = DOCTORS.find(d => d.id === preDoctorId);
      if (doc) {
        setSelectedHospitalId(doc.hospitalId);
        setSelectedDeptId(doc.departmentId);
        setSelectedSector(doc.sector);
      }
    }
  }, [preHospitalId, preDeptId, preDoctorId]);

  // Filtered lists
  const availableHospitals = useMemo(() => {
    return HOSPITALS.filter(h => h.sector === selectedSector);
  }, [selectedSector]);

  const activeHospital = useMemo(() => {
    return HOSPITALS.find(h => h.id === selectedHospitalId);
  }, [selectedHospitalId]);

  const availableDepartments = useMemo(() => {
    if (!activeHospital) return MEDICAL_DEPARTMENTS;
    return MEDICAL_DEPARTMENTS.filter(d => activeHospital.departments.includes(d.id));
  }, [activeHospital]);

  const availableDoctors = useMemo(() => {
    return DOCTORS.filter(d => {
      const matchHospital = !selectedHospitalId || d.hospitalId === selectedHospitalId;
      const matchDept = !selectedDeptId || d.departmentId === selectedDeptId;
      return matchHospital && matchDept;
    });
  }, [selectedHospitalId, selectedDeptId]);

  const activeDoctor = useMemo(() => {
    return DOCTORS.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // Standard Available Time Slots
  const morningSlots = ['08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoonSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '02:30 PM'];
  const eveningSlots = ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'];

  // Handle Form Submission
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !age.trim() || !phone.trim() || !symptoms.trim()) {
      setErrorMessage('Please fill in all mandatory patient fields.');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const appointmentId = `apt-${Date.now().toString().slice(-6)}`;
      const appointmentNumber = `SJV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const tokenNumber = Math.floor(1 + Math.random() * 35);

      const newAppointment: Appointment = {
        id: appointmentId,
        appointmentNumber,
        sector: selectedSector,
        hospitalId: activeHospital?.id || 'gen-hosp',
        hospitalName: activeHospital?.name || 'Authorized Hospital Centre',
        hospitalAddress: activeHospital?.address || 'Civil Lines, Delhi',
        departmentId: selectedDeptId,
        departmentName: MEDICAL_DEPARTMENTS.find(d => d.id === selectedDeptId)?.name || 'General OPD',
        doctorId: activeDoctor?.id || 'gen-doc',
        doctorName: activeDoctor?.name || 'On-Duty Medical Consultant',
        doctorQualification: activeDoctor?.qualifications || 'MBBS, MD',
        opdRoom: activeDoctor?.opdRoom || 'Room 12, OPD Complex',
        appointmentDate: selectedDate,
        appointmentTime: selectedTimeSlot,
        slotPeriod: selectedTimeSlot.includes('AM') ? 'Morning' : 'Afternoon',
        consultationType,
        consultationFee: activeDoctor ? activeDoctor.consultationFee : (selectedSector === 'government' ? 0 : 800),
        tokenNumber,
        status: 'Confirmed',
        patient: {
          fullName,
          age: parseInt(age) || 30,
          gender,
          phone,
          email,
          abhaId: abhaId || '91-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000),
          symptomsOrReason: symptoms,
          isSeniorCitizenOrDifferentlyAbled: isSeniorCitizen || (parseInt(age) >= 60)
        },
        bookedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        reportingTime: '30-45 minutes before scheduled slot',
        counterInstructions: selectedSector === 'government'
          ? 'Proceed to Central OPD Digital Kiosk / Counter 12 for biometric/SMS token validation.'
          : 'Proceed directly to Private Consultation Desk with this digital receipt.'
      };

      // Save to localStorage for persistence
      const saved = JSON.parse(localStorage.getItem('sanjeevani_appointments') || '[]');
      localStorage.setItem('sanjeevani_appointments', JSON.stringify([newAppointment, ...saved]));

      setConfirmedAppointment(newAppointment);
      setIsSubmitting(false);
      setShowReceipt(true);
    }, 600);
  };

  const stepsList = [
    { num: 1, title: 'Sector & Hospital' },
    { num: 2, title: 'Department & Doctor' },
    { num: 3, title: 'Date & Time Slot' },
    { num: 4, title: 'Patient Details' },
    { num: 5, title: 'Confirm & Token' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
          Fast-Track OPD Registration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {language === 'hi' ? 'ओपीडी अपॉइंटमेंट एवं डिजिटल टोकन बुकिंग' : 'Book Outpatient (OPD) Appointment'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Unified booking for both public government hospitals (free/nominal) and accredited private multi-specialty centres.
        </p>
      </div>

      {/* 5-Step Stepper Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between">
          {stepsList.map((st, i) => (
            <React.Fragment key={st.num}>
              <button
                type="button"
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num);
                }}
                className={`flex items-center gap-2 group ${st.num <= currentStep ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === st.num 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : st.num < currentStep 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {st.num < currentStep ? <Check className="w-4 h-4" /> : st.num}
                </div>
                <span className={`text-xs font-semibold hidden md:inline ${
                  currentStep === st.num ? 'text-blue-600 font-bold' : 'text-slate-600'
                }`}>
                  {st.title}
                </span>
              </button>
              {i < stepsList.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < currentStep - 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: Select Sector & Hospital */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Step 1: Choose Healthcare Division & Hospital</h3>
            <p className="text-xs text-slate-500">Select whether you wish to book at a Public Government Hospital or Private Hospital.</p>
          </div>

          {/* Sector Dual Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedSector('government');
                setSelectedHospitalId('');
                setSelectedDoctorId('');
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                selectedSector === 'government'
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-emerald-800 text-sm">Government Hospital</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Free / ₹0 OPD
                </span>
              </div>
              <p className="text-xs text-slate-600">AIIMS, Medical Colleges, District Hospitals, Community Health Centres.</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSector('private');
                setSelectedHospitalId('');
                setSelectedDoctorId('');
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                selectedSector === 'private'
                  ? 'border-purple-600 bg-purple-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-purple-800 text-sm">Private Hospital</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  NABH & TPA Cashless
                </span>
              </div>
              <p className="text-xs text-slate-600">Super-Specialty institutes, comprehensive diagnostics, fixed specialist fees.</p>
            </button>
          </div>

          {/* Hospital Select Dropdown or Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Select Specific Hospital:
            </label>
            <div className="grid grid-cols-1 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {availableHospitals.map(h => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setSelectedHospitalId(h.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedHospitalId === h.id
                      ? selectedSector === 'government' 
                        ? 'border-emerald-600 bg-emerald-50 font-bold' 
                        : 'border-purple-600 bg-purple-50 font-bold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{h.name}</h5>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{h.locality}, {h.city}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-semibold">{h.opdTimings}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700 block">{h.opdFee}</span>
                    <span className="text-[10px] text-slate-400">{h.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              disabled={!selectedHospitalId}
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <span>Continue to Department</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Department & Doctor */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Step 2: Medical Department & Doctor Selection</h3>
            <p className="text-xs text-slate-500">Pick the required clinical department and your preferred consultant doctor.</p>
          </div>

          {/* Department Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Choose Department:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {availableDepartments.map(dept => (
                <button
                  type="button"
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setSelectedDoctorId('');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    selectedDeptId === dept.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Choose Doctor / Next Available Token:</label>
              <button
                type="button"
                onClick={() => setSelectedDoctorId('next-available')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  selectedDoctorId === 'next-available'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
              >
                Next Available Duty Doctor
              </button>
            </div>

            <div className="space-y-2">
              {availableDoctors.length > 0 ? (
                availableDoctors.map(doc => (
                  <button
                    type="button"
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedDoctorId === doc.id
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{doc.name}</h5>
                      <p className="text-xs text-blue-600 font-medium">{doc.designation} • {doc.qualifications}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Room: {doc.opdRoom} • Next: {doc.nextAvailableSlot}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 block">
                        {doc.consultationFee === 0 ? 'Free / ₹0' : `₹${doc.consultationFee}`}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        {doc.availabilityStatus}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-slate-200">
                  No named doctors currently listed for this specific filter. You can select &ldquo;Next Available Duty Doctor&rdquo; above.
                </div>
              )}
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!selectedDeptId}
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <span>Continue to Slot Timing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Date & Slot Selection */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Step 3: Appointment Date & Time Slot</h3>
            <p className="text-xs text-slate-500">Pick an OPD duty date and time window.</p>
          </div>

          {/* Consultation Type Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setConsultationType('In-Person')}
              className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
                consultationType === 'In-Person'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              In-Person Hospital Visit
            </button>
            <button
              type="button"
              onClick={() => setConsultationType('Teleconsultation')}
              className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
                consultationType === 'Teleconsultation'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Online Teleconsultation
            </button>
          </div>

          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Appointment Date:</label>
            <input
              type="date"
              value={selectedDate}
              min="2026-10-30"
              max="2026-11-20"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Slot Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">Available Time Slots:</label>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Morning OPD Sessions
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {morningSlots.map(slot => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 mt-3">
                Afternoon / Evening Sessions
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[...afternoonSlots, ...eveningSlots].map(slot => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <span>Continue to Patient Info</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Patient Details Form */}
      {currentStep === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(5); }} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Step 4: Enter Patient Details</h3>
            <p className="text-xs text-slate-500">Provide accurate patient information for hospital digital registration and OPD token assignment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-slate-700 block">Patient Full Name (as per Aadhaar/Govt ID) *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar Verma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Age & Gender */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Age (Years) *</label>
              <input
                type="number"
                required
                min="0"
                max="125"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 45"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Mobile Phone */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Mobile Number (For SMS OPD Slip & Token) *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Email Address (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. patient@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* ABHA ID */}
            <div className="sm:col-span-2 space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 block">ABHA ID (Ayushman Bharat Health Account - Optional)</label>
                <span className="text-[11px] text-blue-600 font-semibold">Fast-track paperless records</span>
              </div>
              <input
                type="text"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder="e.g. 91-4521-8890-1204"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Symptoms */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-slate-700 block">Chief Symptoms or Reason for Consultation *</label>
              <textarea
                required
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe symptoms, duration of illness, or ongoing medical condition..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Special Assistance Checkbox */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-800 font-semibold">
              <input
                type="checkbox"
                checked={isSeniorCitizen}
                onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Patient is a Senior Citizen (60+) or requires Wheelchair / Divyangjan priority support</span>
            </label>
          </div>

          {/* Stepper buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <span>Review & Confirm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Review & Confirm */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Step 5: Review Booking Particulars</h3>
            <p className="text-xs text-slate-500">Please verify details before generating your hospital OPD token slip.</p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Summary Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Hospital</span>
                <span className="font-bold text-slate-900 text-sm block">{activeHospital?.name}</span>
                <span className="text-slate-500">{activeHospital?.address}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Specialty & Doctor</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {MEDICAL_DEPARTMENTS.find(d => d.id === selectedDeptId)?.name}
                </span>
                <span className="text-blue-600 font-semibold">
                  {activeDoctor ? activeDoctor.name : 'Next Available Duty Doctor'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Appointment Date & Time</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {selectedDate} • {selectedTimeSlot} ({consultationType})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Consultation Fee</span>
                <span className="font-black text-slate-900 text-base block text-emerald-700">
                  {selectedSector === 'government' ? 'Free / ₹0 (Govt OPD Card)' : `₹${activeDoctor ? activeDoctor.consultationFee : 800}`}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <span className="text-slate-400 block text-[11px] mb-1">Patient Details:</span>
              <p className="text-slate-800 font-semibold">
                {fullName} ({age} yrs, {gender}) • Phone: {phone}
              </p>
              <p className="text-slate-600 mt-0.5">Symptoms: {symptoms}</p>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-3">
            <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-700">
              <input
                type="checkbox"
                required
                checked={agreeConsent}
                onChange={(e) => setAgreeConsent(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to adhere to the hospital OPD reporting guidelines and understand this appointment is subject to doctor availability and hospital emergency duty protocols.
              </span>
            </label>
          </div>

          {/* Stepper buttons */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
            >
              Back to Patient Form
            </button>
            <button
              type="button"
              disabled={isSubmitting || !agreeConsent}
              onClick={handleConfirmBooking}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>{isSubmitting ? 'Confirming with Hospital Server...' : 'Confirm & Generate OPD Token'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {showReceipt && confirmedAppointment && (
        <ReceiptModal
          appointment={confirmedAppointment}
          onClose={() => {
            setShowReceipt(false);
            router.push('/appointments/my-appointments');
          }}
        />
      )}
    </div>
  );
}
