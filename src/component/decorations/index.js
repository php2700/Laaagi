import { useEffect, useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';
import { Model } from './model';
import { decorationCategory } from '../category';
import axios from 'axios';

export const Decorations = () => {
    const [open, setOpen] = useState(false)
    const [imgData, setImgData] = useState();
    const [data, setData] = useState([])

    const decorationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/decoration_list`, {
            params: {
                category: decorationCategory[0]
            }
        })
            .then((res) => {
                setData(res?.data?.decorationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        decorationList()
    }, [])

    const handleModel = (imgData) => {
        setImgData(imgData)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                    {data?.map((ele) => (
                        <div className='decorations-content-img' onClick={() => handleModel(ele)}>
                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            <div className='decorations-name'>{ele?.category}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Model
                open={open}
                onClose={handleClose}
                data={imgData}
            />
        </div>
    )
}