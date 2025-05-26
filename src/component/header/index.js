import laaagiLogo from '../../assets/logo/laaagi.png';
import seacrh from '../../assets/logo/search.png';
import downArrow from "../../assets/logo/down.png";
import { useEffect, useState, useRef, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link,  NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import { AuthContext } from '../context';
import { Logout } from './logout';
import defaultImg from "../../assets/login/default-profile.png"

export const Header = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const userData = context?.storeUserData;
    const setUserData = context?.setStoreUserData;
    const token = context?.token;
    const userId = localStorage.getItem("_id")
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false)
    const headerUpdate = context?.headerUpdate;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            if (window.innerWidth > 500) {
                setMenuOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);


    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        setIsDropdownOpen(false);
        setOpen(true)
    };

    const closeLogoutModel = () => {
        setOpen(false)
    }


    const closeDropdown = () => {
        setIsDropdownOpen(false);
    }

    const getUserData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => {
            setUserData(res?.data?.userData)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUserData()
    }, [headerUpdate,])


    useEffect(() => {
        if (!token) {
            setUserData();
            return
        }
        getUserData()
    }, [token])


    const openSignup = () => {
        navigate('/signup')
    }

    return (
        <div>
            <div className='topbar'>
                <div>Welcome to the Laaagi</div>
            </div>
            <div className='header'>
                <div className='search'>
                    <input type="search" placeholder="Search" />
                    <img src={seacrh} alt="search" />
                </div>
                <div className='Laaagi'>
                    <Link to='/'><img className='laaagi-img' src={laaagiLogo} alt='Laaagi' /></Link>
                    <div><Link to='/'>Laaagi</Link></div>
                </div>
                <div className='topbar-right'>

                    <div className='user-menu-container' ref={dropdownRef}>
                        {
                            userData ? <div className='login-name' onClick={toggleDropdown}>
                                <img src={userData?.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData?.profile}` : defaultImg} alt="User avatar" />
                                <div>{userData?.name}</div>
                                <img
                                    src={downArrow}
                                    alt="Open user menu"
                                    className={`dropdown-arrow dropdown-trigger-arrow ${isDropdownOpen ? 'open' : ''}`}
                                />
                            </div> :
                                <div className='login-name' onClick={openSignup} >
                                    <img src={defaultImg} alt="User avatar" />
                                    <div>Guest</div>
                                </div>
                        }
                        {isDropdownOpen && (
                            <div className='user-dropdown-menu'>
                                <Link to='/profile' state={{ data: userData }} onClick={closeDropdown}>Profile</Link>
                                <Link to='/guest' onClick={closeDropdown}>Guest List</Link>
                                <Link to='/planning-tool' onClick={closeDropdown}>Planning Tool</Link>
                                <Link to='/payment-history' onClick={closeDropdown}>Payment History</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
                <Logout open={open} handleClose={closeLogoutModel} />
            </div>

            {isMobile && (
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
            )}
            <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                <div><NavLink to='/invitation' className={({ isActive }) => (isActive ? 'active-link' : '')}>Invitations</NavLink></div>
                <div><NavLink to='/sweets' className={({ isActive }) => (isActive ? 'active-link' : '')}>Sweets</NavLink></div>
                <div><NavLink to='/decorations' className={({ isActive }) => (isActive ? 'active-link' : '')}>Decorations</NavLink></div>
                <div><NavLink to='/designers' className={({ isActive }) => (isActive ? 'active-link' : '')}>Designer</NavLink></div>
                <div><NavLink to='/planning-tool' className={({ isActive }) => (isActive ? 'active-link' : '')}>Planning Tools</NavLink></div>
                <div><NavLink to='/contact-us' className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact Us</NavLink></div>
            </div>
        </div>
    );
};
