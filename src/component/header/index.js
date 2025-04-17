import laaagiLogo from '../../assets/logo/laaagi.png';
import seacrh from '../../assets/logo/search.png'
import group from "../../assets/logo/Group 2.png"
import './index.css'
import downArrow from "../../assets/logo/down.png"
import login from "../../assets/login/Ellipse 2.png"
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            if (window.innerWidth > 500) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <Link to='/'><img className='laaagi-img' src={laaagiLogo} alt='Laaagi' /></Link>
                    <div><Link to='/' >Laaagi</Link></div>
                </div>
                <div className='topbar-right'>
                    <div>
                        <img src={group} alt="group" />
                        <img src={downArrow} />
                    </div>
                    <div className='login-name'>
                        <img src={login} />
                        <div><Link to='/signup'>  Ram Kam</Link></div>
                        <img src={downArrow} />
                    </div>
                </div>
            </div>

            {isMobile && (
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
            )}
            <div className={`navbar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
                <div><Link to='/invitation' >Invitations</Link></div>
                <div> <Link to='/sweets'>Sweets</Link></div>
                <div><Link to='/decorations'>Decorations</Link> </div>
                <div><Link to='/designers'>Designer</Link> </div>
                <div><Link to='/planning-tool'>Planning Tools</Link></div>
                <div><Link to='/contact-us'>Contact Us</Link></div>
            </div>
        </div>
    )
}