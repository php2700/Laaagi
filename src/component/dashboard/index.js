import { useLocation, useNavigate } from "react-router-dom"
import { About } from "../about"
import { Ads } from "../ads"
import { Banner } from "../banner"
import { Best_seller } from "../Best_seller"
import { DiscoverCategory } from "../discover_category"
import { Dry_Fruit_Treat } from "../dry_fruit_treat"
import { Footer } from "../footer"
import { InvitationBox } from "../invitation_box"
import { Recent_view } from "../Recent_view"
import { Review } from "../review"
import { Shop } from "../shop"
import { WeddingSpecial } from "../wedding_special"
import { useEffect, useRef } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
// import Loading from "../Loding.js"
import { Lodings } from "../loder/Loding.js"
import { Myannimation } from "../annimation/homeannimation.js"
const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;



export const Dashboard = () => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    AOS.init({
      duration: 1000 // एनिमेशन की अवधि
    });
  }, []);

  const aboutRef = useRef(null);
  useEffect(() => {
    const scrollToAbout = () => {
      const shouldScroll = localStorage.getItem("scrollToAbout");

      if (shouldScroll === "true") {
        console.log(aboutRef.current, "aboutRef.current")
        const checkAndScroll = () => {
          if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("scrollToAbout");
          } else {
            setTimeout(checkAndScroll, 100);
          }
        };
        setTimeout(checkAndScroll, 300);
      }
    };

    scrollToAbout();
    window.addEventListener("scrollToAbout", scrollToAbout);

    return () => {
      window.removeEventListener("scrollToAbout", scrollToAbout);
    };
  }, []);



  return (
    <>

      <Myannimation />
      <Lodings />

      <Myannimation direction="up">
        <Banner />
      </Myannimation>

      <Myannimation direction="up">
        <WeddingSpecial />
      </Myannimation>


      {/* <Dry_Fruit_Treat /> */}
      {/* <Myannimation direction="up">
        <Dry_Fruit_Treat />
        <Myannimation />

      </Myannimation> */}

      <Best_seller />

      <Myannimation direction="up">
        {token && <Recent_view />}
      </Myannimation>
      <Myannimation direction="up">
        <DiscoverCategory />
      </Myannimation>
      <Myannimation direction="up">
        <InvitationBox />
      </Myannimation>
      <Myannimation direction="up">
        <Ads />
      </Myannimation>
      <Myannimation direction="up">
        <About ref={aboutRef} />
      </Myannimation>
      <Myannimation direction="up">
        <Review />
      </Myannimation>
      <Myannimation direction="up">
        <Shop />
      </Myannimation>
      {/* <GuestList/> */}
      <a
        href="https://wa.me/9827479905"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '60px',
          right: '30px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 1000,
          cursor: 'pointer'
        }}
      >

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: '35px', height: '35px' }}
        />
      </a>
    </>

  )

}