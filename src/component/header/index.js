
// import laaagiLogo from '../../assets/logo/laaagi.png';
// import seacrh from '../../assets/logo/search.png';
// import downArrow from "../../assets/logo/down.png";
// import { useEffect, useState, useRef, useContext } from 'react';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import './index.css';
// import axios from 'axios';
// import { AuthContext } from '../context';
// import { Logout } from './logout';
// import defaultImg from "../../assets/login/default-profile.png";

// export const Header = () => {
//     const navigate = useNavigate();
//     const context = useContext(AuthContext);
//     const userData = context?.storeUserData;
//     const setUserData = context?.setStoreUserData;
//     const token = context?.token;
//     const headerUpdate = context?.headerUpdate;

//     const userId = localStorage.getItem("_id");

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//     const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

//     const userDropdownRef = useRef(null);
//     const searchContainerRef = useRef(null);

//     const [weddingSpecialApiData, setWeddingSpecialApiData] = useState([]);
//     const [dryFruitTreatsApiData, setDryFruitTreatsApiData] = useState([]);
//     const [clothesDisplayData, setClothesDisplayData] = useState([]);

//     const [isLoadingWeddingSpecial, setIsLoadingWeddingSpecial] = useState(false);
//     const [isLoadingDryFruitTreats, setIsLoadingDryFruitTreats] = useState(false);
//     const [isLoadingClothes, setIsLoadingClothes] = useState(false);

//     const [searchQuery, setSearchQuery] = useState("");

//     const [openLogoutModal, setOpenLogoutModal] = useState(false);

//     const [weddingSpecialOpen, setWeddingSpecialOpen] = useState(false);
//     const [dryFruitOpen, setDryFruitOpen] = useState(false);
//     const [sweetsOpen, setSweetsOpen] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             const isMobileCheck = window.innerWidth <= 768;
//             setIsMobile(isMobileCheck);
//             if (!isMobileCheck) setMenuOpen(false);
//         };

//         const handleClickOutside = (event) => {
//             if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//                 setIsUserDropdownOpen(false);
//             }
//             if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
//                 setIsSearchDropdownOpen(false);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const fetchWeddingSweetsData = async () => {
//         setIsLoadingWeddingSpecial(true);
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, {
//                 params: { isWedding: true }
//             });
//             const mappedData = (res?.data?.sweetsData || []).map(item => ({
//                 id: item._id,
//                 name: item.sweet_name || item.name,
//                 path: `/sweets-info/${item._id}/${item?.sweet_name?.replace(/\s+/g, '-')}`
//             }));
//             setWeddingSpecialApiData(mappedData);
//         } catch (err) {
//             console.error("Error loading wedding sweets:", err);
//         } finally {
//             setIsLoadingWeddingSpecial(false);
//         }
//     };

//     const fetchDryFruitTreatsData = async () => {
//         setIsLoadingDryFruitTreats(true);
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit_list`, {
//                 params: { isDryFruit: true }
//             });
//             const mappedData = (res?.data?.dryFruitData || []).map(item => ({
//                 id: item._id,
//                 name: item.name,
//                 path: `/dry-fruit_info/${item._id}/${item?.name?.replace(/\s+/g, '-')}`
//             }));
//             setDryFruitTreatsApiData(mappedData);
//         } catch (err) {
//             console.error("Error loading dry fruits:", err);
//         } finally {
//             setIsLoadingDryFruitTreats(false);
//         }
//     };

//     const fetchSweetsData = async () => {
//         setIsLoadingClothes(true);
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`);
//             const mappedData = (res?.data?.sweetsData || []).map(item => ({
//                 id: item._id,
//                 name: item.sweet_name || item.name,
//                 path: `/sweets-info/${item._id}/${item?.sweet_name?.replace(/\s+/g, '-')}`
//             }));
//             setClothesDisplayData(mappedData);
//         } catch (err) {
//             console.error("Error loading sweets:", err);
//         } finally {
//             setIsLoadingClothes(false);
//         }
//     };

//     const handleSearchInputClick = () => {
//         setIsSearchDropdownOpen(true);
//         fetchWeddingSweetsData();
//         fetchDryFruitTreatsData();
//         fetchSweetsData();
//     };

//     const filteredItems = (items) =>
//         items.filter(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));

//     const renderCategoryItems = (items) => {
//         if (!items.length) return <div>No items</div>;
//         return (
//             <ul className="category-item-list">
//                 {filteredItems(items).map(item => (
//                     <li key={item.id} onClick={() => { setIsSearchDropdownOpen(false); navigate(item.path); }}>
//                         {item.name}
//                     </li>
//                 ))}
//             </ul>
//         );
//     };

//     const fetchUserData = async () => {
//         if (!userId || !token) return;
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(res?.data?.userData || null);
//         } catch (err) {
//             console.error("Error fetching user data:", err);
//             setUserData(null);
//         }
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, [headerUpdate, token, userId]);

//     const toggleUserDropdown = () => {
//         setIsUserDropdownOpen(!isUserDropdownOpen);
//         setIsSearchDropdownOpen(false);

//     };
//     const openSignupPage = () => navigate('/signup');


//     return (
//         <div>
//             <div className='topbar'>Welcome to Laaagi</div>
//             <header className='header'>
//                 <div className='search' ref={searchContainerRef}>
//                     <input
//                         type="search"
//                         placeholder="Search"
//                         onClick={handleSearchInputClick}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         value={searchQuery}
//                     />
//                     <img src={seacrh} alt="search" onClick={handleSearchInputClick} />
//                     {isSearchDropdownOpen && (
//                         <div className="search-dropdown-content">
//                             <div
//                                 className="search-dropdown-category-title"
//                                 onClick={() => {
//                                     setWeddingSpecialOpen(true);
//                                     setDryFruitOpen(false);
//                                     setSweetsOpen(false);
//                                 }}
//                             >
//                                 Wedding Special
//                             </div>
//                             {weddingSpecialOpen && (isLoadingWeddingSpecial ? <p>Loading...</p> : renderCategoryItems(weddingSpecialApiData))}

//                             <div
//                                 className="search-dropdown-category-title"
//                                 onClick={() => {
//                                     setWeddingSpecialOpen(false);
//                                     setDryFruitOpen(true);
//                                     setSweetsOpen(false);
//                                 }}
//                             >
//                                 Dry Fruit Treats
//                             </div>
//                             {dryFruitOpen && (isLoadingDryFruitTreats ? <p>Loading...</p> : renderCategoryItems(dryFruitTreatsApiData))}

//                             <div
//                                 className="search-dropdown-category-title"
//                                 onClick={() => {
//                                     setWeddingSpecialOpen(false);
//                                     setDryFruitOpen(false);
//                                     setSweetsOpen(true);
//                                 }}
//                             >
//                                 Sweets
//                             </div>
//                             {sweetsOpen && (isLoadingClothes ? <p>Loading...</p> : renderCategoryItems(clothesDisplayData))}
//                         </div>
//                     )}
//                 </div>

//                 <div className='Laaagi'>
//                     <Link to='/'><img src={laaagiLogo} alt="logo" className='laaagi-img' /></Link>
//                     <div><Link to='/'>Laaagi</Link></div>
//                 </div>

//                 <div className='topbar-right'>
//                     <div className='user-menu-container' ref={userDropdownRef}>
//                        { userData ? (
//                                 <div className='login-name' onClick={toggleUserDropdown} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isUserDropdownOpen}>
//                                     <img src={userData?.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData.profile}` : defaultImg} alt="User avatar" className="user-avatar"/>
//                                     <div className="user-display-name">{userData?.name || "guest"}</div>
//                                     <img src={downArrow} alt="" className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`} aria-hidden="true" />
//                                 </div>
//                             ) : (
//                                 <div className='login-name' onClick={openSignupPage} role="button" tabIndex={0}>
//                                     <img src={defaultImg} alt="Default user avatar" className="user-avatar" />
//                                     <div className="user-display-name">Guest</div>
//                                 </div>
//                             )
//                         }
//                         {isUserDropdownOpen && userData && (
//                             <div className='user-dropdown-menu'>
//                                 <Link to='/profile' state={{ data: userData }} onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
//                                 <Link to='/guest' onClick={() => setIsUserDropdownOpen(false)}>Guest List</Link>
//                                 <Link to='/planning-tool' onClick={() => setIsUserDropdownOpen(false)}>Planning Tool</Link>
//                                 <Link to='/payment-history' onClick={() => setIsUserDropdownOpen(false)}>Payment History</Link>
//                                 <button onClick={() => setOpenLogoutModal(true)}>Logout</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <Logout open={openLogoutModal} handleClose={() => setOpenLogoutModal(false)} />
//             </header>

//             {isMobile && (
//                 <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//                     <MenuIcon />
//                 </div>
//             )}
//             <nav style={{ color: 'red' }} className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
//                 <NavLink to='/invitation' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ',textDecoration:'none' }}>Invitations</NavLink>
//                 <NavLink to='/sweets' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ',textDecoration:'none' }}>Sweets</NavLink>
//                 <NavLink to='/decorations' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ',textDecoration:'none' }}>Decorations</NavLink>
//                 <NavLink to='/designers' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ',textDecoration:'none' }}>Designer</NavLink>
//                 <NavLink to='/planning-tool' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ',textDecoration:'none' }}>Planning Tools</NavLink>
//                 <NavLink to='/contact-us' onClick={() => setMenuOpen(false)} style={{ color: '#ffd700 ' ,textDecoration:'none'}}>Contact Us</NavLink>
//             </nav>
//         </div>
//     );
// };


import laaagiLogo from '../../assets/logo/laaagi.png';
import seacrh from '../../assets/logo/search.png';
import downArrow from "../../assets/logo/down.png";
import { useEffect, useState, useRef, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import { AuthContext } from '../context';
import { Logout } from './logout';
import defaultImg from "../../assets/login/default-profile.png";

export const Header = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const userData = context?.storeUserData;
    const setUserData = context?.setStoreUserData;
    const token = context?.token;
    const headerUpdate = context?.headerUpdate;

    const userId = localStorage.getItem("_id");

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

    const userDropdownRef = useRef(null);
    const searchContainerRef = useRef(null);

    const [weddingSpecialApiData, setWeddingSpecialApiData] = useState([]);
    const [dryFruitTreatsApiData, setDryFruitTreatsApiData] = useState([]);
    const [clothesDisplayData, setClothesDisplayData] = useState([]);

    const [isLoadingWeddingSpecial, setIsLoadingWeddingSpecial] = useState(false);
    const [isLoadingDryFruitTreats, setIsLoadingDryFruitTreats] = useState(false);
    const [isLoadingClothes, setIsLoadingClothes] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const [weddingSpecialOpen, setWeddingSpecialOpen] = useState(false);
    const [dryFruitOpen, setDryFruitOpen] = useState(false);
    const [sweetsOpen, setSweetsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileCheck = window.innerWidth <= 768;
            setIsMobile(isMobileCheck);
            if (!isMobileCheck) setMenuOpen(false);
        };

        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchWeddingSweetsData = async () => {
        setIsLoadingWeddingSpecial(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`, { params: { isWedding: true } });
            const mappedData = (res?.data?.sweetsData || []).map(item => ({ id: item._id, name: item.sweet_name || item.name, path: `/sweets-info/${item._id}/${item?.sweet_name?.replace(/\s+/g, '-')}` }));
            setWeddingSpecialApiData(mappedData);
        } catch (err) { console.error("Error loading wedding sweets:", err); }
        finally { setIsLoadingWeddingSpecial(false); }
    };

    const fetchDryFruitTreatsData = async () => {
        setIsLoadingDryFruitTreats(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/dry_fruit_list`, { params: { isDryFruit: true } });
            const mappedData = (res?.data?.dryFruitData || []).map(item => ({ id: item._id, name: item.name, path: `/dry-fruit_info/${item._id}` }));
            console.log("hgggggggggggggggggg")
            setDryFruitTreatsApiData(mappedData);
        } catch (err) { console.error("Error loading dry fruits:", err); }
        finally { setIsLoadingDryFruitTreats(false); }
    };

    const fetchSweetsData = async () => {
        setIsLoadingClothes(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`);
            const mappedData = (res?.data?.sweetsData || []).map(item => ({ id: item._id, name: item.sweet_name || item.name, path: `/sweets-info/${item._id}/${item?.sweet_name?.replace(/\s+/g, '-')}` }));
            setClothesDisplayData(mappedData);
        } catch (err) { console.error("Error loading sweets:", err); }
        finally { setIsLoadingClothes(false); }
    };

    const handleSearchInputClick = () => {
        setIsSearchDropdownOpen(true);
        // Only fetch data if it hasn't been fetched yet
        if (weddingSpecialApiData.length === 0) fetchWeddingSweetsData();
        if (dryFruitTreatsApiData.length === 0) fetchDryFruitTreatsData();
        if (clothesDisplayData.length === 0) fetchSweetsData();
    };

    const filteredItems = (items) =>
        items.filter(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));

    const renderCategoryItems = (items) => {
        const filtered = filteredItems(items);
        if (filtered.length === 0) return <div className="no-items">No items found.</div>;
        return (
            <ul className="category-item-list">
                {filtered.map(item => (
                    <li key={item.id} onClick={() => { setIsSearchDropdownOpen(false); navigate(item.path); }}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    };

    const fetchUserData = async () => {
        if (!userId || !token) {
            setUserData(null); // Ensure user data is cleared if no token/id
            return;
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(res?.data?.userData || null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setUserData(null); // Clear data on error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [headerUpdate, token, userId]);

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsSearchDropdownOpen(false);
    };

    const handleGuestClick = () => {
        navigate('/signup');
    };

    return (
        <div>
            <div className='topbar'>Welcome to Laaagi</div>
            <header className='header'>
                {/* === SEARCH BAR AND ITS DROPDOWN (BILKUL SAHI) === */}
                <div className='search' ref={searchContainerRef}>
                    <input
                        type="search"
                        placeholder="Search"
                        onClick={handleSearchInputClick}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <img src={seacrh} alt="search" onClick={handleSearchInputClick} />
                    {isSearchDropdownOpen && (
                        <div className="search-dropdown-content">
                            <div className="search-dropdown-category-title" onClick={() => { setWeddingSpecialOpen(!weddingSpecialOpen); setDryFruitOpen(false); setSweetsOpen(false); }}>
                                Wedding Special
                            </div>
                            {weddingSpecialOpen && (isLoadingWeddingSpecial ? <p>Loading...</p> : renderCategoryItems(weddingSpecialApiData))}

                            <div className="search-dropdown-category-title" onClick={() => { setDryFruitOpen(!dryFruitOpen); setWeddingSpecialOpen(false); setSweetsOpen(false); }}>
                                Dry Fruit Treats
                            </div>
                            {dryFruitOpen && (isLoadingDryFruitTreats ? <p>Loading...</p> : renderCategoryItems(dryFruitTreatsApiData))}

                            <div className="search-dropdown-category-title" onClick={() => { setSweetsOpen(!sweetsOpen); setWeddingSpecialOpen(false); setDryFruitOpen(false); }}>
                                Sweets
                            </div>
                            {sweetsOpen && (isLoadingClothes ? <p>Loading...</p> : renderCategoryItems(clothesDisplayData))}
                        </div>
                    )}
                </div>

                {/* === LOGO (BILKUL SAHI) === */}
                <div className='Laaagi'>
                    <Link to='/'><img src={laaagiLogo} alt="logo" className='laaagi-img' /></Link>
                    <div><Link to='/'>Laaagi</Link></div>
                </div>

                {/* === USER MENU (BILKUL SAHI) === */}
                <div className='topbar-right'>
                    <div className='user-menu-container' ref={userDropdownRef}>
                        {/* Shart: Agar userData मौजूद hai aur uska naam bhi hai */}
                        {userData && userData.name ? (
                            // LOGGED-IN USER VIEW
                            <>
                                <div className='login-name' onClick={toggleUserDropdown} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isUserDropdownOpen}>
                                    <img src={userData.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData.profile}` : defaultImg} alt="User avatar" className="user-avatar" />
                                    <div className="user-display-name">{userData.name}</div>
                                    <img src={downArrow} alt="" className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`} />
                                </div>
                                {isUserDropdownOpen && (
                                    <div className='user-dropdown-menu'>
                                        <Link to='/profile' state={{ data: userData }} onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
                                        <Link to='/guest' onClick={() => setIsUserDropdownOpen(false)}>Guest List</Link>
                                        <Link to='/planning-tool' onClick={() => setIsUserDropdownOpen(false)}>Planning Tool</Link>
                                        <Link to='/payment-history' onClick={() => setIsUserDropdownOpen(false)}>Payment History</Link>
                                        <button onClick={() => { setOpenLogoutModal(true); setIsUserDropdownOpen(false); }}>Logout</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // GUEST VIEW
                            <div className='login-name' onClick={handleGuestClick} role="button" tabIndex={0}>
                                <img src={defaultImg} alt="Default user avatar" className="user-avatar" />
                                <div className="user-display-name">Guest</div>
                            </div>
                        )}
                    </div>
                </div>
                <Logout open={openLogoutModal} handleClose={() => setOpenLogoutModal(false)} />
            </header>

            {/* === MOBILE NAVBAR (BILKUL SAHI) === */}
            {isMobile && (
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
            )}
            <nav style={{ color: 'red' }} className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                <NavLink to='/invitation' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Invitations</NavLink>
                <NavLink to='/sweets' onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Sweets</NavLink>
                <NavLink to='/decorations' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Decorations</NavLink>
                <NavLink to='/designers' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Designer</NavLink>
                <NavLink to='/planning-tool' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Planning Tools</NavLink>
                <NavLink to='/contact-us' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#ffd700'
                    }}>Contact Us</NavLink>
            </nav>
        </div>
    );
};
