import React, { useState } from 'react';
import Categories from './Categories';
import Contents from './Contents';

function Homecontainer() {
  const [selectedValue, setSelectedValue] = useState('Supermarket');

  const handleOptionClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className='homecontainer w-100 flex'>
      <div className="left w-[30%]" style={{ maxWidth: "330px" }}>
        <Categories
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className="right w-[80%]">
        {selectedValue === 'Supermarket' && <Contents />}
      </div>
    </div>
  );
}

export default Homecontainer;