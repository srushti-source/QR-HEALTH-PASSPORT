import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import RecordCard from '../components/RecordCard';
import UploadModal from '../components/UploadModal';

export default function PatientDashboard({ setActiveTab }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch patient profile, records & pending requests
  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, recordsRes, requestsRes] = await Promise.all([
        api.getPatientProfile(currentUser.id || 'pat_001'),
        api.getPatientRecords(currentUser.id || 'pat_001'),
        api.getPendingRequests(currentUser.id || 'pat_001')
      ]);

      if (profileRes.success) setPatient(profileRes.patient);
      if (recordsRes.success) {
        setRecords(recordsRes.records);
        setFilteredRecords(recordsRes.records);
      }
      if (requestsRes.success) setPendingRequests(requestsRes.requests || []);
    } catch (err) {
      console.error('Error loading patient data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser.id]);

  // Filter by category & search query
  useEffect(() => {
    let list = records;

    if (selectedCategory !== 'All') {
      list = list.filter((r) => r.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((r) =>
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.titleKn && r.titleKn.toLowerCase().includes(q)) ||
        (r.doctorName && r.doctorName.toLowerCase().includes(q)) ||
        (r.hospital && r.hospital.toLowerCase().includes(q)) ||
        (r.summary && r.summary.toLowerCase().includes(q))
      );
    }

    setFilteredRecords(list);
  }, [selectedCategory, searchQuery, records]);

  // Handle patient approving or rejecting doctor access
  const handleRespondRequest = async (token, decision) => {
    try {
      const res = await api.respondToAccessRequest(token, decision);
      if (res.success) {
        setMessage(res.message);
        setTimeout(() => setMessage(''), 4000);
        // Refresh requests
        const requestsRes = await api.getPendingRequests(currentUser.id || 'pat_001');
        if (requestsRes.success) setPendingRequests(requestsRes.requests || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSuccess = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setMessage(t.uploadSuccess);
    setTimeout(() => setMessage(''), 4000);
  };

  const categories = [
    { key: 'All', label: t.allCategories },
    { key: 'Lab Report', label: t.catLabReport },
    { key: 'MRI/CT', label: t.catMriCt },
    { key: 'Prescription', label: t.catPrescription },
    { key: 'Discharge Summary', label: t.catDischargeSummary }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#0d9488', fontWeight: 700 }}>
          {language === 'kn' ? 'ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Loading patient medical passport...'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Success / Notification Banner */}
      {message && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ✓ {message}
        </div>
      )}

      {/* Doctor Pending Access Request Banner (Real-time Patient Consent Gate) */}
      {pendingRequests.filter((r) => r.status === 'PENDING_PATIENT_APPROVAL').map((req) => (
        <div key={req.token} style={{ background: '#fef3c7', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-warning">Consent Request</span>
              <strong style={{ color: '#92400e' }}>
                🩺 {req.doctor?.name || 'Doctor'} ({req.doctor?.hospital || 'Clinic'})
              </strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#78350f' }}>
              {t.consentPending}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleRespondRequest(req.token, 'APPROVED')}
            >
              ✓ {t.approve}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRespondRequest(req.token, 'REJECTED')}
            >
              ✕ {t.reject}
            </button>
          </div>
        </div>
      ))}

      {/* Patient Profile Card */}
      {patient && (
        <div className="card" style={{ marginBottom: '1.5rem', background: '#ffffff', borderLeft: '5px solid #0d9488' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  {language === 'kn' ? (patient.nameKn || patient.name) : patient.name}
                </h2>
                <span className="badge badge-info" style={{ letterSpacing: '0.5px' }}>
                  🆔 {patient.abhaMockId}
                </span>
                <span className="badge badge-success">
                  🩸 {patient.bloodGroup}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.2rem' }}>
                {patient.age} {language === 'kn' ? 'ವರ್ಷ' : 'years'} • {language === 'kn' ? patient.genderKn : patient.gender} • 📞 {patient.phone}
              </p>
            </div>

            {/* Emergency & Quick QR Action */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setIsUploadOpen(true)}>
                + {t.uploadDocument}
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('qr-share')}>
                📲 {t.generateQr}
              </button>
            </div>
          </div>

          {/* Clinical Alerts Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
            {/* Known Allergies with Safety Highlighting */}
            <div style={{ background: '#fef2f2', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>
                ⚠️ {t.allergies}
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b', marginTop: '0.15rem' }}>
                {patient.allergies?.join(', ') || t.noAllergies}
              </p>
            </div>

            {/* Chronic Conditions */}
            <div style={{ background: '#f0fdf4', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
                📋 {t.chronicConditions}
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>
                {patient.chronicConditions?.join(' • ')}
              </p>
            </div>

            {/* Emergency Contact */}
            <div style={{ background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                🆘 {t.emergencyContact}
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginTop: '0.15rem' }}>
                {patient.emergencyContact?.name} ({patient.emergencyContact?.phone})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls: Category Filter Tabs & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: selectedCategory === cat.key ? '#0d9488' : '#ffffff',
                color: selectedCategory === cat.key ? '#ffffff' : '#475569',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                border: selectedCategory === cat.key ? '1px solid #0d9488' : '1px solid #e2e8f0'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              background: '#ffffff'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Records Count & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b' }}>
          {language === 'kn' ? 'ದಾಖಲೆಗಳು:' : 'Showing records:'} <strong>{filteredRecords.length}</strong>
        </p>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setActiveTab('timeline')}
          style={{ fontSize: '0.8rem' }}
        >
          ⏱️ {t.medicalTimeline}
        </button>
      </div>

      {/* Medical Records Grid */}
      {filteredRecords.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 600 }}>
            {t.noRecordsFound}
          </p>
        </div>
      ) : (
        <div className="grid-2">
          {filteredRecords.map((rec) => (
            <RecordCard key={rec.id} record={rec} />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        patientId={currentUser.id || 'pat_001'}
      />
    </div>
  );
}
