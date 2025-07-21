import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import './info.css'
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context";
import leftArrow from "../../assets/sweet/left_arrow.png"
import axios from "axios";
import { PaymentSingleItem } from "../payment/sweet_payment";
import PaymentDetailsModel from "./payment_details";

const sweetsInKg = ['kg', 'gm']


export const SweetsInfo = () => {
    const hasFetchedRef = useRef(false);
    const context = useContext(AuthContext);
    const logout = context?.logout;
    const { _id, url } = useParams();
    const navigate = useNavigate();
    const [sweetsInfo, setSweetsInfo] = useState({})
    const [pricePerKg, setPricePerkg] = useState()
    const userId = localStorage.getItem("_id");
    const token = localStorage.getItem('token')
    const [sweetkg, setSweetkg] = useState()
    const [price, setPrice] = useState(0)
    const [openRazorpay, setOpenRazorPay] = useState(false)
    const [error, setError] = useState()
    const [userData, setUserData] = useState({})
    const [paymentDetails, setPaymentDetails] = useState(false)
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [pincode, setPincode] = useState()
    const [unit, setUnit] = useState();
    const [mobile, setMobile] = useState();

    const getUserData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data?.userData)
            setUserData(res?.data?.userData)
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error, "error")
        })
    }

    useEffect(() => {
        if (token)
            getUserData()
    }, [token])

    const addDetails = () => {
        if (!sweetkg) {
            setError('please Select Quantity')
            return;
        }
        if (!token) {
            navigate("/signup")
        }
        setPaymentDetails(true)
    }

    const closePayment = () => {
        setPaymentDetails(false)
    }

    const handlePayment = () => {
        if (!sweetkg) {
            setError('please Select Quantity')
            return;
        }
        if (!token) {
            navigate("/signup")
        } else {
            setOpenRazorPay(false)
            setTimeout(() => {
                setOpenRazorPay(true)
            }, 50);
        }
    }

    const getSweetData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweet/${_id}`).then((res) => {
            console.log(res?.data?.sweetData,'tttt')
            setPricePerkg(res?.data?.sweetData?.amount?.split('/')[0])
            setSweetsInfo(res?.data?.sweetData)
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    useEffect(() => {
        if (!_id) return;
        // if (!_id || hasFetchedRef.current) return;
        if (hasFetchedRef.current === _id) return;
        getSweetData()
        hasFetchedRef.current = _id;
    }, [_id])

    useEffect(() => {
        if (!userId) return

        const recentData = {
            userId: userId,
            fruitId: sweetsInfo?._id, name: sweetsInfo?.name, image: sweetsInfo?.image,
            price: sweetsInfo?.price ?? null,
            isSweet: sweetsInfo?.isSweet ?? null
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/recent-view`, recentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error, "error")
        })

    }, [sweetsInfo])

    const calculatePrice = (unit) => {
        console.log(sweetkg, "ghgfhghgh")


        let calculateAmount;
        setError('')
        if (unit == 'gm') {
            calculateAmount = (sweetkg * pricePerKg / 1000)
        } else {
            calculateAmount = sweetkg * pricePerKg;
        }

        if (sweetsInfo.isDeliveryCharge) {
            calculateAmount = calculateAmount + 49;
        }
        setPrice(calculateAmount || 0)
        setUnit(unit)
    }

    useEffect(() => {
        // if (sweetkg)
        calculatePrice(unit || 'kg')
    }, [sweetkg])

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = () => {
        if (url == 'home') {
            navigate('/')
        }
        else {
            navigate('/sweets')
        }
    }

    return (
        <div className="sweets-info">
            <div className="sweets-info-back-button">
                <button onClick={() => handleBack()} className="sweets-info-back-button">
                    <img src={leftArrow} />
                    back</button>
            </div>
            <div className="sweet-info-home-container">
                <div className="sweets-info-home-button" onClick={handleHome}>Home ></div>
                <div> &nbsp; &nbsp;Detail</div>
            </div>
            <div className="sweets-info-details">
                <div className="sweets-info-img">
                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${sweetsInfo?.image}`} />
                </div>
                <div className="sweets-info-right-side">
                    <div className="sweets-info-name">
                        <div>{sweetsInfo?.name?.charAt(0)?.toUpperCase() + sweetsInfo?.name?.slice(1)?.toLowerCase()}</div>
                        <div>&nbsp;(Rs. {sweetsInfo?.amount}&nbsp;/- )</div>
                    </div>
                    <div className="sweets-info-des">
                        Description
                    </div>
                    <div className="sweets-info-text">
                        {sweetsInfo?.description}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <input style={{
                            borderRadius: '5px', border: '1px solid black', height: '42px', padding: '10px 8px',
                            fontSize: '14px', fontSize: '16px',
                        }} type="text" placeholder="Enter quantity" value={sweetkg} onChange={(e) => {
                            setSweetkg(e.target.value)

                        }} />
                        <div className="sweets-info-drop-down">
                            <select style={{ border: '1px solid black' }} className="sweets-info-select" value={unit} onChange={(e) => calculatePrice(e.target.value)} >
                                {sweetsInKg?.map((ele, index) => (
                                    <option key={index} value={ele}  >{ele}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}


                    <div className="sweets-info-price">Total Price:{price} /-</div>

                    {sweetsInfo.isDeliveryCharge &&
                        <div className="shipping">Shipping Charges Added ₹49 /-</div>
                    }
                    <div className="sweets-info-button">
                        {/* <button onClick={handlePayment}>Pay</button> */}
                        <button onClick={addDetails}>Pay</button>

                    </div>
                </div>
            </div>
            {paymentDetails && <PaymentDetailsModel isOpen={paymentDetails} onClose={closePayment} isAddress={setAddress} isName={setName} isPincode={setPincode} isMobile={setMobile} openRazorpay={handlePayment} />}
            {openRazorpay && <  PaymentSingleItem amount={price} description={sweetsInfo?.description} img={sweetsInfo?.image} Sweet={sweetsInfo?.name} rate={sweetsInfo?.amount} weight={sweetkg} quantity={sweetkg} unit={unit} mobile={mobile} name={name} address={address} pincode={pincode} />}
        </div>
    )
}



