
import React, { useState } from 'react';
import './payment_details.css';
import axios from 'axios';

const PaymentDetailsModel = ({ isOpen, onClose, isAddress, isName, isPincode, openRazorpay }) => {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [error, setError] = useState({})

    if (!isOpen) return null;

    const handleContainerClick = (e) => {
        e.stopPropagation();
    }

    const validate = () => {
        const newError = {};
        if (!name?.trim())
            newError.name = 'name is required'
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            newError.name = 'Only Character allowed'
        } else if (name?.length < 3)
            newError.name = 'min 3 character required'

        if (!address?.trim())
            newError.address = 'address is required'
        else if (!/^[a-zA-Z\s0-9]*$/.test(address)) {
            newError.address = 'Not allowed special character'
        }
        else if (address?.length < 3)
            newError.address = 'min 3 character required'

        if (!pincode?.trim())
            newError.pincode = 'pincode is required'
        else if (!/^[0-9]*$/.test(pincode)) {
            newError.pincode = 'Only Number Allowed'
        } else if (pincode?.length < 6)
            newError.pincode = 'min 6 character required'

        setError(newError)
        return Object.keys(newError)?.length;


    }
    const handleOnclose = () => {
        setError({})
        onClose()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) return

        isAddress(address)
        isPincode(pincode)
        isName(name);
        onClose();
        openRazorpay()
    };



    return (
        <div className="modal-overlay" onClick={handleOnclose}>
            <div className="modal-container" onClick={handleContainerClick}>
                <h2 className="modal-title">Add Details</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div >
                        <input type="text" placeholder="Name" className="modalinputs" value={name} onChange={(e) => {
                            setName(e.target.value)
                            setError((prev) => ({ ...prev, name: '' }))
                        }} />
                        <div className='customi-error-color'>{error?.name || ''}</div>
                    </div>

                    <div>
                        <input type="text" placeholder="Address" className="modalinputs" value={address} onChange={(e) => {
                            setError((prev) => ({ ...prev, setError, address: '' }))
                            setAddress(e.target.value)
                        }} />
                        <div className='customi-error-color'>{error?.address || ''}</div>
                    </div>
                    <div>
                        <input type="text" placeholder="Pincode" className="modalinputs" value={pincode} onChange={(e) => {
                            setError((prev) => ({ ...prev, setError, pincode: '' }))
                            setPincode(e.target.value)
                        }} />
                        <div className='customi-error-color'>{error?.pincode || ''}</div>
                    </div>

                    <button type="submit" className="modal-button">Submit</button>
                </form>
                <button onClick={handleOnclose} className="modal-close">✕</button>
            </div>
        </div>
    );
};

export default PaymentDetailsModel;