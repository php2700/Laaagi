import React from 'react';

function GuestRow({ guest, index }) {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{index + 1}</td>
      <td>{guest.name}</td>
      <td>{guest.address}</td>
      <td>
        {guest.status === 'sent' ? (
          <button className="sent-request-button">Sent Request</button>
        ) : (
          guest.guestNumber
        )}
      </td>
      <td>{guest.category}</td>
      <td>{guest.boxesQuantity}</td>
    </tr>
  );
}

export default GuestRow;