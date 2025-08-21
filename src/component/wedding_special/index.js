import './index.css'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Myannimation } from '../annimation/homeannimation';

export const WeddingSpecial = () => {
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [data, setData] = useState([]);
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo;
    const navigate = useNavigate();


    const weddingSpecialList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                isWedding: true
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
        weddingSpecialList()
    }, [])

    const handleForwardIcon = () => {
        let totalItems = data?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
        console.log(nextStart, "nextStart", nextLast, "nextLast")
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        const prevStart = Math.max(0, startIndex - 3);
        const prevLast = Math.max(2, startIndex - 1);

        setStartIndex(prevStart);
        setLastIndex(prevLast);
    };

    const handleWeddingInfo = (data) => {
        sweetsInfo(data)
        // navigate('/sweets-info')
        const url = 'home';
        navigate(`/sweets-info/${data?._id}/${url}`);
    }
    const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;



    return (
        <Myannimation direction="up">
        <div className="wedding" >
            <div className='wedding-top' >
                <div className='wedding-left-text'>Wedding special</div>
                <Link to="/sweets" state={{ filter: 'wedding' }} className="wedding-right-text">See More</Link>
            </div>
            <div className='wedding-img-list' >
                {startIndex > 0 && (
                    <div onClick={handlePrev} className='wedding-img-left-icon'>
                        <img src={leftIcon} alt="prev" />
                    </div>
                )}
                {data?.slice(startIndex, lastIndex + 1).map((item) => {
                    let name = item?.name[0]?.toUpperCase() + item?.name.slice(1)?.toLowerCase();
                    return (
                        <div key={item?.id} className='wedding-img-wrapper' onClick={() => handleWeddingInfo(item)}>
                            <div className='wedding-img-container'>
                                <img className='wedding-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="Wedding" />
                            </div>
                            <div className='wedding-img-text'>{name}</div>
                        </div>
                    )
                })}
                {(lastIndex < (data?.length || 0) - 1) && (
                    <div onClick={() => { handleForwardIcon() }} className='wedding-img-right-icon'>
                        <img src={rightIcon} />
                    </div>
                )}
            </div>
        </div>
        </Myannimation>

    )
}
