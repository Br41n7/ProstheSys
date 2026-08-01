import React, { useState } from 'react';
import { Patient } from '../../types';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Send, Sparkles } from 'lucide-react';

interface TelehealthViewProps {
  patient: Patient;
}

export const TelehealthView: React.FC<TelehealthViewProps> = ({ patient }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Patient', text: 'Hello Dr. Marcus, I felt a slight red mark over my distal tibia after today 3km walk.', time: '10:02 AM' },
    { sender: 'Clinician', text: 'Hi! Let us inspect the residual limb skin live under camera and check sock thickness.', time: '10:03 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage) return;
    setChatMessages(prev => [...prev, { sender: 'Clinician', text: newMessage, time: '10:05 AM' }]);
    setNewMessage('');
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl border border-purple-900/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold">Encrypted Telehealth Consultation Suite</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            HIPAA-Compliant Remote Socket Inspection & Gait Review with <span className="font-semibold text-white">{patient.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Video Screen */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
            {videoOn ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={patient.photo}
                  alt={patient.name}
                  className="w-full h-full object-cover rounded-xl opacity-90"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live HD • 1080p WebRTC</span>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-xs font-semibold">Video Feed Off</div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border border-slate-700/80 p-2.5 rounded-2xl flex items-center gap-3">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-xl transition-all ${micOn ? 'bg-slate-800 text-white' : 'bg-rose-600 text-white'}`}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-xl transition-all ${videoOn ? 'bg-slate-800 text-white' : 'bg-rose-600 text-white'}`}
              >
                {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
              <button className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow">
                <PhoneOff className="w-4 h-4" /> End Call
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat & Telehealth Notes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" /> In-Call Consultation Chat
            </h3>

            <div className="space-y-3 mt-3 max-h-[320px] overflow-y-auto pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl ${
                    msg.sender === 'Clinician'
                      ? 'bg-blue-50 text-blue-900 ml-6 border border-blue-100'
                      : 'bg-slate-50 text-slate-900 mr-6 border border-slate-200'
                  }`}
                >
                  <div className="flex justify-between text-[10px] font-bold opacity-60 mb-1">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-100">
            <input
              type="text"
              placeholder="Type message to patient..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
            <button type="submit" className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
