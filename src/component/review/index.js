import './index.css'
import image from "../../assets/review/Ellipse 1.png"
import activeReview from '../../assets/review/active.png'
import deactiveReview from "../../assets/review/deactive.png"
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Review = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2)
    const [reviewListData, setReviewListData] = useState([])

    const reviewList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/review_list`).then((res) => {
            setReviewListData(res?.data?.reviewData)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        reviewList()
    }, [])

    useEffect(() => {
        if (!reviewListData?.length) return;
        const inter = setInterval(() => {
            setCurrentIndex((pre) => (pre + 1) % reviewListData?.length)
        }, 3000);
        return () => clearInterval(inter)
    }, [reviewListData]);
    const currentReview = reviewListData[currentIndex];

    return (
        <div className='review'>
            <div className='review-list'>
                <div className='review-list-desc'>{currentReview?.description}</div>
                <div className='review-list-img'><img src={`${process.env.REACT_APP_BASE_URL}uploads/${currentReview?.image}`} /></div>
                <div className='review-list-name'>{currentReview?.name}</div>
                <div className='review-list-designation'>{currentReview?.designation}</div>
                <div className='review-icon'>
                    {reviewListData?.map((ele, index) => (
                        <img src={index == currentIndex ? activeReview : deactiveReview} />
                    ))}
                </div>
            </div>
        </div>
    )
}