import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Recent_view = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("_id")
    const token = localStorage.getItem("token")
    const [recentViewProduts, setRecentViewProduts] = useState([])


    useEffect(() => {
        if (!userId) return
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/recent-view/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setRecentViewProduts(res?.data?.recentView);
            }).catch((error) => {
                console.log(error);
            })
    }, [userId])


    const handleView = (data) => {
        if (data?.price) {
            const url = 'home'
            navigate(`/invitation-detail/${data?.fruitId}/${url}`)
        }
        else if (data.isSweet == 'true' || data.isSweet == 'false') {
            const url = 'home';
            navigate(`/sweets-info/${data?.fruitId}/${url}`)
        } else {
            navigate(`/dry-fruit_info/${data?.fruitId}`)
        }

    }
    return (
        <div className="recent-view" >
            {recentViewProduts?.length > 0 &&
                <>
                    <div className='recent-view-top' >Recent Viewed Products</div>
                    <div className='recent-view-img-list' >
                        {recentViewProduts?.map((item) => (
                            <div key={item?.id} className='recent-view-img-wrapper' onClick={() => handleView(item)}>
                                <div>
                                    <img className='recent-view-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="recent-view" />
                                </div>
                                <div className='recent-view-img-text'>{item?.name}</div>
                            </div>
                        ))}
                    </div>
                </>}
        </div>
    )
}


