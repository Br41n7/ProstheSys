import React, { useState } from 'react';
import { Patient, AiRecommendationResponse, KActivityLevel, AmputationLevel } from '../../types';
import { generateAiRecommendation } from '../../services/aiService';
import { Sparkles, ShieldAlert, CheckCircle2, ArrowRight, Loader2, FileSignature, AlertCircle } from 'lucide-react';

interface AiAssistantViewProps {
  patient: Patient;
  onCreatePrescriptionFromAi: (recommendation: AiRecommendationResponse) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  patient,
  onCreatePrescriptionFromAi
}) => {
  const [age, setAge] = useState<number>(patient.age || 54);
  const [weightKg, setWeightKg] = useState<number>(patient.weightKg || 68);
  const [amputationLevel, setAmputationLevel] = useState<AmputationLevel>(patient.amputationLevel || 'Transtibial (Below Knee)');
  const [activityLevel, setActivityLevel] = useState<KActivityLevel>(patient.activityLevel || 'K3');
  const [occupation, setOccupation] = useState<string>(patient.occupation || 'High School Teacher');
  const [skinCondition, setSkinCondition] = useState<string>('Scarring with mild distal redness');
  const [budgetTier, setBudgetTier] = useState<'Economy' | 'Standard' | 'Premium / High-End'>('Standard');
  const [specialGoals, setSpecialGoals] = useState<string>('Desires low-fatigue outdoor hiking and long standing balance.');

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AiRecommendationResponse | null>(null);

  const handleRunAi = async () => {
    setLoading(true);
    try {
      const res = await generateAiRecommendation({
        age,
        weightKg,
        amputationLevel,
        activityLevel,
        occupation,
        skinCondition,
        budgetTier,
        specialGoals
      });
      setRecommendation(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl border border-teal-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
            <h1 className="text-lg font-bold">AI Clinical Device Recommendation Engine</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Biomechanical decision support system synthesizing patient K-level, skin tolerance & gait goals for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Patient Clinical Inputs
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Amputation / Orthotic Level</label>
              <select
                value={amputationLevel}
                onChange={(e) => setAmputationLevel(e.target.value as AmputationLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Transtibial (Below Knee)">Transtibial (BK)</option>
                <option value="Transfemoral (Above Knee)">Transfemoral (AK)</option>
                <option value="Transradial (Below Elbow)">Transradial (BR)</option>
                <option value="Transhumeral (Above Elbow)">Transhumeral (AR)</option>
                <option value="Orthotic Need (AFO/KAFO/Spinal)">Orthotic Need (AFO/KAFO)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Medicare K-Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as KActivityLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-blue-700"
              >
                <option value="K0">K0 - Non-ambulator</option>
                <option value="K1">K1 - Household ambulator</option>
                <option value="K2">K2 - Limited community ambulator</option>
                <option value="K3">K3 - Community ambulator (varies cadence)</option>
                <option value="K4">K4 - High impact athlete</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Skin & Scar Condition</label>
              <input
                type="text"
                value={skinCondition}
                onChange={(e) => setSkinCondition(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Budget / Insurance Level</label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Economy">Economy / Basic Coverage</option>
                <option value="Standard">Standard Commercial Insurance</option>
                <option value="Premium / High-End">Premium / High-End Microprocessor</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Special Goals</label>
              <textarea
                rows={3}
                value={specialGoals}
                onChange={(e) => setSpecialGoals(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={handleRunAi}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Synthesizing Biomechanical Model...' : 'Generate AI Prescription Options'}
          </button>
        </div>

        {/* Right 2 Cols: AI Recommendation Output */}
        <div className="lg:col-span-2 space-y-6">
          {recommendation ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Recommended Device Combination</h2>
                  <p className="text-xs text-slate-500">Confidence Rating: <span className="font-bold text-emerald-600">{recommendation.confidenceScore}%</span></p>
                </div>
                <button
                  onClick={() => onCreatePrescriptionFromAi(recommendation)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
                >
                  <FileSignature className="w-4 h-4" /> Convert to Prescription
                </button>
              </div>

              {/* Grid of Recommended Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Socket Technology</span>
                  <p className="font-bold text-slate-900 text-sm">{recommendation.recommendedSocket}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Suspension Mechanism</span>
                  <p className="font-bold text-slate-900 text-sm">{recommendation.recommendedSuspension}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Foot / Ankle Category</span>
                  <p className="font-bold text-slate-900 text-sm">{recommendation.recommendedFootCategory}</p>
                </div>

                {recommendation.recommendedKneeType && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Microprocessor Knee</span>
                    <p className="font-bold text-slate-900 text-sm">{recommendation.recommendedKneeType}</p>
                  </div>
                )}

              </div>

              {/* Alignment & Rationale */}
              <div className="space-y-4 text-xs">
                
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/60">
                  <h4 className="font-bold text-blue-900 mb-1">Bench & Dynamic Alignment Guidance</h4>
                  <p className="text-blue-800 leading-relaxed">{recommendation.alignmentSuggestions}</p>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60">
                  <h4 className="font-bold text-emerald-900 mb-1">Evidence-Based Clinical Rationale</h4>
                  <p className="text-emerald-800 leading-relaxed">{recommendation.clinicalRationale}</p>
                </div>

                {/* Contraindications Warnings */}
                {recommendation.contraindicationsWarnings?.length > 0 && (
                  <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200">
                    <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" /> Contraindications & Clinical Warnings
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-rose-800">
                      {recommendation.contraindicationsWarnings.map((warn, i) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-teal-500/50" />
              <p className="text-xs font-medium">Click "Generate AI Prescription Options" to process biomechanical parameters.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
