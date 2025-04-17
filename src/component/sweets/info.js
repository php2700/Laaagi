import { Link, useLocation, useNavigate } from "react-router-dom"
import './info.css'
import { useState } from "react";
import { SignUp } from "../signUp";

export const SweetsInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const sweetsData = location?.state?.data;
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false)

    const handlePayment = () => {
        if (!token) {
            // setOpen(true)
            navigate("/signup")
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="sweets-info">
            <div className="sweets-info-back-button">
                <Link to='/sweets'><button>back</button></Link>
            </div>
            <div>
                <div>home</div>
            </div>
            <div className="sweets-info-details">
                <div className="sweets-info-img">
                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${sweetsData?.image}`} />
                </div>
                <div className="sweets-info-right-side">
                    <div className="sweets-info-name">
                        <div>{sweetsData?.name}</div>
                        <div>{sweetsData?.amount}</div>
                    </div>
                    <div className="sweets-info-des">
                        Description
                    </div>
                    <div className="sweets-info-text">
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been
                        the industry's standard
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been
                        the industry's standard
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been
                        the industry's standard
                    </div>
                    <div>10kg</div>
                    <div className="sweets-info-price">Total Price:2500</div>
                    <div className="sweets-info-button">
                        <button onClick={handlePayment}>Pay</button>
                    </div>
                </div>
            </div>
            {/* <SignUp
                open={open}
                onClose={handleClose}
            /> */}
        </div>
    )
}