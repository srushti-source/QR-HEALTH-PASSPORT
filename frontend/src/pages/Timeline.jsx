import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Timeline({ setActiveTab }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  const [timeline, setTimeline] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await api.getTimeline(currentUser.id || 'pat_001');
        if (res.success) {
          setTimeline(res.timeline || []);
          setFollowUps(res.followUps || []);
        }
      } catch (err) {
        console.error('Error fetching timeline:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTimeline();
  }, [currentUser.id]);

  const getEventIcon = (category) => {
    switch (category) {
      case 'MRI/CT':
        return '🧠';
      case 'Lab Report':
        return '🧪';
      case 'Prescription':
        return '💊';
      case 'Discharge Summary':
        return '🏥';
      default:
        return '📄';
    }
  };

  const getEventColor = (category) => {
    switch (category) {
      case 'MRI/CT':
        return '#0284c7';
      case 'Lab Report':
        return '#16a34a';
      case 'Prescription':
        return '#d97706';
      case 'Discharge Summary':
        return '#dc2626';
      default:
        return '#0d9488';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#0d9488', fontWeight: 700 }}>
          {language === 'kn' ? 'ವೈದ್ಯಕೀಯ ಟೈಮ್‌ಲೈನ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Loading Smart Medical Timeline...'}
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
            ⏱️ {t.medicalTimeline}
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            {language === 'kn'
              ? 'ರೋಗಿಯ ಸಂಪೂರ್ಣ ಚಿಕಿತ್ಸಾ ಪ್ರಯಾಣ - ಇತ್ತೀಚಿನಿಂದ ಹಳೆಯದರವರೆಗೆ'
              : 'Chronological healthcare history across clinics, scans, and hospitals'}
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('patient-records')}>
          📁 {t.navPatientPortal}
        </button>
      </div>

      {/* Upcoming Milestones Bar */}
      {followUps.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', background: '#f0fdf4', border: '1.5px solid #86efac' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🔔</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#166534' }}>
              {t.upcomingFollowUps}
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {followUps.map((fu) => (
              <div key={fu.id} style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#15803d', marginBottom: '0.2rem' }}>
                  <span>{fu.doctorName}</span>
                  <span>📅 {fu.dueDate}</span>
                </div>
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  {language === 'kn' && fu.titleKn ? fu.titleKn : fu.title}
                </p>
                {fu.medicineAlert && (
                  <p style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600, marginTop: '0.2rem' }}>
                    💊 {fu.medicineAlert}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Timeline Tree */}
      <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '3px solid #cbd5e1', marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {timeline.map((event, index) => {
          const color = getEventColor(event.category);
          return (
            <div key={event.id} style={{ position: 'relative' }}>
              {/* Timeline Marker Dot with Category Icon */}
              <div style={{
                position: 'absolute',
                left: '-2.85rem',
                top: '0.2rem',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: color,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                boxShadow: '0 0 0 4px #f8fafc'
              }}>
                {getEventIcon(event.category)}
              </div>

              {/* Event Content Card */}
              <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {event.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                    📅 {event.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  {language === 'kn' && event.titleKn ? event.titleKn : event.title}
                </h3>

                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  🏥 <strong>{event.hospital}</strong> • 🩺 {event.doctorName}
                </div>

                <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5', background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  {event.summary}
                </p>

                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                  <span>📎 {event.fileName || 'Report_Document.pdf'}</span>
                  <span style={{ color: '#0d9488', fontWeight: 600 }}>✓ Journey Milestone #{timeline.length - index}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
