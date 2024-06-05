import React, { useState } from 'react';
import card from '../../assets/mobilecard.png';
import laptopcard from '../../assets/scx.png';
import '../../styles/Cards.css';
import { Link } from 'react-router-dom';
import cardlogo from '../../assets/mobilecardlogo.png';
import laptoplogo from '../../assets/mobilecardlogo.png';
import Homecards from '../Cards/Homecards';
import { Label, Radio } from 'flowbite-react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import Filter from '../Mobile/Filter';

function Mobileshop({ selectedSubcategory }) {
  const [FilterActive, SetFilterActive] = useState(false);

  const mobileData = [
    { cardlogo: cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera .' },
    { cardlogo: cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor .' }
    ,
    { cardlogo: cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera .' },
    { cardlogo: cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor .' },
    { cardlogo: cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera .' },
    { cardlogo: cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor .' },
    { cardlogo: cardlogo, img: card, title: 'iPhone 12', content: 'The latest iPhone with 5G support and advanced camera .' },
    { cardlogo: cardlogo, img: card, title: 'Samsung Galaxy S21', content: 'Samsung\'s flagship phone with a powerful processor .' },
    // ... (add more mobile data)
  ];

  const laptopData = [
        { cardlogo: laptoplogo, img: laptopcard, title: 'MacBook Pro', content: 'Apple\'s powerful laptop for professionals and creatives.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'Dell XPS 15', content: 'A sleek and powerful Windows laptop with a high-resolution display.' },
        { cardlogo: laptoplogo, img: laptopcard, title: 'MacBook Pro', content: 'Apple\'s powerful laptop for professionals and creatives.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'Dell XPS 15', content: 'A sleek and powerful Windows laptop with a high-resolution display.' },
        { cardlogo: laptoplogo, img: laptopcard, title: 'MacBook Pro', content: 'Apple\'s powerful laptop for professionals and creatives.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'Dell XPS 15', content: 'A sleek and powerful Windows laptop with a high-resolution display.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'MacBook Pro', content: 'Apple\'s powerful laptop for professionals and creatives.' },
    { cardlogo: laptoplogo, img: laptopcard, title: 'Dell XPS 15', content: 'A sleek and powerful Windows laptop with a high-resolution display.' },
    // ... (add more laptop data)
  ];

  const contentcard = selectedSubcategory === 'Mobile' ? mobileData : laptopData;

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8  border-t-2 border-[#232F3E]">
        {FilterActive && <Filter />}
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold  py-2">
          Latest Compu Cell in UAE - Dubai
          </div>
          <div className='flex items-center'>
            {!FilterActive ? (
              <div className="flex items-center mr-[2rem]" onClick={() => SetFilterActive(!FilterActive)}>
                <FiFilter className="mr-[0.5rem] w-6 h-6" />
                <Label htmlFor="Nearby" className="Mobile:text-xs">Filter</Label>
              </div>
            ) : (
              <div className="flex items-center mr-[2rem]" onClick={() => SetFilterActive(!FilterActive)}>
                <FaFilter className="mr-[0.5rem] w-6 h-6 text-yellow" />
                <Label htmlFor="Nearby" className="Mobile:text-xs">Filter</Label>
              </div>
            )}
            <div>
              <fieldset className="flex max-w-md flex-col gap-4">
                <div className=" nearby flex items-center gap-2">
                  <Radio id="united-state" name="nearby" value="Nearby" className=' h-6 w-6' />
                  <Label htmlFor="Nearby " className="Mobile:text-xs">Nearby</Label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="contentscards">
          <div className="cardcontainer ">
            {contentcard.map((obj, index) => (
              <Link key={index} to={'/mobilesingle'}>
                <Homecards
                  key={index}
                  img={obj.img}
                  logo={obj.cardlogo}
                  title={obj.title}
                  content={obj.content}
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