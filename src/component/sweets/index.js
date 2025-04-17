import { useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';

export const Sweets = () => {

    const sweetsList = [
        { "id": 1, name: 'Kaju Katri', img: firstImg, category: 'Wooden Box', amount: 120, },
        { "id": 2, name: 'sweets', img: secondImg, category: 'Wooden Box', amount: 120 },
        { "id": 3, name: 'Gulab jamun', img: thirdImg, category: 'Wooden Box', amount: 120 },
        { "id": 4, name: 'Kaju Katri', img: firstImg, category: 'Wooden Box', amount: 120 },
        { "id": 5, name: 'sweets', img: secondImg, category: 'Wooden Box', amount: 120 },
        { "id": 6, name: 'Gulab jamun', img: thirdImg, category: 'Wooden Box', amount: 120 },
        { "id": 7, name: 'Kaju Katri', img: firstImg, category: 'Wooden Box', amount: 120 },
        { "id": 8, name: 'sweets', img: secondImg, category: 'Wooden Box', amount: 120 },
        { "id": 9, name: 'Gulab jamun', img: thirdImg, category: 'Wooden Box', amount: 120 },
    ]
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
                    {sweetsList?.map((ele) => (
                        <div className='sweets-content-img'>
                            <img src={ele?.img} />
                            <div className='sweets-name'>{ele?.name}</div>
                            <div className='sweets-price'>{ele?.amount} </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}