import { useContext, useEffect, useState } from "react"
import { AddGuestHeader } from "./add-guest.header"
import { AuthContext } from "../context";
import axios from "axios";
import { Link } from "react-router-dom";
import GuestRow from "./GuestRow";

export const Guest = () => {
    const content = useContext(AuthContext)
    const userId = localStorage.getItem('_id');
    const token = content?.token;
    const [guestList, setGuestList] = useState([]);

    const getGuestList = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/guest-list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGuestList(res?.data?.guestList)
            console.log(res?.data?.guestList)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getGuestList()
    }, [])
    return (
        <>
            <AddGuestHeader />
            <div className="guest-list-container">
                <div className="guest-list-header">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <Link to='/add-guest' className="add-guest-button">+ Add My Address</Link>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>'#'</th>
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>GUEST NUMBER</th>
                                <th>CATEGORIES</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GuestRow guestList={getGuestList} guestListData={guestList} />
                        </tbody>
                    </table>
                </div>
                <div className="my-address-section">
                    <div className="my-address-row">
                        <div><input type="checkbox" /></div>
                        <div>My Address</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</div>
                    </div>
                </div>
            </div>
        </>
    )
}