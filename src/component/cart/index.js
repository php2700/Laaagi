import React, { use, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'
import { AuthContext } from '../context';

export const Cart = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate()
    const logout = context?.logout;
    const id = localStorage.getItem('_id');
    const [userId, setUserId] = useState(id)
    const token = context?.token || localStorage.getItem('token');
    const [cartData, setCartData] = useState([]);
    const setAmounts = context?.setAmounts;
    const setPaymentHistory = context?.setPaymentHistory;


    useEffect(() => {
        setAmounts?.([0, 0, 0, 0, 0]);
        setPaymentHistory([]);
    }, []);

    const getGuestList = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/get-cart/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => {
            setCartData(res?.data?.cartData)
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error)
        })
    }


    useEffect(() => {
        getGuestList()
    }, [userId])


    const handleBuy = (invitationData) => {
        navigate(`/cart-detail/${invitationData?._id}`)
    }

    const handleDelete = (ele) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}api/user/delete-cart/${ele?._id}`).then((res) => {
            getGuestList();
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="guest-list-container">

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th className='cart-hash' >'#'</th>
                            <th className='cart-name'>name</th>
                            <th className='cart-amount'>Amount</th>
                            <th className='cart-weight'>WEIGHT</th>
                            <th className='cart-box'>boxtype</th>
                            <th className='cart-date'>Date</th>
                            <th className='cart-view'>VIEW</th>
                            <th className='cart-delete'>DELETE</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cartData?.map((cart, index) => {
                            const newDate = new Date(cart?.createdAt);
                            const formatDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
                            return (
                                <tr key={cart._id || index}>
                                    <td className='cart-hash'>{index + 1}</td>
                                    <td className='cart-name'>{cart.invitationId?.name}</td>
                                    <td className='cart-amount'>{cart?.invitationId?.price}</td>
                                    <td className='cart-weight'>{cart?.weight}gm</td>
                                    <td className='cart-box'>{cart.boxName}</td>
                                    <td className='cart-date'>{formatDate}</td>
                                    <td className='handleview' onClick={() => handleBuy(cart)}>view</td>
                                    <td className='handledelete' onClick={() => handleDelete(cart)}>delete</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >

    );
}
