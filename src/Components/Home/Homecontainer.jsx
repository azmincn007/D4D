import React, { useState } from 'react';
import Categories from './Categories';
import Contents from './Contents';
import Mobileshop from './Mobileshop';
import Restuarents from './Restaurents';

function Homecontainer() {
  const [selectedValue, setSelectedValue] = useState('Supermarket');
  console.log(selectedValue);
  const handleOptionClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className='homecontainer w-100 flex'>
      <div className="left " style={{ maxWidth: "330px" }}>
        <Categories
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className="right w-[80%] Tab:w-[100%]">
        {selectedValue === 'Supermarket' && <Contents />} 
        {selectedValue === 'MobileShop' && <Mobileshop/>}
        {selectedValue === 'Restaurant' && <Restuarents/>}

      </div>
    </div>
  );
}

export default Homecontainer;