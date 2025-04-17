import './index.css'
import image from "../../assets/review/Ellipse 1.png"
import activeReview from '../../assets/review/active.png'
import deactiveReview from "../../assets/review/deactive.png"
import { useEffect, useState } from 'react'

export const Review = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const list = [
        { 'id': 1, name: 'vikas', designation: 'ceo', description: "the eggless cakes here are really good. had ordered a kit  kat cake which was really good. surelly worth a try", image: image },
        { 'id': 2, name: 'rahul', designation: 'founder', description: "the eggless cakes here are really good. had ordered a kit  kat cake which was really good. surelly worth a try", image: image },
        { 'id': 3, name: 'shyam', designation: ' ceo and founder', description: "the eggless cakes here are really good. had ordered a kit  kat cake which was really good. surelly worth a try", image: image }
    ];

    useEffect(() => {
        const inter = setInterval(() => {
            setCurrentIndex((pre) => (pre + 1) % list?.length)
        }, 3000);
        return () => clearInterval(inter)
    }, []);
    const currentReview = list[currentIndex];

    return (
        <div className='review'>
            <div className='review-list'>
                <div className='review-list-desc'>{currentReview?.description}</div>
                <div className='review-list-img'><img src={currentReview?.image} /></div>
                <div className='review-list-name'>{currentReview?.name}</div>
                <div className='review-list-designation'>{currentReview?.designation}</div>
                <div className='review-icon'>
                    {list?.map((ele, index) => (
                        <img src={index == currentIndex ? activeReview : deactiveReview} />
                    ))}
                </div>
            </div>
        </div>
    )
}