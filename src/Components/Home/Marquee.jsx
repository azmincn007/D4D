import React from 'react';
import '../../styles/marquee.css'
import { GiFlowerStar } from "react-icons/gi";

const MarqueeComponent = () => {
  const marqueeText = 'If you are a logined user, you can participate our Grand-Dhamakha Context';

  return (
    <div className="marquee-container font-inter py-2">
      <div className="marquee">
        <span className='flex items-center'> <GiFlowerStar className= 'mr-4 text-yellow'/>{marqueeText} <GiFlowerStar className=' ml-4 text-yellow'/></span>
      </div>
    </div>
  );
};

export default MarqueeComponent;