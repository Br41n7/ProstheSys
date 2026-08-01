import React, { useState } from 'react';
import { Patient, AmputationLevel, KActivityLevel } from '../../types';
import {
  Search,
  Plus,
  User,
  Activity,
  FileText,
  Upload,
  Calendar,
  Clock,
  ChevronRight,
  Shield,
  HeartPulse,
  Ruler,
  AlertTriangle,
  X,
  CheckCircle2,
  Paperclip
} from 'lucide-react';

interface PatientsViewProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient | null) => void;
  onAddPatient: (patient: Patient) => void;
  onNavigateTab: (tab: any) => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  onAddPatient,
  onNavigateTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newAge, setNewAge] = useState(45);
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newPhone, setNewPhone] = useState('');
  const [newOccupation, setNewOccupation] = useState('');
  const [newWeight, setNewWeight] = useState(70);
  const [newHeight, setNewHeight] = useState(170);
  const [newLevel, setNewLevel] = useState<AmputationLevel>('Transtibial (Below Knee)');
  const [newSide, setNewSide] = useState<'Left' | 'Right' | 'Bilateral'>('Right');
  const [newActivity, setNewActivity] = useState<KActivityLevel>('K3');
  const [newDiagnosis, setNewDiagnosis] = useState('');

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'ALL' || p.amputationLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Patient = {
      id: `pat-${Date.now()}`,
      mrn: `PS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newPatientName,
      age: newAge,
      gender: newGender,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      phone: newPhone || '+1 (555) 000-0000',
      email: `${newPatientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      occupation: newOccupation || 'Patient',
      weightKg: newWeight,
      heightCm: newHeight,
      dominantHand: 'Right',
      lifestyle: 'Active community ambulator',
      activityLevel: newActivity,
      amputationLevel: newLevel,
      affectedSide: newSide,
      primaryDiagnosis: newDiagnosis || 'Amputation / Deformity',
      medicalConditions: ['Type 2 Diabetes'],
      pastProstheses: [],
      pastOrthoses: [],
      primaryProsthetist: 'Dr. Marcus Vance, CPO',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Evaluation'
    };
    onAddPatient(created);
    onSelectPatient(created);
    setShowAddModal(false);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Patient Management Registry</h1>
          <p className="text-xs text-slate-500">Comprehensive P&O clinical records & amputation profiles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Register New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Patient Search & List Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient name, MRN, diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 focus:outline-none"
            >
              <option value="ALL">All Amputation / Device Levels</option>
              <option value="Transtibial (Below Knee)">Transtibial (BK)</option>
              <option value="Transfemoral (Above Knee)">Transfemoral (AK)</option>
              <option value="Orthotic Need (AFO/KAFO/Spinal)">Orthotic Need (AFO/KAFO)</option>
            </select>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPatient(p)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 truncate">{p.name}</span>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded-md shrink-0">
                          {p.activityLevel}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{p.mrn} • {p.amputationLevel}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          {p.status}
                        </span>
                        <span className="text-[10px] text-slate-400">{p.affectedSide} Side</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Patient Detail Profile Column */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              
              {/* Profile Top Banner */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPatient.photo}
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/40 shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{selectedPatient.name}</h2>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full">
                        {selectedPatient.activityLevel} Medicare Functional
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      MRN: <span className="font-mono text-teal-300">{selectedPatient.mrn}</span> • Reg Date: {selectedPatient.registrationDate}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedPatient.age} yrs • {selectedPatient.gender} • {selectedPatient.occupation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigateTab('soap')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> SOAP Note
                  </button>
                  <button
                    onClick={() => onNavigateTab('assessment')}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Limb Assessment
                  </button>
                </div>
              </div>

              {/* Patient Core Clinical Details Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Limb & Diagnosis Card */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" /> Amputation & Device Level
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <p><span className="font-semibold text-slate-900">Level:</span> {selectedPatient.amputationLevel}</p>
                      <p><span className="font-semibold text-slate-900">Affected Side:</span> {selectedPatient.affectedSide}</p>
                      <p><span className="font-semibold text-slate-900">Primary Diagnosis:</span> {selectedPatient.primaryDiagnosis}</p>
                      <p><span className="font-semibold text-slate-900">Dominant Hand:</span> {selectedPatient.dominantHand}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-rose-600" /> Medical Conditions & Comorbidities
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedPatient.medicalConditions.map((cond, i) => (
                        <span key={i} className="px-2.5 py-1 text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Physical Metrics & Past Devices */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-600" /> Physical Vitals & K-Level
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-white rounded-xl border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Weight</span>
                        <span className="font-bold text-slate-900 text-sm">{selectedPatient.weightKg} kg</span>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Height</span>
                        <span className="font-bold text-slate-900 text-sm">{selectedPatient.heightCm} cm</span>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">BMI</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {((selectedPatient.weightKg / ((selectedPatient.heightCm / 100) ** 2))).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2.5">
                      <span className="font-semibold text-slate-900">Lifestyle Notes:</span> {selectedPatient.lifestyle}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Past Prostheses & Orthoses History
                    </h3>
                    <div className="text-xs text-slate-700 space-y-1">
                      {selectedPatient.pastProstheses.length > 0 ? (
                        selectedPatient.pastProstheses.map((p, i) => (
                          <div key={i} className="p-1.5 bg-white rounded border border-slate-200 text-[11px]">
                            • {p}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 text-[11px]">No prior prostheses logged</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Patient Timeline & Document Vault */}
              <div className="p-6 bg-slate-50/50 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> Clinical Progression Timeline
                </h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
                  {['Registration & Eval', 'Casting & Scan', 'Check Socket Fit', 'Rehab & Gait Training', 'Discharge'].map((stage, idx) => (
                    <div key={stage} className="flex items-center gap-2 shrink-0">
                      <div className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 ${
                        idx <= 2
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-400 border-slate-200'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> {stage}
                      </div>
                      {idx < 4 && <ChevronRight className="w-4 h-4 text-slate-300" />}
                    </div>
                  ))}
                </div>

                {/* Document Upload Vault */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4 text-slate-600" /> Patient Document Vault (PDFs, X-Rays, Scans)
                    </span>
                    <button className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg text-slate-700 flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Upload File
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-800">X-Ray_Residual_Limb_Right.pdf</span>
                      <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">View</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-800">Informed_Consent_Socket_Trial.pdf</span>
                      <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">View</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Select a patient from the registry to view full clinical details
            </div>
          )}
        </div>

      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Register New P&O Patient
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Patient Name</label>
                  <input
                    type="text"
                    required
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    placeholder="e.g., Jonathan Hayes"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newHeight}
                    onChange={(e) => setNewHeight(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amputation / Orthotic Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as AmputationLevel)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Transtibial (Below Knee)">Transtibial (Below Knee)</option>
                    <option value="Transfemoral (Above Knee)">Transfemoral (Above Knee)</option>
                    <option value="Transradial (Below Elbow)">Transradial (Below Elbow)</option>
                    <option value="Transhumeral (Above Elbow)">Transhumeral (Above Elbow)</option>
                    <option value="Orthotic Need (AFO/KAFO/Spinal)">Orthotic Need (AFO/KAFO)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Medicare K-Activity Level</label>
                  <select
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value as KActivityLevel)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="K0">K0 - Non-ambulator</option>
                    <option value="K1">K1 - Household ambulator</option>
                    <option value="K2">K2 - Limited community ambulator</option>
                    <option value="K3">K3 - Community ambulator (varies cadence)</option>
                    <option value="K4">K4 - High impact / athlete</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Clinical Diagnosis</label>
                <input
                  type="text"
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  placeholder="e.g., PVD secondary to diabetes, traumatic blast..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Save Patient Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
