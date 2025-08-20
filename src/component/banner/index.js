import axios from "axios"
import { useEffect, useState } from "react"
import activeImg from "../../assets/banner/active.png"
import deActive from "../../assets/banner/deActive.png"
import './index.css'

export const Banner = () => {
    const [data, setData] = useState();
    const [index, setIndex] = useState(0)

    const bannerlist = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/banner_list`).then((res) => {
            console.log(res?.data?.banner, '333')
            setData(res?.data?.banner);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (!data?.length) return
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % data?.length)
        }, 5000)
        return () => { clearInterval(interval) }
    }, [data?.length])

    useEffect(() => {
        bannerlist();
    }, [])

    if (!data?.length) return null;

    return (
        <div className="banner">
            {
                <div className="banner-img" style={{ position: 'relative' }}>

                    <img
                        style={{
                            width: '100%',
                            aspectRatio: 16 / 4
                        }}
                        alt="Banner" src={`${process.env.REACT_APP_BASE_URL}uploads/${data[index]?.banner}`}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            // marginBottom: '100px',
                            marginLeft: '400px',
                            // height: 'auto',
                            bottom: '70px',
                            right: '10px',
                            // backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            // padding: '5px 10px',
                            borderRadius: '6px',
                            fontSize: '40px',
                            //   top: "2px",
    right: "42%",
                        }}
                    >
                        <a
                            href={data[index]?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="order-btn"
                        >
                            Order Now
                        </a>
                    </div>
                    <div className="icon-wrapper">
                        {
                            data?.map((ele, i) => (
                                <img className="icon" src={i == index ? activeImg : deActive} alt="activeImg" />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}