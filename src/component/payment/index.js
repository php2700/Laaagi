import React, { useEffect } from 'react';
import axios from 'axios';

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
export const Payment = () => {
    useEffect(() => {
        handlePayment();
    }, []);
    const handlePayment = async () => {
        const isLoaded = await loadRazorpayScript();

        if (!isLoaded) {
            alert('Razorpay SDK failed to load');
            return;
        }
        // Create order on backend
        const { data } = await axios.post('http://localhost:3000/createOrder', {
            amount: 500, // ₹500
        });

        const options = {
            key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
            amount: data.amount,
            currency: data.currency,
            name: 'Your Company Name',
            description: 'Payment for Order',
            order_id: data.id,
            handler: function (response) {
                alert('Payment successful!');
                console.log(response);
            },
            prefill: {
                name: 'John Doe',
                email: 'john@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            <p>razorpay</p>
        </div>
    );
};




