import { Link } from "react-router-dom"
import GuestImg from "../../assets/add-guest/add-guest.jpg"
import './add-guest.css'
import { Add_Guest } from "./add_guest";
import { NavLink } from "react-router-dom";

export const AddGuestHeader = () => {

    return (
        <div>
            <div ><img className="guestImg" src={GuestImg} /></div>
            <div className="add-guest-nav">
            <NavLink
                    to='/guest-add'
                    className={({ isActive }) =>
                        "nav-button" + (isActive ? " active-nav-button" : "")
                    }
                >
                    Add Guest
                </NavLink>
                {/* <div className="add-guest"><Link to='/guest-add'>Add Guest</Link></div> */}
                {/* <div className="guest-list"><Link to='/guest'>Guest List</Link></div> */}
                <NavLink
                    to='/guest' // This will be the default if your router is set up to show /guest by default
                    className={({ isActive }) =>
                        "nav-button" + (isActive ? " active-nav-button" : "")
                    }
                >
                    Guest List
                </NavLink>
            </div>
        </div>
    )
}