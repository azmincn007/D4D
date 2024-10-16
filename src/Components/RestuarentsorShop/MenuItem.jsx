import React from 'react';
import './Menuitem.css'

const MenuItemList = ({ menuCategory ,title}) => {
  return (
    <div className=" mx-auto text-white">
      <p className='font-semibold  text-[26px]'>{title}</p>
      <div className='grid grid-cols-2 md:grid-cols-2 gap-2'>
        
        {menuCategory.map((item, index) => (
          <div key={index} className='menu-item flex  items-center p-4  '>
            <img className='w-[150px] h-[150px] mb-2 menuitemimg  ' src={item.image} alt={item.Name} />
            <p className="text-lg px-2 font-medium menuitemtxt">{item.menu_eng}</p>
            <div className='w-full menuitemline min-w-[50px] border-t border-white my-2'></div>
            <p className="text-[22px] font-semibold text-black-700 ml-2 menuitemprice"> ${item.offer_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemList;
