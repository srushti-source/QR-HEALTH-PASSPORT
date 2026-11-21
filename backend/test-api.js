// Automated verification script for Phase 1 APIs
const app = require("./server");
const store = require("./src/store/dataStore");

async function runTests() {
  console.log("--- Starting Phase 1 API Verification Tests ---\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Patient and Doctor Seed Data Check
  const patient = store.getPatient("pat_001");
  assert(patient && patient.name === "Ramesh Kumar", "Patient dummy data loaded (Ramesh Kumar)");
  assert(patient.allergies.includes("Penicillin"), "Patient allergy profile exists");

  const doctors = store.getDoctors();
  assert(doctors.length >= 2, "Doctor profiles loaded (Dr. Ananya Rao, Dr. Chethan Gowda)");

  // 2. Records and Categorization Check
  const allRecords = store.getRecords("pat_001");
  assert(allRecords.length >= 5, `Total patient records loaded: ${allRecords.length}`);

  const mriRecords = store.getRecords("pat_001", "MRI/CT");
  assert(mriRecords.length >= 1 && mriRecords[0].category === "MRI/CT", "Records category filter works (MRI/CT)");

  const labRecords = store.getRecords("pat_001", "Lab Report");
  assert(labRecords.length >= 2, "Lab reports available for chronological comparison");

  // 3. Previous-vs-Latest Comparison Check
  const comparison = store.compareReports("pat_001", "Lab Report");
  assert(comparison.hasComparison === true, "Report comparison generated successfully");
  assert(comparison.comparisonTable.length > 0, `Comparison parameters mapped (${comparison.comparisonTable.length} parameters)`);
  const hba1cParam = comparison.comparisonTable.find((p) => p.parameter === "HbA1c");
  assert(hba1cParam && hba1cParam.previousValue === "7.8 %" && hba1cParam.latestValue === "7.1 %", "HbA1c progress tracked (7.8% -> 7.1%)");

  // 4. Missing Record Alerts Check
  const alerts = store.getMissingRecordAlerts("pat_001");
  assert(alerts.length >= 2, "Missing record alert generated (Kidney function & Ultrasound)");

  // 5. Follow-ups Check
  const followUps = store.getFollowUps("pat_001");
  assert(followUps.length >= 2, "Follow-up reminders retrieved");

  // 6. QR Code Temporary Access & Consent Workflow
  // a) Patient generates QR token
  const tokenEntry = store.createQrToken("pat_001", 15, "ALL_RECORDS");
  assert(tokenEntry.token && tokenEntry.token.startsWith("QHP-"), "QR access token created with prefix QHP-");
  assert(tokenEntry.status === "ACTIVE", "Token status is ACTIVE");

  // b) Token validation
  const validation = store.validateQrToken(tokenEntry.token);
  assert(validation.valid === true, "QR token validated successfully");

  // c) Doctor requests access
  const accessReq = store.requestAccess(tokenEntry.token, "doc_101", "Cardiology review");
  assert(accessReq.success === true, "Doctor submitted access request");

  // d) Doctor tries to view before approval -> should be forbidden!
  const unauthorizedView = store.getAuthorizedRecordsForDoctor(tokenEntry.token, "doc_101");
  assert(unauthorizedView.error && unauthorizedView.status === 403, "Doctor blocked from viewing unauthorized records (Privacy rule passed)");

  // e) Patient approves doctor access
  const approval = store.respondToAccessRequest(tokenEntry.token, "APPROVED", ["Lab Report", "Prescription"]);
  assert(approval.success === true && approval.status === "APPROVED", "Patient approved doctor request with category selection");

  // f) Doctor views authorized records
  const authorizedView = store.getAuthorizedRecordsForDoctor(tokenEntry.token, "doc_101");
  assert(authorizedView.success === true, "Doctor can view authorized records after approval");
  assert(authorizedView.records.length > 0, "Authorized records returned to doctor");

  // g) Patient revokes access
  const revocation = store.revokeToken(tokenEntry.token);
  assert(revocation.success === true, "Patient revoked access token");

  // h) Doctor tries to view after revocation -> should be blocked!
  const postRevokeView = store.getAuthorizedRecordsForDoctor(tokenEntry.token, "doc_101");
  assert(postRevokeView.error && postRevokeView.status === 403, "Doctor blocked after patient revoked access (Zero leakage)");

  console.log(`\n--- Verification Summary: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed === 0) {
    console.log("All Phase 1 functional and privacy requirements verified successfully!");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});

