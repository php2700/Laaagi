
// import React, { useState } from 'react';
// import './payment_details.css';
// import axios from 'axios';

// const PaymentDetailsModel = ({ isOpen, onClose, isAddress, isName, isPincode, isMobile, openRazorpay }) => {
//     const [name, setName] = useState();
//     const [address, setAddress] = useState();
//     const [pincode, setPincode] = useState();
//     const [mobile, setMobile] = useState();
//     const [error, setError] = useState({})

//     if (!isOpen) return null;

//     const handleContainerClick = (e) => {
//         e.stopPropagation();
//     }

//     const validate = () => {
//         const newError = {};
//         if (!name?.trim())
//             newError.name = 'name is required'
//         if (!/^[a-zA-Z\s]*$/.test(name)) {
//             newError.name = 'Only Character allowed'
//         } else if (name?.length < 3)
//             newError.name = 'min 3 character required'

//         if (!address?.trim())
//             newError.address = 'address is required'
//         else if (!/^[a-zA-Z\s0-9]*$/.test(address)) {
//             newError.address = 'Not allowed special character'
//         }
//         else if (address?.length < 3)
//             newError.address = 'min 3 character required'

//         if (!pincode?.trim())
//             newError.pincode = 'pincode is required'
//         else if (!/^[0-9]*$/.test(pincode)) {
//             newError.pincode = 'Only Number Allowed'
//         } else if (pincode?.length != 6)
//             newError.pincode = 'Please enter valid pin code.'

//         if (!mobile) {
//             newError.mobile = 'Please enter mobile.'
//         }else if(!/^[0-9]*$/.test(mobile)){
//             newError.mobile = 'Only Number Allowed'
//         }

//         setError(newError)
//         return Object.keys(newError)?.length;


//     }
//     const handleOnclose = () => {
//         setError({})
//         onClose()
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validate()) return

//         isAddress(address)
//         isPincode(pincode)
//         isName(name);
//         isMobile(mobile)
//         onClose();
//         openRazorpay()
//     };



//     return (
//         <div className="modal-overlay" onClick={handleOnclose}>
//             <div className="modal-container" onClick={handleContainerClick}>
//                 <h2 className="modal-title">Add Details</h2>
//                 <form className="modal-form" onSubmit={handleSubmit}>
//                     <div >
//                         <input type="text" placeholder="Name" className="modalinputs" value={name} onChange={(e) => {
//                             setName(e.target.value)
//                             setError((prev) => ({ ...prev, name: '' }))
//                         }} />
//                         <div className='customi-error-color'>{error?.name || ''}</div>
//                     </div>

//                     <div>
//                         <input type="text" placeholder="Address" className="modalinputs" value={address} onChange={(e) => {
//                             setError((prev) => ({ ...prev, setError, address: '' }))
//                             setAddress(e.target.value)
//                         }} />
//                         <div className='customi-error-color'>{error?.address || ''}</div>
//                     </div>
//                     <div>
//                         <input type="text" placeholder="mobile" className="modalinputs" value={mobile} onChange={(e) => {
//                             const newValue = e.target.value;
//                             if (newValue?.length <= 10) {
//                                 setMobile(newValue)
//                             }
//                             setError((prev) => ({ ...prev, setError, mobile: '' }))
//                         }} />
//                         <div className='customi-error-color'>{error?.mobile || ''}</div>
//                     </div>
//                     <div>
//                         <input type="text" placeholder="Pincode" className="modalinputs" value={pincode} onChange={(e) => {
//                             setError((prev) => ({ ...prev, setError, pincode: '' }))
//                             setPincode(e.target.value)
//                         }} />
//                         <div className='customi-error-color'>{error?.pincode || ''}</div>
//                     </div>

//                     <button type="submit" className="modal-button">Submit</button>
//                 </form>
//                 <button onClick={handleOnclose} className="modal-close">✕</button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsModel;
import React, { useState } from 'react';
import './payment_details.css';

const PaymentDetailsModel = ({ isOpen, onClose, isAddress, isName, isPincode, isMobile, openRazorpay }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState({});

    if (!isOpen) return null;

    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    const validate = () => {
        const newError = {};

        // Name: only letters and spaces
        if (!name.trim()) {
            newError.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            newError.name = 'Only letters allowed';
        } else if (name.length < 3) {
            newError.name = 'Minimum 3 characters required';
        }

        // Address: letters and numbers only
        if (!address.trim()) {
            newError.address = 'Address is required';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(address)) {
            newError.address = 'Only letters and numbers allowed';
        } else if (address.length < 3) {
            newError.address = 'Minimum 3 characters required';
        }

        // Pincode: 6 digits only
        if (!pincode.trim()) {
            newError.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(pincode)) {
            newError.pincode = 'Enter a valid 6-digit pincode';
        }

        // Mobile: 10 digits only
        if (!mobile.trim()) {
            newError.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(mobile)) {
            newError.mobile = 'Enter a valid 10-digit mobile number';
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleOnclose = () => {
        setError({});
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        isAddress(address);
        isPincode(pincode);
        isName(name);
        isMobile(mobile);
        onClose();
        openRazorpay();
    };

    return (
        <div className="modal-overlay" onClick={handleOnclose}>
            <div className="modal-container" onClick={handleContainerClick}>
                <h2 className="modal-title">Add Details</h2>
                <form className="modal-form" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="modalinputs"
                            value={name}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(val)) {
                                    setName(val);
                                    setError((prev) => ({ ...prev, name: '' }));
                                }
                            }}
                        />
                        <div className="customi-error-color">{error.name}</div>
                    </div>

                    {/* Address */}
                    <div>
                    <input
                        type="text"
                        placeholder="Address"
                        className="modalinputs"
                        value={address}
                        onChange={(e) => {
                            const val = e.target.value;
                            setAddress(val);
                            setError((prev) => ({ ...prev, address: '' }));
                        }}
                    />
                        <div className="customi-error-color">{error.address}</div>
                    </div>


                    {/* Mobile */}
                    <div>
                        <input
                            type="text"
                            placeholder="Mobile"
                            className="modalinputs"
                            value={mobile}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d{0,10}$/.test(val)) {
                                    setMobile(val);
                                    setError((prev) => ({ ...prev, mobile: '' }));
                                }
                            }}
                        />
                        <div className="customi-error-color">{error.mobile}</div>
                    </div>

                    {/* Pincode */}
                    <div>
                        <input
                            type="text"
                            placeholder="Pincode"
                            className="modalinputs"
                            value={pincode}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d{0,6}$/.test(val)) {
                                    setPincode(val);
                                    setError((prev) => ({ ...prev, pincode: '' }));
                                }
                            }}
                        />
                        <div className="customi-error-color">{error.pincode}</div>
                    </div>

                    <button type="submit" className="modal-button">Submit</button>
                </form>
                <button onClick={handleOnclose} className="modal-close">✕</button>
            </div>
        </div>
    );
};

export default PaymentDetailsModel;
