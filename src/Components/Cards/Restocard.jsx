import React from 'react';
import { Card } from 'flowbite-react';
import Flowbitecard from '../../Themes/Flowbitecard';
import RatingComponent from '../Restuarents/Rating';

const RestoCard = ({ img, title, rating,price }) => {
  return (
    <Card
      theme={Flowbitecard}
      className="  cardres relative max-w-[220px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px]"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={img}
    >
      <div className='cardcontentsres'> 
      <h5 className=" pt-2 text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter Mobile:text-[6px] TabS:text-[6px] ">
        {title}
      </h5>
      <RatingComponent rating={rating}/>
      <div className='absolute h-[50px] Mobile:h-[15px] w-[96%] bottom-[65px] Mobile:bottom-[50px] p-0 bg-[rgba(0,0,0,0.5)] flex items-center'><p className='text-white text-20px font-semibold  px-[5%] Mobile:text-[5px]' >{price}</p></div>

      </div>

     
      
    </Card>
  );
};

export default RestoCard;