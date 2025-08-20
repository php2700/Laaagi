import { use, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { filterData, invitationCategory } from '../category';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context';
import { Myannimation } from "../annimation/homeannimation";



const invitationHeader = [
    { name: 'Invitation With Box', category: 'Invitation on Box' },
    { name: 'Only Invitation', category: 'Invitation' },
    { name: 'Invitation on Wooden Box', category: 'Wooden Box' },
    { name: 'Invitation on Glass Box', category: 'Glass Box' },
    { name: 'Misc Invitation', category: 'Misc Invitation' },
]
const BannerSection = () => <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Hero Section</h1></div>;
const AboutSection = () => <div style={{ height: '80vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>About Us Section</h2></div>;
const WeddingSpecialSection = () => <div style={{ height: '80vh', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Our Services</h2></div>;
const ContactSection = () => <div style={{ height: '80vh', background: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Contact Us</h2></div>;



export const Invitation = () => {
    const context = useContext(AuthContext);
    const invitationDropdown = context?.invitationDropdown;
    const setInvitationDropdown = context?.setInvitationDropdown;
    const setInvitationsweet = context.setSelectSweet;
    const setPaymentHistory = context?.setPaymentHistory;
    const location = useLocation();
    const searchCategory = location.state?.category;
    const navigate = useNavigate()
    const [selectedPrice, setSelectedPrice] = useState('');
    const [data, setData] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
    const [menuOpen, setMenuOpen] = useState(false)
    const [category, setCategory] = useState(searchCategory || invitationDropdown || 'Invitation On Box')


    useEffect(() => {
        setPaymentHistory([])
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 600;
            setIsMobile(mobileCheck);
            setMenuOpen(!mobileCheck);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getInvitationList = () => {

        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
            params: {
                category: category,
                price: selectedPrice
            }
        })
            .then((res) => {
                setData(res?.data?.invitationData || []);
            }).catch((error) => {
                console.error("Error fetching invitation list:", error);
                setData([]);
            });
    };

    useEffect(() => {
        getInvitationList()
    }, [selectedPrice, category])

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    const handleInvitationImg = (ele) => {
        setInvitationsweet(ele)
        const url = 'invitation'
        navigate(`/invitation-detail/${ele?._id}/${url}`)
    }

    useEffect(() => {
        if (invitationDropdown == '') return
        setCategory(invitationDropdown);
    }, [invitationDropdown])


    const handleUrl = (ele) => {
        setCategory(ele?.category);
        if (invitationDropdown) {
            setInvitationDropdown('')
        }
    }

    return (
        <Myannimation direction='up'>
            <div className='invitations'>
                <div className='invitations-header'>
                    {
                        isMobile ?
                            <>
                                {invitationHeader?.map((ele) => (
                                    <div onClick={() => handleUrl(ele)} >{ele?.name}</div>
                                ))}
                            </> :
                            <>
                                {invitationHeader?.map((ele) => (
                                    <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
                                ))}
                            </>
                    }
                </div>

                <div className='invitations-content'>
                    <div className='invitations-price-left'>
                        <div className='invitation-price-header'>Price Range Filter</div>
                        {
                            isMobile && <div onClick={() => setMenuOpen(!menuOpen)}>
                                <MenuIcon />
                            </div>
                        }
                        <div className={`invitation-toggle ${isMobile ? (menuOpen ? 'open' : 'close') : ''}`}>
                            {
                                filterData?.map((ele) => (
                                    <div className='invitation-price' onClick={() => { handleFilter(ele) }}>{ele}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='invitations-content-header'>
                        < Link to="/Design" className='invitation-content-text' style={{ cursor: 'pointer', }}> Upload your design and get a quote</Link>
                        {data?.length > 0 ?
                            <div className='invitation-content-list'>
                                {
                                    data?.map((ele) => (
                                        <div className='invitation-content-img' onClick={() => handleInvitationImg(ele)} >
                                            <div className='invitation-content-main-img'>
                                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                            </div>
                                            <div className='invitation-content-img-name' >
                                                <div >{ele?.name}</div>
                                                <div className='invitation-payment'><span>(Rs. {ele?.price} /- )</span></div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            :
                            <div className='record-not-found'>No Data</div>
                        }
                    </div>
                </div>
            </div>
        
        </Myannimation>
    )
};
