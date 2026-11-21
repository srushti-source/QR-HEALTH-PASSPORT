// Realistic Fictional Healthcare Seed Data (Dummy Data for HackSprint 3.0)
// STRICT COMPLIANCE: 100% fictional patient and clinical information

const seedData = {
  patients: [
    {
      id: "pat_001",
      name: "Ramesh Kumar",
      nameKn: "ರಮೇಶ್ ಕುಮಾರ್",
      age: 54,
      gender: "Male",
      genderKn: "ಪುರುಷ",
      bloodGroup: "B+",
      abhaMockId: "91-4832-1190-7731",
      phone: "+91 98451 23456",
      emergencyContact: {
        name: "Sunitha Kumar (Wife)",
        phone: "+91 98451 98765"
      },
      allergies: ["Penicillin", "Sulfa drugs"],
      chronicConditions: ["Type 2 Diabetes Mellitus", "Essential Hypertension"],
      primaryHospital: "Hassan District Hospital / Manipal Clinic"
    }
  ],

  doctors: [
    {
      id: "doc_101",
      name: "Dr. Ananya Rao",
      nameKn: "ಡಾ. ಅನನ್ಯಾ ರಾವ್",
      specialty: "Cardiology & Internal Medicine",
      registrationNo: "KMC-48291",
      hospital: "Hassan Cardiac Care Centre",
      phone: "+91 99887 76655"
    },
    {
      id: "doc_102",
      name: "Dr. Chethan Gowda",
      nameKn: "ಡಾ. ಚೇತನ್ ಗೌಡ",
      specialty: "General Physician & Diabetologist",
      registrationNo: "KMC-51024",
      hospital: "District General Hospital, Hassan",
      phone: "+91 97766 55443"
    }
  ],

  records: [
    {
      id: "rec_001",
      patientId: "pat_001",
      title: "MRI Lumbar Spine (Lower Back)",
      titleKn: "ಎಂಆರ್‌ಐ ಸೊಂಟದ ಬೆನ್ನುಮೂಳೆ ತಪಾಸಣೆ",
      category: "MRI/CT",
      date: "2025-08-14",
      doctorName: "Dr. R. K. Hegde (Radiologist)",
      hospital: "Hassan Diagnostic & Scan Centre",
      summary: "Mild L4-L5 disc protrusion without significant canal stenosis. No nerve root impingement detected.",
      findings: [
        { parameter: "L4-L5 Disc", result: "Mild bulge / protrusion", normalRange: "Normal alignment" },
        { parameter: "L5-S1 Disc", result: "Normal height & signal", normalRange: "Normal signal" },
        { parameter: "Spinal Canal", result: "Adequate caliber (14 mm)", normalRange: "> 12 mm" }
      ],
      fileName: "MRI_Lumbar_Spine_Report.pdf",
      tags: ["radiology", "spine", "mri", "back-pain"]
    },
    {
      id: "rec_002",
      patientId: "pat_001",
      title: "Baseline Diabetic & Lipid Profile",
      titleKn: "ಮಧುಮೇಹ ಮತ್ತು ಲಿಪಿಡ್ ರಕ್ತ ಪರೀಕ್ಷೆ (ಹಳೆಯದು)",
      category: "Lab Report",
      date: "2025-11-10",
      doctorName: "Dr. Chethan Gowda",
      hospital: "City Lab Services, Hassan",
      summary: "Sub-optimally controlled glycemic levels. Elevated LDL cholesterol.",
      findings: [
        { parameter: "HbA1c", result: "7.8 %", normalRange: "< 5.7 %", status: "High" },
        { parameter: "Fasting Blood Sugar", result: "148 mg/dL", normalRange: "70 - 100 mg/dL", status: "High" },
        { parameter: "Post-Prandial Sugar", result: "210 mg/dL", normalRange: "< 140 mg/dL", status: "High" },
        { parameter: "Total Cholesterol", result: "220 mg/dL", normalRange: "< 200 mg/dL", status: "High" },
        { parameter: "LDL Cholesterol", result: "138 mg/dL", normalRange: "< 100 mg/dL", status: "High" },
        { parameter: "Serum Creatinine", result: "1.0 mg/dL", normalRange: "0.7 - 1.3 mg/dL", status: "Normal" }
      ],
      fileName: "Blood_Report_Nov2025.pdf",
      tags: ["diabetes", "lipids", "hba1c", "blood-test"]
    },
    {
      id: "rec_003",
      patientId: "pat_001",
      title: "Follow-up Glycemic Profile (Latest)",
      titleKn: "ಮಧುಮೇಹ ಮರು-ಪರಿಶೀಲನಾ ಪರೀಕ್ಷೆ (ಇತ್ತೀಚಿನದು)",
      category: "Lab Report",
      date: "2026-02-15",
      doctorName: "Dr. Chethan Gowda",
      hospital: "City Lab Services, Hassan",
      summary: "Marked improvement in HbA1c and fasting blood sugar after lifestyle and medication adherence.",
      findings: [
        { parameter: "HbA1c", result: "7.1 %", normalRange: "< 5.7 %", status: "Improved" },
        { parameter: "Fasting Blood Sugar", result: "124 mg/dL", normalRange: "70 - 100 mg/dL", status: "Improved" },
        { parameter: "Post-Prandial Sugar", result: "168 mg/dL", normalRange: "< 140 mg/dL", status: "Improved" },
        { parameter: "Total Cholesterol", result: "192 mg/dL", normalRange: "< 200 mg/dL", status: "Normal" },
        { parameter: "LDL Cholesterol", result: "108 mg/dL", normalRange: "< 100 mg/dL", status: "Borderline" },
        { parameter: "Serum Creatinine", result: "0.95 mg/dL", normalRange: "0.7 - 1.3 mg/dL", status: "Normal" }
      ],
      fileName: "Blood_Report_Feb2026.pdf",
      tags: ["diabetes", "lipids", "hba1c", "comparison-ready"]
    },
    {
      id: "rec_004",
      patientId: "pat_001",
      title: "Cardiology Review & 12-Lead ECG",
      titleKn: "ಹೃದ್ರೋಗ ತಪಾಸಣೆ ಮತ್ತು ಇಸಿಜಿ ವರದಿ",
      category: "Prescription",
      date: "2026-01-20",
      doctorName: "Dr. Ananya Rao",
      hospital: "Hassan Cardiac Care Centre",
      summary: "Normal sinus rhythm, heart rate 72 bpm. Blood Pressure 132/84 mmHg. Continue Telmisartan 40mg daily.",
      findings: [
        { parameter: "Resting Heart Rate", result: "72 bpm", normalRange: "60 - 100 bpm", status: "Normal" },
        { parameter: "Blood Pressure", result: "132/84 mmHg", normalRange: "< 120/80 mmHg", status: "Pre-hypertension" },
        { parameter: "ECG Rhythm", result: "Normal Sinus Rhythm", normalRange: "Normal", status: "Normal" }
      ],
      fileName: "Cardio_Consultation_Jan2026.pdf",
      tags: ["cardiology", "ecg", "bp", "prescription"]
    },
    {
      id: "rec_005",
      patientId: "pat_001",
      title: "Laparoscopic Cholecystectomy Discharge Summary",
      titleKn: "ಪಿತ್ತಕೋಶ ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಡಿಸ್ಚಾರ್ಜ್ ವರದಿ",
      category: "Discharge Summary",
      date: "2024-03-12",
      doctorName: "Dr. Suresh Patil (General Surgeon)",
      hospital: "Government General Hospital, Hassan",
      summary: "Elective laparoscopic removal of symptomatic gallstones. Post-op recovery uneventful. Discharged in stable condition.",
      findings: [
        { parameter: "Surgical Procedure", result: "Laparoscopic Cholecystectomy", normalRange: "Completed" },
        { parameter: "Post-op Wound", result: "Clean & Healing Well", normalRange: "No infection" },
        { parameter: "Histopathology", result: "Benign chronic cholecystitis", normalRange: "Benign" }
      ],
      fileName: "Discharge_Summary_March2024.pdf",
      tags: ["surgery", "cholecystectomy", "inpatient"]
    }
  ],

  followUps: [
    {
      id: "fu_001",
      patientId: "pat_001",
      title: "Diabetic Eye Retinopathy Screening",
      titleKn: "ಮಧುಮೇಹ ಕಣ್ಣಿನ ಪರೀಕ್ಷೆ (ರೆಟಿನೋಪತಿ)",
      dueDate: "2026-04-10",
      doctorName: "Dr. Chethan Gowda",
      hospital: "Netradhama Eye Clinic, Hassan",
      status: "Upcoming",
      notes: "Annual dilated fundus exam recommended for all diabetes patients.",
      medicineAlert: "Continue Glycomet 500mg (1-0-1)"
    },
    {
      id: "fu_002",
      patientId: "pat_001",
      title: "Cardiology 6-Month Blood Pressure Check",
      titleKn: "ಹೃದ್ರೋಗ 6 ತಿಂಗಳ ರಕ್ತದೊತ್ತಡ ತಪಾಸಣೆ",
      dueDate: "2026-07-20",
      doctorName: "Dr. Ananya Rao",
      hospital: "Hassan Cardiac Care Centre",
      status: "Upcoming",
      notes: "Bring previous ECG and log of morning home blood pressures.",
      medicineAlert: "Telmisartan 40mg once daily after breakfast"
    }
  ],

  missingRecordAlerts: [
    {
      id: "mra_001",
      patientId: "pat_001",
      title: "Missing Annual Kidney Function Test (eGFR / Urine Microalbumin)",
      titleKn: "ವಾರ್ಷಿಕ ಮೂತ್ರಪಿಂಡ ಪರೀಕ್ಷೆ ದಾಖಲೆ ಬಾಕಿ ಇದೆ",
      severity: "Warning",
      description: "Patients with Type 2 Diabetes should have annual renal evaluations. No urine microalbumin test found on file.",
      suggestedAction: "Consult Dr. Chethan Gowda to request an updated urine microalbumin & serum creatinine panel."
    },
    {
      id: "mra_002",
      patientId: "pat_001",
      title: "Post-Surgery Abdominal Ultrasound Checkup Pending",
      titleKn: "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯ ನಂತರದ ಹೊಟ್ಟೆಯ ಸ್ಕ್ಯಾನ್ ದಾಖಲೆ ಬಾಕಿ ಇದೆ",
      severity: "Info",
      description: "It has been over 24 months since the gallbladder surgery. An elective abdominal ultrasound is recommended.",
      suggestedAction: "Upload or schedule ultrasound if prescribed by physician."
    }
  ]
};

module.exports = seedData;

