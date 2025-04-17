import './index.css'
import firstSweet from '../../assets/discover/first.png'
import secondSweet from '../../assets/discover/second.png'
import thirdSweet from '../../assets/discover/third.png'

export const DiscoverCategory = () => {
    const list = [{ id: 1, name: "coconut", img: firstSweet },
    { id: 2, name: "coconut", img: secondSweet },
    { id: 3, name: "coconut", img: thirdSweet },
    ]
    return (
        <div className='discover-category'>
            <div className='discover-category-heading'>
                Discover Categories
            </div>
            <div className='discover-category-left-text'>Sweets
            </div>
            <div className='discover-category-list'>
                {list?.map((item) => (
                    <div key={item?.id} className='discover-category-wrapper'>
                        <img className='discover-category-img' src={item?.img} />
                        <div className='discover-category-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}