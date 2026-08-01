import React, { useState } from 'react';
import { Patient, DevicePrescription } from '../../types';
import { FileSignature, Plus, Printer, CheckCircle2, Hammer, X } from 'lucide-react';

interface PrescriptionsViewProps {
  patient: Patient;
  prescriptions: DevicePrescription[];
  onCreatePrescription: (rx: DevicePrescription) => void;
  onNavigateTab: (tab: any) => void;
}

export const PrescriptionsView: React.FC<PrescriptionsViewProps> = ({
  patient,
  prescriptions,
  onCreatePrescription,
  onNavigateTab
}) => {
  const [showModal, setShowModal] = useState(false);

  const [deviceType, setDeviceType] = useState<'Prosthesis' | 'Orthosis' | 'Repair Request' | 'Replacement Request'>('Prosthesis');
  const [deviceName, setDeviceName] = useState('Definitive Transtibial Prosthesis');
  const [socketType, setSocketType] = useState('Total Surface Bearing (TSB)');
  const [suspension, setSuspension] = useState('Elevated Vacuum Suspension');
  const [footOrJoint, setFootOrJoint] = useState('Energy Storing Carbon Fiber Foot');
  const [kneeModule, setKneeModule] = useState('');
  const [linerType, setLinerType] = useState('6mm Silicone Gel Liner');
  const [material, setMaterial] = useState('Prepreg Carbon Fiber / Acrylic');
  const [specialInstructions, setSpecialInstructions] = useState('Provide 3mm fibular head relief');

  const patientRxs = prescriptions.filter(r => r.patientId === patient.id);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRx: DevicePrescription = {
      id: `rx-${Date.now()}`,
      patientId: patient.id,
      prescriptionDate: new Date().toISOString().split('T')[0],
      prescribingClinician: 'Dr. Marcus Vance, CPO',
      type: deviceType,
      deviceName,
      socketType,
      suspensionSystem: suspension,
      componentFootOrJoint: footOrJoint,
      kneeModule: kneeModule || undefined,
      linerType,
      material,
      specialInstructions,
      status: 'Prescribed',
      estimatedDeliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onCreatePrescription(newRx);
    setShowModal(false);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Device Prescription Generator</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Official P&O prescriptions & fabrication orders for <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Device Prescription
          </button>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {patientRxs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            No active prescriptions for this patient. Click "Create Device Prescription" to start.
          </div>
        ) : (
          patientRxs.map((rx) => (
            <div key={rx.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900">{rx.deviceName}</h2>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-md">
                      {rx.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Prescribed on {rx.prescriptionDate} by {rx.prescribingClinician}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                    Status: {rx.status}
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Rx
                  </button>
                  <button
                    onClick={() => onNavigateTab('fabrication')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Hammer className="w-3.5 h-3.5" /> Track Fabrication
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold block">Socket Design</span>
                  <span className="font-semibold text-slate-900">{rx.socketType}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold block">Suspension System</span>
                  <span className="font-semibold text-slate-900">{rx.suspensionSystem}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold block">Foot / Ankle Unit</span>
                  <span className="font-semibold text-slate-900">{rx.componentFootOrJoint}</span>
                </div>
              </div>

              {rx.specialInstructions && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <span className="font-bold">Special Technician Instructions:</span> {rx.specialInstructions}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal for New Prescription */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">New Device Prescription Order</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Prescription Type</label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Prosthesis">New Prosthesis</option>
                    <option value="Orthosis">New Orthosis (AFO/KAFO)</option>
                    <option value="Repair Request">Repair Request</option>
                    <option value="Replacement Request">Replacement Request</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Device Name / Model</label>
                  <input
                    type="text"
                    required
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Socket Type</label>
                  <input
                    type="text"
                    value={socketType}
                    onChange={(e) => setSocketType(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Suspension System</label>
                  <input
                    type="text"
                    value={suspension}
                    onChange={(e) => setSuspension(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Foot / Ankle / Joint</label>
                  <input
                    type="text"
                    value={footOrJoint}
                    onChange={(e) => setFootOrJoint(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Liner Type</label>
                  <input
                    type="text"
                    value={linerType}
                    onChange={(e) => setLinerType(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Lamination / Alignment Notes</label>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow"
                >
                  Generate Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
