import React, { useState } from 'react';

function Categorytab() {
  const [activeTab, setActiveTab] = useState(0); // State to keep track of the active tab
  const caTabs = ['All offers', 'Eid Offers', 'Ramadan Offers', 'Sports', 'Vishu offers', 'Health& Clinic'];

  const handleTabClick = (index) => {
    setActiveTab(index);
    console.log('Active Tab:', index); // Log the active tab index
  };

  return (
    <div className='w-full bg-darkblue flex justify-center text-white py-2 text-small font-inter'>
      {caTabs.map((obj, index) => (
        <div
          key={index}
          className="singletabs py-2 px-7"
          style={{
            borderBottom: '2px solid rgba(241, 241, 241, 0.5)', 
            borderColor: activeTab === index ? 'white' : ' rgba(241, 241, 241, 0.5)' // Conditionally apply white border to active tab
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
