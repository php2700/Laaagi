import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

export const BestSeller = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/best-seller`, {
            params: {
                bestSeller: true
            }
        })
            .then((res) => {
                setData(res?.data?.bestSeller);
            }).catch((error) => {
                console.log(error);
            })
    }, [])





    const handleView = (data) => {
        if (data?.price) {
            const url = 'home'
            navigate(`/invitation-detail/${data?._id}/${url}`)
        }
        else if (Object?.keys(data).includes("isSweet")) {
            const url = 'home';
            navigate(`/sweets-info/${data?._id}/${url}`)
        }
        else {
            navigate(`/dry-fruit_info/${data?._id}`)
        }
    }


    return (
        <div className='sweets' >
            <div className='sweets-content'>
                <div className='sweets-content-list'>
                    {data?.length > 0 &&
                        <>
                            {data?.map((ele) => (
                                <div key={ele.id || ele.name} className='sweets-main-container'>
                                    <div className='sweets-content-img' onClick={() => handleView(ele)}>
                                        <div className='sweets-img-div'>
                                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                        </div>
                                        <div className='sweets-name'>{ele?.name}</div>
                                    </div>
                                </div>
                            ))}
                        </>}
                </div>
                {!data?.length > 0 && (
                    <div className='no-found'>No Data Found</div>
                )}
            </div>
        </div>
    )
}