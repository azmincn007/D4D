import React from 'react';
import { Card } from 'flowbite-react';
import Flowbitecard from '../../Themes/Flowbitecard';

const RestoCard = ({ img, title, content }) => {
  return (
    <Card
      theme={Flowbitecard}
      className="max-w-[220px] p-1 shadow-none"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={img}
    >
      <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">
        {title}
      </h5>
      <p className="font-normal text-[10px] text-[#949494] dark:text-gray-400">
        {content}
      </p>
    </Card>
  );
};

export default RestoCard;