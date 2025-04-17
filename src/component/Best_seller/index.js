import './index.css'
import bestSellerImg from '../../assets/best_seller.png'
import rightIcon from "../../assets/icon/li_arrow-right.png"
import axios from 'axios'
import { useEffect, useState } from 'react'
import leftIcon from "../../assets/icon/left_arrow-right.png"



export const Best_seller = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(3)
    const [bestSellerData, setBestSellerData] = useState([])

    const BestSellerList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/best_seller_list`).then((res) => {
            setBestSellerData(res?.data?.bestSellerData)
        }).catch((error) => {
            console.log(error)
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
        const prevEnd = Math.max(3, lastIndex - 4)
        setStartIndex(prevStart)
        setLastIndex(prevEnd)
    }
    return (
        <div className='best-seller'>
            <div className='best-seller-top'>
                <div className='best-seller-left-text'> Best Sellers</div>
                {/* <div className='best-seller-right-text'> see more</div> */}
            </div>
            <div className='best-seller-img-list'>
                {
                    (startIndex > 0) && (
                        <div onClick={() => handleBack()} className='best-seller-left-icon'>
                            <img src={leftIcon} />
                        </div>
                    )
                }
                {bestSellerData?.slice(startIndex, lastIndex + 1)?.map((item) => (
                    <div key={item?.id} className='best-seller-wrapper'>
                        <img className='best-seller-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                        <div className='best-seller-img-text'>{item?.name}</div>
                    </div>
                ))}
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