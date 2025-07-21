import { useContext, useEffect, useState } from 'react';
import './GuestList.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';
import { Payment } from '../payment';
import { toast } from 'react-toastify';


export const GuestList = () => {
  let { total } = useParams();
  const context = useContext(AuthContext);
  const logout = context?.logout;
  const paymentHistory = context?.paymentHistory;
  // const userData = context?.storeUserData;
  const id = localStorage.getItem('_id');
  const totalAmountPerBox = total;
  const [userId, setUserId] = useState(id);
  const token = context?.token || localStorage.getItem("token")
  const [guestList, setGuestList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([])
  const [boxes, setBoxes] = useState([])
  const [totalbox, setTotalBox] = useState();
  const [totalGuest, setTotalGuest] = useState()
  const [userBox, setUserBox] = useState(1);
  const [isUserAddressChecked, setIsUserAddressChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [searchText, setSearchText] = useState();
  const [openRazorpay, setOpenRazorPay] = useState(false)
  const [guest, setGuest] = useState([])
  const [userData, setUserData] = useState({})

  const getGuestList = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/guest-list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchText
      }
    }).then((res) => {
      setGuestList(res?.data?.guestList)
      console.log(res?.data?.guestList, '555888877777')
    }).catch((error) => {
      if (error?.response?.data?.Message === 'jwt expired') {
        logout()
      }
      console.log(error)
    })
  };


  const getUserData = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((res) => {
      setUserData(res?.data?.userData)
    }).catch((error) => {
      if (error?.response?.data?.Message === 'jwt expired') {
        logout()
      }
      console.log(error)
    })
  };


  useEffect(() => {
    getGuestList()
  }, [searchText, userId])

  useEffect(() => {
    getUserData()
  }, [userId, searchText])

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
    console.log("2222222222222")
    countFun();
  }, [checkedItems, boxes, isUserAddressChecked, userBox]);

  useEffect(() => {

    const updatedGuest = checkedItems.map((item) => {
      const box = boxes.find((b) => b.idx === item.idx);
      const quantity = box?.quantity || 1;

      const existing = guest.find((g) => g.idx == item.idx);
      return {
        idx: item.idx,
        guestId: existing?.guestId || '',
        quantity,
        name: existing?.name || '',
        address: existing?.address || '',
        pincode: existing?.pincode || '',
        mobile: existing?.mobile || ''
      };
    });
    const userGuest = guest.find((g) => g.guestId === userId);
    if (userGuest) {
      setGuest([...updatedGuest, userGuest]);
    } else {
      setGuest(updatedGuest);
    }
    // setGuest(updatedGuest);
  }, [boxes, checkedItems]);


  const handleChecked = (index, guestData) => {

    const isExist = checkedItems?.some((ele) => (ele?.idx == index))
    if (isExist) {
      setCheckedItems(checkedItems.filter((ele) => (ele?.idx) != index))
    } else {
      const checkedData = (boxes.filter((ele) => ele.idx == index))
      setCheckedItems([...checkedItems, { idx: index, quantity: checkedData[0]?.quantity || 1 }])
    }
    const isGuestExist = guest?.some((item) => item.idx === index);
    if (isGuestExist) {
      setGuest(guest.filter((item) => item.idx !== index));
    } else {
      const checkedBox = boxes.find((ele) => ele.idx === index);
      const quantity = checkedBox?.quantity || 1;
      setGuest([...guest, {
        idx: index, guestId: guestData._id,
        name: guestData.name,
        address: guestData.address,
        quantity,
        pincode: guestData?.pincode || '',
        mobile: guestData?.mobile || ''
      }]);
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

  useEffect(() => {
    handleCheckUser(isUserAddressChecked)
  }, [userBox])

  const handleCheckUser = (isChecked) => {
    if (isChecked) {
      setIsUserAddressChecked(true);

      setGuest((prevGuest) => {
        const isAlreadyAdded = prevGuest.some((ele) => ele.guestId === userId);
        if (isAlreadyAdded) {
          return prevGuest?.map((ele) =>
            ele.guestId === userId
              ? { ...ele, quantity: userBox }
              : ele
          );
        } else {
          return [...prevGuest, { guestId: userId, quantity: userBox, idx: userId, name: userData?.name, address: userData?.address, pincode: userData?.pincode, mobile: userData?.mobile }];
        }
      });
    }
    else {
      setIsUserAddressChecked(false)
      setGuest(guest?.filter((ele) => ele.guestId != userId) || []);
    }
  }

  console.log(guest, "ddddddd")

  const handlePayment = () => {
    if (!paymentHistory?.length) {
      toast.error("Your data have been lose please Select One more time  !", {
        position: 'bottom-right'
      })
      return
    }
    if (!guest?.length) {
      toast.error("Please Select User !", {
        position: 'bottom-right'
      })
      return
    }

    setOpenRazorPay(false)
    setTimeout(() => {
      setOpenRazorPay(true)
    }, 50);
  }

  console.log(guest, 'aaaaaaaaaa+')

  const getcontact = async () => {
    await axios.get(
      'https://people.googleapis.com/v1/people/me/connections',
      {
        params: {
          personFields: 'names,emailAddresses,phoneNumbers',
        },
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    ).then((res) => {
      console.log(res.data, '3333333333333')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={getcontact}>import contact</button>
        <Link to='/guest' className="add-guest-button">+ add Guest</Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className='guest-hash'>'#'</th>
              <th className='guest-no'>No.</th>
              <th className='guest-name'>NAME</th>
              <th className='guest-address'>ADDRESS</th>
              <th className='number-guest'>GUEST NUMBER</th>
              <th className='category-guest'>CATEGORIES</th>
              <th className='guest-quantity'>Boxes quantity</th>
            </tr>
          </thead>
          <tbody>
            {guestList?.map((guest, index) => (
              <tr key={guest._id || index}>
                <td className='guest-hash'>
                  {
                    guest.address ? <input type="checkbox" onChange={() => { handleChecked(index, guest) }} /> :
                      <input type="checkbox" disabled />
                  }
                  {/* <input type="checkbox" onChange={() => { handleChecked(index, guest) }} /> */}
                </td>
                <td className='guest-no'>{index + 1}</td>
                <td className='guest-name'>{guest.name}</td>
                <td className='guest-address'>{!guest.address ? (
                  <button className="sent-request-button">Sent Request</button>
                ) : (guest?.address)}</td>
                <td className='number-guest'>
                  {guest.guestNo}
                </td>
                <td className='category-guest'>{guest.category}</td>
                <td className='guest-quantity'>
                  <input type='text' className='invite-guest-list' value={boxes.find((ele) => ele.idx === index)?.quantity || 1} onChange={(e) => {
                    const isNumber = e.target.value;
                    if (/^\d*$/.test(isNumber)) {
                      handleBox(isNumber, index)
                    }
                  }} />
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
          <div>
            {userData?.address ?
              <input type="checkbox" checked={isUserAddressChecked} onChange={(e) => handleCheckUser(e.target.checked)} />
              :
              <input type="checkbox" disabled />
            }
          </div>
          <div>My Address</div>
          {userData?.address && <div>{userData?.address}</div>}

        </div>
        <div>
          <input type='text' className='my-address-text' value={userBox} onChange={(e) => {
            const isNumber = e.target.value;
            if (/^\d+$/.test(isNumber)) {
              handleUser(isNumber)
            }
          }} />

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
        <button className="pay-button" onClick={handlePayment}>Pay</button>
      </div>
      <div className="pay-button-container">
        Total Price:{totalPrice} /-
      </div>
      {openRazorpay && <  Payment amount={totalPrice} guest={guest} userId={userId} />}
    </div>
  );
}

