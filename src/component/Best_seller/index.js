import './index.css'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'



export const Best_seller = () => {
    const context = useContext(AuthContext);
    // const setInvitationsweet = context.setSelectSweet;
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(3)
    const [bestSellerData, setBestSellerData] = useState([])
    const navigate = useNavigate();

    const BestSellerList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/best-seller`, {
            params: {
                bestSeller: true
            }
        })
            .then((res) => {
                setBestSellerData(res?.data?.bestSeller);
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        BestSellerList()
    }, [])


    const handleForward = () => {
        const totalItems = bestSellerData?.length || 0;
        const nextStart = lastIndex + 1;
        const nextEnd = lastIndex + 4;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextEnd, totalItems - 1))
        }
    }

    const handleBack = () => {
        const prevStart = Math.max(0, startIndex - 4)
        const prevEnd = Math.max(3, startIndex - 1)
        setStartIndex(prevStart)
        setLastIndex(prevEnd)
    }

    const handleView = (data) => {
        if (data?.price) {
            const url = 'home'
            // setInvitationsweet(data)
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

    const handleBestSeller = (e) => {
        navigate('/best-seller')
    }
    return (
        <div className='best-seller'>
            <div className='best-seller-top'>
                <div className='best-seller-left-text'> Best Sellers</div>
                <div className='best-seller-right-text' onClick={handleBestSeller}> See More</div>
            </div>
            <div className='best-seller-img-list'>
                {
                    (startIndex > 0) && (
                        <div onClick={() => handleBack()} className='best-seller-left-icon'>
                            <img src={leftIcon} />
                        </div>
                    )
                }
                {bestSellerData?.slice(startIndex, lastIndex + 1)?.map((item) => {
                    let name = item?.name[0]?.toUpperCase() + item?.name.slice(1)?.toLowerCase();


                    return (
                        <div key={item?.id} className='best-seller-wrapper'>
                            <div className='best-seller-img-parent' onClick={() => handleView(item)}>
                                <img className='best-seller-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                            </div>
                            <div className='best-seller-img-text'>{name}</div>
                        </div>
                    )
                })}
                {
                    (lastIndex < bestSellerData?.length - 1) && (
                        <div onClick={() => handleForward()} className='best-seller-right-icon'>
                            <img src={rightIcon} />
                        </div>
                    )
                }

            </div>

        </div>
    )
}