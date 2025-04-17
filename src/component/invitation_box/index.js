import './index.css'
import firstSweet from '../../assets/invitation_box/third.png'
import secondSweet from '../../assets/invitation_box/second.png'
import thirdSweet from '../../assets/invitation_box/third.png'

export const InvitationBox = () => {
    const list = [{ id: 1, name: "coconut", img: firstSweet },
    { id: 2, name: "coconut", img: secondSweet },
    { id: 3, name: "coconut", img: thirdSweet },
    ]
    return (
        <div className='invitation-box'>
            <div className='invitation-box-left-text'>Invitation Boxes
            </div>
            <div className='invitation-box-list'>
                {list?.map((item) => (
                    <div key={item?.id} className='invitation-box-wrapper'>
                        <img className='invitation-box-img' src={item?.img} />
                        <div className='invitation-box-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}