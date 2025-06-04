import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};
export const Payment = ({ amount, guest, userId }) => {

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const userData = context?.storeUserData;
    const invitation = context?.selectSweet;
    const paymentHistory = context?.paymentHistory;
    const setPaymentHistory = context?.setPaymentHistory;
    const boxName = context?.boxName;
    const boxweight = useSelector((state) => state?.weight?.value);
    const amounts = context?.amounts; 
    useEffect(() => {
        handlePayment();
    }, []);
    const handlePayment = async () => {
        const isLoaded = await loadRazorpayScript();

        if (!isLoaded) {
            return;
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}createOrder`, {
            amount: amount * 100,
        });
        const options = {
            key: `${process.env.REACT_APP_RAZORPAY_APIKEY}`,
            // key: 'rzp_test_QpiAXSeb8pm1CJ',
            amount: data.amount,
            currency: data.currency,
            name: 'Laaagi',
            description: 'Payment for Order',
            order_id: data.id,
            handler: function (response) {


                const storeHistory = {
                    userId: userId,
                    amount: amount,
                    weight: boxweight,
                    invitationName: invitation?.name,
                    guest: guest?.map((ele) => (
                        { guestId: ele?.guestId, quantity: ele?.quantity, name: ele?.name, address: ele?.address, pincode: ele?.pincode }
                    )),
                    boxName: boxName,
                    invAmounts: amounts,
                    invitationImg: invitation?.image,
                    boxAmount: invitation?.price,
                    invDesc: invitation?.description,
                    sweets: paymentHistory
                }

                response = { ...response, ...storeHistory }
                axios.post(`${process.env.REACT_APP_BASE_URL}verifyOrder`, response).then((res) => {
                    if (res?.status == 200) {
                        setPaymentHistory([])
                        toast.success("Your Order Confirmed", {
                            position: "top-right"
                        });
                        navigate('/')
                    } else if (!res?.status == 200) {
                        toast.error("Verification error", {
                            position: "bottom-right"
                        });
                    }

                }).catch((error) => {
                    toast.error("Something wrong!", {
                        position: "bottom-right"
                    });
                    console.log(error, "3333333+++++")
                })
            },
            prefill: {
                name: userData?.name,
                // email: 'john@example.com',
                // contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };


};




