import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Flowbitecard from '../../../../Themes/Flowbitecard';
import { RiDeleteBin6Fill } from "react-icons/ri";

const MenuCardsAdmin = ({ foodItems }) => {
  return (
    <div className="cardrestoadmin">
      {foodItems.map((item, index) => (
        <CardWithEyeIcon
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

const CardWithEyeIcon = ({ item }) => {
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const [cardOpacity, setCardOpacity] = useState(1);

  const handleEyeIconClick = () => {
    setIsEyeOpen(!isEyeOpen);
    setCardOpacity(isEyeOpen ? 0.5 : 1);
  };

  return (
    <div style={{ opacity: cardOpacity }}>
      <Card
        theme={Flowbitecard}
        className={`cardres relative max-w-[220px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px] transition-opacity duration-300`}
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={item.img}
      >
        <div className="cardcontentsres">
          <div className="flex justify-between items-center px-4">
            <h5 className="text-[13px] py-4 font-bold tracking-tight text-gray-900 dark:text-white font-inter Mobile:text-[6px] TabS:text-[6px]">
              {item.title}
            </h5>
            <div className='flex gap-2'><div className="bg-yellow rounded-full">
              <RiDeleteBin6Fill className="text-black h-[20px] w-[20px] m-1" />
            </div>
            <div className="bg-yellow rounded-full">
              <MdEdit className="text-black h-[20px] w-[20px] m-1" />
            </div></div>
          </div>
          <div className="absolute top-2 right-2 bg-yellow rounded-full cursor-pointer">
            {isEyeOpen ? (
              <FaEye className="text-black h-[20px] w-[20px] m-1" onClick={handleEyeIconClick} />
            ) : (
              <FaEyeSlash className="text-black h-[20px] w-[20px] m-1" onClick={handleEyeIconClick} />
            )}
          </div>
          <div className="absolute h-[50px] Mobile:h-[15px] w-[96%] bottom-[65px] Mobile:bottom-[50px] p-0 bg-[rgba(0,0,0,0.5)] flex items-center">
            <p className="text-white text-20px font-semibold px-[5%] Mobile:text-[5px]">
              {item.price}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MenuCardsAdmin;