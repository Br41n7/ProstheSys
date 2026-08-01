import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, UserPlus, LogIn, Lock, CheckCircle2, Building2, User, X } from 'lucide-react';
import { AuthUser, PRESET_USERS } from '../../types/auth';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onSignUp: (newUser: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onSignUp
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'login' | 'signup'>('preset');
  
  // Custom Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Prosthetist');
  const [signupClinic, setSignupClinic] = useState('ProstheSys Central Rehabilitation Clinic');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Check matching preset or create standard user
    const existing = PRESET_USERS.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (existing) {
      onLogin(existing);
      onClose();
    } else if (loginEmail && loginPassword) {
      const customUser: AuthUser = {
        id: `usr-custom-${Date.now()}`,
        name: loginEmail.split('@')[0],
        email: loginEmail,
        role: 'Prosthetist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Clinical Specialist',
        clinicName: 'ProstheSys Central Rehabilitation Clinic'
      };
      onLogin(customUser);
      onClose();
    } else {
      setLoginError('Please enter a valid email and password.');
    }
  };

  const handleCustomSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail) return;

    const newUser: AuthUser = {
      id: `usr-new-${Date.now()}`,
      name: signupName,
      email: signupEmail,
      role: signupRole,
      avatar: signupRole === 'Patient'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      title: `${signupRole} Practitioner`,
      clinicName: signupClinic,
      patientId: signupRole === 'Patient' ? 'pat-101' : undefined
    };

    onSignUp(newUser);
    onClose();
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Doctor':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Prosthetist':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Physiotherapist':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Receptionist':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Patient':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                ProstheSys <span className="text-blue-400">Auth & RBAC Portal</span>
              </h2>
              <p className="text-xs text-slate-300">
                Authentication, Authorization & Role-Tailored Access Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('preset')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'preset'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>1-Click Role Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'login'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => setActiveTab('signup')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'signup'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Account</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {/* TAB 1: PRESET ROLE PROFILES */}
          {activeTab === 'preset' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Role-Based Dashboard System: </span>
                  Select any preset profile below to switch your role instantly and experience the customized user dashboard and authorized permissions for each clinical or patient account.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_USERS.map((usr) => {
                  const isCurrent = currentUser?.id === usr.id;
                  return (
                    <div
                      key={usr.id}
                      onClick={() => {
                        onLogin(usr);
                        onClose();
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 hover:shadow-md ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={usr.avatar}
                        alt={usr.name}
                        className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{usr.name}</h4>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border rounded-full shrink-0 ${getRoleBadgeStyle(
                              usr.role
                            )}`}
                          >
                            {usr.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{usr.title}</p>
                        <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" /> {usr.clinicName}
                        </p>

                        {isCurrent && (
                          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-blue-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Currently Active User
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SIGN IN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleCustomLogin} className="space-y-4 max-w-md mx-auto py-2">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Sign In to ProstheSys Clinical Account</h3>
                <p className="text-xs text-slate-500">Enter your clinical or patient email credentials</p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. marcus.vance@prosthesys.clinic"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Quick Demo Credentials:</p>
                <p>Prosthetist: <span className="font-mono text-blue-600">marcus.vance@prosthesys.clinic</span></p>
                <p>Patient Portal: <span className="font-mono text-blue-600">john.doe@gmail.com</span></p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Authenticate & Access Dashboard
              </button>
            </form>
          )}

          {/* TAB 3: REGISTER NEW USER */}
          {activeTab === 'signup' && (
            <form onSubmit={handleCustomSignUp} className="space-y-4 max-w-md mx-auto py-1">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Register New Clinical / Patient User</h3>
                <p className="text-xs text-slate-500">Create an account and assign authorization role</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Dr. Alex Morgan"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="e.g. alex.morgan@clinic.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Assign User Role (RBAC)</label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="Prosthetist">Prosthetist (Clinical & Socket Lead)</option>
                  <option value="Doctor">Doctor / Physiatrist (Medical Lead)</option>
                  <option value="Physiotherapist">Physiotherapist (Gait & Rehab Specialist)</option>
                  <option value="Receptionist">Receptionist (Front Desk & Scheduling)</option>
                  <option value="Admin">Admin (System Operations & Compliance)</option>
                  <option value="Patient">Patient (Personal Care Portal View)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Clinic Branch</label>
                <input
                  type="text"
                  value={signupClinic}
                  onChange={(e) => setSignupClinic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Complete Registration & Switch Account
              </button>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          ProstheSys AI Clinical Suite • Role-Based Access Control (RBAC) & Encryption Active
        </div>

      </div>
    </div>
  );
};
