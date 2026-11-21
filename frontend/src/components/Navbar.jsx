import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar({ activeTab, setActiveTab }) {
  const { t, language } = useLanguage();
  const { currentUser, loginAsPatient, loginAsDoctor } = useAuth();

  const isPatient = currentUser.role === 'PATIENT';

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <div className="brand" onClick={() => setActiveTab('home')}>
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 17h.01" />
              <path d="M17 17h.01" />
              <path d="M12 7v10" />
              <path d="M7 12h10" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>{t.appTitle}</h1>
            <p>{t.appTagline}</p>
          </div>
        </div>

        {/* Right side controls: Language switcher + Role badge & Switcher */}
        <div className="nav-controls">
          <LanguageSwitch />

          {/* Current User & Role Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '4px 8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span className={`role-badge ${isPatient ? 'patient' : 'doctor'}`}>
              {isPatient ? (language === 'kn' ? 'ರೋಗಿ' : 'Patient') : (language === 'kn' ? 'ವೈದ್ಯರು' : 'Doctor')}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
              {language === 'kn' ? (currentUser.nameKn || currentUser.name) : currentUser.name}
            </span>

            {/* Quick Demo Switcher */}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.72rem', padding: '2px 8px', minHeight: '26px' }}
              onClick={() => {
                if (isPatient) {
                  loginAsDoctor('doc_101');
                } else {
                  loginAsPatient();
                }
              }}
              title="Toggle between Patient (Ramesh Kumar) and Doctor (Dr. Ananya Rao)"
            >
              ⇄ {isPatient ? (language === 'kn' ? 'ವೈದ್ಯರಾಗಿ ಲಾಗಿನ್' : 'Switch to Doctor') : (language === 'kn' ? 'ರೋಗಿಯಾಗಿ ಲಾಗಿನ್' : 'Switch to Patient')}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="nav-links-bar">
        <button
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          {t.navHome}
        </button>

        <button
          className={`nav-link ${activeTab === 'patient-records' ? 'active' : ''}`}
          onClick={() => {
            loginAsPatient();
            setActiveTab('patient-records');
          }}
        >
          {t.navPatientPortal}
        </button>

        <button
          className={`nav-link ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => {
            loginAsPatient();
            setActiveTab('timeline');
          }}
        >
          {t.navTimeline}
        </button>

        <button
          className={`nav-link ${activeTab === 'qr-share' ? 'active' : ''}`}
          onClick={() => {
            loginAsPatient();
            setActiveTab('qr-share');
          }}
        >
          {t.navQrAccess}
        </button>

        <button
          className={`nav-link ${activeTab === 'doctor-portal' ? 'active' : ''}`}
          onClick={() => {
            loginAsDoctor('doc_101');
            setActiveTab('doctor-portal');
          }}
        >
          {t.navDoctorPortal}
        </button>

        <button
          className={`nav-link ${activeTab === 'follow-ups' ? 'active' : ''}`}
          onClick={() => {
            loginAsPatient();
            setActiveTab('follow-ups');
          }}
        >
          {t.navFollowUps}
        </button>

        <button
          className={`nav-link ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => {
            loginAsPatient();
            setActiveTab('alerts');
          }}
        >
          {t.navAlerts}
        </button>
      </nav>
    </header>
  );
}
