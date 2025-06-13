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

  const sentRequest = (guest) => {
    try {
      if (guest?.mobile) {
        const linkWithToken = `${process.env.REACT_APP_URL}update-address-person?mobile=${guest?.mobile}`;
        const message = `Hi please share your address for the invitation : ${linkWithToken}`;
        const encodedMsg = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/91${guest?.mobile}?text=${encodedMsg}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.log(error, "fffffff")
    }
  }

  return (
    <>
      {guestListData?.map((guest, index) => (
        <tr>
          <td className='ids'>{index + 1}</td>
          <td className='ths-name'>{guest.name}</td>
          <td className='ths-address'>{!guest.address ? (
            <button className="sent-request-button" onClick={() => sentRequest(guest)} >Sent Request</button>
          ) : (guest?.address)}</td>
          <td className='guest-number'>
            {guest.guestNo}
          </td>
          <td className='guest-category'>{guest.category}</td>
          <td>
            <div className='guest-icon'>
              <Link to='/edit-guest' state={{ guestData: guest }} > <img src={editImg} /></Link>
              <img className='delete-icon-guest' onClick={() => handleDelete(guest)} src={deleteImg} />
            </div>
          </td>
        </tr >
      ))}
      <DeleteGuest open={openDelete} handleClose={handleDeleteClose} guest={guestData} guestList={guestList} />
    </>
  );
}

export default GuestRow;