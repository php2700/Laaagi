import { useContext, useState } from "react";
import { AuthContext } from "../context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
// import GuestImg from "../../assets/add-guest/add-guest.jpg"
import GuestImg from "../../assets/add-guest/add-guestnew.jpg"

import './add-guest.css'
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";


export const Add_Guest = () => {
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const logout = context?.logout;
    const userId = localStorage.getItem('_id');
    const token = context?.token;
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [mobile, setMobile] = useState();
    const [guestNo, setGuestNo] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [openAddress, setOpenAddress] = useState(false)
    const [selectRadio, setSelectRadio] = useState()
    const [error, setError] = useState({})


    const handleAddress = (value) => {
        setSelectRadio(value)
        if (value == 'address_myself') {
            setOpenAddress(true)
        }
        else {
            setOpenAddress(false)
        }
    }

    const validate = () => {
        const newError = {};
        if (!name?.trim()) {
            newError.name = 'Name is required.'
        }
        else if (name?.length < 3) {
            newError.name = 'Min 3 character required.'
        }

        if (!guestNo) {
            newError.guestNo = 'Number of Guest is required.'
        }
        else if (!/^\d+$/.test(guestNo)) {
            newError.guestNo = 'Guestno number must contain digits only.';
        }

        if (!mobile) {
            newError.mobile = 'Mobile number is required.';
        } else if (!/^\d+$/.test(mobile)) {
            newError.mobile = 'Mobile number must contain digits only.';
        } else if (mobile.length < 10) {
            newError.mobile = 'Mobile number must be at least 10 digits.';
        } else if (mobile.length > 12) {
            newError.mobile = 'Mobile number must not exceed 12 digits.';
        }

        if (!email) {
            newError.email = 'Email is required.'
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = 'Email not valid.'
        }

        if (!category?.trim())
            newError.category = 'Category is required.'

        if (!selectRadio)
            newError.selectRadio = 'Please select address.'

        if (openAddress) {
          // Address: letters + numbers + special characters (basic)
if (!address?.trim()) {
    newError.address = 'Please add address.';
} else if (!/^[a-zA-Z0-9\s,./#@\-]*$/.test(address)) {
    newError.address = 'Only letters, numbers, and basic special characters allowed.';
} else if (address.length < 3) {
    newError.address = 'Minimum 3 characters required.';
}

            if (!pincode) {
                newError.pincode = 'Please enter pinCode.'
            } else if (!/^[0-9]+$/.test(pincode)) {
                newError.pincode = 'Only accept number.'
            } else if (!pincode?.trim()) {
                newError.pincode = 'Please enter pincode.'
            }
            else if (pincode?.length != 6) {
                newError.pincode = 'Please enter valid pincode.'
            }
        }

        setError(newError)
        return Object.keys(newError)?.length == 0;

    }
    const handleSumbit = async (e) => {
        e.preventDefault();

        const guestData = {
            userId: userId,
            name, mobile, guestNo, address,
            email, category,
            pincode
        }

        if (!validate()) {
            return
        }

        await (axios.post(`${process.env.REACT_APP_BASE_URL}api/user/add-guest`, guestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).then((res) => {
            if (selectRadio == 'address_person') {
                const linkWithToken = `${process.env.REACT_APP_URL}update-address-person?mobile=${mobile}`;
                const message = `Hi please share your address for the invitation : ${linkWithToken}`;
                const encodedMsg = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/91${mobile}?text=${encodedMsg}`;
                window.open(whatsappUrl, '_blank');
            }
            setName('')
            setEmail('')
            setAddress('')
            setGuestNo('')
            setMobile('')
            setPincode('')
            navigate('/guest/guest')
        }).catch((error) => {
            const message = error?.response?.data?.message;
            if (message == 'mobile_already_exist') {
                toast.error("Mobile Number Exist!", {
                    position: "bottom-right"
                });
            }
            else if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
        })
    }

    return (
        <div>
            <div ><img className="guestImg" src={GuestImg} /></div>
            <div className="add-guest-nav">
                <NavLink
                    to="/guest-add"
                    className={({ isActive }) => isActive ? 'nav-button add-guest-active' : 'nav-button'}
                >
                    Add Guest
                </NavLink>
                <NavLink
                    to="/guest/guest"
                    className={({ isActive }) => isActive ? 'nav-button Guest-List-active' : 'nav-button'}
                >
                    Guest List
                </NavLink>
            </div>

            <div className='add-guest-main-container'>
                <div className='form-add-guest-header'>Add Guest</div>
                <form onSubmit={handleSumbit} className='add-guest-main-div' >
                    <div className='form-guest-text-field'>
                        <div><input className="guest-input" type='text' placeholder='Person Name' value={name} onChange={(e) => {
                            const input = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(input)) {
                                setName(input);
                                setError({ ...error, name: '' });
                            }
                        }} />
                            {error?.name && (<div className='error-color'>{error?.name}</div>)}
                        </div>
                        <div><input className="guest-input" type='email' placeholder='Email' value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError({ ...error, email: '' })
                            }}

                        />
                            {error?.email && (<div className='error-color'>{error?.email}</div>)}

                        </div>
                        <div>
                            <select className='add-guest-select-option' value={category}
                                onChange={(e) => {
                                    if (e.target.value == 'Select Relation') {
                                        setCategory(category)
                                    } else {
                                        setCategory(e.target.value)
                                    }
                                    setError({ ...error, category: '' })
                                }}
                            >
                                <option value='Select Relation'>Select Relation</option>
                                <option value='Family'>Family</option>
                                <option value='Friends'>Friends</option>
                                <option value='C-worker'>Co-workers</option>
                                <option value='Neighbors'>Neighbors</option>
                            </select>
                            {error?.category && (<div className='error-color'>{error?.category}</div>)}
                        </div>
                        <div><input className="guest-input" type='text' placeholder='Whatsapp Contact Number' value={mobile}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue?.length <= 10) {
                                    setMobile(newValue)
                                }
                                setError({ ...error, mobile: '' })
                            }}
                        />
                            {error?.mobile && (<div className='error-color'>{error?.mobile}</div>)}
                        </div>
                        <div><input className="guest-input" type='text' placeholder='Total Guest Number' value={guestNo}
                            onChange={(e) => {
                                setGuestNo(e.target.value)
                                setError({ ...error, guestNo: '' })
                            }}
                        />
                            {error?.guestNo && (<div className='error-color'>{error?.guestNo}</div>)}

                        </div>
                        <div className="guest-address-radio">
                            <div>
                                <input className="radio" type='radio' name='address' value='address_myself' onChange={(e) => {
                                    handleAddress(e.target.value)
                                    setError({ ...error, selectRadio: '' })
                                }} />
                                <span className="address-myself">Add Address by my self</span>
                            </div>
                            <div>
                                <input className="radio" type='radio' name='address' value='address_person' onChange={(e) => {
                                    handleAddress(e.target.value)
                                    setError({ ...error, selectRadio: '' })
                                }} />
                                <span className="address-myself">Add Address by person itself</span>
                            </div>
                        </div>
                        {error?.selectRadio && (<div className='error-color'>{error?.selectRadio}</div>)}
                        {
                            openAddress && (<>
                                <div>
                                    <input className="guest-input" type='text' placeholder='complete Address' value={address} onChange={(e) => {
                                        setAddress(e.target.value)
                                        setError({ ...error, address: '' })
                                    }} />
                                    {error?.address && (<div className='error-color'>{error?.address}</div>)}
                                </div>
                                <div>
                                    <input className="guest-input" Number='text' placeholder='Pin Code' value={pincode} onChange={(e) => {
                                        setPincode(e.target.value)
                                        setError({ ...error, pincode: '' })
                                    }} />
                                    {error?.pincode && (<div className='error-color'>{error?.pincode}</div>)}
                                </div>
                            </>)
                        }
                        <div>
                            <span className="note">Note :</span>
                            <span>We will send address request to your guest via email/whatsapp</span>
                        </div>
                    </div>
                    <div className='form-add-guest-header'><button type='submit'>Save</button></div>
                </form>
            </div>
        </div>
    )
}