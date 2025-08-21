import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import './info.css'
import { useContext, useEffect, useRef, useState } from "react";
import { Payment } from "../payment";
import leftArrow from "../../assets/sweet/left_arrow.png"
import axios from "axios";
import PaymentDetailsModel from "./payment_details";
import { PaymentSingleItem } from "../payment/sweet_payment";


const sweetsInKg = [{ name: 'Select quantity', value: 'Select quantity' }, { name: '1kg', value: 1 }, { name: '2kg', value: 2 }, { name: '5kg', value: 5 }, { name: '10kg', value: 10 }]


export const DryFruitInfo = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [sweetsInfo, setSweetsInfo] = useState({})
    const [pricePerKg, setPricePerkg] = useState()
    const token = localStorage.getItem('token')
    const [sweetkg, setSweetkg] = useState()
    const [price, setPrice] = useState(0)
    const [openRazorpay, setOpenRazorPay] = useState(false)
    const [error, setError] = useState()
    const [paymentDetails, setPaymentDetails] = useState(false)
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [pincode, setPincode] = useState();
    const userId = localStorage.getItem("_id")
    const hasFetchedRef = useRef(false);

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

    const closePayment = () => {
        setPaymentDetails(false)
    }


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

    const getSweetData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit/${_id}`).then((res) => {
            setPricePerkg(res?.data?.dryFruitData?.amount?.split('/')[0])
            setSweetsInfo(res?.data?.dryFruitData)
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    console.log("ghghghgmdnkcn ")
    useEffect(() => {
        if (!_id) return;

        // if (!_id || hasFetchedRef.current) return;
        if (hasFetchedRef.current === _id) return;
        getSweetData();
        // hasFetchedRef.current = true;
        hasFetchedRef.current = _id;
    }, [_id]);



    useEffect(() => {
        if (!userId || !sweetsInfo?._id) return
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

    const calculatePrice = (quantity) => {
        if (quantity === "Select quantity")
            return;

        setError('')
        const calculateAmount = quantity * pricePerKg;
        setPrice(calculateAmount)
        setSweetkg(quantity)
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className="sweets-info">
            <div className="sweets-info-back-button">
                <button onClick={() => handleBack()} className="sweets-info-back-button">
                    <img src={leftArrow} />
                    back</button>

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
                        <select className="sweets-info-select" value={sweetkg} onChange={(e) => calculatePrice(e.target.value)} >
                            {sweetsInKg?.map((ele, index) => (
                                <option key={index} value={ele?.value}  >{ele?.name}</option>
                            ))}
                        </select>

                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="sweets-info-price">Total Price:{price} /-</div>
                    <div className="shipping">Extra Shipping Charges ₹49 /- </div>

                    <div className="sweets-info-button">
                        <button onClick={addDetails}>Pay</button>
                    </div>
                </div>
            </div>
            {paymentDetails && <PaymentDetailsModel isOpen={paymentDetails} onClose={closePayment} isAddress={setAddress} isName={setName} isPincode={setPincode} openRazorpay={handlePayment} />}
            {openRazorpay && <  PaymentSingleItem amount={price} description={sweetsInfo?.description} img={sweetsInfo?.image} Sweet={sweetsInfo?.name} rate={sweetsInfo?.amount} weight={sweetkg} quantity={sweetkg} name={name} address={address} pincode={pincode} />}

            {/* {openRazorpay && <  Payment amount={price} />} */}
        </div>
    )
}