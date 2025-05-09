import { useContext, useState } from "react";
import { AuthContext } from "../context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import GuestImg from "../../assets/add-guest/add-guest.jpg"
import './add-guest.css'
// import {AddAddressModal} from "./AddAddressModal.jsx";

export const Add_Guest = () => {
    const navigate = useNavigate()
    const content = useContext(AuthContext)
    const userId = localStorage.getItem('_id');
    const token = content?.token;
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [mobile, setMobile] = useState();
    const [guestNo, setGuestNo] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [openAddress, setOpenAddress] = useState(false)

    const handleAddress = (value) => {
        if (value == 'address_myself') {
            setOpenAddress(true)
        }
        else { setOpenAddress(false) }
    }


    // const validate = () => {
    //     const newError = {};
    //     if (!name?.trim())
    //       newError.name = 'Name is required'
    //     else if (name?.length < 3)
    //       newError.name = 'min 3 character required'
    
    //     if (!guestNo)
    //       newError.guestNo = 'guest No is required'
       
    
    //     if (!mobile) {
    //       newError.mobile = 'Mobile number is required*';
    //     } else if (!/^\d+$/.test(mobile)) {
    //       newError.mobile = 'Mobile number must contain digits only';
    //     } else if (mobile.length < 10) {
    //       newError.mobile = 'Mobile number must be at least 10 digits';
    //     } else if (mobile.length > 12) {
    //       newError.mobile = 'Mobile number must not exceed 12 digits';
    //     }
    
    //     if (!message?.trim())
    //       newError.message = 'Messsage is required'
    //     else if (message?.length < 3)
    //       newError.message = 'min 10 character required'
    
    
    //     setError(newError)
    //     return Object.keys(newError)?.length;
    
    
    //   }

    const handleSumbit = async (e) => {
        e.preventDefault();

        const guestData = {
            userId: userId,
            name, mobile, guestNo, address,
            email, category,
            pincode
        }

        // if (validate()) return

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
            setPincode('')
            navigate('/guest')
        }).catch((error) => {
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
                <div className='form-add-guest-header'>Add Guest</div>
                <form onSubmit={handleSumbit} className='add-guest-main-div' >
                    <div className='form-guest-text-field'>
                        <div><input className="guest-input" type='text' placeholder='Person Name' value={name} onChange={(e) => setName(e.target.value)} /></div>
                        <div><input className="guest-input" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div>
                            <select className='add-guest-select-option' value={category} onChange={(e) => setCategory(e.target.value)} >
                                <option disabled>Select Relation</option>
                                <option value='family'>Family</option>
                                <option value='friends'>Friends</option>
                                <option value='co-worker'>Co-workers</option>
                                <option value='neighbors'>Neighbors</option>
                            </select>
                        </div>
                        <div><input className="guest-input" type='Number' placeholder='Whatsapp Contact Number' value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
                        <div><input className="guest-input" type='Number' placeholder='Total Guest Number' value={guestNo} onChange={(e) => setGuestNo(e.target.value)} /></div>
                        <div className="guest-address-radio">
                            <div><input type='radio' name='address' value='address_myself' onChange={(e) => handleAddress(e.target.value)} />Add Address by my self</div>
                            <div><input type='radio' name='address' value='address_person' onChange={(e) => handleAddress(e.target.value)} />Add Address by person itself</div>
                        </div>
                        {
                            openAddress && (<>
                                <div><input className="guest-input" type='text' placeholder='complete Address' value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                                <div><input className="guest-input" Number='text' placeholder='Pin Code' value={pincode} onChange={(e) => setPincode(e.target.value)} /></div>
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