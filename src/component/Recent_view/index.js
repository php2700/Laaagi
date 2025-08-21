import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Myannimation } from '../annimation/homeannimation';

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
    const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;

    return (
        <Myannimation direction="up">
        <div className="recent-view" >
            {recentViewProduts?.length > 0 &&
                <>
                    <div className='recent-view-top' >Recently Viewed Products</div>
                    <div className='recent-view-img-list' >
                        {recentViewProduts?.map((item) => {
                            let name = item?.name[0]?.toUpperCase() + item?.name.slice(1)?.toLowerCase();
                            return (
                                <div key={item?.id} className='recent-view-img-wrapper' onClick={() => handleView(item)}>
                                    <div>
                                        <img className='recent-view-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="recent-view" />
                                    </div>
                                    <div className='recent-view-img-text'>{name}</div>
                                </div>
                            )
                        })}
                    </div>
                </>}
        </div>
        </Myannimation>
    )
}


