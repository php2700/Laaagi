import { useEffect, useState } from 'react';
import './index.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { designerCategory } from '../category';

export const Other = () => {
    const [data, setData] = useState([])

    const designerLsit = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/designers_list`, {
            params: {
                category: designerCategory[3]
            }
        })
            .then((res) => {
                setData(res?.data?.designerData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        designerLsit()
    }, [])
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
                    {data?.map((ele) => (
                        <div className='designers-content-img'>
                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                            <div className='designers-name'>{ele?.name}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}