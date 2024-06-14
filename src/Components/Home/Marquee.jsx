import React from 'react';
import '../../styles/marquee.css'
import { GiFlowerStar } from "react-icons/gi";

const MarqueeComponent = () => {
  const marqueeText = 'If you are a logined user, you can participate our Grand-Dhamakha Context ';

  return (
    
       
        
  <div class="containers font-inter">
    <div class="scroll py-[6px]">
      <div class="RightToLeft text-[14px]">
      <span className='marquee-text flex items-center'>
          <GiFlowerStar className='mr-4 text-yellow' />
          {marqueeText}
          <GiFlowerStar className='ml-4 text-yellow' />
        </span> <span className='marquee-text flex items-center'>
          <GiFlowerStar className='mr-4 text-yellow' />
          {marqueeText}
          <GiFlowerStar className='ml-4 text-yellow' />
        </span>
        <span className='marquee-text flex items-center'>
          <GiFlowerStar className='mr-4 text-yellow' />
          {marqueeText}
          <GiFlowerStar className='ml-4 text-yellow' />
        </span>
        <span className='marquee-text flex items-center'>
          <GiFlowerStar className='mr-4 text-yellow' />
          {marqueeText}
          <GiFlowerStar className='ml-4 text-yellow' />
        </span>
        <span className='marquee-text flex items-center'>
          <GiFlowerStar className='mr-4 text-yellow' />
          {marqueeText}
          <GiFlowerStar className='ml-4 text-yellow' />
        </span>
      </div>
     
    </div>
  </div>
  );
};

export default MarqueeComponent;