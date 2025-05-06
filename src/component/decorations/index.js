import { useEffect, useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'

import './index.css'
import { Link } from 'react-router-dom';
import { Model } from './model';
import axios from 'axios';


const decorationHeader = [
    { name: 'Marriage', category: 'Marriage' },
    { name: 'Birthday', category: 'Birthday' },
    { name: 'Mehndi', category: 'Mehndi' },
    { name: 'Room Decor', category: 'RoomDecor' },
    { name: 'Party', category: 'Party' }
]

export const Decorations = () => {
    const [open, setOpen] = useState(false)
    const [imgData, setImgData] = useState();
    const [category, setCategory] = useState('Marriage')
    const [decorationData, setDecorationData] = useState([])

    const getDecorationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/decoration_list`, {
            params: {
                category: category
            }
        })
            .then((res) => {
                setDecorationData(res?.data?.decorationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getDecorationList()
    }, [category])

    const handleModel = (imgData) => {
        setImgData(imgData)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUrl = (ele) => {
        setCategory(ele?.category);
    }

    return (
        <div className='decorations' >
            <div className='decorations-header'>
                {decorationHeader?.map((ele) => (
                    <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
                ))}
            </div>
            <div className='decorations-content'>
                <div className='decorations-content-list'>
                    {decorationData?.map((ele) => (
                        <div className='decorations-content-img'>
                            <div className='decoration-img-align' onClick={() => handleModel(ele)}>
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            </div>
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