import { useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';

export const Room_Decor = () => {

    const DecorationsList = [
        { "id": 1, name: 'Mehndi', img: firstImg, category: 'Wooden Box' },
        { "id": 2, name: 'mehndi', img: secondImg, category: 'Wooden Box' },
        { "id": 3, name: 'mehndi', img: thirdImg, category: 'Wooden Box' },
        { "id": 4, name: 'Mehndi', img: firstImg, category: 'Wooden Box' },
        { "id": 5, name: 'mehndi', img: secondImg, category: 'Wooden Box' },
        { "id": 6, name: 'mehndi', img: thirdImg, category: 'Wooden Box' },
        { "id": 7, name: 'Mehndi', img: firstImg, category: 'Wooden Box' },
        { "id": 8, name: 'mehndi', img: secondImg, category: 'Wooden Box' },
        { "id": 9, name: 'mehndi', img: thirdImg, category: 'Wooden Box' },
    ]
    return (
        <div className='decorations' >
            <div className='decorations-header'>
                <div><Link to='/decorations'>Marriage</Link></div>
                <div><Link to='/bithday'>Birthday</Link></div>
                <div><Link to='/mehndi'>Mehndi</Link></div>
                <div><Link to='/room-decor'>Room Decor</Link></div>
                <div><Link to='/party'>Party</Link></div>
            </div>
            <div className='decorations-content'>
                <div className='decorations-content-list'>
                    {DecorationsList?.map((ele) => (
                        <div className='decorations-content-img'>
                            <img src={ele?.img} />
                            <div className='decorations-name'>{ele?.name}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}