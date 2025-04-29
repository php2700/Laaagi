import './AddAddressModal.css';
import logoImage from '../../assets/logo.png';
import { useState } from 'react';

export const Addadress = ({ open, onClose }) => {
  const id = localStorage.getItem("_id");
  const [_id, setId] = useState(id);


  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className="modal-header">
          <img src={logoImage} alt="Laaagi Logo" className="modal-logo" />
          <span className="modal-brand-name">Laaagi</span>
        </div>
        <h2 className="modal-title" id="titles">Add My Address</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullAddress"
            className="modal-input"
            placeholder="Enter Full Address"
            required
          />
          <input
            type="text"
            name="googleAddress"
            className="modal-input"
            placeholder="Google Address"
          />
          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
