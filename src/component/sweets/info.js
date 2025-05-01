import { Link, useLocation, useNavigate } from "react-router-dom"
import './info.css'
import { useState } from "react";

const sweetsInKg = [{ name: '1kg', value: 1 }, { name: '2kg', value: 2 }, { name: '5kg', value: 5 }, { name: '10kg', value: 5 }]


export const SweetsInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const sweetsData = location?.state?.data;
    const [priceperg, setPricePerg] = useState((sweetsData?.amount.split('/')[0]))
    const token = localStorage.getItem('token')
    const [sweetkg, setSweetkg] = useState()
    const [open, setOpen] = useState(false)
    const [price, setPrice] = useState(0)

    const handlePayment = () => {
        if (!token) {
            // setOpen(true)
            navigate("/signup")
        }
        navigate('/payment')
    }

    const calculatePrice = (quantity) => {
        const calculateAmount = quantity * 1000 * priceperg;
        setPrice(calculateAmount)
        setSweetkg(quantity)
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
                        <div>&nbsp;(Rs. {sweetsData?.amount} &nbsp;/- )</div>
                    </div>
                    <div className="sweets-info-des">
                        Description
                    </div>
                    <div className="sweets-info-text">
                        {sweetsData?.description}
                    </div>
                    <div>
                        <select value={sweetkg} onChange={(e) => calculatePrice(e.target.value)} >
                            <option value="" disabled>Select quantity</option>
                            {sweetsInKg?.map((ele) => (
                                <option value={ele?.value}>{ele?.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="sweets-info-price">Total Price:{price}</div>
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