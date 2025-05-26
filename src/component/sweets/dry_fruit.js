
import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

export const Dry_fruit = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const setRecentView = context?.setRecentView;
    const sweetsInfo = context?.setSweetsInfo
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit_list`)
            .then((res) => {
                setData(res?.data?.dryFruitData || []);
            }).catch((error) => {
                console.error("Error fetching dry fruits:", error);
                setData([]);
            });
    }, []);


    const handleItemDetailNavigation = (item) => {
        if (sweetsInfo) {
            sweetsInfo(item);
        }
        setRecentView(item)
        navigate(`/dry-fruit_info/${item?._id}`);
    };

    return (
        <div className='sweets' >
            <div className='sweets-content'>
                <div className='sweets-content-list'>
                    {data?.length > 0 &&
                        <>
                            {data?.map((ele) => (
                                <div key={ele.id || ele.name} className='sweets-main-container'>
                                    <div className='sweets-content-img' onClick={() => handleItemDetailNavigation(ele)}>
                                        <div className='sweets-img-div'>
                                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                        </div>
                                        <div className='sweets-name'>{ele?.name}</div>
                                        {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                    </div>
                                </div>
                            ))}
                        </>}
                </div>
            </div>
        </div>
    )
}