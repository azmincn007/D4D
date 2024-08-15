import React, { useState } from 'react'
import { Dropdown } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import DualRangeSlider from '../Home/Components/MultirangeSlider';

function Filter({ onClose, onSortChange, onPriceRangeChange }) {
  const [sortOption, setSortOption] = useState("All");

  const handleSortChange = (option) => {
    setSortOption(option);
    onSortChange(option);
    onClose();
  };

  const handlePriceRangeChange = (min, max) => {
    onPriceRangeChange(min, max);
  };

  return (
    <div className="">
      <div className="font-inter my-6 filter mx-auto rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] py-2 px-3">
        <div className="sort flex items-center py-3">
          <div className='font-semibold text-18px'>Sort By:</div>
          <div className="sort-drop max-w-[350px] w-[50%] ml-2">
            <Dropdown label={sortOption} dismissOnClick={false}>
              <Dropdown.Item onClick={() => handleSortChange("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Price (Low to High)")}>Price (Low to High)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Price (High to Low)")}>Price (High to Low)</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="range flex justify-between mt-2 py-3 ">
          <div className='flex'>
            <div className='font-semibold text-18px'>Price Range:</div>
            <div className='ml-8 '>
              <DualRangeSlider onRangeChange={handlePriceRangeChange}/>
            </div>
          </div>
          <div className='right-6 bottom-6'>
            <IoMdClose className='w-[30px] h-[30px] text-[#6B6B6B] cursor-pointer' onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter