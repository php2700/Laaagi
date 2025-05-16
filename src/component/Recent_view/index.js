import './index.css'

export const Recent_view = () => {


    let recentViewProduts = JSON.parse(localStorage.getItem("recentView")) || [];


    return (
        <div className="recent-view" >
            <div className='recent-view-top' >Recent Viewed Products</div>
            <div className='recent-view-img-list' >
                {recentViewProduts?.map((item) => (
                    <div key={item?.id} className='recent-view-img-wrapper'>
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


