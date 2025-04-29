import { Link } from "react-router-dom"
import GuestImg from "../../assets/add-guest/add-guest.jpg"
import './add-guest.css'
import { Add_Guest } from "./add_guest";

export const AddGuestHeader = () => {

    return (
        <div>
            <div ><img className="guestImg" src={GuestImg} /></div>
            <div className="add-guest-nav">
                <div className="add-guest"><Link to='/guest-add'>Add Guest</Link></div>
                <div className="guest-list"><Link to='/add-guest'>Guest List</Link></div>
            </div>
        </div>
    )
}