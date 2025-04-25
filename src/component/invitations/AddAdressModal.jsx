import React from 'react';
import './AddAddressModal.css'; // Import the CSS file

// Assume you have your logo image locally or provide a URL
import logoImage from '../../assets/logo.png'; // <-- UPDATE THIS PATH
import { GuestList } from './GuestList';
function AddAddressModal({ onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    // Example: Get values
    // const fullAddress = event.target.elements.fullAddress.value;
    // const googleAddress = event.target.elements.googleAddress.value;
    // ... send data to backend or update state ...
    // onClose(); // Optionally close modal on submit
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop propagation prevents closing modal when clicking inside content */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          × {/* Use a simple 'x' for the close button */}
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
            // Consider if this should be an address autocomplete input
          />
          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAddressModal;