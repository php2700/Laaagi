import './index.css'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'
import { Myannimation } from '../annimation/homeannimation'

export const InvitationBox = () => {
    const navigate = useNavigate()
    const [invitationBoxData, setInvitationBoxData] = useState([])
    const context = useContext(AuthContext);
    const setInvitationsweet = context.setSelectSweet;
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(4)



    const invitationBoxList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/first-invitation-categroy-wise`, {
        })
            .then((res) => {
                console.log(res?.data?.initation,'aaaaa')
                setInvitationBoxData(res?.data?.initation || []);
            }).catch((error) => {
                console.error("Error fetching invitation list:", error);
                // setData([]);
            });
    };

    useEffect(() => {
        invitationBoxList()
    }, [])

    const handleInvitationBoxInfo = (data) => {

        setInvitationsweet(data)
        // navigate('/invitation-detail')
        // const url = 'home'
        // navigate(`/invitation-detail/${data?._id}/${url}`)

        navigate('/invitation',{state:{category:data?.category}})
    }
    const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;


    return (
        <Myannimation direction="up">
        <div className='invitation-box'>
            <div className='invitation-box-left-text'>Invitation Boxes
            </div>
            <div className='invitation-box-list'>
                {invitationBoxData.slice(startIndex, lastIndex + 1)?.map((item) => {
                    let category = item?.category[0]?.toUpperCase() + item?.category.slice(1)?.toLowerCase();


                    return (
                        <div key={item?.id} className='invitation-box-wrapper'>
                            <img onClick={() => handleInvitationBoxInfo(item)} className='invitation-box-img' src={`${process.env.REACT_APP_BASE_URL}uploads/${item?.image}`} />
                            <div className='invitation-box-img-text'>{category}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        </Myannimation>
    )
}