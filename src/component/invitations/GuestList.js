import React, { useState } from 'react';
import './GuestList.css'; 
import GuestRow from './GuestRow'; 

const initialGuests = [
  { id: 1, name: 'Ann Culhane', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 5, category: 'Family', boxesQuantity: 1, status: null },
  { id: 2, name: 'Ahmad Rosser', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 4, category: 'Friends', boxesQuantity: 1, status: null },
  { id: 3, name: 'Zain Calzoni', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 6, category: 'Co-Workers', boxesQuantity: 1, status: 'sent' },
  { id: 4, name: 'Leo Stanton', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 3, category: 'Neighbors', boxesQuantity: 1, status: null },
  { id: 5, name: 'Kaiya Vetrovs', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 5, category: 'Friends', boxesQuantity: 1, status: null },
  { id: 6, name: 'Ryan Westervelt', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 8, category: 'Co-Workers', boxesQuantity: 1, status: 'sent' },
  { id: 7, name: 'Corey Stanton', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 7, category: 'Neighbors', boxesQuantity: 1, status: null },
  { id: 8, name: 'Adison Aminoff', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 3, category: 'Family', boxesQuantity: 1, status: null },
  { id: 9, name: 'Alfredo Aminoff', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 5, category: 'Friends', boxesQuantity: 1, status: 'sent' },
  { id: 10, name: 'Allison Botosh', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', guestNumber: 6, category: 'Neighbors', boxesQuantity: 1, status: null },
];

function GuestList() {
  const [guests, setGuests] = useState(initialGuests);

  const totalGuests = guests.reduce((sum, guest) => sum + (guest.guestNumber || 0), 0); // Sent request वालों को 0 मानें या जैसा चाहें हैंडल करें
  const totalBoxes = guests.reduce((sum, guest) => sum + (guest.boxesQuantity || 0), 0);

  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
        />
        <button className="add-guest-button">+ Add Guest</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>#</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>GUEST NUMBER</th>
              <th>CATEGORIES</th>
              <th>Boxes quantity</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <GuestRow key={guest.id} guest={guest} index={index} />
            ))}
          </tbody>
        </table>
      </div>

       <div className="my-address-section">
         <div className="my-address-row">
            <div><input type="checkbox" /></div>
            <div>My Address</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</div>
         </div>
       </div>

       <div className="shipping-info">
          <div>Extra Shipping Charges ₹49 per box</div>
          <div>Extra Shipping Charges ₹20 per box</div>
       </div>


      <div className="totals-bar">
        <span>Total Guest: {totalGuests}</span>
        <span>Total Boxes: {totalBoxes}</span>
      </div>

      <div className="pay-button-container">
        <button className="pay-button">Pay</button>
      </div>

       <div className="footer-links">
         <a href="#">Useful links</a>
         <a href="#">Help Center</a>
       </div>
    </div>
  );
}

export default GuestList;