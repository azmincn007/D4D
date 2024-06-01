import React, { useContext, useState } from 'react';
import Categories from './Categories';
import Contents from './Contents';
import Mobileshop from './Mobileshop';
import Restuarents from './Restaurents';
import Categorydropdown from './Components/CategoryDropdown';
import '../../styles/DropdownStyle.css';
import { ToggleContext } from '../../App';
import MobileFilter from '../Mobile/Filter';

function Homecontainer() {
  const [selectedValue, setSelectedValue] = useState('Supermarket');
  const [ActiveToggle, setActiveToggle] = useContext(ToggleContext);
  console.log(ActiveToggle);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
  };

  const shouldShowLeftColumn =
    !(selectedValue === 'Restaurant' && ActiveToggle === 'Offer');

  const isRestaurantAndOffer = selectedValue === 'Restaurant' && ActiveToggle === 'Offer';
  const isMobileShopAndOffer = selectedValue === 'MobileShop' && ActiveToggle === 'Offer';

  return (
    <div className="homecontainer w-100 flex Tab:flex-col">
      <div className="dropdowncontents hidden Tab:block py-4 w-[95%] mx-auto">
        {!isRestaurantAndOffer && (
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
          maxWidth:'330px',
          display: shouldShowLeftColumn ? 'block' : 'none',
        }}
      >
        {shouldShowLeftColumn && (
          <Categories
            selectedValue={selectedValue}
            onOptionClick={handleOptionClick}
          />
        )}
      </div>
      <div
        className="right min-w-24  Tab:w-[100%]"
       
      >
        {selectedValue === 'Supermarket' && ActiveToggle === 'Offer' && <Contents />}
        {selectedValue === 'MobileShop' && ActiveToggle === 'Product' && <Mobileshop />}
        {(selectedValue === 'MobileShop' || selectedValue === 'Supermarket') &&
          ActiveToggle === 'Offer' && <MobileFilter />}
        {isRestaurantAndOffer && (
          <>
            <Categorydropdown
              selectedValue={selectedValue}
              onOptionClick={handleOptionClick}
              showInNavbar={false}
            />
            <Restuarents />
          </>
        )}
      </div>
    </div>
  );
}

export default Homecontainer;