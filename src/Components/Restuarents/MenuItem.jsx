import React from 'react';

const MenuItemList = ({ data ,title}) => {
  return (
    <div className="container mx-auto">
      <p className='font-semibold py-4 text-[26px]'>{title}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        
        {data.map((item, index) => (
          <div key={index} className='menu-item flex  items-center p-4  '>
            <img className='w-[150px] h-[150px] mb-2' src={item.Img} alt={item.Name} />
            <p className="text-lg px-2 font-medium">{item.Name}</p>
            <div className='w-full max-w-[220px] min-w-[50px] border-t border-gray-300 my-2'></div>
            <p className="text-[22px] font-semibold text-gray-700"> ${item.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemList;
