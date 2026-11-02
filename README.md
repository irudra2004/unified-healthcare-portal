# Sanjeevani Care - Unified Hospital Management & Doctor Appointment Portal

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Ayushman Bharat ABDM](https://img.shields.io/badge/ABDM-Compliant-emerald?style=flat)](https://abdm.gov.in/)

A modern, production-grade healthcare web portal connecting citizens across India with both **Government Hospitals (Public Healthcare Division)** and **Private Hospitals (Accredited Healthcare Division)** through one unified, accessible digital ecosystem.

Built in adherence with the **Ayushman Bharat Digital Mission (ABDM)** design principles and the **Digital Personal Data Protection (DPDP) Act 2023**.

---

## 🏥 Key Highlights

### 1. Dual Healthcare Divisions
- **Government Hospitals Division (`/govt-hospitals`)**:
  - Apex institutions across **all 28 States & 8 Union Territories of India** (AIIMS, PGIMER, JIPMER, KGMU, NEIGRIHMS, RIMS, GMCs, and District Civil Hospitals).
  - Explicit walk-in OPD guidance (counter numbers, registration timings from 07:30 AM).
  - 100% Free / nominal registration (₹0 - ₹10), free generic medicine dispensaries, and Jan Aushadhi Kendras.
  - Empaneled with **Ayushman Bharat PM-JAY** (₹5 Lakh cashless cover), CGHS, and state Arogya funds.
- **Private Hospitals Division (`/private-hospitals`)**:
  - Multi-specialty hospitals with **NABH & JCI Gold** credentials.
  - Transparent consultation fee schedules (₹800 - ₹2000), doctor degrees, and qualifications.
  - 24x7 cashless insurance TPA helpdesk listings (Star Health, HDFC ERGO, Care Health, ICICI Lombard).
  - In-person clinic visits & Teleconsultation.

### 2. Department-Wise Doctor Scheduling System (`/departments` & `/doctors`)
- **19 Clinical Specialties**: General Medicine, General Surgery, Cardiology, Neurology, Orthopedics, Pediatrics, Obstetrics & Gynecology, Dermatology, Ophthalmology, ENT, Dentistry, Psychiatry, Oncology, Urology, Nephrology, Pulmonology, Gastroenterology, Radiology, and Emergency Medicine.
- **Doctor Rosters & Schedules**: Card view and weekly calendar roster view displaying room numbers, shift timings, verified qualifications, and live duty status (*Available Today*, *On Leave*, *Emergency Duty*).

### 3. 5-Step Patient OPD Registration & Token Generation (`/appointments/book`)
1. **Division & Hospital Selection**: Choose Public Government vs. Private, filter by state/city.
2. **Department & Doctor**: Select clinical specialty or choose *Next Available Duty Doctor*.
3. **Date & Slot Window**: Morning, afternoon, or evening OPD slots + consultation mode.
4. **Patient Particulars**: Full name, age, gender, mobile number, ABHA Health ID, symptoms, and senior citizen priority flags.
5. **Review & Instant Token**: Server-side double booking prevention with immediate digital token generation.
- **Printable OPD Slip Modal (`/appointments/my-appointments`)**: High-resolution print-formatted slip with token number, reporting guidelines, ABHA ID, and QR verification.

### 4. Critical Healthcare Modules
- **24x7 Emergency Lifeline (`/emergency`)**: 108 (Ambulance), 112 (Emergency Response), 102 (Maternal & Infant), 1075 (Health Helpline), and direct casualty ward desks.
- **Live Blood Component Availability (`/blood-bank`)**: Real-time component stock across all 8 blood groups (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).
- **Government Health Schemes (`/schemes`)**: Ayushman Bharat PM-JAY (universal 70+ Senior Citizen cover), CGHS, and JSSK with eligibility checks.
- **Hospital Locator (`/locator`)**: Interactive OpenStreetMap coordinates with turn-by-turn driving directions.

### 5. Multi-Tier Administrative Dashboards
- **Hospital Admin Desk (`/admin/hospital`)**: Roster management, leave toggling, OPD fee configuration, token queues, and hospital bulletin broadcasts.
- **National Super-Admin (`/admin/super`)**: DGHS oversight portal with listing verification, automated duplicate detection (spatial latitude/longitude & contact collisions), and DPDP Act audit logs.

### 6. Accessibility & Inclusivity (WCAG 2.1 AA)
- **High Contrast Mode**: Optimized for visually impaired users.
- **Font Resizing**: `A-`, `A`, `A+` dynamic font scaling across all pages.
- **Screen Reader**: Built-in Web Speech Synthesis API voice readout.
- **Bilingual Interface**: Seamless 1-click switching between English and Hindi (हिन्दी).

---

## 🚀 One-Click Deploy to Vercel (Live Website)

Deploy your live website free in 1 minute using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Firudra2004%2Funified-healthcare-portal)

### Steps to get your live URL:
1. Click the **Deploy with Vercel** button above or go to [vercel.com/new](https://vercel.com/new).
2. Sign in with your GitHub account (`irudra2004`).
3. Select `unified-healthcare-portal` and click **Deploy**.
4. Within 60 seconds, your site will be live at `https://unified-healthcare-portal.vercel.app` (or your custom domain).

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/irudra2004/unified-healthcare-portal.git

# Enter project directory
cd unified-healthcare-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: OpenStreetMap integration
- **Accessibility**: WCAG 2.1 AA compliant (Web Speech Synthesis, dynamic font scaling, high-contrast mode)

---

## 📜 License
Built for the national digital public healthcare infrastructure.
