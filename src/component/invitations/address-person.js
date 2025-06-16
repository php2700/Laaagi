import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import './add-guest.css'
import { toast } from "react-toastify";



export const Add_Address_Person = () => {
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [error, setError] = useState({})


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mobileFromUrl = params.get('mobile');
        if (mobileFromUrl) setMobile(mobileFromUrl);
    }, []);

    const validate = () => {
        const newError = {};

        if (!address) {
            newError.address = 'Please add address'
        } else if (!address?.trim()) {
            newError.address = 'Please add address.'
        }

        if (!pincode) {
            newError.pincode = 'Please enter pinCode.'
        } else if (!/^[0-9]+$/.test(pincode)) {
            newError.pincode = 'Only accept number.'
        } else if (!pincode?.trim()) {
            newError.pincode = 'Please enter pinCode.'
        }
        else if (pincode?.length != 6) {
            newError.pincode = 'Please enter valid pincode.'
        }

        setError(newError)
        return Object.keys(newError)?.length == 0;

    }
    const handleSumbit = async (e) => {
        e.preventDefault();

        const guestData = {
            mobile, address,
            pincode
        }

        if (!validate()) {
            return
        }

        await (axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/update-address-person`, guestData, {
        })).then((res) => {
            setAddress('')
            setMobile('')
            setPincode('')
            toast.success("Address updated!", {
                position: "top-right"
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>

            <div className='add-guest-main-container'>
                <div className='form-add-guest-header'>Add Address</div>
                <form onSubmit={handleSumbit} className='add-guest-main-div' >
                    <div className='form-guest-text-field'>
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
                    <div className='form-add-guest-header'><button type='submit'>Update</button></div>
                </form>
            </div>
        </div>
    )
}