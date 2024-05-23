import React, { useState } from 'react'
import '../../styles/nav.css'

function Toggle() {

    const [activeTab, setActiveTab] = useState('Product'); // State to track active tab

    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };
  return (
    <div className="toggleButton text-small">
    <button
      className={activeTab === 'Product' ? 'activeButton' : 'inactiveButton'}
      onClick={() => handleTabClick('Product')}
    >
      Product
    </button>
    <button
      className={activeTab === 'Offer' ? 'activeButton' : 'inactiveButton'}
      onClick={() => handleTabClick('Offer')}
    >
      Offer
    </button>
  </div>
  )
}

export default Toggle
