import ads from "../../assets/contact-us/ads.png"
import './index.css'
import locationIcon from "../../assets/contact-us/address.png"
import mobileIcon from "../../assets/contact-us/mobile.png"
import mailIcon from "../../assets/contact-us/mail.png"
import contactImg from "../../assets/contact-us/contact-us-top.jpg"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify";


export const ContactUs = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [mobile, setMobile] = useState()
    const [desc, setDesc] = useState();
    const [error, setError] = useState({})

    const validate = () => {
        let newError = {};

        if (!name?.trim()) {
            newError.name = 'Name is required.';
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            newError.name = 'Enter valid name.'
        } else if (name?.length < 3) {
            newError.name = 'Minimum 3 character required.'
        }
        if (!lastName?.trim()) {
            newError.lastName = 'Last name is required.'
        } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
            newError.lastName = 'Enter valid last name.'
        } else if (lastName?.length < 3) {
            newError.lastName = 'Minimum 3 character required.'
        }
        if (!email) {
            newError.email = 'Email is required.'
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = 'Email not valid.'
        }

        if (!desc?.trim()) {
            newError.desc = 'Message is required.'
        } else if (desc?.length < 3) {
            newError.desc = 'Minimum 5 character required.'
        }

        if (!mobile) {
            newError.mobile = 'Mobile number required.'
        } else if (!mobile?.trim()) {
            newError.mobile = 'Mobile number required.'
        } else if (!/^[0-9]+$/.test(mobile)) {
            newError.mobile = 'Mobile number not valid.'
        } else if (mobile?.length != 10) {
            newError.mobile = 'Mobile number not valid.'
        }
        setError(newError);
        return (Object.keys(newError))?.length;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            return
        }

        const contactUsData = {
            firstName: name,
            lastName: lastName,
            email: email,
            mobile: mobile,
            message: desc
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/contact-us-detail`, contactUsData)
            .then((res) => {
                setName("")
                setEmail("")
                setLastName("")
                setMobile("")
                setDesc("")
                toast.success(" Your message has been sent successfully !", {
                    position: "top-right"
                });
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="contact-us-top-img">
                <img src={contactImg} alt="contact-us-img" />
            </div>

            <div className="contact-middle">
                <div className="contact-us-condition">
                    <div className="contact-us-header">Let's Talk With Us</div>
                    <div className="contact-us-desc">Have Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.</div>
                    <div className="contact-us-content" >
                        <img src={locationIcon} className="contact-icons" />
                        <div>Main Market, Sur Singh, Tarn Taran, Punjab-143302</div>
                    </div>
                    <div className="contact-us-content" >
                        <img src={mobileIcon} className="contact-icons" />
                        <div>+91 8699991906</div>
                    </div>
                    <div className="contact-us-mail" >
                        <img src={mailIcon} className="contact-icons" id="mail" />
                        <div>yourpersonallaaagi@gmail.com</div>
                    </div>
                </div>
                <div >
                    <form onSubmit={handleSubmit} className="contact-us-form">
                        <div className="contact-us-form-name">
                            <div>
                                <input type="text" placeholder="First Name" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                    setError({ ...error, name: '' })
                                }
                                } />
                                <div className="error-color">{error?.name || ''}</div>
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => {
                                    setLastName(e.target.value)
                                    setError({ ...error, lastName: '' })
                                }} />
                                <div className="error-color">{error?.lastName || ''}</div>
                            </div>
                        </div>
                        <div>
                            <input type="email" placeholder="Email*" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                                setError({ ...error, email: '' })
                            }} />
                            <div className="error-color">{error?.email || ''}</div>
                        </div>
                        <div>
                            <input type="text" placeholder="Phone Number*" value={mobile} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue?.length <= 10) {
                                    setMobile(newValue)
                                }
                                setError({ ...error, mobile: '' })
                            }
                            } />
                            <div className="error-color">{error?.mobile || ''}</div>
                        </div>
                        <div>
                            <textarea value={desc} onChange={(e) => {
                                setDesc(e.target.value)
                                setError({ ...error, desc: '' })
                            }} placeholder="Your Message" className="contactarea" ></textarea>
                            <div className="error-color">{error?.desc || ''}</div>
                        </div>
                        <div><button type="submit">Send Message</button></div>
                    </form >
                </div>
            </div>
            <div className="ads-img">
                <img src={ads} />
            </div>
        </div>
    )
}