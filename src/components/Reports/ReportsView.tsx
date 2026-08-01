import React, { useState } from 'react';
import { Patient } from '../../types';
import { generateAiClinicalReport } from '../../services/aiService';
import { FileText, Sparkles, Printer, Download, Loader2 } from 'lucide-react';

interface ReportsViewProps {
  patient: Patient;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ patient }) => {
  const [reportType, setReportType] = useState<string>('Letter of Medical Necessity (L-Code Justification)');
  const [loading, setLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateAiClinicalReport(patient, reportType);
      setReportContent(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">AI Clinical Report & Medical Necessity Generator</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Automated L-code insurance authorization letters & progress summaries for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            disabled={!reportContent}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Formal Letter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Report Controls */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Report Selection</h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Document Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Letter of Medical Necessity (L-Code Justification)">Letter of Medical Necessity (L-Code)</option>
              <option value="Prosthetic Fitting Progress Summary">Prosthetic Fitting Progress Summary</option>
              <option value="Discharge & Outcome Measures Report">Discharge & Outcome Measures Report</option>
            </select>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 space-y-1">
            <p className="font-bold">Automated Data Synthesized:</p>
            <p className="text-[11px] text-blue-800">• Medicare K3 Activity Level</p>
            <p className="text-[11px] text-blue-800">• {patient.amputationLevel}</p>
            <p className="text-[11px] text-blue-800">• 6MWT distance & AMPPro Mobility</p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Synthesizing Medical Report...' : 'Generate Official Report via AI'}
          </button>
        </div>

        {/* Right 2 Cols: Formatted Report Output */}
        <div className="lg:col-span-2">
          {reportContent ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-800 font-mono space-y-4 whitespace-pre-wrap leading-relaxed animate-in fade-in border-t-4 border-t-blue-600">
              {reportContent}
            </div>
          ) : (
            <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Select report type and click "Generate Official Report via AI"
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
