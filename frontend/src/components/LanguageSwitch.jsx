import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: '9999px', padding: '3px', border: '1px solid #e2e8f0' }}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        style={{
          border: 'none',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          background: language === 'en' ? '#0d9488' : 'transparent',
          color: language === 'en' ? '#ffffff' : '#64748b',
          transition: 'all 0.2s ease'
        }}
        title="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('kn')}
        style={{
          border: 'none',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          background: language === 'kn' ? '#0d9488' : 'transparent',
          color: language === 'kn' ? '#ffffff' : '#64748b',
          transition: 'all 0.2s ease'
        }}
        title="ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

