# QR Health Passport

> **Tagline:** One Scan. Complete Medical History. Better Healthcare.  
> **Domain:** HealthTech | **Hackathon:** HackSprint 3.0 (24-Hour Hackathon)

---

## 1. Problem Statement
Patients' critical medical records (MRI/CT reports, lab results, prescriptions, surgery and discharge summaries) are scattered across multiple clinics, paper binders, and disjointed devices. In urgent and routine medical consultations, patients struggle to present their consolidated health history.

## 2. Solution Overview
A patient-controlled digital medical history platform where patients organize their clinical records, track health metrics, and grant **secure, temporary, consent-based QR access** to healthcare providers.

---

## 3. Mandatory HealthTech Requirements Matrix

| Hackathon Requirement | Implementation in QR Health Passport | Status |
|---|---|---|
| **Problem & Target Users** | Solves records fragmentation for Patients, Doctors, and Hospital staff. Clear landing page. | Completed (Phases 1-2) |
| **Mobile & Accessibility** | Responsive touch-friendly UI (44px min targets) & high contrast design system. | Completed (Phase 2) |
| **Local Language Support** | Full English & Kannada (**ಕನ್ನಡ**) localization across all 68 terms and labels. | Completed (Phase 2) |
| **Data & Privacy Guardrails** | Zero raw data in QR code. Patient consent approval & instant revocation. | Completed (Phase 1) |
| **Track Progress & Timeline** | Smart chronological timeline, follow-up reminders & old-vs-latest comparison. | Completed (Phase 1) |
| **Safe & Responsible AI/Tech** | Analytical comparison only. Strictly no automated diagnosis or treatment prescribing. | Guardrailed |

---

## 4. Phase-Wise Status

### Phase 1: Backend Foundation & Data Models (Completed)
- [x] Node.js & Express REST API server
- [x] Fictional patient profiles with ABHA-mock identifiers and allergy tracking
- [x] Categorized medical records (MRI/CT, Lab Reports, Prescriptions, Discharge Summaries)
- [x] Smart Medical Timeline data structuring
- [x] Missing record warning engine (e.g. overdue annual renal evaluation)
- [x] Follow-up reminder scheduler
- [x] Temporary QR access token lifecycle (generate -> validate -> request -> approve -> view -> revoke)
- [x] Previous-vs-Latest report comparison engine (HbA1c & Fasting Glucose tracking)
- [x] 21/21 automated unit & privacy verification tests passing

### Phase 2: Frontend Scaffold, Styling & Bilingual Support (Completed)
- [x] Lightweight React 18 + Vite setup with backend API proxy
- [x] Mobile-first, accessible CSS design system with touch-friendly elements
- [x] 100% Bilingual localization (**English & Kannada - ಕನ್ನಡ**) across all 81 clinical and navigation keys
- [x] One-tap language switcher with localStorage persistence
- [x] Seamless Patient (*Ramesh Kumar*) vs. Doctor (*Dr. Ananya Rao*) demo identity switcher
- [x] Interactive Landing Page highlighting the healthcare challenge, solution, and personas
- [x] Frontend API client service connecting directly to backend endpoints
- [x] Clean production build verified with 7/7 localization tests passing

### Phase 3: Patient Portal & Smart Medical Timeline (Completed)
- [x] Patient profile card with ABHA-mock ID, blood group, allergies safety strip, and emergency contact
- [x] Medical record cards with categorized badges (MRI/CT, Lab Report, Prescription, Discharge Summary)
- [x] Clinical parameter tables with normal ranges and status highlighting
- [x] Real-time category filtering (All, MRI/CT, Lab Reports, Prescriptions, Discharge Summaries)
- [x] Search bar searching by document title, doctor, clinic, or summary
- [x] Upload modal with file validation (PDF, PNG, JPG; $\le 10\text{MB}$) & instant timeline integration
- [x] Smart Medical Timeline with chronological vertical event milestones
- [x] Follow-ups & Medicine scheduler with interactive add form
- [x] Preventive Care & Missing Record alerts (Kidney function check, post-op ultrasound)
- [x] Real-time doctor consent approval/rejection banner directly on patient dashboard

---

## 5. How to Run the Full Application

### Step 1: Start Backend
```bash
cd backend
npm start
```
*Backend runs on:* `http://localhost:5000`

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```
*Frontend runs on:* `http://localhost:5173`

