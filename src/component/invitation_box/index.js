import './index.css'
import firstSweet from '../../assets/invitation_box/third.png'
import secondSweet from '../../assets/invitation_box/second.png'
import thirdSweet from '../../assets/invitation_box/third.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const InvitationBox = () => {

    const [invitationBoxData, setInvitationBoxData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2)

    const invitationBoxList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_box_list`)
            .then((res) => {
                console.log(res?.data?.invitationBox, "asssssssssssssssssssss")
                setInvitationBoxData(res?.data?.invitationBox)
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        invitationBoxList()
    }, [])

    const list = [{ id: 1, name: "coconut", img: firstSweet },
    { id: 2, name: "coconut", img: secondSweet },
    { id: 3, name: "coconut", img: thirdSweet },
    ]
    return (
        <div className='invitation-box'>
            <div className='invitation-box-left-text'>Invitation Boxes
            </div>
            <div className='invitation-box-list'>
                {invitationBoxData.slice(startIndex, lastIndex + 1)?.map((item) => (
                    <div key={item?.id} className='invitation-box-wrapper'>
                        <img className='invitation-box-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                        <div className='invitation-box-img-text'>{item?.name}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}