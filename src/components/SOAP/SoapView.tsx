import React, { useState } from 'react';
import { Patient, SoapNote } from '../../types';
import { generateAiSoapNote } from '../../services/aiService';
import {
  FileText,
  Mic,
  MicOff,
  Sparkles,
  Save,
  Printer,
  History,
  CheckCircle2,
  Copy,
  Loader2
} from 'lucide-react';

interface SoapViewProps {
  patient: Patient;
  soapNotes: SoapNote[];
  onSaveSoapNote: (note: SoapNote) => void;
}

export const SoapView: React.FC<SoapViewProps> = ({
  patient,
  soapNotes,
  onSaveSoapNote
}) => {
  const [dictation, setDictation] = useState(
    'Patient presented for check-socket evaluation. Reports mild pressure over the lateral fibular head during mid-stance. Overall wearing schedule is 5 hours daily. Observed 3mm pistoning during swing phase. Quadriceps strength 4/5. Recommended 2mm fibular relief and seal-in vacuum liner.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const patientSoapHistory = soapNotes.filter(n => n.patientId === patient.id);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate live dictation input
      setTimeout(() => {
        setDictation(prev => prev + ' Patient expresses strong desire to return to golf and long neighborhood walks.');
        setIsRecording(false);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleGenerateSoap = async () => {
    setLoading(true);
    try {
      const result = await generateAiSoapNote(dictation, patient);
      setSubjective(result.subjective);
      setObjective(result.objective);
      setAssessment(result.assessment);
      setPlan(result.plan);
      setIsGenerated(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!subjective && !objective) return;
    const newNote: SoapNote = {
      id: `soap-${Date.now()}`,
      patientId: patient.id,
      date: new Date().toISOString().split('T')[0],
      authorName: 'Dr. Marcus Vance, CPO',
      authorRole: 'Prosthetist',
      subjective,
      objective,
      assessment,
      plan,
      isAiGenerated: true
    };
    onSaveSoapNote(newNote);
    alert('SOAP Note saved to patient clinical record!');
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">AI SOAP Documentation Generator</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Converts clinician speech & dictation into structured, editable clinical notes for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Note
          </button>
          <button
            onClick={handleSave}
            disabled={!subjective}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save SOAP Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Dictation & Speech Input */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Mic className="w-4 h-4 text-rose-600" /> Speech Dictation Input
              </h3>
              <button
                onClick={toggleRecording}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                {isRecording ? 'Listening...' : 'Dictate Speech'}
              </button>
            </div>

            <textarea
              rows={8}
              value={dictation}
              onChange={(e) => setDictation(e.target.value)}
              placeholder="Speak or type clinician observation details..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleGenerateSoap}
              disabled={loading || !dictation}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Processing via Gemini AI...' : 'Convert Speech to Structured SOAP'}
            </button>
          </div>

          {/* Past SOAP Notes History */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-slate-600" /> SOAP Note History ({patientSoapHistory.length})
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {patientSoapHistory.map((note) => (
                <div
                  key={note.id}
                  onClick={() => {
                    setSubjective(note.subjective);
                    setObjective(note.objective);
                    setAssessment(note.assessment);
                    setPlan(note.plan);
                    setIsGenerated(true);
                  }}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{note.date}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                      {note.authorRole}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{note.subjective}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 2 Cols: Editable SOAP Output Sections */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Structured Clinical SOAP Document</h2>
                <p className="text-xs text-slate-500">Edit any section before finalizing entry</p>
              </div>
              {isGenerated && (
                <span className="px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-600" /> AI Formatted
                </span>
              )}
            </div>

            {/* Subjective */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                S - Subjective (Patient Report & Symptoms)
              </label>
              <textarea
                rows={3}
                value={subjective}
                onChange={(e) => setSubjective(e.target.value)}
                placeholder="Patient statements, pain levels, wearing duration..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Objective */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                O - Objective (Physical Findings & Gait Inspection)
              </label>
              <textarea
                rows={4}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Check socket fit observations, skin integrity, pistoning measurements, MMT strength..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Assessment */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                A - Assessment (Biomechanical & Prosthetic Diagnosis)
              </label>
              <textarea
                rows={3}
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                placeholder="Prosthetist clinical conclusions and socket volume analysis..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                P - Plan (Action Items, Fabrications & Next Visit)
              </label>
              <textarea
                rows={4}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="CAD sculpting modifications, resin lamination schedule, exercise regimen..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
