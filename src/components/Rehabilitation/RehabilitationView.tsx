import React, { useState } from 'react';
import { Patient, RehabilitationSession } from '../../types';
import { Activity, Plus, CheckCircle2, TrendingUp, Trophy, Calendar, FileText } from 'lucide-react';

interface RehabilitationViewProps {
  patient: Patient;
  rehabSessions: RehabilitationSession[];
  onSaveSession: (session: RehabilitationSession) => void;
}

export const RehabilitationView: React.FC<RehabilitationViewProps> = ({
  patient,
  rehabSessions,
  onSaveSession
}) => {
  const patientSessions = rehabSessions.filter(s => s.patientId === patient.id);

  const [walkDist, setWalkDist] = useState<number>(480);
  const [tugSec, setTugSec] = useState<number>(9.2);
  const [ampScore, setAmpScore] = useState<number>(42);
  const [painScore, setPainScore] = useState<number>(1);
  const [physioNotes, setPhysioNotes] = useState<string>('Patient completed dynamic obstacle navigation and stair climbing.');

  const handleLogSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: RehabilitationSession = {
      id: `reh-${Date.now()}`,
      patientId: patient.id,
      sessionDate: new Date().toISOString().split('T')[0],
      therapistName: 'Sarah Jenkins, PT',
      walkingDistanceMeters: walkDist,
      tugSeconds: tugSec,
      ampScore: ampScore,
      vasPainScore: painScore,
      exercisesCompleted: ['Single leg stance', 'Variable speed walking', 'Stair negotiation'],
      physioNotes,
      goalsAchieved: ['Traversed 400m+ without handrail']
    };
    onSaveSession(newSession);
    alert('Rehabilitation session saved!');
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl border border-emerald-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold">Amputee Rehabilitation & Outcome Measures</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tracking 6MWT, TUG & AMPPro scores for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
      </div>

      {/* Outcome Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">6-Minute Walk Test (6MWT)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{walkDist} m</span>
            <span className="text-[10px] text-emerald-600 font-bold">+45m improvement</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Target: &gt;450m for K3/K4</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Timed Up & Go (TUG)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{tugSec}s</span>
            <span className="text-[10px] text-emerald-600 font-bold">Fast mobility</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Target: &lt;10s</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">AMPPro Mobility Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{ampScore} / 47</span>
            <span className="text-[10px] text-emerald-600 font-bold">K3 Predictor</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Amputee Mobility Predictor</p>
        </div>
      </div>

      {/* Log Session Form & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Log Form */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Log Physical Therapy Session</h3>

          <form onSubmit={handleLogSession} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">6MWT Distance (Meters)</label>
              <input
                type="number"
                value={walkDist}
                onChange={(e) => setWalkDist(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">TUG Duration (Seconds)</label>
              <input
                type="number"
                step="0.1"
                value={tugSec}
                onChange={(e) => setTugSec(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">AMPPro Score (0-47)</label>
              <input
                type="number"
                value={ampScore}
                onChange={(e) => setAmpScore(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Session Physiotherapy Notes</label>
              <textarea
                rows={3}
                value={physioNotes}
                onChange={(e) => setPhysioNotes(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Save Therapy Record
            </button>
          </form>
        </div>

        {/* History Stream */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Rehabilitation Progress History</h3>

          <div className="space-y-3">
            {patientSessions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No rehab sessions recorded yet.</p>
            ) : (
              patientSessions.map((s) => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{s.sessionDate} • {s.therapistName}</span>
                    <span className="text-emerald-700 font-semibold">AMPPro: {s.ampScore}/47</span>
                  </div>
                  <p className="text-slate-600">{s.physioNotes}</p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>6MWT: <strong className="text-slate-900">{s.walkingDistanceMeters}m</strong></span>
                    <span>TUG: <strong className="text-slate-900">{s.tugSeconds}s</strong></span>
                    <span>VAS Pain: <strong className="text-slate-900">{s.vasPainScore}/10</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
