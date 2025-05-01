// import laaagiLogo from '../../assets/logo/laaagi.png';
// import seacrh from '../../assets/logo/search.png'
// import group from "../../assets/logo/Group 2.png"
// import './index.css'
// import downArrow from "../../assets/logo/down.png"
// import login from "../../assets/login/Ellipse 2.png"
// import { useEffect, useState } from 'react';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, NavLink } from 'react-router-dom';

// export const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

//     useEffect(() => {
//         const handleResize = () => {
//             console.log(window.innerWidth,"asssssssssssssssssssssssssssss")
//             setIsMobile(window.innerWidth <= 500);
//             if (window.innerWidth > 500) {
//                 setMenuOpen(false);
//             }
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return (
//         <div>
//             <div className='topbar'>
//                 <div>Lorem Ipsum is simply dummy text</div>
//             </div>
//             <div className='header'>
//                 <div className='search'>
//                     <input type="search" placeholder="Search" />
//                     <img src={seacrh} alt="search" />
//                 </div>
//                 <div className='Laaagi' >
//                     <Link to='/'><img className='laaagi-img' src={laaagiLogo} alt='Laaagi' /></Link>
//                     <div><Link to='/' >Laaagi</Link></div>
//                 </div>
//                 <div className='topbar-right'>
//                     <div>
//                         <img src={group} alt="group" />
//                         <img src={downArrow} />
//                     </div>
//                     <div className='login-name'>
//                         <img src={login} />
//                         <div><Link to='/signup'>  Ram Kam</Link></div>
//                         <img src={downArrow} />
//                     </div>
//                 </div>
//             </div>

//             {isMobile && (
//                 <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//                     <MenuIcon />
//                 </div>
//             )}
//             <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
//                 <div><Link to='/invitation' >Invitations</Link></div>
//                 <div> <Link to='/sweets'>Sweets</Link></div>
//                 <div><Link to='/decorations'>Decorations</Link> </div>
//                 <div><Link to='/designers'>Designer</Link> </div>
//                 <div><Link to='/planning-tool'>Planning Tools</Link></div>
//                 <div><Link to='/contact-us'>Contact Us</Link></div>
//             </div>
//         </div>
//     )
// }
// new header
// import React, { useState, useEffect, useRef } from 'react'; 
// import laaagiLogo from '../../assets/logo/laaagi.png';
// import seacrh from '../../assets/logo/search.png';
// import group from "../../assets/logo/Group 2.png";
// import './index.css'; 
// import downArrow from "../../assets/logo/down.png";
// import login from "../../assets/login/Ellipse 2.png";
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, NavLink } from 'react-router-dom'; 

// export const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     const profileDropdownRef = useRef(null); 

//     const toggleProfileDropdown = () => {
//         setIsProfileDropdownOpen(!isProfileDropdownOpen);
//     };

//     const handleLogout = () => {
//         console.log("Logout Action");
//         setIsProfileDropdownOpen(false); 
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//                 setIsProfileDropdownOpen(false);
//             }
//         };

//         if (isProfileDropdownOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isProfileDropdownOpen]); 



//     useEffect(() => {
//         const handleResize = () => {
//             const mobileCheck = window.innerWidth <= 500;
//              if(isMobile !== mobileCheck) { 
//                setIsMobile(mobileCheck);
//              }
//             if (!mobileCheck) { 
//                 setMenuOpen(false); 
//             }
//         };
//         window.addEventListener('resize', handleResize);
//         handleResize();
//         return () => window.removeEventListener('resize', handleResize);
//     }, [isMobile]); 


//     return (
//         <div>
//             <div className='topbar'>
//                 <div>Lorem Ipsum is simply dummy text</div>
//             </div>
//             <div className='header'>
//                 <div className='search'>
//                     <input type="search" placeholder="Search" />
//                     <img src={seacrh} alt="search" />
//                 </div>
//                 <div className='Laaagi' >
//                     <Link to='/'><img className='laaagi-img' src={laaagiLogo} alt='Laaagi Logo' /></Link> 
//                     <div><Link to='/' >Laaagi</Link></div>
//                 </div>

//                 <div className='topbar-right'>
//                     <div className='some-other-feature'> 
//                         <img src={group} alt="group icon" /> 
//                         <img src={downArrow} alt="arrow down" /> 
//                     </div>

//                     <div className='user-profile-section' ref={profileDropdownRef}> 
//                         <button type="button" className='profile-trigger-button' onClick={toggleProfileDropdown}>
//                             <img src={login} alt="User avatar" />
//                             <span> Ram Kam</span> 
//                             <img
//                                 src={downArrow}
//                                 alt="Dropdown arrow"
//                                 className={`dropdown-arrow-img ${isProfileDropdownOpen ? 'open' : ''}`}
//                              />
//                         </button>

//                         {isProfileDropdownOpen && (
//                             <div className="profile-dropdown-menu">
//                                 <ul>
//                                     <li><Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>Profile</Link></li>
//                                     <li><Link to="/guest" onClick={() => setIsProfileDropdownOpen(false)}>Guest list</Link></li>
//                                     <li><Link to="/planning-tool" onClick={() => setIsProfileDropdownOpen(false)}>Planning Tool</Link></li>
//                                     <li>
//                                         <button type="button" onClick={handleLogout} className="logout-button">
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 {}
//             </div>

//              <div className='navbar-container'> 
//                 {isMobile && (
//                     <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//                         <MenuIcon />
//                     </div>
//                  )}
//                 <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
//                     <div><Link to='/invitation' onClick={() => setMenuOpen(false)}>Invitations</Link></div>
//                     <div><Link to='/sweets' onClick={() => setMenuOpen(false)}>Sweets</Link></div>
//                     <div><Link to='/decorations' onClick={() => setMenuOpen(false)}>Decorations</Link></div>
//                     <div><Link to='/designers' onClick={() => setMenuOpen(false)}>Designer</Link></div>
//                     <div><Link to='/planning-tool' onClick={() => setMenuOpen(false)}>Planning Tools</Link></div>
//                     <div><Link to='/contact-us' onClick={() => setMenuOpen(false)}>Contact Us</Link></div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// new2
import laaagiLogo from '../../assets/logo/laaagi.png';
import seacrh from '../../assets/logo/search.png';
import group from "../../assets/logo/Group 2.png";
import downArrow from "../../assets/logo/down.png";
import login from "../../assets/login/Ellipse 2.png";
import defaultProfile from "../../assets/login/default-profile.png"
import { useEffect, useState, useRef, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'
import { AuthContext } from '../context';
import axios from 'axios';
import { Logout } from './logout';


export const Header = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const setToken = context?.setToken;
    const token = context?.token;
    const defaultProfile=context.defaultProfile
    const userId = localStorage.getItem("_id")
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false)

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

    const LogoutUser = () => {
        localStorage.removeItem("_id")
        localStorage.removeItem("token")
        setUserData('')
        setToken('')
        setOpen(false)
        navigate('/')
    }

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
    }, [token,defaultProfile])

    return (
        <div>
            <div className='topbar'>
                <div>Lorem Ipsum is simply dummy text</div>
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

                    <div>
                        <img src={group} alt="group" />
                        <img src={downArrow} alt="dropdown arrow" />
                    </div>

                    <div className='user-menu-container' ref={dropdownRef}>
                        {
                            userData ? <div className='login-name'>
                                <img src={userData?.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData?.profile}` : defaultProfile} alt="User avatar" />
                                <div>{userData?.name}</div>
                                <img
                                    src={downArrow}
                                    alt="Open user menu"
                                    className={`dropdown-arrow dropdown-trigger-arrow ${isDropdownOpen ? 'open' : ''}`} 
                                    onClick={toggleDropdown}
                                />
                            </div> :
                                <div className='login-name'>
                                    <img src={defaultProfile} alt="User avatar" />
                                    <div>Guest</div>
                                </div>
                        }
                        {isDropdownOpen && (
                            <div className='user-dropdown-menu'>
                                <Link to='/profile' state={{ data: userData }} onClick={closeDropdown}>Profile</Link>
                                <Link to='/guest' onClick={closeDropdown}>GuestList</Link>
                                <Link to='/planning-tool' onClick={closeDropdown}>Planning tool</Link>
                                <button onClick={handleLogout}>LogOut</button>
                            </div>
                        )}
                    </div>
                </div>
                <Logout open={open} handleClose={closeLogoutModel} logoutUser={LogoutUser} />
            </div>

            {isMobile && (
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
            )}
            <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                <div><Link to='/invitation'>Invitations</Link></div>
                <div> <Link to='/sweets'>Sweets</Link></div>
                <div><Link to='/decorations'>Decorations</Link> </div>
                <div><Link to='/designers'>Designer</Link> </div>
                <div><Link to='/planning-tool'>Planning Tools</Link></div>
                <div><Link to='/contact-us'>Contact Us</Link></div>
            </div>
        </div>
    );
};
