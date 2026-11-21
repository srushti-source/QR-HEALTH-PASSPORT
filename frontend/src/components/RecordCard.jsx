import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function RecordCard({ record }) {
  const { t, language } = useLanguage();
  const [showFindings, setShowFindings] = useState(false);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'MRI/CT':
        return 'badge-info';
      case 'Lab Report':
        return 'badge-success';
      case 'Prescription':
        return 'badge-warning';
      case 'Discharge Summary':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'MRI/CT':
        return t.catMriCt;
      case 'Lab Report':
        return t.catLabReport;
      case 'Prescription':
        return t.catPrescription;
      case 'Discharge Summary':
        return t.catDischargeSummary;
      default:
        return category;
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className={`badge ${getCategoryBadgeClass(record.category)}`} style={{ marginBottom: '0.35rem' }}>
            {getCategoryLabel(record.category)}
          </span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            {language === 'kn' && record.titleKn ? record.titleKn : record.title}
          </h3>
        </div>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>
          📅 {record.date}
        </span>
      </div>

      {/* Metadata */}
      <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <div>
          <strong>🩺 {language === 'kn' ? 'ವೈದ್ಯರು:' : 'Doctor:'}</strong> {record.doctorName}
        </div>
        <div>
          <strong>🏥 {language === 'kn' ? 'ಆಸ್ಪತ್ರೆ:' : 'Facility:'}</strong> {record.hospital}
        </div>
      </div>

      {/* Summary */}
      <p style={{ fontSize: '0.88rem', color: '#334155', background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        {record.summary}
      </p>

      {/* Findings Table (if available) */}
      {record.findings && record.findings.length > 0 && (
        <div style={{ marginTop: '0.25rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowFindings(!showFindings)}
            style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.8rem' }}
          >
            <span>{showFindings ? '▲ ' + (language === 'kn' ? 'ಫಲಿತಾಂಶಗಳನ್ನು ಮರೆಮಾಡಿ' : 'Hide Clinical Findings') : '▼ ' + (language === 'kn' ? 'ಫಲಿತಾಂಶಗಳ ಕೋಷ್ಟಕ ವೀಕ್ಷಿಸಿ' : 'View Clinical Findings Table')}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({record.findings.length} {language === 'kn' ? 'ಅಂಶಗಳು' : 'parameters'})</span>
          </button>

          {showFindings && (
            <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', background: '#fff' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '6px 8px' }}>{t.parameter}</th>
                    <th style={{ padding: '6px 8px' }}>{language === 'kn' ? 'ಫಲಿತಾಂಶ' : 'Result'}</th>
                    <th style={{ padding: '6px 8px' }}>{t.normalRange}</th>
                  </tr>
                </thead>
                <tbody>
                  {record.findings.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '6px 8px', fontWeight: 600 }}>{item.parameter}</td>
                      <td style={{ padding: '6px 8px', color: item.status === 'High' ? '#dc2626' : (item.status === 'Improved' ? '#16a34a' : '#0f172a'), fontWeight: 600 }}>
                        {item.result} {item.status && `(${item.status})`}
                      </td>
                      <td style={{ padding: '6px 8px', color: '#64748b' }}>{item.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Document attachment footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b' }}>
        <span>📎 {record.fileName || 'Report_Document.pdf'}</span>
        <span style={{ color: '#0d9488', fontWeight: 600 }}>✓ Verified Dummy Record</span>
      </div>
    </div>
  );
}
