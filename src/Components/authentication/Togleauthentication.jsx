import React, { useState } from 'react';
import '../../styles/nav.css'; // Ensure your CSS is correctly referenced

function LoginTab() {
  const [activeTabAuth, setActiveTabAuth] = useState('user'); // State to track active tab

  const handleTabClick = (tabName) => {
    setActiveTabAuth(tabName);
  };

  return (
    <div className="toggleButton  text-black text-xsm font-semibold font-inter ">
      <button
        className={activeTabAuth === 'user' ? 'activeButtonauth' : 'inactiveButtonauth'}
        onClick={() => handleTabClick('user')}
      >
        User
      </button>
      <button
        className={activeTabAuth === 'organiser' ? 'activeButtonauth' : 'inactiveButtonauth'}
        onClick={() => handleTabClick('organiser')}
      >
        Organiser
      </button>
    </div>
  );
}

export default LoginTab;
