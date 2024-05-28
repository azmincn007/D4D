import React, { useState } from 'react';
import Categories from './Categories';
import Contents from './Contents';
import Mobileshop from './Mobileshop';
import Restuarents from './Restaurents';
import Categorydropdown from './Components/CategoryDropdown';
import '../../styles/DropdownStyle.css'

function Homecontainer() {
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
      <div className='left Tab:hidden' style={{ maxWidth: '330px' }}>
        <Categories
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className='right w-[80%] Tab:w-[100%]'>
        {selectedValue === 'Supermarket' && <Contents />}
        {selectedValue === 'MobileShop' && <Mobileshop />}
        {selectedValue === 'Restaurant' && <Restuarents />}
      </div>
    </div>
  );
}

export default Homecontainer;