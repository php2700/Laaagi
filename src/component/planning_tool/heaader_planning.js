import { NavLink } from "react-router-dom"

export const HeaderPlanning=()=>{
    return(
        <div className="add-guest-nav">
                <NavLink
                    to='/planning-tool'
                    className={({ isActive }) => {
                        return "nav-button" + (isActive ? " active-nav-button" : "")
                    }
                    }
                >
                    Planning
                </NavLink>

                <NavLink
                    to='/guest/planning'
                    className={({ isActive }) =>
                        "nav-button" + (isActive ? " active-nav-button" : "")
                    }
                >
                    Guest List
                </NavLink>

                </div>
    )
}