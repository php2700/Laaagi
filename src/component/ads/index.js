import { useEffect, useState } from "react";
import firstImg from "../../assets/ads/first.png"
import secondImg from "../../assets/ads/second.png"
import thirdImg from "../../assets/ads/third.png"
import './index.css';
import axios from "axios";


export const Ads = () => {
       const [adsData, setAdsData] = useState([])

    const adsList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/ads_list`)
            .then((res) => {
                setAdsData(res?.data?.adsData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        adsList()
    }, [])


    return (
        <div className="ads">
            <div className="ads-first-row">
                {
                    adsData.filter((item) => (item.banner == 'Banner1' || item.banner == 'Banner2'))
                        .map((ele) => (
                            <div key={ele.id} className="ads-center"><img className="ads-first-row-img" src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} /></div>
                        ))
                }
            </div>
            <div className="ads-second-row">
                {
                    adsData.filter((item) => (item.banner == 'Banner3'))
                        .map((ele) => (
                            <div key={ele.id} className="ads-second-center"><img className="ads-second-row-img" src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} /> </div>
                        ))
                }
            </div>
        </div>
    )
}