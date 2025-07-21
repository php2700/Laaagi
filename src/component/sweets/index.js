
import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png";
import { toast } from 'react-toastify';
import { AddSweets } from './model';
import MenuIcon from '@mui/icons-material/Menu';
import { sweetFilterData } from '../category';


const sweetsHeader = [
    { id: 'sh1', name: 'Indian Sweets', category: 'Indian Sweets' },
    { id: 'sh2', name: 'Innovative Fusions', category: 'Innovative Fusions' },
    { id: 'sh3', name: 'Savouries', category: 'Savouries' },
    { id: 'sh4', name: 'Dry Fruits', category: 'Dry Fruits' },
]

const INITIAL_CATEGORY = sweetsHeader[0]?.category || 'Indian Sweets';
export const Sweets = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo
    const isInvitationSweets = location.state?.data;
    const invitationId = location.state?.invitationId;
    const name = location.state?.name;
    const index = location.state?.idx;
    const id = location.state?.id;
    const [invitationselectSweet, setInvitationSelectSweet] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(INITIAL_CATEGORY);
    const [isSpecialView, setIsSpecialView] = useState(false);
    const [pageHeading, setPageHeading] = useState("Sweets");
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [openModel, setOpenModel] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState('');


    const handleForwardIcon = () => {
        const totalItems = sweetsHeader?.length || 0;
        const nextStart = lastIndex + 1;
        const nextLast = lastIndex + 3;
        if (nextStart < totalItems) {
            setStartIndex(nextStart);
            setLastIndex(Math.min(nextLast, totalItems - 1));
        }
    };

    const handlePrev = () => {
        const prevStart = Math.max(0, startIndex - 3);
        const prevLast = Math.max(2, lastIndex - 3);
        setStartIndex(prevStart);
        setLastIndex(Math.max(2, prevLast));
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    const fetchSweetsData = (fetchForWedding = false) => {
        setData([])
        const params = {};
        if (fetchForWedding) {
            params.isWedding = true;
        } else if (category) {
            params.category = category;
        }
        if (selectedPrice) {
            params.price = selectedPrice
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, { params })
            .then((res) => {
                console.log(res?.data?.sweetsData)
                setData(res?.data?.sweetsData || []);
            }).catch((error) => {
                console.error("Error fetching sweets data:", error);
                setData([]);
            });
    };


    useEffect(() => {
        const filterFromState = location.state?.filter;

        if (filterFromState === 'wedding') {
            setIsSpecialView(true);
            setPageHeading("Wedding Special Sweets");
            fetchSweetsData(true);
        } else {
            setIsSpecialView(false);
            const currentCategoryObj = sweetsHeader.find(h => h.category === category);
            setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
            fetchSweetsData(false);
        }
    }, [category, location.state?.filter, selectedPrice]);


    const handleCategorySelect = (ele) => {
        setCategory(ele?.category);
        setSelectedPrice('')
    };

    const handleSweetForInvitation = (item) => {
        setOrderId(item?.orderId);
        setInvitationSelectSweet(item);
        setOpenModel(true)
    };

    const handleClose = () => {
        setOpenModel(false)
    }

    const handleInvitationSweetDone = () => {
        const url = 'invitation'
        if (invitationselectSweet) {
            navigate(`/invitation-detail/${invitationId}/${url}`, {
                state: { ...invitationselectSweet, sweetName: invitationselectSweet?.name, index: index, invitationId: invitationId, name: name, showId: id }
            });
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('scrollToNext'));
            }, 500);
        } else {
            toast.error("Please Select Sweet !", {
                position: "bottom-right"
            });
        }
    };

    const handleItemDetailNavigation = (item) => {
        if (sweetsInfo) {
            sweetsInfo(item);
        }
        const url = 'sweets';
        navigate(`/sweets-info/${item?._id}/${url}`);

    };

    const handleFilter = (data) => {
        setSelectedPrice(data)
    }

    return (
        <div className='sweets' >
            {!isSpecialView && (
                <div className='sweets-header'>
                    {isMobile ? (
                        <>
                            {sweetsHeader?.map((ele) => (
                                <div
                                    key={ele.id}
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`}
                                    onClick={() => handleCategorySelect(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {sweetsHeader?.map((ele) => (
                                <div
                                    key={ele.id}
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`}
                                    onClick={() => handleCategorySelect(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}


            <div style={{ display: 'flex' }}>
                <div className='invitations-price-left'>
                    <div className='invitation-price-header'>Price Range filter</div>
                    {
                        isMobile && <div onClick={() => setMenuOpen(!menuOpen)}>
                            <MenuIcon />
                        </div>
                    }
                    <div className={`invitation-toggle ${isMobile ? (menuOpen ? 'open' : 'close') : ''}`}>
                        {
                            sweetFilterData?.map((ele) => (
                                <div className='invitation-price' onClick={() => { handleFilter(ele) }}>{ele}</div>
                            ))
                        }
                    </div>
                </div>


                {isInvitationSweets ? (
                    <div className='sweets-content'>
                        <div className='sweets-content-list'>
                            {data?.length > 0 &&
                                data?.map((ele) => {
                                    let name = ele?.name[0]?.toUpperCase() + ele?.name.slice(1)?.toLowerCase();
                                    return (

                                        <div key={ele.id || ele.orderId} className='sweets-content-img' onClick={() => handleSweetForInvitation(ele)}>

                                            {orderId === ele?.orderId && (
                                                <div className='show-arrow-right'>
                                                    <img src={rightArrow} alt="Selected" />
                                                </div>
                                            )}
                                            <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                            <div className='sweets-name'>{name}</div>

                                            {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                        </div>
                                    )
                                })}
                            {!data?.length > 0 && (
                                <div className='no-found'>No Data Found for Invitation Selection</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='sweets-content'>
                        <div className='sweets-content-list'>
                            {data?.length > 0 &&
                                <>
                                    {data?.map((ele) => {
                                        let name = ele?.name[0]?.toUpperCase() + ele?.name.slice(1)?.toLowerCase();
                                        return (
                                            <div key={ele.id || ele.name} className='sweets-main-container'>
                                                <div className='sweets-content-img' onClick={() => handleItemDetailNavigation(ele)}>
                                                    <div className='sweets-img-div'>
                                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                                    </div>
                                                    <div className='sweets-name'>{name}</div>
                                                    {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>}
                        </div>
                        {!data?.length > 0 && (
                            <div className='no-found'>No Data Found</div>
                        )}
                    </div>
                )}
            </div>
            <AddSweets open={openModel} handleClose={handleClose} data={handleInvitationSweetDone} selectedSweet={invitationselectSweet} />
        </div>
    )
}