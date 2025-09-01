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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



export const Header = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [userData, setUserData] = useState()
    const token = context?.token || localStorage.getItem('token')
    const headerUpdate = context?.headerUpdate;
    const setHeaderUpdate = context?.setHeaderUpdate;
    const setInvitationDropdown = context?.setInvitationDropdown;
    const setSweetDropDown = context?.setSweetDropDown;
    const setDecorationDropDown = context?.setDecorationDropDown;
    const setDesignDropDown = context?.setDesignDropDown;
    const userId = localStorage.getItem("_id");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    const searchContainerRef = useRef(null);
    const [clothesDisplayData, setClothesDisplayData] = useState([]);
    const [isLoadingClothes, setIsLoadingClothes] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null); // -1 means none selected
    // const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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


    const fetchSweetsData = async () => {
        setIsLoadingClothes(true);
        try {

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/sweets_list`,
                {
                    params: {
                        search: searchQuery
                    }
                }
            );
            const mappedData = (res?.data?.sweetsData || []).map(item => ({ id: item._id, name: item.sweet_name || item.name, path: `/sweets-info/${item._id}/${item?.sweet_name?.replace(/\s+/g, '-')}` }));
            setIsSearchDropdownOpen(true);
            setClothesDisplayData(mappedData);
        } catch (err) { console.error("Error loading sweets:", err); }
        finally { setIsLoadingClothes(false); }
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            fetchSweetsData();
        } else {
            setClothesDisplayData([]);
            setIsSearchDropdownOpen(false);
        }
    }, [searchQuery])




    const renderCategoryItems = (items) => {
        const filtered = items;
        if (filtered.length === 0) return <div className="no-items">No items found.</div>;
        return (
            // <ul className="category-item-list">
            //     {filtered.map(item => (
            //         <li key={item.id} onClick={() => { setIsSearchDropdownOpen(false); navigate(item.path); }}>
            //             {item.name}
            //         </li>
            //     ))}
            // </ul>
            <ul className="category-item-list">
                {clothesDisplayData.map((item, index) => (
                    <li
                        key={item.id}
                        onClick={() => {
                            navigate(item.path);
                            setIsSearchDropdownOpen(false);
                        }}
                        className={index === highlightedIndex ? 'highlighted' : ''}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>

        );
    };

    const fetchUserData = async () => {
        if (!userId || !token) {
            setUserData(null);
            return;
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(res?.data?.userData || null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setUserData(null);
        }
    };

    useEffect(() => {
        fetchUserData();
        setHeaderUpdate(false)
    }, [headerUpdate, token, userId]);

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsSearchDropdownOpen(false);
    };

    const handleGuestClick = () => {
        navigate('/signup');
    };

    return (
        
        <div style={{
            position: 'sticky', zIndex: '999', backgroundColor: '#fff',
            top: '0'
        }} >
            <div className='topbar' id ="Laaagi"style={{ fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
>Welcome to Laaagi</div>
            <header className='header'>
                <div className='search' ref={searchContainerRef}>
                    {/* <input
                        type="search"
                        placeholder="Search"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setHighlightedIndex(-1); // Reset highlight on text change
                        }}

                        value={searchQuery}
                    /> */}
                    <input
                        ref={inputRef}
                        type="search"
                        style={{ fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                        placeholder="Search"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setHighlightedIndex(-1); // Reset selection
                        }}
                        onKeyDown={(e) => {
                            if (!isSearchDropdownOpen) return;

                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setHighlightedIndex((prev) =>
                                    prev < clothesDisplayData.length - 1 ? prev + 1 : 0
                                );
                            }

                            if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setHighlightedIndex((prev) =>
                                    prev > 0 ? prev - 1 : clothesDisplayData.length - 1
                                );
                            }

                            if (e.key === 'Enter') {
                                if (highlightedIndex >= 0) {
                                    navigate(clothesDisplayData[highlightedIndex].path);
                                    setIsSearchDropdownOpen(false);
                                }
                            }

                            if (e.key === 'Escape') {
                                setIsSearchDropdownOpen(false);
                            }
                        }}
                        value={searchQuery}
                    />

                    <img src={seacrh} alt="search" />
                    {isSearchDropdownOpen && (
                        <div className="search-dropdown-content">
                            {isLoadingClothes ? <p>Loading...</p> : renderCategoryItems(clothesDisplayData)}
                        </div>
                    )}
                </div>

                <div className='Laaagi'>
                    <Link to='/'><img src={laaagiLogo} alt="logo" className='laaagi-img' /></Link>
                    <div><Link to='/'
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: '40px'
                        }}
                    >Laaagi</Link></div>
                </div>

                <div className='topbar-right'>
                    <div className='user-menu-container' ref={userDropdownRef}>
                        {userData && userData.name ? (
                            <>
                                <div ><Link to='/cart-list' className='cart' ><ShoppingCartIcon style={{ color: '#800000' }} /></Link></div>
                                <div className='login-name' onClick={toggleUserDropdown} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isUserDropdownOpen}>
                                    <img src={userData.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData.profile}` : defaultImg} alt="User avatar" className="user-avatar" />
                                    <div className="user-display-name">{userData.name}</div>
                                    <img src={downArrow} alt="" className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`} />
                                </div>
                                {isUserDropdownOpen && (
                                    <div className='user-dropdown-menu'>
                                        <Link to='/profile' state={{ data: userData }} onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
                                        <Link to='/guest/guest' onClick={() => setIsUserDropdownOpen(false)}>Guest List</Link>
                                        <Link to='/planning-tool' onClick={() => setIsUserDropdownOpen(false)}>Planning Tool</Link>
                                        <Link to='/payment-history' onClick={() => setIsUserDropdownOpen(false)}>Payment History</Link>
                                        <Link to='/saved-cart-list' onClick={() => setIsUserDropdownOpen(false)}>Save For Later</Link>
                                        <Link to='/sample-demo' onClick={() => setIsUserDropdownOpen(false)}>Demo</Link>
                                        <button id="Logout " onClick={() => { setOpenLogoutModal(true); setIsUserDropdownOpen(false); }}>Logout</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className='login-name' onClick={handleGuestClick} role="button" tabIndex={0}>
                                <img src={defaultImg} alt="Default user avatar" className="user-avatar" />
                                <div className="user-display-name">Guest</div>
                            </div>
                        )}
                    </div>
                </div>
                <Logout open={openLogoutModal} handleClose={() => setOpenLogoutModal(false)} />
            </header>

            {isMobile && (
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
            )}
            <nav style={{ color: 'red' }} className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                <div className="nav-item">

                    <NavLink to='/invitation' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                        style={{
                            color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                        }}>Invitations</NavLink>
                    {!isMobile && (
                        <div className="dropdown">
                            <NavLink to="/invitation" onClick={() => { setInvitationDropdown('Invitation on Box') }} > Box</NavLink>
                            {/* <NavLink to="/invitation" onClick={() => { setInvitationDropdown('Invitation') }} >Only Invitation</NavLink> */}
                            <NavLink to="/invitation" onClick={() => { setInvitationDropdown('Wooden Box') }} > Wooden Box</NavLink>
                            <NavLink to="/invitation" onClick={() => { setInvitationDropdown('Glass Box') }}> Glass Box</NavLink>
                            <NavLink to="/invitation" onClick={() => { setInvitationDropdown('Misc Invitation') }}>Miscellaneous</NavLink>
                        </div>
                    )}
                </div>
                <div className="nav-item">
                    <NavLink to='/sweets' onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => isActive ? 'active-link' : 'default'}
                        style={{
                            color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                        }}>Sweets</NavLink>

                    {!isMobile && (
                        <div className="dropdown">
                            <NavLink to="/sweets" onClick={() => { setSweetDropDown('Indian Sweets') }} >Indian Sweets</NavLink>
                            <NavLink to="/sweets" onClick={() => { setSweetDropDown('Innovative Fusions') }} >Innovative Fusions</NavLink>
                            <NavLink to="/sweets" onClick={() => { setSweetDropDown('Savouries') }} >Savouries</NavLink>
                            <NavLink to="/sweets" onClick={() => { setSweetDropDown('Dry Fruits') }}>Dry Fruits</NavLink>
                        </div>
                    )}
                </div>
                <div className="nav-item">
                    <NavLink to='/decorations' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                        style={{
                            color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                        }}
                        >Decorations</NavLink>

                    {!isMobile && (
                        <div className="dropdown">
                            <NavLink to="/decorations" onClick={() => { setDecorationDropDown('Marriage') }} >Marriage</NavLink>
                            <NavLink to="/decorations" onClick={() => { setDecorationDropDown('BirthDay') }} >Birthday</NavLink>
                            <NavLink to="/decorations" onClick={() => { setDecorationDropDown('Mehndi') }} >Mehndi</NavLink>
                            <NavLink to="/decorations" onClick={() => { setDecorationDropDown('Room Decor') }}>Room Decor</NavLink>
                            <NavLink to="/decorations" onClick={() => { setDecorationDropDown('Party') }}>Party</NavLink>
                        </div>
                    )}
                </div>
                <div className="nav-item">
                    <NavLink to='/designers' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                        style={{
                            color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                        }}>Designer</NavLink>
                    {!isMobile && (
                        <div className="dropdown">
                            <NavLink to="/designers" onClick={() => { setDesignDropDown('Bridge') }} >Bride</NavLink>
                            <NavLink to="/designers" onClick={() => { setDesignDropDown('Groom') }} >Groom</NavLink>
                            <NavLink to="/designers" onClick={() => { setDesignDropDown('Suits') }} >Suits</NavLink>
                            <NavLink to="/designers" onClick={() => { setDesignDropDown('Other') }}>Other</NavLink>
                        </div>
                    )}
                </div>


                <NavLink to='/planning-tool' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                    }}>Planning Tools</NavLink>
                <NavLink to='/contact-us' onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active-link' : 'default'}
                    style={{
                        color: '#8B0000', fontSize: '18px',fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

                    }}
                    >Contact Us</NavLink>
            </nav>
        </div>
        
    );
};
