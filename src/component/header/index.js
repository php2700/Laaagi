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
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import laaagiLogo from '../../assets/logo/laaagi.png';
import seacrh from '../../assets/logo/search.png';
import group from "../../assets/logo/Group 2.png";
import './index.css'; // Ensure this CSS file includes new styles below
import downArrow from "../../assets/logo/down.png";
import login from "../../assets/login/Ellipse 2.png";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom'; // Use Link for navigation

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    // --- Start: Profile Dropdown Logic ---
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null); // Ref for the dropdown container

    // Function to toggle profile dropdown
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Placeholder for logout action
    const handleLogout = () => {
        console.log("Logout Action");
        // Add your actual logout logic here (e.g., clear tokens, redirect)
        setIsProfileDropdownOpen(false); // Close dropdown after logout
    };

    // Effect to handle clicks outside the profile dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the referenced dropdown area
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        // Add listener only when the dropdown is open
        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove the listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]); // Dependency array ensures effect runs when state changes

    // --- End: Profile Dropdown Logic ---


    // Effect for mobile menu handling
    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 500;
             if(isMobile !== mobileCheck) { // Update state only if it changes
               setIsMobile(mobileCheck);
             }
            if (!mobileCheck) { // If wider than 500px
                setMenuOpen(false); // Always close mobile menu
            }
        };
        window.addEventListener('resize', handleResize);
        // Initial check in case the window is already resized before effect runs
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]); // Re-run effect if isMobile state changes


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
                <div className='Laaagi' >
                    <Link to='/'><img className='laaagi-img' src={laaagiLogo} alt='Laaagi Logo' /></Link> {/* Added alt text */}
                    <div><Link to='/' >Laaagi</Link></div>
                </div>

                {/* --- Start: Modified Right Topbar --- */}
                <div className='topbar-right'>
                    {/* Section for Group/Down Arrow (Assuming it's another dropdown or static) */}
                    <div className='some-other-feature'> {/* Gave a more descriptive class */}
                        <img src={group} alt="group icon" /> {/* Added alt text */}
                        <img src={downArrow} alt="arrow down" /> {/* Added alt text */}
                    </div>

                    {/* Profile Section with Dropdown */}
                    <div className='user-profile-section' ref={profileDropdownRef}> {/* Wrapper with Ref */}
                        {/* Make the trigger a button for accessibility and attach toggle */}
                        <button type="button" className='profile-trigger-button' onClick={toggleProfileDropdown}>
                            <img src={login} alt="User avatar" /> {/* Added alt text */}
                            <span> Ram Kam</span> {/* Removed Link from here */}
                            {/* Add class to arrow based on state for potential CSS rotation */}
                            <img
                                src={downArrow}
                                alt="Dropdown arrow"
                                className={`dropdown-arrow-img ${isProfileDropdownOpen ? 'open' : ''}`}
                             />
                        </button>

                        {/* Conditionally Rendered Dropdown Menu */}
                        {isProfileDropdownOpen && (
                            <div className="profile-dropdown-menu">
                                <ul>
                                    {/* Use Link component and close dropdown on click */}
                                    <li><Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>Profile</Link></li>
                                    <li><Link to="/guest-list" onClick={() => setIsProfileDropdownOpen(false)}>Guest list</Link></li>
                                    <li><Link to="/planning-tool-user" onClick={() => setIsProfileDropdownOpen(false)}>Planning Tool</Link></li> {/* Maybe a user-specific planning tool link? */}
                                    <li>
                                        <button type="button" onClick={handleLogout} className="logout-button">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* --- End: Modified Right Topbar --- */}
            </div>

            {/* Mobile Menu Toggle - Placed logically near the navbar it controls */}
             <div className='navbar-container'> {/* Added container for toggle and nav */}
                {isMobile && (
                    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <MenuIcon />
                    </div>
                 )}
                {/* Mobile and Desktop Navbar */}
                <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                    {/* Links */}
                    <div><Link to='/invitation' onClick={() => setMenuOpen(false)}>Invitations</Link></div> {/* Close mobile menu on link click */}
                    <div><Link to='/sweets' onClick={() => setMenuOpen(false)}>Sweets</Link></div>
                    <div><Link to='/decorations' onClick={() => setMenuOpen(false)}>Decorations</Link></div>
                    <div><Link to='/designers' onClick={() => setMenuOpen(false)}>Designer</Link></div>
                    <div><Link to='/planning-tool' onClick={() => setMenuOpen(false)}>Planning Tools</Link></div>
                    <div><Link to='/contact-us' onClick={() => setMenuOpen(false)}>Contact Us</Link></div>
                </div>
            </div>
        </div>
    )
}