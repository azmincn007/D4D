import React, { useState } from 'react';

function Categorytab() {
  const [activeTab, setActiveTab] = useState(0); // State to keep track of the active tab
  const caTabs = ['All offers', 'Eid Offers', 'Ramadan Offers', 'Sports', 'Vishu offers', 'Health& Clinic'];

  const handleTabClick = (index) => {
    setActiveTab(index);
    console.log('Active Tab:', index); // Log the active tab index
  };

  return (
    <div className='w-full bg-darkblue flex justify-center text-white py-2  Mobile:text-[8px] Tab:text-xs text-small font-inter'>
      {caTabs.map((obj, index) => (
        <div
          key={index}
          className="singletabs py-2 px-7  Tab:px-2"
          style={{
            borderBottom: '2px solid rgba(241, 241, 241, 0.5)',
            borderColor: activeTab === index ? 'white' : '#F1F1F1A0', // Conditionally apply white border to active tab and red to non-active tabs
            color: activeTab === index ? 'white' : '#F1F1F1A0', // Set text color to white for active tab and red for non-active tabs
          }}
          onClick={() => handleTabClick(index)} // Set the active tab on click
        >
          {obj}
        </div>
      ))}
    </div>
  );
}

export default Categorytab;