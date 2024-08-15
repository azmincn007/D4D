import React, { useState } from 'react';
import '../../styles/categories.css';
import Homecards from '../Cards/Homecards';
import SingleDishModalDetails from '../modal/SingleDishModaldetails';
import { Button } from 'flowbite-react';

function Restuarents({ menus, currencySymbol, isLoading }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [displayCount, setDisplayCount] = useState(12);

  const handleCardClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  return (
    <div className="contentsdiv w-[100%] px-8 pb-3p border-t-2 border-[#232F3E]">
      <div className='flex justify-between items-center py-2'>
        <div className="font-inter text-black font-semibold text-[20px] Mobile:text-[12px] py-2">
          Latest Atmosphere Restaurant offers in UAE - Dubai
        </div>
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className="nearby flex items-center gap-2">
            </div>
          </fieldset>
        </div>
      </div>
      <div className="contentscards-resto">
        <div className="cardcontainer-resto ">
          {isLoading
            ? Array(12).fill().map((_, index) => (
                <Homecards key={index} isLoading={true} isRestaurant={true} />
              ))
            : menus.slice(0, displayCount).map((menu, index) => (
                <div key={index} onClick={() => handleCardClick(menu)}>
                  <Homecards
                    product={menu}
                    currencySymbol={currencySymbol}
                    isRestaurant={true}
                    isLoading={false}
                  />
                </div>
              ))
          }
        </div>
      </div>
      {!isLoading && displayCount < menus.length && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
      {selectedMenu && (
        <SingleDishModalDetails
          menu={selectedMenu}
          currencySymbol={currencySymbol}
          onClose={() => setSelectedMenu(null)}
        />
      )}
    </div>
  );
}

export default Restuarents;