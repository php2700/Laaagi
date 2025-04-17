import './index.css'
import dryFruit from '../../assets/dry_fruit.png'
import rightIcon from "../../assets/icon/li_arrow-right.png"


export const Dry_Fruit_Treat = () => {
    const dryfruitTreatItems = [
        { id: 1, name: "Kaju", img: dryFruit },
        { id: 2, name: "Kaju", img: dryFruit },
        { id: 3, name: "Kaju", img: dryFruit },
    ];
    return (
        <div className="dry-fruit-treat" >
            <div className='dry-fruit-treat-top' >
                <div className='dry-fruit-treat-left-text'>Dry Fruit Treats</div>
                <div className='dry-fruit-treat-right-text'>See More</div>
            </div>
            <div className='dry-fruit-treat-img-list' >
                {dryfruitTreatItems?.map((item) => (
                    <div key={item?.id} className='dry-fruit-treat-img-wrapper'>
                        <img className='dry-fruit-treat-img' src={item?.img} alt="dry-fruit-treat" />
                        <div className='dry-fruit-treat-img-text'>{item?.name}</div>
                    </div>
                ))}
                <div className='dry-fruit-treat-right-icon'> 
                    <img src={rightIcon} />
                </div>
            </div>
        </div>
    )
}


