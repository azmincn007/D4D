// Card.jsx
import React from 'react';
import { IoCheckmark } from "react-icons/io5";
import '../Pages/Restuarent/Baselayout.css'

const SubsCard = ({ title, price, color,image }) => {
  return (


    <div className="cardssingle font-inter px-4  relative" >


        <div><p className='text-[#696969] font-semibold text-[12px] pt-4 text-left'>MOST POPULAR</p></div>
        <div><p className='text-[16px] font-semibold text-left'>{title}</p></div>
        <div>
            <ul>
            <li className='flex items-center'><IoCheckmark className='text-[#37CC79]'/> <p >Unlock all features</p></li>
            <li className='flex items-center'><IoCheckmark className='text-[#37CC79]'/> <p >24/7 Support</p></li>
            <li className='flex items-center'><IoCheckmark className='text-[#37CC79]'/> <p >Cancel anytime you want</p></li>

            </ul>
        </div>

            <div className='w-[100%]'>
            <button className={color}>Buy Now</button>

            </div>
            <div className='absolute right-0 top-[-9%]' >
                <img className='w-[70px] h-[56px] relative' src={image} alt="" />
            </div>

    </div>
  );
};

export default SubsCard;