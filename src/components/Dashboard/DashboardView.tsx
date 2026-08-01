import React from 'react';
import {
  Patient,
  Appointment,
  Invoice,
  DevicePrescription,
  RehabilitationSession,
  InventoryItem,
  UserRole
} from '../../types';
import { AuthUser } from '../../types/auth';
import { PatientPortalView } from './PatientPortalView';
import {
  Users,
  Calendar,
  Activity,
  DollarSign,
  TrendingUp,
  FileText,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Package,
  Building2,
  UserCheck,
  Footprints,
  CreditCard,
  Video
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

interface DashboardViewProps {
  authUser?: AuthUser;
  userRole?: UserRole;
  patients?: Patient[];
  appointments?: Appointment[];
  invoices?: Invoice[];
  workflows?: any[];
  rehabSessions?: RehabilitationSession[];
  prescriptions?: DevicePrescription[];
  inventory?: InventoryItem[];
  onNavigateTab?: (tab: any) => void;
  onSelectPatient?: (patientId: string) => void;
}

const AMPUTATION_CHART_DATA = [
  { name: 'Transtibial (BK)', count: 42, color: '#3b82f6' },
  { name: 'Transfemoral (AK)', count: 28, color: '#06b6d4' },
  { name: 'Foot Drop / AFO', count: 19, color: '#10b981' },
  { name: 'Upper Limb (TR/TH)', count: 8, color: '#8b5cf6' },
  { name: 'Partial Foot / Syme', count: 6, color: '#f59e0b' }
];

const MONTHLY_PATIENT_DATA = [
  { month: 'Jan', newPatients: 14, followUps: 32 },
  { month: 'Feb', newPatients: 18, followUps: 40 },
  { month: 'Mar', newPatients: 22, followUps: 45 },
  { month: 'Apr', newPatients: 19, followUps: 42 },
  { month: 'May', newPatients: 25, followUps: 50 },
  { month: 'Jun', newPatients: 28, followUps: 58 },
  { month: 'Jul', newPatients: 31, followUps: 64 }
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 42000, insuranceClaims: 34000 },
  { month: 'Feb', revenue: 58000, insuranceClaims: 48000 },
  { month: 'Mar', revenue: 64000, insuranceClaims: 52000 },
  { month: 'Apr', revenue: 51000, insuranceClaims: 41000 },
  { month: 'May', revenue: 78000, insuranceClaims: 65000 },
  { month: 'Jun', revenue: 89000, insuranceClaims: 74000 },
  { month: 'Jul', revenue: 96000, insuranceClaims: 81000 }
];

const PRESCRIBED_DEVICES_DATA = [
  { name: 'TSB Carbon BK', count: 34 },
  { name: 'C-Leg / Genium AK', count: 18 },
  { name: 'Custom Carbon AFO', count: 22 },
  { name: 'Seal-In Vacuum Socket', count: 29 },
  { name: 'Myoelectric Hand', count: 7 }
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  authUser,
  userRole,
  patients = [],
  appointments = [],
  invoices = [],
  workflows = [],
  rehabSessions = [],
  prescriptions = [],
  inventory = [],
  onNavigateTab = (_tab: any) => {},
  onSelectPatient = (_patientId: string) => {}
}) => {
  const activeRole = authUser?.role || userRole || 'Prosthetist';
  const safePatients = patients || [];
  const safeAppointments = appointments || [];
  const safeInvoices = invoices || [];

  // If logged in as Patient, render the Patient Portal View
  if (activeRole === 'Patient') {
    const patientRecord = safePatients[0];
    const defaultAuth: AuthUser = authUser || {
      id: 'usr-6',
      name: patientRecord?.name || 'John Doe',
      email: patientRecord?.email || 'john.doe@gmail.com',
      role: 'Patient',
      avatar: patientRecord?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      title: 'Patient Portal',
      clinicName: 'ProstheSys Central Rehabilitation Clinic'
    };

    return (
      <PatientPortalView
        authUser={defaultAuth}
        patient={patientRecord}
        workflows={workflows}
        appointments={safeAppointments}
        prescriptions={prescriptions}
        rehabSessions={rehabSessions}
        onNavigateTab={onNavigateTab}
      />
    );
  }

  const activeRehabCount = safePatients.filter(p => p.status === 'Active Rehab' || p.status === 'Active Rehabilitation').length || safePatients.length;
  const pendingInvoicesTotal = safeInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner & Quick AI Launcher - Dynamically tailored per Role */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30 rounded-full uppercase tracking-wider">
              {activeRole} Workspace Dashboard
            </span>
            {authUser && <span className="text-xs text-slate-300">• Logged in as {authUser.name}</span>}
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {activeRole === 'Admin'
              ? 'Executive Clinic & Systems Command'
              : activeRole === 'Physiotherapist'
              ? 'Amputee Rehabilitation & Gait Performance'
              : activeRole === 'Receptionist'
              ? 'Front Desk Intake & Schedule Manager'
              : 'Clinical Prosthetics & Biomechanics Overview'}{' '}
            <Sparkles className="w-5 h-5 text-teal-400" />
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {activeRole === 'Admin'
              ? 'Multi-branch clinic operational KPIs, inventory alerts, and financial billing reports.'
              : activeRole === 'Physiotherapist'
              ? 'Gait deviation alerts, 6-Minute Walk Test trends, and active therapy progression.'
              : activeRole === 'Receptionist'
              ? "Today's patient appointments, insurance approvals, and check-in queue."
              : '8 socket trial & alignment sessions scheduled today. AI component recommendations ready.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeRole === 'Physiotherapist' ? (
            <>
              <button
                onClick={() => onNavigateTab('rehab')}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <Activity className="w-4 h-4" /> Log Therapy Session
              </button>
              <button
                onClick={() => onNavigateTab('gait')}
                className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <Footprints className="w-4 h-4" /> Gait Deviation Analyzer
              </button>
            </>
          ) : activeRole === 'Receptionist' ? (
            <>
              <button
                onClick={() => onNavigateTab('appointments')}
                className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" /> Schedule Appointment
              </button>
              <button
                onClick={() => onNavigateTab('billing')}
                className="flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <CreditCard className="w-4 h-4" /> Process Invoices
              </button>
            </>
          ) : activeRole === 'Admin' ? (
            <>
              <button
                onClick={() => onNavigateTab('inventory')}
                className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <Package className="w-4 h-4" /> Inventory Stock
              </button>
              <button
                onClick={() => onNavigateTab('database')}
                className="flex items-center gap-2 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4" /> Cloud & DB Health
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigateTab('soap')}
                className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <FileText className="w-4 h-4" /> AI SOAP Generator
              </button>
              <button
                onClick={() => onNavigateTab('ai-assistant')}
                className="flex items-center gap-2 px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" /> AI Device Recommender
              </button>
            </>
          )}
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appointments</p>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-slate-900">{safeAppointments.length}</h2>
            <p className="text-[10px] text-green-600 font-medium mt-0.5 flex items-center gap-1">
              +2 from yesterday <TrendingUp className="w-3 h-3" />
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Patients</p>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-slate-900">{safePatients.length}</h2>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">100% digitized records</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Rehab</p>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-slate-900">{activeRehabCount}</h2>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">94% on track</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Devices Pending</p>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-md">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-slate-900">07</h2>
            <p className="text-[10px] text-amber-600 font-medium mt-0.5">3 due this week</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue MTD</p>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-slate-900">${pendingInvoicesTotal.toLocaleString()}</h2>
            <p className="text-[10px] text-green-600 font-medium mt-0.5">↑ 12% vs last month</p>
          </div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Patient & Followup Volume */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Patient Intake & Follow-Up Volume</h3>
              <p className="text-xs text-slate-500">Monthly new registrations vs rehabilitation visits</p>
            </div>
            <button
              onClick={() => onNavigateTab('patients')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              View Patient Directory <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_PATIENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="newPatients" name="New Registrations" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="followUps" name="Rehab & Fitting Visits" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amputation Distribution Donut */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Amputation & Orthotic Levels</h3>
            <p className="text-xs text-slate-500">Clinical breakdown across active caseload</p>
          </div>
          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={AMPUTATION_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {AMPUTATION_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
            {AMPUTATION_CHART_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}</span>
                <span className="font-semibold text-slate-900 ml-auto">{item.count}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Revenue Trends & Prescribed Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinic Financial Performance ($ USD)</h3>
              <p className="text-xs text-slate-500">Gross revenue vs insurance reimbursement claims</p>
            </div>
            <button
              onClick={() => onNavigateTab('billing')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Billing Ledger
            </button>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" name="Total Revenue ($)" stroke="#3b82f6" fill="#eff6ff" strokeWidth={2} />
                <Area type="monotone" dataKey="insuranceClaims" name="Insurance Claims ($)" stroke="#10b981" fill="#ecfdf5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Prescribed Devices */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Most Prescribed P&O Devices</h3>
            <p className="text-xs text-slate-500">Current device category distribution</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={PRESCRIBED_DEVICES_DATA}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={140} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" name="Prescribed Units" fill="#06b6d4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Today's Appointments & Recent Activities List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Today's Clinical Schedule
            </h3>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Full Calendar
            </button>
          </div>
          <div className="space-y-3">
            {safeAppointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => onSelectPatient(apt.patientId)}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200/80 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">{apt.patientName}</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded-md">
                      {apt.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{apt.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800">
                    {new Date(apt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{apt.reminderSentStatus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Clinical Stream Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" /> Live Clinical Activity Log
          </h3>
          <div className="space-y-3 text-xs">
            
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Check Socket Lamination Completed</p>
                <p className="text-slate-500 text-[11px]">Eleanor Vance (MRN: PS-2026-0814) carbon socket ready for trial fit.</p>
                <span className="text-[10px] text-slate-400">12 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <Sparkles className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">AI Gait Deviation Detected</p>
                <p className="text-slate-500 text-[11px]">Lt. James Sterling: Vaulting severity reduced to mild with 3mm pylon adjustment.</p>
                <span className="text-[10px] text-slate-400">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Low Stock Triggered</p>
                <p className="text-slate-500 text-[11px]">Össur Pro-Flex XC Foot (Cat 3) inventory level reached reorder threshold (2 left).</p>
                <span className="text-[10px] text-slate-400">3 hours ago</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
