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
  name: 'Dr. Marcus Vance, CPO',
  email: 'm.vance@prosthesys.clinic',
  role: 'Prosthetist',
  specialty: 'Certified Prosthetist & Orthotist (CPO)',
  clinicName: 'ProstheSys Center for Advanced Limb Restoration'
};

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    mrn: 'PS-2026-0814',
    name: 'Eleanor Vance',
    age: 54,
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    phone: '+1 (555) 234-5678',
    email: 'eleanor.vance@example.com',
    occupation: 'High School Biology Teacher',
    weightKg: 68,
    heightCm: 168,
    dominantHand: 'Right',
    lifestyle: 'Community ambulator, active teaching, mild weekend hiking',
    activityLevel: 'K3',
    amputationLevel: 'Transtibial (Below Knee)',
    affectedSide: 'Right',
    primaryDiagnosis: 'Peripheral Vascular Disease secondary to Type 2 Diabetes',
    medicalConditions: ['Type 2 Diabetes Mellitus', 'Controlled Hypertension', 'Mild Peripheral Neuropathy'],
    pastProstheses: ['PTB Socket with Pin Lock (2022) - complained of distal end pressure'],
    pastOrthoses: ['Custom Diabetic Foot Orthotics'],
    primaryProsthetist: 'Dr. Marcus Vance, CPO',
    registrationDate: '2026-01-15',
    nextAppointment: '2026-08-05 (10:00 AM)',
    status: 'Fabrication'
  },
  {
    id: 'pat-002',
    mrn: 'PS-2026-0921',
    name: 'Lieutenant James Sterling',
    age: 38,
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    phone: '+1 (555) 876-5432',
    email: 'j.sterling@example.com',
    occupation: 'Logistics Supervisor / Veteran',
    weightKg: 82,
    heightCm: 183,
    dominantHand: 'Right',
    lifestyle: 'High activity, cross-training, active running and gym training',
    activityLevel: 'K4',
    amputationLevel: 'Transfemoral (Above Knee)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Traumatic amputation secondary to blast trauma',
    medicalConditions: ['None', 'Non-smoker', 'Mild residual limb phantom sensation'],
    pastProstheses: ['C-Leg 4 Microprocessor Knee with Suction Socket (2021)'],
    pastOrthoses: [],
    primaryProsthetist: 'Dr. Marcus Vance, CPO',
    registrationDate: '2026-02-10',
    nextAppointment: '2026-08-08 (02:00 PM)',
    status: 'Active Rehab'
  },
  {
    id: 'pat-003',
    mrn: 'PS-2026-0442',
    name: 'Sofia Rodriguez',
    age: 29,
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    phone: '+1 (555) 345-6789',
    email: 'sofia.r@example.com',
    occupation: 'Graphic Designer & Photographer',
    weightKg: 59,
    heightCm: 162,
    dominantHand: 'Right',
    lifestyle: 'Desk job with active city commute, public transit',
    activityLevel: 'K3',
    amputationLevel: 'Orthotic Need (AFO/KAFO/Spinal)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Post-polio syndrome resulting in severe L4-L5 dorsiflexor weakness (Foot Drop)',
    medicalConditions: ['Post-Polio Syndrome', 'Mild Lumbar Scoliosis'],
    pastProstheses: [],
    pastOrthoses: ['Off-the-shelf Polypropylene AFO (causes malleolar chafing)'],
    primaryProsthetist: 'Dr. Marcus Vance, CPO',
    registrationDate: '2026-03-22',
    nextAppointment: '2026-08-02 (11:30 AM)',
    status: 'Fitting'
  },
  {
    id: 'pat-004',
    mrn: 'PS-2026-0118',
    name: 'Arthur Pendelton',
    age: 67,
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    phone: '+1 (555) 901-2345',
    email: 'a.pendelton@example.com',
    occupation: 'Retired Civil Engineer',
    weightKg: 76,
    heightCm: 175,
    dominantHand: 'Left',
    lifestyle: 'Limited indoor and outdoor ambulation, uses walker for long distances',
    activityLevel: 'K2',
    amputationLevel: 'Transtibial (Below Knee)',
    affectedSide: 'Left',
    primaryDiagnosis: 'Ischemic tissue necrosis post arterial bypass surgery',
    medicalConditions: ['Type 2 Diabetes', 'Coronary Artery Disease', 'Osteoarthritis Right Knee'],
    pastProstheses: ['Exoskeletal Wooden Prosthesis (1998) - outdated'],
    pastOrthoses: [],
    primaryProsthetist: 'Dr. Marcus Vance, CPO',
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
    assessorName: 'Dr. Marcus Vance, CPO',
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
    clinicalNotes: 'Residual limb is well-healed conical shape with stable distal pad tissue. Mild surgical scar adherence along anterior distal tibia. Good quadriceps MMT (4/5).'
  }
];

export const INITIAL_SOAP_NOTES: SoapNote[] = [
  {
    id: 'soap-001',
    patientId: 'pat-001',
    date: '2026-07-28',
    authorName: 'Dr. Marcus Vance, CPO',
    authorRole: 'Prosthetist',
    subjective: 'Patient reports mild pressure over the fibular head during check-socket weight bearing test. Expresses enthusiasm for starting trial walking outdoors. Rates phantom discomfort at 1/10.',
    objective: 'Gait evaluation with diagnostic transparent check socket: Observed slight pistoning (approx 4mm) during swing phase. Redness noted over lateral fibular head after 10 mins ambulation (faded within 8 minutes). Quadriceps strength 4+/5.',
    assessment: 'Pistoning and fibular pressure indicate need for 2mm relief at lateral fibular neck and tightening proximal brim suspension by reducing volume 3mm around patellar tendon.',
    plan: '1. Modify plaster positive mold in CAD to add 2mm fibular head relief.\n2. Laminate carbon fiber final socket with seal-in suction liner.\n3. Schedule check-socket refit in 4 days.',
    isAiGenerated: true
  }
];

export const INITIAL_PRESCRIPTIONS: DevicePrescription[] = [
  {
    id: 'rx-001',
    patientId: 'pat-001',
    prescriptionDate: '2026-07-15',
    prescribingClinician: 'Dr. Marcus Vance, CPO',
    type: 'Prosthesis',
    deviceName: 'Definitive Transtibial Prosthesis with Carbon Fiber Energy Return Foot',
    socketType: 'Total Surface Bearing (TSB) Flexible Inner with Rigid Carbon Frame',
    suspensionSystem: 'Elevated Vacuum Suspension (EVS) with Silicone Liner',
    componentFootOrJoint: 'Ossur Pro-Flex XC Energy Storing Carbon Foot (Category 3)',
    linerType: '6mm Uniform Silicone Gel Liner with Matrix',
    material: 'Carbon Fiber / Thermoplastic Inner',
    specialInstructions: 'Provide 3mm additional pressure relief over lateral fibular head. Color custom dark teal finish.',
    status: 'In Fabrication',
    estimatedDeliveryDate: '2026-08-10'
  },
  {
    id: 'rx-002',
    patientId: 'pat-002',
    prescriptionDate: '2026-06-10',
    prescribingClinician: 'Dr. Marcus Vance, CPO',
    type: 'Prosthesis',
    deviceName: 'High-Activity Transfemoral Microprocessor System',
    socketType: 'Anatomical Ischial Containment Socket (ICS)',
    suspensionSystem: 'Active Seal-In Vacuum Suspension',
    componentFootOrJoint: 'Meridium Microprocessor Ankle / Foot System',
    kneeModule: 'Ottobock Genium X3 Waterproof Microprocessor Knee',
    linerType: 'Polyurethane Seal-In Ring Liner',
    material: 'Ultra-light Prepreg Carbon Fiber',
    specialInstructions: 'Calibrate knee parameters for obstacle clearance and running mode.',
    status: 'Delivered',
    estimatedDeliveryDate: '2026-07-01'
  }
];

export const INITIAL_FABRICATION_WORKFLOWS: FabricationWorkflow[] = [
  {
    id: 'fab-001',
    patientId: 'pat-001',
    deviceId: 'rx-001',
    deviceName: 'Definitive Right Transtibial Prosthesis',
    currentStage: 'Manufacturing / Lamination',
    targetCompletionDate: '2026-08-08',
    stages: [
      { stageName: 'Assessment & Cast', status: 'Completed', completedAt: '2026-07-16', technician: 'Tech J. Miller', notes: 'Plaster wrap cast taken with distal end compression.' },
      { stageName: 'Casting / Scanning', status: 'Completed', completedAt: '2026-07-18', technician: 'Tech J. Miller', notes: 'Laser optical 3D scan generated from plaster positive.' },
      { stageName: 'CAD Modification', status: 'Completed', completedAt: '2026-07-20', technician: 'Dr. Vance, CPO', notes: 'Digital sculpting: 3mm Patellar tendon reduction, fibular relief.' },
      { stageName: 'Positive Mold / 3D Print', status: 'Completed', completedAt: '2026-07-22', technician: 'Tech A. Davis', notes: 'Carved polyurethane foam block positive mold.' },
      { stageName: 'Manufacturing / Lamination', status: 'In Progress', technician: 'Tech J. Miller', notes: 'Vacuum carbon fiber resin infusion lamination underway.' },
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
    therapistName: 'Sarah Jenkins, PT',
    walkingDistanceMeters: 480,
    tugSeconds: 9.2,
    ampScore: 42,
    vasPainScore: 1,
    exercisesCompleted: [
      'Single-leg balance on foam pad (3x60s)',
      'Obstacle course crossing & stair climbing (4 flights)',
      'Variable speed treadmill walking at 4.2 km/h'
    ],
    physioNotes: 'Patient Sterling demonstrates superb dynamic stability with Genium X3 knee. Cadence symmetry is 94%. Ready for outdoor trail running evaluation.',
    goalsAchieved: ['Able to traverse uneven gravel without handrail support', 'TUG under 10 seconds']
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
        causeAndFix: 'Sound side plantarflexes prematurely to clear long prosthetic toe. Fix: Shorten pylon by 3mm or adjust toe resistance.'
      },
      {
        deviationName: 'Pistoning',
        severity: 'Mild',
        gaitPhase: 'Stance Phase',
        causeAndFix: '4mm vertical play inside check socket during heel lift. Fix: Increase vacuum pump level by 2 inHg or add 1-ply sock.'
      }
    ],
    stanceTimeLeftVsRight: 'Left (Sound) 54% / Right (Prosthetic) 46%',
    cadenceStepsPerMin: 98,
    gaitSymmetryIndex: 88,
    aiSummary: 'Overall favorable gait progression for K3 transtibial amputee. Mild right swing clearance deficit causing minor left vaulting. Socket volume adjustments will optimize toe clearance.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    sku: 'OSS-PFXC-03',
    name: 'Pro-Flex XC Carbon Foot (Cat 3)',
    category: 'Feet',
    brand: 'Össur',
    quantityInStock: 5,
    reorderThreshold: 2,
    unitCostUsd: 1850,
    supplierName: 'Össur Global Direct',
    supplierContact: 'orders@ossur.com',
    lastRestockedDate: '2026-07-01'
  },
  {
    id: 'inv-002',
    sku: 'OTT-GENX3-01',
    name: 'Genium X3 Waterproof Microprocessor Knee',
    category: 'Knees',
    brand: 'Ottobock',
    quantityInStock: 2,
    reorderThreshold: 1,
    unitCostUsd: 28500,
    supplierName: 'Ottobock Healthcare Inc',
    supplierContact: 'supply@ottobock.com',
    lastRestockedDate: '2026-06-15'
  },
  {
    id: 'inv-003',
    sku: 'ALPS-SIL-6MM',
    name: 'ALPS Superior Performance Silicone Gel Liner (30cm)',
    category: 'Liners',
    brand: 'ALPS South',
    quantityInStock: 12,
    reorderThreshold: 4,
    unitCostUsd: 290,
    supplierName: 'ALPS South Distributors',
    supplierContact: 'sales@alpssouth.com',
    lastRestockedDate: '2026-07-10'
  },
  {
    id: 'inv-004',
    sku: 'WILL-TIT-PYL',
    name: 'Titanium 30mm Pylon & Receiver Tube',
    category: 'Pylons & Adapters',
    brand: 'WillowWood',
    quantityInStock: 18,
    reorderThreshold: 5,
    unitCostUsd: 180,
    supplierName: 'WillowWood Global',
    supplierContact: 'support@willowwood.com',
    lastRestockedDate: '2026-07-12'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-901',
    patientId: 'pat-001',
    patientName: 'Eleanor Vance',
    invoiceDate: '2026-07-22',
    dueDate: '2026-08-22',
    items: [
      { description: 'L5301 - Transtibial Molded Socket Total Surface Bearing', code: 'L5301', cost: 4200 },
      { description: 'L5981 - Energy Storing Carbon Fiber Foot (Ossur Pro-Flex)', code: 'L5981', cost: 2800 },
      { description: 'L5781 - Elevated Vacuum Suspension System', code: 'L5781', cost: 1600 },
      { description: 'Clinical Fitting & CAD Modification Service Hours', code: 'SRV-04', cost: 950 }
    ],
    totalAmount: 9550,
    insuranceCoveredAmount: 7640, // 80%
    patientPayAmount: 1910, // 20%
    status: 'Pending Insurance'
  },
  {
    id: 'inv-902',
    patientId: 'pat-002',
    patientName: 'Lt. James Sterling',
    invoiceDate: '2026-06-15',
    dueDate: '2026-07-15',
    items: [
      { description: 'L5858 - Microprocessor Controlled Transfemoral Knee System', code: 'L5858', cost: 38000 },
      { description: 'L5649 - Ischial Containment Prepreg Carbon Socket', code: 'L5649', cost: 6500 }
    ],
    totalAmount: 44500,
    insuranceCoveredAmount: 44500, // VA coverage
    patientPayAmount: 0,
    status: 'Paid'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-301',
    patientId: 'pat-001',
    patientName: 'Eleanor Vance',
    clinicianName: 'Dr. Marcus Vance, CPO',
    dateTime: '2026-08-05T10:00:00',
    durationMins: 60,
    type: 'Check Socket Fit',
    status: 'Scheduled',
    notes: 'Evaluate fibular head relief and final vacuum lamination check.',
    reminderSentStatus: 'Sent via WhatsApp'
  },
  {
    id: 'apt-302',
    patientId: 'pat-003',
    patientName: 'Sofia Rodriguez',
    clinicianName: 'Dr. Marcus Vance, CPO',
    dateTime: '2026-08-02T11:30:00',
    durationMins: 45,
    type: 'Final Fitting',
    status: 'Scheduled',
    notes: 'Custom carbon AFO alignment check inside running sneakers.',
    reminderSentStatus: 'Sent via SMS'
  },
  {
    id: 'apt-303',
    patientId: 'pat-002',
    patientName: 'Lt. James Sterling',
    clinicianName: 'Sarah Jenkins, PT',
    dateTime: '2026-08-08T14:00:00',
    durationMins: 60,
    type: 'Rehab Session',
    status: 'Scheduled',
    notes: 'High speed gait training & stair negotiation mastery test.',
    reminderSentStatus: 'Sent via WhatsApp'
  }
];

export const INITIAL_IMAGES: ClinicalImage[] = [
  {
    id: 'img-001',
    patientId: 'pat-001',
    uploadedAt: '2026-07-20',
    category: 'Residual Limb',
    title: 'Post-op Residual Limb Frontal Aspect',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    caption: 'Clean anterior tibial surgical suture line, minimal edema.'
  },
  {
    id: 'img-002',
    patientId: 'pat-001',
    uploadedAt: '2026-07-25',
    category: 'Socket Fit',
    title: 'Diagnostic Check Socket Weight Bearing Inspection',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    caption: 'Transparent acrylic socket showing patellar tendon bearing distribution.'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-01',
    senderName: 'Eleanor Vance',
    senderRole: 'Patient',
    recipientName: 'Dr. Marcus Vance, CPO',
    timestamp: '2026-07-30 09:15 AM',
    content: 'Good morning Dr. Vance! The gel liner feels very comfortable this week. I uploaded a photo of my skin after 2 hours of home walking.'
  },
  {
    id: 'msg-02',
    senderName: 'Dr. Marcus Vance, CPO',
    senderRole: 'Prosthetist',
    recipientName: 'Eleanor Vance',
    timestamp: '2026-07-30 09:42 AM',
    content: 'Hello Eleanor! Checked the image—skin tone looks healthy with no persistent erythema. See you on Aug 5th for our final socket fitting!'
  }
];

export const mockClinics = [
  { id: 'c1', name: 'ProstheSys Central Rehabilitation Clinic', address: '100 Medical Plaza Way', city: 'Boston, MA', country: 'USA' },
  { id: 'c2', name: 'ProstheSys Orthotics & Limb Lab', address: '450 Innovation Blvd', city: 'Cambridge, MA', country: 'USA' }
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

