import './index.css'
import video from "../../assets/video/sample.mp4"
import rightIcon from '../../assets/icon/li_arrow-right.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const About = () => {
    const [aboutData, setAboutData] = useState({})

    const aboutList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/about_list`)
            .then((res) => {
                setAboutData(res?.data?.aboutData);
            }).catch((error) => {
                console.log(error);
            })
    }

    console.log(`${process.env.REACT_APP_BASE_URL}uploads/${aboutData?.video}`)
    useEffect(() => {
        aboutList()
    }, [])

    return (
        <div className='about'>
            <div className='about-us'>
                <div className='about-heading'>About Us</div>
                <div className='about-desc'>{aboutData?.description}</div>
                {/* <div className='about-more-learn'>
                    <button className='about-button'>Learn More<img src={rightIcon} /></button>
                </div> */}
            </div>
            <div className='about-video-section'>
                <video className='about-video'
                    key={aboutData?.video}
                    muted
                    playsInline
                    controls>
                    <source src={`${process.env.REACT_APP_BASE_URL}uploads/${aboutData?.video}`} type='video/mp4' />
                </video>
            </div>
        </div>
    )
}