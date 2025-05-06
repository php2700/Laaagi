import { Link, useLocation, useNavigate } from "react-router-dom"
import './info.css'
import { useContext, useState } from "react";
import { AuthContext } from "../context";

const sweetsInKg = [{ name: 'Select quantity', value: 'Select quantity' }, { name: '1kg', value: 1 }, { name: '2kg', value: 2 }, { name: '5kg', value: 5 }, { name: '10kg', value: 10 }]


export const SweetsInfo = () => {
    const context = useContext(AuthContext);
    const sweetsInfo = context?.sweetsInfo
    const location = useLocation();
    const navigate = useNavigate();
    const [pricePerKg, setPricePerkg] = useState((sweetsInfo?.amount?.split('/')[0]))
    const token = localStorage.getItem('token')
    const [sweetkg, setSweetkg] = useState()
    const [open, setOpen] = useState(false)
    const [price, setPrice] = useState(0)

    const handlePayment = () => {


        if (!token) {
            navigate("/signup")
        } else {
            navigate('/payment')
        }
    }

    const calculatePrice = (quantity) => {
        if (quantity === "Select quantity")
            return;
        const calculateAmount = quantity * pricePerKg;
        setPrice(calculateAmount)
        setSweetkg(quantity)
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = () => {
        const lastUrl = sessionStorage.getItem('lastURL');
        navigate(`${lastUrl}`)
    }

    return (
        <div className="sweets-info">
            <div className="sweets-info-back-button">
                {/* <Link onClick={() => handleBack()} to='/sweets'><button className="sweets-info-back-button">back</button></Link> */}
                <button onClick={() => handleBack()} className="sweets-info-back-button">back</button>

            </div>
            <div className="sweet-info-home-container">
                <div className="sweets-info-home-button" onClick={handleHome}>Home</div>
                <div> &nbsp;> &nbsp;Detail</div>
            </div>
            <div className="sweets-info-details">
                <div className="sweets-info-img">
                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${sweetsInfo?.image}`} />
                </div>
                <div className="sweets-info-right-side">
                    <div className="sweets-info-name">
                        <div>{sweetsInfo?.name}</div>
                        <div>&nbsp;(Rs. {sweetsInfo?.amount} &nbsp;/- )</div>
                    </div>
                    <div className="sweets-info-des">
                        Description
                    </div>
                    <div className="sweets-info-text">
                        {sweetsInfo?.description}
                    </div>
                    <div className="sweets-info-drop-down">
                        <select value={sweetkg} onChange={(e) => calculatePrice(e.target.value)} >
                            {sweetsInKg?.map((ele, index) => (
                                <option key={index} value={ele?.value}  >{ele?.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="sweets-info-price">Total Price:{price}</div>
                    <div className="sweets-info-button">
                        <button onClick={handlePayment}>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}