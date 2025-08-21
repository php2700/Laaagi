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
      <Myannimation direction="up">
        <Best_seller />
      </Myannimation>
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
    </>
  )
}