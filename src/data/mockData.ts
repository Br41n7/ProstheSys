import {
  Patient,
  ResidualLimbAssessment,
  SoapNote,
  DevicePrescription,
  FabricationWorkflow,
  RehabilitationSession,
  GaitAnalysisReport,
  InventoryItem,
  Invoice,
  Appointment,
  ClinicalImage,
  Message,
  NotificationItem,
  User
} from '../types';

export const CURRENT_USER: User = {
  id: 'usr-101',
  name: 'Dr. Chinedu Okafor, CPO',
  email: 'chinedu.okafor@prosthesys.ng',
  role: 'Prosthetist',
  specialty: 'Certified Prosthetist & Orthotist (CPO)',
  clinicName: 'Lagos National Orthopaedic Hospital Clinic'
};

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    mrn: 'PS-NG-2026-0814',
    name: 'Ebere Nnamdi',
    age: 52,
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    phone: '+234 803 234 5678',
    email: 'ebere.nnamdi@example.ng',
    occupation: 'Primary School Teacher',
    weightKg: 68,
    heightCm: 165,
    dominantHand: 'Right',
    lifestyle: 'Community ambulator, active teaching, local church activities',
    activityLevel: 'K2',
    amputationLevel: 'Transtibial (Below Knee)',
    affectedSide: 'Right',
    primaryDiagnosis: 'Peripheral vascular compromise secondary to Type 2 Diabetes',
    medicalConditions: ['Type 2 Diabetes Mellitus', 'Controlled Hypertension'],
    pastProstheses: ['Exoskeletal Conventional Wood Limb (2020) - complained of distal stump pain'],
    pastOrthoses: ['Custom Diabetic Arch Insoles'],
    primaryProsthetist: 'Dr. Chinedu Okafor, CPO',
    registrationDate: '2026-01-15',
    nextAppointment: '2026-08-05 (10:00 AM)',
    status: 'Fabrication'
  },
  {
    id: 'pat-002',
    mrn: 'PS-NG-2026-0921',
    name: 'Captain Ibrahim Musa',
    age: 39,
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    phone: '+234 802 876 5432',
    email: 'ibrahim.musa@example.ng',
    occupation: 'Logistics Officer & Veteran',
    weightKg: 80,
    heightCm: 180,
    dominantHand: 'Right',
    lifestyle: 'Active community ambulator, frequent travel between Abuja and Kaduna',
    activityLevel: 'K3',
    amputationLevel: 'Transfemoral (Above Knee)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Traumatic above-knee amputation secondary to road traffic accident',
    medicalConditions: ['None', 'Non-smoker', 'Mild residual limb phantom sensation'],
    pastProstheses: ['Transfemoral Socket with Single-Axis Mechanical Knee (2021)'],
    pastOrthoses: [],
    primaryProsthetist: 'Dr. Chinedu Okafor, CPO',
    registrationDate: '2026-02-10',
    nextAppointment: '2026-08-08 (02:00 PM)',
    status: 'Active Rehab'
  },
  {
    id: 'pat-003',
    mrn: 'PS-NG-2026-0442',
    name: 'Chidimma Okoro',
    age: 28,
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    phone: '+234 805 345 6789',
    email: 'chidimma.o@example.ng',
    occupation: 'Bank Customer Service Representative',
    weightKg: 58,
    heightCm: 162,
    dominantHand: 'Right',
    lifestyle: 'Desk job with daily public transit commute',
    activityLevel: 'K2',
    amputationLevel: 'Orthotic Need (AFO/KAFO/Spinal)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Post-polio paralysis resulting in severe L4-L5 dorsiflexor weakness (Drop Foot)',
    medicalConditions: ['Post-Polio Syndrome', 'Mild Compensatory Gait Deviation'],
    pastProstheses: [],
    pastOrthoses: ['Off-the-shelf Flexible AFO (causes lateral ankle chafing)'],
    primaryProsthetist: 'Dr. Chinedu Okafor, CPO',
    registrationDate: '2026-03-22',
    nextAppointment: '2026-08-02 (11:30 AM)',
    status: 'Fitting'
  },
  {
    id: 'pat-004',
    mrn: 'PS-NG-2026-0118',
    name: 'Pa Olayemi Folarin',
    age: 68,
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    phone: '+234 809 901 2345',
    email: 'olayemi.folarin@example.ng',
    occupation: 'Retired Civil Servant',
    weightKg: 74,
    heightCm: 172,
    dominantHand: 'Left',
    lifestyle: 'Indoor and household ambulation, uses wooden walking stick outdoors',
    activityLevel: 'K1',
    amputationLevel: 'Transtibial (Below Knee)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Ischemic limb necrosis post severe arterial occlusion',
    medicalConditions: ['Type 2 Diabetes', 'Osteoarthritis Right Knee'],
    pastProstheses: [],
    pastOrthoses: [],
    primaryProsthetist: 'Dr. Chinedu Okafor, CPO',
    registrationDate: '2026-04-05',
    nextAppointment: '2026-08-12 (09:00 AM)',
    status: 'Evaluation'
  }
];

export const INITIAL_ASSESSMENTS: ResidualLimbAssessment[] = [
  {
    id: 'ass-001',
    patientId: 'pat-001',
    assessmentDate: '2026-07-20',
    assessorName: 'Dr. Chinedu Okafor, CPO',
    skinIntegrity: 'Scarring',
    painScoreVas: 2,
    phantomPainSeverity: 'Mild',
    muscleStrengthMmt: 4,
    romDegrees: { flexion: 120, extension: -5 },
    balanceScore: 'Good',
    shape: 'Conical',
    circumferencesCm: [
      { distanceAboveDistal: 4, circumference: 31 },
      { distanceAboveDistal: 8, circumference: 34 },
      { distanceAboveDistal: 12, circumference: 37 },
      { distanceAboveDistal: 16, circumference: 40 }
    ],
    lengthCm: 15.5,
    boneLengthCm: 14.0,
    clinicalNotes: 'Residual limb is well-healed conical shape with stable distal pad tissue. Surgical scar along anterior distal tibia is well healed. Quadriceps MMT (4/5). Good candidate for a Total Surface Bearing polypropylene socket with SACH foot.'
  }
];

export const INITIAL_SOAP_NOTES: SoapNote[] = [
  {
    id: 'soap-001',
    patientId: 'pat-001',
    date: '2026-07-28',
    authorName: 'Dr. Chinedu Okafor, CPO',
    authorRole: 'Prosthetist',
    subjective: 'Patient reports mild pressure over the lateral fibular head during check-socket weight bearing test in the workshop. Expresses eagerness to begin trial walking.',
    objective: 'Diagnostic transparent check-socket trial: Observed minor pistoning (approx 3mm) during swing phase. Redness over lateral fibular head faded within 6 minutes post-doffing.',
    assessment: 'Fibular pressure indicates need for 2mm plaster relief at lateral fibular neck before vacuum lamination of the final polypropylene socket.',
    plan: '1. Modify plaster positive mold in workshop to add 2mm fibular head relief.\n2. Laminate 4mm polypropylene final socket with Kona suspension belt.\n3. Schedule check-socket refit in 4 days.',
    isAiGenerated: true
  }
];

export const INITIAL_PRESCRIPTIONS: DevicePrescription[] = [
  {
    id: 'rx-001',
    patientId: 'pat-001',
    prescriptionDate: '2026-07-15',
    prescribingClinician: 'Dr. Chinedu Okafor, CPO',
    type: 'Prosthesis',
    deviceName: 'Transtibial Polypropylene Prosthesis with SACH Foot',
    socketType: 'Total Surface Bearing (TSB) Polypropylene Socket',
    suspensionSystem: 'Neoprene Sleeve & Kona Webbing Suspension Belt',
    componentFootOrJoint: 'Standard Rubber SACH Foot (Size 25cm)',
    linerType: '6mm EVA Padded Foam Liner with Prosthetic Socks',
    material: 'Polypropylene Thermoplastic / Aluminum Pylon',
    specialInstructions: 'Provide 3mm plaster relief over lateral fibular head. Reinforce distal socket brim.',
    status: 'In Fabrication',
    estimatedDeliveryDate: '2026-08-10'
  },
  {
    id: 'rx-002',
    patientId: 'pat-002',
    prescriptionDate: '2026-06-10',
    prescribingClinician: 'Dr. Chinedu Okafor, CPO',
    type: 'Prosthesis',
    deviceName: 'Transfemoral Modular Prosthesis with Mechanical Knee',
    socketType: 'Polypropylene Ischial Containment Socket',
    suspensionSystem: 'Silesian Belt Suspension with Suction Valve',
    componentFootOrJoint: 'Single-Axis Mechanical Friction Knee & SACH Foot',
    linerType: '3mm Foam Socket Liner',
    material: 'Polypropylene / Aluminum Pylon',
    specialInstructions: 'Calibrate knee friction parameters for comfortable outdoor walk pace.',
    status: 'Delivered',
    estimatedDeliveryDate: '2026-07-01'
  }
];

export const INITIAL_FABRICATION_WORKFLOWS: FabricationWorkflow[] = [
  {
    id: 'fab-001',
    patientId: 'pat-001',
    deviceId: 'rx-001',
    deviceName: 'Transtibial Right Polypropylene Limb',
    currentStage: 'Manufacturing / Lamination',
    targetCompletionDate: '2026-08-08',
    stages: [
      { stageName: 'Assessment & Cast', status: 'Completed', completedAt: '2026-07-16', technician: 'Tech Babatunde', notes: 'Plaster of Paris wrap cast taken with distal end compression.' },
      { stageName: 'Casting / Scanning', status: 'Completed', completedAt: '2026-07-18', technician: 'Tech Babatunde', notes: 'Positive plaster mold poured and smoothed.' },
      { stageName: 'CAD Modification', status: 'Completed', completedAt: '2026-07-20', technician: 'Dr. Okafor, CPO', notes: 'Plaster modification: 3mm Patellar tendon reduction, fibular relief.' },
      { stageName: 'Positive Mold / 3D Print', status: 'Completed', completedAt: '2026-07-22', technician: 'Tech Babatunde', notes: 'Plaster positive mold prepped for thermoforming.' },
      { stageName: 'Manufacturing / Lamination', status: 'In Progress', technician: 'Tech Babatunde', notes: 'Vacuum thermoforming of 4mm polypropylene sheet underway.' },
      { stageName: 'Component Assembly', status: 'Pending' },
      { stageName: 'Bench Alignment', status: 'Pending' },
      { stageName: 'Check Socket Fitting', status: 'Pending' },
      { stageName: 'Final Delivery', status: 'Pending' },
      { stageName: 'Completed', status: 'Pending' }
    ]
  }
];

export const INITIAL_REHAB_SESSIONS: RehabilitationSession[] = [
  {
    id: 'reh-001',
    patientId: 'pat-002',
    sessionDate: '2026-07-25',
    therapistName: 'Folake Adebayo, PT',
    walkingDistanceMeters: 350,
    tugSeconds: 12.4,
    ampScore: 36,
    vasPainScore: 1,
    exercisesCompleted: [
      'Parallel bar gait progression (4x50m)',
      'Step-up exercises on 15cm wooden block (3x10 reps)',
      'Weight-shifting and single-leg stance practice'
    ],
    physioNotes: 'Patient Ibrahim demonstrates steady stance phase control with the mechanical knee joint. Good lateral hip stability. Progressing to outdoor walking practice.',
    goalsAchieved: ['Traversed parallel bars without handrail drag', 'TUG time under 15 seconds']
  }
];

export const INITIAL_GAIT_REPORTS: GaitAnalysisReport[] = [
  {
    id: 'gait-101',
    patientId: 'pat-001',
    analysisDate: '2026-07-27',
    detectedDeviations: [
      {
        deviationName: 'Vaulting',
        severity: 'Mild',
        gaitPhase: 'Swing Phase',
        causeAndFix: 'Sound side plantarflexes prematurely to clear prosthetic toe. Fix: Adjust pylon height by 3mm or reduce heel elevation.'
      },
      {
        deviationName: 'Pistoning',
        severity: 'Mild',
        gaitPhase: 'Stance Phase',
        causeAndFix: '3mm vertical movement inside check socket. Fix: Add 1-ply prosthetic sock or tighten suspension strap.'
      }
    ],
    stanceTimeLeftVsRight: 'Left (Sound) 55% / Right (Prosthetic) 45%',
    cadenceStepsPerMin: 92,
    gaitSymmetryIndex: 86,
    aiSummary: 'Favorable gait progression for transtibial amputee. Minor right swing clearance deficit causing slight vaulting. Socket sock adjustment will optimize toe clearance.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    sku: 'SACH-FT-25',
    name: 'Standard Rubber SACH Foot Unit (Size 25cm)',
    category: 'Feet',
    brand: 'Orthopaedic Components Ltd',
    quantityInStock: 8,
    reorderThreshold: 3,
    unitCostUsd: 35000, // Stored as NGN Naira
    supplierName: 'Lagos Medical Supplies',
    supplierContact: 'sales@lagosmed.ng',
    lastRestockedDate: '2026-07-01'
  },
  {
    id: 'inv-002',
    sku: 'PP-SHEET-04',
    name: 'Polypropylene Sheet 4mm (1200x800mm)',
    category: 'Sockets',
    brand: 'ThermoPlast NG',
    quantityInStock: 15,
    reorderThreshold: 5,
    unitCostUsd: 18000, // Stored as NGN Naira
    supplierName: 'Plastics West Africa',
    supplierContact: 'orders@plasticswa.ng',
    lastRestockedDate: '2026-06-15'
  },
  {
    id: 'inv-003',
    sku: 'MECH-KNEE-01',
    name: 'Mechanical Single-Axis Friction Knee Joint',
    category: 'Knees',
    brand: 'P&O Hardware',
    quantityInStock: 4,
    reorderThreshold: 2,
    unitCostUsd: 85000, // Stored as NGN Naira
    supplierName: 'National Orthopaedic Depot',
    supplierContact: 'depot@orthopaedic.gov.ng',
    lastRestockedDate: '2026-07-10'
  },
  {
    id: 'inv-004',
    sku: 'ALUM-PYL-30',
    name: 'Aluminum 30mm Pylon Tube & Tube Receiver',
    category: 'Pylons & Adapters',
    brand: 'Modular Limb Tech',
    quantityInStock: 20,
    reorderThreshold: 6,
    unitCostUsd: 22000, // Stored as NGN Naira
    supplierName: 'West African Limb Components',
    supplierContact: 'support@walimb.ng',
    lastRestockedDate: '2026-07-12'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-901',
    patientId: 'pat-001',
    patientName: 'Ebere Nnamdi',
    invoiceDate: '2026-07-22',
    dueDate: '2026-08-22',
    items: [
      { description: 'Transtibial Polypropylene Socket & Vacuum Thermoforming', code: 'PO-501', cost: 180000 },
      { description: 'Standard SACH Foot Unit (Size 25cm)', code: 'PO-102', cost: 35000 },
      { description: 'Aluminum Pylon Tube & Suspension Belt System', code: 'PO-204', cost: 25000 },
      { description: 'Clinical Assessment & Diagnostic Fitting Services', code: 'SRV-NG', cost: 40000 }
    ],
    totalAmount: 280000,
    insuranceCoveredAmount: 224000, // NHIS / HMO 80%
    patientPayAmount: 56000, // 20%
    status: 'Pending Insurance'
  },
  {
    id: 'inv-902',
    patientId: 'pat-002',
    patientName: 'Captain Ibrahim Musa',
    invoiceDate: '2026-06-15',
    dueDate: '2026-07-15',
    items: [
      { description: 'Transfemoral Polypropylene Socket & Mechanical Knee Assembly', code: 'PO-601', cost: 420000 },
      { description: 'Pelvic Suspension Belt & Alignment Tuning', code: 'PO-302', cost: 65000 }
    ],
    totalAmount: 485000,
    insuranceCoveredAmount: 485000, // Veterans Medical Scheme
    patientPayAmount: 0,
    status: 'Paid'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-301',
    patientId: 'pat-001',
    patientName: 'Ebere Nnamdi',
    clinicianName: 'Dr. Chinedu Okafor, CPO',
    dateTime: '2026-08-05T10:00:00',
    durationMins: 60,
    type: 'Check Socket Fit',
    status: 'Scheduled',
    notes: 'Evaluate fibular head relief and final polypropylene lamination fit.',
    reminderSentStatus: 'Sent via WhatsApp'
  },
  {
    id: 'apt-302',
    patientId: 'pat-003',
    patientName: 'Chidimma Okoro',
    clinicianName: 'Dr. Chinedu Okafor, CPO',
    dateTime: '2026-08-02T11:30:00',
    durationMins: 45,
    type: 'Final Fitting',
    status: 'Scheduled',
    notes: 'Custom polypropylene AFO alignment check inside standard walking shoes.',
    reminderSentStatus: 'Sent via SMS'
  },
  {
    id: 'apt-303',
    patientId: 'pat-002',
    patientName: 'Captain Ibrahim Musa',
    clinicianName: 'Folake Adebayo, PT',
    dateTime: '2026-08-08T14:00:00',
    durationMins: 60,
    type: 'Rehab Session',
    status: 'Scheduled',
    notes: 'Gait retraining & obstacle negotiation in parallel bars.',
    reminderSentStatus: 'Sent via WhatsApp'
  }
];

export const INITIAL_IMAGES: ClinicalImage[] = [
  {
    id: 'img-001',
    patientId: 'pat-001',
    uploadedAt: '2026-07-20',
    category: 'Residual Limb',
    title: 'Transtibial Residual Limb Assessment',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    caption: 'Clean anterior tibial surgical suture line, well-shaped conical stump.'
  },
  {
    id: 'img-002',
    patientId: 'pat-001',
    uploadedAt: '2026-07-25',
    category: 'Socket Fit',
    title: 'Diagnostic Check Socket Weight Bearing Inspection',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    caption: 'Transparent check socket showing patellar tendon bearing distribution.'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-01',
    senderName: 'Ebere Nnamdi',
    senderRole: 'Patient',
    recipientName: 'Dr. Chinedu Okafor, CPO',
    timestamp: '2026-07-30 09:15 AM',
    content: 'Good morning Dr. Okafor! The foam liner feels comfortable today. I noticed no redness after walking at home.'
  },
  {
    id: 'msg-02',
    senderName: 'Dr. Chinedu Okafor, CPO',
    senderRole: 'Prosthetist',
    recipientName: 'Ebere Nnamdi',
    timestamp: '2026-07-30 09:42 AM',
    content: 'Good morning Mrs. Nnamdi! Glad to hear that. See you on August 5th at the Lagos clinic for our final socket fitting!'
  }
];

export const mockClinics = [
  { id: 'c1', name: 'Lagos National Orthopaedic Hospital Clinic', address: 'Igbobi, Somolu', city: 'Lagos State', country: 'Nigeria' },
  { id: 'c2', name: 'Abuja Rehabilitation & Prosthetics Hub', address: 'Central Business District', city: 'Abuja (FCT)', country: 'Nigeria' },
  { id: 'c3', name: 'Enugu P&O Care & Orthotics Center', address: 'Independence Layout', city: 'Enugu', country: 'Nigeria' },
  { id: 'c4', name: 'Ibadan Physical Medicine & Limb Lab', address: 'Ring Road', city: 'Ibadan, Oyo State', country: 'Nigeria' }
];

export const mockPatients = INITIAL_PATIENTS;
export const mockAssessments = INITIAL_ASSESSMENTS;
export const mockSoapNotes = INITIAL_SOAP_NOTES;
export const mockPrescriptions = INITIAL_PRESCRIPTIONS;
export const mockFabricationWorkflows = INITIAL_FABRICATION_WORKFLOWS;
export const mockRehabSessions = INITIAL_REHAB_SESSIONS;
export const mockInventory = INITIAL_INVENTORY;
export const mockInvoices = INITIAL_INVOICES;
export const mockGaitReports = INITIAL_GAIT_REPORTS;
export const mockClinicalImages = INITIAL_IMAGES;
export const mockAppointments = INITIAL_APPOINTMENTS;

