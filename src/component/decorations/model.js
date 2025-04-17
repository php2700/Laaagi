import { useState } from 'react';
import './model.css';
import axios from 'axios';
import { toast } from "react-toastify";


export const Model = ({ open, onClose, data }) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [mobile, setMobile] = useState()
    const [message, setMessage] = useState();
    const [decorationId, setDecorationId] = useState()

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

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
                toast.success("Details added!", {
                    position: "top-right"
                });
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className='model' onClick={(e) => e.stopPropagation()}>
                <div className='close-model'>
                    <button onClick={onClose}>X</button>
                </div>
                <div>
                    <div className='model-text'>Get Quote with Laaagi</div>
                </div>
                <div  >
                    <form className='model-form' onSubmit={handleSubmit}>
                        <div className='model-name'>
                            <input type="text" placeholder="First Name*" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Last Name*" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="number" placeholder="Phone Number*" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <textarea className='model-desc' placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />

                        <button className='model-button' type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

