import React from 'react';
import {
  Patient,
  FabricationWorkflow,
  Appointment,
  DevicePrescription,
  RehabilitationSession
} from '../../types';
import { AuthUser } from '../../types/auth';
import {
  ShieldCheck,
  Hammer,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  User,
  HeartPulse,
  TrendingUp,
  Sparkles,
  Phone,
  MessageSquare,
  Award,
  ChevronRight
} from 'lucide-react';

interface PatientPortalViewProps {
  authUser: AuthUser;
  patient: Patient;
  workflows: FabricationWorkflow[];
  appointments: Appointment[];
  prescriptions: DevicePrescription[];
  rehabSessions: RehabilitationSession[];
  onNavigateTab: (tab: string) => void;
}

export const PatientPortalView: React.FC<PatientPortalViewProps> = ({
  authUser,
  patient,
  workflows,
  appointments,
  prescriptions,
  rehabSessions,
  onNavigateTab
}) => {
  const patientWorkflow = workflows.find(w => w.patientId === patient.id) || workflows[0];
  const patientAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName.includes(patient.name.split(' ')[0]));
  const nextAppointment = patientAppointments.find(a => a.status === 'Scheduled') || appointments[0];
  const patientRxs = prescriptions.filter(p => p.patientId === patient.id);
  const patientSessions = rehabSessions.filter(s => s.patientId === patient.id);

  // Latest Rehab Stats
  const latestSession = patientSessions[0] || {
    walkingDistanceMeters: 420,
    ampScore: 38,
    tugSeconds: 9.8
  };

  const STAGES_LIST = [
    'Assessment & Cast',
    'Casting / Scanning',
    'CAD Modification',
    'Manufacturing / Lamination',
    'Check Socket Fitting',
    'Final Delivery'
  ];

  const currentStageIndex = STAGES_LIST.indexOf(patientWorkflow?.currentStage || 'Manufacturing / Lamination');

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Patient Welcome Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={authUser.avatar || patient.photo}
            alt={patient.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30 rounded-full uppercase tracking-wider">
                Patient Care Portal
              </span>
              <span className="text-xs text-slate-300 font-mono">MRN: {patient.mrn}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Welcome back, {patient.name}!
            </h1>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span>{patient.amputationLevel} • Activity Level K{patient.activityLevel.replace('K', '')}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('telehealth')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Video className="w-4 h-4" /> Message Clinician
          </button>
          <button
            onClick={() => onNavigateTab('appointments')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> My Schedule
          </button>
        </div>
      </div>

      {/* Grid Row 1: Prosthetic Device Progress & Next Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Fabrication Tracker (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Prosthetic Device Fabrication Status
                </h3>
                <p className="text-xs text-slate-500">
                  {patientWorkflow?.deviceName || 'Custom Lower Limb Carbon Fiber Prosthesis'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-teal-100 text-teal-800 rounded-lg border border-teal-200">
              Target: {patientWorkflow?.targetCompletionDate || '12 Days'}
            </span>
          </div>

          {/* Interactive Stage Tracker */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {STAGES_LIST.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex || (idx === currentStageIndex && patientWorkflow?.currentStage === 'Completed');
                const isCurrent = idx === currentStageIndex && patientWorkflow?.currentStage !== 'Completed';

                return (
                  <div
                    key={stage}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-between gap-1 transition-all ${
                      isCurrent
                        ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                        : isCompleted
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-white border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400">Step 0{idx + 1}</div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 my-1" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5 text-teal-600 animate-pulse my-1" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 my-1" />
                    )}
                    <span className="text-[11px] font-bold leading-tight">{stage}</span>
                    <span className="text-[9px] text-slate-500 mt-0.5">
                      {isCompleted ? 'Done' : isCurrent ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Current Stage Note: Socket check fitting scheduled for next clinical visit.
              </span>
              <button
                onClick={() => onNavigateTab('fabrication')}
                className="text-blue-600 font-bold hover:underline shrink-0 text-xs flex items-center gap-1"
              >
                View Full Log <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Next Appointment Card (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Next Appointment</h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                Confirmed
              </span>
            </div>

            {nextAppointment ? (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-slate-900">{nextAppointment.type}</p>
                  <p className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {nextAppointment.dateTime} ({nextAppointment.durationMins} mins)
                  </p>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-1">
                    <User className="w-3 h-3 text-slate-400" /> Clinician: {nextAppointment.clinicianName}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Preparation Reminder:</p>
                  <p className="text-[11px]">Please bring your residual limb shrinker socks and comfortable walking shoes.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-4">No upcoming scheduled appointments.</p>
            )}
          </div>

          <button
            onClick={() => onNavigateTab('appointments')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            Manage Appointments
          </button>
        </div>

      </div>

      {/* Grid Row 2: Rehabilitation Milestones & Care Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Mobility Stats Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" /> Rehab Goal Progress
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              K3 Functional
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <p className="text-[10px] text-emerald-700 font-bold uppercase">6-Min Walk Distance</p>
              <h4 className="text-xl font-bold text-slate-900 mt-1">{latestSession.walkingDistanceMeters}m</h4>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" /> +45m improvement
              </p>
            </div>

            <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <p className="text-[10px] text-blue-700 font-bold uppercase">AMPPro Score</p>
              <h4 className="text-xl font-bold text-slate-900 mt-1">{latestSession.ampScore} / 47</h4>
              <p className="text-[10px] text-blue-600 font-semibold mt-0.5">High Mobility Predictor</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('rehab')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            View Physical Therapy Logs <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* My Care Team */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-600" /> My Clinical Care Team
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  MV
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Dr. Marcus Vance, CPO</p>
                  <p className="text-[10px] text-slate-500">Lead Prosthetist</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('telehealth')}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  ER
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Elena Rostova, DPT</p>
                  <p className="text-[10px] text-slate-500">Gait Physiotherapist</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('telehealth')}
                className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Prescribed Device Details */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-600" /> Prescribed Device
            </span>
          </div>

          <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl space-y-1.5">
            <p className="text-xs font-bold text-slate-900">{patientRxs[0]?.deviceName || 'Transfemoral Bionic Prosthesis'}</p>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <p><span className="font-semibold text-slate-800">Socket:</span> {patientRxs[0]?.socketType || 'MAS Suction Carbon Socket'}</p>
              <p><span className="font-semibold text-slate-800">Foot:</span> {patientRxs[0]?.componentFootOrJoint || 'Ottobock Triton Carbon Foot'}</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('prescriptions')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            View Device Warranty & Specs <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
