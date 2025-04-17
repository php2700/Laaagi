import { useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';

export const Designers = () => {
    const designerList = [
        { "id": 1, name: 'Marriage', img: firstImg, category: 'Wooden Box' },
        { "id": 2, name: 'Marriage', img: secondImg, category: 'Wooden Box' },
        { "id": 3, name: 'Marriage', img: thirdImg, category: 'Wooden Box' },
        { "id": 4, name: 'Marriage', img: firstImg, category: 'Wooden Box' },
        { "id": 5, name: 'Marriage', img: secondImg, category: 'Wooden Box' },
        { "id": 6, name: 'Marriage', img: thirdImg, category: 'Wooden Box' },
        { "id": 7, name: 'Marriage', img: firstImg, category: 'Wooden Box' },
        { "id": 8, name: 'Marriage', img: secondImg, category: 'Wooden Box' },
        { "id": 9, name: 'Marriage', img: thirdImg, category: 'Wooden Box' },
    ]



    return (
        <div className='designers' >
            <div className='designers-header'>
                <div><Link to='/designers'>Bridge</Link></div>
                <div><Link to='/groom'>Groom</Link></div>
                <div><Link to='/suits'>Suits</Link></div>
                <div><Link to='/other'>Other</Link></div>
            </div>
            <div className='designers-content'>
                <div className='designers-content-list'>
                    {designerList?.map((ele) => (
                        <div className='designers-content-img'>
                            <img src={ele?.img} />
                            <div className='designers-name'>{ele?.name}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}