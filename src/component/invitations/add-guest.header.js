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
                    className={({ isActive }) => {
                        return "nav-button" + (isActive ? " active-nav-button" : "")
                    }
                    }
                >
                    Add Guest
                </NavLink>

                <NavLink
                    to='/guest'
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