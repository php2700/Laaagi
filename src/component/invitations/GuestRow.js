import React from 'react';
import deleteImg from "../../assets/add-guest/delete.png"

function GuestRow({ guest, index, open }) {
  return (
    <tr>
      <td>{!open && <input type="checkbox" />}</td>
      <td>{index + 1}</td>
      <td>{guest.name}</td>
      <td>{guest.status === 'sent' ? (
        <button className="sent-request-button">Sent Request</button>
      ) : (guest?.address)}</td>
      <td>
        {guest.guestNo}
      </td>
      <td>{guest.category}</td>
      <td>{open ? <img src={deleteImg} /> : 1}</td>
    </tr>
  );
}

export default GuestRow;