import { useContext, useEffect, useState } from "react"
import { AddGuestHeader } from "./add-guest.header"
import { AuthContext } from "../context";
import axios from "axios";
import GuestRow from "./GuestRow";
import { Addadress } from "./Addadress";

export const Guest = () => {
    const [openAddress, setOpenAddress] = useState(false)
    const context = useContext(AuthContext)
    const logout = context?.logout;
    const userId = localStorage.getItem('_id');
    const token = context?.token;
    const [guestList, setGuestList] = useState([]);
    const [userData, setUserData] = useState();
    const [searchText, setSearchText] = useState();


    const getGuestList = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/guest-list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchText
            }
        }).then((res) => {
            setGuestList(res?.data?.guestList)
            console.log(res?.data?.guestList)
        }).catch((error) => {
            console.log(error)
             if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
        })
    }

    useEffect(() => {
        if (token) {
            getGuestList();
        }
    }, [token, searchText]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setUserData(res?.data?.userData)
        }).catch((error) => {
            console.log(error)
        })
    }, [openAddress, token])

    const handleModel = () => {
        setOpenAddress(true)
    }

    const handleCloseAddress = () => {
        setOpenAddress(false)
    }
    return (
        <>
            <AddGuestHeader />
            <div className="guest-list-container">
                <div className="guest-list-header">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <div className="add-guest-button" onClick={() => handleModel()} > + Add My Address</div>
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
                        {userData?.address && <div>{userData?.address}</div>}
                    </div>
                </div>
            </div>
            <Addadress open={openAddress} onClose={handleCloseAddress} userData={userData} />
        </>
    )
}