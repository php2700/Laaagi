import { useEffect, useState } from 'react';
import firstImg from '../../assets/invitations/image.png'
import secondImg from '../../assets/invitations/image (1).png'
import thirdImg from '../../assets/invitations/image (2).png'
import { sweetsCategory } from '../category'
import './index.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Sweets = () => {
    const [data, setData] = useState([])

    const sweetsDataList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                category: sweetsCategory[0]
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
                        <div >
                            <Link className='sweets-content-img' to='/sweets-info' state={{ data: ele }} >
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                <div className='sweets-name'>{ele?.name}</div>
                                <div className='sweets-price'>{ele?.amount} </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}