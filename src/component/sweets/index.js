import { useContext, useEffect, useState } from 'react';
import './index.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png"




const sweetsHeader = [
    { name: 'Sugar Free', category: 'SugarFree' },
    { name: 'Bengali Sweets', category: 'BengaliSweets' },
    { name: 'Sweets', category: 'Sweets' },
    { name: 'Sweets', category: 'Sweets' },
    { name: 'Sweets', category: 'Sweets' }
]




export const Sweets = () => {
    const navigate = useNavigate()
    const content = useLocation();
    const isInvitationSweets = content?.state?.data;
    const invitationId = content?.state?.invitationId;
    const name = content?.state?.name
    const index = content?.state?.idx;
    const id = content?.state?.id;
    const [data, setData] = useState([])
    const [invitationselectSweet, setInvitationSelectSweet] = useState();
    const [orderId, setOrderId] = useState();
    const [category, setCategory] = useState('SugarFree')

    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(2)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

    const handleForwardIcon = () => {
        const totalItems = sweetsHeader?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])


    const sweetsDataList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
            params: {
                category: category
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
    }, [category])


    const handleSweet = (item) => {
        setOrderId(item?.orderId)
        setInvitationSelectSweet(item)
    }

    const handleUrl = (ele) => {
        setCategory(ele?.category);
    }

    const handleInvitationSweet = () => {
        navigate("/invitation-detail", { state: { ...invitationselectSweet, index: index, invitationId: invitationId, name: name, showId: id } })
    }
    return (

        <div className='sweets' >
            <div className='sweets-header'>

                {
                    isMobile ? <>
                        {startIndex > 0 &&
                            <div onClick={handlePrev}><img src={leftIcon} /></div>
                        }
                        {sweetsHeader?.slice(startIndex, lastIndex + 1)?.map((ele) => (
                            // <div><Link to={ele.url} >{ele?.name}</Link></div>
                            <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
                        ))}
                        {(lastIndex < (sweetsHeader?.length || 0) - 1) &&
                            <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                        }
                    </> : <>
                        {sweetsHeader?.map((ele) => (
                            // <div><Link to={ele.url} >{ele?.name}</Link></div>
                            <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
                        ))}
                    </>
                }
            </div>
            {
                isInvitationSweets ?
                    <div className='sweets-content'>
                        <div className='sweets-content-list'>
                            {data?.map((ele) => (
                                <div className='sweets-content-img' onClick={() => handleSweet(ele)}>
                                    {
                                        orderId == ele?.orderId && <div className='show-arrow-right'><img src={rightArrow} /></div>
                                    }
                                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                    <div className='sweets-name'>{ele?.name}</div>
                                    <div className='sweets-price'> {ele?.amount} </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : <div className='sweets-content'>
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
            }
            {
                isInvitationSweets && <div className='sweet-select'>
                    <div className='btn-done' onClick={handleInvitationSweet} >Done </div>
                </div>
            }
        </div>
    )
}