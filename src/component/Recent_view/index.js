import { useNavigate } from 'react-router-dom';
import './index.css'

export const Recent_view = () => {
    const navigate = useNavigate();

    let recentViewProduts = JSON.parse(localStorage.getItem("recentView")) || [];
    const handleView = (data) => {
        if (data?.price) {
            const url = 'home'
            navigate(`/invitation-detail/${data?._id}/${url}`)
        }
        else if (data.isSweet == true || data.isSweet == false) {
            const url = 'home';
            navigate(`/sweets-info/${data?._id}/${url}`)
        } else {
            navigate(`/dry-fruit_info/${data?._id}`)
        }

    }
    return (
        <div className="recent-view" >
            <div className='recent-view-top' >Recent Viewed Products</div>
            <div className='recent-view-img-list' >
                {recentViewProduts?.map((item) => (
                    <div key={item?.id} className='recent-view-img-wrapper' onClick={() => handleView(item)}>
                        <div>
                            <img className='recent-view-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} alt="recent-view" />
                        </div>
                        <div className='recent-view-img-text'>{item?.name}</div>
                    </div>
                ))}
                {/* <div className='recent-view-right-icon'>
                    <img src={rightIcon} />
                </div> */}
            </div>
        </div>
    )
}


