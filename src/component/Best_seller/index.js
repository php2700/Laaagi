import './index.css'
import bestSellerImg from '../../assets/best_seller.png'
import rightIcon from "../../assets/icon/li_arrow-right.png"


export const Best_seller = () => {
    const bestSeller = [{ id: 1, name: "coconut", img: bestSellerImg },
    { id: 2, name: "coconut", img: bestSellerImg },
    { id: 3, name: "coconut", img: bestSellerImg },
    { id: 4, name: "coconut", img: bestSellerImg },
    ]
    return (
        <div className='best-seller'>
            <div className='best-seller-top'>
                <div className='best-seller-left-text'> Best Sellers</div>
                <div className='best-seller-right-text'> see more</div>
            </div>
            <div className='best-seller-img-list'>
                {bestSeller?.map((item) => (
                    <div key={item?.id} className='best-seller-wrapper'>
                        <img className='best-seller-img' src={item?.img} />
                        <div className='best-seller-img-text'>{item?.name}</div>
                    </div>
                ))}
                <div className='best-seller-right-icon'>
                    <img src={rightIcon} />
                </div>
            </div>

        </div>
    )
}