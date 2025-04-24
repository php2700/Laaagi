import { use, useContext, useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import './index.css'
import { Link, useNavigate } from 'react-router-dom';
import { filterData, invitationCategory } from '../category';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context';


const invitationHeader = [
    { name: 'Only Invitation', url: '/invitation' },
    { name: 'Invitation on Wooden Box', url: '/invitation-wooden' },
    { name: 'Invitation on Box', url: '/invitation-box' },
    { name: 'Invitation on Glass Box', url: '/invitation-glass' },
    { name: 'Misc Invitation', url: '/invitation-misc' },
]

export const Invitation = () => {
    const context = useContext(AuthContext);
    const invitationSweet = context.setSelectSweet;
    const navigate = useNavigate()
    const [selectedPrice, setSelectedPrice] = useState('');
    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(1)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleForwardIcon = () => {
        const totalItems = invitationHeader?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 2;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    }

    const handlePrev = () => {
        const prevStart = Math.max(0, startIndex - 2);
        const prevLast = Math.max(1, startIndex - 1);
        setStartIndex(prevStart);
        setLastIndex(prevLast);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            if (window.innerWidth <= 500) {
                setMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])

    const getInvitationList = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
            params: {
                category: invitationCategory[0],
                price: selectedPrice
            }
        })
            .then((res) => {
                setData(res?.data?.invitationData);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getInvitationList()
    }, [selectedPrice])

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    console.log(isMobile, "ismobile")

    const handleInvitationImg = (ele) => {
        invitationSweet(ele)
        navigate('/invitation-detail')
    }

    return (
        <div className='invitations' >
            <div className='invitations-header'>
                {
                    isMobile ?
                        <>
                            {startIndex > 0 &&
                                <div onClick={handlePrev}><img src={leftIcon} /></div>
                            }
                            {invitationHeader?.slice(startIndex, lastIndex + 1).map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                            {(lastIndex < (invitationHeader?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            }
                        </> :
                        <>
                            {invitationHeader?.map((ele) => (
                                <div><Link to={ele.url} >{ele?.name}</Link></div>
                            ))}
                        </>
                }
            </div>
            <div className='invitations-content'>
                <div className='invitations-price-left'>
                    <div className='invitation-price-header'>Price Range filter</div>
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
                    <div className='invitation-content-text'> Upload Your Design and get quote for the same</div>
                    <div className='invitation-content-list'>
                        {
                            data?.map((ele) => (
                                <div className='invitation-content-img' onClick={() => handleInvitationImg(ele)} >
                                    {/* <Link className='invitation-content-img' to='/invitation-detail' state={{ data: ele }} >
                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                        <div>{ele?.name}</div>
                                    </Link> */}
                                    {/* <Link className='invitation-content-img' to='/invitation-detail' state={{ data: ele }} > */}
                                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                    <div>{ele?.name}</div>
                                    {/* </Link> */}
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
