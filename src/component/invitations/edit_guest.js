import { useContext, useState } from "react";
import { AuthContext } from "../context";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import GuestImg from "../../assets/add-guest/add-guest.jpg"
import './add-guest.css'

export const Edit_Guest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const guestData = location?.state?.guestData;
    console.log(guestData, 'guestData')
    const context = useContext(AuthContext)
    const logout = context?.logout;
    const userId = localStorage.getItem('_id');
    const token = context?.token;
    const [name, setName] = useState(guestData?.name);
    const [category, setCategory] = useState(guestData?.category);
    const [mobile, setMobile] = useState(guestData?.mobile);
    const [guestNo, setGuestNo] = useState(guestData?.guestNo);
    const [email, setEmail] = useState(guestData?.email);
    const [address, setAddress] = useState(guestData?.address);
    const [pincode, setPincode] = useState(guestData?.pincode);
    const [openAddress, setOpenAddress] = useState(false)
    const [_id, setId] = useState(guestData?._id)
    const [error, setError] = useState({})


    const handleAddress = (value) => {
        if (value == 'address_myself') {
            setOpenAddress(true)
        }
        else { setOpenAddress(false) }
    }


    const validate = () => {
        const newError = {};
        if (!name?.trim()) {
            newError.name = 'Name is required'
        }
        else if (name?.length < 3) {
            newError.name = 'Min 3 character required'
        }

        if (!guestNo) {
            newError.guestNo = 'Guest No is required'
        }
        else if (!/^\d+$/.test(guestNo)) {
            newError.guestNo = 'GuestNo number must contain digits only';
        }

        if (!mobile) {
            newError.mobile = 'Mobile number is required*';
        } else if (!/^\d+$/.test(mobile)) {
            newError.mobile = 'Mobile number must contain digits only';
        } else if (mobile.length < 10) {
            newError.mobile = 'Mobile number must be at least 10 digits';
        } else if (mobile.length > 12) {
            newError.mobile = 'Mobile number must not exceed 12 digits';
        }

        if (!email) {
            newError.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = 'Email not valid'
        }

        if (!category?.trim())
            newError.category = 'Category is required'

        if (!address?.trim())
            newError.address = 'Address is required'

        if (!pincode?.trim())
            newError.pincode = 'Pincode is required'


        setError(newError)
        return Object.keys(newError)?.length == 0;

    }

    const handleSumbit = async (e) => {
        e.preventDefault();

        const guestData = {
            _id: _id,
            name, mobile, guestNo, address,
            email, category,
            pincode
        }


        if (!validate()) {
            return
        }

        await (axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/edit-guest`, guestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).then((res) => {
            setName('')
            setEmail('')
            setAddress('')
            setGuestNo('')
            setMobile('')
            setPincode('')
            navigate('/guest')
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error);
        })
    }
    return (
        <div>
            <div ><img className="guestImg" src={GuestImg} /></div>
            <div className="add-guest-nav">
                <div className="add-guest"><Link to='/guest-add'>Add Guest</Link></div>
                <div className="guest-list"><Link to='/guest'>Guest List</Link></div>
            </div>
            <div className='add-guest-main-container'>
                <div className='form-add-guest-header'>Edit Guest</div>
                <form onSubmit={handleSumbit} className='add-guest-main-div' >
                    <div className='form-guest-text-field'>
                        <div>
                            <input className="guest-input" type='text' placeholder='Person Name' value={name} onChange={(e) => {
                                const input = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setName(input);
                                }
                            }} />
                            {error?.name && (<div className='error-color'>{error?.name}</div>)}
                        </div>
                        <div>
                            <input className="guest-input" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            {error?.email && (<div className='error-color'>{error?.email}</div>)}
                        </div>
                        <div>
                            <select className='add-guest-select-option' value={category} onChange={(e) => setCategory(e.target.value)} >
                                <option disabled>Select Relation</option>
                                <option value='family'>Family</option>
                                <option value='friends'>Friends</option>
                                <option value='co-worker'>Co-workers</option>
                                <option value='neighbors'>Neighbors</option>
                            </select>
                            {error?.category && (<div className='error-color'>{error?.category}</div>)}
                        </div>
                        <div>
                            <input className="guest-input" type='text' placeholder='Whatsapp Contact Number' value={mobile} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue?.length <= 10) {
                                    setMobile(newValue)
                                }
                            }} />
                            {error?.mobile && (<div className='error-color'>{error?.mobile}</div>)}

                        </div>
                        <div>
                            <input className="guest-input" type='text' placeholder='Total Guest Number' value={guestNo} onChange={(e) => setGuestNo(e.target.value)} />
                            {error?.guestNo && (<div className='error-color'>{error?.guestNo}</div>)}

                        </div>
                        {/* <div className="guest-address-radio">
                            <div><input type='radio' name='address' value='address_myself' onChange={(e) => handleAddress(e.target.value)} />Add Address by my self</div>
                            <div><input type='radio' name='address' value='address_person' onChange={(e) => handleAddress(e.target.value)} />Add Address by person itself</div>
                        </div> */}
                        <div>
                            <input className="guest-input" type='text' placeholder='complete Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            {error?.address && (<div className='error-color'>{error?.address}</div>)}
                        </div>
                        <div>
                            <input className="guest-input" Number='text' placeholder='Pin Code' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            {error?.pincode && (<div className='error-color'>{error?.pincode}</div>)}
                        </div>
                    </div>
                    <div className='form-add-guest-header'><button type='submit'>Edit</button></div>
                </form>
            </div>
        </div>
    )
}