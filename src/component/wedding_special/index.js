import './index.css'
import weddingSpecial from "../../assets/wedding_special/image.png"
import rightIcon from "../../assets/icon/li_arrow-right.png"


export const WeddingSpecial = () => {
    const weddingItems = [
        { id: 1, name: "Kaju", img: weddingSpecial },
        { id: 2, name: "Kaju", img: weddingSpecial },
        { id: 3, name: "Kaju", img: weddingSpecial },
    ];

    return (
        <div className="wedding" >
            <div className='wedding-top' >
                <div className='wedding-left-text'>Wedding special</div>
                <div className='wedding-right-text'>See More</div>
            </div>
            <div className='wedding-img-list' >
                {weddingItems?.map((item) => (
                    <div key={item?.id} className='wedding-img-wrapper'>
                        <img className='wedding-img' src={item?.img} alt="Wedding" />
                        <div className='wedding-img-text'>{item?.name}</div>
                    </div>
                ))}
                <div className='wedding-img-right-icon'>
                    <img src={rightIcon} />
                </div>
            </div>
        </div>

    )
}