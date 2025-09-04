import React, { use, useContext, useEffect, useState } from 'react';
import './index.css';
import './payment-history.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

export const PaymentHistory = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate()
    const logout = context?.logout;
    const id = localStorage.getItem('_id');
    const [userId, setUserId] = useState(id)
    const token = context?.token || localStorage.getItem('token');
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [searchText, setSearchText] = useState();

    const getGuestList = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/payment-history/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchText?.trim()
            }
        }).then((res) => {
            setPaymentHistory(res?.data?.paymentHistory)
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error)
        })
    }

    useEffect(() => {
        getGuestList()
    }, [searchText, userId])


    const handleView = (paymentData) => {
        if (paymentData?.rate) {
            navigate(`/view-sweet-history/${paymentData?._id}`)
        } else {
            navigate(`/view-history/${paymentData?._id}`)
        }
    }

    return (
        <div className="payment-list-container">

            <div className="payment-list-header">
                <input
                    type="search"
                    placeholder="Search..."
                    className="search-input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th className='payment-hash' >'#'</th>
                            <th className='payment-order'>ORDER ID</th>
                            <th className='payment-title'>TITLE</th>
                            <th className='payment-weight'>WEIGHT</th>
                            <th className='payment-weight'>UNIT</th>
                            <th className='payment-amount'>AMOUNT</th>
                            <th className='payment-date'>PAYMENT_DATE</th>
                            <th className='payment-view'>VIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory?.map((payment, index) => {
                            const newDate = new Date(payment?.createdAt);
                            const formatDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
                            return (
                                <tr key={payment._id || index}>
                                    <td className='payment-hash'>{index + 1}</td>
                                    <td className='payment-order'>{payment?.razorpay_order_id}</td>
                                    <td className='payment-title'>{payment?.invitationName || payment?.sweet[0].toUpperCase() + payment?.sweet?.slice(1).toLowerCase()}</td>
                                    <td className='payment-weight'>
                                        {payment.weight ? `${payment.weight}` : payment.quantity}
                                    </td>
                                    <td className='payment-amount'>{payment.unit ? payment?.unit : 'gm'}</td>
                                    <td className='payment-amount'>{payment.amount} Rs /-</td>
                                    <td className='payment-date'>{formatDate}</td>
                                    <td className='handleview' onClick={() => handleView(payment)}>view</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >

    );
}
