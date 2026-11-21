const express = require("express");
const router = express.Router();
const store = require("../store/dataStore");

// GET /api/doctor/records
// Fetch records for an approved QR token
router.get("/records", (req, res) => {
  const { token, doctorId = "doc_101" } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const result = store.getAuthorizedRecordsForDoctor(token, doctorId);
  if (result.error) {
    return res.status(result.status || 403).json({ error: result.error });
  }

  res.json(result);
});

// GET /api/doctor/compare-reports
// Compare previous-vs-latest clinical findings (Rule 10)
router.get("/compare-reports", (req, res) => {
  const { patientId = "pat_001", category = "Lab Report" } = req.query;
  const comparison = store.compareReports(patientId, category);
  res.json({ success: true, comparison });
});

// POST /api/doctor/notes
// Doctor adds a consultation note or follow-up recommendation
router.post("/notes", (req, res) => {
  const { patientId, doctorId, note, recommendedFollowUpDate } = req.body;

  if (!patientId || !note) {
    return res.status(400).json({ error: "patientId and note are required" });
  }

  const doctor = store.getDoctor(doctorId || "doc_101");

  const newRecord = store.addRecord({
    patientId,
    title: `Doctor Consultation Note - ${doctor ? doctor.name : "Visiting Doctor"}`,
    category: "Prescription",
    date: new Date().toISOString().split("T")[0],
    doctorName: doctor ? doctor.name : "Attending Doctor",
    hospital: doctor ? doctor.hospital : "Hospital",
    summary: note,
    findings: [],
    tags: ["consultation", "doctor-note"]
  });

  if (recommendedFollowUpDate) {
    store.addFollowUp({
      patientId,
      title: `Recommended Follow-Up with ${doctor ? doctor.name : "Doctor"}`,
      dueDate: recommendedFollowUpDate,
      doctorName: doctor ? doctor.name : "Attending Doctor",
      hospital: doctor ? doctor.hospital : "Clinic",
      notes: note
    });
  }

  res.json({
    success: true,
    message: "Consultation note & follow-up recommendation saved to patient timeline.",
    record: newRecord
  });
});

module.exports = router;

