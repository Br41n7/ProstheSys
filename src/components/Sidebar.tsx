import React from 'react';
import { UserRole, Patient } from '../types';
import {
  LayoutDashboard,
  Users,
  Ruler,
  FileText,
  Sparkles,
  Footprints,
  FileSignature,
  Hammer,
  Activity,
  Image,
  Package,
  CreditCard,
  Calendar,
  Video,
  BarChart3,
  Database,
  ShieldCheck,
  X
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'patients'
  | 'assessment'
  | 'soap'
  | 'ai-assistant'
  | 'gait-analysis'
  | 'gait'
  | 'prescriptions'
  | 'fabrication'
  | 'rehabilitation'
  | 'rehab'
  | 'gallery'
  | 'inventory'
  | 'billing'
  | 'appointments'
  | 'telehealth'
  | 'reports'
  | 'database';

import { ROLE_PERMISSIONS } from '../types/auth';

interface SidebarProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  setActiveTab?: (tab: string) => void;
  userRole?: UserRole;
  selectedPatient?: Patient | null;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const PRIMARY_MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patient Records', icon: Users },
  { id: 'assessment', label: 'Limb Assessment', icon: Ruler },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileSignature },
  { id: 'fabrication', label: 'Fabrication Log', icon: Hammer },
  { id: 'rehab', label: 'Rehab & Outcomes', icon: Activity },
  { id: 'gallery', label: 'Clinical Image Vault', icon: Image },
  { id: 'inventory', label: 'Inventory Management', icon: Package },
  { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
  { id: 'appointments', label: 'Calendar & Schedule', icon: Calendar },
  { id: 'telehealth', label: 'Telehealth Portal', icon: Video },
  { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'database', label: 'SQL Schema & Cloud', icon: Database, badge: 'SQL' }
];

const AI_TOOL_ITEMS = [
  { id: 'ai-assistant', label: 'Device Recommender', icon: Sparkles, badge: 'AI' },
  { id: 'soap', label: 'SOAP Generator', icon: FileText, badge: 'AI' },
  { id: 'gait', label: 'Gait Deviation Analyzer', icon: Footprints, badge: 'AI' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  setActiveTab,
  userRole = 'Prosthetist',
  selectedPatient,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const allowedTabs = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.Prosthetist;

  const filteredPrimaryItems = PRIMARY_MENU_ITEMS.filter(item => allowedTabs.includes(item.id));
  const filteredAiItems = AI_TOOL_ITEMS.filter(item => allowedTabs.includes(item.id));

  const handleSelectTab = (id: string) => {
    if (onTabChange) onTabChange(id);
    else if (setActiveTab) setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-white flex flex-col shrink-0 border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:min-h-[calc(100vh-64px)] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                ProstheSys <span className="text-blue-400 font-medium">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Clinical Suite</p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Clinical Operations
        </p>

        {filteredPrimaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Tools Section */}
        {filteredAiItems.length > 0 && (
          <div className="pt-4 mt-4 border-t border-slate-800">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              AI Assistant Tools
            </p>
            {filteredAiItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'gait' && activeTab === 'gait-analysis');
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Patient Indicator if selected */}
        {selectedPatient && (
          <div className="mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Active Patient</p>
            <p className="text-xs font-semibold text-white truncate mt-0.5">{selectedPatient.fullName}</p>
            <p className="text-[10px] text-blue-400">{selectedPatient.mrn} • K{selectedPatient.kLevel}</p>
          </div>
        )}
      </nav>

      {/* Sidebar Footer User Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 border border-slate-600">
            MV
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-white truncate">Dr. Marcus Vance</span>
            <span className="text-[10px] text-slate-400 truncate">{userRole}</span>
          </div>
        </div>
      </div>
    </aside>
  </>
);
};

