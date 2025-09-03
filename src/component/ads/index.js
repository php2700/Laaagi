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

    const steps = [
        {
            number: 1,
            title: 'Choose Services',
            description: 'Select from invitations, sweets, or complete packages',
        },
        {
            number: 2,
            title: 'Customize Design',
            description: 'Work with our team to create perfect designs',
        },
        {
            number: 3,
            title: 'Production',
            description: 'We create your orders with premium quality',
        },
        {
            number: 4,
            title: 'Delivery',
            description: 'Safe and timely distribution to your guests',
        },
    ];


    return (
        <>
            <div className="ads">
                <div className="ads-first-row">
                    {
                        adsData.filter((item) => (item.banner == 'Banner1' || item.banner == 'Banner2'))
                            .map((ele) => (
                                <div key={ele.id} className="ads-center"><img className="ads-first-row-img" src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} /></div>
                            ))
                    }
                </div>
            </div>

            <section className="how-it-works">
                <h2 className="hiw-title">How It Works</h2>
                <p className="hiw-subtitle">Simple steps to complete your order</p>
                <div className="hiw-steps">
                    {steps.map((step) => (
                        <div key={step.number} className="hiw-step">
                            <div className="hiw-step-number">{step.number}</div>
                            <h3 className="hiw-step-title">{step.title}</h3>
                            <p className="hiw-step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="ads">
                <div className="ads-second-row">
                    {
                        adsData.filter((item) => (item.banner == 'Banner3'))
                            .map((ele) => (
                                <div key={ele.id} className="ads-second-center"><img className="ads-second-row-img" src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} /> </div>
                            ))
                    }
                </div>
            </div>
        </>
    )
}