// import { use, useContext, useEffect, useState } from 'react';
// import rightIcon from "../../assets/icon/li_arrow-right.png"
// import leftIcon from "../../assets/icon/left_arrow-right.png"
// import './index.css'
// import { Link, useNavigate } from 'react-router-dom';
// import { filterData, invitationCategory } from '../category';
// import axios from 'axios';
// import MenuIcon from '@mui/icons-material/Menu';
// import { AuthContext } from '../context';


// const invitationHeader = [
//     { name: 'Only Invitation', url: '/invitation' },
//     { name: 'Invitation on Wooden Box', url: '/invitation-wooden' },
//     { name: 'Invitation on Box', url: '/invitation-box' },
//     { name: 'Invitation on Glass Box', url: '/invitation-glass' },
//     { name: 'Misc Invitation', url: '/invitation-misc' },
// ]

// export const Invitation = () => {
//     const context = useContext(AuthContext);
//     const invitationSweet = context.setSelectSweet;
//     const navigate = useNavigate()
//     const [selectedPrice, setSelectedPrice] = useState('');
//     const [data, setData] = useState([])
//     const [startIndex, setStartIndex] = useState(0)
//     const [lastIndex, setLastIndex] = useState(1)
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
//     const [menuOpen, setMenuOpen] = useState(false)

//     const handleForwardIcon = () => {
//         const totalItems = invitationHeader?.length || 0;
//         const nextStart = lastIndex + 1;
//         const nextLast = lastIndex + 2;
//         if (nextStart < totalItems) {
//             setStartIndex(nextStart);
//             setLastIndex(Math.min(nextLast, totalItems - 1));
//         }
//     }

//     const handlePrev = () => {
//         const prevStart = Math.max(0, startIndex - 2);
//         const prevLast = Math.max(1, startIndex - 1);
//         setStartIndex(prevStart);
//         setLastIndex(prevLast);
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 500);
//             if (window.innerWidth <= 500) {
//                 setMenuOpen(false)
//             }
//         }
//         window.addEventListener('resize', handleResize)
//         return () => { window.removeEventListener('resize', handleResize) }
//     }, [])

//     const getInvitationList = () => {
//         axios.get(`${process.env.REACT_APP_BASE_URL}api/user/invitation_list`, {
//             params: {
//                 category: invitationCategory[0],
//                 price: selectedPrice
//             }
//         })
//             .then((res) => {
//                 setData(res?.data?.invitationData);
//             }).catch((error) => {
//                 console.log(error);
//             })
//     }

//     useEffect(() => {
//         getInvitationList()
//     }, [selectedPrice])

//     const handleFilter = (data) => {
//         setSelectedPrice(data)
//     }

//     console.log(isMobile, "ismobile")

//     const handleInvitationImg = (ele) => {
//         invitationSweet(ele)
//         navigate('/invitation-detail')
//     }

//     return (
//         <div className='invitations' >
//             <div className='invitations-header'>
//                 {
//                     isMobile ?
//                         <>
//                             {startIndex > 0 &&
//                                 <div onClick={handlePrev}><img src={leftIcon} /></div>
//                             }
//                             {invitationHeader?.slice(startIndex, lastIndex + 1).map((ele) => (
//                                 <div><Link to={ele.url} >{ele?.name}</Link></div>
//                             ))}
//                             {(lastIndex < (invitationHeader?.length || 0) - 1) &&
//                                 <div onClick={handleForwardIcon}><img src={rightIcon} /></div>
//                             }
//                         </> :
//                         <>
//                             {invitationHeader?.map((ele) => (
//                                 <div><Link to={ele.url} >{ele?.name}</Link></div>
//                             ))}
//                         </>
//                 }
//             </div>
//             <div className='invitations-content'>
//                 <div className='invitations-price-left'>
//                     <div className='invitation-price-header'>Price Range filter</div>
//                     {
//                         isMobile && <div onClick={() => setMenuOpen(!menuOpen)}>
//                             <MenuIcon />
//                         </div>
//                     }
//                     <div className={`invitation-toggle ${isMobile ? (menuOpen ? 'open' : 'close') : ''}`}>
//                         {
//                             filterData?.map((ele) => (
//                                 <div className='invitation-price' onClick={() => { handleFilter(ele) }}>{ele}</div>
//                             ))
//                         }
//                     </div>
//                 </div>
//                 <div className='invitations-content-header'>
//                     <div className='invitation-content-text'> Upload Your Design and get quote for the same</div>
//                     <div className='invitation-content-list'>
//                         {
//                             data?.map((ele) => (
//                                 <div className='invitation-content-img' onClick={() => handleInvitationImg(ele)} >
                                    
                                    
//                                     <img src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`} />
//                                     <div>{ele?.name}</div>
                                    
//                                 </div>
//                             ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }
// new
import { useContext, useEffect, useState } from 'react';
import rightIcon from "../../assets/icon/li_arrow-right.png"; 
import leftIcon from "../../assets/icon/left_arrow-right.png"; 
import './index.css'; 
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
];

export const Invitation = () => {
    const context = useContext(AuthContext);
    const invitationSweet = context?.setSelectSweet;
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState('');
    const [data, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(1); 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); 
    const [menuOpen, setMenuOpen] = useState(!isMobile); 

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
                category: categoryToFetch,
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
        getInvitationList();
    }, [selectedPrice]); 

    const handleFilter = (data) => {
        setSelectedPrice(prev => prev === data ? '' : data); 
        if (isMobile) {
            setMenuOpen(false);
        }
    };

    const handleInvitationImg = (ele) => {
        if (invitationSweet && ele) {
            invitationSweet(ele);
            navigate('/invitation-detail');
        } else {
            console.error("Context function or element data missing for navigation.");
        }
    };


    const headerItemsToShow = isMobile
        ? invitationHeader?.slice(startIndex, lastIndex + 1) || []
        : invitationHeader || [];

    return (
        <div className='invitations'>
            <div className='invitations-header'>
                {isMobile && startIndex > 0 && (
                    <div className='arrow-container' onClick={handlePrev} role="button" tabIndex={0} aria-label="Previous category">
                        <img src={leftIcon} className="arrow-icon arrow-left" alt="" />
                    </div>
                )}

                {headerItemsToShow.map((ele, index) => (
                    <div key={ele.url || `header-${index}`}>
                        <Link to={ele.url}>{ele?.name}</Link>
                    </div>
                ))}

                {isMobile && lastIndex < (invitationHeader?.length || 0) - 1 && (
                     <div className='arrow-container' onClick={handleForwardIcon} role="button" tabIndex={0} aria-label="Next category">
                        <img src={rightIcon} className="arrow-icon arrow-right" alt="" />
                    </div>
                )}
            </div>

            <div className='invitations-content'>
                <div className='invitations-price-left'>
                    <div className='filter-header-container'>
                        <span className='invitation-price-header'>Price Range filter</span>
                        {isMobile && (
                           <button
                                className='hamburger-toggle-button'
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-expanded={menuOpen}
                                aria-controls="filter-options" 
                            >
                                <MenuIcon />
                           </button>
                        )}
                    </div>

                    <div id="filter-options" className={`invitation-toggle ${isMobile ? (menuOpen ? 'open' : 'close') : 'open'}`}> 
                        {filterData?.map((ele, index) => (
                            <div
                                key={ele || `filter-${index}`} 
                                className={`invitation-price ${selectedPrice === ele ? 'active-filter' : ''}`} 
                                onClick={() => { handleFilter(ele); }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFilter(ele) : null} 
                            >
                                {ele}
                            </div>
                        ))}
                         {selectedPrice && (
                            <div
                                className='invitation-price clear-filter' 
                                onClick={() => handleFilter('')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFilter('') : null}
                             >
                                Clear Filter
                            </div>
                         )}
                    </div>
                </div>

                <div className='invitations-content-header'>
                    <div className='invitation-content-text'>
                        Upload Your Design and get quote for the same 
                    </div>
                    <div className='invitation-content-list'>
                        {data?.length > 0 ? (
                             data.map((ele) => (
                                <div
                                    key={ele?._id || ele?.name} 
                                    className='invitation-content-img'
                                    onClick={() => handleInvitationImg(ele)}
                                    role="button" 
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleInvitationImg(ele) : null} // Keyboard activation
                                >
                                    <img
                                        src={`${process.env.REACT_APP_BASE_URL}uploads/${ele?.image}`}
                                        alt={ele?.name || 'Invitation image'}
                                        loading="lazy" 
                                    />
                                    <div className="invitation-name-overlay">{ele?.name}</div>
                                </div>
                            ))
                        ) : (
                            <p>No invitations found matching your criteria.</p> 
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
