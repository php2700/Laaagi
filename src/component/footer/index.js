import './index.css'
import logo from "../../assets/logo/laaagi.png"
import locationIcon from "../../assets/icon/mapicon.png"
import callIcon from '../../assets/icon/callIcon.png'
import emailIcon from '../../assets/icon/li_mail.png'
import timeIcon from '../../assets/icon/li_clock-9.png'
import horizontalImg from '../../assets/footer/horizontal.png'
import payment from "../../assets/footer/Payment.png"
import instIcon from '../../assets/icon/insta.png'
import twittericon from '../../assets/icon/twitter.png'
import facebook from "../../assets/icon/face.png"
import linked from "../../assets/icon/linked.png"

export const Footer = () => {
    return (
        <div>
            <div className='whole-footer'>
                <div className='footer'>
                    <div className='footer-left-bar-align'>
                        <div className='footer-left-bar'>
                            <img className='footer-left-logo' src={logo} />
                            <div className='footer-left-header'>Laaagi</div>
                        </div>
                        <div className='footer-left-location'>
                            <img className='footer-left-icon' src={locationIcon} />
                            <div className='footer-left-location-text'>&nbsp; Address</div>
                            <div className='footer-left-location-right'>:Indore M.P.</div>
                        </div>
                        <div className='footer-left-call'>
                            <img className='footer-left-call-icon' src={callIcon} />
                            <div className='footer-left-call-text'>&nbsp; Call Us</div>
                            <div className='footer-left-call-right'>: 1233-777</div>
                        </div>
                        <div className='footer-left-email'>
                            <img className='footer-left-email-icon' src={emailIcon} />
                            <div className='footer-left-email-text'>&nbsp;Email</div>
                            <div className='footer-left-email-right'>:support@laaagi.com</div>
                        </div>
                        <div className='footer-left-work'>
                            <img className='footer-left-work-icon' src={timeIcon} />
                            <div className='footer-left-work-text'>&nbsp;Work hours</div>
                            <div className='footer-left-work-right'>:8:00-20:00,Sunday-Thursday</div>
                        </div>
                    </div>
                    <div className='footer-left-middle'>
                        <div className='footer-left-middle-header'>Account</div>
                        <div className='footer-left-middle-text'>Sweets</div>
                        <div className='footer-left-middle-text'>Invitation</div>
                        <div className='footer-left-middle-text'>Decoration</div>
                        <div className='footer-left-middle-text'>Planning Tool</div>
                    </div>
                    <div className='footer-left-middle'>
                        <div className='footer-left-middle-header'>Useful links</div>
                        <div className='footer-left-middle-text'>About Us</div>
                        <div className='footer-left-middle-text'>Contact</div>
                        <div className='footer-left-middle-text'>Promotions</div>
                    </div>
                    <div className='footer-left-middle'>
                        <div className='footer-left-middle-header'>Help Center</div>
                        <div className='footer-left-middle-text'>Payments</div>
                        <div className='footer-left-middle-text'>Refund</div>
                        <div className='footer-left-middle-text'>Checkout</div>
                        <div className='footer-left-middle-text'>Shipping</div>
                        <div className='footer-left-middle-text'>Privacy Policy</div>
                    </div>
                </div>
                <div className='footer-middle'>
                    <img src={horizontalImg} />
                </div>
                <div className='footer-right'>
                    <div className='footer-right-text'>2025,All rights reserved</div>
                    <div className='footer-img-center'>
                        <img src={payment} />
                    </div>
                    <div className='footer-right-icon'>
                        <div className='footer-right-img-icon' ><img src={facebook} /></div>
                        <div className='footer-right-img-icon'><img src={linked} /></div>
                        <div className='footer-right-img-icon'><img src={twittericon} /></div>
                        <div className='footer-right-img-icon'><img src={instIcon} /></div>
                    </div>
                </div>
            </div>

            <div className='footer-color-black'>
            </div>
            <div className='footer-color-red'>
            </div>
        </div>

    )
}