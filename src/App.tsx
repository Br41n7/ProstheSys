import React, { useState } from 'react';
import {
  Patient,
  ResidualLimbAssessment,
  SoapNote,
  DevicePrescription,
  FabricationWorkflow,
  RehabilitationSession,
  InventoryItem,
  Invoice,
  GaitAnalysisReport,
  ClinicalImage,
  Appointment,
  UserRole,
  ClinicBranch,
  FabricationStageName,
  AiRecommendationResponse
} from './types';

import {
  mockPatients,
  mockAssessments,
  mockSoapNotes,
  mockPrescriptions,
  mockFabricationWorkflows,
  mockRehabSessions,
  mockInventory,
  mockInvoices,
  mockGaitReports,
  mockClinicalImages,
  mockAppointments,
  mockClinics
} from './data/mockData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { AuthUser, PRESET_USERS, ROLE_PERMISSIONS } from './types/auth';

import { DashboardView } from './components/Dashboard/DashboardView';
import { PatientsView } from './components/Patients/PatientsView';
import { AssessmentView } from './components/Assessment/AssessmentView';
import { SoapView } from './components/SOAP/SoapView';
import { AiAssistantView } from './components/AIAssistant/AiAssistantView';
import { GaitAnalysisView } from './components/GaitAnalysis/GaitAnalysisView';
import { PrescriptionsView } from './components/Prescriptions/PrescriptionsView';
import { FabricationView } from './components/Fabrication/FabricationView';
import { RehabilitationView } from './components/Rehabilitation/RehabilitationView';
import { InventoryView } from './components/Inventory/InventoryView';
import { BillingView } from './components/Billing/BillingView';
import { GalleryView } from './components/Gallery/GalleryView';
import { AppointmentsView } from './components/Appointments/AppointmentsView';
import { TelehealthView } from './components/Telehealth/TelehealthView';
import { ReportsView } from './components/Reports/ReportsView';
import { DatabaseView } from './components/Database/DatabaseView';

export function App() {
  // Navigation & Workspace State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedClinic, setSelectedClinic] = useState<ClinicBranch>(mockClinics[0]);

  // Auth & RBAC State
  const [authUser, setAuthUser] = useState<AuthUser>(() => {
    const saved = localStorage.getItem('prosthesys_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return PRESET_USERS[0]; // Default Dr. Marcus Vance, CPO
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Derived user role
  const userRole: UserRole = authUser.role;

  const handleUpdateAuthUser = (user: AuthUser) => {
    setAuthUser(user);
    localStorage.setItem('prosthesys_auth_user', JSON.stringify(user));
    // Check if new user role has permission for current activeTab
    const allowed = ROLE_PERMISSIONS[user.role] || ROLE_PERMISSIONS.Prosthetist;
    if (!allowed.includes(activeTab)) {
      setActiveTab('dashboard');
    }
  };

  const handleDirectRoleChange = (role: UserRole) => {
    const matchedPreset = PRESET_USERS.find(u => u.role === role) || {
      ...authUser,
      role
    };
    handleUpdateAuthUser(matchedPreset);
  };

  // Clinical Data State
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);

  const [assessments, setAssessments] = useState<ResidualLimbAssessment[]>(mockAssessments);
  const [soapNotes, setSoapNotes] = useState<SoapNote[]>(mockSoapNotes);
  const [prescriptions, setPrescriptions] = useState<DevicePrescription[]>(mockPrescriptions);
  const [workflows, setWorkflows] = useState<FabricationWorkflow[]>(mockFabricationWorkflows);
  const [rehabSessions, setRehabSessions] = useState<RehabilitationSession[]>(mockRehabSessions);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [gaitReports, setGaitReports] = useState<GaitAnalysisReport[]>(mockGaitReports);
  const [images, setImages] = useState<ClinicalImage[]>(mockClinicalImages);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  // Patient Handlers
  const handleAddPatient = (patient: Patient) => {
    setPatients(prev => [patient, ...prev]);
  };

  const handleSaveAssessment = (assessment: ResidualLimbAssessment) => {
    setAssessments(prev => [assessment, ...prev]);
  };

  const handleSaveSoapNote = (note: SoapNote) => {
    setSoapNotes(prev => [note, ...prev]);
  };

  const handleCreatePrescription = (rx: DevicePrescription) => {
    setPrescriptions(prev => [rx, ...prev]);
  };

  const handleCreatePrescriptionFromAi = (rec: AiRecommendationResponse) => {
    if (!selectedPatient) return;
    const newRx: DevicePrescription = {
      id: `rx-${Date.now()}`,
      patientId: selectedPatient.id,
      prescriptionDate: new Date().toISOString().split('T')[0],
      prescribingClinician: 'Dr. Marcus Vance, CPO',
      type: 'Prosthesis',
      deviceName: rec.recommendedSocket,
      socketType: rec.recommendedSocket,
      suspensionSystem: rec.recommendedSuspension,
      componentFootOrJoint: rec.recommendedFootCategory,
      kneeModule: rec.recommendedKneeType,
      linerType: '6mm Silicone Gel Liner',
      material: rec.recommendedOrthosisMaterial || 'Carbon Fiber Composite',
      specialInstructions: rec.alignmentSuggestions,
      status: 'Prescribed',
      estimatedDeliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    handleCreatePrescription(newRx);
    setActiveTab('prescriptions');
  };

  const handleUpdateWorkflowStage = (workflowId: string, stageName: FabricationStageName) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id !== workflowId) return w;
      const updatedStages = w.stages.map((st) => {
        if (st.stageName === stageName) {
          return { ...st, status: 'In Progress' as const };
        }
        if (w.stages.findIndex(s => s.stageName === st.stageName) < w.stages.findIndex(s => s.stageName === stageName)) {
          return { ...st, status: 'Completed' as const, completedAt: new Date().toISOString().split('T')[0] };
        }
        return st;
      });
      return {
        ...w,
        currentStage: stageName,
        stages: updatedStages
      };
    }));
  };

  const handleSaveRehabSession = (session: RehabilitationSession) => {
    setRehabSessions(prev => [session, ...prev]);
  };

  const handleRestockInventory = (id: string, qty: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, quantityInStock: item.quantityInStock + qty } : item));
  };

  const handleSaveGaitReport = (report: GaitAnalysisReport) => {
    setGaitReports(prev => [report, ...prev]);
  };

  const handleScheduleAppointment = (apt: Appointment) => {
    setAppointments(prev => [apt, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header
        authUser={authUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        userRole={userRole}
        onRoleChange={handleDirectRoleChange}
        selectedClinic={selectedClinic}
        clinics={mockClinics}
        onClinicChange={setSelectedClinic}
        patients={patients}
        activeTab={activeTab}
        onSelectPatient={(patient) => {
          setSelectedPatient(patient);
          setActiveTab('patients');
        }}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userRole={userRole}
          selectedPatient={selectedPatient}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {activeTab === 'dashboard' && (
            <DashboardView
              authUser={authUser}
              userRole={userRole}
              patients={patients}
              workflows={workflows}
              appointments={appointments}
              invoices={invoices}
              rehabSessions={rehabSessions}
              prescriptions={prescriptions}
              inventory={inventory}
              onNavigateTab={setActiveTab}
              onSelectPatient={(patientId) => {
                const p = patients.find(pat => pat.id === patientId);
                if (p) setSelectedPatient(p);
                setActiveTab('patients');
              }}
            />
          )}

          {activeTab === 'patients' && (
            <PatientsView
              patients={patients}
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
              onAddPatient={handleAddPatient}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'assessment' && selectedPatient && (
            <AssessmentView
              patient={selectedPatient}
              assessments={assessments}
              onSaveAssessment={handleSaveAssessment}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'soap' && selectedPatient && (
            <SoapView
              patient={selectedPatient}
              soapNotes={soapNotes}
              onSaveSoapNote={handleSaveSoapNote}
            />
          )}

          {activeTab === 'ai-assistant' && selectedPatient && (
            <AiAssistantView
              patient={selectedPatient}
              onCreatePrescriptionFromAi={handleCreatePrescriptionFromAi}
            />
          )}

          {activeTab === 'gait' && selectedPatient && (
            <GaitAnalysisView
              patient={selectedPatient}
              gaitReports={gaitReports}
              onSaveGaitReport={handleSaveGaitReport}
            />
          )}

          {activeTab === 'prescriptions' && selectedPatient && (
            <PrescriptionsView
              patient={selectedPatient}
              prescriptions={prescriptions}
              onCreatePrescription={handleCreatePrescription}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'fabrication' && selectedPatient && (
            <FabricationView
              patient={selectedPatient}
              workflows={workflows}
              onUpdateWorkflowStage={handleUpdateWorkflowStage}
            />
          )}

          {activeTab === 'rehab' && selectedPatient && (
            <RehabilitationView
              patient={selectedPatient}
              rehabSessions={rehabSessions}
              onSaveSession={handleSaveRehabSession}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView
              inventory={inventory}
              onRestockItem={handleRestockInventory}
              onAddItem={(item) => setInventory(prev => [item, ...prev])}
            />
          )}

          {activeTab === 'billing' && (
            <BillingView invoices={invoices} />
          )}

          {activeTab === 'gallery' && selectedPatient && (
            <GalleryView
              patient={selectedPatient}
              images={images}
              onUploadImage={(img) => setImages(prev => [img, ...prev])}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsView
              appointments={appointments}
              patients={patients}
              onScheduleAppointment={handleScheduleAppointment}
            />
          )}

          {activeTab === 'telehealth' && selectedPatient && (
            <TelehealthView patient={selectedPatient} />
          )}

          {activeTab === 'reports' && selectedPatient && (
            <ReportsView patient={selectedPatient} />
          )}

          {activeTab === 'database' && (
            <DatabaseView />
          )}
        </main>

      </div>

      {/* Auth & RBAC Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={authUser}
        onLogin={handleUpdateAuthUser}
        onSignUp={handleUpdateAuthUser}
      />

    </div>
  );
}
export default App;
