import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import './model.css';


export const Model = ({ open, onClose, data }) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [mobile, setMobile] = useState()
    const [message, setMessage] = useState();
    const [decorationId, setDecorationId] = useState()
    const [error, setError] = useState({})

    const validate = () => {
        let newError = {};

        if (!name?.trim()) {
            newError.name = 'First name is required.'
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
            newError.name = 'Enter valid name.'
        }
        else if (name?.length < 3) {
            newError.name = 'Minimum 3 character required.'
        }
        if (!lastName?.trim()) {
            newError.lastName = 'Last name is required.'
        }else if (!/^[a-zA-Z\s]*$/.test(lastName)) {
            newError.lastName = 'Enter valid name.'
        } else if (lastName?.length < 3) {
            newError.lastName = 'Minimum 3 character required.'
        }
        if (!email) {
            newError.email = 'Email is required.'
        } else if  (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            newError.email = 'Email not valid.'
        }

        if (!message?.trim()) {
            newError.message = 'Message is required.'
        } else if (message?.length < 3) {
            newError.message = 'Minimum 5 character required.'
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

        setError(newError);
        return (Object.keys(newError))?.length;
    }

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            return;
        }

        const quoteData = {
            decorationId: data?._id,
            firstName: name,
            lastName: lastName,
            email: email,
            mobile: mobile,
            message: message
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/quote`, quoteData)
            .then((res) => {
                setName("")
                setEmail("")
                setLastName("")
                setMobile("")
                setMessage("")
                setDecorationId("")
                onClose()
                toast.success("Message sent successfully!", {
                    position: "top-right"
                });
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleClose = () => {
        setName('')
        setLastName('')
        setEmail('')
        setMobile('')
        setMessage('')
        setError({ ...error, name: '', lastName: '', email: '', mobile: '', message: '' })
        onClose()
    }

    return (
        <div className="decoration-model-overlay" onClick={handleClose}>
            <div className='des-decoration-model' onClick={(e) => e.stopPropagation()}>
                <div className='close-decoration-model'>
                    <button onClick={handleClose}>X</button>
                </div>
                <div>
                    <div className='decoration-model-text'>Get Quote with Laaagi</div>
                </div>
                <div className='decoration-model-form-model-container' >
                    <form className='decoration-model-form' onSubmit={handleSubmit}>
                        <div className='decoration-model-name'>
                            <div>
                                <input type="text" placeholder="First Name*" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                    setError({ ...error, name: '' })
                                }} />
                                <div className='error-color'>{error?.name || ''}</div>
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name*" value={lastName} onChange={(e) => {
                                    setLastName(e.target.value)
                                    setError({ ...error, lastName: '' })
                                }} />
                                <div className='error-color'>{error?.lastName || ''}</div>
                            </div>
                        </div>
                        <div>
                            <input type="email" placeholder="Email*" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                                setError({ ...error, email: '' })
                            }} />
                            <div className='error-color'>{error?.email || ''}</div>
                        </div>
                        <div>
                            <input type="text" placeholder="Mobile Number*" value={mobile} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue?.length <= 10) {
                                    setMobile(newValue)
                                }
                                setError({ ...error, mobile: '' })
                            }} />
                            <div className='error-color'>{error?.mobile || ''}</div>
                        </div>
                        <div>
                            <textarea className='decoration-model-desc' placeholder="Your Message" value={message} onChange={(e) => {
                                setMessage(e.target.value)
                                setError({ ...error, message: '' })
                            }} />
                            <div className='error-color'>{error?.message || ''}</div>
                        </div>
                        <div>
                            <button 

                             className='decoration-model-button' type="submit">SEND MESSAGE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

