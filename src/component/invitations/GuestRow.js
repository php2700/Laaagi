import React, { useEffect, useState } from 'react';
import deleteImg from "../../assets/add-guest/delete.png"
import editImg from "../../assets/invitations/edit.jpg"
import { DeleteGuest } from './delete-guest';
import { Link } from 'react-router-dom';

function GuestRow({ guestList, guestListData }) {
  const [openDelete, setOpenDelete] = useState(false)
  const [guestData, setGuestData] = useState();

  const handleDelete = (guest) => {
    setGuestData(guest);
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  return (
    <>
      {guestListData?.map((guest, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{guest.name}</td>
          <td>{guest.status === 'sent' ? (
            <button className="sent-request-button">Sent Request</button>
          ) : (guest?.address)}</td>
          <td>
            {guest.guestNo}
          </td>
          <td>{guest.category}</td>
          <td>
            <div className='guest-icon'>
              <Link to='/edit-guest' state={{ guestData: guest }} > <img src={editImg} /></Link>
              <img onClick={() => handleDelete(guest)} src={deleteImg} />
            </div>
          </td>
        </tr >
      ))}
      <DeleteGuest open={openDelete} handleClose={handleDeleteClose} guest={guestData} guestList={guestList} />
    </>
  );
}

export default GuestRow;