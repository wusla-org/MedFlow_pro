export interface Job {
  id: string;
  title: string;
  client: string; // Medical Director
  location: string;
  salary: string; // Target Revenue (AED)
  vacancies: number; // Allocated Rooms
  status: "Active" | "Closed" | "Draft";
  priority: "High" | "Medium" | "Low";
}

export interface Candidate {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  location: string;
  nationality: string;
  experienceYears: number; // Sessions Attended
  skills: string[]; // Medical Procedures
  visaStatus: "Immediate Joiner (Resident)" | "Visa Sponsorship Required" | "Emiratisation Eligible" | "Saudi National (Saudization)"; // Insurance Plan
  drivingLicense: boolean; // Medical Consent Signed
  score: number; // AI Diagnostic Accuracy %
  status: "Applied" | "Shortlisted" | "Screened" | "Interviewing" | "Offered" | "Rejected"; // Clinic Status
  currentRole: string; // Chief Complaint / Diagnosis
  previousEmployer: string; // Attending Specialist
  jobId: string; // Linked Department
  notes?: string;
  parsedAt?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: "candidate" | "ai"; // patient | ai
  text: string;
  timestamp: string;
}

export interface WhatsAppChatSession {
  id: string;
  candidateName: string;
  candidatePhone: string;
  messages: WhatsAppMessage[];
  status: "active" | "completed";
}

export const mockJobs: Job[] = [
  {
    id: "job-hvac",
    title: "Dental & Orthodontics",
    client: "Dr. Sarah Al-Sayed, DDS",
    location: "Dubai Health Care City, UAE",
    salary: "AED 120,000 - 150,000",
    vacancies: 6,
    status: "Active",
    priority: "High"
  },
  {
    id: "job-nurse",
    title: "Aesthetic & Laser Clinic",
    client: "Dr. Elena Rostova, MD",
    location: "Jumeirah 2, Dubai",
    salary: "AED 180,000 - 220,000",
    vacancies: 4,
    status: "Active",
    priority: "High"
  },
  {
    id: "job-dev",
    title: "Physiotherapy & Rehab",
    client: "Dr. Anas Ahmed, PT",
    location: "Al Barsha 1, Dubai",
    salary: "AED 95,000 - 110,000",
    vacancies: 5,
    status: "Active",
    priority: "Medium"
  },
  {
    id: "job-sales",
    title: "Cosmetic & Plastic Surgery",
    client: "Dr. Tariq Al-Enazi, FACS",
    location: "Olaya, Riyadh, KSA",
    salary: "SAR 250,000 - 320,000",
    vacancies: 3,
    status: "Active",
    priority: "High"
  }
];

export const mockInitialCandidates: Candidate[] = [
  {
    id: "cand-initial-1",
    name: "Sarah Al-Mansoori",
    age: 28,
    phone: "+971 52 111 2233",
    email: "s.mansoori@government.ae",
    location: "Dubai, UAE",
    nationality: "Emirati",
    experienceYears: 4,
    skills: ["Laser Resurfacing", "Hydrafacial", "Chemical Peels", "Botox Injection"],
    visaStatus: "Emiratisation Eligible", // Thiqa Premium
    drivingLicense: true, // Consent Signed
    score: 95,
    status: "Interviewing", // In Consultation
    currentRole: "Severe Facial Hyperpigmentation",
    previousEmployer: "Dr. Elena Rostova",
    jobId: "job-nurse",
    notes: "Patient requests evening treatment. Checked insurance eligibility with Daman. Verified consent forms."
  },
  {
    id: "cand-initial-2",
    name: "Tariq Al-Habtoor",
    age: 34,
    phone: "+966 50 444 5566",
    email: "t.habtoor@habtoorgroup.com",
    location: "Riyadh, Saudi Arabia",
    nationality: "Saudi Arabian",
    experienceYears: 8,
    skills: ["Dental Veneers", "Root Canal", "Orthodontic Aligners", "Bone Grafting"],
    visaStatus: "Saudi National (Saudization)", // Saudi GOSI Covered
    drivingLicense: true, // Consent Signed
    score: 92,
    status: "Shortlisted", // Scheduled
    currentRole: "Class II Malocclusion & Incisor Crowding",
    previousEmployer: "Dr. Tariq Al-Enazi",
    jobId: "job-sales",
    notes: "Requires panoramic X-ray file review. Fitment scheduled for Riyadh branch next Tuesday."
  },
  {
    id: "cand-initial-3",
    name: "Anas Al-Shaikh",
    age: 31,
    phone: "+971 56 333 4444",
    email: "anas.shaikh@dubaiclinic.ae",
    location: "Dubai, UAE",
    nationality: "Jordanian",
    experienceYears: 6,
    skills: ["Post-Op Rehab", "Lumbago Physical Therapy", "Dry Needling", "Therapeutic Massage"],
    visaStatus: "Immediate Joiner (Resident)", // Daman Platinum Plus
    drivingLicense: true, // Consent Signed
    score: 88,
    status: "Screened", // Intake Complete
    currentRole: "L4/L5 Herniated Disc Post-Surgical Rehab",
    previousEmployer: "Dr. Anas Ahmed",
    jobId: "job-dev",
    notes: "Pain level reported at 7/10. Requires decompression therapy slots in Treatment Room 3."
  }
];

// Helper to get relative ISO string
const getISOOffset = (hourOffset = 0) => {
  const d = new Date();
  d.setHours(d.getHours() + hourOffset);
  return d.toISOString();
};

// 12 patients for the Clinical uploader WOW simulation
export const mockUploadedCandidates: Candidate[] = [
  {
    id: "cand-hvac-1",
    name: "Fatima Al-Suwaidi",
    age: 35,
    phone: "+971 50 888 1234",
    email: "fatima.suwaidi@adnoc.ae",
    location: "Dubai, UAE",
    nationality: "Emirati",
    experienceYears: 5,
    skills: ["Dental Veneers", "Teeth Whitening", "Invisalign Aligners"],
    visaStatus: "Immediate Joiner (Resident)", // Daman Premium
    drivingLicense: true, // Consent Signed
    score: 96,
    status: "Applied", // New Patient Intake
    currentRole: "Aesthetic Restoration & Veneers",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Wants immediate digital smile design mockup. Verified insurance pre-approval."
  },
  {
    id: "cand-hvac-2",
    name: "Mustafa Al-Hashimi",
    age: 39,
    phone: "+971 52 999 5678",
    email: "mustafa.hashimi@dewa.ae",
    location: "Abu Dhabi, UAE",
    nationality: "Egyptian",
    experienceYears: 10,
    skills: ["Dental Implants", "Crowns & Bridges", "Bone Grafting"],
    visaStatus: "Visa Sponsorship Required", // Self Pay
    drivingLicense: true, // Consent Signed
    score: 94,
    status: "Applied",
    currentRole: "Partial Edentulism & Implant Placement",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Needs clinical quote for 3 implants. Self-pay consultation invoice drafted."
  },
  {
    id: "cand-hvac-3",
    name: "Joseph Santos",
    age: 29,
    phone: "+971 55 777 4321",
    email: "j.santos@sharjahrehab.ae",
    location: "Sharjah, UAE",
    nationality: "Filipino",
    experienceYears: 3,
    skills: ["Root Canal", "Pulpotomy", "Composite Fillings"],
    visaStatus: "Immediate Joiner (Resident)", // Nextcare Premium
    drivingLicense: true,
    score: 91,
    status: "Applied",
    currentRole: "Acute Pulpitis - Upper Left Premolar",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Emergency patient scheduled for single-session root canal therapy."
  },
  {
    id: "cand-hvac-4",
    name: "Ahmed Al-Mansoori",
    age: 26,
    phone: "+966 55 111 8888",
    email: "a.mansoori@ksahealth.gov.sa",
    location: "Riyadh, Saudi Arabia",
    nationality: "Saudi Arabian",
    experienceYears: 2,
    skills: ["Wisdom Teeth Extraction", "Impacted Molar Removal", "General Anesthesia"],
    visaStatus: "Saudi National (Saudization)", // GOSI Covered
    drivingLicense: true,
    score: 88,
    status: "Applied",
    currentRole: "Surgically Impacted Mandibular Third Molars",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Requires panoramic X-ray and CT scan files uploaded. Dental consent completed."
  },
  {
    id: "cand-hvac-5",
    name: "Johnathan Smith",
    age: 42,
    phone: "+44 7911 123456",
    email: "jsmith@londonmd.co.uk",
    location: "London, UK",
    nationality: "British",
    experienceYears: 12,
    skills: ["Dental Crowns", "Ceramic Inlays", "Invisalign Aligners"],
    visaStatus: "Visa Sponsorship Required", // Self Pay International
    drivingLicense: true,
    score: 95,
    status: "Applied",
    currentRole: "Full Mouth Ceramic Rehabilitation",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "International executive patient. Self-pay wire transfer confirmed."
  },
  {
    id: "cand-hvac-6",
    name: "Vikram Patel",
    age: 33,
    phone: "+971 56 444 9900",
    email: "v.patel@mumbaiclinic.in",
    location: "Abu Dhabi, UAE",
    nationality: "Indian",
    experienceYears: 7,
    skills: ["Gingival Grafting", "Periodontal Debridement", "Laser Therapy"],
    visaStatus: "Immediate Joiner (Resident)", // Daman Standard
    drivingLicense: false,
    score: 87,
    status: "Applied",
    currentRole: "Chronic Periodontitis & Pocketing",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Scheduled for deep root planing and localized laser therapy session."
  },
  {
    id: "cand-hvac-7",
    name: "Saeed Al-Suwaidi",
    age: 25,
    phone: "+971 50 555 6677",
    email: "saeed.suwaidi@dewa.ae",
    location: "Dubai, UAE",
    nationality: "Emirati",
    experienceYears: 2,
    skills: ["Routine Prophylaxis", "Scaling & Polishing", "Fluoride Application"],
    visaStatus: "Emiratisation Eligible", // Thiqa Covered
    drivingLicense: true,
    score: 85,
    status: "Applied",
    currentRole: "Gingival Bleeding & Calculus Build-up",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Scheduled for dental hygiene scaling with ultrasonic scaler."
  },
  {
    id: "cand-hvac-8",
    name: "Manuel Ortega",
    age: 31,
    phone: "+971 52 888 7766",
    email: "manuel.o@carrier-ae.es",
    location: "Dubai, UAE",
    nationality: "Spanish",
    experienceYears: 6,
    skills: ["Dental Implants", "Prosthetics", "Ceramic Crowns"],
    visaStatus: "Immediate Joiner (Resident)", // Bupa Global
    drivingLicense: true,
    score: 89,
    status: "Applied",
    currentRole: "Single Tooth Replacement - Upper Right Canine",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Verified Daman pre-auth approval. Scheduled implant post fitting."
  },
  {
    id: "cand-hvac-9",
    name: "Kamran Khan",
    age: 37,
    phone: "+92 300 1234567",
    email: "kamran.khan@shifa.pk",
    location: "Karachi, Pakistan",
    nationality: "Pakistani",
    experienceYears: 8,
    skills: ["Composite fillings", "Pulp Capping", "Crowns"],
    visaStatus: "Visa Sponsorship Required", // Self Pay
    drivingLicense: true,
    score: 86,
    status: "Applied",
    currentRole: "Deep Dental Caries - Lower Right Second Molar",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Needs local anesthetic consult. Scheduled for composite restorations."
  },
  {
    id: "cand-hvac-10",
    name: "Nasser Al-Dossari",
    age: 30,
    phone: "+966 53 222 9999",
    email: "n.dossari@aramco.com.sa",
    location: "Dammam, KSA",
    nationality: "Saudi Arabian",
    experienceYears: 4,
    skills: ["Aligners Fitting", "Archwire Adjustment", "Debonding"],
    visaStatus: "Saudi National (Saudization)", // GOSI Covered
    drivingLicense: true,
    score: 84,
    status: "Applied",
    currentRole: "Invisalign Progress Check & IPR Session",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Requires archwire change check. Invisalign aligners batch #12 delivered."
  },
  {
    id: "cand-hvac-11",
    name: "Jerome Dubois",
    age: 27,
    phone: "+971 58 444 3322",
    email: "j.dubois@frenchembassy.ae",
    location: "Dubai, UAE",
    nationality: "French",
    experienceYears: 4,
    skills: ["TMD Splint", "Occlusal Adjustment", "Night Guard"],
    visaStatus: "Immediate Joiner (Resident)", // AXA Premium
    drivingLicense: true,
    score: 83,
    status: "Applied",
    currentRole: "Temporomandibular Joint Dysfunction & Bruxism",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Suffering from nocturnal bruxism. Scheduled for digital scan of mouth guard."
  },
  {
    id: "cand-hvac-12",
    name: "Amit Patel",
    age: 28,
    phone: "+971 56 999 1122",
    email: "amit.patel@mumbaidental.in",
    location: "Mumbai, India",
    nationality: "Indian",
    experienceYears: 5,
    skills: ["Root Canal Therapy", "Pulp Debridement", "Temporary Filling"],
    visaStatus: "Visa Sponsorship Required", // Self Pay
    drivingLicense: false,
    score: 82,
    status: "Applied",
    currentRole: "Re-treatment of failing Root Canal - Left Lower Molar",
    previousEmployer: "Dr. Sarah Al-Sayed",
    jobId: "job-hvac",
    parsedAt: getISOOffset(-2),
    notes: "Requires specialized endodontic microscope session. Scheduled for block injection."
  }
];

export const mockWhatsAppChats: WhatsAppChatSession[] = [
  {
    id: "chat-1",
    candidateName: "Sarah Al-Mansoori",
    candidatePhone: "+971 52 111 2233",
    status: "completed",
    messages: [
      { id: "m1", sender: "ai", text: "مرحباً سارة! أنا مساعدك الطبي الذكي من مركز مد فلو. لقد استلمنا طلب حجز موعد لاستشارة ليزر للبشرة. هل أنت متاحة للتأكيد؟", timestamp: getISOOffset(-1) },
      { id: "m2", sender: "candidate", text: "نعم، أنا مقيمة في دبي ومتاحة يوم الخميس صباحاً.", timestamp: getISOOffset(-1) },
      { id: "m3", sender: "ai", text: "ممتاز. هل تحملين بطاقة تأمين ضمان بلاتينيوم، أم ترغبين بالدفع النقدي؟ وهل تم التوقيع على إقرار الموافقة الطبية إلكترونياً؟", timestamp: getISOOffset(-1) },
      { id: "m4", sender: "candidate", text: "أنا مؤمنة لدى ضمان بلاتينيوم، وقمت بالتوقيع على إقرار الموافقة الطبية عبر الرابط.", timestamp: getISOOffset(-1) },
      { id: "m5", sender: "ai", text: "رائع جداً! تم تأكيد موعدك يوم الخميس الساعة 11 صباحاً في عيادة الجميرة مع الدكتورة إيلينا روستوفا. سنرسل لكِ رابط الخريطة.", timestamp: getISOOffset(-1) }
    ]
  },
  {
    id: "chat-2",
    candidateName: "Mustafa Al-Hashimi",
    candidatePhone: "+971 52 999 5678",
    status: "active",
    messages: [
      { id: "m6", sender: "ai", text: "مرحباً مصطفى! هل ترغب في سداد قيمة زراعة الأسنان نقداً (دفع ذاتي)، أم تود إرسال بطاقة تأمينك للتحقق؟", timestamp: getISOOffset() },
      { id: "m7", sender: "candidate", text: "أفضل الدفع الذاتي. الرجاء إرسال عرض الأسعار لزراعة 3 أسنان.", timestamp: getISOOffset() }
    ]
  }
];
