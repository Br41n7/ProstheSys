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
    name: 'Dr. Chinedu Okafor, CPO',
    email: 'chinedu.okafor@prosthesys.ng',
    role: 'Prosthetist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Certified Prosthetist Orthotist',
    clinicName: 'Lagos National Orthopaedic Hospital Clinic',
    specialty: 'Lower Limb Prosthetics & Socket Casting'
  },
  {
    id: 'usr-2',
    name: 'Dr. Amina Bello, MD',
    email: 'amina.bello@prosthesys.ng',
    role: 'Doctor',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?w=150&auto=format&fit=crop&q=80',
    title: 'Consultant Physiatrist & Amputee Care Lead',
    clinicName: 'Abuja Rehabilitation & Prosthetics Hub',
    specialty: 'Physical Medicine & Rehabilitation'
  },
  {
    id: 'usr-3',
    name: 'Folake Adebayo, PT',
    email: 'folake.adebayo@prosthesys.ng',
    role: 'Physiotherapist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Amputee Gait & Rehabilitation Therapist',
    clinicName: 'Ibadan Physical Medicine & Limb Lab',
    specialty: 'Gait Retraining & Functional Training'
  },
  {
    id: 'usr-4',
    name: 'Babatunde Adeleke',
    email: 'babatunde.a@prosthesys.ng',
    role: 'Receptionist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Clinic Operations & Patient Intake Manager',
    clinicName: 'Enugu P&O Care & Orthotics Center',
    specialty: 'Patient Appointments & Billing Administration'
  },
  {
    id: 'usr-5',
    name: 'Kofi Mensah',
    email: 'admin@prosthesys.ng',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Director of Clinical Operations & Compliance',
    clinicName: 'ProstheSys Health Nigeria Network',
    specialty: 'Multi-Clinic Operations & Resource Management'
  },
  {
    id: 'usr-6',
    name: 'Emeka Nnamdi',
    email: 'emeka.nnamdi@gmail.com',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Patient (MRN-NG-2026-0814)',
    clinicName: 'Lagos National Orthopaedic Hospital Clinic',
    patientId: 'pat-001'
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
