// src/components/Invitationhome/SuccessModal.js
import React from 'react';
import './SuccessModal.css'; 
import laaagiLogo from '../../assets/logo.png'; 
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleContainerClick = (e) => {
      e.stopPropagation();
  }

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-container" onClick={handleContainerClick}>
        <img src={laaagiLogo} alt="Laaagi Logo" className="success-modal-logo" />
        <h3 className="success-modal-title">Laaagi</h3>
        <p className="success-modal-text">
          Our team will contact you shortly. In the meantime, you can continue adding your sweets until our representative contacts you.
        </p>
        <button onClick={onClose} className="success-modal-button">
          Ok
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;