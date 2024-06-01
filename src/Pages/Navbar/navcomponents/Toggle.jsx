import React, { useState, useEffect, useContext } from 'react';
import '../../../styles/nav.css';
import { ToggleContext } from '../../../App';

function Toggle() {
  const [ActiveToggle, setActiveToggle] = useContext(ToggleContext); // State variable to store the value of the active tab

  const tabs = [
    {
      title: 'Product',
      value: 'Product',
    },
    {
      title: 'Offer',
      value: 'Offer',
    },
  ];

  useEffect(() => {
    console.log(ActiveToggle); // Log the value of the active tab
  }, [ActiveToggle]);

  const handleTabClick = (value) => {
    setActiveToggle(value); // Update the value of the active tab
  };

  return (
    <div className='toggle'>
      <div className='custom-tabs'>
        <div className='tab-titles'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-title ${ActiveToggle === tab.value ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.value)}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Toggle;
