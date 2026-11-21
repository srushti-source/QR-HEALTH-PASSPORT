const express = require("express");
const router = express.Router();
const store = require("../store/dataStore");

// GET /api/auth/demo-users
// Fast login helper for hackathon judges & testers
router.get("/demo-users", (req, res) => {
  const patient = store.getPatient();
  const doctors = store.getDoctors();
  res.json({
    patients: [
      { id: patient.id, name: patient.name, role: "PATIENT", abhaMockId: patient.abhaMockId }
    ],
    doctors: doctors.map((d) => ({
      id: d.id,
      name: d.name,
      role: "DOCTOR",
      specialty: d.specialty,
      hospital: d.hospital
    }))
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { role, userId } = req.body;

  if (role === "PATIENT") {
    const patient = store.getPatient(userId || "pat_001");
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    return res.json({
      success: true,
      user: {
        id: patient.id,
        name: patient.name,
        nameKn: patient.nameKn,
        role: "PATIENT",
        abhaMockId: patient.abhaMockId,
        phone: patient.phone
      }
    });
  }

  if (role === "DOCTOR") {
    const doctor = store.getDoctor(userId || "doc_101");
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    return res.json({
      success: true,
      user: {
        id: doctor.id,
        name: doctor.name,
        nameKn: doctor.nameKn,
        role: "DOCTOR",
        specialty: doctor.specialty,
        hospital: doctor.hospital,
        registrationNo: doctor.registrationNo
      }
    });
  }

  res.status(400).json({ error: "Invalid role specified. Must be PATIENT or DOCTOR." });
});

module.exports = router;

