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
  UserCheck
} from 'lucide-react';
import { AuthUser, PRESET_USERS } from '../../types/auth';

interface LandingPageProps {
  onLaunchApp: () => void;
  onOpenAuthModal: () => void;
  onSelectRole: (user: AuthUser) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  category: 'sockets' | 'upper' | 'gait' | 'pediatric';
  categoryLabel: string;
  image: string;
  patientProfile: string;
  outcome: string;
  specs: string[];
  metrics: { label: string; value: string }[];
  description: string;
  kLevelBefore: string;
  kLevelAfter: string;
}

const PORTFOLIO_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Transfemoral Bionic Socket CAD v4',
    category: 'sockets',
    categoryLabel: 'Socket Innovation',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Active Military Veteran (Aged 34, Transfemoral Amputee)',
    outcome: '42% reduction in residual limb shear stress; K2 to K4 mobility leap within 8 weeks.',
    specs: ['Carbon Fiber Vacuum Lamination', 'Gemini 3D Shape Morphing', 'Dynamic Load Dispersion'],
    metrics: [
      { label: 'Fit Accuracy', value: '99.6%' },
      { label: 'Comfort Score', value: '9.8 / 10' }
    ],
    description: 'Utilizing Gemini 3D spatial fitting, this custom transfemoral socket adapts pressure points along the ischial containment zone to eliminate skin breakdown during high-impact athletics.',
    kLevelBefore: 'K2 (Limited Community)',
    kLevelAfter: 'K4 (High Impact Athletic)'
  },
  {
    id: 'cs-2',
    title: 'Adaptive Myoelectric Hand EMG Calibration',
    category: 'upper',
    categoryLabel: 'Upper Limb Bionics',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Concert Pianist & Engineer (Aged 29, Transradial Amputee)',
    outcome: 'Achieved 14 fine-motor grasp patterns with sub-15ms EMG recognition response time.',
    specs: ['Multi-Channel Pattern EMG Array', 'AI Neuromuscular Filter', 'Titanium Micro-Actuators'],
    metrics: [
      { label: 'EMG Response', value: '12ms' },
      { label: 'Grasp Precision', value: '98.9%' }
    ],
    description: 'Combines non-invasive forearm surface sensor matrices with neural network intent decoding to deliver fluid multi-articulating finger control for detailed dexterity tasks.',
    kLevelBefore: 'Standard Hook / Passive',
    kLevelAfter: 'Advanced Multi-Grip Bionic'
  },
  {
    id: 'cs-3',
    title: 'Microprocessor Knee & Energy-Return Alignment',
    category: 'gait',
    categoryLabel: 'Gait Optimization',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Senior Community Walker (Aged 68, Knee Disarticulation)',
    outcome: 'Symmetrical stance phase restored; Trendelenburg gait deviation completely cleared.',
    specs: ['Real-Time Hydraulic Stance Control', 'Vision Gait Telemetry Integration', 'Slope Adaptive Heel Foot'],
    metrics: [
      { label: 'AMPPro Score', value: '+18 pts' },
      { label: 'Metabolic Fatigue', value: '-35%' }
    ],
    description: 'AI-assisted alignment tuning synchronized with vision gait telemetry to adjust hydraulic resistance across ramps, stairs, and uneven cobblestones automatically.',
    kLevelBefore: 'K2 (Cautious Walker)',
    kLevelAfter: 'K3 (Unlimited Community)'
  },
  {
    id: 'cs-4',
    title: 'Pediatric Growth-Adaptive Modular Shin',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Young Athlete (Aged 9, Congenital Transtibial Limb Difference)',
    outcome: 'Telescoping pylon allowed 6cm growth adjustments across 18 months with zero full socket remakes.',
    specs: ['Ultra-Light Titanium Pylon Core', 'Child-Safe Shock Absorber', 'Modular Growth Spacers'],
    metrics: [
      { label: 'Weight', value: '620 grams' },
      { label: 'Cost Savings', value: '$14,200' }
    ],
    description: 'Engineered specifically for pediatric growth velocity, allowing clinicians to make incremental alignment and length adjustments without subjecting young patients to frequent re-casting sessions.',
    kLevelBefore: 'Frequent Re-casting',
    kLevelAfter: 'Modular Extended Fit'
  },
  {
    id: 'cs-5',
    title: 'Active Vacuum Suspension & Thermal Gel Liner',
    category: 'sockets',
    categoryLabel: 'Socket Innovation',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Marathon Runner (Aged 41, Transtibial Amputee)',
    outcome: 'Zero limb volume fluctuation recorded across a continuous 26.2-mile endurance run.',
    specs: ['Smart Micro-Vacuum Pump', 'Phase-Change Gel Thermal Sleeve', 'Sweat Moisture Channeling'],
    metrics: [
      { label: 'Limb Temp Stability', value: '36.5°C' },
      { label: 'Vacuum Retention', value: '-15 mmHg' }
    ],
    description: 'Integrated smart vacuum sensors maintain stable negative pressure regardless of sweat accumulation or muscle expansion during sustained aerobic exertion.',
    kLevelBefore: 'K3 (Volume Fluctuations)',
    kLevelAfter: 'K4 (Endurance Marathon)'
  },
  {
    id: 'cs-6',
    title: 'Real-Time VR Biofeedback Gait Retraining',
    category: 'gait',
    categoryLabel: 'Gait Optimization',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    patientProfile: 'Post-Trauma Rehabilitation Patient (Aged 26)',
    outcome: 'Eliminated vaulting and circumferential gait habits within 5 virtual reality biofeedback sessions.',
    specs: ['Insole Pressure Sensor Matrix', 'Sub-Millimeter Motion Tracking', 'Visual Cadence Cueing'],
    metrics: [
      { label: 'Cadence Output', value: '+22%' },
      { label: 'Symmetry Index', value: '96.4%' }
    ],
    description: 'Combines pressure-sensing smart insoles with interactive visual targets to retrain stance-phase timing and hip elevation mechanics in real-time.',
    kLevelBefore: 'K1 (Asymmetric Vaulting)',
    kLevelAfter: 'K3 (Fluid Symmetric Gait)'
  }
];

const LEADERSHIP_TEAM = [
  {
    name: 'Dr. Marcus Vance, CPO, LPO',
    title: 'Chief Medical Officer & Lead Prosthetist',
    bio: '20+ years specializing in complex transfemoral vacuum lamination, bionic limb alignment, and amputee gait rehabilitation.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    credentials: 'Board Certified Prosthetist / Orthotist'
  },
  {
    name: 'Dr. Elena Rostova, PhD',
    title: 'Head of Biomechanical AI & Telemetry',
    bio: 'Former MIT Biomechatronics Fellow leading neural intent decoding algorithms and automated L-code component matching.',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78853a152391?auto=format&fit=crop&w=300&q=80',
    credentials: 'PhD Biomechanics & AI Systems'
  },
  {
    name: 'Kaito Tanaka, MSc',
    title: 'Director of 3D Additive Lamination',
    bio: 'Ex-NASA Materials Specialist pioneering carbon fiber lattice structures and thermal-active socket polymers.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    credentials: 'MSc Materials Engineering'
  },
  {
    name: 'Sarah Jenkins, DPT',
    title: 'Clinical Rehabilitation Lead',
    bio: 'Doctor of Physical Therapy guiding amputee functional milestone testing, 6MWT evaluations, and AMPPro scoring.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    credentials: 'Doctor of Physical Therapy (DPT)'
  }
];

const TIMELINE_MILESTONES = [
  {
    year: '2021',
    title: 'Foundation & Clinical Trial',
    desc: 'Founded by practicing prosthetists and machine learning researchers to solve socket volume fluctuation and fitting friction.'
  },
  {
    year: '2023',
    title: 'Multi-Sensor Gait Telemetry',
    desc: 'Rolled out pressure-sensing insole integration and computer vision gait deviation tracking across 12 O&P clinics.'
  },
  {
    year: '2025',
    title: 'Gemini Component Matching Engine',
    desc: 'Introduced multimodal AI component recommendations linked directly to insurance L-Code billing rules.'
  },
  {
    year: '2026',
    title: 'Autonomous Bionic CAD Lamination',
    desc: 'Expanded to full 6-stage fabrication management with automated 3D socket morphing and global telehealth suite.'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onOpenAuthModal,
  onSelectRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioCategory, setPortfolioCategory] = useState<'all' | 'sockets' | 'upper' | 'gait' | 'pediatric'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    role: 'Prosthetist / Clinician',
    clinic: '',
    interest: 'Clinical Suite Demo',
    message: ''
  });

  const filteredCaseStudies = PORTFOLIO_CASE_STUDIES.filter(cs =>
    portfolioCategory === 'all' ? true : cs.category === portfolioCategory
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 border-b border-blue-500/30">
        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] uppercase font-bold tracking-wider">
          ProstheSys v2.4 Live
        </span>
        <span className="hidden xs:inline">Introducing Multimodal Gait AI & Instant Bionic Socket CAD Synthesis.</span>
        <button
          onClick={onLaunchApp}
          className="underline hover:text-blue-100 font-bold ml-1 inline-flex items-center gap-1 cursor-pointer"
        >
          Try Suite <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchApp}>
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ProstheSys <span className="text-blue-400 font-semibold">AI</span>
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Clinical Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Core Capabilities</a>
            <a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio & Breakthroughs</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About Us</a>
            <a href="#roles" className="hover:text-blue-400 transition-colors">Workspaces</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
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
              className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer"
            >
              <span>Launch Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onLaunchApp}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              Launch
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
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-blue-400"
                >
                  Core Capabilities
                </a>
                <a
                  href="#portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-blue-400"
                >
                  Portfolio & Breakthroughs
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-blue-400"
                >
                  About Us & Leadership
                </a>
                <a
                  href="#roles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-blue-400"
                >
                  Workspaces Preview
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-slate-900/80 rounded-lg hover:text-blue-400"
                >
                  Contact & Support
                </a>
              </nav>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-900">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-slate-200 border border-slate-800 bg-slate-900 rounded-xl text-center"
                >
                  Sign In / Switch User
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLaunchApp();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl text-center flex items-center justify-center gap-2"
                >
                  <span>Launch Clinical Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Glow Effects Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/80 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold backdrop-blur-sm shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>The Gold Standard in AI-Powered Amputee Care & Bionics</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Precision Prosthetics, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              AI Component Match & Gait Analytics
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unifying amputee evaluation, 3D socket fabrication workflows, Gemini-driven component recommendations, and physical therapy gait deviation tracking in a single HIPAA-compliant clinical suite.
          </p>
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
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Launch Live Clinical Suite</span>
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
            <span>Preview Patient Portal View</span>
          </motion.button>
        </motion.div>

        {/* Metric High-Impact Ticker Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-blue-500/40 transition-colors">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-blue-400">99.2%</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Socket Fit Accuracy</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-teal-500/40 transition-colors">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-teal-400">-40%</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Fabrication Lead Time</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-indigo-500/40 transition-colors">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-indigo-400">14k+</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Gait Analytics Logged</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-purple-500/40 transition-colors">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-purple-400">100%</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">HIPAA & EHR Ready</p>
          </div>
        </motion.div>

      </section>

      {/* CORE CAPABILITIES BENTO GRID */}
      <section id="features" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
            Complete Clinical Ecosystem
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Engineered for Modern Orthotics & Prosthetics
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            From initial post-amputation assessment to 3D socket lamination and physical therapy gait retraining.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-blue-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">AI Component Matcher</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini AI evaluates activity level (K1–K4), residual limb anatomy, weight, and lifestyle to recommend feet, knees, and socket suspension systems.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-teal-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20 group-hover:scale-105 transition-transform">
              <Hammer className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Fabrication Track & CAD</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time 6-stage tracking from casting/3D scanning to CAD modification, carbon fiber lamination, and check socket fitting.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-indigo-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-105 transition-transform">
              <Footprints className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Vision Gait Deviation AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detect trendelenburg gait, vaulting, circumferential gait, and whip errors. Automatically updates 6-Min Walk Test and AMPPro metrics.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-purple-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">AI SOAP Dictation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turn verbal clinician notes into structured Subjective, Objective, Assessment, and Plan notes instantly formatted for L-Code insurance billing.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Amputee Telehealth Room</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encrypted remote video consultations with integrated socket pressure telemetry and direct patient messaging.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-amber-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Role-Based Access (RBAC)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailored workspace views for Prosthetists, Doctors, Physiotherapists, Receptionists, Administrators, and Patients.
            </p>
          </motion.div>

        </div>
      </section>

      {/* PORTFOLIO & CLINICAL BREAKTHROUGHS SECTION */}
      <section id="portfolio" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Amputee Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Prosthetic Engineering Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore real-world prosthetic designs, socket CAD innovations, and measurable patient mobility improvements powered by ProstheSys AI.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 border border-slate-800 rounded-2xl self-start md:self-auto">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'sockets', label: 'Socket CAD' },
              { id: 'upper', label: 'Upper Limb' },
              { id: 'gait', label: 'Gait Tuning' },
              { id: 'pediatric', label: 'Pediatric' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPortfolioCategory(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  portfolioCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 rounded-3xl overflow-hidden flex flex-col group transition-all shadow-xl"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold bg-slate-950/80 text-blue-400 border border-slate-700/80 rounded-full backdrop-blur-md">
                    {item.categoryLabel}
                  </span>

                  {/* K-Level Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-bold bg-teal-950/90 text-teal-300 border border-teal-500/40 rounded-lg backdrop-blur-md flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-teal-400" />
                    <span>{item.kLevelAfter}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-950/50 p-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-semibold block">{m.label}</span>
                        <span className="text-xs font-extrabold text-blue-400">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Detail Action */}
                  <button
                    onClick={() => setSelectedCaseStudy(item)}
                    className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-blue-600 text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Inspect CAD & Clinical Specs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CASE STUDY DETAIL MODAL */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Clinical Breakthrough Portfolio</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedCaseStudy.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedCaseStudy.patientProfile}
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  Primary Clinical Outcome
                </span>
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  "{selectedCaseStudy.outcome}"
                </p>
              </div>

              {/* Before vs After K-Level Progression */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold block">Baseline Mobility</span>
                  <span className="text-xs font-semibold text-slate-300">{selectedCaseStudy.kLevelBefore}</span>
                </div>
                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/30">
                  <span className="text-[10px] text-blue-400 font-bold block">Post-ProstheSys AI</span>
                  <span className="text-xs font-bold text-teal-300">{selectedCaseStudy.kLevelAfter}</span>
                </div>
              </div>

              {/* Specs & Hardware */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Engineering & Material Specifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.specs.map((spec, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700/60 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    onLaunchApp();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  <span>Test Similar Workflow in Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ABOUT US & LEADERSHIP SECTION */}
      <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 border-t border-slate-800/80">
        
        {/* Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
              <Compass className="w-3.5 h-3.5" />
              <span>About ProstheSys Health</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Pioneering Zero-Friction Bionics for Every Amputee
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded at the intersection of clinical prosthetic care and machine learning intelligence, ProstheSys AI bridges the gap between manual socket fabrication, insurance billing rules, and physical therapy gait mechanics.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our platform empowers orthotists, prosthetists, and rehab specialists across 140+ clinical branches to deliver custom bionics faster, reduce painful re-casting cycles, and maximize amputee quality of life.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <Building2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">140+ Partner Clinics</h4>
                  <p className="text-[11px] text-slate-400">Global O&P footprint</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <Users className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">28,000+ Patients</h4>
                  <p className="text-[11px] text-slate-400">Active amputee care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Timeline */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Prosthetic Innovation Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-6 border-l border-slate-800">
              {TIMELINE_MILESTONES.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-950 group-hover:scale-125 transition-transform" />
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold rounded-md border border-blue-500/30">
                    {item.year}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Clinical & Engineering Leadership
            </h3>
            <h4 className="text-xl sm:text-3xl font-extrabold text-white">
              Guided by Board-Certified Prosthetists & AI Experts
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-5 space-y-4 text-center group transition-all"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-slate-700 group-hover:border-blue-400 transition-colors shadow-md"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-teal-400">{member.title}</p>
                  <span className="inline-block text-[10px] text-slate-500 font-medium">
                    {member.credentials}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* INTERACTIVE ROLE SWITCHER SECTION */}
      <section id="roles" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 bg-slate-900/30 border-y border-slate-800/80">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest">
            Role-Tailored Dashboard Previews
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Experience ProstheSys as Any Team Member
          </h3>
          <p className="text-xs text-slate-400">
            Click any profile below to launch directly into that user's customized clinical view.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_USERS.map((usr) => (
            <motion.div
              key={usr.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(usr)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 cursor-pointer transition-all flex items-start gap-4 group shadow-md"
            >
              <img
                src={usr.avatar}
                alt={usr.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700 group-hover:border-blue-400 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                    {usr.name}
                  </h4>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    {usr.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{usr.title}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 mt-2 group-hover:translate-x-1 transition-transform">
                  Launch View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT US & CLINICAL INQUIRY SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold rounded-full">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Clinical Support</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Connect with Our Clinical Bionics Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions about integrating ProstheSys AI into your clinic, requesting a custom CAD demo, or setting up telehealth? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details & Hub Locations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-base font-bold text-white">Clinical Support Headquarters</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-200">Boston Bionics Innovation Center</p>
                    <p className="text-slate-400">450 Biomedical Parkway, Suite 800, Boston, MA 02115</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Clinical Hotline (24/7)</p>
                    <p className="text-slate-400">+1 (800) 555-PROSTHESYS</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">Inquiries & EHR Integration</p>
                    <p className="text-slate-400">clinical-support@prosthesys-ai.health</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Global Innovation Hubs</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Zurich Prosthetic Lab</span>
                  <span className="p-2 bg-slate-950 rounded-xl border border-slate-800">Singapore O&P Hub</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Badge */}
            <div className="p-5 bg-gradient-to-r from-blue-900/40 to-teal-900/40 border border-blue-500/30 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">HIPAA Compliant & Encrypted</p>
                <p className="text-slate-400">All clinical communications are strictly protected by BAA protocols.</p>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">Send Clinical Inquiry or Request Demo</h3>

              {contactSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-teal-950/40 border border-teal-500/40 rounded-2xl text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-white">{contactForm.name}</span>. Our clinical bionics specialist team will review your request and get in touch within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({
                        name: '',
                        email: '',
                        role: 'Prosthetist / Clinician',
                        clinic: '',
                        interest: 'Clinical Suite Demo',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Dr. Sarah Connor"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="s.connor@bionicsclinic.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Clinical Role</label>
                      <select
                        value={contactForm.role}
                        onChange={e => setContactForm({ ...contactForm, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option>Prosthetist / Clinician</option>
                        <option>Orthotist</option>
                        <option>Physical Therapist</option>
                        <option>Clinic Director / Owner</option>
                        <option>Amputee / Patient</option>
                        <option>Research Partner</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Clinic / Hospital Name</label>
                      <input
                        type="text"
                        value={contactForm.clinic}
                        onChange={e => setContactForm({ ...contactForm, clinic: e.target.value })}
                        placeholder="Apex Amputee Care Center"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Primary Inquiry Area</label>
                    <select
                      value={contactForm.interest}
                      onChange={e => setContactForm({ ...contactForm, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option>Clinical Suite Demo & Onboarding</option>
                      <option>3D Socket CAD Lamination Integration</option>
                      <option>Gemini Component Matching Engine</option>
                      <option>Telehealth & Gait Telemetry Setup</option>
                      <option>Patient Consultation Referral</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Message / Notes</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your clinic's patient volume, component catalog needs, or custom socket fabrication goals..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-800/50 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30 uppercase tracking-wider">
              Get Started Instantly
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Upgrade Amputee Care Precision?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Access the complete ProstheSys AI Clinical Suite right now with loaded demo patients, fabrication workflows, and gait telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-10 py-4 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Enter Clinical Suite</span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 sm:px-8 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-slate-300">ProstheSys AI Clinical Systems</span>
            <span className="hidden md:inline">• HIPAA Compliant EHR & Bionics Ecosystem</span>
          </div>
          <p>© {new Date().getFullYear()} ProstheSys Healthcare Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};
