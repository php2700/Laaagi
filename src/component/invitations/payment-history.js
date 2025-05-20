import React, { useContext, useEffect, useState } from 'react';
import './GuestList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';


export const PaymentHistory = () => {
    const context = useContext(AuthContext);
    const logout = context?.logout;
    const userData = context?.storeUserData;
    const userId = localStorage.getItem('_id');
    const token = context?.token;
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [searchText, setSearchText] = useState();
    const [viewHistory, setViewHistory] = useState(false)
    const [viewData, setViewData] = useState({})
    const [formattedDate, setFormattedDate] = useState('');



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
            console.log(res?.data?.paymentHistory)
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error)
        })
    }

    useEffect(() => {
        getGuestList()
    }, [searchText])


    const handleView = (paymentData) => {
        setViewHistory(true)
        const newDate = new Date(paymentData?.createdAt);
        setFormattedDate(`${newDate.getFullYear()}-${(newDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`)
        setViewData(paymentData)
    }


    const handleBack = () => {
        setViewHistory(false)
    }

    return (
        <div className="guest-list-container">

            {viewHistory && <div onClick={handleBack} >Back</div>}
            <div className="guest-list-header">
                <input
                    type="search"
                    placeholder="Search..."
                    className="search-input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {/* <Link to='/payment-history' className="add-guest-button">History</Link> */}
            </div>
            <div className="table-wrapper">
                <table>
                    {!viewHistory ? <>
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
                                        <td>{payment?.razorpay_payment_id}</td>
                                        <td>{payment?.invitationName}</td>
                                        <td>{payment.weight} g</td>
                                        <td>{payment.amount} Rs /-</td>
                                        <td>{formatDate}</td>
                                        <td className='handleview' onClick={() => handleView(payment)}>view</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </> :
                        <>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>GUEST </th>
                                    <th >Address </th>
                                    <th >SWEET</th>
                                    <th >AMOUNT</th>
                                    <th>WEIHGT</th>
                                    <th>PAYMENT_DATE</th>
                                    <th >Box-Quantity </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    viewData.guest?.map((ele) => (
                                        <tr >
                                            <td>

                                                {ele?.name}

                                            </td>
                                            <td>
                                                {ele.address}

                                            </td>

                                            <td>{
                                                viewData?.sweet?.map((ele) => (
                                                    <div>{ele.name}</div>
                                                ))}
                                            </td>
                                            <td>{
                                                viewData?.sweet?.map((ele) => (
                                                    <div>{ele?.amount}</div>
                                                ))}
                                            </td>
                                            <td>{viewData.weight} g</td>
                                            <td>{formattedDate}</td>
                                            <td>{ele?.quantity}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </>
                    }
                </table>
            </div>
            {viewHistory && <div className="pay-button-container">
                Total Amount : {viewData?.amount} Rs. /-
            </div>}
        </div>
    );
}

