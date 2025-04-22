import GuestImg from "../../assets/add-guest/add-guest.jpg"
import './add-guest.css'

export const AddGuestHeader = () => {

    return (
        <div>
            <div ><img className="guestImg" src={GuestImg} /></div>
            <div className="add-guest-nav">
                <div className="add-guest">Add Guest</div>
                <div className="guest-list">Guest List</div>
            </div>
        </div>
    )
}