import React, { use, useContext, useEffect, useState } from 'react';
import './GuestList.css';
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
                q: searchText
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
        <div className="guest-list-container">

            <div className="guest-list-header">
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
                            <th>'#'</th>
                            <th>ORDERID</th>
                            <th>TITLE</th>
                            <th>WEIHGT</th>
                            <th>AMOUNT</th>
                            <th>PAYMENT_DATE</th>
                            <th>VIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory?.map((payment, index) => {
                            const newDate = new Date(payment?.createdAt);
                            const formatDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
                            return (
                                <tr key={payment._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{payment?.razorpay_order_id}</td>
                                    <td>{payment?.invitationName || payment?.sweet}</td>
                                    {/* <td>{(payment.weight)g || (payment?.quantity)kg}</td> */}
                                    <td>
                                        {payment.weight ? `${payment.weight} g` : payment.quantity ? `${payment.quantity} kg` : ''}
                                    </td>

                                    <td>{payment.amount} Rs /-</td>
                                    <td>{formatDate}</td>
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
