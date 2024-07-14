import React, { useContext, useState, useEffect } from 'react';
import Categories from './Categories';
import Contents from './Contents';
import Mobileshop from './Mobileshop';
import Restuarents from './Restaurents';
import Categorydropdown from './Components/CategoryDropdown';
import '../../styles/DropdownStyle.css';
import { SelectionContext, ToggleContext } from '../../App';

function Homecontainer({menus}) {
  const [selectedValue, setSelectedValue]=useContext(SelectionContext)
  const [ActiveToggle, setActiveToggle] = useContext(ToggleContext);
  const [selectedSubcategory, setSelectedSubcategory] = useState('Mobile');

 

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    if (value !== 'Restaurant' && ActiveToggle === 'Offer') {
      setActiveToggle('Product');
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (ActiveToggle === 'Offer') {
      setActiveToggle('Product');
    }
  };


  useEffect(() => {
    if (selectedValue === 'Restaurant' && ActiveToggle === 'Product') {
      setActiveToggle('Offer');
    }
  }, [selectedValue, ActiveToggle, setActiveToggle]);

  return (
    <div className="homecontainer w-100 flex Tab:flex-col">
      <div className="dropdowncontents hidden Tab:block py-4 w-[95%] mx-auto">
        {selectedValue !== 'Restaurant' && (
          <Categorydropdown
            selectedValue={selectedValue}
            onOptionClick={handleOptionClick}
            showInNavbar={true}
          />
        )}
      </div>
      <div
        className="left Tab:hidden"
        style={{
          minWidth: '280px',
          maxWidth: '330px',
        }}
      >
      
          <Categories
            selectedValue={selectedValue}
            onOptionClick={handleOptionClick}
            onSubcategoryClick={handleSubcategoryClick}
          />
      
      </div>
      <div className="right w-[100%] min-w-24  Tab:w-[100%] pb-16">
        {selectedValue === 'Shops' && ActiveToggle === 'Offer' && <Contents />}
        {selectedValue === 'Shops' && ActiveToggle === 'Product' && (
          <Mobileshop selectedSubcategory={selectedSubcategory} />
        )}
        {selectedValue === 'Restaurant' && ActiveToggle === 'Offer' && (
          <>
         
            
            <Restuarents menus={menus}/>
          </>
        )}
      </div>
    </div>
  );
}

export default Homecontainer;