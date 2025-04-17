import './index.css'
import video from "../../assets/video/sample.mp4"
import rightIcon from '../../assets/icon/li_arrow-right.png'

export const About = () => {
    return (
        <div className='about'>
            <div className='about-us'>
                <div className='about-heading'>About Us</div>
                <div className='about-desc'>lorem ipsum dolor sit amet consectetur adipisicing elit .Consequat bibendum sit felis,sollicitudin et nulla aliquit integer hac ac morbi</div>
                <div className='about-more-learn'>
                    <button className='about-button'>Learn More<img src={rightIcon} /></button>
                </div>
            </div>
            <div className='about-video-section'>
                <video className='about-video'
                    muted
                    playsInline
                    controls>
                    <source src={video} type='video/mp4' />
                </video>
            </div>
        </div>
    )
}