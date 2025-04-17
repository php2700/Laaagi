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

    const handleSubmit = (e) => {
        e.preventDefault();

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
                                <input type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input type="number" placeholder="Phone Number*" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Your Message" ></textarea>
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