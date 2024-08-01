import React from 'react';
import { Card } from 'flowbite-react';
import Flowbitecard from '../../Themes/Flowbitecard';
import { NonVegetarianIcon, VegetarianIcon } from './components/Typecomponent';

const RestoCard = ({ img, title, normal_price, offer_price, type }) => {
  return (
    <Card
      theme={Flowbitecard}
      className="cardres bg-black relative w-[240px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px]"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={img}
    >
      <div className='cardcontentsres text-white'> 
        <div className='flex justify-between items-center mb-2'>
          <h5 className='text-[18px]'>{title}</h5>
          {type === 'Non-Veg' ? <NonVegetarianIcon /> : <VegetarianIcon />}
        </div>
        <div className='flex justify-between items-center'>
          <h5 className='text-[18px]'>{offer_price}</h5>
          <h5 className='text-[18px]'>{normal_price}</h5>
        </div>
      </div>
    </Card>
  );
};

export default RestoCard;