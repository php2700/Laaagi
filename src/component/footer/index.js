// import './index.css'
// import logo from "../../assets/logo/footer.png"
// import locationIcon from "../../assets/icon/mapicon.png"
// import callIcon from '../../assets/icon/callIcon.png'
// import emailIcon from '../../assets/icon/li_mail.png'
// import timeIcon from '../../assets/icon/li_clock-9.png'
// import horizontalImg from '../../assets/footer/horizontal.png'
// import payment from "../../assets/footer/Payment.png"
// import instIcon from '../../assets/icon/insta.png'
// import twittericon from '../../assets/icon/twitter.png'
// import facebook from "../../assets/icon/face.png"
// import linked from "../../assets/icon/linked.png"
// import { Link, useNavigate } from 'react-router-dom'
// import { Myannimation } from "../annimation/homeannimation.js"
// const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
// const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
// const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
// const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;

// export const Footer = () => {
//     const token = localStorage.getItem('token')
//     const navigate = useNavigate();
//     const handleAbout = () => {
//         const currentPath = window.location.pathname;
//         localStorage.setItem("scrollToAbout", "true");
//         if (currentPath === "/") {
//             window.dispatchEvent(new Event("scrollToAbout"));
//         } else {
//             navigate("/");
//         }
//     };

//     const scrolltop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }

//     const handleHistory = () => {
//         if (token) {
//             navigate('/payment-history')
//         } else {
//             navigate('/signup')
//         }
//     }

//     return (
//         <>
//         <Myannimation direction="up">
//         <div className='footers'>
//             <div className='whole-footer'>
//                 <div className='footer'>
//                     <div className='footer-left-bar-align'>
//                         <div className='footer-left-bar'>
//                             <img className='footer-left-logo' src={logo} />
//                             <div className='footer-left-header' style={{
//                                 fontFamily: "'Dancing Script', cursive",

//                             }}>Laaagi</div>
//                         </div>
//                         <div className='footer-left-location'>
//                             <img className='footer-left-icon' src={locationIcon} />
//                             <div className='footer-left-location-text'>&nbsp; Address</div>
//                             <div className='footer-left-location-right'>: Main Market, Sur Singh, Tarn Taran, Punjab-143302</div>
//                         </div>
//                         <div className='footer-left-call'>
//                             <img className='footer-left-call-icon' src={callIcon} />
//                             <div className='footer-left-call-text'>&nbsp; Call Us</div>
//                             <div className='footer-left-call-right'>: +91 8699991906</div>
//                         </div>
//                         <div className='footer-left-email'>
//                             <img className='footer-left-email-icon' src={emailIcon} />
//                             <div className='footer-left-email-text'>&nbsp; Email</div>
//                             <div className='footer-left-email-right'>: yourpersonallaaagi@gmail.com</div>
//                         </div>
//                         <div className='footer-left-work'>
//                             <img className='footer-left-work-icon' src={timeIcon} />
//                             <div className='footer-left-work-text'>&nbsp; Work hours </div>
//                             <div className='footer-left-work-right'>: 8:00-20:00, Sunday-Thursday</div>
//                         </div>
//                     </div>
//                     <div className='footer-left-middle'>
//                         <div className='footer-left-middle-header'>Category</div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/sweets'>Sweets</Link></div>
//                         <div className='footer-left-middle-text'> <Link onClick={scrolltop} to='/invitation'>Invitation</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/decorations'>Decoration</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/planning-tool'>Planning Tool</Link></div>
//                     </div>
//                     <div className='footer-left-middle'>
//                         <div className='footer-left-middle-header'>Useful Links</div>
//                         <div className='footer-left-middle-text'><div className='handle-about' onClick={handleAbout} >About Us</div></div>

//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/contact-us'>Contact</Link></div>
//                         <div className='footer-left-middle-text'>Promotions</div>
//                     </div>
//                     <div className='footer-left-middle'>
//                         <div className='footer-left-middle-header'>Help Center</div>
//                         <div className='footer-left-middle-text' onClick={handleHistory}><Link to='/payment-history'>Payments</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/payment-refund'>Refund</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/term-condition'>Terms and Conditions</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/shipping'>Shipping</Link></div>
//                         <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/privacy-policy'>Privacy Policy</Link></div>
//                     </div>
//                 </div>
//                 <div className='footer-middle'>
//                     <img src={horizontalImg} />
//                 </div>
//                 <div className='footer-right'>
//                     <div className='footer-right-text'>2025, All rights reserved</div>
//                     <div className='footer-img-center'>
//                         <img src={payment} />
//                     </div>
//                     <div className='footer-right-icon'>
//                         <div className='footer-right-img-icon' ><a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/'><img src={facebook} /></a></div>
//                         <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://in.linkedin.com/'><img src={linked} /></a></div>
//                         <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://www.twitter.com/'><img src={twittericon} /></a></div>
//                         <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/'><img src={instIcon} /></a></div>
//                     </div>
//                 </div>
//             </div>

//             <div className='footer-color-black'>
//             </div>
//             <div className='footer-color-red'>
//             </div>
//         </div>
//         <Myannimation />
//         </>
        

//     )
// }

import './index.css'
import logo from "../../assets/logo/footer.png"
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
import { Link, useNavigate } from 'react-router-dom'
import {Myannimation} from "../annimation/homeannimation"   // ✅ assuming default export

const BannerSection = () => (
  <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1>Hero Section</h1>
  </div>
);

const AboutSection = () => (
  <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2>About Us Section</h2>
  </div>
);

const WeddingSpecialSection = () => (
  <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2>Our Services</h2>
  </div>
);

const ContactSection = () => (
  <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2>Contact Us</h2>
  </div>
);

export const Footer = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleAbout = () => {
    const currentPath = window.location.pathname;
    localStorage.setItem("scrollToAbout", "true");
    if (currentPath === "/") {
      window.dispatchEvent(new Event("scrollToAbout"));
    } else {
      navigate("/");
    }
  };

  const scrolltop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleHistory = (e) => {
    e.preventDefault();
    if (token) {
      navigate('/payment-history')
    } else {
      navigate('/signup')
    }
  }

  return (
    <Myannimation direction="up">
      <div className='footers'>
        <div className='whole-footer'>
          <div className='footer'>
            {/* Left Side */}
            <div className='footer-left-bar-align'>
              <div className='footer-left-bar'>
                <img className='footer-left-logo' src={logo} alt="logo" />
                <div className='footer-left-header' style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Laaagi
                </div>
              </div>
              <div className='footer-left-location'>
                <img className='footer-left-icon' src={locationIcon} alt="location" />
                <div className='footer-left-location-text'>&nbsp; Address</div>
                <div className='footer-left-location-right'>: Main Market, Sur Singh, Tarn Taran, Punjab-143302</div>
              </div>
              <div className='footer-left-call'>
                <img className='footer-left-call-icon' src={callIcon} alt="call" />
                <div className='footer-left-call-text'>&nbsp; Call Us</div>
                <div className='footer-left-call-right'>: +91 8699991906</div>
              </div>
              <div className='footer-left-email'>
                <img className='footer-left-email-icon' src={emailIcon} alt="email" />
                <div className='footer-left-email-text'>&nbsp; Email</div>
                <div className='footer-left-email-right'>: yourpersonallaaagi@gmail.com</div>
              </div>
              {/* <div className='footer-left-work'>
                <img className='footer-left-work-icon' src={timeIcon} alt="time" />
                <div className='footer-left-work-text'>&nbsp; Work hours </div>
                <div className='footer-left-work-right'>: 8:00-20:00, Sunday-Thursday</div>
              </div> */}
            </div>

            {/* Middle Section - Categories */}
            <div className='footer-left-middle'>
              <div className='footer-left-middle-header'>Category</div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/sweets'>Sweets</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/invitation'>Invitation</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/decorations'>Decoration</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/planning-tool'>Planning Tool</Link></div>
            </div>

            {/* Useful Links */}
            <div className='footer-left-middle'>
              <div className='footer-left-middle-header'>Useful Links</div>
              <div className='footer-left-middle-text'><div className='handle-about' onClick={handleAbout}>About Us</div></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/contact-us'>Contact</Link></div>
              <div className='footer-left-middle-text'>Promotions</div>
            </div>

            {/* Help Center */}
            <div className='footer-left-middle'>
              <div className='footer-left-middle-header'>Help Center</div>
              <div className='footer-left-middle-text'>
                <Link onClick={handleHistory} to='/payment-history'>Payments</Link>
              </div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/payment-refund'>Refund</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/term-condition'>Terms and Conditions</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/shipping'>Shipping</Link></div>
              <div className='footer-left-middle-text'><Link onClick={scrolltop} to='/privacy-policy'>Privacy Policy</Link></div>
            </div>
          </div>

          {/* Middle Divider */}
          <div className='footer-middle'>
            <img src={horizontalImg} alt="divider" />
          </div>

          {/* Right Section */}
          <div className='footer-right'>
            <div className='footer-right-text'>2025, All rights reserved</div>
            <div className='footer-img-center'>
              <img src={payment} alt="payment methods" />
            </div>
            <div className='footer-right-icon'>
              <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/'><img src={facebook} alt="facebook" /></a></div>
              <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://in.linkedin.com/'><img src={linked} alt="linkedin" /></a></div>
              <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://www.twitter.com/'><img src={twittericon} alt="twitter" /></a></div>
              <div className='footer-right-img-icon'><a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/'><img src={instIcon} alt="instagram" /></a></div>
            </div>
          </div>
        </div>

        {/* Background colors */}
        <div className='footer-color-black'></div>
        <div className='footer-color-red'></div>
      </div>
    </Myannimation>
  )
}
