import React from 'react';
import { Rating, RatingStar } from 'flowbite-react';

const RatingComponent = ({ rating }) => {
  return (
    <Rating>
      {Array.from({ length: 5 }, (_, i) => (
        <RatingStar
          key={i}
          color={i < rating ? '#FFD814' : 'white'}
          filled={i < rating}
        />
      ))}
      <p className="ml-2 text-[16px] font-medium text-yellow dark:text-gray-400">
      ({rating})
      </p>
    </Rating>
  );
};

export default RatingComponent;