import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function FollowUps() {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  const [followUps, setFollowUps] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New follow-up form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [hospital, setHospital] = useState('');
  const [medicineAlert, setMedicineAlert] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [fuRes, alertRes] = await Promise.all([
        api.getFollowUps(currentUser.id || 'pat_001'),
        api.getAlerts(currentUser.id || 'pat_001')
      ]);

      if (fuRes.success) setFollowUps(fuRes.followUps || []);
      if (alertRes.success) setAlerts(alertRes.alerts || []);
    } catch (err) {
      console.error('Error fetching follow-ups and alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser.id]);

  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    setSaving(true);
    try {
      const res = await fetch('/api/patient/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: currentUser.id || 'pat_001',
          title,
          dueDate,
          doctorName: doctorName || 'Attending Physician',
          hospital: hospital || 'Healthcare Center',
          medicineAlert,
          notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setFollowUps([...followUps, data.followUp]);
        setShowAddForm(false);
        setTitle('');
        setDueDate('');
        setDoctorName('');
        setHospital('');
        setMedicineAlert('');
        setNotes('');
        setMessage(language === 'kn' ? 'ಫಾಲೋ-ಅಪ್ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!' : 'Follow-up reminder successfully scheduled!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#0d9488', fontWeight: 700 }}>
          {language === 'kn' ? 'ಫಾಲೋ-ಅಪ್ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Loading follow-ups & reminders...'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            🔔 {t.upcomingFollowUps}
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            {language === 'kn'
              ? 'ಮುಂಬರುವ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಗಳು, ಔಷಧಿ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಂದೇಶಗಳು'
              : 'Keep track of scheduled clinical checkups, active medicines, and missing test alerts'}
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✕ ' + t.cancel : '+ ' + (language === 'kn' ? 'ಹೊಸ ಫಾಲೋ-ಅಪ್ ಸೇರಿಸಿ' : 'Add Follow-up')}
        </button>
      </div>

      {message && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 600 }}>
          ✓ {message}
        </div>
      )}

      {/* Inline Form to Add Follow-up */}
      {showAddForm && (
        <div className="card" style={{ marginBottom: '1.75rem', border: '1.5px solid #0d9488' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f766e' }}>
            📅 {language === 'kn' ? 'ಹೊಸ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ / ಔಷಧಿ ಜ್ಞಾಪನೆ' : 'Schedule New Medical Follow-up'}
          </h3>
          <form onSubmit={handleAddFollowUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                  {language === 'kn' ? 'ತಪಾಸಣೆಯ ಹೆಸರು' : 'Follow-up Title'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'kn' ? 'ಉದಾ. 6 ತಿಂಗಳ ರಕ್ತದೊತ್ತಡ ತಪಾಸಣೆ' : 'e.g. 6-Month Cardiology Review'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                  {t.dueDate} *
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                  {language === 'kn' ? 'ವೈದ್ಯರ ಹೆಸರು' : 'Doctor Name'}
                </label>
                <input
                  type="text"
                  placeholder="Dr. Ananya Rao"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                  {t.prescribedMedicine}
                </label>
                <input
                  type="text"
                  placeholder={language === 'kn' ? 'ಉದಾ. ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg' : 'e.g. Glycomet 500mg (1-0-1)'}
                  value={medicineAlert}
                  onChange={(e) => setMedicineAlert(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>
                {t.cancel}
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                {saving ? '...' : t.submit}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Section 1: Missing Clinical Record Alerts (Rule 11) */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.4rem' }}>⚠️</span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            {t.missingAlertsTitle}
          </h2>
        </div>

        <div className="grid-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="card" style={{ borderLeft: alert.severity === 'Warning' ? '4px solid #ef4444' : '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className={`badge ${alert.severity === 'Warning' ? 'badge-danger' : 'badge-warning'}`}>
                  {alert.severity}
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                {language === 'kn' && alert.titleKn ? alert.titleKn : alert.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                {alert.description}
              </p>
              <div style={{ background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#0f766e', fontWeight: 600 }}>
                💡 {alert.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Active Scheduled Follow-ups */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.4rem' }}>📅</span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            {language === 'kn' ? 'ನಿಗದಿತ ತಪಾಸಣೆಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ' : 'Scheduled Clinical Checkups'}
          </h2>
        </div>

        <div className="grid-2">
          {followUps.map((fu) => (
            <div key={fu.id} className="card" style={{ borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-success">
                  {fu.status}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>
                  📅 {fu.dueDate}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                {language === 'kn' && fu.titleKn ? fu.titleKn : fu.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                🩺 <strong>{fu.doctorName}</strong> ({fu.hospital})
              </p>

              {fu.notes && (
                <p style={{ fontSize: '0.85rem', color: '#334155', background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                  {fu.notes}
                </p>
              )}

              {fu.medicineAlert && (
                <div style={{ background: '#fef3c7', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '0.82rem', color: '#92400e', fontWeight: 700 }}>
                  💊 {language === 'kn' ? 'ಔಷಧಿ ಜ್ಞಾಪನೆ:' : 'Prescription Reminder:'} {fu.medicineAlert}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
