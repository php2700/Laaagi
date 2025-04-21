
import React from 'react';
import './CustomizationModal.css';

const CustomizationModal = ({ isOpen, onClose, onFormSubmitSuccess }) => {
  if (!isOpen) return null;

  const handleContainerClick = (e) => {
    e.stopPropagation();
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form submitted!");

    if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContainerClick}>
        <h2 className="modal-title">Get Customization Box</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <input type="text" placeholder="First Name" className="modal-input" required />
            <input type="text" placeholder="Last Name" className="modal-input" required /> 
          </div>
          <input type="tel" placeholder="Phone Number" className="modal-input full" required />
          <textarea placeholder="Your Message" className="modal-textarea"></textarea>
          <button type="submit" className="modal-button">Get Customize</button>
        </form>
        <button onClick={onClose} className="modal-close">✕</button>
      </div>
    </div>
  );
};

export default CustomizationModal;