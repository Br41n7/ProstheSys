import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Sparkles,
  Activity,
  Footprints,
  FileText,
  Video,
  Database,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Lock,
  Award,
  Zap,
  Play,
  HeartPulse,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Globe,
  Star,
  Target,
  Compass,
  Eye,
  Check,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  UserCheck,
  Wrench,
  PackageCheck,
  Scale,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { AuthUser, PRESET_USERS } from '../../types/auth';

interface LandingPageProps {
  onLaunchApp: () => void;
  onOpenAuthModal: () => void;
  onSelectRole: (user: AuthUser) => void;
}

interface DeviceCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  description: string;
  commonDevices: string[];
  materials: string[];
  workflowHighlights: string[];
  costLevel: '₦ Basic' | '₦₦ Moderate' | '₦₦₦ Higher-cost';
}

interface CaseStudy {
  id: string;
  title: string;
  category: 'lower' | 'orthotics' | 'pediatric' | 'upper' | 'repairs';
  categoryLabel: string;
  location: string;
  image: string;
  patientProfile: string;
  outcome: string;
  materialsUsed: string[];
  costTier: string;
  description: string;
  beforeStatus: string;
  afterStatus: string;
}

const NIGERIA_CLINICAL_WORKFLOW = [
  { step: '01', name: 'Patient Registration', desc: 'Demographics, medical history, amputee etiology or deformity profile.' },
  { step: '02', name: 'History Taking', desc: 'Occupation, mobility demands, living conditions & financial parameters.' },
  { step: '03', name: 'Clinical Assessment', desc: 'Residual limb length, skin condition, joint ROM, muscle strength & sensation.' },
  { step: '04', name: 'Measurements & Casting', desc: 'Plaster of Paris wrap, circumferential tape measures & 3D scanning.' },
  { step: '05', name: 'Device Prescription', desc: 'Selecting socket type, suspension, pylon, foot/joint & materials.' },
  { step: '06', name: 'Fabrication Workflow', desc: 'Positive mold carving, vacuum lamination (Polypropylene/Resin) & assembly.' },
  { step: '07', name: 'Diagnostic Fitting', desc: 'Check socket trial, pressure point relief, brim trimming & volume check.' },
  { step: '08', name: 'Static & Dynamic Alignment', desc: 'Plumb line bench setup, bench tilt, heel height adjustment & stride alignment.' },
  { step: '09', name: 'Gait & Functional Training', desc: 'Parallel bar practice, stance phase stability, obstacle negotiation & stair walking.' },
  { step: '10', name: 'Patient Education', desc: 'Liner care, skin hygiene, socket sock management & donning/doffing technique.' },
  { step: '11', name: 'Follow-Up & Reviews', desc: 'Scheduled 2-week, 1-month & 6-month checks for volume shift & wear.' },
  { step: '12', name: 'Adjustment & Repair', desc: 'Socket padding, rivet replacement, strap renewal, alignment tweaking & outcome tracking.' }
];

const MANAGED_DEVICE_CATEGORIES: DeviceCategoryCard[] = [
  {
    id: 'cat-1',
    title: 'Prosthetic Legs',
    subtitle: 'Lower-Limb Prostheses',
    icon: Footprints,
    color: 'from-blue-600 to-teal-500',
    badge: 'Transtibial & Transfemoral',
    description: 'Complete digital management for lower-limb prosthetic care: transtibial, transfemoral, partial foot, and hip disarticulation workflows.',
    commonDevices: ['Transtibial Prosthesis', 'Transfemoral Prosthesis', 'Conventional Prosthetic Leg', 'Modular Prosthetic Leg', 'SACH-Type Foot', 'Mechanical Single-Axis Knee', 'Suction/Pin Sockets', 'Suspension Belts'],
    materials: ['Polypropylene', 'Acrylic Resin', 'Aluminum/Steel Pylons', 'Foam Padding', 'Silicone/Gel Liners', 'Prosthetic Socks'],
    workflowHighlights: ['Limb Measurement', 'Plaster Casting', 'Check Socket Trial', 'Gait Alignment', 'Follow-Up Care'],
    costLevel: '₦₦ Moderate'
  },
  {
    id: 'cat-2',
    title: 'Orthotic Braces',
    subtitle: 'Lower-Limb & Spinal Orthoses',
    icon: Layers,
    color: 'from-emerald-600 to-teal-500',
    badge: 'AFOs, KAFOs & Spinal',
    description: 'Standardized workflows for custom orthotic interventions supporting post-polio paralysis, stroke rehabilitation, nerve injuries, and scoliosis.',
    commonDevices: ['Solid Ankle-Foot Orthosis (AFO)', 'Hinged AFO', 'Posterior Leaf Spring AFO', 'Knee-Ankle-Foot Orthosis (KAFO)', 'Knee Orthosis', 'TLSO Spinal Brace', 'Lumbar Supports'],
    materials: ['Polypropylene Thermoplastic', 'Leather Straps', 'Aluminum Side Bars', 'Plastazote Foam', 'Stainless Steel Joints'],
    workflowHighlights: ['Deformity Assessment', 'Plaster Cast Molding', 'Trim Line Marking', 'Dynamic Fitting', 'Strap Adjustment'],
    costLevel: '₦ Basic'
  },
  {
    id: 'cat-3',
    title: 'Pediatric Orthotics',
    subtitle: 'Children & Growth Management',
    icon: HeartPulse,
    color: 'from-purple-600 to-indigo-500',
    badge: 'Clubfoot & Growth Bracing',
    description: 'Specialized tracking for pediatric limb differences, congenital deformities, Dennis Brown clubfoot splints, and growth-related modifications.',
    commonDevices: ['Ponseti Dennis Brown Splints', 'Pediatric AFOs', 'Pediatric KAFOs', 'Growth-Adaptive Braces', 'Custom Pediatric Footwear Insoles'],
    materials: ['Lightweight Polypropylene', 'Soft EVA Foam', 'Padded Velcro Fasteners', 'Adjustable Metal Bars'],
    workflowHighlights: ['Growth Rate Logging', 'Monthly Adjustment Schedule', 'Skin Inspection', 'Parent Care Instructions'],
    costLevel: '₦ Basic'
  },
  {
    id: 'cat-4',
    title: 'Foot Orthoses',
    subtitle: 'Custom Insoles & Biomechanical Care',
    icon: Activity,
    color: 'from-amber-600 to-orange-500',
    badge: 'Insoles & Diabetic Foot',
    description: 'Clinical evaluation and prescription for plantar fasciitis, flat feet, diabetic ulcer prevention, and leg-length discrepancy compensation.',
    commonDevices: ['Custom Moulded Insoles', 'Diabetic Pressure-Relief Insoles', 'Arch Support Inserts', 'Heel Lifts', 'Metatarsal Pads'],
    materials: ['Multi-Density EVA', 'Poron Cushioning', 'Cork Bases', 'Top-Grain Leather Covers'],
    workflowHighlights: ['Foot Impression Scanning / Foam Box', 'Arch Height Mapping', 'Footwear Fitting', 'Wear Schedule Tracking'],
    costLevel: '₦ Basic'
  },
  {
    id: 'cat-5',
    title: 'Upper-Limb Devices',
    subtitle: 'Functional & Cosmetic Upper-Limb',
    icon: Cpu,
    color: 'from-indigo-600 to-blue-500',
    badge: 'Cosmetic & Body-Powered',
    description: 'Practical management for transradial and transhumeral upper-limb amputations, focusing on durable body-powered harness systems and cosmetic hands.',
    commonDevices: ['Cosmetic Upper-Limb Prosthesis', 'Body-Powered Cable Prosthesis', 'Voluntary Opening Hook', 'Wrist Disarticulation Unit', 'Hand Splints & Wrist Orthoses'],
    materials: ['Thermoplastic Sheet', 'Dacron Harness Webbing', 'Stainless Steel Cables', 'Silicone Cosmetic Passive Glove'],
    workflowHighlights: ['Harness Cable Tensioning', 'Grasp Test', 'Cosmetic Skin Matching', 'Functional Task Practice'],
    costLevel: '₦₦ Moderate'
  },
  {
    id: 'cat-6',
    title: 'Repairs & Maintenance',
    subtitle: 'Device Servicing & Modifications',
    icon: Wrench,
    color: 'from-rose-600 to-pink-500',
    badge: 'Service & Refurbishment',
    description: 'Track and document ongoing maintenance, rivet replacements, strap repairs, socket volume padding, and component refurbishments for existing patients.',
    commonDevices: ['Socket Padding Addition', 'Velcro Strap Replacement', 'AFO Joint Repair', 'Rubber Heel Pad Renewal', 'Aligning Adjustment', 'Liner Replacement'],
    materials: ['Barge Cement', 'Rivets & Buckles', 'Velcro Tape', 'Micro-Cellular Foam', 'Replacement Screws'],
    workflowHighlights: ['Damage Assessment', 'Parts Sourcing', 'Workshop Repair Log', 'Post-Repair Fitting Check'],
    costLevel: '₦ Basic'
  }
];

const NIGERIAN_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Transtibial Polypropylene Prosthesis & SACH Foot',
    category: 'lower',
    categoryLabel: 'Prosthetic Leg',
    location: 'Lagos National Orthopaedic Hospital Clinic',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Agricultural Worker (Aged 42, Below-Knee Amputee)',
    outcome: 'Successfully restored independent walking across rural farmland; zero skin breakdown at 6-month review.',
    materialsUsed: ['4mm Polypropylene Sheet', 'SACH Foot Unit', 'Aluminum Pylon Tube', 'Kona Webbing Suspension Belt', 'Plaster Cast'],
    costTier: '₦ (Affordable Local Build)',
    description: 'Clinicians used ProstheSys AI to log residual limb circumferences, prescribe a durable Total Surface Bearing socket with local polypropylene lamination, and schedule 2-week alignment checkups.',
    beforeStatus: 'Mobile via Crutches (Limited Farm Access)',
    afterStatus: 'Full Agricultural Community Ambulator'
  },
  {
    id: 'cs-2',
    title: 'Custom Solid Polypropylene AFO for Post-Polio Drop Foot',
    category: 'orthotics',
    categoryLabel: 'Orthotic Brace',
    location: 'Ibadan Physical Medicine & Limb Lab',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'School Administrator (Aged 36, L4-L5 Dorsiflexor Weakness)',
    outcome: 'Eliminated toe-drag and hip hiking during stance phase; reduced walking fatigue by 50%.',
    materialsUsed: ['Polypropylene 3.5mm', 'Plastazote Interface Liner', 'Velcro Cinch Straps', 'Ankle Malleolar Pads'],
    costTier: '₦ (Basic Orthotic Package)',
    description: 'Digitized history, casting notes, and trim line preferences enabled precise fabrication of a rigid ankle-foot orthosis that fits into standard Nigerian footwear.',
    beforeStatus: 'Severe Toe Drag & Frequent Tripping',
    afterStatus: 'Fluid Gait with Standard Footwear'
  },
  {
    id: 'cs-3',
    title: 'Pediatric Clubfoot Management with Dennis Brown Brace',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    location: 'Enugu P&O Care & Orthotics Center',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Infant Patient (Aged 14 Months, Congenital Talipes Equinovarus)',
    outcome: 'Maintained 60-degree abduction correction post-tenotomy with automated growth follow-up reminders.',
    materialsUsed: ['Adjustable Aluminum Crossbar', 'Soft Leather Padded Shoes', 'Velcro Heel Straps'],
    costTier: '₦ (Pediatric Care Grant Supported)',
    description: 'ProstheSys AI tracked monthly bar width adjustments and parent compliance logs, ensuring foot abduction was maintained without pressure ulcers.',
    beforeStatus: 'Post-Casting Ponseti Phase',
    afterStatus: 'Full Correction Corrected Foot Stance'
  },
  {
    id: 'cs-4',
    title: 'Transfemoral Modular Prosthesis with Mechanical Knee',
    category: 'lower',
    categoryLabel: 'Prosthetic Leg',
    location: 'Abuja Rehabilitation & Prosthetics Hub',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Civil Servant (Aged 51, Above-Knee Amputee post PVD)',
    outcome: 'Restored independent stair climbing and office mobility using a reliable mechanical friction knee joint.',
    materialsUsed: ['Ischial Containment Socket', 'Single-Axis Friction Knee Joint', 'SACH Foot', 'Pelvic Band & Joint'],
    costTier: '₦₦ (Moderate Modular Limb)',
    description: 'Recorded bench alignment coordinates and socket brim pressure relief points. Automated SMS reminders ensured the patient returned for 3-month alignment tightening.',
    beforeStatus: 'Wheelchair Dependent',
    afterStatus: 'Independent Office Ambulator'
  }
];

const NIGERIAN_LEADERSHIP_TEAM = [
  {
    name: 'Dr. Chinedu Okafor, CPO, LPO',
    title: 'Lead Certified Prosthetist Orthotist',
    bio: '18+ years leading prosthetic casting, socket fabrication, and amputee gait rehabilitation across Nigerian tertiary hospitals.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    credentials: 'B.Sc. Prosthetics & Orthotics (ISPO Cat 1)',
    location: 'Lagos Hub'
  },
  {
    name: 'Dr. Amina Bello, MD',
    title: 'Consultant Physiatrist & Amputee Lead',
    bio: 'Specialist in Physical Medicine and Rehabilitation focused on post-amputation stump healing, pain management, and functional scoring.',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=300&q=80',
    credentials: 'FWACP (Physical Medicine & Rehab)',
    location: 'Abuja Hub'
  },
  {
    name: 'Folake Adebayo, PT',
    title: 'Senior Amputee Gait Therapist',
    bio: 'Pioneer in low-resource gait retraining, parallel bar progression, and amputee community integration.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    credentials: 'M.Sc. Neuro-Rehabilitation PT',
    location: 'Ibadan Hub'
  },
  {
    name: 'Babatunde Adeleke',
    title: 'Clinic Operations & Technical Lead',
    bio: 'Expert in workshop inventory control, locally sourced materials management, and patient care scheduling.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    credentials: 'HND P&O Technology & Operations',
    location: 'Enugu Hub'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onOpenAuthModal,
  onSelectRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Prosthetist / Orthotist',
    facility: '',
    stateLocation: 'Lagos',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const filteredCaseStudies = NIGERIAN_CASE_STUDIES.filter(cs =>
    activeCategoryFilter === 'all' ? true : cs.category === activeCategoryFilter
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Top Announcement Bar - Nigeria First */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 border-b border-emerald-500/30">
        <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 rounded-full text-[10px] uppercase font-bold tracking-wider">
          Built for Nigeria P&O
        </span>
        <span className="hidden sm:inline">Practical digital tools for Prosthetics & Orthotics clinical workflows, assessments & follow-up care.</span>
        <button
          onClick={onLaunchApp}
          className="underline hover:text-emerald-200 font-bold ml-1 inline-flex items-center gap-1 cursor-pointer"
        >
          Open App <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchApp}>
            <div className="h-10 w-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ProstheSys <span className="text-emerald-400 font-semibold">Nigeria</span>
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Clinical P&O Management Software
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-slate-300">
            <a href="#overview" className="hover:text-emerald-400 transition-colors">Platform Purpose</a>
            <a href="#devices" className="hover:text-emerald-400 transition-colors">Devices & Care</a>
            <a href="#workflow" className="hover:text-emerald-400 transition-colors">Clinical Workflow</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
            <a href="#cases" className="hover:text-emerald-400 transition-colors">Clinical Cases</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </nav>

          {/* CTA Group - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-xl transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onLaunchApp}
              className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer"
            >
              <span>Launch Clinical Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onLaunchApp}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-sm"
            >
              Launch App
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pt-4 pb-3 px-2 border-t border-slate-800 mt-3 space-y-3 bg-slate-950 overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 text-xs font-semibold text-slate-300">
                <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Platform Purpose</a>
                <a href="#devices" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Devices & Care Managed</a>
                <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Nigerian P&O Workflow</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Clinical Services</a>
                <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Clinical Cases</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Leadership & Hubs</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-emerald-400">Contact & Support</a>
              </nav>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-900">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-slate-200 border border-slate-800 bg-slate-900 rounded-xl text-center"
                >
                  Sign In / Switch Role
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLaunchApp();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl text-center flex items-center justify-center gap-2"
                >
                  <span>Launch Clinical Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - NIGERIA FIRST */}
      <section id="overview" className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Glow Effects Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[280px] h-[180px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Nigeria Flag Accent Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-semibold backdrop-blur-sm shadow-inner"
        >
          <span className="flex items-center gap-1 text-sm font-bold">🇳🇬</span>
          <span>Prosthetics & Orthotics Software for Nigerian Rehabilitation</span>
        </motion.div>

        {/* Hero Heading - Exact Requested Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Digital tools for practical <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
              Prosthetics & Orthotics care in Nigeria.
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Manage patients, assessments, fabrication, fitting, rehabilitation and follow-ups from one affordable platform built around the realities of Nigerian P&O practice.
          </p>
        </motion.div>

        {/* Important Positioning Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-left flex items-start gap-3 shadow-xl"
        >
          <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-emerald-300 uppercase tracking-wider block text-[10px]">
              Platform Positioning Notice
            </span>
            <p className="text-slate-300 leading-relaxed">
              ProstheSys AI is a <strong className="text-white">clinical management and decision-support platform</strong> for Prosthetics & Orthotics professionals. It does NOT manufacture or sell physical devices. Instead, it digitizes the clinical workflow surrounding patient assessment, measurement, casting, device prescription, local workshop fabrication, fitting, gait training, and follow-up care.
            </p>
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Launch Clinical Workspace</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const patientUser = PRESET_USERS.find(u => u.role === 'Patient') || PRESET_USERS[5];
              onSelectRole(patientUser);
            }}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>Preview Patient Portal</span>
          </motion.button>
        </motion.div>

        {/* High-Impact Nigerian Clinical Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/40 transition-colors text-center">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-emerald-400">14+</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Nigerian Clinic Hubs</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-teal-500/40 transition-colors text-center">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-teal-400">100%</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Local Materials Support</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-amber-500/40 transition-colors text-center">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-amber-400">₦ Currency</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Configurable Clinic Costs</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-blue-500/40 transition-colors text-center">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-blue-400">12 Steps</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Full Clinical Workflow</p>
          </div>
        </motion.div>

      </section>

      {/* DEVICES & CARE WE HELP YOU MANAGE SECTION */}
      <section id="devices" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Practical P&O Device Categories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Devices & Care We Help You Manage
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Designed around conventional prostheses, orthoses, and materials commonly used in Nigerian rehabilitation hospitals and private O&P centers.
          </p>
        </div>

        {/* 6 Core Device Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANAGED_DEVICE_CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 space-y-5 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700/80 rounded-full">
                      {cat.costLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {cat.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Common Devices Chips */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Common Devices Managed:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.commonDevices.slice(0, 5).map((dev, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[10px] rounded-md border border-slate-800">
                          {dev}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Materials Supported */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Materials & Components:
                    </span>
                    <p className="text-[11px] text-slate-300">
                      {cat.materials.join(', ')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLaunchApp}
                  className="w-full py-2.5 bg-slate-800/80 hover:bg-emerald-600 text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Open Clinical Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* NIGERIAN CLINICAL WORKFLOW SECTION */}
      <section id="workflow" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 bg-slate-900/40 border-y border-slate-800/80">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold rounded-full">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>End-to-End Clinical Continuity</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            The Nigerian Clinical P&O Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            ProstheSys AI maps directly to the standard 12-stage clinical process practiced across Nigerian orthopaedic centers and private limb clinics.
          </p>
        </div>

        {/* 12-Stage Visual Step Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {NIGERIA_CLINICAL_WORKFLOW.map((wf, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-4 bg-slate-950/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl space-y-2 relative group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                  Step {wf.step}
                </span>
                {idx < 11 && (
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors hidden sm:block" />
                )}
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                {wf.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {wf.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES TO EMPHASIZE GRID */}
      <section id="services" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Services Focused</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Core Clinical Services Digitized
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We focus on empowering clinicians to deliver high-quality patient care, thorough evaluations, and long-term device longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: '1. Patient Assessment', desc: 'Demographic intake, etiology recording, vocational needs, and medical history.' },
            { title: '2. Prosthetic Assessment', desc: 'Residual limb shape, bone length, muscle strength MMT, and weight-bearing capability.' },
            { title: '3. Orthotic Assessment', desc: 'Joint range of motion, spasticity grading, muscle weakness, and leg length discrepancy.' },
            { title: '4. Measurement & Casting', desc: 'Plaster wrap measurements, circumferential landmark logging, or 3D scan uploads.' },
            { title: '5. Device Prescription', desc: 'Selecting socket design, suspension method, P&O components, and materials.' },
            { title: '6. Fabrication Tracking', desc: '6-stage workshop tracking from positive mold carving to lamination and assembly.' },
            { title: '7. Diagnostic Fitting', desc: 'Check-socket trials, brim relief adjustments, and pressure point inspection.' },
            { title: '8. Bench & Dynamic Alignment', desc: 'Plumb line bench alignment, heel height adjustments, and stance tilt optimization.' },
            { title: '9. Gait Screening & Training', desc: 'Parallel bar exercises, walking cadence analysis, TUG tests, and 6MWT distance.' },
            { title: '10. Device Adjustment & Repair', desc: 'Rivet repairs, strap replacements, socket sock additions, and realignment.' },
            { title: '11. Scheduled Follow-Ups', desc: '2-week, 1-month, and 6-month review logging with automated WhatsApp/SMS reminders.' },
            { title: '12. Patient Education', desc: 'Liner cleaning, stump hygiene, sock management, and home rehabilitation exercises.' }
          ].map((srv, idx) => (
            <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-1.5 hover:border-emerald-500/40 transition-colors">
              <h4 className="text-xs font-bold text-emerald-300">{srv.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI CLINICAL DECISION SUPPORT POSITIONING */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Responsible AI Decision Support</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                Clinician-First AI Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our Gemini AI engine supports clinicians with administrative and decision-support tasks. It never replaces the professional judgment of a certified prosthetist or orthotist.
              </p>

              {/* Mandatory Notice Banner */}
              <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-200 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>"AI-generated suggestion — clinician review and verification required."</span>
              </div>
            </div>

            <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 w-full md:w-80 shrink-0">
              <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">AI Support Features:</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Generate SOAP note drafts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Summarize patient clinical history</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Identify missing assessment fields</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Compare measurement logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Analyze uploaded gait video screening</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICAL NIGERIAN CLINICAL CASES */}
      <section id="cases" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>Realistic Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Practical Clinical Cases Managed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Real-world examples of prostheses, orthoses, and repairs managed using ProstheSys AI across Nigerian rehabilitation centers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 border border-slate-800 rounded-2xl">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'lower', label: 'Prosthetic Legs' },
              { id: 'orthotics', label: 'Orthotic Braces' },
              { id: 'pediatric', label: 'Pediatric' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategoryFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCaseStudies.map((cs) => (
            <motion.div
              key={cs.id}
              whileHover={{ y: -3 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                    {cs.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {cs.location}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {cs.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium">
                  Patient: {cs.patientProfile}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cs.description}
                </p>

                {/* Outcome Callout */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Clinical Outcome:
                  </span>
                  <p className="text-xs text-slate-200">"{cs.outcome}"</p>
                </div>

                {/* Materials list */}
                <div className="space-y-1 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Locally Available Materials Used:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cs.materialsUsed.map((mat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[10px] rounded border border-slate-800">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">{cs.costTier}</span>
                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  View Case Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Nigerian Clinical Case Record
                </span>
                <h3 className="text-xl font-bold text-white">{selectedCaseStudy.title}</h3>
                <p className="text-xs text-slate-400">{selectedCaseStudy.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Status Before</span>
                  <span className="text-slate-200 font-medium">{selectedCaseStudy.beforeStatus}</span>
                </div>
                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-300 font-bold block">Status After Fitting</span>
                  <span className="text-emerald-200 font-bold">{selectedCaseStudy.afterStatus}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <h4 className="font-bold text-white">Full Case Summary:</h4>
                <p className="leading-relaxed">{selectedCaseStudy.description}</p>
                <p className="leading-relaxed text-emerald-300 font-semibold">Outcome: {selectedCaseStudy.outcome}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    onLaunchApp();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Explore Clinical App
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ABOUT US & NIGERIAN LEADERSHIP */}
      <section id="about" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
              <Compass className="w-3.5 h-3.5" />
              <span>About ProstheSys Nigeria</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Empowering Nigerian P&O Practice with Practical Technology
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ProstheSys AI was developed to address the real-world operational challenges faced by Nigerian prosthetists, orthotists, and physical rehabilitation units.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              By replacing paper charts and scattered measurement sheets with a unified digital platform, we enable clinical teams to track casting measurements, manage local material inventories, document fitting progress, and ensure long-term follow-up care for amputees and orthotic patients across Nigeria.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">14+ Clinic Hubs</h4>
                  <p className="text-[11px] text-slate-400">Lagos, Abuja, Enugu, Ibadan, Kano</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <Users className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Built for Clinicians</h4>
                  <p className="text-[11px] text-slate-400">ISPO & NACOP Compliant Workflows</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Team Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">
              Nigerian Clinical Advisory & Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NIGERIAN_LEADERSHIP_TEAM.map((lead, i) => (
                <div key={i} className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                      <p className="text-[10px] text-emerald-400 font-semibold">{lead.title}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{lead.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLE SWITCHER SECTION */}
      <section id="roles" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 bg-slate-900/30 border-y border-slate-800/80">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Role-Based Workspaces
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Experience ProstheSys as Any Team Member
          </h3>
          <p className="text-xs text-slate-400">
            Select a profile to launch directly into that role's customized Nigerian clinical workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_USERS.map((usr) => (
            <motion.div
              key={usr.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(usr)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition-all flex items-start gap-4 group shadow-md"
            >
              <img
                src={usr.avatar}
                alt={usr.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700 group-hover:border-emerald-400 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                    {usr.name}
                  </h4>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                    {usr.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{usr.title}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 mt-2 group-hover:translate-x-1 transition-transform">
                  Launch Workspace <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Get ProstheSys for Your Clinic
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions about adopting ProstheSys AI in your Nigerian hospital, orthopaedic center, or rehabilitation clinic? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-base font-bold text-white">Nigeria Support Headquarters</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-200">Lagos Clinical Operations Hub</p>
                    <p className="text-slate-400">National Orthopaedic Hospital Complex, Igbobi, Lagos State, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Clinical Support Line</p>
                    <p className="text-slate-400">+234 (800) 776-7843 (PROSTHESYS)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Email Inquiries</p>
                    <p className="text-slate-400">support@prosthesys.ng</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Regional Support Centers</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Abuja Hub (CBD)</span>
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Enugu Hub (Independence)</span>
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Ibadan Hub (Ring Road)</span>
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Kano P&O Center</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white">Request Clinic Onboarding or Demo</h3>

            {contactSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank You for Contacting ProstheSys Nigeria</h4>
                <p className="text-xs text-slate-300">
                  Our clinical operations team in Lagos/Abuja will respond to your inquiry within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Olumide Johnson"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. o.johnson@hospital.ng"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Role in Facility</label>
                    <select
                      value={contactForm.role}
                      onChange={e => setContactForm({ ...contactForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option>Prosthetist / Orthotist</option>
                      <option>Physiatrist / Doctor</option>
                      <option>Physiotherapist</option>
                      <option>Clinic Administrator</option>
                      <option>Patient / Caregiver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Clinic State / Location</label>
                    <select
                      value={contactForm.stateLocation}
                      onChange={e => setContactForm({ ...contactForm, stateLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option>Lagos</option>
                      <option>Abuja (FCT)</option>
                      <option>Enugu</option>
                      <option>Oyo (Ibadan)</option>
                      <option>Kano</option>
                      <option>Rivers (Port Harcourt)</option>
                      <option>Kaduna</option>
                      <option>Edo (Benin)</option>
                      <option>Other State</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Clinic / Facility Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Federal Medical Centre P&O Department"
                    value={contactForm.facility}
                    onChange={e => setContactForm({ ...contactForm, facility: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Message / Clinical Needs</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your clinic workflow needs or questions..."
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white">ProstheSys AI Nigeria</span>
            <span className="text-slate-500">| Digital Clinical Management for Prosthetics & Orthotics</span>
          </div>
          <p className="text-[11px] text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} ProstheSys Health Nigeria. Designed for Nigerian P&O clinical practice.
          </p>
        </div>
      </footer>

    </div>
  );
};
