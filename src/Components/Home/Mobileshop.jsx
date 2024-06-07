import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Radio } from 'flowbite-react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import Filter from '../Mobile/Filter';
import Homecards from '../Cards/Homecards';
import cardlogo from '../../assets/mobilecardlogo.png';
import laptoplogo from '../../assets/mobilecardlogo.png';
import card from '../../assets/mobilecard.png';
import laptopcard from '../../assets/scx.png';
import '../../styles/Cards.css';

function Mobileshop({ selectedSubcategory }) {
  const [filterActive, setFilterActive] = useState(false);

  const mobileData = [
    { cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera.' },
    { cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor.' },
    { cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera.' },
    { cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor.' },
    { cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera.' },
    { cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor.' },
    { cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera.' },
    { cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor.' },
    { cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera.' },
    { cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor.' }
  ];

  const laptopData = [
    { cardlogo: laptoplogo, img: laptopcard, title: 'MacBook Pro', content: 'Apple\'s powerful laptop for professionals and creatives.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'Dell XPS 15', content: 'A sleek and powerful Windows laptop with a high-resolution display.' }
  ];

  const contentData = selectedSubcategory === 'Mobile' ? mobileData : laptopData;

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#232F3E]">
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
            {contentData.map((data, index) => (
              <Link key={index} to={'/mobilesingle'}>
                <Homecards
                  key={index}
                  img={data.img}
                  logo={data.cardlogo}
                  title={data.title}
                  content={data.content}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobileshop;
