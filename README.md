# QR Health Passport

> **Tagline:** One Scan. Complete Medical History. Better Healthcare.  
> **Domain:** HealthTech | **Hackathon:** HackSprint 3.0 (24-Hour Hackathon)

---

## Problem Statement
Patients' critical medical records (MRI/CT reports, lab results, prescriptions, surgery and discharge summaries) are scattered across multiple clinics, paper binders, and disjointed devices. In urgent and routine medical consultations, patients struggle to present their consolidated health history.

## Solution Overview
A patient-controlled digital medical history platform where patients organize their clinical records, track health metrics, and grant **secure, temporary, consent-based QR access** to healthcare providers.

---

## Core Privacy & Security Guardrails
- **No Raw Data in QR Codes:** QR codes carry only a short-lived opaque access token (`QHP-XXXX-...`).
- **Patient Consent Gate:** Scanning a QR code submits an access request; medical records are only visible after patient approval.
- **Granular Permissions:** Patients can authorize all records or restrict access to specific categories (e.g., Lab Reports only).
- **Instant Revocation:** Patients can revoke doctor access at any time with a single tap.
- **100% Dummy Clinical Data:** All patient and doctor records are strictly fictional for demonstration.
- **No AI Diagnosis / Prescription:** System provides analytical comparison only, with clear disclaimers.

---

## Phase 1 Status: Backend Foundation & Data Models (Completed)
- [x] Node.js & Express REST API server
- [x] Fictional patient profiles with ABHA-mock identifiers and allergy tracking
- [x] Categorized medical records (MRI/CT, Lab Reports, Prescriptions, Discharge Summaries)
- [x] Smart Medical Timeline data structuring
- [x] Missing record warning engine (e.g. overdue annual renal evaluation)
- [x] Follow-up reminder scheduler
- [x] Temporary QR access token lifecycle (generate -> validate -> request -> approve -> view -> revoke)
- [x] Previous-vs-Latest report comparison engine (HbA1c & Fasting Glucose tracking)
- [x] 21/21 automated unit & privacy verification tests passing

---

## Project Structure
```text
qr-health-passport/
├── backend/
│   ├── src/
│   │   ├── data/seedData.js       # Dummy clinical dataset
│   │   ├── store/dataStore.js     # Data store & access control logic
│   │   └── routes/
│   │       ├── authRoutes.js      # Demo login & user switching
│   │       ├── patientRoutes.js   # Records, timeline, alerts, follow-ups
│   │       ├── accessRoutes.js    # QR token generation & consent approval
│   │       └── doctorRoutes.js    # Authorized doctor view & comparisons
│   ├── server.js                  # Express application entry
│   ├── test-api.js                # Automated verification test suite
│   └── package.json
├── frontend/                      # Phase 2 (React + Vite + Bilingual Support)
└── README.md
```

---

## How to Run Backend

```bash
cd backend
npm install
npm start
```

- API Health Check: `http://localhost:5000/api/health`
- Demo Users: `http://localhost:5000/api/auth/demo-users`
- Run Automated Tests: `node test-api.js`

