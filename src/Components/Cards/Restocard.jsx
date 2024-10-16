import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Flowbitecard from '../../Themes/Flowbitecard';
import { NonVegetarianIcon, VegetarianIcon } from './components/Typecomponent';
import { ShimmerCardResto } from "./Shimmer/Shimmer";
import SingleDishModalDetails from '../modal/SingleDishModaldetails';

const RestoCard = ({
  id,
  img,
  title,
  normal_price,
  offer_price,
  type,
  className,
  isLoading,
  desc,
  category,
  showVegIcon = true,
  isShop = false // New prop to determine if it's a shop item
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedCurrencySymbol = localStorage.getItem('currencySymbol');

  if (isLoading) {
    return <ShimmerCardResto />;
  }

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const handleCardClick = () => {
    if (!isShop) {
      setIsModalOpen(true);
    }
  };

  const cardContent = (
    <div className='cardcontentsres text-white'>
      <div className='flex justify-between items-center mt-1 mb-1 px-2'>
        <h5 className='text-[18px] truncate w-3/4' title={title}>
          {truncateText(title, 3)}
        </h5>
        {showVegIcon && (type === 'Non-Veg' ? <NonVegetarianIcon /> : <VegetarianIcon />)}
      </div>
      <div className='flex justify-between items-center px-2'>
        <h5 className='text-[18px]'>{storedCurrencySymbol}{offer_price}</h5>
        <div className="relative">
          <div className="absolute w-full h-[2px] bg-[#FF0000] top-1/2 transform -rotate-12"></div>
          <div className="absolute w-full h-[2px] bg-[#FF0000] top-1/2 transform rotate-12"></div>
          <p className="text-white text-[16px] font-semibold">{storedCurrencySymbol}{normal_price}</p>
        </div>
      </div>
    </div>
  );

  const cardElement = (
    <Card
      theme={Flowbitecard}
      className={`bg-black relative w-[240px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px] ${className}`}
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={img}
      onClick={handleCardClick}
    >
      {cardContent}
    </Card>
  );

  return (
    <>
      {isShop ? (
        <Link to={`/Shop-page/${id}`}>
          {cardElement}
        </Link>
      ) : (
        cardElement
      )}
      {isModalOpen && !isShop && (
        <SingleDishModalDetails
          menu={{
            image: img,
            normal_price,
            offer_price,
            menu_eng: title,
            type,
            desc,
            category
          }}
          onClose={() => setIsModalOpen(false)}
          currencySymbol={storedCurrencySymbol}
          isFromRestoCard={true}
        />
      )}
    </>
  );
};

export default RestoCard;