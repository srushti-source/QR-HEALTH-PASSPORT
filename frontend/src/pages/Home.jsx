import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Home({ setActiveTab }) {
  const { t, language } = useLanguage();
  const { loginAsPatient, loginAsDoctor } = useAuth();

  const handleOpenPatient = () => {
    loginAsPatient();
    setActiveTab('patient-records');
  };

  const handleOpenDoctor = () => {
    loginAsDoctor('doc_101');
    setActiveTab('doctor-portal');
  };

  const handleOpenTimeline = () => {
    loginAsPatient();
    setActiveTab('timeline');
  };

  const handleOpenQr = () => {
    loginAsPatient();
    setActiveTab('qr-share');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <span className="hero-badge">{t.hackathonBadge}</span>
        <h1 className="hero-title">{t.heroTitle}</h1>
        <p className="hero-subtitle">{t.heroSubtitle}</p>

        <div className="hero-cta">
          <button className="btn btn-primary" onClick={handleOpenPatient}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t.enterAsPatient}
          </button>

          <button className="btn btn-secondary" onClick={handleOpenDoctor}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 17h.01" />
              <path d="M17 17h.01" />
            </svg>
            {t.enterAsDoctor}
          </button>

          <button className="btn btn-outline" onClick={handleOpenQr}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            {t.generateQr}
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
          {t.demoNote}
        </p>
      </section>

      {/* Checkpoint 1 & 2: Problem & Solution Architecture */}
      <div className="grid-2">
        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ color: '#b91c1c' }}>
              ⚠️ {t.problemTitle}
            </h3>
            <span className="badge badge-danger">Domain Problem</span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {t.problemDesc}
          </p>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: '#64748b', fontSize: '0.85rem' }}>
            <li>Loss of previous MRI/CT films and surgical history</li>
            <li>No quick way to present chronic condition history (Diabetes, Hypertension)</li>
            <li>Lack of clinical progression tracking between visits</li>
          </ul>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0d9488' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ color: '#0f766e' }}>
              🛡️ {t.solutionTitle}
            </h3>
            <span className="badge badge-success">Patient-Centric</span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {t.solutionDesc}
          </p>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: '#64748b', fontSize: '0.85rem' }}>
            <li>Opaque temporary QR access token (Zero raw data in QR)</li>
            <li>Doctor requests access $\rightarrow$ Patient approves/rejects on device</li>
            <li>Automatic chronological timeline with previous vs latest comparisons</li>
          </ul>
        </div>
      </div>

      {/* 6 Mandatory Features Grid */}
      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
          {language === 'kn' ? 'ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳು' : 'Core Hackathon Features & Capabilities'}
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          {language === 'kn' ? 'ಹ್ಯಾಕ್‌ಸ್ಪ್ರಿಂಟ್ 3.0 ನಿಯಮಾವಳಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ' : 'Engineered strictly to HackSprint 3.0 HealthTech specifications'}
        </p>

        <div className="grid-3">
          <div className="card" style={{ cursor: 'pointer' }} onClick={handleOpenTimeline}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📅</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat1}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ಎಲ್ಲಾ ಹಳೆಯ ವರದಿಗಳನ್ನು ದಿನಾಂಕದ ಅನುಕ್ರಮದಲ್ಲಿ ಸಂಘಟಿಸುತ್ತದೆ.' : 'Automatically organizes all past consultations, surgery summaries, and scans chronologically.'}
            </p>
          </div>

          <div className="card" style={{ cursor: 'pointer' }} onClick={handleOpenQr}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔒</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat2}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ಕ್ಯೂಆರ್‌ನಲ್ಲಿ ಖಾಸಗಿ ಡೇಟಾ ಇರುವುದಿಲ್ಲ; ಕೇವಲ ತಾತ್ಕಾಲಿಕ ಟೋಕನ್ ಇರುತ್ತದೆ.' : 'Zero medical data embedded in QR code; encrypted short-lived token with patient consent.'}
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🩺</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat3}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ವೈದ್ಯರು ಕೋರಿಕೆ ಸಲ್ಲಿಸುತ್ತಾರೆ, ರೋಗಿ ಅನುಮೋದಿಸಿದರೆ ಮಾತ್ರ ವೀಕ್ಷಣೆ ಸಾಧ್ಯ.' : 'Doctors request access via camera scanner; patient approves or revokes access immediately.'}
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📊</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat4}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ಹಳೆಯ ಮತ್ತು ಇತ್ತೀಚಿನ ರಕ್ತ ಪರೀಕ್ಷೆ (HbA1c, ಶುಗರ್) ಹೋಲಿಕೆ ವರದಿ.' : 'Side-by-side comparison of old vs latest metrics (HbA1c, Blood Sugar, Cholesterol).'}
            </p>
          </div>

          <div className="card" style={{ cursor: 'pointer' }} onClick={() => { loginAsPatient(); setActiveTab('alerts'); }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔔</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat5}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ವಾರ್ಷಿಕ ಪರೀಕ್ಷೆಗಳು ಅಥವಾ ಬಾಕಿ ಉಳಿದ ತಪಾಸಣೆಗಳ ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಂದೇಶ.' : 'Intelligent alerts notifying patients of overdue annual renal tests and follow-up scans.'}
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🌐</div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.feat6}</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {language === 'kn' ? 'ಗ್ರಾಮೀಣ ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಸುಲಭವಾಗಲು ಸಂಪೂರ್ಣ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಬೆಂಬಲ.' : 'Fully localized in English and Kannada for elders and regional accessibility.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
