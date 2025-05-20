import React, { use, useContext, useEffect, useState } from 'react';
import './GuestList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';
import { Invitationhome } from './Invitationhome';
import { useDispatch } from 'react-redux';
import { chnageWeight } from '../redux/weightSlice';


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
    const setInvitation = context?.setSelectSweet;
    const setBoxName = context?.setBoxName;
    const setAmounts = context?.setAmounts;

    const dispatch = useDispatch()


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
    }, [searchText])


    const handleView = (paymentData) => {
        console.log(paymentData, 'a')
        setViewHistory(true)
        const newDate = new Date(paymentData?.createdAt);
        setFormattedDate(`${newDate.getFullYear()}-${(newDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`)
        let updateInv = { description: paymentData?.invDesc, name: paymentData?.invitationName, price: paymentData?.boxAmount, image: paymentData?.invitationImg, sweetName: paymentData?.sweets }
        dispatch(chnageWeight(paymentData?.weight))
        setBoxName(paymentData?.boxName)

        let newAmounts = paymentData?.invAmounts?.map((ele) => (
            Number(ele)
        ))
        setAmounts(newAmounts);
        setInvitation(updateInv)
        setViewData(paymentData)
    }


    const handleBack = () => {
        setBoxName('')
        dispatch(chnageWeight(''))
        setAmounts([]);
        setInvitation({})
        setViewHistory(false)
    }


    return (
        <div className="guest-list-container">
            {
                !viewHistory ? <>
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
                                            <td>{payment?.invitationName}</td>
                                            <td>{payment.weight} g</td>
                                            <td>{payment.amount} Rs /-</td>
                                            <td>{formatDate}</td>
                                            <td className='handleview' onClick={() => handleView(payment)}>view</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </> : <>
                    <div onClick={handleBack} >Back</div>

                    <Invitationhome viewInv={true} />

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>GUEST </th>
                                    <th >Address </th>
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
                                            <td>{viewData.weight} g</td>
                                            <td>{formattedDate}</td>
                                            <td>{ele?.quantity}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="pay-button-container">
                        Total Amount : {viewData?.amount} Rs. /-
                    </div>
                </>
            }
        </div>

    );
}
