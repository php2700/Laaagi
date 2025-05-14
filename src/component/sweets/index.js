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
import './index.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import rightIcon from "../../assets/icon/li_arrow-right.png"
import leftIcon from "../../assets/icon/left_arrow-right.png"
import { AuthContext } from '../context';
import rightArrow from "../../assets/invitations/right-icon.png"

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

    const [data, setData] = useState([]);
    const [invitationselectSweet, setInvitationSelectSweet] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [category, setCategory] = useState(INITIAL_CATEGORY);
    const [isWeddingView, setIsWeddingView] = useState(false); // This state is key
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

    const sweetsDataList = (fetchForWedding = false) => {
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
                console.log(error);
                setData([]);
            });
    };

    useEffect(() => {
        const cameFromWeddingSpecialSeeMore = location.state?.filter === 'wedding';

        if (cameFromWeddingSpecialSeeMore) {
            setIsWeddingView(true); // Set to true if coming from wedding special
            setPageHeading("Wedding Special Sweets");
            // setCategory(null); // Optional: Clear category if wedding view is primary
            sweetsDataList(true);
        } else {
            setIsWeddingView(false); // Set to false for direct access or other navigation
            const currentCategoryObj = sweetsHeader.find(h => h.category === category);
            setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
            sweetsDataList(false);
        }
    }, [category, location.state?.filter]);

    const handleUrl = (ele) => {
        // This function will only be callable if the header is visible,
        // meaning isWeddingView is false.
        setIsWeddingView(false); // Ensure wedding view is off if a category is clicked
        setCategory(ele?.category);
        const currentCategoryObj = sweetsHeader.find(h => h.category === ele?.category);
        setPageHeading(currentCategoryObj ? currentCategoryObj.name : "Sweets");
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

    const handleSweetDetailNavigation = (ele) => {
        if (sweetsInfo) {
            sweetsInfo(ele);
        }
        navigate('/sweets-info');
    };


    return (
        <div className='sweets' >
            {/* <h1 className='sweets-page-heading'>{pageHeading}</h1> */}

            {/* ----------- Conditionally render the sweets header ----------- */}
            {!isWeddingView && (
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
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`} // Active state only relevant if header is shown
                                    onClick={() => handleUrl(ele)}
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
                                    className={`sweets-header-item ${ele.category === category ? 'active-url' : ''}`} // Active state only relevant if header is shown
                                    onClick={() => handleUrl(ele)}
                                >
                                    {ele?.name}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
            {/* ----------------------------------------------------------------- */}


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
                                <div className='sweets-price'>₹{ele?.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='sweets-content'>
                    <div className='sweets-content-list'>
                        {data?.map((ele) => (
                            <div key={ele.id} className='sweets-main-container'>
                                <div className='sweets-content-img' onClick={() => handleSweetDetailNavigation(ele)}>
                                    <div className='sweets-img-div'>
                                        <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} alt={ele?.name} />
                                    </div>
                                    <div className='sweets-name'>{ele?.name}</div>
                                    <div className='sweets-price'>₹{ele?.amount}</div>
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