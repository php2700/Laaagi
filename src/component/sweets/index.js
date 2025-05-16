
// new
import { useContext, useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import rightIcon from "../../assets/icon/li_arrow-right.png";
import leftIcon from "../../assets/icon/left_arrow-right.png";
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png";

const sweetsHeader = [
    { id: 'sh1', name: 'Sugar Free', category: 'SugarFree' },
    { id: 'sh2', name: 'Bengali Sweets', category: 'BengaliSweets' },
    { id: 'sh3', name: 'Sweets', category: 'Sweets' },
    { id: 'sh4', name: 'Dry Fruit Sweets', category: 'DryFruitSweets' }, 
    { id: 'sh5', name: 'Milk Sweets', category: 'MilkSweets' }        
];

const INITIAL_CATEGORY = sweetsHeader[0]?.category || 'SugarFree';

export const Sweets = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo;

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
        const params = {};
        if (fetchForWedding) {
            params.isWedding = true; 
        } else if (category) {
            params.category = category;
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, { params })
            .then((res) => {
                setData(res?.data?.sweetsData || []);
            }).catch((error) => {
                console.error("Error fetching sweets data:", error);
                setData([]);
            });
    };

    
    useEffect(() => {
        const filterFromState = location.state?.filter;

        if (filterFromState === 'dry-fruit-treat') {
            setIsSpecialView(true);
            setPageHeading("Dry Fruit Treats");
            axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit_list`)
                .then((res) => {
                    setData(res?.data?.dryFruitData || []);
                    console.log("Fetched Dry Fruits:", res?.data?.dryFruitData);
                }).catch((error) => {
                    console.error("Error fetching dry fruits:", error);
                    setData([]);
                });
        } else if (filterFromState === 'wedding') {
            setIsSpecialView(true); 
            setPageHeading("Wedding Special Sweets");
            fetchSweetsData(true); 
        } else {
            
            setIsSpecialView(false); 
            const currentCategoryObj = sweetsHeader.find(h => h.category === category);
            setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
            fetchSweetsData(false); 
        }
    }, [category, location.state?.filter]); 

    
    const handleCategorySelect = (ele) => {
        
        setCategory(ele?.category);
       
    };

    const handleSweetForInvitation = (item) => {
        setOrderId(item?.orderId);
        setInvitationSelectSweet(item);
    };

    const handleInvitationSweetDone = () => {
        if (invitationselectSweet) {
            navigate("/invitation-detail", {
                state: { ...invitationselectSweet, index: index, invitationId: invitationId, name: name, showId: id }
            });
        } else {
            alert("Please select a sweet for the invitation.");
        }
    };

    const handleItemDetailNavigation = (item) => {
        if (sweetsInfo) {
            sweetsInfo(item); 
        }
        navigate('/sweets-info'); 
    };

    return (
        <div className='sweets' >

            {!isSpecialView && ( // Only show header if not in a special view (wedding/dry fruits from filter)
                <div className='sweets-header'>
                    {isMobile ? (
                        <>
                            {startIndex > 0 && (
                                <div onClick={handlePrev} className='sweets-header-arrow'>
                                    <img src={leftIcon} alt="Previous categories" />
                                </div>
                            )}
                            {sweetsHeader?.slice(startIndex, lastIndex + 1)?.map((ele) => (
                                <div
                                    key={ele.id}
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`}
                                    onClick={() => handleCategorySelect(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                            {(lastIndex < (sweetsHeader?.length || 0) - 1) && (
                                <div onClick={handleForwardIcon} className='sweets-header-arrow'>
                                    <img src={rightIcon} alt="Next categories" />
                                </div>
                            )}
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

           
            {isInvitationSweets ? (
               
                <div className='sweets-content'>
                    <div className='sweets-content-list'>
                        {data?.map((ele) => (
                            <div key={ele.id || ele.orderId} className='sweets-content-img' onClick={() => handleSweetForInvitation(ele)}>
                                {orderId === ele?.orderId && (
                                    <div className='show-arrow-right'>
                                        <img src={rightArrow} alt="Selected" />
                                    </div>
                                )}
                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                <div className='sweets-name'>{ele?.name}</div>
                              
                                {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                            </div>
                        ))}
                         {!data?.length && (
                            <div className='no-found'>No Data Found for Invitation Selection</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='sweets-content'>
                    <div className='sweets-content-list'>
                        {data?.map((ele) => ( 
                            <div key={ele.id || ele.name} className='sweets-main-container'> 
                                <div className='sweets-content-img' onClick={() => handleItemDetailNavigation(ele)}>
                                    <div className='sweets-img-div'>
                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                    </div>
                                    <div className='sweets-name'>{ele?.name}</div>
                                    {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!data?.length && (
                        <div className='no-found'>No Data Found</div>
                    )}
                </div>
            )}

            {isInvitationSweets && (
                <div className='sweet-select'>
                    <div className='btn-done' onClick={handleInvitationSweetDone} >Done</div>
                </div>
            )}
        </div>
    )
}