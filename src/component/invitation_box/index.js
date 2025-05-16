import './index.css'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'

export const InvitationBox = () => {
    const navigate = useNavigate()
    const [invitationBoxData, setInvitationBoxData] = useState([])
    const context = useContext(AuthContext);
    const setRecentView = context?.setRecentView;
    const setInvitationsweet = context.setSelectSweet;
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2)



    const invitationBoxList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
            params: {
                isInvitationBoxes: true
            }
        })
            .then((res) => {
                setInvitationBoxData(res?.data?.invitationData || []);
            }).catch((error) => {
                console.error("Error fetching invitation list:", error);
                // setData([]);
            });
    };

    useEffect(() => {
        invitationBoxList()
    }, [])

    const handleInvitationBoxInfo = (data) => {
        setRecentView(data)

        setInvitationsweet(data)
        navigate('/invitation-detail')
    }

    return (
        <div className='invitation-box'>
            <div className='invitation-box-left-text'>Invitation Boxes
            </div>
            <div className='invitation-box-list'>
                {invitationBoxData.slice(startIndex, lastIndex + 1)?.map((item) => (
                    <div key={item?.id} className='invitation-box-wrapper'>
                        <img onClick={() => handleInvitationBoxInfo(item)} className='invitation-box-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                        <div className='invitation-box-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}