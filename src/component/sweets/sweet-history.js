import { useNavigate, useParams } from "react-router-dom"
import './info.css'
import { useEffect, useState } from "react";
import leftArrow from "../../assets/sweet/left_arrow.png"
import axios from "axios";

export const ViewSweetHistory = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [sweetsInfo, setSweetsInfo] = useState({})
    const token = localStorage.getItem('token')

    const getSweetData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweet-history/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const response = res?.data?.sweetHistory;
            const newDate = new Date(response?.createdAt);
            const formatDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart("0", 2)}-${(newDate.getDate()).toString().padStart("0", 2)}`
            response.createdAt = formatDate;
            setSweetsInfo(response)
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    

    useEffect(() => {
        getSweetData()
    }, [_id])

    const handleBack = () => {
        navigate('/payment-history')
    }

    return (
        <div className="sweets-info">
            <div className="sweets-info-back-button">
                <button onClick={() => handleBack()} className="sweets-info-back-button">
                    <img src={leftArrow} />
                    back</button>
            </div>
            <div className="sweets-info-details">
                <div className="sweets-info-img">
                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${sweetsInfo?.img}`} />
                </div>
                <div className="sweets-info-right-side">
                    <div className="sweets-info-name">
                        <div>{sweetsInfo?.sweet}</div>
                        <div>&nbsp;(Rs. {sweetsInfo?.rate}&nbsp;/- )</div>
                    </div>
                    <div className="sweets-info-des">
                        Description
                    </div>
                    <div className="sweets-info-text">
                        {sweetsInfo?.description}
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Name </th>
                            <th >Address </th>
                            <th>WEIHGT</th>
                            <th>PAYMENT_DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>
                                {sweetsInfo?.name}
                            </td>
                            <td>
                                {sweetsInfo.address}
                            </td>
                            <td>{sweetsInfo.quantity}kg</td>
                            <td>{sweetsInfo?.createdAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pay-button-container">
                Total Amount : {sweetsInfo?.amount} Rs. /-
            </div>
        </div>
    )
}