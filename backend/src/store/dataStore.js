const seedData = require("../data/seedData");
const { v4: uuidv4 } = require("uuid");

class DataStore {
  constructor() {
    // Clone seed data to maintain independent state
    this.patients = JSON.parse(JSON.stringify(seedData.patients));
    this.doctors = JSON.parse(JSON.stringify(seedData.doctors));
    this.records = JSON.parse(JSON.stringify(seedData.records));
    this.followUps = JSON.parse(JSON.stringify(seedData.followUps));
    this.missingRecordAlerts = JSON.parse(JSON.stringify(seedData.missingRecordAlerts));

    // Active access tokens & consent requests
    // Token schema: { token, patientId, createdAt, expiresAt, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED', requestedByDoctorId, approvedRecords: [] }
    this.accessTokens = new Map();

    // Access request audit log
    this.accessLogs = [];
  }

  // --- Patients ---
  getPatient(id = "pat_001") {
    return this.patients.find((p) => p.id === id) || this.patients[0];
  }

  // --- Doctors ---
  getDoctors() {
    return this.doctors;
  }

  getDoctor(id) {
    return this.doctors.find((d) => d.id === id) || null;
  }

  // --- Records & Timeline ---
  getRecords(patientId = "pat_001", category = null) {
    let list = this.records.filter((r) => r.patientId === patientId);
    if (category && category !== "All") {
      list = list.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }
    // Return sorted chronologically descending (newest first)
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getRecordById(recordId) {
    return this.records.find((r) => r.id === recordId) || null;
  }

  addRecord(recordData) {
    const newRecord = {
      id: "rec_" + Date.now().toString(36),
      patientId: recordData.patientId || "pat_001",
      title: recordData.title || "Uploaded Medical Document",
      titleKn: recordData.titleKn || recordData.title,
      category: recordData.category || "Lab Report",
      date: recordData.date || new Date().toISOString().split("T")[0],
      doctorName: recordData.doctorName || "Attending Physician",
      hospital: recordData.hospital || "General Healthcare Facility",
      summary: recordData.summary || "Medical report submitted by patient.",
      findings: recordData.findings || [],
      fileName: recordData.fileName || "uploaded_document.pdf",
      tags: recordData.tags || ["uploaded", "patient-record"]
    };

    this.records.unshift(newRecord);
    return newRecord;
  }

  // --- Follow-ups ---
  getFollowUps(patientId = "pat_001") {
    return this.followUps.filter((f) => f.patientId === patientId);
  }

  addFollowUp(followUpData) {
    const newFollowUp = {
      id: "fu_" + Date.now().toString(36),
      patientId: followUpData.patientId || "pat_001",
      title: followUpData.title,
      titleKn: followUpData.titleKn || followUpData.title,
      dueDate: followUpData.dueDate,
      doctorName: followUpData.doctorName || "Doctor Consultation",
      hospital: followUpData.hospital || "Clinic",
      status: "Upcoming",
      notes: followUpData.notes || "",
      medicineAlert: followUpData.medicineAlert || ""
    };
    this.followUps.push(newFollowUp);
    return newFollowUp;
  }

  // --- Missing Record Alerts ---
  getMissingRecordAlerts(patientId = "pat_001") {
    return this.missingRecordAlerts.filter((a) => a.patientId === patientId);
  }

  // --- QR Code & Temporary Consent Workflow ---
  // Mandatory HealthTech rule: QR code does NOT contain medical data; only a temporary opaque token!
  createQrToken(patientId = "pat_001", expiryMinutes = 30, scope = "ALL_RECORDS") {
    const token = "QHP-" + uuidv4().slice(0, 8).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();

    const tokenEntry = {
      token,
      patientId,
      createdAt: new Date().toISOString(),
      expiresAt,
      status: "ACTIVE", // ACTIVE = waiting for doctor scan/request
      doctorId: null,
      scope: scope || "ALL_RECORDS",
      allowedCategories: ["MRI/CT", "Lab Report", "Prescription", "Discharge Summary"],
      isRevoked: false
    };

    this.accessTokens.set(token, tokenEntry);
    return tokenEntry;
  }

  validateQrToken(token) {
    if (!token) return { valid: false, message: "Token missing" };
    const entry = this.accessTokens.get(token);
    if (!entry) return { valid: false, message: "Invalid or expired QR token" };

    if (entry.isRevoked) {
      return { valid: false, message: "Access has been revoked by the patient" };
    }

    const now = new Date();
    if (now > new Date(entry.expiresAt)) {
      return { valid: false, message: "QR token has expired for safety reasons" };
    }

    return { valid: true, entry };
  }

  // Doctor scans QR and requests access
  requestAccess(token, doctorId, doctorNotes = "") {
    const validation = this.validateQrToken(token);
    if (!validation.valid) return validation;

    const entry = validation.entry;
    entry.doctorId = doctorId;
    entry.doctorNotes = doctorNotes;
    entry.status = "PENDING_PATIENT_APPROVAL";

    const doctor = this.getDoctor(doctorId);
    const patient = this.getPatient(entry.patientId);

    const logEntry = {
      id: "log_" + Date.now().toString(36),
      token,
      patientId: entry.patientId,
      doctorId,
      doctorName: doctor ? doctor.name : "Visiting Doctor",
      hospital: doctor ? doctor.hospital : "Clinic",
      requestedAt: new Date().toISOString(),
      status: "PENDING_PATIENT_APPROVAL"
    };

    this.accessLogs.unshift(logEntry);
    return { success: true, entry, logEntry, patientName: patient.name };
  }

  // Patient approves or rejects doctor's request
  respondToAccessRequest(token, decision = "APPROVED", selectedCategories = null) {
    const validation = this.validateQrToken(token);
    if (!validation.valid) return validation;

    const entry = validation.entry;
    if (decision === "APPROVED") {
      entry.status = "APPROVED";
      if (selectedCategories && Array.isArray(selectedCategories)) {
        entry.allowedCategories = selectedCategories;
      }
    } else {
      entry.status = "REJECTED";
      entry.isRevoked = true;
    }

    // Update logs
    const log = this.accessLogs.find((l) => l.token === token);
    if (log) {
      log.status = entry.status;
      log.resolvedAt = new Date().toISOString();
    }

    return { success: true, status: entry.status, entry };
  }

  // Patient revokes token immediately
  revokeToken(token) {
    const entry = this.accessTokens.get(token);
    if (!entry) return { success: false, message: "Token not found" };

    entry.isRevoked = true;
    entry.status = "REVOKED";

    const log = this.accessLogs.find((l) => l.token === token);
    if (log) {
      log.status = "REVOKED";
      log.revokedAt = new Date().toISOString();
    }

    return { success: true, message: "Access successfully revoked immediately." };
  }

  // Doctor accesses patient records with verified token
  getAuthorizedRecordsForDoctor(token, doctorId) {
    const validation = this.validateQrToken(token);
    if (!validation.valid) return { error: validation.message, status: 403 };

    const entry = validation.entry;
    if (entry.status !== "APPROVED") {
      return {
        error: `Access not approved. Current status: ${entry.status}. Please request approval from patient.`,
        status: 403
      };
    }

    const patient = this.getPatient(entry.patientId);
    let records = this.getRecords(entry.patientId);

    // Filter only patient-authorized categories
    if (entry.allowedCategories && entry.allowedCategories.length > 0) {
      records = records.filter((r) => entry.allowedCategories.includes(r.category));
    }

    const followUps = this.getFollowUps(entry.patientId);

    return {
      success: true,
      patient: {
        id: patient.id,
        name: patient.name,
        nameKn: patient.nameKn,
        age: patient.age,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        abhaMockId: patient.abhaMockId,
        allergies: patient.allergies,
        chronicConditions: patient.chronicConditions,
        emergencyContact: patient.emergencyContact
      },
      authorizedCategories: entry.allowedCategories,
      expiresAt: entry.expiresAt,
      records,
      followUps
    };
  }

  // Pending approval requests for patient to review
  getPendingRequestsForPatient(patientId = "pat_001") {
    const requests = [];
    for (const [token, entry] of this.accessTokens.entries()) {
      if (entry.patientId === patientId && !entry.isRevoked) {
        const doctor = entry.doctorId ? this.getDoctor(entry.doctorId) : null;
        requests.push({
          token,
          createdAt: entry.createdAt,
          expiresAt: entry.expiresAt,
          status: entry.status,
          doctor: doctor || { name: "Doctor awaiting connection", hospital: "Clinic" },
          doctorNotes: entry.doctorNotes || ""
        });
      }
    }
    return requests;
  }

  // Previous-vs-Latest Report Comparison (Rule 10 & Mandatory HealthTech Requirement)
  compareReports(patientId = "pat_001", recordType = "Lab Report") {
    const labReports = this.records
      .filter((r) => r.patientId === patientId && r.category === recordType && r.findings && r.findings.length > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // oldest to newest

    if (labReports.length < 2) {
      return {
        hasComparison: false,
        message: "Need at least 2 reports of this type to compare progress."
      };
    }

    const previousReport = labReports[labReports.length - 2];
    const latestReport = labReports[labReports.length - 1];

    // Align findings side-by-side
    const comparisonTable = [];
    latestReport.findings.forEach((latestParam) => {
      const prevParam = previousReport.findings.find((p) => p.parameter === latestParam.parameter);
      comparisonTable.push({
        parameter: latestParam.parameter,
        normalRange: latestParam.normalRange,
        previousDate: previousReport.date,
        previousValue: prevParam ? prevParam.result : "N/A",
        previousStatus: prevParam ? prevParam.status || "Recorded" : "N/A",
        latestDate: latestReport.date,
        latestValue: latestParam.result,
        latestStatus: latestParam.status || "Recorded"
      });
    });

    return {
      hasComparison: true,
      previousReport: {
        id: previousReport.id,
        title: previousReport.title,
        date: previousReport.date,
        hospital: previousReport.hospital
      },
      latestReport: {
        id: latestReport.id,
        title: latestReport.title,
        date: latestReport.date,
        hospital: latestReport.hospital
      },
      comparisonTable
    };
  }
}

// Export singleton instance
module.exports = new DataStore();

