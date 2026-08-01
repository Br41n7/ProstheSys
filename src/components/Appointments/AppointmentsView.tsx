import React, { useState } from 'react';
import { Appointment, Patient } from '../../types';
import { Calendar, Plus, Clock, User, CheckCircle2, MessageSquare, Send, X } from 'lucide-react';

interface AppointmentsViewProps {
  appointments: Appointment[];
  patients: Patient[];
  onScheduleAppointment: (apt: Appointment) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  patients,
  onScheduleAppointment
}) => {
  const [showModal, setShowModal] = useState(false);

  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [aptType, setAptType] = useState<Appointment['type']>('Check Socket Fit');
  const [dateTime, setDateTime] = useState('2026-08-05T10:00');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('Check socket weight bearing inspection');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatientId) || patients[0];
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: pat.id,
      patientName: pat.name,
      clinicianName: 'Dr. Marcus Vance, CPO',
      dateTime,
      durationMins: duration,
      type: aptType,
      status: 'Scheduled',
      notes,
      reminderSentStatus: 'Sent via WhatsApp'
    };
    onScheduleAppointment(newApt);
    setShowModal(false);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Clinical Calendar & Reminders</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Schedule fittings, rehab sessions & dispatch automated WhatsApp/SMS reminders
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Schedule Appointment
        </button>
      </div>

      {/* Appointment Schedule Cards */}
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold shrink-0">
                <span className="text-[10px] uppercase text-blue-500">{new Date(apt.dateTime).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-base">{new Date(apt.dateTime).getDate()}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{apt.patientName}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 rounded">
                    {apt.type}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">With {apt.clinicianName} • Duration: {apt.durationMins} mins</p>
                {apt.notes && <p className="text-slate-600 mt-1 text-[11px] italic">"{apt.notes}"</p>}
              </div>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <span className="text-sm font-bold text-slate-900 block">
                {new Date(apt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg inline-flex items-center gap-1">
                <Send className="w-3 h-3 text-emerald-600" /> {apt.reminderSentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 text-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Schedule Clinical Session</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.amputationLevel})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Session Type</label>
                  <select
                    value={aptType}
                    onChange={(e) => setAptType(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Initial Assessment">Initial Assessment</option>
                    <option value="Casting / Scan">Casting / Scan</option>
                    <option value="Check Socket Fit">Check Socket Fit</option>
                    <option value="Final Fitting">Final Fitting</option>
                    <option value="Rehab Session">Rehab Session</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow"
                >
                  Confirm & Dispatch Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
