import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default to Patient "Ramesh Kumar" for immediate hackathon demonstration
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('qhp_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      role: 'PATIENT',
      id: 'pat_001',
      name: 'Ramesh Kumar',
      nameKn: 'ರಮೇಶ್ ಕುಮಾರ್',
      abhaMockId: '91-4832-1190-7731'
    };
  });

  useEffect(() => {
    localStorage.setItem('qhp_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const loginAsPatient = () => {
    setCurrentUser({
      role: 'PATIENT',
      id: 'pat_001',
      name: 'Ramesh Kumar',
      nameKn: 'ರಮೇಶ್ ಕುಮಾರ್',
      abhaMockId: '91-4832-1190-7731'
    });
  };

  const loginAsDoctor = (doctorId = 'doc_101') => {
    if (doctorId === 'doc_102') {
      setCurrentUser({
        role: 'DOCTOR',
        id: 'doc_102',
        name: 'Dr. Chethan Gowda',
        nameKn: 'ಡಾ. ಚೇತನ್ ಗೌಡ',
        specialty: 'General Physician & Diabetologist',
        hospital: 'District General Hospital, Hassan',
        registrationNo: 'KMC-51024'
      });
    } else {
      setCurrentUser({
        role: 'DOCTOR',
        id: 'doc_101',
        name: 'Dr. Ananya Rao',
        nameKn: 'ಡಾ. ಅನನ್ಯಾ ರಾವ್',
        specialty: 'Cardiology & Internal Medicine',
        hospital: 'Hassan Cardiac Care Centre',
        registrationNo: 'KMC-48291'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginAsPatient, loginAsDoctor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
