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

  const testimonials = [
    {
      name: 'Rajdeep & Simran',
      location: 'Amritsar',
      stars: 5,
      message: 'Perfect invitations and delicious sweets for our wedding. Great service!',
    },
    {
      name: 'Harpreet Singh',
      location: 'Ludhiana',
      stars: 5,
      message: 'Professional service, beautiful cards, and on-time delivery. Highly recommended!',
    },
  ];
  return (
    <>
      <div className="testimonials-container">
        <h2 className="title">What Our Clients Say</h2>
        <p className="subtitle">Real experiences from satisfied families</p>
        <div className="testimonials">
          {reviewListData.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote">❝</div>
              <div className="stars">
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="review-description"><i>"{testimonial?.description}"</i></p>
              <p className="name">{testimonial?.name}</p>
              <p className="location">{testimonial?.location}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    // <div className='review'>
    //     <div className='review-list'>
    //         <div className='review-list-desc'>{currentReview?.description}</div>
    //         <div className='review-list-img'><img src={`${process.env.REACT_APP_BASE_URL}uploads/${currentReview?.image}`} /></div>
    //         <div className='review-list-name'>{currentReview?.name}</div>
    //         <div className='review-list-designation'>{currentReview?.designation}</div>
    //         <div className='review-icon'>
    //             {reviewListData?.map((ele, index) => (
    //                 <img src={index == currentIndex ? activeReview : deactiveReview} />
    //             ))}
    //         </div>
    //     </div>
    // </div>
  )
}