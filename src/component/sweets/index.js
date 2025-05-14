// import { useContext, useEffect, useState } from 'react';
// import './index.css'
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import rightIcon from "../../assets/icon/li_arrow-right.png"
// import leftIcon from "../../assets/icon/left_arrow-right.png"
// import { AuthContext } from '../context';
// import rightArrow from "../../assets/invitations/right-icon.png"




// const sweetsHeader = [
//     {id: 'sh1', name: 'Sugar Free', category: 'SugarFree' },
//     {id: 'sh2', name: 'Bengali Sweets', category: 'BengaliSweets' },
//     {id: 'sh3', name: 'Sweets', category: 'Sweets' },
//     {id: 'sh4', name: 'Sweets', category: 'Sweets' },
//     {id: 'sh5', name: 'Sweets', category: 'Sweets' }
// ]





// export const Sweets = () => {
//     const navigate = useNavigate()
//     const content = useLocation();
//     const context = useContext(AuthContext);
//     const sweetsInfo = context?.setSweetsInfo
//     const isInvitationSweets = content?.state?.data;
//     const invitationId = content?.state?.invitationId;
//     const name = content?.state?.name
//     const index = content?.state?.idx;
//     const id = content?.state?.id;
//     const [data, setData] = useState([])
//     const [invitationselectSweet, setInvitationSelectSweet] = useState();
//     const [orderId, setOrderId] = useState();
//     const [category, setCategory] = useState('SugarFree')

//     const [startIndex, setStartIndex] = useState(0)
//     const [lastIndex, setLastIndex] = useState(2)
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

//     const handleForwardIcon = () => {
//         const totalItems = sweetsHeader?.length || 0;
//         const nextStart = lastIndex + 1;
//         const nextLast = lastIndex + 3;
//         if (nextStart < totalItems) {
//             setStartIndex(nextStart);
//             setLastIndex(Math.min(nextLast, totalItems - 1));
//         }
//     }

//     const handlePrev = () => {
//         const prevStart = Math.max(0, startIndex - 3);
//         const prevLast = Math.max(2, startIndex - 1);
//         setStartIndex(prevStart);
//         setLastIndex(prevLast);
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 500);
//         }
//         window.addEventListener('resize', handleResize)
//         return () => { window.removeEventListener('resize', handleResize) }
//     }, [])


//     const sweetsDataList = () => {
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
//             params: {
//                 category: category
//             }
//         })
//             .then((res) => {
//                 setData(res?.data?.sweetsData);
//                 console.log(res?.data?.sweetsData)
//             }).catch((error) => {
//                 console.log(error);
//             })
//     }

//     useEffect(() => {
//         sweetsDataList()
//     }, [category])


//     const handleSweet = (item) => {
//         setOrderId(item?.orderId)
//         setInvitationSelectSweet(item)
//     }

//     const handleUrl = (ele) => {
//         setCategory(ele?.category);
//     }

//     const handleInvitationSweet = () => {
//         navigate("/invitation-detail", { state: { ...invitationselectSweet, index: index, invitationId: invitationId, name: name, showId: id } })
//     }
//     return (

//         <div className='sweets' >
//             <div className='sweets-header'>

//                 {
//                     isMobile ? <>
//                         {startIndex > 0 &&
//                             <div onClick={handlePrev}><img src={leftIcon} /></div>
//                         }
//                         {sweetsHeader?.slice(startIndex, lastIndex + 1)?.map((ele) => (
//                             // <div className='cursor' onClick={() => handleUrl(ele)} >{ele?.name}</div>
//                             <div onClick={() => handleUrl(ele)} >{ele?.name}</div>

//                         ))}
//                         {(lastIndex < (sweetsHeader?.length || 0) - 1) &&
//                             <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
//                         }
//                     </> : <>
//                         {sweetsHeader?.map((ele) => (
//                             // <div><Link to={ele.url} >{ele?.name}</Link></div>
//                             <div className={ele.category == category ? 'active-url' : ''} onClick={() => handleUrl(ele)} >{ele?.name}</div>
//                         ))}
//                     </>
//                 }
//             </div>
//             {
//                 isInvitationSweets ?
//                     <div className='sweets-content'>
//                         <div className='sweets-content-list'>
//                             {data?.map((ele) => (
//                                 <div className='sweets-content-img' onClick={() => handleSweet(ele)}>
//                                     {
//                                         orderId == ele?.orderId && <div className='show-arrow-right'><img src={rightArrow} /></div>
//                                     }
//                                     <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
//                                     <div className='sweets-name'>{ele?.name}</div>
//                                     <div className='sweets-price'> {ele?.amount} </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     : <div className='sweets-content'>
//                         <div className='sweets-content-list'>

//                             {data?.map((ele) => (
//                                 <div className='sweets-main-container'>
//                                     <Link className='sweets-content-img' to='/sweets-info' onClick={() => (sweetsInfo(ele))} state={{ data: ele }} >
//                                         <div className='sweets-img-div'>
//                                             <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
//                                         </div>
//                                         <div className='sweets-name'>{ele?.name}</div>
//                                         <div className='sweets-price'>{ele?.amount} </div>
//                                     </Link>
//                                 </div>
//                             ))}
//                         </div>
//                         {!data?.length &&
//                             <div className='no-found'>No Data Found</div>
//                         }
//                     </div>
//             }
//             {
//                 isInvitationSweets && <div className='sweet-select'>
//                     <div className='btn-done' onClick={handleInvitationSweet} >Done </div>
//                 </div>
//             }
//         </div>
//     )
// }
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
    { id: 'sh4', name: 'Dry Fruit Sweets', category: 'DryFruitSweets' }, // Example, adjust if needed
    { id: 'sh5', name: 'Milk Sweets', category: 'MilkSweets' }        // Example, adjust if needed
];

const INITIAL_CATEGORY = sweetsHeader[0]?.category || 'SugarFree';

export const Sweets = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);
    const sweetsInfo = context?.setSweetsInfo;

    // States for invitation flow
    const isInvitationSweets = location.state?.data;
    const invitationId = location.state?.invitationId;
    const name = location.state?.name;
    const index = location.state?.idx;
    const id = location.state?.id;
    const [invitationselectSweet, setInvitationSelectSweet] = useState(null);
    const [orderId, setOrderId] = useState(null);

    // Core states
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(INITIAL_CATEGORY);
    const [isSpecialView, setIsSpecialView] = useState(false); // Used to hide category header for wedding or dry fruits
    const [pageHeading, setPageHeading] = useState("Sweets"); // Default heading

    // States for mobile category navigation
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(2); // Show 3 categories at a time on mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    // Mobile category header pagination
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
        const prevLast = Math.max(2, lastIndex - 3); // Ensure lastIndex is at least 2
        setStartIndex(prevStart);
        setLastIndex(Math.max(2, prevLast));
    };

    // Mobile responsiveness
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    // Generic sweets data fetching function (used for categories and wedding specials)
    const fetchSweetsData = (fetchForWedding = false) => {
        const params = {};
        if (fetchForWedding) {
            params.isWedding = true; // API parameter for wedding sweets
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

    // Main data fetching logic based on filter or category
    useEffect(() => {
        const filterFromState = location.state?.filter;

        if (filterFromState === 'dry-fruit-treat') {
            setIsSpecialView(true); // Hide category header
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
            setIsSpecialView(true); // Hide category header
            setPageHeading("Wedding Special Sweets");
            fetchSweetsData(true); // Fetch wedding-specific sweets
        } else {
            // Default view: sweets by category
            setIsSpecialView(false); // Show category header
            const currentCategoryObj = sweetsHeader.find(h => h.category === category);
            setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
            fetchSweetsData(false); // Fetch sweets based on the current category
        }
    }, [category, location.state?.filter]); // Re-fetch if category or filter changes

    // Handler for selecting a category from the header
    const handleCategorySelect = (ele) => {
        // This will only be called when the category header is visible (i.e., !isSpecialView)
        // If a category is selected, we are no longer in a 'dry-fruit-treat' or 'wedding' special view triggered by a filter.
        // However, location.state.filter will persist until a new navigation replaces it.
        // To switch back to category view properly if filter was present, ideally, we'd clear the filter.
        // For now, setCategory will trigger the useEffect, which will prioritize existing filter if any.
        // A cleaner approach if wanting to override filter by category click would be to navigate:
        // navigate('/sweets', { replace: true }); // Clears state.filter
        // And then setCategory. But for now, let's keep it simple:
        setCategory(ele?.category);
        // The useEffect will handle fetching and page heading.
        // If location.state.filter is still present, it might take precedence.
        // To ensure category selection overrides filter, you might need to navigate to /sweets without state.
    };

    // Handlers for invitation flow
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
            // Consider a more user-friendly notification (e.g., a toast message)
            alert("Please select a sweet for the invitation.");
        }
    };

    // Navigate to sweet/dry fruit detail page
    const handleItemDetailNavigation = (item) => {
        if (sweetsInfo) {
            sweetsInfo(item); // Pass item data to context
        }
        navigate('/sweets-info'); // Navigate to detail page
    };

    return (
        <div className='sweets' >
            {/* You can uncomment this to show the dynamic page heading */}
            {/* <h1 className='sweets-page-heading'>{pageHeading}</h1> */}

            {/* Conditionally render the sweets category header */}
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

            {/* Content display area */}
            {isInvitationSweets ? (
                // Layout for selecting sweets for an invitation
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
                                {/* Conditionally display price if available */}
                                {ele?.amount !== undefined && <div className='sweets-price'>₹{ele?.amount}</div>}
                            </div>
                        ))}
                         {!data?.length && (
                            <div className='no-found'>No Data Found for Invitation Selection</div>
                        )}
                    </div>
                </div>
            ) : (
                // Default layout for browsing sweets/dry fruits
                <div className='sweets-content'>
                    <div className='sweets-content-list'>
                        {data?.map((ele) => ( // ele can be a sweet or a dry fruit
                            <div key={ele.id || ele.name} className='sweets-main-container'> {/* Added fallback key ele.name */}
                                <div className='sweets-content-img' onClick={() => handleItemDetailNavigation(ele)}>
                                    <div className='sweets-img-div'>
                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                    </div>
                                    <div className='sweets-name'>{ele?.name}</div>
                                    {/* Conditionally display price if available */}
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

            {/* "Done" button for invitation flow */}
            {isInvitationSweets && (
                <div className='sweet-select'>
                    <div className='btn-done' onClick={handleInvitationSweetDone} >Done</div>
                </div>
            )}
        </div>
    )
}