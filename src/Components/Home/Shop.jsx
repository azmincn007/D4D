import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Radio } from 'flowbite-react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import Filter from '../Mobile/Filter';
import Homecards from '../Cards/Homecards';
import cardlogo from '../../assets/mobilecardlogo.png';
import '../../styles/Cards.css';

function Shop({ products,currencySymbol }) {
  const [filterActive, setFilterActive] = useState(false);
  


  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        {filterActive && <Filter />}
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Latest Compu Cell in UAE - Dubai
          </div>
          <div className='flex items-center'>
            <div className="flex items-center mr-[2rem]" onClick={() => setFilterActive(!filterActive)}>
              {filterActive ? (
                <FaFilter className="mr-[0.5rem] w-6 h-6 text-yellow" />
              ) : (
                <FiFilter className="mr-[0.5rem] w-6 h-6" />
              )}
              <Label htmlFor="filter" className="Mobile:text-xs" id='filter'>
                Filter
              </Label>
            </div>
            <div>
              <fieldset className="flex max-w-md flex-col gap-4">
                <div className="nearby flex items-center gap-2">
                  <Radio id="united-state" name="nearby" value="Nearby" className='h-6 w-6' />
                  <Label htmlFor="Nearby" className="Mobile:text-xs">Nearby</Label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="contentscards">
          <div className="cardcontainer">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <Link >
                  <Homecards
  product={product}
  currencySymbol={currencySymbol}

  isRestaurant={false}
/>
                </Link>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;