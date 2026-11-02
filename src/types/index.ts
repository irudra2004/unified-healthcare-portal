export type HospitalType = 
  | 'AIIMS / National Institute'
  | 'Government Medical College'
  | 'District Hospital'
  | 'Community Health Centre (CHC)'
  | 'Primary Health Centre (PHC)'
  | 'Private Super-Specialty'
  | 'Private Multi-Specialty'
  | 'Private Clinic / Nursing Home';

export type Sector = 'government' | 'private';

export interface Hospital {
  id: string;
  name: string;
  hindiName?: string;
  sector: Sector;
  type: HospitalType;
  state: string;
  district: string;
  city: string;
  locality: string;
  pincode: string;
  address: string;
  contactNumber: string;
  emergencyNumber: string;
  email: string;
  website: string;
  rating: number;
  totalReviews: number;
  establishedYear: number;
  bedCapacity: number;
  opdTimings: string;
  opdFee: string; // e.g. "Free / ₹10 Nominal Registration" or "₹800"
  walkInSupported: boolean;
  onlineBookingSupported: boolean;
  walkInInstructions: string;
  facilities: string[];
  departments: string[];
  diagnosticServices: string[];
  hasBloodBank: boolean;
  bloodBankContact?: string;
  hasEmergencyCasualty: boolean;
  hasJanAushadhiOrPharmacy: boolean;
  schemesAccepted: string[];
  insuranceCashlessAccepted: string[];
  nabhAccredited: boolean;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  verificationBadge: string;
  overview: string;
  hindiOverview?: string;
}

export interface DoctorScheduleDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  shifts: {
    startTime: string;
    endTime: string;
    roomOrOPD: string;
    maxTokens: number;
    bookedTokens: number;
    mode: 'In-Person' | 'Teleconsultation' | 'Both';
  }[];
  isOffDay?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  hindiName?: string;
  gender: 'Male' | 'Female' | 'Other';
  designation: string; // e.g. "Senior Consultant & Head", "Professor & Specialist"
  qualifications: string; // e.g. "MBBS, MD (Medicine), DM (Cardiology), FACC"
  experienceYears: number;
  departmentId: string;
  departmentName: string;
  hospitalId: string;
  hospitalName: string;
  sector: Sector;
  opdRoom: string;
  consultationFee: number; // 0 for Govt (free OPD) or private consultation fee
  languages: string[];
  availabilityStatus: 'Available' | 'On Leave' | 'Emergency Duty' | 'Slot Full';
  nextAvailableSlot: string;
  schedule: DoctorScheduleDay[];
  specializations: string[];
  bio: string;
  photoUrl?: string;
  rating: number;
  reviewsCount: number;
}

export interface MedicalDepartment {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  description: string;
  hindiDescription: string;
  commonSymptoms: string[];
  treatments: string[];
  headOfDepartment?: string;
  featuredProcedures: string[];
}

export interface AppointmentSlot {
  time: string;
  isBooked: boolean;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

export interface Appointment {
  id: string;
  appointmentNumber: string; // e.g. SJV-2026-87421
  sector: Sector;
  hospitalId: string;
  hospitalName: string;
  hospitalAddress: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorQualification: string;
  opdRoom: string;
  appointmentDate: string;
  appointmentTime: string;
  slotPeriod: 'Morning' | 'Afternoon' | 'Evening';
  consultationType: 'In-Person' | 'Teleconsultation';
  consultationFee: number;
  tokenNumber: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'Checked-In';
  patient: {
    fullName: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    email?: string;
    abhaId?: string; // Ayushman Bharat Health Account
    address?: string;
    symptomsOrReason: string;
    isSeniorCitizenOrDifferentlyAbled: boolean;
  };
  bookedAt: string;
  reportingTime: string;
  counterInstructions: string;
  cancellationReason?: string;
}

export interface BloodStockItem {
  id: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  hospitalName: string;
  hospitalType: 'Government' | 'Private' | 'Red Cross';
  city: string;
  state: string;
  unitsAvailable: number;
  lastUpdated: string;
  contactNumber: string;
  verified: boolean;
}

export interface HealthScheme {
  id: string;
  name: string;
  hindiName: string;
  ministryOrAuthority: string;
  category: 'Central Government' | 'State Government';
  coverageAmount: string;
  eligibility: string[];
  documentsRequired: string[];
  keyBenefits: string[];
  officialPortal: string;
  tollFreeNumber: string;
  cashlessHospitalsCount: string;
}

export interface EmergencyContact {
  service: string;
  hindiService: string;
  number: string;
  description: string;
  hindiDescription: string;
  category: 'National Ambulance' | 'Police & Disaster' | 'Women & Child' | 'Specialized Helplines';
  is24x7: boolean;
}
