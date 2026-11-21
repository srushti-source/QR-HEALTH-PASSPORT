const express = require("express");
const router = express.Router();
const store = require("../store/dataStore");

// POST /api/access/generate-qr
// Patient generates a temporary, opaque QR access token
router.post("/generate-qr", (req, res) => {
  const { patientId = "pat_001", expiryMinutes = 30, scope = "ALL_RECORDS" } = req.body;

  const tokenEntry = store.createQrToken(patientId, Number(expiryMinutes), scope);

  // Return QR payload that frontend encodes into a visual QR code
  // The QR code contains an access link / token ONLY, NEVER raw medical data!
  res.json({
    success: true,
    message: "Temporary access token generated. Ready for QR scanning.",
    token: tokenEntry.token,
    expiresAt: tokenEntry.expiresAt,
    accessUrl: `/doctor/scan?token=${tokenEntry.token}`,
    scope: tokenEntry.scope
  });
});

// GET /api/access/validate/:token
// Doctor app validates QR token after camera scan
router.get("/validate/:token", (req, res) => {
  const { token } = req.params;
  const validation = store.validateQrToken(token);

  if (!validation.valid) {
    return res.status(400).json({ valid: false, error: validation.message });
  }

  const patient = store.getPatient(validation.entry.patientId);

  res.json({
    valid: true,
    token: validation.entry.token,
    status: validation.entry.status,
    expiresAt: validation.entry.expiresAt,
    patientName: patient.name,
    patientAge: patient.age,
    patientGender: patient.gender,
    patientBloodGroup: patient.bloodGroup
  });
});

// POST /api/access/request
// Doctor requests access using scanned token
router.post("/request", (req, res) => {
  const { token, doctorId = "doc_101", doctorNotes = "Routine Consultation" } = req.body;

  if (!token) {
    return res.status(400).json({ error: "QR Token is required" });
  }

  const result = store.requestAccess(token, doctorId, doctorNotes);
  if (!result.success) {
    return res.status(400).json({ error: result.message || "Failed to submit access request" });
  }

  res.json({
    success: true,
    message: `Access request submitted. Awaiting patient (${result.patientName}) approval.`,
    entry: result.entry
  });
});

// GET /api/access/pending-requests
// Patient checks for incoming doctor access requests
router.get("/pending-requests", (req, res) => {
  const patientId = req.query.patientId || "pat_001";
  const requests = store.getPendingRequestsForPatient(patientId);
  res.json({ success: true, requests });
});

// POST /api/access/respond
// Patient grants or rejects doctor access
router.post("/respond", (req, res) => {
  const { token, decision, selectedCategories } = req.body;

  if (!token || !decision) {
    return res.status(400).json({ error: "Token and decision ('APPROVED' or 'REJECTED') are required." });
  }

  const result = store.respondToAccessRequest(token, decision, selectedCategories);
  if (!result.success) {
    return res.status(400).json({ error: result.message || "Failed to update access request" });
  }

  res.json({
    success: true,
    status: result.status,
    message: decision === "APPROVED" ? "Doctor has been granted temporary access." : "Access request was rejected."
  });
});

// POST /api/access/revoke
// Patient immediately revokes doctor access anytime
router.post("/revoke", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token is required to revoke access" });

  const result = store.revokeToken(token);
  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json({ success: true, message: result.message });
});

module.exports = router;

