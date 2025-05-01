import { use, useContext, useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import './index.css'
import { useNavigate } from 'react-router-dom';
import { filterData, invitationCategory } from '../category';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context';


const invitationHeader = [
    { name: 'Only Invitation', category: 'invitation' },
    { name: 'Invitation on Wooden Box', category: 'invitation_wooden_box' },
    { name: 'Invitation on Box', category: 'invitation_box' },
    { name: 'Invitation on Glass Box', category: 'invitation_glass_box' },
    { name: 'Misc Invitation', category: 'misc_invitation' },
]

export const Invitation = () => {
    const context = useContext(AuthContext);
    const setInvitationsweet = context.setSelectSweet;
    const navigate = useNavigate()
    const [selectedPrice, setSelectedPrice] = useState('');
    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(1)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    const [menuOpen, setMenuOpen] = useState(false)
    const [category, setCategory] = useState()

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
                category: category,
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
    }, [selectedPrice, category])

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    const handleInvitationImg = (ele) => {
        setInvitationsweet(ele)
        navigate('/invitation-detail')
    }

    const handleUrl = (ele) => {
        setCategory(ele?.category);
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
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
                            ))}
                            {(lastIndex < (invitationHeader?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            }
                        </> :
                        <>
                            {invitationHeader?.map((ele) => (
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
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
                                    <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
                                    <div className='invitation-content-img-name' >
                                        <div >{ele?.name}</div>
                                        <div className='invitation-payment'><span>(Rs. {ele?.price} /- )</span></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
