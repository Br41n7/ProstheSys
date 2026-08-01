export interface ClinicBranch {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export type UserRole = 
  | 'Admin'
  | 'Doctor'
  | 'Prosthetist'
  | 'Orthotist'
  | 'Physiotherapist'
  | 'Receptionist'
  | 'Patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string;
  clinicName: string;
}

export type AmputationLevel = 
  | 'Transtibial (Below Knee)'
  | 'Transfemoral (Above Knee)'
  | 'Transradial (Below Elbow)'
  | 'Transhumeral (Above Elbow)'
  | 'Partial Foot / Syme'
  | 'Hip Disarticulation'
  | 'Orthotic Need (AFO/KAFO/Spinal)';

export type KActivityLevel = 'K0' | 'K1' | 'K2' | 'K3' | 'K4';

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  photo: string;
  phone: string;
  email: string;
  occupation: string;
  weightKg: number;
  heightCm: number;
  dominantHand: 'Left' | 'Right' | 'Ambidextrous';
  lifestyle: string;
  activityLevel: KActivityLevel;
  amputationLevel: AmputationLevel;
  affectedSide: 'Left' | 'Right' | 'Bilateral';
  primaryDiagnosis: string;
  medicalConditions: string[]; // e.g. Diabetes, PVD, Polio, Stroke, Spinal Injury
  pastProstheses: string[];
  pastOrthoses: string[];
  primaryProsthetist: string;
  registrationDate: string;
  nextAppointment?: string;
  status: 'Active Rehab' | 'Evaluation' | 'Fabrication' | 'Fitting' | 'Follow-Up' | 'Discharged';
}

export interface ResidualLimbAssessment {
  id: string;
  patientId: string;
  assessmentDate: string;
  assessorName: string;
  skinIntegrity: 'Intact' | 'Scarring' | 'Redness / Irritation' | 'Skin Breakdown / Ulcer' | 'Invaginated Scar';
  painScoreVas: number; // 0-10
  phantomPainSeverity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  muscleStrengthMmt: number; // 0-5
  romDegrees: {
    flexion: number;
    extension: number;
    abduction?: number;
    adduction?: number;
  };
  balanceScore: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  shape: 'Conical' | 'Cylindrical' | 'Bulbous' | 'Dog-eared';
  circumferencesCm: { distanceAboveDistal: number; circumference: number }[];
  lengthCm: number;
  boneLengthCm: number;
  clinicalNotes: string;
}

export interface SoapNote {
  id: string;
  patientId: string;
  date: string;
  authorName: string;
  authorRole: UserRole;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  isAiGenerated?: boolean;
}

export interface AiRecommendationRequest {
  age: number;
  weightKg: number;
  amputationLevel: AmputationLevel;
  activityLevel: KActivityLevel;
  occupation: string;
  skinCondition: string;
  budgetTier: 'Economy' | 'Standard' | 'Premium / High-End';
  specialGoals: string;
}

export interface AiRecommendationResponse {
  recommendedSocket: string;
  recommendedSuspension: string;
  recommendedFootCategory: string;
  recommendedKneeType?: string;
  recommendedOrthosisMaterial?: string;
  alignmentSuggestions: string;
  contraindicationsWarnings: string[];
  clinicalRationale: string;
  confidenceScore: number;
}

export interface DevicePrescription {
  id: string;
  patientId: string;
  prescriptionDate: string;
  prescribingClinician: string;
  type: 'Prosthesis' | 'Orthosis' | 'Repair Request' | 'Replacement Request';
  deviceName: string;
  socketType: string;
  suspensionSystem: string;
  componentFootOrJoint: string;
  kneeModule?: string;
  linerType: string;
  material: string;
  specialInstructions: string;
  status: 'Prescribed' | 'In Fabrication' | 'Fitted' | 'Delivered';
  estimatedDeliveryDate: string;
}

export type FabricationStageName = 
  | 'Assessment & Cast'
  | 'Casting / Scanning'
  | 'CAD Modification'
  | 'Positive Mold / 3D Print'
  | 'Manufacturing / Lamination'
  | 'Component Assembly'
  | 'Bench Alignment'
  | 'Check Socket Fitting'
  | 'Final Delivery'
  | 'Completed';

export interface FabricationStage {
  stageName: FabricationStageName;
  status: 'Pending' | 'In Progress' | 'Completed';
  completedAt?: string;
  technician?: string;
  notes?: string;
}

export interface FabricationWorkflow {
  id: string;
  patientId: string;
  deviceId: string;
  deviceName: string;
  currentStage: FabricationStageName;
  stages: FabricationStage[];
  targetCompletionDate: string;
}

export interface RehabilitationSession {
  id: string;
  patientId: string;
  sessionDate: string;
  therapistName: string;
  walkingDistanceMeters: number; // e.g. 6MWT
  tugSeconds: number; // Timed Up & Go
  ampScore: number; // AMPPro score 0-47
  vasPainScore: number;
  exercisesCompleted: string[];
  physioNotes: string;
  goalsAchieved: string[];
}

export interface GaitAnalysisReport {
  id: string;
  patientId: string;
  analysisDate: string;
  detectedDeviations: {
    deviationName: 'Vaulting' | 'Trendelenburg' | 'Circumduction' | 'Foot Drop' | 'Pistoning' | 'Whipping';
    severity: 'Mild' | 'Moderate' | 'Severe';
    gaitPhase: 'Stance Phase' | 'Swing Phase' | 'Heel Strike' | 'Toe Off';
    causeAndFix: string;
  }[];
  stanceTimeLeftVsRight: string;
  cadenceStepsPerMin: number;
  gaitSymmetryIndex: number; // %
  aiSummary: string;
  videoUrl?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Sockets' | 'Feet' | 'Knees' | 'Pylons & Adapters' | 'Liners' | 'Sleeves & Orthotics';
  brand: string;
  quantityInStock: number;
  reorderThreshold: number;
  unitCostUsd: number;
  supplierName: string;
  supplierContact: string;
  lastRestockedDate: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  invoiceDate: string;
  dueDate: string;
  items: { description: string; code: string; cost: number }[];
  totalAmount: number;
  insuranceCoveredAmount: number;
  patientPayAmount: number;
  status: 'Paid' | 'Pending Insurance' | 'Overdue' | 'Partially Paid';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  clinicianName: string;
  dateTime: string;
  durationMins: number;
  type: 'Initial Assessment' | 'Casting / Scan' | 'Check Socket Fit' | 'Final Fitting' | 'Rehab Session' | 'Annual Review';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  reminderSentStatus: 'Sent via WhatsApp' | 'Sent via SMS' | 'Pending';
}

export interface ClinicalImage {
  id: string;
  patientId: string;
  uploadedAt: string;
  category: 'Residual Limb' | 'Socket Fit' | 'X-Ray / Scan' | 'Gait Alignment' | 'Progress Photo';
  title: string;
  url: string;
  caption: string;
}

export interface Message {
  id: string;
  senderName: string;
  senderRole: UserRole;
  recipientName: string;
  timestamp: string;
  content: string;
  attachmentUrl?: string;
  isTelehealthNote?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'appointment' | 'inventory' | 'fabrication' | 'telehealth' | 'billing';
  isRead: boolean;
}
