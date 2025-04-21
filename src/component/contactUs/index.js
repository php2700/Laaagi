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
            newError.name = 'name is required'
        } else if (name?.length < 3) {
            newError.name = 'minimum 3 character required'
        }
        if (!lastName?.trim()) {
            newError.lastName = 'lastname is required'
        } else if (lastName?.length < 3) {
            newError.lastName = 'minimum 3 character required'
        }
        if (!email) {
            newError.email = 'email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newError.email = 'email not valid'
        }

        if (!desc?.trim()) {
            newError.desc = 'message is required'
        } else if (desc?.length < 3) {
            newError.desc = 'minimum 5 character required'
        }

        if (!mobile) {
            newError.mobile = 'mobile number required'
        } else if (mobile?.length < 10) {
            newError.mobile = 'minimum 10 number required'
        } else if (mobile?.length > 12) {
            newError.mobile = 'mobile max length'
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
                toast.success("Details added!", {
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
                    <div className="contact-us-header">Let's Talk with us</div>
                    <div className="contact-us-desc">Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.</div>
                    <div className="contact-us-content" >
                        <img src={locationIcon} />
                        <div>&nbsp;1055 Arthur ave Elk Groot, 67.India</div>
                    </div>
                    <div className="contact-us-content" >
                        <img src={mobileIcon} />
                        <div>&nbsp; +1 234 678 9108 99</div>
                    </div>
                    <div className="contact-us-mail" >
                        <img src={mailIcon} />
                        <div>&nbsp;Contact@laaaggi.com</div>
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
                                {error?.name && (<div className="error-color">{error?.name}</div>)}
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => {
                                    setLastName(e.target.value)
                                    setError({ ...error, lastName: '' })
                                }} />
                                {error?.lastName && (<div className="error-color">{error?.lastName}</div>)}
                            </div>
                        </div>
                        <div>
                            <input type="email" placeholder="Email*" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                                setError({ ...error, email: '' })
                            }} />
                            {error?.email && (<div className="error-color">{error?.email}</div>)}
                        </div>
                        <div>
                            <input type="number" placeholder="Phone Number*" value={mobile} onChange={(e) => {
                                setMobile(e.target.value)
                                setError({ ...error, mobile: '' })
                            }
                            } />
                            {error?.mobile && (<div className="error-color">{error?.mobile}</div>)}
                        </div>
                        <div>
                            <textarea value={desc} onChange={(e) => {
                                setDesc(e.target.value)
                                setError({ ...error, desc: '' })
                            }} placeholder="Your Message" ></textarea>
                            {error?.desc && (<div className="error-color">{error?.desc}</div>)}
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