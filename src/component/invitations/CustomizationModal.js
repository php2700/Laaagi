// import React from 'react';
// import './CustomizationModal.css';

//   const CustomizationModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <h2 className="modal-title">Get Customization Box</h2>
//         <form className="modal-form">
//           <div className="modal-row">
//             <input type="text" placeholder="First Name" className="modal-input" />
//             <input type="text" placeholder="Last Name" className="modal-input" />
//           </div>
//           <input type="text" placeholder="Phone Number" className="modal-input full" />
//           <textarea placeholder="Your Message" className="modal-textarea"></textarea>
//           <button type="submit" className="modal-button">Get Customize</button>
//         </form>
//         <button onClick={onClose} className="modal-close">✕</button>
//       </div>
//     </div>
//   );
// };

// export default CustomizationModal;
// src/component/invitations/CustomizationModal.js (Example Path)
// import React from 'react';
// import './CustomizationModal.css'; 

// const CustomizationModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const handleContainerClick = (e) => {
//       e.stopPropagation();
//   }

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={handleContainerClick}>
//         <h2 className="modal-title">Get Customization Box</h2>
//         <form className="modal-form">
//           <div className="modal-row">
//             <input type="text" placeholder="First Name" className="modal-input" />
//             <input type="text" placeholder="Last Name" className="modal-input" />
//           </div>
//           <input type="text" placeholder="Phone Number" className="modal-input full" />
//           <textarea placeholder="Your Message" className="modal-textarea"></textarea>
//           <button type="submit" className="modal-button">Get Customize</button>
//         </form>
//         <button onClick={onClose} className="modal-close">✕</button>
//       </div>
//     </div>
//   );
// };

// export default CustomizationModal;
// src/components/Invitationhome/CustomizationModal.js
import React from 'react';
import './CustomizationModal.css';

// Add 'onFormSubmitSuccess' prop
const CustomizationModal = ({ isOpen, onClose, onFormSubmitSuccess }) => {
  if (!isOpen) return null;

  const handleContainerClick = (e) => {
    e.stopPropagation();
  }

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload on submit
    console.log("Form submitted!"); // For debugging

    // --- Yahan aap form data backend pe bhej sakte hain ---
    // Example: const formData = new FormData(e.target);
    //          fetch('/api/submit-customization', { method: 'POST', body: formData });
    // ------------------------------------------------------

    // Call the function passed from the parent to signal success
    if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContainerClick}>
        <h2 className="modal-title">Get Customization Box</h2>
        {/* Add onSubmit handler to the form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <input type="text" placeholder="First Name" className="modal-input" required /> {/* Added required */}
            <input type="text" placeholder="Last Name" className="modal-input" required /> {/* Added required */}
          </div>
          {/* Added type="tel" for phone number and required */}
          <input type="tel" placeholder="Phone Number" className="modal-input full" required />
          <textarea placeholder="Your Message" className="modal-textarea"></textarea>
          {/* Button type is now submit */}
          <button type="submit" className="modal-button">Get Customize</button>
        </form>
        <button onClick={onClose} className="modal-close">✕</button>
      </div>
    </div>
  );
};

export default CustomizationModal;