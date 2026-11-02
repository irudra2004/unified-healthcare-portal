'use client';

import React, { useState } from 'react';
import { HOSPITALS, DOCTORS, INITIAL_APPOINTMENTS } from '@/data/mockData';
import { Doctor, Hospital } from '@/types';
import { 
  Building2, 
  Users, 
  CalendarCheck, 
  Clock, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Save, 
  X,
  Stethoscope,
  IndianRupee,
  Bell
} from 'lucide-react';

export default function HospitalAdminPage() {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(HOSPITALS[0].id);
  const [activeTab, setActiveTab] = useState<'profile' | 'doctors' | 'appointments' | 'announcements'>('doctors');

  // Selected Hospital
  const currentHospital = HOSPITALS.find(h => h.id === selectedHospitalId) || HOSPITALS[0];
  const [hospitalDoctors, setHospitalDoctors] = useState<Doctor[]>(DOCTORS.filter(d => d.hospitalId === selectedHospitalId));

  // Add doctor modal
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocDesignation, setNewDocDesignation] = useState('Senior Consultant');
  const [newDocQual, setNewDocQual] = useState('MBBS, MD');
  const [newDocDept, setNewDocDept] = useState('general-medicine');
  const [newDocRoom, setNewDocRoom] = useState('Room 105, OPD');
  const [newDocFee, setNewDocFee] = useState(currentHospital.sector === 'government' ? 0 : 800);

  // Announcements
  const [announcements, setAnnouncements] = useState<string[]>([
    'OPD Registration Counter 4 designated for Senior Citizens and Divyangjan with zero waiting time.',
    'Special Seasonal Dengue & Platelet Screening Booth functional 24x7 adjacent to Casualty.'
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleHospitalChange = (id: string) => {
    setSelectedHospitalId(id);
    setHospitalDoctors(DOCTORS.filter(d => d.hospitalId === id));
  };

  const handleToggleDoctorStatus = (docId: string) => {
    setHospitalDoctors(prev => prev.map(doc => {
      if (doc.id === docId) {
        const nextStatus = doc.availabilityStatus === 'Available' ? 'On Leave' : 'Available';
        return { ...doc, availabilityStatus: nextStatus };
      }
      return doc;
    }));
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: Doctor = {
      id: `doc-custom-${Date.now()}`,
      name: newDocName,
      gender: 'Male',
      designation: newDocDesignation,
      qualifications: newDocQual,
      experienceYears: 12,
      departmentId: newDocDept,
      departmentName: newDocDept.replace('-', ' ').toUpperCase(),
      hospitalId: currentHospital.id,
      hospitalName: currentHospital.name,
      sector: currentHospital.sector,
      opdRoom: newDocRoom,
      consultationFee: currentHospital.sector === 'government' ? 0 : Number(newDocFee),
      languages: ['English', 'Hindi'],
      availabilityStatus: 'Available',
      nextAvailableSlot: 'Tomorrow, 09:30 AM',
      schedule: [
        {
          day: 'Monday',
          shifts: [{ startTime: '09:00 AM', endTime: '01:00 PM', roomOrOPD: newDocRoom, maxTokens: 30, bookedTokens: 0, mode: 'In-Person' }]
        },
        {
          day: 'Wednesday',
          shifts: [{ startTime: '09:00 AM', endTime: '01:00 PM', roomOrOPD: newDocRoom, maxTokens: 30, bookedTokens: 0, mode: 'In-Person' }]
        }
      ],
      specializations: ['Clinical Consultation', 'Inpatient Rounds'],
      bio: 'Hospital-affiliated consulting physician.',
      rating: 4.8,
      reviewsCount: 15
    };

    setHospitalDoctors([newDoc, ...hospitalDoctors]);
    setShowAddDocModal(false);
    setNewDocName('');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      setAnnouncements([newAnnouncement.trim(), ...announcements]);
      setNewAnnouncement('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header & Hospital Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hospital Admin Management Panel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {currentHospital.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Campus ID: {currentHospital.id} • {currentHospital.type} • {currentHospital.city}
          </p>
        </div>

        {/* Hospital Switcher */}
        <div className="w-full md:w-72">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Switch Administered Hospital:
          </label>
          <select
            value={selectedHospitalId}
            onChange={(e) => handleHospitalChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-blue-600"
          >
            {HOSPITALS.map(h => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.sector === 'government' ? 'Govt' : 'Pvt'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'doctors'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Doctor Roster & Duty Shifts ({hospitalDoctors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>OPD Tokens & Bookings</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Hospital Bulletins</span>
        </button>
      </div>

      {/* TAB 1: DOCTOR ROSTER */}
      {activeTab === 'doctors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Department-Wise Doctors & Availability Schedules
            </h3>
            <button
              onClick={() => setShowAddDocModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Doctor Particulars</th>
                  <th className="py-3 px-4">OPD Cabin</th>
                  <th className="py-3 px-4">Consultation Fee</th>
                  <th className="py-3 px-4">Weekly Roster</th>
                  <th className="py-3 px-4">Live Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitalDoctors.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{doc.name}</span>
                      <span className="text-[11px] text-blue-600">{doc.designation}</span>
                      <span className="text-[11px] text-slate-400 block">{doc.qualifications}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {doc.opdRoom}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {doc.consultationFee === 0 ? 'Free / ₹0 (Govt)' : `₹${doc.consultationFee}`}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        {doc.schedule.map(s => (
                          <span key={s.day} className="inline-block bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] mr-1">
                            {s.day.slice(0, 3)}: {s.shifts[0]?.startTime.split(' ')[0]}-{s.shifts[0]?.endTime.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.availabilityStatus === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {doc.availabilityStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleDoctorStatus(doc.id)}
                        className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Toggle Leave
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Confirmed OPD Appointments & Token Queue for {currentHospital.name}
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Token & Appt ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Department & Doctor</th>
                  <th className="py-3 px-4">Slot Time</th>
                  <th className="py-3 px-4">ABHA / Phone</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_APPOINTMENTS.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="font-black text-blue-700 text-sm block">#{apt.tokenNumber}</span>
                      <span className="font-mono text-[11px] text-slate-400">{apt.appointmentNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{apt.patient.fullName}</span>
                      <span className="text-[11px] text-slate-500">{apt.patient.age} yrs, {apt.patient.gender}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 block">{apt.doctorName}</span>
                      <span className="text-[11px] text-blue-600">{apt.departmentName} ({apt.opdRoom})</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 block">{apt.appointmentDate}</span>
                      <span className="text-[11px] text-slate-500">{apt.appointmentTime} ({apt.consultationType})</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span className="block text-slate-800">{apt.patient.phone}</span>
                      <span className="text-slate-400">{apt.patient.abhaId || 'No ABHA'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm max-w-3xl">
          <h3 className="text-base font-bold text-slate-900">
            Publish Patient Bulletin & OPD Notices
          </h3>

          <form onSubmit={handleAddAnnouncement} className="space-y-3">
            <textarea
              rows={3}
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="e.g. Cardiological OPD room shifted to Shatabdi 2nd floor during maintenance..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Broadcast Bulletin
            </button>
          </form>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Bulletins:</h4>
            {announcements.map((ann, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                <Bell className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{ann}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddDoctor} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Add Doctor to {currentHospital.name}</h4>
              <button type="button" onClick={() => setShowAddDocModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Dr. Amit Mathur"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={newDocDesignation}
                    onChange={(e) => setNewDocDesignation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={newDocQual}
                    onChange={(e) => setNewDocQual(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">OPD Room</label>
                  <input
                    type="text"
                    value={newDocRoom}
                    onChange={(e) => setNewDocRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    disabled={currentHospital.sector === 'government'}
                    value={newDocFee}
                    onChange={(e) => setNewDocFee(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddDocModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Save Doctor Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
