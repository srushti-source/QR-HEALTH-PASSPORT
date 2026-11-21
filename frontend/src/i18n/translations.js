// Bilingual Translation Dictionary (English & Kannada - ಕನ್ನಡ)
// Aligned with HackSprint 3.0 Mandatory HealthTech Requirement

export const translations = {
  en: {
    // Branding & Tagline
    appTitle: "QR Health Passport",
    appTagline: "One Scan. Complete Medical History. Better Healthcare.",
    hackathonBadge: "HackSprint 3.0 • HealthTech",

    // Roles
    patient: "Patient",
    doctor: "Doctor",
    hospitalStaff: "Hospital Staff",
    roleSelector: "Switch Role / Demo User",

    // Navigation
    navHome: "Home",
    navPatientPortal: "Patient Records",
    navTimeline: "Medical Timeline",
    navQrAccess: "Share via QR",
    navDoctorPortal: "Doctor Portal",
    navFollowUps: "Follow-ups & Medicines",
    navAlerts: "Health Alerts",

    // Home / Hero Section
    heroTitle: "Your Complete Medical History, in One Secure Scan.",
    heroSubtitle: "Patients control their MRI/CT scans, prescriptions, and lab reports. Doctors get instant, consented access during emergency or routine consultations.",
    enterAsPatient: "Open Patient Passport",
    enterAsDoctor: "Open Doctor Scanner",
    demoNote: "100% Dummy Clinical Data • Zero Setup Demo Mode",

    // Problem & Solution Card
    problemTitle: "The Healthcare Challenge",
    problemDesc: "Medical records are scattered across different clinics, paper files, and phones. Patients struggle to recall past tests, and doctors lose crucial time in emergencies.",
    solutionTitle: "Our HealthTech Solution",
    solutionDesc: "A secure, patient-owned health vault. Records are categorized by date and type. Sharing is governed by temporary, revocable QR tokens with real-time patient consent.",

    // Key Features Badges
    feat1: "Smart Chronological Timeline",
    feat2: "Privacy-First Temporary QR Access",
    feat3: "Doctor Request & Patient Consent",
    feat4: "Old vs Latest Report Comparison",
    feat5: "Missing Clinical Record Alerts",
    feat6: "Kannada & English Localized",

    // Patient Dashboard & Profile
    patientProfile: "Patient Profile",
    abhaNumber: "ABHA Health ID (Mock)",
    bloodGroup: "Blood Group",
    allergies: "Known Allergies",
    chronicConditions: "Chronic Conditions",
    emergencyContact: "Emergency Contact",
    noAllergies: "No known drug allergies",

    // Categories
    allCategories: "All Records",
    catMriCt: "MRI / CT Scans",
    catLabReport: "Lab Reports",
    catPrescription: "Prescriptions",
    catDischargeSummary: "Discharge Summaries",

    // Actions
    uploadDocument: "Upload Record",
    generateQr: "Generate Access QR",
    scanQr: "Scan Patient QR",
    approve: "Approve Access",
    reject: "Reject",
    revoke: "Revoke Access Immediately",
    compareReports: "Compare Previous vs Latest",
    viewDetails: "View Details",
    refresh: "Refresh",
    selectFile: "Choose File (PDF, PNG, JPG)",

    // QR & Privacy Guardrails
    qrSecurityNotice: "Security Notice: This QR code contains only a temporary encrypted reference. It NEVER stores private medical data directly.",
    qrExpiresIn: "Access token expires in",
    minutes: "minutes",
    consentPending: "A doctor is requesting temporary access to your records.",
    consentApprovedMsg: "Access currently active. You may revoke it at any second.",

    // Timeline & Follow-ups
    medicalTimeline: "Smart Medical Journey",
    upcomingFollowUps: "Upcoming Follow-ups & Reminders",
    missingAlertsTitle: "Preventive Care & Missing Record Alerts",
    dueDate: "Due Date",
    prescribedMedicine: "Active Prescription",

    // Comparison Tool
    parameter: "Clinical Parameter",
    previousValue: "Previous Value",
    latestValue: "Latest Value",
    normalRange: "Normal Reference Range",
    status: "Clinical Trend",

    // Disclaimers
    safetyDisclaimer: "Mandatory Healthcare Disclaimer: QR Health Passport organizes medical records for authorized clinical review. It does NOT provide AI diagnosis or prescribe medical treatments.",
    dummyDataNotice: "Demo Mode: Operating with fictional patient profiles for HackSprint 3.0 evaluation."
  },

  kn: {
    // Branding & Tagline
    appTitle: "ಕ್ಯೂಆರ್ ಆರೋಗ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್",
    appTagline: "ಒಂದೇ ಸ್ಕ್ಯಾನ್. ಸಂಪೂರ್ಣ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ. ಉತ್ತಮ ಚಿಕಿತ್ಸೆ.",
    hackathonBadge: "ಹ್ಯಾಕ್‌ಸ್ಪ್ರಿಂಟ್ 3.0 • ಹೆಲ್ತ್‌ಟೆಕ್",

    // Roles
    patient: "ರೋಗಿ",
    doctor: "ವೈದ್ಯರು",
    hospitalStaff: "ಆಸ್ಪತ್ರೆ ಸಿಬ್ಬಂದಿ",
    roleSelector: "ಬಳಕೆದಾರರ ಪಾತ್ರ ಬದಲಿಸಿ",

    // Navigation
    navHome: "ಮುಖಪುಟ",
    navPatientPortal: "ರೋಗಿಯ ದಾಖಲೆಗಳು",
    navTimeline: "ವೈದ್ಯಕೀಯ ಟೈಮ್‌ಲೈನ್",
    navQrAccess: "ಕ್ಯೂಆರ್ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ",
    navDoctorPortal: "ವೈದ್ಯರ ಪೋರ್ಟಲ್",
    navFollowUps: "ಮುಂದಿನ ತಪಾಸಣೆ & ಔಷಧಿಗಳು",
    navAlerts: "ಆರೋಗ್ಯ ಎಚ್ಚರಿಕೆಗಳು",

    // Home / Hero Section
    heroTitle: "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಆರೋಗ್ಯ ಇತಿಹಾಸ, ಒಂದೇ ಸುರಕ್ಷಿತ ಸ್ಕ್ಯಾನ್‌ನಲ್ಲಿ.",
    heroSubtitle: "ರೋಗಿಗಳು ತಮ್ಮ ಎಂಆರ್‌ಐ, ರಕ್ತ ಪರೀಕ್ಷೆ ಹಾಗೂ ಔಷಧಿ ಚೀಟಿಗಳನ್ನು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸುತ್ತಾರೆ. ವೈದ್ಯರು ತುರ್ತು ಸಮಯದಲ್ಲಿ ರೋಗಿಯ ಅನುಮತಿಯೊಂದಿಗೆ ತಕ್ಷಣ ವೀಕ್ಷಿಸಬಹುದು.",
    enterAsPatient: "ರೋಗಿಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಪ್ರವೇಶಿಸಿ",
    enterAsDoctor: "ವೈದ್ಯರ ಸ್ಕ್ಯಾನರ್ ಪ್ರವೇಶಿಸಿ",
    demoNote: "100% ಮಾದರಿ ವೈದ್ಯಕೀಯ ಡೇಟಾ • ತ್ವರಿತ ಡೆಮೊ",

    // Problem & Solution Card
    problemTitle: "ಆರೋಗ್ಯ ಕ್ಷೇತ್ರದ ಸವಾಲು",
    problemDesc: "ವೈದ್ಯಕೀಯ ವರದಿಗಳು ಹಳೆಯ ಕಡತಗಳಲ್ಲಿ ಹಾಗೂ ಬೇರೆ ಬೇರೆ ಕ್ಲಿನಿಕ್‌ಗಳಲ್ಲಿ ಚದುರಿರುತ್ತವೆ. ರೋಗಿಗಳಿಗೆ ಹಳೆಯ ವಿವರ ನೀಡಲು ಕಷ್ಟವಾಗುತ್ತದೆ ಮತ್ತು ತುರ್ತು ಚಿಕಿತ್ಸೆಗೆ ವಿಳಂಬವಾಗುತ್ತದೆ.",
    solutionTitle: "ನಮ್ಮ ಹೆಲ್ತ್‌ಟೆಕ್ ಪರಿಹಾರ",
    solutionDesc: "ರೋಗಿಯ ಹಿಡಿತದಲ್ಲಿರುವ ಡಿಜಿಟಲ್ ಹೆಲ್ತ್ ವಾಲ್ಟ್. ದಾಖಲೆಗಳನ್ನು ದಿನಾಂಕ ಮತ್ತು ವಿಭಾಗದ ಪ್ರಕಾರ ವಿಂಗಡಿಸಲಾಗುತ್ತದೆ. ರೋಗಿಯ ನೇರ ಅನುಮತಿಯೊಂದಿಗೆ ಮಾತ್ರ ತಾತ್ಕಾಲಿಕ ಕ್ಯೂಆರ್ ಪ್ರವೇಶ ನೀಡಲಾಗುತ್ತದೆ.",

    // Key Features Badges
    feat1: "ಕಾಲಾನುಕ್ರಮದ ವೈದ್ಯಕೀಯ ಟೈಮ್‌ಲೈನ್",
    feat2: "ಗೌಪ್ಯತೆ-ಕೇಂದ್ರಿತ ತಾತ್ಕಾಲಿಕ ಕ್ಯೂಆರ್",
    feat3: "ವೈದ್ಯರ ಕೋರಿಕೆ & ರೋಗಿಯ ನೇರ ಅನುಮೋದನೆ",
    feat4: "ಹಳೆಯ ಮತ್ತು ಇತ್ತೀಚಿನ ವರದಿಗಳ ಹೋಲಿಕೆ",
    feat5: "ಬಾಕಿ ಉಳಿದ ತಪಾಸಣೆಗಳ ಎಚ್ಚರಿಕೆ",
    feat6: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷಾ ಬೆಂಬಲ",

    // Patient Dashboard & Profile
    patientProfile: "ರೋಗಿಯ ವೈಯಕ್ತಿಕ ವಿವರ",
    abhaNumber: "ಆಭಾ ಹೆಲ್ತ್ ಐಡಿ (ಮಾದರಿ)",
    bloodGroup: "ರಕ್ತದ ಗುಂಪು",
    allergies: "ಔಷಧಿ ಅಲರ್ಜಿಗಳು",
    chronicConditions: "ದೀರ್ಘಕಾಲದ ಕಾಯಿಲೆಗಳು",
    emergencyContact: "ತುರ್ತು ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ",
    noAllergies: "ಯಾವುದೇ ಔಷಧ ಅಲರ್ಜಿ ಇಲ್ಲ",

    // Categories
    allCategories: "ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
    catMriCt: "ಎಂಆರ್‌ಐ / ಸಿಟಿ ಸ್ಕ್ಯಾನ್",
    catLabReport: "ಲ್ಯಾಬ್ ರಕ್ತ ಪರೀಕ್ಷೆಗಳು",
    catPrescription: "ವೈದ್ಯರ ಔಷಧಿ ಚೀಟಿ",
    catDischargeSummary: "ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ",

    // Actions
    uploadDocument: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    generateQr: "ಕ್ಯೂಆರ್ ಕೋಡ್ ರಚಿಸಿ",
    scanQr: "ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    approve: "ಅನುಮೋದಿಸಿ",
    reject: "ತಿರಸ್ಕರಿಸಿ",
    revoke: "ಪ್ರವೇಶ ತಕ್ಷಣ ರದ್ದುಗೊಳಿಸಿ",
    compareReports: "ಹಳೆಯ vs ಇತ್ತೀಚಿನ ವರದಿ ಹೋಲಿಕೆ",
    viewDetails: "ವಿವರ ವೀಕ್ಷಿಸಿ",
    refresh: "ನವೀಕರಿಸಿ",
    selectFile: "ಕಡತ ಆಯ್ಕೆಮಾಡಿ (PDF, PNG, JPG)",

    // QR & Privacy Guardrails
    qrSecurityNotice: "ಭದ್ರತಾ ಸೂಚನೆ: ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಕೇವಲ ತಾತ್ಕಾಲಿಕ ಸಂಕೇತವನ್ನು ಮಾತ್ರ ಹೊಂದಿರುತ್ತದೆ. ಯಾವುದೇ ಖಾಸಗಿ ಮಾಹಿತಿಯನ್ನು ನೇರವಾಗಿ ಕ್ಯೂಆರ್‌ನಲ್ಲಿ ಶೇಖರಿಸುವುದಿಲ್ಲ.",
    qrExpiresIn: "ಕ್ಯೂಆರ್ ಮಾನ್ಯತೆ ಮುಗಿಯಲು ಉಳಿದ ಸಮಯ",
    minutes: "ನಿಮಿಷಗಳು",
    consentPending: "ವೈದ್ಯರೊಬ್ಬರು ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು ತಾತ್ಕಾಲಿಕ ಅನುಮತಿ ಕೋರುತ್ತಿದ್ದಾರೆ.",
    consentApprovedMsg: "ಪ್ರವೇಶ ಸಕ್ರಿಯವಾಗಿದೆ. ನೀವು ಯಾವುದೇ ಕ್ಷಣದಲ್ಲಿ ಇದನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು.",

    // Timeline & Follow-ups
    medicalTimeline: "ವೈದ್ಯಕೀಯ ಪ್ರಯಾಣದ ಇತಿಹಾಸ",
    upcomingFollowUps: "ಮುಂದಿನ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಗಳು & ಔಷಧಿಗಳು",
    missingAlertsTitle: "ಮುನ್ನೆಚ್ಚರಿಕೆ & ಬಾಕಿ ಇರುವ ಪರೀಕ್ಷೆಗಳ ಎಚ್ಚರಿಕೆ",
    dueDate: "ಗಡುವು ದಿನಾಂಕ",
    prescribedMedicine: "ಪ್ರಸ್ತುತ ಸೇವಿಸುತ್ತಿರುವ ಔಷಧಿ",

    // Comparison Tool
    parameter: "ತಪಾಸಣಾ ವಿವರ",
    previousValue: "ಹಿಂದಿನ ಮೌಲ್ಯ",
    latestValue: "ಇತ್ತೀಚಿನ ಮೌಲ್ಯ",
    normalRange: "ಸಾಮಾನ್ಯ ಮಿತಿ",
    status: "ಪ್ರಗತಿಯ ಸ್ಥಿತಿ",

    // Disclaimers
    safetyDisclaimer: "ಕಡ್ಡಾಯ ಆರೋಗ್ಯ ಸೂಚನೆ: ಕ್ಯೂಆರ್ ಆರೋಗ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್ ದಾಖಲೆಗಳನ್ನು ಸಂಘಟಿಸಲು ಮಾತ್ರ ನೆರವಾಗುತ್ತದೆ. ಇದು ಯಾವುದೇ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಆಧಾರಿತ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಚಿಕಿತ್ಸೆ ನೀಡುವುದಿಲ್ಲ.",
    dummyDataNotice: "ಡೆಮೊ ಮೋಡ್: ಹ್ಯಾಕ್‌ಸ್ಪ್ರಿಂಟ್ 3.0 ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಕೇವಲ ಕಾಲ್ಪನಿಕ ರೋಗಿ ವಿವರಗಳನ್ನು ಬಳಸಲಾಗಿದೆ."
  }
};
