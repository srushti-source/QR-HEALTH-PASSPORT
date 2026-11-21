import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="main-content">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}

        {/* Phase 3 Placeholder / Preview Card */}
        {activeTab === 'patient-records' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📁 {t.navPatientPortal} - {language === 'kn' ? currentUser.nameKn : currentUser.name}</h2>
              <span className="badge badge-info">{currentUser.abhaMockId}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {language === 'kn'
                ? 'ರೋಗಿಯ ಪ್ರೊಫೈಲ್ ಮತ್ತು ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳ ವಿಭಾಗ. ಇದು ಹಂತ 3 ರಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ಸಕ್ರಿಯಗೊಳ್ಳಲಿದೆ.'
                : 'Patient profile and categorized medical records view. Ready for Phase 3 activation.'}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#0f766e', marginBottom: '0.5rem' }}>
                ✓ {language === 'kn' ? 'ಬ್ಯಾಕೆಂಡ್ ಎಪಿಐ ಸಿದ್ಧವಾಗಿದೆ (/api/patient/records)' : 'Backend API Connected (/api/patient/records)'}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {language === 'kn' ? 'ಹಂತ 2 ಪೂರ್ಣಗೊಂಡ ನಂತರ ಹಂತ 3 ರಲ್ಲಿ ಪೂರ್ಣ ಇಂಟರ್ಫೇಸ್ ಸಕ್ರಿಯಗೊಳ್ಳುತ್ತದೆ.' : 'Full document categorization, timeline cards and upload modal will be wired in Phase 3.'}
              </p>
            </div>
          </div>
        )}

        {/* Phase 3 Timeline Preview Card */}
        {activeTab === 'timeline' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">⏱️ {t.medicalTimeline}</h2>
              <span className="badge badge-success">{language === 'kn' ? 'ಕಾಲಾನುಕ್ರಮದ ನೋಟ' : 'Chronological View'}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {language === 'kn'
                ? 'ರೋಗಿಯ ಎಲ್ಲಾ ಹಿಂದಿನ ತಪಾಸಣೆಗಳನ್ನು ದಿನಾಂಕದ ಪ್ರಕಾರ ಜೋಡಿಸಲಾದ ನೋಟ.'
                : 'Visual journey of patient medical history across hospitals and clinics.'}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#0284c7' }}>
                ✓ {language === 'kn' ? 'ಬ್ಯಾಕೆಂಡ್ ಟೈಮ್‌ಲೈನ್ ಎಂಡ್‌ಪಾಯಿಂಟ್ ಸಿದ್ಧವಾಗಿದೆ (/api/patient/timeline)' : 'Backend Timeline Endpoint Ready (/api/patient/timeline)'}
              </p>
            </div>
          </div>
        )}

        {/* Phase 4 QR Access Preview Card */}
        {activeTab === 'qr-share' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">🔐 {t.navQrAccess}</h2>
              <span className="badge badge-warning">{language === 'kn' ? 'ತಾತ್ಕಾಲಿಕ ಅನುಮತಿ' : 'Temporary Access'}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {t.qrSecurityNotice}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#d97706' }}>
                ✓ {language === 'kn' ? 'ಕ್ಯೂಆರ್ ಟೋಕನ್ ರಚನೆ ಎಪಿಐ ಸಿದ್ಧವಾಗಿದೆ (/api/access/generate-qr)' : 'QR Token Lifecycle API Ready (/api/access/generate-qr)'}
              </p>
            </div>
          </div>
        )}

        {/* Phase 5 Doctor Portal Preview Card */}
        {activeTab === 'doctor-portal' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">🩺 {t.navDoctorPortal}</h2>
              <span className="badge badge-info">{currentUser.role === 'DOCTOR' ? currentUser.name : 'Dr. Ananya Rao'}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {language === 'kn'
                ? 'ವೈದ್ಯರು ರೋಗಿಯ ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅನುಮೋದಿತ ದಾಖಲೆಗಳನ್ನು ಮಾತ್ರ ವೀಕ್ಷಿಸುವ ತಾಣ.'
                : 'Doctor QR scanner and authorized patient records view.'}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#6366f1' }}>
                ✓ {language === 'kn' ? 'ವೈದ್ಯರ ಅನುಮೋದಿತ ವೀಕ್ಷಣೆ ಎಪಿಐ ಸಿದ್ಧವಾಗಿದೆ (/api/doctor/records)' : 'Doctor Authorized View API Ready (/api/doctor/records)'}
              </p>
            </div>
          </div>
        )}

        {/* Follow-ups & Reminders Card */}
        {activeTab === 'follow-ups' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">🔔 {t.upcomingFollowUps}</h2>
              <span className="badge badge-success">{language === 'kn' ? 'ಸಕ್ರಿಯ' : 'Active'}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {language === 'kn'
                ? 'ಮಧುಮೇಹ ಕಣ್ಣಿನ ತಪಾಸಣೆ ಮತ್ತು ರಕ್ತದೊತ್ತಡ ಪರಿಶೀಲನೆಯ ಮುಂಬರುವ ದಿನಾಂಕಗಳು.'
                : 'Upcoming clinical screenings and medicine adherence schedule.'}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#16a34a' }}>
                ✓ {language === 'kn' ? 'ಫಾಲೋ-ಅಪ್ ಎಪಿಐ ಸಿದ್ಧವಾಗಿದೆ (/api/patient/follow-ups)' : 'Follow-up API Connected (/api/patient/follow-ups)'}
              </p>
            </div>
          </div>
        )}

        {/* Health Alerts Card */}
        {activeTab === 'alerts' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">⚠️ {t.missingAlertsTitle}</h2>
              <span className="badge badge-danger">{language === 'kn' ? 'ಮುನ್ನೆಚ್ಚರಿಕೆ' : 'Warning'}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              {language === 'kn'
                ? 'ದೀರ್ಘಕಾಲದ ಕಾಯಿಲೆಗಳ ವಾರ್ಷಿಕ ಪರೀಕ್ಷೆಗಳು ಬಾಕಿ ಇದ್ದಾಗ ರೋಗಿ ಮತ್ತು ವೈದ್ಯರಿಗೆ ಎಚ್ಚರಿಕೆ ನೀಡುತ್ತದೆ.'
                : 'Smart alerts warning patients and doctors of overdue preventive screenings.'}
            </p>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: '#dc2626' }}>
                ✓ {language === 'kn' ? 'ಎಚ್ಚರಿಕೆ ಎಪಿಐ ಸಿದ್ಧವಾಗಿದೆ (/api/patient/alerts)' : 'Alerts API Connected (/api/patient/alerts)'}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Mandatory HealthTech Safety Disclaimer Footer */}
      <footer className="disclaimer-banner">
        <p>
          <strong>{t.safetyDisclaimer}</strong>
        </p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          {t.dummyDataNotice}
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
