import React, { useEffect } from 'react';

interface SEOHeadProps {
  viewMode: 'landing' | 'app';
  activeTab: string;
  patientName?: string;
}

const TAB_TITLES: Record<string, { title: string; desc: string }> = {
  dashboard: {
    title: 'Clinical Workspace & Amputee Analytics | ProstheSys AI',
    desc: 'Real-time amputee clinical suite overview, key performance indicators, active fabrication alerts, and appointment schedules.'
  },
  patients: {
    title: 'Amputee Patient Records & EHR Management | ProstheSys AI',
    desc: 'Comprehensive patient management for amputees, limb measurement logs, K-level history, and medical records.'
  },
  assessment: {
    title: 'Residual Limb Evaluation & Circumferential Measurement | ProstheSys AI',
    desc: 'Detailed residual limb mapping, skin integrity evaluation, bony prominence markers, and limb volume tracking.'
  },
  soap: {
    title: 'AI SOAP Dictation & L-Code Generator | ProstheSys AI',
    desc: 'Instant voice-to-text SOAP note generator automatically structured for Medicare & private L-Code insurance billing.'
  },
  aiAssistant: {
    title: 'Gemini AI Prosthetic Device Component Matcher | ProstheSys AI',
    desc: 'Multimodal AI recommendation engine for matching prosthetic feet, knees, liners, and socket suspension systems.'
  },
  gaitAnalysis: {
    title: 'Vision Gait Telemetry & Deviation Tracking | ProstheSys AI',
    desc: 'Computer vision gait analysis detecting Trendelenburg, vaulting, and whip errors with 6-Minute Walk Test metrics.'
  },
  prescriptions: {
    title: 'Prosthetic Component Prescriptions & L-Code Orders | ProstheSys AI',
    desc: 'Digitized prescription management with built-in L-Code verification and component supplier catalogs.'
  },
  fabrication: {
    title: '3D Socket CAD Lamination & Fabrication Tracker | ProstheSys AI',
    desc: '6-stage 3D printing and carbon fiber socket fabrication workflow tracker with check-socket fitting milestones.'
  },
  rehabilitation: {
    title: 'Amputee Physical Therapy & AMPPro Mobility Scoring | ProstheSys AI',
    desc: 'Targeted rehabilitative exercise tracking, AMPPro scores, and prosthetic gait retraining logs.'
  },
  inventory: {
    title: 'O&P Component Inventory & Stock Management | ProstheSys AI',
    desc: 'Real-time inventory tracking for feet, microprocessor knees, titanium pylons, and gel liners.'
  },
  billing: {
    title: 'O&P Insurance Billing & Invoice Management | ProstheSys AI',
    desc: 'Automated HCPCS L-Code billing invoices, claim status tracking, and reimbursement management.'
  },
  telehealth: {
    title: 'HIPAA-Compliant Amputee Video Telehealth | ProstheSys AI',
    desc: 'Encrypted video consultations, remote socket pressure telemetry reviews, and direct patient messaging.'
  },
  gallery: {
    title: 'Clinical Photo Gallery & Limb Progress Scans | ProstheSys AI',
    desc: 'High-resolution residual limb photographic archives, scar healing monitoring, and 3D scan logs.'
  },
  appointments: {
    title: 'Amputee Clinical Schedule & Consultation Booking | ProstheSys AI',
    desc: 'Integrated appointment calendar for prosthetic cast sessions, check-socket fittings, and gait evaluations.'
  },
  reports: {
    title: 'Clinical Outcomes & O&P Analytics Reports | ProstheSys AI',
    desc: 'Exportable clinical reports, mobility outcome statistics, and branch performance metrics.'
  },
  database: {
    title: 'L-Code & Component Medical Database | ProstheSys AI',
    desc: 'Searchable medical database of prosthetic components, L-Code billing rules, and manufacturer catalogs.'
  }
};

export const SEOHead: React.FC<SEOHeadProps> = ({ viewMode, activeTab, patientName }) => {
  useEffect(() => {
    let title = 'ProstheSys AI | AI-Powered Prosthetics, Bionics & Gait Analytics Platform';
    let description = 'ProstheSys AI is the premiere clinical intelligence platform for Orthotics & Prosthetics (O&P). Streamline amputee evaluations, 3D socket CAD synthesis, Gemini component matching, vision gait analysis, and HIPAA-compliant telehealth.';

    if (viewMode === 'app') {
      const tabInfo = TAB_TITLES[activeTab];
      if (tabInfo) {
        title = patientName
          ? `${patientName} - ${tabInfo.title}`
          : tabInfo.title;
        description = tabInfo.desc;
      }
    }

    // Update document title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [viewMode, activeTab, patientName]);

  return null;
};
