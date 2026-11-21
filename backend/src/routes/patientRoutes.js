const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const store = require("../store/dataStore");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration with file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}_${cleanName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".png", ".jpg", ".jpeg"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported. Please upload PDF, PNG or JPEG files."));
    }
  }
});

// GET /api/patient/profile
router.get("/profile", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const patient = store.getPatient(patientId);
  res.json({ success: true, patient });
});

// GET /api/patient/records (Category filter & date sorting supported)
router.get("/records", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const category = req.query.category || null;
  const records = store.getRecords(patientId, category);
  res.json({ success: true, total: records.length, records });
});

// POST /api/patient/records (Upload new medical document)
router.post("/records", upload.single("document"), (req, res) => {
  try {
    const { title, titleKn, category, date, doctorName, hospital, summary, tags } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "Document title and category are required." });
    }

    const fileName = req.file ? req.file.filename : "Sample_Digital_Record.pdf";

    const newRecord = store.addRecord({
      patientId: req.body.patientId || "pat_001",
      title,
      titleKn: titleKn || title,
      category,
      date: date || new Date().toISOString().split("T")[0],
      doctorName: doctorName || "Self-Uploaded",
      hospital: hospital || "Patient Health Record",
      summary: summary || "Document saved to patient passport.",
      fileName,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim())) : ["uploaded"]
    });

    res.status(201).json({
      success: true,
      message: "Medical record successfully uploaded and added to timeline.",
      record: newRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/patient/timeline (Chronological medical journey)
router.get("/timeline", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const records = store.getRecords(patientId);
  const followUps = store.getFollowUps(patientId);

  // Group events chronologically
  const timelineEvents = records.map((r) => ({
    id: r.id,
    type: "RECORD",
    category: r.category,
    title: r.title,
    titleKn: r.titleKn,
    date: r.date,
    hospital: r.hospital,
    doctorName: r.doctorName,
    summary: r.summary,
    fileName: r.fileName
  }));

  res.json({ success: true, timeline: timelineEvents, followUps });
});

// GET /api/patient/follow-ups
router.get("/follow-ups", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const followUps = store.getFollowUps(patientId);
  res.json({ success: true, followUps });
});

// POST /api/patient/follow-ups
router.post("/follow-ups", (req, res) => {
  const { title, titleKn, dueDate, doctorName, hospital, notes, medicineAlert } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and Due Date are mandatory for follow-ups." });
  }

  const newFollowUp = store.addFollowUp({
    patientId: req.body.patientId || "pat_001",
    title,
    titleKn,
    dueDate,
    doctorName,
    hospital,
    notes,
    medicineAlert
  });

  res.status(201).json({ success: true, followUp: newFollowUp });
});

// GET /api/patient/alerts (Missing medical record warnings)
router.get("/alerts", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const alerts = store.getMissingRecordAlerts(patientId);
  res.json({ success: true, alerts });
});

module.exports = router;

