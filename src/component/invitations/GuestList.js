import React, { useContext, useEffect, useState } from 'react';
import './GuestList.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

export const GuestList = () => {
  const total = useLocation();
  const totalAmountPerBox = total?.state.amount;
  console.log(totalAmountPerBox)
  const content = useContext(AuthContext)
  const userId = localStorage.getItem('_id');
  const token = content?.token;
  const [guestList, setGuestList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([])
  const [boxes, setBoxes] = useState([])
  const [totalbox, setTotalBox] = useState();
  const [totalGuest, setTotalGuest] = useState()
  const [userBox, setUserBox] = useState();
  const [isUserAddressChecked, setIsUserAddressChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState();

  const getGuestList = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/guest-list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setGuestList(res?.data?.guestList)
      console.log(res?.data?.guestList)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getGuestList()
  }, [])

  const countFun = () => {
    const countBox = checkedItems?.reduce((ele1, ele2) => ele1 + Number(ele2?.quantity), 0);
    const countGuest = checkedItems?.length;
    let total = countBox;
    let price = totalAmountPerBox * countBox + 49 * countBox;
    if (isUserAddressChecked && userBox) {
      total += Number(userBox);
      price += Number(20 * userBox + totalAmountPerBox * userBox)
    }
    setTotalBox(total);
    setTotalGuest(countGuest);
    setTotalPrice(price)
  };

  useEffect(() => {
    countFun();
  }, [checkedItems, boxes, isUserAddressChecked, userBox]);


  const handleChecked = (index) => {
    const isExist = checkedItems?.some((ele) => (ele?.idx == index))
    if (isExist) {
      setCheckedItems(checkedItems.filter((ele) => (ele?.idx) != index))
    } else {
      const checkedData = (boxes.filter((ele) => ele.idx == index))
      setCheckedItems([...checkedItems, { idx: index, quantity: checkedData[0]?.quantity || 1 }])
    }
  }
  const handleBox = (value, index) => {
    const isExist = boxes.some((ele) => ele.idx == index)

    const isCheckedExist = checkedItems.some((ele) => ele.idx === index);
    if (isCheckedExist)
      setCheckedItems(
        checkedItems.map((ele) =>
          ele.idx === index ? { ...ele, quantity: value } : ele
        )
      );

    if (isExist) {
      setBoxes(
        boxes.map((ele) =>
          ele.idx == index ? { ...ele, quantity: value } : ele
        )
      );
    } else {
      setBoxes([...boxes, { idx: index, quantity: value }])
    }
  }

  const handleUser = (boxes) => {
    setUserBox(boxes);
  }

  const handleCheckUser = (isChecked) => {
    if (isChecked) {
      setIsUserAddressChecked(true)
    }
    else {
      setIsUserAddressChecked(false)
    }
  }
  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
        />
        <Link to='/add-guest' className="add-guest-button">+ Add Guest</Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th> <input type="checkbox" /></th>
              <th>'#'</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>GUEST NUMBER</th>
              <th>CATEGORIES</th>
              <th>Boxes quantity</th>
            </tr>
          </thead>
          <tbody>
            {guestList?.map((guest, index) => (
              <tr key={guest._id || index}>
                <td><input type="checkbox" onChange={() => { handleChecked(index) }} /></td>
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
                  <input type='Number' className='invite-guest-list' value={boxes.find((ele) => ele.idx === index)?.quantity || 1} onChange={(e) => handleBox(e.target.value, index)} />
                </td>
              </tr >
            ))}
          </tbody>
        </table>
      </div>
      <div className="shipping-info">
        <div>Extra Shipping Charges ₹49 per box</div>
      </div>
      <div className="my-address-section">
        <div className="my-address-row">
          <div><input type="checkbox" checked={isUserAddressChecked} onChange={(e) => handleCheckUser(e.target.checked)} /></div>
          <div>My Address</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</div>

        </div>
        <div>
          <input type='Number' className='my-address-text' value={userBox} onChange={(e) => handleUser(e.target.value)} />
        </div>
      </div>
      <div className="shipping-info">
        <div>Extra Shipping Charges ₹20 per box</div>
      </div>
      <div className="totals-bar">
        <span>Total Guest:{totalGuest} </span>
        <span>Total Boxes:{totalbox} </span>
      </div>
      <div className="pay-button-container">
        <button className="pay-button">Pay</button>
      </div>
      <div className="pay-button-container">
        Total Price:{totalPrice} /-
      </div>
    </div>
  );
}

