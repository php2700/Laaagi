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
// import Loading from "../Loding.js"
import { Lodings } from "../loder/Loding.js"

export const Dashboard = () => {
  const token = localStorage.getItem('token');

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
      <Lodings />
      <Banner />
      <WeddingSpecial />
      {/* <Dry_Fruit_Treat /> */}
      <Best_seller />
      {token && <Recent_view />}
      <DiscoverCategory />
      <InvitationBox />
      <Ads />
      <About ref={aboutRef} />
      <Review />
      <Shop />
      {/* <GuestList/> */}
    </>
  )
}