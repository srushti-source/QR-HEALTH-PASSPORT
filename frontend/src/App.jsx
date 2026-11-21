import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import Timeline from './pages/Timeline';
import FollowUps from './pages/FollowUps';

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

        {/* Phase 3: Patient Dashboard & Records */}
        {activeTab === 'patient-records' && <PatientDashboard setActiveTab={setActiveTab} />}

        {/* Phase 3: Smart Medical Timeline */}
        {activeTab === 'timeline' && <Timeline setActiveTab={setActiveTab} />}

        {/* Phase 3: Follow-ups, Medicines & Preventive Alerts */}
        {(activeTab === 'follow-ups' || activeTab === 'alerts') && <FollowUps />}

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
            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📲</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.5rem' }}>
                {language === 'kn' ? 'ಕ್ಯೂಆರ್ ಹಂಚಿಕೆ ಮತ್ತು ರೋಗಿಯ ಒಪ್ಪಿಗೆ ಸೌಲಭ್ಯ' : 'QR Generation & Patient Consent Engine'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '500px', margin: '0 auto 1rem auto' }}>
                {language === 'kn'
                  ? 'ಹಂತ 3 ಯಶಸ್ವಿಯಾಗಿದೆ. ಹಂತ 4 ರಲ್ಲಿ ಲೈವ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ಜನರೇಟರ್ ಮತ್ತು ಕ್ಯಾಮೆರಾ ಸ್ಕ್ಯಾನರ್ ಸಂಪೂರ್ಣವಾಗಿ ಸಕ್ರಿಯಗೊಳ್ಳಲಿದೆ.'
                  : 'Phase 3 is active! Live QR code canvas rendering and camera QR scanner will be fully wired in Phase 4.'}
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('patient-records')}>
                ← {language === 'kn' ? 'ರೋಗಿಯ ದಾಖಲೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Patient Records'}
              </button>
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
            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.5rem' }}>
                {language === 'kn' ? 'ಅನುಮೋದಿತ ವೈದ್ಯರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ & ವರದಿ ಹೋಲಿಕೆ' : 'Authorized Doctor View & Comparison Engine'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '500px', margin: '0 auto 1rem auto' }}>
                {language === 'kn'
                  ? 'ಹಂತ 5 ರಲ್ಲಿ ವೈದ್ಯರ ಲೈವ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮತ್ತು ಹಳೆಯ vs ಇತ್ತೀಚಿನ ವರದಿಗಳ ಹೋಲಿಕೆ ಕೋಷ್ಟಕ ಸಕ್ರಿಯಗೊಳ್ಳಲಿದೆ.'
                  : 'Doctor dashboard, report access, and side-by-side previous vs latest comparison tool will be wired in Phase 5.'}
              </p>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('home')}>
                ← {language === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Home'}
              </button>
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
