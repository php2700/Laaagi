import { NavLink } from 'react-router-dom';
import './Navigation.css'; 
import { useEffect, useState } from 'react';

import axios from 'axios';

export const Navigation =() => {
  const getNavLinkClass = ({ isActive }) => {
    console.log('Link Active State:', isActive);

    return isActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="main-nav"> 
      <ul>
        <li>
          <NavLink to="/Invitations" className={getNavLinkClass}>
            Invitations
          </NavLink>
        </li>
        <li>
          <NavLink to="/sweets" className={getNavLinkClass}>
            Sweets
          </NavLink>
        </li>
        <li>
          <NavLink to="/decorations" className={getNavLinkClass}>
            Decorations
          </NavLink>
        </li>
        <li>
          <NavLink to="/designer" className={getNavLinkClass}>
            Designer
          </NavLink>
        </li>
         <li>
          <NavLink to="/planning-tools" className={getNavLinkClass}>
            Planning Tools
          </NavLink>
        </li>
         <li>
          <NavLink to="/contact-us" className={getNavLinkClass}>
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

// export default Navigation;