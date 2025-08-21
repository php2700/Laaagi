
import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';

export const Dry_fruit = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
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
        navigate(`/dry-fruit_info/${item?._id}`);
    };
    const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;


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