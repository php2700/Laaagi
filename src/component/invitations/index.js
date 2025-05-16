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
    { name: 'Only Invitation', category: 'Invitation' },
    { name: 'Invitation on Wooden Box', category: 'Wooden Box' },
    { name: 'Invitation on Box', category: 'Invitation On Box' },
    { name: 'Invitation on Glass Box', category: 'Glass Box' },
    { name: 'Misc Invitation', category: 'Misc Invitation' },
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
    const [category, setCategory] = useState('invitation')
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleForwardIcon = () => {
        const totalItems = invitationHeader?.length || 0;
        const itemsToShow = 2;
        const nextStart = startIndex + itemsToShow;

        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextStart + itemsToShow - 1, totalItems - 1));
        }
    };

    const handlePrev = () => {
        const itemsToShow = 2;
        const prevStart = Math.max(0, startIndex - itemsToShow);

        if (prevStart !== startIndex) {
            setStartIndex(prevStart);
            setLastIndex(prevStart + itemsToShow - 1);
        }
    };


    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 500;
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
        const categoryToFetch = invitationCategory?.[0] || 'default_category';

        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
            params: {
                category: category,
                price: selectedPrice
            }
        })
            .then((res) => {
                setData(res?.data?.invitationData || []);
            }).catch((error) => {
                console.error("Error fetching invitation list:", error); // Log errors
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
        navigate('/invitation-detail')
    }

    const handleUrl = (ele) => {
        setCategory(ele?.category);
    }
    const handleOpenUploadModal = () => {
        navigate('/forms')
        setIsUploadModalOpen(true);
    };





    return (
        <div className='invitations'>
            <div className='invitations-header'>
                {
                    isMobile ?
                        <>
                            {startIndex > 0 &&
                                <div onClick={handlePrev}><img src={leftIcon} /></div>
                            }
                            {invitationHeader?.slice(startIndex, lastIndex + 1).map((ele) => (
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div onClick={() => handleUrl(ele)} >{ele?.name}</div>
                            ))}
                            {(lastIndex < (invitationHeader?.length || 0) - 1) &&
                                <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
                            }
                        </> :
                        <>
                            {invitationHeader?.map((ele) => (
                                // <div><Link to={ele.url} >{ele?.name}</Link></div>
                                <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
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
                    <div className='invitation-content-text' onClick={handleOpenUploadModal} style={{ cursor: 'pointer', }}> Upload Your Design and get quote for the same</div>
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
                </div>

            </div>

        </div>
    );
};
