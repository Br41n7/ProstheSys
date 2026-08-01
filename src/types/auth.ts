import { UserRole } from './index';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  clinicName: string;
  patientId?: string; // Links to Patient record if role is Patient
  specialty?: string;
}

export const PRESET_USERS: AuthUser[] = [
  {
    id: 'usr-1',
    name: 'Dr. Marcus Vance, CPO',
    email: 'marcus.vance@prosthesys.clinic',
    role: 'Prosthetist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    title: 'Chief Certified Prosthetist Orthotist',
    clinicName: 'ProstheSys Central Rehabilitation Clinic',
    specialty: 'Lower Limb Bionics & Socket Design'
  },
  {
    id: 'usr-2',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'sarah.jenkins@prosthesys.clinic',
    role: 'Doctor',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?w=150&auto=format&fit=crop&q=80',
    title: 'Consultant Physiatrist & Amputee Care Lead',
    clinicName: 'ProstheSys Central Rehabilitation Clinic',
    specialty: 'Physical Medicine & Rehabilitation'
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova, DPT',
    email: 'elena.rostova@prosthesys.clinic',
    role: 'Physiotherapist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Amputee Gait & Mobility Therapist',
    clinicName: 'ProstheSys Central Rehabilitation Clinic',
    specialty: 'Gait Retraining & AMPPro Mobility'
  },
  {
    id: 'usr-4',
    name: 'Rachel Green',
    email: 'rachel.green@prosthesys.clinic',
    role: 'Receptionist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Clinic Operations & Intake Manager',
    clinicName: 'ProstheSys Central Rehabilitation Clinic',
    specialty: 'Patient Scheduling & Insurance Billing'
  },
  {
    id: 'usr-5',
    name: 'James Chen',
    email: 'admin@prosthesys.clinic',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Director of Clinical Systems & Operations',
    clinicName: 'ProstheSys Global Healthcare',
    specialty: 'System Administration & Multi-Clinic Compliance'
  },
  {
    id: 'usr-6',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Patient (MRN-8821)',
    clinicName: 'ProstheSys Central Rehabilitation Clinic',
    patientId: 'pat-101'
  }
];

// Role-Based Navigation Permissions Mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Admin: [
    'dashboard',
    'patients',
    'inventory',
    'billing',
    'appointments',
    'reports',
    'database',
    'telehealth'
  ],
  Doctor: [
    'dashboard',
    'patients',
    'assessment',
    'soap',
    'ai-assistant',
    'gait',
    'prescriptions',
    'fabrication',
    'rehab',
    'gallery',
    'inventory',
    'appointments',
    'telehealth',
    'reports'
  ],
  Prosthetist: [
    'dashboard',
    'patients',
    'assessment',
    'soap',
    'ai-assistant',
    'gait',
    'prescriptions',
    'fabrication',
    'rehab',
    'gallery',
    'inventory',
    'appointments',
    'telehealth',
    'reports'
  ],
  Orthotist: [
    'dashboard',
    'patients',
    'assessment',
    'soap',
    'ai-assistant',
    'prescriptions',
    'fabrication',
    'gallery',
    'inventory',
    'appointments',
    'telehealth'
  ],
  Physiotherapist: [
    'dashboard',
    'patients',
    'rehab',
    'gait',
    'soap',
    'gallery',
    'appointments',
    'telehealth'
  ],
  Receptionist: [
    'dashboard',
    'patients',
    'appointments',
    'billing',
    'inventory',
    'telehealth'
  ],
  Patient: [
    'dashboard', // Renders Patient Portal
    'prescriptions',
    'rehab',
    'appointments',
    'telehealth'
  ]
};
