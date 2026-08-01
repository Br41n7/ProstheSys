import React, { useState } from 'react';
import { Patient, GaitAnalysisReport } from '../../types';
import { processAiGaitAnalysis } from '../../services/aiService';
import { Footprints, Upload, Sparkles, Activity, CheckCircle2, AlertTriangle, Play, Loader2 } from 'lucide-react';

interface GaitAnalysisViewProps {
  patient: Patient;
  gaitReports: GaitAnalysisReport[];
  onSaveGaitReport: (report: GaitAnalysisReport) => void;
}

export const GaitAnalysisView: React.FC<GaitAnalysisViewProps> = ({
  patient,
  gaitReports,
  onSaveGaitReport
}) => {
  const [videoDescription, setVideoDescription] = useState(
    'Patient walking on level treadmill at 3.6 km/h wearing check socket. Sound side shows slight vaulting during right swing phase. Right socket displays approximately 3-4mm pistoning during swing-to-stance transition.'
  );
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<Partial<GaitAnalysisReport> | null>(
    gaitReports.find(r => r.patientId === patient.id) || null
  );

  const handleAnalyzeGait = async () => {
    setLoading(true);
    try {
      const res = await processAiGaitAnalysis(videoDescription, patient.amputationLevel);
      const fullReport: GaitAnalysisReport = {
        id: `gait-${Date.now()}`,
        patientId: patient.id,
        analysisDate: new Date().toISOString().split('T')[0],
        detectedDeviations: res.detectedDeviations as any || [],
        stanceTimeLeftVsRight: res.stanceTimeLeftVsRight || 'Left 54% / Right 46%',
        cadenceStepsPerMin: res.cadenceStepsPerMin || 94,
        gaitSymmetryIndex: res.gaitSymmetryIndex || 88,
        aiSummary: res.aiSummary || 'Patient exhibits good overall cadence with minor swing clearance deviation.'
      };
      setAnalysisResult(fullReport);
      onSaveGaitReport(fullReport);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-bold">AI Video & Kinematic Gait Analysis</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Detects Vaulting, Trendelenburg, Circumduction, Foot Drop & Pistoning for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Video Input / Sample Selector */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Gait Video & Observations</h3>

          <div className="aspect-video bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-4 text-slate-300 relative overflow-hidden group">
            <Play className="w-10 h-10 text-indigo-400 opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
            <span className="text-xs font-semibold mt-2">Gait_Capture_Treadmill_Trial.mp4</span>
            <span className="text-[10px] text-slate-400">1080p @ 60 FPS • 12 sec duration</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Upload New Gait Video</label>
            <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 text-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
              <span className="text-xs text-slate-600 block font-medium">Click to select walking video</span>
              <span className="text-[10px] text-slate-400">MP4, MOV up to 100MB</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Clinician Gait Notes / Text Description</label>
            <textarea
              rows={4}
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <button
            onClick={handleAnalyzeGait}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Analyzing Kinematic Frames...' : 'Run AI Gait Deviation Detection'}
          </button>
        </div>

        {/* Right 2 Cols: Kinematic Report & Deviation List */}
        <div className="lg:col-span-2 space-y-6">
          {analysisResult ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">AI Gait Diagnostic Summary</h2>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-bold">
                  Symmetry Score: {analysisResult.gaitSymmetryIndex}%
                </span>
              </div>

              {/* Kinematic Gauges */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Stance Ratio (L / R)</span>
                  <span className="text-xs font-bold text-slate-900">{analysisResult.stanceTimeLeftVsRight}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Cadence</span>
                  <span className="text-xs font-bold text-slate-900">{analysisResult.cadenceStepsPerMin} steps/min</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Symmetry Index</span>
                  <span className="text-xs font-bold text-emerald-600">{analysisResult.gaitSymmetryIndex}%</span>
                </div>
              </div>

              {/* Detected Deviations List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Detected Gait Deviations ({analysisResult.detectedDeviations?.length || 0})
                </h3>

                {analysisResult.detectedDeviations?.map((dev, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{dev.deviationName}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                          {dev.severity} Severity
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{dev.gaitPhase}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed"><span className="font-semibold text-slate-900">Biomechanical Fix:</span> {dev.causeAndFix}</p>
                  </div>
                ))}
              </div>

              {/* Overall AI Summary */}
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 text-xs">
                <h4 className="font-bold text-indigo-900 mb-1">Clinical Biomechanics Summary</h4>
                <p className="text-indigo-800 leading-relaxed">{analysisResult.aiSummary}</p>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Run AI Gait Analysis to detect kinematic deviations
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
