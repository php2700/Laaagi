import { useEffect, useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { sweetsCategory } from '../category';

export const Bengali_Sweets = () => {
    const [data, setData] = useState([])

    const sweetsDataList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                category: sweetsCategory[1]
            }
        })
            .then((res) => {
                setData(res?.data?.sweetsData);
                console.log(res?.data?.sweetsData)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        sweetsDataList()
    }, [])

    return (
        <div className='sweets' >
            <div className='sweets-header'>
                <div><Link to='/sweets'>Sugar Free</Link></div>
                <div><Link to='/bengali-sweets'>Bengali Sweets</Link></div>
                <div><Link to='/sweets'>Sweets</Link></div>
                <div><Link to='/sweets'>Sweets</Link></div>
                <div><Link to='/sweets'>Sweets</Link></div>
            </div>
            <div className='sweets-content'>
                <div className='sweets-content-list'>
                    {data?.map((ele) => (
                        <div className='sweets-content-img'>
                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            <div className='sweets-name'>{ele?.name}</div>
                            <div className='sweets-price'>{ele?.amount} </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}