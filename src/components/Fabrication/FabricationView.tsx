import React, { useState } from 'react';
import { Patient, FabricationWorkflow, FabricationStageName } from '../../types';
import { Hammer, CheckCircle2, Clock, User, ArrowRight, Shield, AlertCircle } from 'lucide-react';

interface FabricationViewProps {
  patient: Patient;
  workflows: FabricationWorkflow[];
  onUpdateWorkflowStage: (workflowId: string, stageName: FabricationStageName) => void;
}

export const FabricationView: React.FC<FabricationViewProps> = ({
  patient,
  workflows,
  onUpdateWorkflowStage
}) => {
  const activeWorkflow = workflows.find(w => w.patientId === patient.id) || workflows[0];

  const handleAdvanceStage = () => {
    if (!activeWorkflow) return;
    const stages = activeWorkflow.stages;
    const currentIndex = stages.findIndex(s => s.status === 'In Progress');
    if (currentIndex !== -1 && currentIndex < stages.length - 1) {
      const nextStageName = stages[currentIndex + 1].stageName;
      onUpdateWorkflowStage(activeWorkflow.id, nextStageName);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Prosthetic & Orthotic Fabrication Pipeline</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tracking manufacturing, CAD modifications & lamination stages for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
        {activeWorkflow && (
          <button
            onClick={handleAdvanceStage}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" /> Advance Stage to Next
          </button>
        )}
      </div>

      {activeWorkflow ? (
        <div className="space-y-6">
          
          {/* Overview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target Device</span>
              <h2 className="text-base font-bold text-slate-900">{activeWorkflow.deviceName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Estimated Completion: {activeWorkflow.targetCompletionDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Current Phase:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl text-xs font-bold border border-blue-200">
                {activeWorkflow.currentStage}
              </span>
            </div>
          </div>

          {/* 10-Stage Visual Progression Line */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              10-Stage Clinical Manufacturing Pipeline
            </h3>

            <div className="space-y-3">
              {activeWorkflow.stages.map((st, idx) => {
                const isCompleted = st.status === 'Completed';
                const isInProgress = st.status === 'In Progress';
                return (
                  <div
                    key={st.stageName}
                    className={`p-4 rounded-xl border transition-all ${
                      isInProgress
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20'
                        : isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-slate-50/50 border-slate-200/80 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isInProgress
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <span className={`font-bold ${isInProgress ? 'text-blue-900' : 'text-slate-900'}`}>
                            {st.stageName}
                          </span>
                          {st.technician && (
                            <span className="text-[10px] text-slate-400 block">Assigned Tech: {st.technician}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {st.status}
                        </span>
                        {st.completedAt && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">Done: {st.completedAt}</span>
                        )}
                      </div>
                    </div>

                    {st.notes && (
                      <p className="text-[11px] text-slate-600 mt-2 pl-10 border-l-2 border-slate-300">
                        {st.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
          No active fabrication workflow for this patient.
        </div>
      )}

    </div>
  );
};
