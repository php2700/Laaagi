import React from 'react';
import './GuestList.css'; // Reuse styles or create Summary.css

function Summary({ totalGuests, totalBoxes }) {
  const handlePay = () => {
    alert(`Paying for ${totalBoxes} boxes.`);
    
  };

  return (
    <div className="summary-bar">
      <div className="summary-item">Total Guest: {totalGuests}</div>
      <div className="summary-item">Total Boxes: {totalBoxes}</div>
      <button onClick={handlePay} className="action-button pay-button">
        Pay
      </button>
    </div>
  );
}

export default Summary;