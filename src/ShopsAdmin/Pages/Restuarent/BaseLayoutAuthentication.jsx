import React from 'react';
import adminlogo from '../../Assets/logoadmin.png';
import frame from '../../Assets/Frame.png';
import './Baselayout.css'; // Ensure the CSS file name matches

const BaseLayoutAuthentication = ({ children, redVector, yellowVector, redYellowVector }) => {
  return (
    <div className="base-layout-authentication bg-adminbg w-full  relative h-[100%] overflow-hidden">
      <header className="base-header">
        <img className="w-[200px] h-[200px] Tab:w-[150px] Tab:h-[150px]" src={adminlogo} alt="Admin Logo" />
      </header>
      <main className="base-content z-10">
        <div className="background-image"></div>
        <div className="content-area flex justify-center items-center">
          {children}
        </div>
      </main>
      <img src={frame} alt="Frame" className="frame-image" />
      {redVector && <div className={`absolute ${redVector}`}></div>}
      {yellowVector && <div className={`absolute ${yellowVector}`}></div>}
      {redYellowVector && <div className={`absolute ${redYellowVector}`}></div>}
    </div>
  );
};

export default BaseLayoutAuthentication;
