import React, { useState, useEffect } from "react";
import './Loading.css';
import logo from '../../assets/logo/laaagi.png';
 // Assuming you have some styles for the loader


// export ko upar rakhne ka sahi syntax

 export const Loader = () => {
  return (
//  <div className="loader-container">
//       <div className="sweet-loader">
//         <div></div><div></div><div></div><div></div>
//       </div>
//     </div>
  <div className="loader-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Sweet Logo" className="logo" />
        <div className="circle-loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

