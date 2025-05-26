import './index.css'
import video from "../../assets/video/sample.mp4"
import rightIcon from '../../assets/icon/li_arrow-right.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const About = () => {
    const [aboutData, setAboutData] = useState({})
    const [learnMore, setLearnMore] = useState(false)

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
        <div className='about' id="about-us">
            <div className='about-us'>
                <div className='about-heading'>About Us</div>
                <div className='about-desc'>
                    {learnMore ? aboutData?.description : aboutData?.description?.slice(0, 200) + (aboutData?.description?.length > 200 ? '...' : '')}
                </div>

                {aboutData?.description?.length > 200 && (
                    <div className='about-more-learn'>
                        <button className='about-button' onClick={() => setLearnMore(!learnMore)}>
                            {learnMore ? 'Show Less' : 'Learn More'}
                            <img src={rightIcon} alt="arrow" />
                        </button>
                    </div>
                )}

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