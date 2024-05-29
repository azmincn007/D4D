import React, { useState } from 'react';

import '../../styles/DropdownStyle.css'
import MobileFilter from './Filter';
import Categories from '../Home/Categories';
import Categorydropdown from '../Home/Components/CategoryDropdown';

function MobilefilterContainer() {
  const [selectedValue, setSelectedValue] = useState('Supermarket');

  const handleOptionClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className='homecontainer w-100 flex Tab:flex-col'>
      <div className='dropdowncontents hidden Tab:block py-4 w-[95%] mx-auto'>
        <Categorydropdown
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
          showInNavbar={true}
        />
      </div>
      <div className='left Tab:hidden w-[30%]' style={{ minWidth: '300px' }}>
        <Categories
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className='right w-[70%] Tab:w-[100%]'>
        <MobileFilter/>
      </div>
    </div>
  );
}

export default MobilefilterContainer;