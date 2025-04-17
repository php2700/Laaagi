import { useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';

export const Glass = () => {
    const [selectedPrice, setSelectedPrice] = useState('');
    const pricefilterList = [{ "id": 1, value: '50-150' }, { "id": 2, value: '150-300' }, { "id": 3, value: '300-500' }, { "id": 4, value: '500 & above' },]
    const invitationList = [
        { "id": 1, name: 'ram and sara', img: firstImg, category: 'Wooden Box' },
        { "id": 2, name: 'rupali & abhishek', img: secondImg, category: 'Wooden Box' },
        { "id": 3, name: 'anshika & rachit', img: thirdImg, category: 'Wooden Box' },
        { "id": 4, name: 'ram and sara', img: firstImg, category: 'Wooden Box' },
        { "id": 5, name: 'rupali & abhishek', img: secondImg, category: 'Wooden Box' },
        { "id": 6, name: 'anshika & rachit', img: thirdImg, category: 'Wooden Box' },
        { "id": 7, name: 'ram and sara', img: firstImg, category: 'Wooden Box' },
        { "id": 8, name: 'rupali & abhishek', img: secondImg, category: 'Wooden Box' },
        { "id": 9, name: 'anshika & rachit', img: thirdImg, category: 'Wooden Box' },
    ]
    return (
        <div className='invitations' >
            <div className='invitations-header'>
                <div><Link to='/invitation'>Only Invitation</Link></div>
                <div><Link to='/invitation-wooden'>Invitation on Wooden Box</Link></div>
                <div><Link to='/invitation-box'>Invitation on Box</Link></div>
                <div><Link to='/invitation-glass'>Invitation on Glass Box</Link></div>
                <div><Link to='/invitation-misc'>Misc Invitation</Link></div>
            </div>
            <div className='invitations-content'>
                <div className='invitations-price-left'>
                    <div className='invitation-price-header'>Price Range filter</div>
                    <div className='invitation-price'>50-150</div>
                    <div className='invitation-price'>150-300</div>
                    <div className='invitation-price'>300-500</div>
                    <div className='invitation-price'>500 & Above</div>
                </div>
                <div className='invitations-content-header'>
                    <div className='invitation-content-text'> Upload Your Design and get quote for the same</div>
                    <div className='invitation-content-list'>
                        {invitationList?.map((ele) => (
                            <div className='invitation-content-img'>
                                <img src={ele?.img} />
                                <div>{ele?.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}