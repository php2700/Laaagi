import './index.css'
import AppleImg from '../../assets/shop/apple.png'
import AndoridImg from '../../assets/shop/android.png'
import logo from '../../assets/shop/Group 2147223791.png';

export const Shop = () => {
    return (
        <div className='shop'>
            <div className='shop-left-bar'>
                <div className='shop-header-home'>Shop Faster with Our App </div>
                <div className='shop-header-home'>It will be live soon!</div>
                <div className='shop-desc'>Available on both iOS & Android</div>
                <div className='shop-img'>
                    <img src={AppleImg} />
                    <img src={AndoridImg} />
                </div>
            </div>
            <div className='shop-right-bar'>
                <div className='shop-right-bg'>
                    <img className='shop-right-img' src={logo} />
                </div>
            </div>

        </div>
    )
}