import { useContext, useEffect, useState } from "react"
import { AddGuestHeader } from "./add-guest.header"
import { AuthContext } from "../context";
import axios from "axios";
import GuestRow from "./GuestRow";
import { Addadress } from "./Addadress";
import './guest.css'
import { useParams } from "react-router-dom";
import { HeaderPlanning } from "../planning_tool/heaader_planning";

export const Guest = () => {
    const [openAddress, setOpenAddress] = useState(false)
    const context = useContext(AuthContext)
    const logout = context?.logout;
    const userId = localStorage.getItem('_id');
    const token = context?.token;
    const [guestList, setGuestList] = useState([]);
    const [userData, setUserData] = useState();
    const [searchText, setSearchText] = useState();
    const { name } = useParams()


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
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
        })
    }, [openAddress, token, userId])

    const handleModel = () => {
        setOpenAddress(true)
    }

    const handleCloseAddress = () => {
        setOpenAddress(false)
    }

    return (
        <>

            {name == 'guest' ? <AddGuestHeader /> : <HeaderPlanning />}
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
                <div className="table-wrapper" id="tables-wrappers">
                    <table>
                        <thead>
                            <tr id="trs">
                                <th className="ids">'#'</th>
                                <th className="ths-name">NAME</th>
                                <th className="ths-address">ADDRESS</th>
                                <th className="guest-number">GUEST NUMBER</th>
                                <th className="guest-category">CATEGORIES</th>
                                <th className="ths-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GuestRow guestList={getGuestList} guestListData={guestList} />
                        </tbody>
                    </table>
                </div>
                <div className="my-address-section">
                    <div className="my-address-guest-list">
                        <div className="my-address">My Address:</div>
                        {userData?.address && <div>{userData?.address}</div>}
                    </div>
                </div>
            </div>
            <Addadress open={openAddress} onClose={handleCloseAddress} userData={userData} />
        </>
    )
}