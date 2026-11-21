import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function UploadModal({ isOpen, onClose, onUploadSuccess, patientId }) {
  const { t, language } = useLanguage();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lab Report');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctorName, setDoctorName] = useState('');
  const [hospital, setHospital] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validation: Max 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(language === 'kn' ? 'ಕಡತದ ಗಾತ್ರ 10MB ಗಿಂತ ಕಡಿಮೆಯಿರಬೇಕು.' : 'File size exceeds 10MB limit.');
      setFile(null);
      return;
    }

    // Validation: Allowed formats
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
    const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (!allowed.includes(ext)) {
      setError(language === 'kn' ? 'ಕೇವಲ PDF, PNG, ಅಥವಾ JPG ಕಡತಗಳನ್ನು ಮಾತ್ರ ಅನುಮತಿಸಲಾಗಿದೆ.' : 'Only PDF, PNG, and JPG files are supported.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(language === 'kn' ? 'ದಯವಿಟ್ಟು ದಾಖಲೆಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Document title is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('patientId', patientId || 'pat_001');
      formData.append('title', title);
      formData.append('category', category);
      formData.append('date', date);
      formData.append('doctorName', doctorName || 'Attending Physician');
      formData.append('hospital', hospital || 'General Healthcare Facility');
      formData.append('summary', summary || 'Document uploaded to patient record.');
      if (file) {
        formData.append('document', file);
      }

      const res = await api.uploadRecord(formData);
      if (res.success) {
        onUploadSuccess(res.record);
        onClose();
      } else {
        setError(res.error || 'Failed to upload record.');
      }
    } catch (err) {
      setError(err.message || 'Error uploading record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            📤 {t.uploadDocument}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              {t.docTitle} *
            </label>
            <input
              type="text"
              required
              placeholder={language === 'kn' ? 'ಉದಾ. ಎಂಆರ್‌ಐ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ಲಿಪಿಡ್ ಪ್ರೊಫೈಲ್' : 'e.g. Brain MRI, Thyroid Blood Test, Surgery Summary'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                {t.category} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
              >
                <option value="Lab Report">{t.catLabReport}</option>
                <option value="MRI/CT">{t.catMriCt}</option>
                <option value="Prescription">{t.catPrescription}</option>
                <option value="Discharge Summary">{t.catDischargeSummary}</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                {t.date} *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              {language === 'kn' ? 'ವೈದ್ಯರ ಹೆಸರು' : 'Doctor / Specialist Name'}
            </label>
            <input
              type="text"
              placeholder={language === 'kn' ? 'ಉದಾ. ಡಾ. ರಾವ್' : 'e.g. Dr. A. Rao / Attending Consultant'}
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              {language === 'kn' ? 'ಆಸ್ಪತ್ರೆ / ಲ್ಯಾಬ್ ಹೆಸರು' : 'Hospital / Diagnostic Lab'}
            </label>
            <input
              type="text"
              placeholder={language === 'kn' ? 'ಉದಾ. ಹಾಸನ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ' : 'e.g. District General Hospital, Hassan'}
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              {t.summary}
            </label>
            <textarea
              rows="2"
              placeholder={language === 'kn' ? 'ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು ಅಥವಾ ತಪಾಸಣೆಯ ಮುಖ್ಯ ಅಂಶಗಳು' : 'Key findings, medication instructions, or doctor remarks'}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit' }}
            />
          </div>

          {/* File input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
              {t.selectFile} (Max: 10MB)
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '0.4rem 0', fontSize: '0.85rem' }}
            />
            {file && (
              <p style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600, marginTop: '0.2rem' }}>
                ✓ {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (language === 'kn' ? 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...' : 'Saving...') : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
