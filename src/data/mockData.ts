import { Hospital, Doctor, MedicalDepartment, BloodStockItem, HealthScheme, EmergencyContact } from '../types';
import { NATIONAL_GOVERNMENT_HOSPITALS } from './govtHospitalsData';

export const MEDICAL_DEPARTMENTS: MedicalDepartment[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    hindiName: 'सामान्य चिकित्सा (जनरल मेडिसिन)',
    icon: 'Stethoscope',
    description: 'Comprehensive adult primary healthcare, diagnosis, and non-surgical management of infectious, chronic, and lifestyle diseases.',
    hindiDescription: 'वयस्कों के लिए व्यापक प्राथमिक स्वास्थ्य सेवा, संक्रमण, मधुमेह और जीवनशैली संबंधी बीमारियों का उपचार।',
    commonSymptoms: ['Fever', 'Fatigue', 'Unexplained Weight Loss', 'Chronic Cough', 'Hypertension', 'Diabetes'],
    treatments: ['Infectious Disease Care', 'Diabetes & Hypertension Management', 'Geriatric Care', 'Preventive Health Checkups'],
    featuredProcedures: ['Routine Blood Profiling', 'ECG Monitoring', 'Insulin Regimen Optimization']
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    hindiName: 'सामान्य शल्य चिकित्सा (सर्जरी)',
    icon: 'Scissors',
    description: 'Surgical management of abdominal organs, trauma, soft tissues, hernias, and advanced laparoscopic procedures.',
    hindiDescription: 'उदर के अंग, हर्निया, अपेंडिक्स और दूरबीन (लैप्रोस्कोपिक) शल्य चिकित्सा।',
    commonSymptoms: ['Severe Abdominal Pain', 'Hernia Swelling', 'Gallbladder Pain', 'Appendicitis'],
    treatments: ['Laparoscopic Cholecystectomy', 'Hernia Repair', 'Appendectomy', 'Minor Excision Surgery'],
    featuredProcedures: ['Minimally Invasive Laparoscopy', 'Wound Debridement', 'Colorectal Surgery']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    hindiName: 'हृदय रोग विभाग (कार्डियोलॉजी)',
    icon: 'HeartPulse',
    description: 'Prevention, diagnosis, and interventions for heart attacks, coronary artery diseases, heart failure, and arrhythmias.',
    hindiDescription: 'हृदय रोग, हार्ट अटैक, उच्च रक्तचाप, एंजियोग्राफी और पेसमेकर प्रत्यारोपण।',
    commonSymptoms: ['Chest Pain / Tightness', 'Shortness of Breath', 'Palpitations', 'Swollen Ankles', 'Dizziness'],
    treatments: ['Angiography & Angioplasty', 'Echocardiography', 'Pacemaker Implantation', 'Heart Failure Care'],
    featuredProcedures: ['Coronary Angiogram', 'Stress Thallium', 'Holter Monitoring', 'Cardiac ICU Care']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    hindiName: 'तंत्रिका तंत्र रोग (न्यूरोलॉजी)',
    icon: 'Brain',
    description: 'Specialized diagnosis and treatment of brain, spinal cord, nerve, and neuromuscular disorders.',
    hindiDescription: 'मस्तिष्क, रीढ़ की हड्डी, स्ट्रोक (लकवा), मिर्गी और सिरदर्द का उपचार।',
    commonSymptoms: ['Chronic Migraine', 'Seizures / Epilepsy', 'Stroke / Paralysis', 'Tremors / Parkinsonism', 'Numbness'],
    treatments: ['Acute Stroke Thrombolysis', 'Epilepsy Management', 'Neuro-rehabilitation', 'Parkinson Disease Therapy'],
    featuredProcedures: ['EEG (Electroencephalogram)', 'EMG / Nerve Conduction Study', 'Stroke Unit Care']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    hindiName: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    icon: 'Bone',
    description: 'Treatment of bone fractures, degenerative arthritis, sports injuries, spine disorders, and joint replacements.',
    hindiDescription: 'हड्डी टूटना, गठिया, जोड़ों का दर्द, स्पाइन और घुटना/कूल्हा प्रत्यारोपण।',
    commonSymptoms: ['Joint Pain', 'Fractures', 'Back Pain', 'Difficulty Walking', 'Sprains & Ligament Tears'],
    treatments: ['Total Knee & Hip Replacement', 'Arthroscopy', 'Fracture Plaster & Fixation', 'Spine Surgery'],
    featuredProcedures: ['Robotic Knee Replacement', 'ACL Reconstruction', 'Physiotherapy & Rehabilitation']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    hindiName: 'बाल रोग विभाग (पीडियाट्रिक्स)',
    icon: 'Baby',
    description: 'Comprehensive medical care for infants, children, and adolescents, including neonatal intensive care (NICU) and immunizations.',
    hindiDescription: 'नवजात शिशुओं और बच्चों की बीमारियां, टीकाकरण और एनआईसीयू (NICU) सेवाएं।',
    commonSymptoms: ['Childhood Fever', 'Cough & Wheezing', 'Delayed Milestones', 'Vomiting / Diarrhea', 'Growth Concerns'],
    treatments: ['National Immunization Program', 'Newborn Screening', 'Pediatric Asthma Care', 'Nutrition Guidance'],
    featuredProcedures: ['NICU / PICU Care', 'Vaccination Schedule', 'Well-Baby Checkups']
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology',
    hindiName: 'स्त्री एवं प्रसूति रोग (गाइनेकोलॉजी)',
    icon: 'Activity',
    description: 'Maternal health, safe institutional delivery, high-risk pregnancy, and reproductive health care for women.',
    hindiDescription: 'गर्भावस्था, सुरक्षित प्रसव, पीसीओडी (PCOD) और महिलाओं के स्वास्थ्य की संपूर्ण देखभाल।',
    commonSymptoms: ['Irregular Periods', 'Pregnancy Care', 'Pelvic Pain', 'Menopause Issues', 'PCOS / PCOD'],
    treatments: ['Antenatal Checkups (ANC)', 'Normal & Cesarean Delivery', 'Hysterectomy', 'Laparoscopic Gynec Surgery'],
    featuredProcedures: ['Fetal Ultrasound', 'Pap Smear Screening', 'Painless Delivery (Epidural)']
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Venereology',
    hindiName: 'त्वचा एवं गुप्त रोग (डर्मेटोलॉजी)',
    icon: 'Sun',
    description: 'Expert treatment of skin disorders, allergies, hair fall, fungal infections, acne, and cosmetic dermatology.',
    hindiDescription: 'दाद, खाज, खुजली, मुंहासे, बालों का झड़ना और सोरायसिस का विशेषज्ञ इलाज।',
    commonSymptoms: ['Skin Rash / Eczema', 'Fungal Infection (Ringworm)', 'Hair Loss / Alopecia', 'Psoriasis', 'Severe Acne'],
    treatments: ['Topical & Systemic Dermotherapy', 'Phototherapy', 'Allergy Patch Testing', 'Skin Biopsy'],
    featuredProcedures: ['Cryotherapy', 'Chemical Peels', 'Laser Skin Therapy']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology (Eye Care)',
    hindiName: 'नेत्र रोग विभाग (आई केयर)',
    icon: 'Eye',
    description: 'Vision correction, cataract micro-surgery, glaucoma treatment, retinal evaluations, and corneal disorders.',
    hindiDescription: 'आंखों की जांच, मोतियाबिंद का लेजर ऑपरेशन, काला मोतिया और चश्मे के नंबर की जांच।',
    commonSymptoms: ['Blurry Vision', 'Cataract Cloudy Lens', 'Eye Strain / Redness', 'Sudden Vision Loss', 'Watery Eyes'],
    treatments: ['Phacoemulsification Cataract Surgery', 'Glaucoma Laser Treatment', 'Diabetic Retinopathy Screening', 'Refraction'],
    featuredProcedures: ['MICS Cataract Surgery', 'Fundus Angiography', 'Lasik Consultation']
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    hindiName: 'कान, नाक और गला रोग (ईएनटी)',
    icon: 'Hearing',
    description: 'Medical and surgical care for hearing loss, ear discharge, sinusitis, nasal polyp, throat infections, and vertigo.',
    hindiDescription: 'कान बहना, कम सुनाई देना, साइनस, टॉन्सिल और गले के संक्रमण का इलाज।',
    commonSymptoms: ['Earache & Discharge', 'Hearing Loss', 'Sinus Congestion', 'Chronic Sore Throat', 'Vertigo / Giddiness'],
    treatments: ['Tympanoplasty (Eardrum Repair)', 'FESS (Endoscopic Sinus Surgery)', 'Tonsillectomy', 'Audiometry'],
    featuredProcedures: ['Pure Tone Audiogram', 'Nasal Endoscopy', 'Micro-laryngeal Surgery']
  },
  {
    id: 'dentistry',
    name: 'Dental Surgery & Oral Health',
    hindiName: 'दंत चिकित्सा (डेंटल सर्जरी)',
    icon: 'Smile',
    description: 'Preventive, restorative, and surgical dental care, root canals, oral implants, and maxillo-facial trauma.',
    hindiDescription: 'दांत दर्द, आरसीटी (रूट कैनाल), पायरिया, दांत निकालना और कृत्रिम बत्तीसी।',
    commonSymptoms: ['Toothache', 'Bleeding Gums', 'Cavities', 'Wisdom Tooth Impaction', 'Broken Teeth'],
    treatments: ['Root Canal Treatment (RCT)', 'Dental Crowns & Bridges', 'Scaling & Polishing', 'Wisdom Tooth Extraction'],
    featuredProcedures: ['Digital Dental X-Rays (OPG)', 'Composite Fillings', 'Orthodontic Braces']
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Mental Health',
    hindiName: 'मानसिक स्वास्थ्य एवं मनोचिकित्सा',
    icon: 'SmilePlus',
    description: 'Compassionate mental healthcare, depression, anxiety, de-addiction, bipolar disorder, and psychotherapy.',
    hindiDescription: 'तनाव, डिप्रेशन, घबराहट, अनिद्रा, नशा मुक्ति और परामर्श सेवाएं।',
    commonSymptoms: ['Chronic Anxiety & Panic', 'Depression / Low Mood', 'Insomnia / Sleep Disorders', 'Substance Dependence'],
    treatments: ['Cognitive Behavioral Therapy (CBT)', 'Psychopharmacology', 'De-addiction Rehabilitation', 'Counseling'],
    featuredProcedures: ['Psychological Evaluation', 'Tele-Mental Health Sessions', 'Family Counseling']
  },
  {
    id: 'oncology',
    name: 'Medical & Surgical Oncology',
    hindiName: 'कैंसर रोग विभाग (ऑन्कोलॉजी)',
    icon: 'ShieldAlert',
    description: 'Multidisciplinary cancer diagnosis, chemotherapy, surgical tumor excision, and compassionate palliative care.',
    hindiDescription: 'कैंसर की जांच, कीमोथेरेपी, ट्यूमर सर्जरी और दर्द निवारक देखभाल।',
    commonSymptoms: ['Unexplained Lump / Growth', 'Persistent Blood in Cough/Stool', 'Drastic Weight Loss', 'Chronic Fatigue'],
    treatments: ['Day Care Chemotherapy', 'Tumor Resection Surgery', 'Targeted Immunotherapy', 'Cancer Screening'],
    featuredProcedures: ['Biopsy & Histopathology', 'PET-CT Scan Coordination', 'Port-A-Cath Insertion']
  },
  {
    id: 'urology',
    name: 'Urology & Andrology',
    hindiName: 'मूत्र रोग विभाग (यूरोलॉजी)',
    icon: 'Filter',
    description: 'Treatment of kidney stones, urinary tract infections, prostate enlargement (BPH), and male infertility.',
    hindiDescription: 'गुर्दे की पथरी, पेशाब में रुकावट या जलन, प्रोस्टेट ग्रंथि की समस्या का इलाज।',
    commonSymptoms: ['Kidney Stone Colic', 'Burning Urination', 'Weak Urinary Stream', 'Blood in Urine (Hematuria)'],
    treatments: ['Laser Lithotripsy (URSL/PCNL)', 'TURP (Prostate Surgery)', 'UTI Management', 'Male Health Assessment'],
    featuredProcedures: ['Flexible Ureteroscopy (RIRS)', 'Uroflowmetry', 'Cystoscopy']
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Dialysis',
    hindiName: 'गुर्दा रोग एवं डायलिसिस (नेफ्रोलॉजी)',
    icon: 'Waves',
    description: 'Care for chronic kidney disease (CKD), acute kidney injury, hemodialysis unit, and renal transplant evaluations.',
    hindiDescription: 'किडनी की बीमारी, डायलिसिस सेवाएं, प्रोटीन रिसाव और किडनी ट्रांसप्लांट सलाह।',
    commonSymptoms: ['Swelling of Face & Feet', 'Elevated Serum Creatinine', 'Proteinuria', 'Low Urine Output'],
    treatments: ['Hemodialysis Service', 'Peritoneal Dialysis', 'CKD Progression Delay Management', 'Hypertensive Nephropathy'],
    featuredProcedures: ['AV Fistula Creation Support', 'Kidney Biopsy', 'Continuous Renal Replacement (CRRT)']
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Respiratory Medicine',
    hindiName: 'श्वसन एवं फेफड़ा रोग (पल्मोनोलॉजी)',
    icon: 'Wind',
    description: 'Management of asthma, COPD, tuberculosis, pneumonia, post-COVID lung issues, and sleep apnea.',
    hindiDescription: 'दमा (अस्थमा), टीबी, खांसी, सांस फूलना और स्लीप एपनिया का विशेषज्ञ उपचार।',
    commonSymptoms: ['Shortness of Breath', 'Wheezing / Asthma Attacks', 'Chronic Productive Cough', 'Hemoptysis (Coughing Blood)'],
    treatments: ['Spirometry & PFT', 'DOTS Tuberculosis Therapy', 'BiPAP / CPAP Titration', 'Bronchoscopy'],
    featuredProcedures: ['Pulmonary Function Test (PFT)', 'Fiberoptic Bronchoscopy', 'Allergy Desensitization']
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    hindiName: 'पेट एवं लिवर रोग (गैस्ट्रोएंटरोलॉजी)',
    icon: 'Utensils',
    description: 'Digestive tract disorders, liver cirrhosis, hepatitis, acidity, ulcerative colitis, and therapeutic endoscopy.',
    hindiDescription: 'गैस, एसिडिटी, पीलिया, फैटी लिवर, अल्सर और एंडोस्कोपी जांच।',
    commonSymptoms: ['Severe Acidity / GERD', 'Jaundice / Yellow Eyes', 'Chronic Diarrhea / Constipation', 'Blood in Vomit'],
    treatments: ['Upper GI Endoscopy', 'Colonoscopy', 'Viral Hepatitis Therapy', 'Cirrhosis Management'],
    featuredProcedures: ['Therapeutic Endoscopy', 'Fibroscan of Liver', 'Polypectomy']
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging Sciences',
    hindiName: 'रेडियोलॉजी एवं इमेजिंग जांच',
    icon: 'Scan',
    description: 'Diagnostic imaging using MRI, multi-slice CT, Ultrasonography, Digital X-Rays, and Doppler scans.',
    hindiDescription: 'एमआरआई (MRI), सीटी स्कैन (CT Scan), अल्ट्रासाउंड और डिजिटल एक्स-रे जांच।',
    commonSymptoms: ['Internal Trauma Assessment', 'Organ Diagnostic Evaluation', 'Pre-operative Imaging'],
    treatments: ['Contrast CT Scans', 'High-Tesla MRI Imaging', 'Color Doppler Ultrasound', 'Digital Mammography'],
    featuredProcedures: ['3D Ultrasound', 'CT Angiography', 'Image-Guided Biopsy']
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency & Trauma Care',
    hindiName: 'आपातकालीन एवं ट्रॉमा केयर (इमरजेंसी)',
    icon: 'AlertTriangle',
    description: '24x7 acute resuscitation, polytrauma stabilization, cardiac arrest care, poisoning management, and stroke triage.',
    hindiDescription: '24 घंटे दुर्घटना, दिल का दौरा, स्ट्रोक और गंभीर आपात स्थिति का तुरंत उपचार।',
    commonSymptoms: ['Loss of Consciousness', 'Severe Trauma / Accidents', 'Acute Chest Pain', 'Severe Breathing Distress'],
    treatments: ['Advanced Cardiac Life Support (ACLS)', 'Polytrauma Resuscitation', 'Emergency Intubation', 'Burn Care'],
    featuredProcedures: ['FAST Ultrasound in Trauma', 'Emergency Defibrillation', 'Triage & Rapid Response']
  }
];

export const HOSPITALS: Hospital[] = [
  ...NATIONAL_GOVERNMENT_HOSPITALS,
  {
    id: 'district-hospital-ghaziabad',
    name: 'MMG District Government Hospital',
    hindiName: 'एम.एम.जी. जिला अस्पताल (गाजियाबाद)',
    sector: 'government',
    type: 'District Hospital',
    state: 'Uttar Pradesh',
    district: 'Ghaziabad',
    city: 'Ghaziabad',
    locality: 'Model Town, GT Road',
    pincode: '201001',
    address: 'Near Old Bus Stand, GT Road, Ghaziabad, Uttar Pradesh 201001',
    contactNumber: '+91 120 285 2420',
    emergencyNumber: '+91 120 285 2421',
    email: 'cmsmmg-gzb@up.gov.in',
    website: 'https://ghaziabad.nic.in/health',
    rating: 4.1,
    totalReviews: 2100,
    establishedYear: 1978,
    bedCapacity: 350,
    opdTimings: '08:00 AM - 02:00 PM (Summer) / 08:30 AM - 02:30 PM (Winter)',
    opdFee: '₹1 (Free for Senior Citizens & Ayushman Cardholders)',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Registration counters 1 to 4 on Ground Floor. Separate line for women, children, and divyangjan. Free essential medicines available at government dispensary.',
    facilities: ['24x7 Emergency Casualty', 'Free Essential Drugs Counter', 'District Blood Storage Unit', 'Dialysis Centre (PPP Mode)', 'Nutrition Rehabilitation Centre'],
    departments: ['general-medicine', 'general-surgery', 'orthopedics', 'pediatrics', 'gynecology', 'dermatology', 'ophthalmology', 'ent', 'dentistry', 'emergency-medicine'],
    diagnosticServices: ['Digital X-Ray', 'Basic Pathology Lab', 'ECG', 'Ultrasound'],
    hasBloodBank: true,
    bloodBankContact: '+91 120 285 2425',
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['Ayushman Bharat PM-JAY', 'JSSK', 'Rashtriya Bal Swasthya Karyakram (RBSK)'],
    insuranceCashlessAccepted: ['PM-JAY Government Scheme'],
    nabhAccredited: false,
    latitude: 28.6692,
    longitude: 77.4538,
    isVerified: true,
    verificationBadge: 'District Health Administration Verified',
    overview: 'The primary public healthcare lifeline of Ghaziabad district, MMG Hospital provides free consultations, maternal delivery, essential medicines, and emergency stabilization.',
    hindiOverview: 'गाजियाबाद का मुख्य सरकारी जिला अस्पताल जहां सामान्य व आपातकालीन स्वास्थ्य सेवाएं, निःशुल्क दवाइयां और प्रसव सुविधाएं उपलब्ध हैं।'
  },
  {
    id: 'chc-palwal-rural',
    name: 'Community Health Centre (CHC) Palwal',
    hindiName: 'सामुदायिक स्वास्थ्य केंद्र (सीएचसी) पलवल',
    sector: 'government',
    type: 'Community Health Centre (CHC)',
    state: 'Haryana',
    district: 'Palwal',
    city: 'Palwal',
    locality: 'Civil Lines',
    pincode: '121102',
    address: 'Near Old Court Complex, Civil Lines, Palwal, Haryana 121102',
    contactNumber: '+91 1275 252 040',
    emergencyNumber: '+91 1275 252 108',
    email: 'smochcpalwal@hry.nic.in',
    website: 'https://haryanahealth.gov.in',
    rating: 4.0,
    totalReviews: 840,
    establishedYear: 1989,
    bedCapacity: 50,
    opdTimings: '09:00 AM - 03:00 PM (Mon-Sat)',
    opdFee: 'Free (₹0)',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Direct walk-in allowed without prior booking. Online tokens get prioritized queue slip at Window A. Free lab testing and generic medicines on site.',
    facilities: ['24x7 Delivery Hut (Labour Room)', 'Immunization Clinic', 'Cold Chain Storage', 'Jan Aushadhi Corner', 'Free 102/108 Ambulance Bay'],
    departments: ['general-medicine', 'pediatrics', 'gynecology', 'dermatology', 'emergency-medicine'],
    diagnosticServices: ['Routine Blood Sugar', 'Hemoglobin Test', 'Urine Routine', 'Malaria Rapid Test'],
    hasBloodBank: false,
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['Ayushman Bharat PM-JAY', 'Chiranjeevi Haryana / Nirogi Haryana', 'JSSK'],
    insuranceCashlessAccepted: ['PM-JAY Government Scheme'],
    nabhAccredited: false,
    latitude: 28.1487,
    longitude: 77.3320,
    isVerified: true,
    verificationBadge: 'National Health Mission (NHM) Verified',
    overview: 'A key primary-secondary healthcare node under the National Health Mission serving rural and semi-urban populations with institutional maternal care and essential clinical management.',
    hindiOverview: 'राष्ट्रीय स्वास्थ्य मिशन (NHM) के अंतर्गत ग्रामीण व कस्बाई नागरिकों हेतु निःशुल्क प्राथमिक व प्रसूति चिकित्सा केंद्र।'
  },
  {
    id: 'apollo-delhi',
    name: 'Indraprastha Apollo Hospitals',
    hindiName: 'इंद्रप्रस्थ अपोलो हॉस्पिटल्स (नई दिल्ली)',
    sector: 'private',
    type: 'Private Super-Specialty',
    state: 'Delhi',
    district: 'South East Delhi',
    city: 'New Delhi',
    locality: 'Sarita Vihar, Mathura Road',
    pincode: '110076',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076',
    contactNumber: '+91 11 7179 1090',
    emergencyNumber: '+91 11 2692 5888',
    email: 'assistance@apollohospitalsdelhi.com',
    website: 'https://delhi.apollohospitals.com',
    rating: 4.7,
    totalReviews: 12400,
    establishedYear: 1996,
    bedCapacity: 710,
    opdTimings: '09:00 AM - 07:00 PM (Mon-Sat)',
    opdFee: '₹1200 - ₹1800 (Specialist / Super Specialist)',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Online appointment confirmed patients proceed directly to OPD Tower Desk with booking SMS/receipt. TPA Cashless Insurance counter open 24x7 on Ground Floor.',
    facilities: ['JCI & NABH Accredited', 'Dedicated International Patient Lounge', 'Robotic Surgery Suite', '24x7 Comprehensive Cardiac ER', 'Valet Parking & Cafe', 'Organ Transplant Unit'],
    departments: ['general-medicine', 'general-surgery', 'cardiology', 'neurology', 'orthopedics', 'pediatrics', 'gynecology', 'dermatology', 'ophthalmology', 'ent', 'oncology', 'urology', 'nephrology', 'gastroenterology', 'emergency-medicine'],
    diagnosticServices: ['PET-CT Scan', '3T MRI', 'Dual Source CT', 'Endoscopic Ultrasound', 'Automated Lab Robotics'],
    hasBloodBank: true,
    bloodBankContact: '+91 11 2692 5858',
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['ECHS (Ex-Servicemen)', 'CGHS (Selective Empaneled)'],
    insuranceCashlessAccepted: ['HDFC ERGO', 'Star Health', 'Care Health', 'ICICI Lombard', 'Medi Assist TPA', 'Vidal Health', 'Paramount TPA'],
    nabhAccredited: true,
    latitude: 28.5376,
    longitude: 77.2917,
    isVerified: true,
    verificationBadge: 'JCI & NABH Gold Standard Verified',
    overview: 'India first JCI-accredited tertiary care multi-specialty giant, globally renowned for liver and kidney transplants, robotic cardiac procedures, and world-class clinical outcomes.',
    hindiOverview: 'विश्वस्तरीय स्वास्थ्य सेवाओं से सुसज्जित प्रमुख निजी सुपर स्पेशियलिटी अस्पताल, जो अंग प्रत्यारोपण, रोबोटिक सर्जरी और हृदय रोगों में अग्रणी है।'
  },
  {
    id: 'max-healthcare-saket',
    name: 'Max Super Speciality Hospital, Saket',
    hindiName: 'मैक्स सुपर स्पेशियलिटी हॉस्पिटल, साकेत',
    sector: 'private',
    type: 'Private Super-Specialty',
    state: 'Delhi',
    district: 'South Delhi',
    city: 'New Delhi',
    locality: 'Saket Institutional Area',
    pincode: '110017',
    address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi, Delhi 110017',
    contactNumber: '+91 11 2651 5050',
    emergencyNumber: '+91 11 4055 4055',
    email: 'info@maxhealthcare.com',
    website: 'https://www.maxhealthcare.in',
    rating: 4.7,
    totalReviews: 10800,
    establishedYear: 2006,
    bedCapacity: 530,
    opdTimings: '08:30 AM - 08:00 PM (Mon-Sat)',
    opdFee: '₹1000 - ₹1500',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Self-checkin kiosks available at entrance. Scan your digital appointment QR for immediate consultation token.',
    facilities: ['Da Vinci Xi Robotic Surgery', 'Dedicated Cancer Care Centre', 'Drive-through Pharmacy', 'Advanced Neonatal ICU', 'Cashless TPA Desk'],
    departments: ['general-medicine', 'cardiology', 'neurology', 'orthopedics', 'pediatrics', 'gynecology', 'oncology', 'urology', 'nephrology', 'pulmonology', 'radiology', 'emergency-medicine'],
    diagnosticServices: ['TrueBeam Radiotherapy', 'Intraoperative MRI', 'Digital Cath Lab', 'Fibroscan'],
    hasBloodBank: true,
    bloodBankContact: '+91 11 2651 5055',
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['ECHS', 'CGHS (Select procedures)'],
    insuranceCashlessAccepted: ['Star Health', 'HDFC ERGO', 'Niva Bupa', 'Bajaj Allianz', 'Care Health', 'TPA Network'],
    nabhAccredited: true,
    latitude: 28.5283,
    longitude: 77.2117,
    isVerified: true,
    verificationBadge: 'NABH & NABL Accredited Private Healthcare',
    overview: 'Max Super Speciality Hospital Saket is an internationally acclaimed healthcare institution known for oncology, cardiology, neurosciences, and robotic joint replacement.',
    hindiOverview: 'साकेत स्थित अत्याधुनिक निजी अस्पताल जो कैंसर, न्यूरोलॉजी, हार्ट केयर और रोबोटिक सर्जरी में अग्रणी है।'
  },
  {
    id: 'fortis-escorts-okhla',
    name: 'Fortis Escorts Heart Institute',
    hindiName: 'फोर्टिस एस्कॉर्ट्स हार्ट इंस्टीट्यूट (ओखला)',
    sector: 'private',
    type: 'Private Super-Specialty',
    state: 'Delhi',
    district: 'South East Delhi',
    city: 'New Delhi',
    locality: 'Okhla Road',
    pincode: '110025',
    address: 'Okhla Road, New Friends Colony, New Delhi, Delhi 110025',
    contactNumber: '+91 11 4713 5000',
    emergencyNumber: '+91 11 105010',
    email: 'contactus.fehi@fortishealthcare.com',
    website: 'https://www.fortishealthcare.com',
    rating: 4.8,
    totalReviews: 9100,
    establishedYear: 1988,
    bedCapacity: 310,
    opdTimings: '09:00 AM - 06:00 PM (Mon-Sat)',
    opdFee: '₹1200 - ₹2000',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Cardiac OPD is located in Block B. Dedicated chest pain unit with zero-wait triage on Ground Floor.',
    facilities: ['Dedicated Pediatric Heart Centre', 'Extracorporeal Membrane Oxygenation (ECMO)', 'Hybrid Cath Lab', '24x7 Ambulance with Doctor on Board'],
    departments: ['cardiology', 'general-medicine', 'pulmonology', 'radiology', 'emergency-medicine'],
    diagnosticServices: ['3D Echocardiography', 'Cardiac MRI', 'Fractional Flow Reserve (FFR)', 'Electrophysiology Study (EP)'],
    hasBloodBank: true,
    bloodBankContact: '+91 11 4713 5080',
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['CGHS (Cardiac Super-speciality)'],
    insuranceCashlessAccepted: ['All major private health insurances & TPAs'],
    nabhAccredited: true,
    latitude: 28.5604,
    longitude: 77.2755,
    isVerified: true,
    verificationBadge: 'Apex Cardiac Institute Verified',
    overview: 'Fortis Escorts Heart Institute is a pioneering cardiac hospital in the Asia Pacific region, leading breakthroughs in pediatric cardiac surgery, adult angioplasty, and bypass surgery.',
    hindiOverview: 'एशिया पैसिफिक का अग्रणी हृदय रोग अस्पताल, बाल एवं वयस्क हृदय सर्जरी, पेसमेकर और एंजियोप्लास्टी का विशिष्ट केंद्र।'
  },
  {
    id: 'manipal-hospital-bengaluru',
    name: 'Manipal Hospital HAL Airport Road',
    hindiName: 'मणिपाल हॉस्पिटल (एचएएल एयरपोर्ट रोड, बेंगलुरु)',
    sector: 'private',
    type: 'Private Super-Specialty',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    locality: 'HAL Airport Road, Kodihalli',
    pincode: '560017',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
    contactNumber: '+91 80 2502 4444',
    emergencyNumber: '+91 80 2502 3333',
    email: 'info@manipalhospitals.com',
    website: 'https://www.manipalhospitals.com',
    rating: 4.6,
    totalReviews: 8750,
    establishedYear: 1991,
    bedCapacity: 600,
    opdTimings: '08:00 AM - 08:00 PM (Mon-Sat)',
    opdFee: '₹950 - ₹1500',
    walkInSupported: true,
    onlineBookingSupported: true,
    walkInInstructions: 'Level 1 OPD registry for online confirmations. Teleconsultation option available with instant prescription dispatch.',
    facilities: ['Comprehensive Organ Transplant', 'Comprehensive Cancer Care', 'Robotic Surgery Program', 'Digital Health Concierge'],
    departments: ['general-medicine', 'general-surgery', 'cardiology', 'neurology', 'orthopedics', 'pediatrics', 'gynecology', 'oncology', 'gastroenterology', 'emergency-medicine'],
    diagnosticServices: ['Genomics Lab', 'High-Res CT & MRI', 'Digital Mammogram'],
    hasBloodBank: true,
    bloodBankContact: '+91 80 2502 4455',
    hasEmergencyCasualty: true,
    hasJanAushadhiOrPharmacy: true,
    schemesAccepted: ['Suvarna Arogya Suraksha Trust (SAST)', 'ECHS'],
    insuranceCashlessAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'ICICI Lombard', 'All TPA Networks'],
    nabhAccredited: true,
    latitude: 12.9592,
    longitude: 77.6499,
    isVerified: true,
    verificationBadge: 'NABH & AAHRPP Certified Healthcare Provider',
    overview: 'A flagship tertiary healthcare hub in South India, Manipal Hospital HAL Old Airport Road brings over three decades of clinical eminence across complicated surgical disciplines.',
    hindiOverview: 'दक्षिण भारत का प्रमुख स्वास्थ्य संस्थान, जटिल सर्जरी, अंग प्रत्यारोपण और उन्नत कैंसर उपचार में विश्वसनीय।'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-aiims-med-1',
    name: 'Prof. (Dr.) Rajeshwar Sharma',
    hindiName: 'प्रो. (डॉ.) राजेश्वर शर्मा',
    gender: 'Male',
    designation: 'Head of Department & Senior Professor',
    qualifications: 'MBBS, MD (General Medicine), FRCP (London)',
    experienceYears: 28,
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    hospitalId: 'aiims-new-delhi',
    hospitalName: 'All India Institute of Medical Sciences (AIIMS)',
    sector: 'government',
    opdRoom: 'Room 14, Main OPD Building',
    consultationFee: 0,
    languages: ['Hindi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 09:30 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 14', maxTokens: 40, bookedTokens: 28, mode: 'In-Person' }]
      },
      {
        day: 'Wednesday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 14', maxTokens: 40, bookedTokens: 34, mode: 'In-Person' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 14', maxTokens: 40, bookedTokens: 19, mode: 'In-Person' }]
      }
    ],
    specializations: ['Infectious Diseases', 'Diabetes & Metabolic Syndrome', 'Geriatric Care'],
    bio: 'Renowned internal medicine academician and senior consultant with over 28 years of clinical acumen at AIIMS New Delhi.',
    rating: 4.9,
    reviewsCount: 380
  },
  {
    id: 'doc-aiims-cardio-1',
    name: 'Dr. Sunita Venkataraman',
    hindiName: 'डॉ. सुनीता वेंकटरमण',
    gender: 'Female',
    designation: 'Professor & Interventional Cardiologist',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    experienceYears: 22,
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    hospitalId: 'aiims-new-delhi',
    hospitalName: 'All India Institute of Medical Sciences (AIIMS)',
    sector: 'government',
    opdRoom: 'Cardio-Neuro Tower, Room 204',
    consultationFee: 0,
    languages: ['English', 'Hindi', 'Tamil'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Today, 11:15 AM',
    schedule: [
      {
        day: 'Tuesday',
        shifts: [{ startTime: '09:00 AM', endTime: '01:30 PM', roomOrOPD: 'Room 204', maxTokens: 35, bookedTokens: 22, mode: 'In-Person' }]
      },
      {
        day: 'Thursday',
        shifts: [{ startTime: '09:00 AM', endTime: '01:30 PM', roomOrOPD: 'Room 204', maxTokens: 35, bookedTokens: 31, mode: 'In-Person' }]
      },
      {
        day: 'Saturday',
        shifts: [{ startTime: '09:00 AM', endTime: '12:30 PM', roomOrOPD: 'Room 204', maxTokens: 25, bookedTokens: 15, mode: 'In-Person' }]
      }
    ],
    specializations: ['Coronary Angioplasty', 'Heart Failure Management', 'Women Cardiac Health'],
    bio: 'Pioneered several complex radial angioplasty procedures at AIIMS with clinical publications in premier global cardiology journals.',
    rating: 4.9,
    reviewsCount: 510
  },
  {
    id: 'doc-safdarjung-ortho-1',
    name: 'Dr. Harpreet Singh Anand',
    hindiName: 'डॉ. हरप्रीत सिंह आनंद',
    gender: 'Male',
    designation: 'Senior Consultant & Orthopedic Surgeon',
    qualifications: 'MBBS, MS (Orthopedics), MCh (Joint Replacement)',
    experienceYears: 19,
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics & Joint Replacement',
    hospitalId: 'safdarjung-hospital',
    hospitalName: 'Vardhman Mahavir Medical College & Safdarjung Hospital',
    sector: 'government',
    opdRoom: 'Sports Injury Centre, OPD Cabin 6',
    consultationFee: 0,
    languages: ['Hindi', 'Punjabi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 10:00 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:00 PM', roomOrOPD: 'Cabin 6', maxTokens: 50, bookedTokens: 35, mode: 'In-Person' }]
      },
      {
        day: 'Wednesday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:00 PM', roomOrOPD: 'Cabin 6', maxTokens: 50, bookedTokens: 42, mode: 'In-Person' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:00 PM', roomOrOPD: 'Cabin 6', maxTokens: 50, bookedTokens: 29, mode: 'In-Person' }]
      }
    ],
    specializations: ['Complex Trauma Reconstruction', 'Knee & Hip Arthroplasty', 'Arthroscopic Sports Surgeries'],
    bio: 'Specialist at Safdarjung Sports Injury Centre, helping athletes and senior citizens regain complete mobility.',
    rating: 4.8,
    reviewsCount: 420
  },
  {
    id: 'doc-kgmu-neuro-1',
    name: 'Dr. Akhilesh Chandra Srivastava',
    hindiName: 'डॉ. अखिलेश चंद्र श्रीवास्तव',
    gender: 'Male',
    designation: 'Professor & Head of Neurology',
    qualifications: 'MBBS, MD (Medicine), DM (Neurology)',
    experienceYears: 24,
    departmentId: 'neurology',
    departmentName: 'Neurology',
    hospitalId: 'kgmu-lucknow',
    hospitalName: "King George's Medical University (KGMU)",
    sector: 'government',
    opdRoom: 'Shatabdi Block, Room 102',
    consultationFee: 0,
    languages: ['Hindi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 09:00 AM',
    schedule: [
      {
        day: 'Tuesday',
        shifts: [{ startTime: '08:30 AM', endTime: '02:00 PM', roomOrOPD: 'Room 102', maxTokens: 45, bookedTokens: 38, mode: 'In-Person' }]
      },
      {
        day: 'Thursday',
        shifts: [{ startTime: '08:30 AM', endTime: '02:00 PM', roomOrOPD: 'Room 102', maxTokens: 45, bookedTokens: 41, mode: 'In-Person' }]
      }
    ],
    specializations: ['Stroke Care', 'Epilepsy & Refractory Seizures', 'Parkinsonism'],
    bio: 'Pioneered acute ischemic stroke thrombolytic therapy protocols across Uttar Pradesh regional network hospitals.',
    rating: 4.8,
    reviewsCount: 310
  },
  {
    id: 'doc-apollo-cardio-1',
    name: 'Dr. Vivek K. Chaturvedi',
    hindiName: 'डॉ. विवेक के. चतुर्वेदी',
    gender: 'Male',
    designation: 'Director & Chief Interventional Cardiologist',
    qualifications: 'MBBS, MD, DM (Cardiology), FACC, FSCAI (USA)',
    experienceYears: 26,
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    hospitalId: 'apollo-delhi',
    hospitalName: 'Indraprastha Apollo Hospitals',
    sector: 'private',
    opdRoom: 'Heart Centre, Suite 301',
    consultationFee: 1500,
    languages: ['Hindi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Today, 03:30 PM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '10:00 AM', endTime: '02:00 PM', roomOrOPD: 'Suite 301', maxTokens: 20, bookedTokens: 12, mode: 'In-Person' }, { startTime: '03:00 PM', endTime: '06:00 PM', roomOrOPD: 'Suite 301', maxTokens: 15, bookedTokens: 8, mode: 'Both' }]
      },
      {
        day: 'Tuesday',
        shifts: [{ startTime: '10:00 AM', endTime: '02:00 PM', roomOrOPD: 'Suite 301', maxTokens: 20, bookedTokens: 16, mode: 'In-Person' }]
      },
      {
        day: 'Thursday',
        shifts: [{ startTime: '10:00 AM', endTime: '02:00 PM', roomOrOPD: 'Suite 301', maxTokens: 20, bookedTokens: 14, mode: 'In-Person' }, { startTime: '03:00 PM', endTime: '06:00 PM', roomOrOPD: 'Suite 301', maxTokens: 15, bookedTokens: 9, mode: 'Teleconsultation' }]
      },
      {
        day: 'Saturday',
        shifts: [{ startTime: '10:00 AM', endTime: '02:00 PM', roomOrOPD: 'Suite 301', maxTokens: 20, bookedTokens: 18, mode: 'In-Person' }]
      }
    ],
    specializations: ['Transcatheter Aortic Valve Replacement (TAVR)', 'Complex Bifurcation Angioplasty', 'Heart Rhythm Management'],
    bio: 'Conducted over 15,000 coronary angiographies and angioplasties with international clinical certifications.',
    rating: 4.9,
    reviewsCount: 640
  },
  {
    id: 'doc-apollo-oncology-1',
    name: 'Dr. Shalini Mukhopadhyay',
    hindiName: 'डॉ. शालिनी मुखोपाध्याय',
    gender: 'Female',
    designation: 'Senior Consultant - Medical Oncology',
    qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology), ESMO Certified',
    experienceYears: 18,
    departmentId: 'oncology',
    departmentName: 'Medical & Surgical Oncology',
    hospitalId: 'apollo-delhi',
    hospitalName: 'Indraprastha Apollo Hospitals',
    sector: 'private',
    opdRoom: 'Apollo Cancer Institute, Room 12',
    consultationFee: 1600,
    languages: ['English', 'Hindi', 'Bengali'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 11:30 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '11:00 AM', endTime: '04:00 PM', roomOrOPD: 'Room 12', maxTokens: 20, bookedTokens: 14, mode: 'In-Person' }]
      },
      {
        day: 'Wednesday',
        shifts: [{ startTime: '11:00 AM', endTime: '04:00 PM', roomOrOPD: 'Room 12', maxTokens: 20, bookedTokens: 12, mode: 'Both' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '11:00 AM', endTime: '04:00 PM', roomOrOPD: 'Room 12', maxTokens: 20, bookedTokens: 9, mode: 'In-Person' }]
      }
    ],
    specializations: ['Breast & Gynecological Cancers', 'Targeted Immunotherapy', 'Precision Genomics'],
    bio: 'Dedicated oncology expert focused on personalized cancer therapies, molecular profiling, and compassionate patient rehabilitation.',
    rating: 4.8,
    reviewsCount: 290
  },
  {
    id: 'doc-max-pediatrics-1',
    name: 'Dr. Rohan Mehra',
    hindiName: 'डॉ. रोहन मेहरा',
    gender: 'Male',
    designation: 'Principal Consultant - Pediatrics & Neonatology',
    qualifications: 'MBBS, MD (Pediatrics), Fellowship in Neonatal Intensive Care',
    experienceYears: 16,
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatology',
    hospitalId: 'max-healthcare-saket',
    hospitalName: 'Max Super Speciality Hospital, Saket',
    sector: 'private',
    opdRoom: 'Child Health Clinic, Floor 2',
    consultationFee: 1200,
    languages: ['Hindi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Today, 04:00 PM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '09:00 AM', endTime: '01:00 PM', roomOrOPD: 'Floor 2', maxTokens: 25, bookedTokens: 18, mode: 'In-Person' }]
      },
      {
        day: 'Tuesday',
        shifts: [{ startTime: '02:00 PM', endTime: '06:00 PM', roomOrOPD: 'Floor 2', maxTokens: 25, bookedTokens: 10, mode: 'Both' }]
      },
      {
        day: 'Thursday',
        shifts: [{ startTime: '09:00 AM', endTime: '01:00 PM', roomOrOPD: 'Floor 2', maxTokens: 25, bookedTokens: 15, mode: 'In-Person' }]
      },
      {
        day: 'Saturday',
        shifts: [{ startTime: '10:00 AM', endTime: '03:00 PM', roomOrOPD: 'Floor 2', maxTokens: 25, bookedTokens: 21, mode: 'In-Person' }]
      }
    ],
    specializations: ['Pediatric Asthma', 'Neonatal Critical Care', 'Developmental Milestone Assessment'],
    bio: 'Renowned child specialist with extensive experience in gentle pediatric examinations and newborn intensive care.',
    rating: 4.9,
    reviewsCount: 480
  },
  {
    id: 'doc-manipal-gastro-1',
    name: 'Dr. Arvind Swaminathan',
    hindiName: 'डॉ. अरविंद स्वामीनाथन',
    gender: 'Male',
    designation: 'Senior Consultant - Medical Gastroenterology',
    qualifications: 'MBBS, MD (Medicine), DM (Gastroenterology), FACG',
    experienceYears: 20,
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    hospitalId: 'manipal-hospital-bengaluru',
    hospitalName: 'Manipal Hospital HAL Airport Road',
    sector: 'private',
    opdRoom: 'Digestive Health Suite 202',
    consultationFee: 1100,
    languages: ['English', 'Kannada', 'Hindi'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 10:30 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '09:30 AM', endTime: '01:30 PM', roomOrOPD: 'Suite 202', maxTokens: 20, bookedTokens: 12, mode: 'In-Person' }]
      },
      {
        day: 'Wednesday',
        shifts: [{ startTime: '09:30 AM', endTime: '01:30 PM', roomOrOPD: 'Suite 202', maxTokens: 20, bookedTokens: 14, mode: 'In-Person' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '02:00 PM', endTime: '06:00 PM', roomOrOPD: 'Suite 202', maxTokens: 20, bookedTokens: 9, mode: 'Both' }]
      }
    ],
    specializations: ['Therapeutic Endoscopy & ERCP', 'Liver Cirrhosis & Fatty Liver', 'Inflammatory Bowel Disease (IBD)'],
    bio: 'Leading gastroenterologist in Bengaluru known for precision diagnostic endoscopy, colonoscopy, and fatty liver reversals.',
    rating: 4.7,
    reviewsCount: 340
  },
  {
    id: 'doc-ghaziabad-gynec-1',
    name: 'Dr. Vandana Verma',
    hindiName: 'डॉ. वंदना वर्मा',
    gender: 'Female',
    designation: 'Senior Medical Officer - Obstetrics & Gynecology',
    qualifications: 'MBBS, MS (Obstetrics & Gynecology), DNB',
    experienceYears: 17,
    departmentId: 'gynecology',
    departmentName: 'Obstetrics & Gynecology',
    hospitalId: 'district-hospital-ghaziabad',
    hospitalName: 'MMG District Government Hospital',
    sector: 'government',
    opdRoom: 'Maternity Wing, Room 3',
    consultationFee: 0,
    languages: ['Hindi', 'English'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 08:30 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '08:00 AM', endTime: '02:00 PM', roomOrOPD: 'Room 3', maxTokens: 60, bookedTokens: 41, mode: 'In-Person' }]
      },
      {
        day: 'Tuesday',
        shifts: [{ startTime: '08:00 AM', endTime: '02:00 PM', roomOrOPD: 'Room 3', maxTokens: 60, bookedTokens: 48, mode: 'In-Person' }]
      },
      {
        day: 'Thursday',
        shifts: [{ startTime: '08:00 AM', endTime: '02:00 PM', roomOrOPD: 'Room 3', maxTokens: 60, bookedTokens: 38, mode: 'In-Person' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '08:00 AM', endTime: '02:00 PM', roomOrOPD: 'Room 3', maxTokens: 60, bookedTokens: 44, mode: 'In-Person' }]
      }
    ],
    specializations: ['High-Risk Antenatal Care', 'Normal Delivery Management', 'Reproductive Health Counseling'],
    bio: 'Dedicated public health obstetrician overseeing thousands of safe, institutional childbirth deliveries under government schemes.',
    rating: 4.6,
    reviewsCount: 520
  },
  {
    id: 'doc-aiims-ophth-1',
    name: 'Dr. Pradeep Sen',
    hindiName: 'डॉ. प्रदीप सेन',
    gender: 'Male',
    designation: 'Professor of Ophthalmology',
    qualifications: 'MBBS, MD (Ophthalmology, AIIMS), FRCS (Glasgow)',
    experienceYears: 21,
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology (Eye Care)',
    hospitalId: 'aiims-new-delhi',
    hospitalName: 'All India Institute of Medical Sciences (AIIMS)',
    sector: 'government',
    opdRoom: 'Dr. R.P. Centre for Ophthalmic Sciences, Room 108',
    consultationFee: 0,
    languages: ['Hindi', 'English', 'Bengali'],
    availabilityStatus: 'Available',
    nextAvailableSlot: 'Tomorrow, 09:00 AM',
    schedule: [
      {
        day: 'Monday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 108', maxTokens: 50, bookedTokens: 38, mode: 'In-Person' }]
      },
      {
        day: 'Wednesday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 108', maxTokens: 50, bookedTokens: 43, mode: 'In-Person' }]
      },
      {
        day: 'Friday',
        shifts: [{ startTime: '08:30 AM', endTime: '01:30 PM', roomOrOPD: 'Room 108', maxTokens: 50, bookedTokens: 31, mode: 'In-Person' }]
      }
    ],
    specializations: ['Phaco Cataract Surgery', 'Corneal Transplantation', 'Refractive Vision Correction'],
    bio: 'Senior consultant at Dr. Rajendra Prasad Centre for Ophthalmic Sciences, AIIMS, pioneer in modern stitchless cataract procedures.',
    rating: 4.9,
    reviewsCount: 390
  }
];

export const BLOOD_STOCK: BloodStockItem[] = [
  {
    id: 'bs-1',
    bloodGroup: 'O+',
    hospitalName: 'AIIMS Central Blood Bank, New Delhi',
    hospitalType: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    unitsAvailable: 42,
    lastUpdated: '15 mins ago',
    contactNumber: '+91 11 2659 3443',
    verified: true
  },
  {
    id: 'bs-2',
    bloodGroup: 'O-',
    hospitalName: 'AIIMS Central Blood Bank, New Delhi',
    hospitalType: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    unitsAvailable: 8,
    lastUpdated: '20 mins ago',
    contactNumber: '+91 11 2659 3443',
    verified: true
  },
  {
    id: 'bs-3',
    bloodGroup: 'B+',
    hospitalName: 'Safdarjung Hospital Blood Bank, New Delhi',
    hospitalType: 'Government',
    city: 'New Delhi',
    state: 'Delhi',
    unitsAvailable: 56,
    lastUpdated: '35 mins ago',
    contactNumber: '+91 11 2616 8320',
    verified: true
  },
  {
    id: 'bs-4',
    bloodGroup: 'A+',
    hospitalName: 'KGMU Shatabdi Blood Centre, Lucknow',
    hospitalType: 'Government',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    unitsAvailable: 34,
    lastUpdated: '1 hour ago',
    contactNumber: '+91 522 225 7530',
    verified: true
  },
  {
    id: 'bs-5',
    bloodGroup: 'AB+',
    hospitalName: 'Apollo Hospital Rotary Blood Centre, Delhi',
    hospitalType: 'Private',
    city: 'New Delhi',
    state: 'Delhi',
    unitsAvailable: 19,
    lastUpdated: '45 mins ago',
    contactNumber: '+91 11 2692 5858',
    verified: true
  },
  {
    id: 'bs-6',
    bloodGroup: 'AB-',
    hospitalName: 'Red Cross Society Blood Bank, Delhi',
    hospitalType: 'Red Cross',
    city: 'New Delhi',
    state: 'Delhi',
    unitsAvailable: 6,
    lastUpdated: '2 hours ago',
    contactNumber: '+91 11 2371 1551',
    verified: true
  },
  {
    id: 'bs-7',
    bloodGroup: 'B-',
    hospitalName: 'Manipal Hospital Blood Bank, Bengaluru',
    hospitalType: 'Private',
    city: 'Bengaluru',
    state: 'Karnataka',
    unitsAvailable: 14,
    lastUpdated: '1 hour ago',
    contactNumber: '+91 80 2502 4455',
    verified: true
  }
];

export const HEALTH_SCHEMES: HealthScheme[] = [
  {
    id: 'pmjay',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)',
    ministryOrAuthority: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    category: 'Central Government',
    coverageAmount: '₹5,00,000 per family per year for secondary and tertiary hospitalization',
    eligibility: [
      'Families identified in Socio-Economic Caste Census (SECC 2011)',
      'Active Ration Card / RSBY beneficiary families',
      'All Senior Citizens aged 70+ years (expanded universal coverage regardless of income)',
      'Vulnerable rural and urban occupational worker categories'
    ],
    documentsRequired: [
      'Aadhaar Card (Mandatory for biometric/OTP e-KYC)',
      'Ration Card / Family ID document',
      'Active mobile number linked to Aadhaar'
    ],
    keyBenefits: [
      '100% Cashless treatment at all empaneled Government and Private hospitals across India',
      'Covers up to 3 days pre-hospitalization and 15 days post-hospitalization medicines & tests',
      'Pre-existing conditions covered from Day 1 with zero waiting period',
      'Over 1,949 medical procedures and surgeries included'
    ],
    officialPortal: 'https://beneficiary.nha.gov.in',
    tollFreeNumber: '14555 / 1800 111 565',
    cashlessHospitalsCount: '29,000+ Empaneled Hospitals Pan-India'
  },
  {
    id: 'cghs',
    name: 'Central Government Health Scheme (CGHS)',
    hindiName: 'केंद्रीय सरकार स्वास्थ्य योजना (सीजीएचएस)',
    ministryOrAuthority: 'Ministry of Health & Family Welfare',
    category: 'Central Government',
    coverageAmount: 'Comprehensive outpatient & inpatient medical reimbursement / cashless',
    eligibility: [
      'Serving Central Government employees & their dependent family members',
      'Central Government pensioners & family pensioners',
      'Members of Parliament (sitting and ex-MPs), Judges of Supreme Court & High Courts'
    ],
    documentsRequired: [
      'CGHS Plastic Card / Digital e-Card with Ben ID',
      'Aadhaar Card of employee and dependents',
      'Last Pay Certificate / Pension Payment Order (PPO)'
    ],
    keyBenefits: [
      'OPD consultation through Wellness Centres across all tier 1 and tier 2 cities',
      'Cashless hospital admission in empaneled private and government super-specialty hospitals',
      'Free distribution of all prescribed generic and branded medicines'
    ],
    officialPortal: 'https://cghs.nic.in',
    tollFreeNumber: '1800 208 8900',
    cashlessHospitalsCount: '1,800+ Empaneled Hospitals'
  },
  {
    id: 'jssk',
    name: 'Janani Shishu Suraksha Karyakram (JSSK)',
    hindiName: 'जननी शिशु सुरक्षा कार्यक्रम (जेएसएसके)',
    ministryOrAuthority: 'National Health Mission (NHM)',
    category: 'Central Government',
    coverageAmount: '100% Free institutional delivery & infant care (Zero Out-of-Pocket Expense)',
    eligibility: [
      'All pregnant women giving birth in public healthcare facilities',
      'All sick newborn infants up to 1 year of age'
    ],
    documentsRequired: [
      'Mother and Child Protection (MCP) Card / RCH ID',
      'Any government photo identity card'
    ],
    keyBenefits: [
      'Completely free and cashless delivery (both normal delivery and C-Section)',
      'Free medicines, consumables, and blood transfusion during hospital stay',
      'Free diagnostic lab tests and ultrasound',
      'Free transport from home to hospital and drop back home (dial 102)'
    ],
    officialPortal: 'https://nhm.gov.in',
    tollFreeNumber: '102 / 104',
    cashlessHospitalsCount: 'All Government District Hospitals, CHCs, and PHCs'
  },
  {
    id: 'dak',
    name: 'Delhi Arogya Kosh & Delhi Free Treatment Scheme',
    hindiName: 'दिल्ली आरोग्य कोष एवं निःशुल्क उपचार योजना',
    ministryOrAuthority: 'Government of NCT of Delhi',
    category: 'State Government',
    coverageAmount: 'Free designated high-end surgeries and diagnostics in private hospitals',
    eligibility: [
      'Residents of Delhi possessing valid Delhi Voter ID Card',
      'Referred from designated Delhi Government hospitals'
    ],
    documentsRequired: [
      'Delhi Voter ID Card (Mandatory residence proof)',
      'Referral slip from authorized Delhi Government Hospital doctor',
      'Aadhaar Card'
    ],
    keyBenefits: [
      'Free MRI, CT-Scan, and PET scans at accredited private diagnostic centres',
      'Cashless surgery in private hospitals if government hospital waitlist exceeds 30 days',
      'Full financial grant for critical trauma accident victims (Farishtey Scheme)'
    ],
    officialPortal: 'https://health.delhigovt.nic.in',
    tollFreeNumber: '1031',
    cashlessHospitalsCount: '80+ Private Hospitals and 50+ Diagnostic Centres in Delhi NCR'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    service: 'National Emergency Helpline',
    hindiService: 'अखिल भारतीय आपातकालीन नंबर',
    number: '112',
    description: 'Unified single emergency response for Police, Fire, and Ambulance.',
    hindiDescription: 'पुलिस, दमकल और एम्बुलेंस के लिए एकल अखिल भारतीय नंबर।',
    category: 'National Ambulance',
    is24x7: true
  },
  {
    service: 'Emergency Medical Ambulance Service',
    hindiService: 'आपातकालीन एम्बुलेंस सेवा',
    number: '108',
    description: 'Free 24x7 GPS-enabled ambulance for critical emergencies, accidents, and stroke.',
    hindiDescription: 'गंभीर आपात स्थिति और दुर्घटनाओं के लिए 24 घंटे जीपीएस युक्त एम्बुलेंस।',
    category: 'National Ambulance',
    is24x7: true
  },
  {
    service: 'Janani Shishu Suraksha (Maternal & Infant Ambulance)',
    hindiService: 'जननी शिशु सुरक्षा एम्बुलेंस (गर्भवती महिला व नवजात)',
    number: '102',
    description: 'Free dedicated transport for pregnant women in labour and sick infants.',
    hindiDescription: 'गर्भवती महिलाओं के प्रसव और बीमार नवजातों के लिए निःशुल्क एम्बुलेंस।',
    category: 'National Ambulance',
    is24x7: true
  },
  {
    service: 'National Health Helpline (MoHFW)',
    hindiService: 'राष्ट्रीय स्वास्थ्य हेल्पलाइन (स्वास्थ्य मंत्रालय)',
    number: '1075',
    description: 'Official guidance on communicable diseases, public hospital assistance, and health advisories.',
    hindiDescription: 'स्वास्थ्य मंत्रालय का आधिकारिक जानकारी व अस्पताल सहायता नंबर।',
    category: 'Specialized Helplines',
    is24x7: true
  },
  {
    service: 'Tele-MANAS (National Mental Health Helpline)',
    hindiService: 'टेली-मानस (राष्ट्रीय मानसिक स्वास्थ्य परामर्श)',
    number: '14416 / 1800 891 4416',
    description: 'Free confidential tele-counseling with certified clinical psychologists in 20+ languages.',
    hindiDescription: 'तनाव, अवसाद और मानसिक परेशानी के लिए 24 घंटे निःशुल्क और गोपनीय परामर्श।',
    category: 'Specialized Helplines',
    is24x7: true
  },
  {
    service: 'National Poison Information Centre (AIIMS)',
    hindiService: 'राष्ट्रीय विष सूचना केंद्र (एम्स नई दिल्ली)',
    number: '1800 116 117 / +91 11 2658 9391',
    description: '24x7 toxicological guidance for accidental chemical or medication poisoning.',
    hindiDescription: 'जहर या हानिकारक रसायनों के सेवन पर तत्काल 24 घंटे आपातकालीन चिकित्सा सलाह।',
    category: 'Specialized Helplines',
    is24x7: true
  },
  {
    service: 'Disability Helpline (Divyangjan Sarathi)',
    hindiService: 'दिव्यांगजन सहायता हेल्पलाइन',
    number: '1800 114 515',
    description: 'Support, hospital accessibility queries, and assistive devices for differently-abled citizens.',
    hindiDescription: 'दिव्यांग नागरिकों के लिए अस्पताल सुविधा और उपकरण सहायता केंद्र।',
    category: 'Specialized Helplines',
    is24x7: true
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-001',
    appointmentNumber: 'SJV-2026-91024',
    sector: 'government' as const,
    hospitalId: 'aiims-new-delhi',
    hospitalName: 'All India Institute of Medical Sciences (AIIMS)',
    hospitalAddress: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    doctorId: 'doc-aiims-med-1',
    doctorName: 'Prof. (Dr.) Rajeshwar Sharma',
    doctorQualification: 'MBBS, MD (General Medicine)',
    opdRoom: 'Room 14, Main OPD Building',
    appointmentDate: '2026-10-31',
    appointmentTime: '09:30 AM',
    slotPeriod: 'Morning' as const,
    consultationType: 'In-Person' as const,
    consultationFee: 0,
    tokenNumber: 14,
    status: 'Confirmed' as const,
    patient: {
      fullName: 'Rameshwar Dayal Gupta',
      age: 62,
      gender: 'Male' as const,
      phone: '+91 98765 43210',
      email: 'rameshwar.gupta@example.com',
      abhaId: '91-4521-8890-1204',
      address: 'House 42, Sector 15, Rohini, Delhi',
      symptomsOrReason: 'Uncontrolled blood sugar levels and persistent fatigue for 3 weeks.',
      isSeniorCitizenOrDifferentlyAbled: true
    },
    bookedAt: '2026-10-29 10:30 AM',
    reportingTime: '08:45 AM (45 mins prior to slot)',
    counterInstructions: 'Report to Central OPD Counter 12 for express identity verification. Carry valid photo ID and ABHA card.'
  },
  {
    id: 'apt-002',
    appointmentNumber: 'SJV-2026-91025',
    sector: 'private' as const,
    hospitalId: 'apollo-delhi',
    hospitalName: 'Indraprastha Apollo Hospitals',
    hospitalAddress: 'Sarita Vihar, Mathura Road, New Delhi',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    doctorId: 'doc-apollo-cardio-1',
    doctorName: 'Dr. Vivek K. Chaturvedi',
    doctorQualification: 'MBBS, MD, DM (Cardiology), FACC',
    opdRoom: 'Heart Centre, Suite 301',
    appointmentDate: '2026-11-01',
    appointmentTime: '11:00 AM',
    slotPeriod: 'Morning' as const,
    consultationType: 'In-Person' as const,
    consultationFee: 1500,
    tokenNumber: 6,
    status: 'Confirmed' as const,
    patient: {
      fullName: 'Sunita Sharma',
      age: 48,
      gender: 'Female' as const,
      phone: '+91 98112 34567',
      email: 'sunita.sharma@example.com',
      abhaId: '14-8790-2341-9901',
      address: 'B-104, Green Park Extension, New Delhi',
      symptomsOrReason: 'Mild chest heaviness during brisk walking, routine cardiac review.',
      isSeniorCitizenOrDifferentlyAbled: false
    },
    bookedAt: '2026-10-29 02:15 PM',
    reportingTime: '10:30 AM (30 mins prior to slot)',
    counterInstructions: 'Proceed to Heart Centre Registration Desk on 3rd Floor with this digital slip.'
  }
];
