// import './Invitationhome.css';

// export const Invitationhome = ({ open, onClose, data }) => {
//     if (!open) return null;
//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className='model' onClick={(e) => e.stopPropagation()}>
//                 <div className='close-model'>
//                     <button onClick={onClose}>X</button>
//                 </div>
//                 <div>
//                     <div className='model-text'>Get Quote with Laaagi</div>
//                 </div>
//                 <div  >
//                     <form className='model-form' >
//                         <div className='model-name'>
//                             <input type="text" placeholder="First Name*" />
//                             <input type="text" placeholder="Last Name*" />
//                         </div>
//                         <input type="email" placeholder="Email*" />
//                         <input type="number" placeholder="Phone Number*" />
//                         <textarea className='model-desc' placeholder="Your Message" />

//                         <button className='model-button' type="submit">Send Message</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );


// }
// new file
// 
// import { useParams } from 'react-router-dom';
// import './Invitationhome.css';
// import firstImg from '../../assets/invitations/image.png';
// import secondImg from '../../assets/invitations/image (1).png';
// import thirdImg from '../../assets/invitations/image (2).png';

// const invitationList = [
//   { id: 1, name: 'Ram & Sara', img: firstImg, category: 'Wooden Box', discription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
//   { id: 2, name: 'Rupali & Abhishek', img: secondImg, category: 'Wooden Box', discription: "Elegant invitation for a classic event." },
//   { id: 3, name: 'Anshika & Rachit', img: thirdImg, category: 'Wooden Box', discription: "Stylish box with a personal touch." },
// ];

// export const Invitationhome = () => {
//   const { id } = useParams();
//   const invitation = invitationList.find(item => item.id === parseInt(id));

//   if (!invitation) {
//     return <div style={{ padding: '20px' }}>Invitation not found!</div>;
//   }

//   return (
//     <div className="invitation-details-container">
//       <button className="back-btn">← Back</button>

//       <div className="top-section">
//         <img src={invitation.img} alt={invitation.name} className="invitation-image" />
//         <div className="invitation-description">
//           <h2>{invitation.name}</h2>
//           <p>Description</p>
//           <p>{invitation.discription}</p>
//           <button className="customize-btn">Customize</button>
//         </div>
//       </div>

//       <div className="section-boxes">
//         <h4>Select Size of Box</h4>
//         <div className="box-options">
//           <div className="box">L: 50 cm<br />W: 50 cm<br />Weight: 500 gm</div>
//           <div className="box">L: 50 cm<br />W: 25 cm<br />Weight: 500 gm</div>
//           <div className="box">L: 42 cm<br />W: 60 cm<br />Weight: 500 gm</div>
//           <div className="box">L: 50 cm<br />W: 60 cm<br />Weight: 500 gm</div>
//         </div>
//       </div>

//       <div className="select-box-type">
//         <h4>Select Box Type</h4>
//         <div className="type-options">
//           <div className="type selected">
//             <div className="circle">1</div>
//             <p>Normal Box</p>
//           </div>
//           <div className="type"><div className="circle">2</div></div>
//           <div className="type"><div className="circle">3</div></div>
//           <div className="type"><div className="circle">4</div></div>
//         </div>
//       </div>

//       <div className="bottom-row">
//         <div className="section">
//           <h4>Sections</h4>
//           <div className="sections-box">1</div>
//         </div>
//         <div className="section">
//           <h4>Sweets</h4>
//           <div className="sections-box">Select sweets</div>
//         </div>
//         <div className="section">
//           <h4>Price</h4>
//           <div className="price">₹ 120</div>
//         </div>
//       </div>
//     </div>
//   );
// };
// google
// src/components/Invitationhome/Invitationhome.js
// import React from 'react'; // Import React
// import { useParams } from 'react-router-dom';
// import './Invitationhome.css'; // Make sure to create this CSS file

// // Sample images - adjust paths as needed in your project structure
// import firstImg from '../../assets/invitations/image.png'; // Placeholder path
// import secondImg from '../../assets/invitations/image (1).png'; // Placeholder path
// import thirdImg from '../../assets/invitations/image (2).png'; // Placeholder path
// // Assume you have an image for the box sections
// import boxType1Diagram from '../../assets/invitations/box-type-1.png'; // Placeholder path for diagram
// import boxType2Diagram from '../../assets/invitations/box-type-2.png'; // Placeholder path for diagram
// import boxType3Diagram from '../../assets/invitations/box-type-3.png'; // Placeholder path for diagram
// import boxType4Diagram from '../../assets/invitations/box-type-4.png'; // Placeholder path for diagram
// import section1Diagram from '../../assets/invitations/section-1.png'; // Placeholder path for diagram
// import section2Diagram from '../../assets/invitations/section-2.png'; // Placeholder path for diagram


// // Sample data - replace with your actual data source if needed
// const invitationList = [
//   { id: 1, name: 'Rajiv & Sara', img: firstImg, category: 'Wooden Box', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
//   { id: 2, name: 'Rupali & Abhishek', img: secondImg, category: 'Cardboard Box', description: "Elegant invitation for a classic event, beautifully crafted." },
//   { id: 3, name: 'Anshika & Rachit', img: thirdImg, category: 'Luxury Box', description: "Stylish box with a personal touch, perfect for making a statement." },
// ];
// const boxSizes = [
//     { id: 's1', label: 'L: 50 cm\nW: 50 cm\nWeight: 500 gm', selected: true },
//     { id: 's2', label: 'L: 50 cm\nW: 25 cm\nWeight: 500 gm', selected: false },
//     { id: 's3', label: 'L: 42 cm\nW: 60 cm\nWeight: 500 gm', selected: false },
//     { id: 's4', label: 'L: 50 cm\nW: 50 cm\nWeight: 500 gm', selected: false },
// ];

// const boxTypes = [
//     { id: 't1', name: 'Normal Box', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', diagram: boxType1Diagram, selected: true },
//     { id: 't2', name: '4 Section in Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType2Diagram, selected: false },
//     { id: 't3', name: '3 Section in Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType3Diagram, selected: false },
//     { id: 't4', name: 'Special Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType4Diagram, selected: false },
// ];

// const sectionOptions = [
//     { id: 'sec1', name: '1 Section', diagram: section1Diagram, selected: true },
//     { id: 'sec2', name: '2 Sections', diagram: section2Diagram, selected: false },
// ]

// export const Invitationhome = () => {
     
//   const { id } = useParams();
//   const invitationId = parseInt(id, 10); 

//   const invitation = invitationList.find(item => item.id === invitationId);



//   if (!invitation) {
//     return <div className="container"><p>Invitation not found!</p></div>;
//   }


//   return (
//     <div className="invitation-details-container">
//         {/* Link or button to go back */}
//         {/* <button className="back-btn" onClick={() => window.history.back()}>← Back</button> */}
//          <div className="breadcrumb">Home  Invitation</div> {/* Added breadcrumb */}

//       <div className="top-section">
//         <div className="image-container">
//             <img src={invitation.img} alt={`${invitation.name} Invitation Box`} className="invitation-image" />
//         </div>
//         <div className="invitation-description">
//           <h2>{invitation.name}</h2>
//           <p className="description-label">Description</p>
//           <p>{invitation.description}</p>
//           <button className="customize-btn">Customize</button>
//         </div>
//       </div>

//       <div className="selection-section">
//         <h4>Select Size of Box</h4>
//         <div className="options-grid four-columns">
//           {boxSizes.map(box => (
//             <div
//               key={box.id}
//               className={`option-box size-box ${box.selected ? 'selected' : ''}`}
//             >
//                <div className="checkbox-icon">{box.selected && '✔'}</div> {/* Simple checkmark */}
//               <div className='box-label'>{box.label.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
 
//       <div className="selection-section">
//         <h4>Select Box Type</h4>
//         <div className="options-grid four-columns">
//           {boxTypes.map((type, index) => (
//             <div
//               key={type.id}
//               className={`option-box type-box ${type.selected ? 'selected' : ''}`}
//             >
//               <div className="type-number">{index + 1}</div>
//               <img src={type.diagram} alt={type.name} className="type-diagram" />
//               <p className="type-name">{type.name}</p>
//               {type.selected && <p className="type-desc-short">{type.description.substring(0, 50)}...</p>}
//               <a href="#" className="see-more">See More</a> {}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bottom-config-row">
//             <div className="config-column">
//                 <h4>Sections</h4>
//                 <div className="options-grid two-columns sections-options">
//                  {sectionOptions.map(sec => (
//                     <div
//                       key={sec.id}
//                       className={`option-box section-option-box ${sec.selected ? 'selected' : ''}`}
//                     >
//                       <img src={sec.diagram} alt={`${sec.name} Layout`} className="section-diagram"/>
//                       {}
//                     </div>
//                  ))}
//                 </div>
//             </div>

//             <div className="config-column">
//                 <h4>Sweets</h4>
//                 <div className="option-box sweets-placeholder">
//                     Select sweets
//                     {}
//                 </div>
//             </div>

//             <div className="config-column price-column">
//                 <h4>Price</h4>
//                 <div className="price-display">
//                     ₹ 120
//                     {}
//                 </div>
//             </div>
//       </div>
//       {}
//       {/* <div className="action-buttons">
//           <button className="primary-action">Add to Quote</button>
//       </div> */}
//     </div>
//   );
// };

// // Export the component
// // export default Invitationhome; // Use this if it's the default export

// import React, { useState } from 'react'; 
// import { useParams } from 'react-router-dom';
// import './Invitationhome.css';
// import CustomizationModal from './CustomizationModal'; 
// import firstImg from '../../assets/invitations/image.png';
// import secondImg from '../../assets/invitations/image (1).png';
// import thirdImg from '../../assets/invitations/image (2).png';

// const placeholderDiagram = "https://via.placeholder.com/100x60.png?text=Diagram";
// const boxType1Diagram = placeholderDiagram; 
// const boxType2Diagram = placeholderDiagram;
// const boxType3Diagram = placeholderDiagram;
// const boxType4Diagram = placeholderDiagram;
// const section1Diagram = placeholderDiagram;
// const section2Diagram = placeholderDiagram;




// const invitationList = [
//   { id: 1, name: 'Rajiv & Sara', img: firstImg, category: 'Wooden Box', description: "Lorem Ipsum is simply dummy text..."},
//   { id: 2, name: 'Rupali & Abhishek', img: secondImg, category: 'Cardboard Box', description: "Elegant invitation..."},
//   { id: 3, name: 'Anshika & Rachit', img: thirdImg, category: 'Luxury Box', description: "Stylish box..."},
// ];

// const boxSizes = [
//     { id: 's1', label: 'L: 50 cm\nW: 50 cm\nWeight: 500 gm', selected: true },
//     { id: 's2', label: 'L: 50 cm\nW: 25 cm\nWeight: 500 gm', selected: false },
//     { id: 's3', label: 'L: 42 cm\nW: 60 cm\nWeight: 500 gm', selected: false },
//     { id: 's4', label: 'L: 50 cm\nW: 50 cm\nWeight: 500 gm', selected: false },
// ];

// const boxTypes = [
//     { id: 't1', name: 'Normal Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType1Diagram, selected: true },
//     { id: 't2', name: '4 Section in Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType2Diagram, selected: false },
//     { id: 't3', name: '3 Section in Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType3Diagram, selected: false },
//     { id: 't4', name: 'Special Box', description: 'Lorem Ipsum is simply dummy text...', diagram: boxType4Diagram, selected: false },
// ];

// const sectionOptions = [
//     { id: 'sec1', name: '1 Section', diagram: section1Diagram, selected: true },
//     { id: 'sec2', name: '2 Sections', diagram: section2Diagram, selected: false },
// ];

// export const Invitationhome = () => {
//   const { id } = useParams();
//   const invitationId = parseInt(id, 10);
//   const invitation = invitationList.find(item => item.id === invitationId);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     console.log("Opening modal..."); 
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     console.log("Closing modal..."); 
//     setIsModalOpen(false);
//   };

//   if (!invitation) {
//     return <div className="container"><p>Invitation not found!</p></div>;
//   }

//   return (
//     <div className="invitation-details-container">
//       <div className="breadcrumb">Home > Invitation</div> {/* Corrected breadcrumb symbol */}

//       <div className="top-section">
//         <div className="image-container">
//             <img src={invitation.img} alt={`${invitation.name} Invitation Box`} className="invitation-image" />
//         </div>
//         <div className="invitation-description">
//           <h2>{invitation.name}</h2>
//           <p className="description-label">Description</p>
//           <p>{invitation.description}</p>
//           <button className="customize-btn" onClick={handleOpenModal}>
//               Customize
//           </button>
//         </div>
//       </div>

//       {/* --- Baaki ke sections jaise the waise hi --- */}
//       <div className="selection-section">
//         <h4>Select Size of Box</h4>
//         <div className="options-grid four-columns">
//           {boxSizes.map(box => (
//             <div key={box.id} className={`option-box size-box ${box.selected ? 'selected' : ''}`}>
//                <div className="checkbox-icon">{box.selected && '✔'}</div>
//               <div className='box-label'>{box.label.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="selection-section">
//         <h4>Select Box Type</h4>
//         <div className="options-grid four-columns">
//           {boxTypes.map((type, index) => (
//             <div key={type.id} className={`option-box type-box ${type.selected ? 'selected' : ''}`}>
//               <div className="type-number">{index + 1}</div>
//               <img src={type.diagram} alt={`${type.name} Diagram`} className="type-diagram" /> {/* Added Alt Text */}
//               <p className="type-name">{type.name}</p>
//               {type.selected && <p className="type-desc-short">{type.description.substring(0, 50)}...</p>}
//               <a href="#" className="see-more">See More</a>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bottom-config-row">
//             <div className="config-column">
//                 <h4>Sections</h4>
//                 <div className="options-grid two-columns sections-options">
//                  {sectionOptions.map(sec => (
//                     <div key={sec.id} className={`option-box section-option-box ${sec.selected ? 'selected' : ''}`}>
//                       <img src={sec.diagram} alt={`${sec.name} Layout`} className="section-diagram"/>
//                     </div>
//                  ))}
//                 </div>
//             </div>
//             <div className="config-column">
//                 <h4>Sweets</h4>
//                 <div className="option-box sweets-placeholder">Select sweets</div>
//             </div>
//             <div className="config-column price-column">
//                 <h4>Price</h4>
//                 <div className="price-display">₹ 120</div>
//             </div>
//       </div>


//       <CustomizationModal isOpen={isModalOpen} onClose={handleCloseModal} />

//     </div>
//   );
// };
// src/components/Invitationhome/Invitationhome.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Invitationhome.css';
import CustomizationModal from './CustomizationModal';
import SuccessModal from './SuccessModal'; 

import firstImg from '../../assets/invitations/image.png';
import secondImg from '../../assets/invitations/image (1).png';
import thirdImg from '../../assets/invitations/image (2).png';
const placeholderDiagram = "https://via.placeholder.com/100x60.png?text=Diagram";
const boxType1Diagram = placeholderDiagram;
const boxType2Diagram = placeholderDiagram;
const boxType3Diagram = placeholderDiagram;
const boxType4Diagram = placeholderDiagram;
const section1Diagram = placeholderDiagram;
const section2Diagram = placeholderDiagram;

const invitationList = [ { id: 1, name: 'Rajiv & Sara', img: firstImg, description: "Lorem Ipsum..." }, /* ... */ ];
const boxSizes = [ { id: 's1', label: 'L: 50...', selected: true }, /* ... */ ];
const boxTypes = [ { id: 't1', name: 'Normal Box', diagram: boxType1Diagram, selected: true }, /* ... */ ];
const sectionOptions = [ { id: 'sec1', name: '1 Section', diagram: section1Diagram, selected: true }, /* ... */ ];

export const Invitationhome = () => {
  const { id } = useParams();
  const invitationId = parseInt(id, 10);
  const invitation = invitationList.find(item => item.id === invitationId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccessModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmitSuccess = () => {
    setIsModalOpen(false); 
    setIsSuccessModalOpen(true); 
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };


  if (!invitation) {
    return <div className="container"><p>Invitation not found!</p></div>;
  }

  return (
    <div className="invitation-details-container">
       <div className="breadcrumb"> Home  Invitation</div>

      <div className="top-section">
        <div className="image-container">
            <img src={invitation.img} alt={`${invitation.name} Invitation Box`} className="invitation-image" />
        </div>
        <div className="invitation-description">
          <h2>{invitation.name}</h2>
          <p className="description-label">Description</p>
          <p>{invitation.description}</p>
          <button className="customize-btn" onClick={handleOpenModal}>
              Customize
          </button>
        </div>
      </div>
       <div className="selection-section">
        <h4>Select Size of Box</h4>
        <div className="options-grid four-columns">
          {boxSizes.map(box => ( <div key={box.id} className={`option-box size-box ${box.selected ? 'selected' : ''}`}>...</div> ))}
        </div>
      </div>
       <div className="selection-section">
         <h4>Select Box Type</h4>
         <div className="options-grid four-columns">
          {boxTypes.map((type, index) => ( <div key={type.id} className={`option-box type-box ${type.selected ? 'selected' : ''}`}>...</div> ))}
        </div>
      </div>
       <div className="bottom-config-row">
       </div>


      <CustomizationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFormSubmitSuccess={handleFormSubmitSuccess}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};