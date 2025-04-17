import './index.css'
import dryFruit from '../../assets/dry_fruit.png'
import bestSeller from '../../assets/best_seller.png'
import weddingSpecial from "../../assets/wedding_special/image.png"
import rightIcon from "../../assets/icon/li_arrow-right.png"


export const Recent_view = () => {
    const recentViewProduts = [
        { id: 1, name: "Kaju", img: dryFruit },
        { id: 2, name: "Kaju", img: bestSeller },
        { id: 3, name: "Kaju", img: weddingSpecial },
    ];
    return (
        <div className="recent-view" >
            <div className='recent-view-top' >Recent Viewed Products</div>
            <div className='recent-view-img-list' >
                {recentViewProduts?.map((item) => (
                    <div key={item?.id} className='recent-view-img-wrapper'>
                        <img className='recent-view-img' src={item?.img} alt="recent-view" />
                        <div className='recent-view-img-text'>{item?.name}</div>
                    </div>
                ))}
                <div className='recent-view-right-icon'>
                    <img src={rightIcon} />
                </div>
            </div>
        </div>
    )
}


