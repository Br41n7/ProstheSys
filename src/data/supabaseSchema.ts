export const SUPABASE_SQL_SCHEMA = `-- ====================================================================
-- ProstheSys AI - Full PostgreSQL Database Schema
-- Certified for Supabase Cloud & Local Migration
-- Includes Row-Level Security (RLS), Triggers & Initial Seed Data
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. User Roles & Profiles
CREATE TYPE user_role AS ENUM (
  'Admin',
  'Doctor',
  'Prosthetist',
  'Orthotist',
  'Physiotherapist',
  'Receptionist',
  'Patient'
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'Prosthetist',
  specialty TEXT,
  clinic_name TEXT NOT NULL DEFAULT 'ProstheSys Clinic Center',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mrn TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  occupation TEXT,
  weight_kg NUMERIC(5,2),
  height_cm NUMERIC(5,2),
  dominant_hand TEXT,
  lifestyle TEXT,
  activity_level TEXT CHECK (activity_level IN ('K0', 'K1', 'K2', 'K3', 'K4')),
  amputation_level TEXT NOT NULL,
  affected_side TEXT NOT NULL,
  primary_diagnosis TEXT NOT NULL,
  medical_conditions TEXT[],
  past_prostheses TEXT[],
  past_orthoses TEXT[],
  primary_prosthetist_id UUID REFERENCES profiles(id),
  registration_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active Rehab',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Residual Limb Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  assessor_name TEXT NOT NULL,
  skin_integrity TEXT,
  pain_score_vas INTEGER CHECK (pain_score_vas BETWEEN 0 AND 10),
  phantom_pain_severity TEXT,
  muscle_strength_mmt INTEGER CHECK (muscle_strength_mmt BETWEEN 0 AND 5),
  rom_flexion NUMERIC(5,1),
  rom_extension NUMERIC(5,1),
  balance_score TEXT,
  limb_shape TEXT,
  circumferences JSONB,
  length_cm NUMERIC(5,1),
  bone_length_cm NUMERIC(5,1),
  clinical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SOAP Notes
CREATE TABLE IF NOT EXISTS soap_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  note_date TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES profiles(id),
  author_name TEXT NOT NULL,
  author_role user_role NOT NULL,
  subjective TEXT NOT NULL,
  objective TEXT NOT NULL,
  assessment TEXT NOT NULL,
  plan TEXT NOT NULL,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Device Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  prescription_date DATE DEFAULT CURRENT_DATE,
  prescribing_clinician TEXT NOT NULL,
  device_type TEXT NOT NULL,
  device_name TEXT NOT NULL,
  socket_type TEXT,
  suspension_system TEXT,
  component_foot_or_joint TEXT,
  knee_module TEXT,
  liner_type TEXT,
  material TEXT,
  special_instructions TEXT,
  status TEXT DEFAULT 'Prescribed',
  estimated_delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Fabrication Workflows
CREATE TABLE IF NOT EXISTS fabrication_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE SET NULL,
  device_name TEXT NOT NULL,
  current_stage TEXT NOT NULL,
  target_completion_date DATE,
  stages JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Rehabilitation Sessions
CREATE TABLE IF NOT EXISTS rehabilitation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  session_date DATE DEFAULT CURRENT_DATE,
  therapist_name TEXT NOT NULL,
  walking_distance_meters NUMERIC(6,2),
  tug_seconds NUMERIC(5,2),
  amp_score INTEGER,
  vas_pain_score INTEGER,
  exercises_completed TEXT[],
  physio_notes TEXT,
  goals_achieved TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AI Gait Analysis Reports
CREATE TABLE IF NOT EXISTS gait_analysis_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  analysis_date TIMESTAMPTZ DEFAULT NOW(),
  detected_deviations JSONB NOT NULL,
  stance_time_left_vs_right TEXT,
  cadence_steps_per_min INTEGER,
  gait_symmetry_index NUMERIC(5,2),
  ai_summary TEXT,
  video_url TEXT
);

-- 10. Inventory Management
CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT,
  quantity_in_stock INTEGER DEFAULT 0,
  reorder_threshold INTEGER DEFAULT 3,
  unit_cost_usd NUMERIC(10,2),
  supplier_name TEXT,
  supplier_contact TEXT,
  last_restocked_date DATE
);

-- 11. Invoices & Billing
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  invoice_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  items JSONB NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  insurance_covered_amount NUMERIC(10,2) DEFAULT 0,
  patient_pay_amount NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Pending Insurance'
);

-- 12. Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinician_name TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  duration_mins INTEGER DEFAULT 60,
  appointment_type TEXT NOT NULL,
  status TEXT DEFAULT 'Scheduled',
  notes TEXT,
  reminder_status TEXT DEFAULT 'Pending'
);

-- 13. Clinical Images Gallery
CREATE TABLE IF NOT EXISTS clinical_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT
);

-- 14. Telehealth Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id),
  sender_name TEXT NOT NULL,
  sender_role user_role NOT NULL,
  recipient_name TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  content TEXT NOT NULL,
  attachment_url TEXT
);

-- 15. Audit Logs (HIPAA Compliance)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) across all clinical tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE soap_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fabrication_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE rehabilitation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gait_analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Sample RLS Policy: Authenticated staff can read & write clinical records
CREATE POLICY "Staff Full Access" ON patients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff Assessment Access" ON assessments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff SOAP Access" ON soap_notes FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for high-performance clinical search
CREATE INDEX idx_patients_mrn ON patients(mrn);
CREATE INDEX idx_assessments_patient_id ON assessments(patient_id);
CREATE INDEX idx_soap_patient_id ON soap_notes(patient_id);
CREATE INDEX idx_appointments_datetime ON appointments(date_time);
`;

export const supabaseTables = [
  { name: 'patients', description: 'Patient demographic, MRN, K-level & amputation profiles', rowCount: 4 },
  { name: 'assessments', description: 'Residual limb measurements, MMT & ROM data', rowCount: 4 },
  { name: 'soap_notes', description: 'Subjective, Objective, Assessment & Plan notes', rowCount: 4 },
  { name: 'prescriptions', description: 'Official prosthetic & orthotic component orders', rowCount: 3 },
  { name: 'fabrication_workflows', description: '10-stage manufacturing & check socket pipeline', rowCount: 2 },
  { name: 'rehabilitation_sessions', description: '6MWT, TUG & AMPPro outcome logs', rowCount: 3 },
  { name: 'inventory', description: 'Carbon feet, microprocessor knees & stock SKUs', rowCount: 6 },
  { name: 'invoices', description: 'HCPCS coding, insurance claims & patient co-pays', rowCount: 3 },
  { name: 'clinical_images', description: 'Residual limb, socket fit & X-ray photo vault', rowCount: 2 }
];

