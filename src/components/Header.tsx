import React, { useState } from 'react';
import { UserRole, NotificationItem, ClinicBranch, Patient } from '../types';
import {
  Bell,
  Search,
  Sparkles,
  UserCheck,
  Building2,
  ChevronDown,
  X,
  Check,
  Menu
} from 'lucide-react';

import { AuthUser } from '../types/auth';

interface HeaderProps {
  authUser?: AuthUser;
  onOpenAuthModal?: () => void;
  userRole?: UserRole;
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  selectedClinic?: ClinicBranch | string;
  clinics?: ClinicBranch[];
  onClinicChange?: (clinic: ClinicBranch) => void;
  patients?: Patient[];
  onSelectPatient?: (patient: Patient) => void;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  onOpenAiDrawer?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  activeTab?: string;
  onToggleMobileMenu?: () => void;
}

const ALL_ROLES: UserRole[] = [
  'Admin',
  'Doctor',
  'Prosthetist',
  'Orthotist',
  'Physiotherapist',
  'Receptionist',
  'Patient'
];

export const Header: React.FC<HeaderProps> = ({
  authUser,
  onOpenAuthModal,
  userRole,
  currentRole,
  onRoleChange,
  selectedClinic,
  clinics = [],
  onClinicChange,
  patients = [],
  onSelectPatient,
  notifications = [],
  onMarkNotificationRead,
  onOpenAiDrawer,
  searchQuery = '',
  setSearchQuery,
  activeTab = 'dashboard',
  onToggleMobileMenu
}) => {
  const activeRole = currentRole || userRole || 'Prosthetist';
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const safeNotifications = notifications || [];
  const safePatients = patients || [];

  const unreadCount = safeNotifications.filter(n => !n.isRead).length;

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    if (setSearchQuery) setSearchQuery(val);
  };

  const selectedClinicName = typeof selectedClinic === 'string'
    ? selectedClinic
    : selectedClinic?.name || 'ProstheSys Central Rehabilitation Clinic';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm truncate">
          <span className="text-slate-500 font-medium hidden sm:inline">ProstheSys</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="font-semibold text-slate-900 capitalize truncate">
            {activeTab.replace('-', ' ')}
          </span>
        </div>

        {clinics && clinics.length > 0 && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={selectedClinicName}
              onChange={(e) => {
                const found = clinics.find(c => c.name === e.target.value);
                if (found && onClinicChange) onClinicChange(found);
              }}
              className="bg-transparent border-none text-slate-800 focus:outline-none cursor-pointer text-xs font-medium pr-1"
            >
              {clinics.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Search, AI Quick Launch, Notifications & Role */}
      <div className="flex items-center gap-4">
        
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search patient or device..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-100 border border-transparent focus:border-blue-500 rounded-lg text-xs w-56 lg:w-64 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder-slate-400 font-medium"
          />

          {/* Quick Search Dropdown Results if matching */}
          {localSearch.trim() !== '' && safePatients.length > 0 && (
            <div className="absolute top-11 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 max-h-60 overflow-y-auto">
              {safePatients
                .filter(p => {
                  const patName = p.name || (p as any).fullName || '';
                  const patMrn = p.mrn || '';
                  return patName.toLowerCase().includes(localSearch.toLowerCase()) || patMrn.toLowerCase().includes(localSearch.toLowerCase());
                })
                .map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onSelectPatient) onSelectPatient(p);
                      setLocalSearch('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-none"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{p.name || (p as any).fullName}</p>
                      <p className="text-[10px] text-slate-500">{p.mrn} • {p.amputationLevel || (p as any).amputationType}</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Select</span>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* AI Drawer Trigger */}
        {onOpenAiDrawer && (
          <button
            onClick={onOpenAiDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Assistant</span>
          </button>
        )}

        {/* Auth Profile & Role Switcher */}
        <div className="flex items-center gap-2">
          {authUser ? (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200/80 transition-all shadow-2xs"
              title="Click to switch account or manage authentication"
            >
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-bold text-slate-900 leading-tight max-w-[110px] truncate">{authUser.name}</p>
                <p className="text-[9px] text-blue-600 font-bold tracking-tight">{authUser.role}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign In / Switch User</span>
            </button>
          )}

          {/* Role Dropdown Fallback */}
          {onRoleChange && !authUser && (
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/70 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="max-w-[90px] truncate">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Switch User Role
                  </div>
                  {ALL_ROLES.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        activeRole === role ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{role}</span>
                      {activeRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            ) : null}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-blue-600" /> Clinical Notifications
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No active alerts</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead && onMarkNotificationRead(n.id)}
                      className={`p-3 cursor-pointer text-xs hover:bg-slate-50 transition-colors ${
                        n.isRead ? 'opacity-60' : 'bg-blue-50/20 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between text-slate-800">
                        <span className="font-semibold text-blue-700">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="h-9 w-9 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            MV
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 leading-tight">Dr. Sarah Miller</span>
            <span className="text-[10px] text-slate-500">{activeRole}</span>
          </div>
        </div>

      </div>

    </header>
  );
};

