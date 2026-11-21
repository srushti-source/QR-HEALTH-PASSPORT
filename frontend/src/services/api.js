// Frontend API Service - Communicates with Phase 1 Express Backend

const API_BASE = '/api';

export const api = {
  // Health
  checkHealth: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // Auth / Demo
  getDemoUsers: async () => {
    const res = await fetch(`${API_BASE}/auth/demo-users`);
    return res.json();
  },

  // Patient
  getPatientProfile: async (patientId = 'pat_001') => {
    const res = await fetch(`${API_BASE}/patient/profile?patientId=${patientId}`);
    return res.json();
  },

  getPatientRecords: async (patientId = 'pat_001', category = null) => {
    const url = category && category !== 'All'
      ? `${API_BASE}/patient/records?patientId=${patientId}&category=${encodeURIComponent(category)}`
      : `${API_BASE}/patient/records?patientId=${patientId}`;
    const res = await fetch(url);
    return res.json();
  },

  getTimeline: async (patientId = 'pat_001') => {
    const res = await fetch(`${API_BASE}/patient/timeline?patientId=${patientId}`);
    return res.json();
  },

  getFollowUps: async (patientId = 'pat_001') => {
    const res = await fetch(`${API_BASE}/patient/follow-ups?patientId=${patientId}`);
    return res.json();
  },

  getAlerts: async (patientId = 'pat_001') => {
    const res = await fetch(`${API_BASE}/patient/alerts?patientId=${patientId}`);
    return res.json();
  },

  uploadRecord: async (formData) => {
    const res = await fetch(`${API_BASE}/patient/records`, {
      method: 'POST',
      body: formData // Let browser set Content-Type with boundary for multipart
    });
    return res.json();
  },

  // QR Access & Consent
  generateQrToken: async (patientId = 'pat_001', expiryMinutes = 30, scope = 'ALL_RECORDS') => {
    const res = await fetch(`${API_BASE}/access/generate-qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, expiryMinutes, scope })
    });
    return res.json();
  },

  validateToken: async (token) => {
    const res = await fetch(`${API_BASE}/access/validate/${token}`);
    return res.json();
  },

  requestDoctorAccess: async (token, doctorId = 'doc_101', doctorNotes = 'Routine Consultation') => {
    const res = await fetch(`${API_BASE}/access/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, doctorId, doctorNotes })
    });
    return res.json();
  },

  getPendingRequests: async (patientId = 'pat_001') => {
    const res = await fetch(`${API_BASE}/access/pending-requests?patientId=${patientId}`);
    return res.json();
  },

  respondToAccessRequest: async (token, decision = 'APPROVED', selectedCategories = null) => {
    const res = await fetch(`${API_BASE}/access/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, decision, selectedCategories })
    });
    return res.json();
  },

  revokeAccess: async (token) => {
    const res = await fetch(`${API_BASE}/access/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    return res.json();
  },

  // Doctor Views
  getAuthorizedDoctorRecords: async (token, doctorId = 'doc_101') => {
    const res = await fetch(`${API_BASE}/doctor/records?token=${token}&doctorId=${doctorId}`);
    return res.json();
  },

  compareReports: async (patientId = 'pat_001', category = 'Lab Report') => {
    const res = await fetch(`${API_BASE}/doctor/compare-reports?patientId=${patientId}&category=${category}`);
    return res.json();
  }
};
