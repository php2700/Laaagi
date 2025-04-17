import firstImg from "../../assets/ads/first.png"
import secondImg from "../../assets/ads/second.png"
import thirdImg from "../../assets/ads/third.png"
import './index.css';


export const Ads = () => {
    const list = [{ id: 1, img: firstImg, banner: 'Banner1' },
    { id: 2, img: secondImg, banner: 'Banner2' },
    { id: 3, img: thirdImg, banner: 'Banner3' }
    ]
    return (
        <div className="ads">
            <div className="ads-first-row">
                {
                    list.filter((item) => (item.banner == 'Banner1' || item.banner == 'Banner2'))
                        .map((ele) => (
                            <div key={ele.id} className="ads-center"><img className="ads-first-row-img" src={ele.img} /></div>
                        ))
                }
            </div>
            <div className="ads-second-row">
                {
                    list.filter((item) => (item.banner == 'Banner3'))
                        .map((ele) => (
                            <div key={ele.id} className="ads-center"><img className="ads-second-row-img" src={ele.img} /> </div>
                        ))
                }
            </div>
        </div>
    )
}