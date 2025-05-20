import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';


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
    const context = useContext(AuthContext);
    const userData = context?.storeUserData;
    const paymentHistory = context?.paymentHistory;
     const invitation = context?.selectSweet;
    const boxName = context?.boxName;
    const boxweight = useSelector((state) => state?.weight?.value);
    let weight;
    if (boxName == 'Normal Box') {
        weight = parseInt(boxweight)
    } else if (boxName == '4 Section in box') {
        weight = parseInt(boxweight / 4)
    } else if (boxName == '3 Section in box') {
        weight = parseInt(boxweight / 3)
    } else if (boxName == 'Special box') {
        weight = parseInt(boxweight / 5)
    }




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
            // key: process.env.REACT_APP_RAZORPAY_APIKEY,
            key: 'rzp_test_QpiAXSeb8pm1CJ',

            amount: data.amount,
            currency: data.currency,
            name: 'Your Company Name',
            description: 'Payment for Order',
            order_id: data.id,
            handler: function (response) {


                const storeHistory = {
                    userId: userId, amount: amount,
                    weight: boxweight,
                    invitationName:invitation?.name,
                    guest: guest?.map((ele) => (
                        { guestId: ele?.guestId, quantity: ele?.quantity }
                    )),
                    sweet: paymentHistory?.map((item) => (
                        { amount: item?.amount, name: item?.name }
                    ))

                }

                response = { ...response, ...storeHistory }
                axios.post(`${process.env.REACT_APP_BASE_URL}verifyOrder`, response).then((res) => {
                    if (res?.status == 200) {
                        toast.success("Your Order Confirmed", {
                            position: "top-right"
                        });
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




