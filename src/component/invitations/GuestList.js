import React, { useContext, useEffect, useState } from 'react';
import './GuestList.css';
import GuestRow from './GuestRow';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

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

export const GuestList = ({ open = false }) => {
  const content = useContext(AuthContext)
  const userId = localStorage.getItem('_id');
  const token = content?.token;
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [mobile, setMobile] = useState();
  const [guestNo, setGuestNo] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [guestList, setGuestList] = useState([]);

  const [guests, setGuests] = useState(initialGuests);
  const totalGuests = guests.reduce((sum, guest) => sum + (guest.guestNumber || 0), 0);
  const totalBoxes = guests.reduce((sum, guest) => sum + (guest.boxesQuantity || 0), 0);

  const getGuestList = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}api/user/guest-list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res?.data?.guestList, 'aaaaaaaa')
      setGuestList(res?.data?.guestList)
      console.log(res?.data?.guestList)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getGuestList()
  }, [])

  const handleSumbit = async (e) => {
    e.preventDefault();

    const guestData = {
      userId: userId,
      name, mobile, guestNo, address,
      email, category
    }

    await (axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-guest`, guestData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).then((res) => {
      setName('')
      setEmail('')
      setAddress('')
      setGuestNo('')
      setMobile('')
      getGuestList()
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <div className="guest-list-container">
        <div className="guest-list-header">

          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
          {open ? <>
            <Link to='/add-guest' className="add-guest-button">+ Add My Address</Link>
          </> :
            <Link to='/add-guest' className="add-guest-button">+ Add Guest</Link>
          }
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{!open && <input type="checkbox" />}</th>
                <th>'#'</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>GUEST NUMBER</th>
                <th>CATEGORIES</th>
                {
                  !open ? <th>Boxes quantity</th> : <th>Action</th>
                }
              </tr>
            </thead>
            <tbody>
              {guestList?.map((guest, index) => (
                <GuestRow key={index} guest={guest} index={index} open={open} />
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
        {!open && <>
          <div className="pay-button-container">
            <button className="pay-button">Pay</button>
          </div>
          <div className="pay-button-container">
            Total Price:25000 /-
          </div>
        </>}
      </div>
      {open && (
        <div className='add-guest-main-container'>
          <div className='form-add-guest-header'>Add Guest</div>
          <form onSubmit={handleSumbit} className='add-guest-main-div' >
            <div className='form-guest-text-field'>
              <div><input type='text' placeholder='Person Name' value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div>
                <select className='add-guest-select-option' value={category} onChange={(e) => setCategory(e.target.value)} >
                  <option disabled>Select Relation</option>
                  <option value='family'>Family</option>
                  <option value='friends'>Friends</option>
                  <option value='co-worker'>Co-workers</option>
                  <option value='neighbors'>Neighbors</option>
                </select>
              </div>
            </div>
            <div className='form-guest-text-field'>
              <div><input type='Number' placeholder='Contact Number' value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
              <div><input type='text' placeholder='address' /></div>
            </div>
            <div className='form-guest-text-field'>
              <div><input type='Number' placeholder='Total Guest Number' value={guestNo} onChange={(e) => setGuestNo(e.target.value)} /></div>
              <div><input type='text' placeholder='Complete Address' value={address} onChange={(e) => setAddress(e.target.value)} /></div>
            </div>
            <div className='form-guest-text-field'>
              <div><input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><input type='text' placeholder='Google Address' /></div>
            </div>
            <div className='form-add-guest-header'><button type='submit'>Save</button></div>
          </form>
        </div>
      )}

    </>
  );
}

