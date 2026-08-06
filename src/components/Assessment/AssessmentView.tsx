import React, { useState } from 'react';
import { Patient, ResidualLimbAssessment } from '../../types';
import { Ruler, Activity, ShieldAlert, Heart, Check, Save, Sparkles } from 'lucide-react';

interface AssessmentViewProps {
  patient: Patient;
  assessments: ResidualLimbAssessment[];
  onSaveAssessment: (assessment: ResidualLimbAssessment) => void;
  onNavigateTab: (tab: any) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  patient,
  assessments,
  onSaveAssessment,
  onNavigateTab
}) => {
  const latestAssessment = assessments.find(a => a.patientId === patient.id) || assessments[0];

  const [skinIntegrity, setSkinIntegrity] = useState<any>(latestAssessment?.skinIntegrity || 'Scarring');
  const [vasPain, setVasPain] = useState<number>(latestAssessment?.painScoreVas || 2);
  const [phantomPain, setPhantomPain] = useState<any>(latestAssessment?.phantomPainSeverity || 'Mild');
  const [mmtStrength, setMmtStrength] = useState<number>(latestAssessment?.muscleStrengthMmt || 4);
  const [flexionRom, setFlexionRom] = useState<number>(latestAssessment?.romDegrees?.flexion || 120);
  const [extensionRom, setExtensionRom] = useState<number>(latestAssessment?.romDegrees?.extension || -5);
  const [balance, setBalance] = useState<any>(latestAssessment?.balanceScore || 'Good');
  const [limbShape, setLimbShape] = useState<any>(latestAssessment?.shape || 'Conical');
  const [limbLength, setLimbLength] = useState<number>(latestAssessment?.lengthCm || 15.5);
  const [boneLength, setBoneLength] = useState<number>(latestAssessment?.boneLengthCm || 14.0);
  const [notes, setNotes] = useState<string>(latestAssessment?.clinicalNotes || '');

  const [circumferences, setCircumferences] = useState(
    latestAssessment?.circumferencesCm || [
      { distanceAboveDistal: 4, circumference: 31 },
      { distanceAboveDistal: 8, circumference: 34 },
      { distanceAboveDistal: 12, circumference: 37 },
      { distanceAboveDistal: 16, circumference: 40 }
    ]
  );

  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleCircumferenceChange = (index: number, val: number) => {
    const updated = [...circumferences];
    updated[index].circumference = val;
    setCircumferences(updated);
  };

  const handleSave = () => {
    const newRecord: ResidualLimbAssessment = {
      id: `ass-${Date.now()}`,
      patientId: patient.id,
      assessmentDate: new Date().toISOString().split('T')[0],
      assessorName: 'Dr. Marcus Vance, CPO',
      skinIntegrity,
      painScoreVas: vasPain,
      phantomPainSeverity: phantomPain,
      muscleStrengthMmt: mmtStrength,
      romDegrees: { flexion: flexionRom, extension: extensionRom },
      balanceScore: balance,
      shape: limbShape,
      circumferencesCm: circumferences,
      lengthCm: limbLength,
      boneLengthCm: boneLength,
      clinicalNotes: notes
    };
    onSaveAssessment(newRecord);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Residual Limb & Biomechanical Assessment</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Patient: <span className="font-semibold text-white">{patient.name}</span> ({patient.amputationLevel}) • MRN: {patient.mrn}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('ai-assistant')}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Device Recommender
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Assessment
          </button>
        </div>
      </div>

      {isSavedAlert && (
        <div className="p-3 bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" /> Assessment saved to patient clinical record.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Assessment Metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Skin & Pain Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" /> Skin Integrity & Pain Scores
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skin Condition</label>
                <select
                  value={skinIntegrity}
                  onChange={(e) => setSkinIntegrity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Intact">Intact & Healthy</option>
                  <option value="Scarring">Scar Tissue Present</option>
                  <option value="Redness / Irritation">Redness / Irritation</option>
                  <option value="Skin Breakdown / Ulcer">Skin Breakdown / Ulcer</option>
                  <option value="Invaginated Scar">Invaginated Scar</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phantom Pain Severity</label>
                <select
                  value={phantomPain}
                  onChange={(e) => setPhantomPain(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="None">None</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>VAS Local Residual Limb Pain Score (0 - 10)</span>
                <span className={`px-2 py-0.5 rounded text-white font-bold ${vasPain > 4 ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                  {vasPain} / 10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={vasPain}
                onChange={(e) => setVasPain(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Biomechanical Metrics: MMT & ROM */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" /> Muscle Strength (MMT) & ROM
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quadriceps / Hip MMT (0-5)</label>
                <select
                  value={mmtStrength}
                  onChange={(e) => setMmtStrength(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value={5}>5/5 - Normal Strength</option>
                  <option value={4}>4/5 - Good Strength</option>
                  <option value={3}>3/5 - Fair (Against Gravity)</option>
                  <option value={2}>2/5 - Poor</option>
                  <option value={1}>1/5 - Trace</option>
                  <option value={0}>0/5 - Zero</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Knee / Hip Flexion (Degrees)</label>
                <input
                  type="number"
                  value={flexionRom}
                  onChange={(e) => setFlexionRom(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Extension Deficit (Degrees)</label>
                <input
                  type="number"
                  value={extensionRom}
                  onChange={(e) => setExtensionRom(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Balance & Functional Posture</label>
                <select
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Limb Shape Profile</label>
                <select
                  value={limbShape}
                  onChange={(e) => setLimbShape(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Conical">Conical (Optimal)</option>
                  <option value="Cylindrical">Cylindrical</option>
                  <option value="Bulbous">Bulbous</option>
                  <option value="Dog-eared">Dog-eared</option>
                </select>
              </div>
            </div>
          </div>

          {/* Limb Measurements Matrix */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Limb Circumference & Length Matrix (cm)</span>
              <span className="text-[10px] text-slate-400 font-normal">Taken every 4cm from distal end</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Total Limb Length (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={limbLength}
                  onChange={(e) => setLimbLength(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tibia / Femur Bone Length (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={boneLength}
                  onChange={(e) => setBoneLength(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full min-w-[400px] text-left">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-2.5">Distal Distance (cm)</th>
                    <th className="p-2.5">Circumference (cm)</th>
                    <th className="p-2.5">Target Socket Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {circumferences.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 text-slate-800 font-semibold">{c.distanceAboveDistal} cm above end</td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={c.circumference}
                          onChange={(e) => handleCircumferenceChange(idx, Number(e.target.value))}
                          className="w-24 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                        />
                      </td>
                      <td className="p-2.5 text-slate-500">{(c.circumference * 0.96).toFixed(1)} cm (4% reduction)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Visual Anatomy & Notes */}
        <div className="space-y-6">
          
          {/* Limb Diagram Card */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Anatomical Pressure Relief Map</h3>
            <div className="aspect-square bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-4 relative">
              <div className="w-20 h-36 border-2 border-dashed border-teal-400/60 rounded-b-full flex flex-col items-center justify-around text-[10px] text-teal-300">
                <span className="px-1.5 py-0.5 bg-blue-500/20 rounded">Patellar Tendon (Bearing)</span>
                <span className="px-1.5 py-0.5 bg-rose-500/30 text-rose-300 rounded">Fibular Head (Relief)</span>
                <span className="px-1.5 py-0.5 bg-rose-500/30 text-rose-300 rounded">Distal Tibia (Relief)</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 text-center">
                Visualized for {patient.amputationLevel} ({patient.affectedSide} Side)
              </p>
            </div>
          </div>

          {/* Clinical Assessment Notes */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Clinical Assessor Notes</h3>
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record detailed observations regarding scarring, invagination, tissue adipo-muscular density, and socket tolerance..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
