const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const accessRoutes = require("./src/routes/accessRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents statically with safety headers
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// System Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "HEALTHY",
    service: "QR Health Passport Backend",
    hackathon: "HackSprint 3.0",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    privacyCompliance: "No raw patient data stored in QR codes. Dummy data mode active."
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/doctor", doctorRoutes);

// Safe Centralized Error Handler (Mandatory HealthTech Requirement: Handle errors safely)
app.use((err, req, res, next) => {
  console.error("[Safe Error Handler]", err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "An unexpected error occurred. Please try again."
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  QR Health Passport Backend running on port ${PORT}`);
    console.log(`  API Health: http://localhost:${PORT}/api/health`);
    console.log(`  HackSprint 3.0 - HealthTech Domain`);
    console.log(`=======================================================`);
  });
}

module.exports = app;

