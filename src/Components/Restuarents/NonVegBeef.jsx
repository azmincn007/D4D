import React from 'react';
import Beef1 from '../../assets/Resto/Beef1.png'
import Beef2 from '../../assets/Resto/Beef2.png'
import Beef3 from '../../assets/Resto/Beef3.png'
import Beef4 from '../../assets/Resto/Beef4.png'


function NonVegBeef() {
  const NonVegBeefData = [
    { Name: '', Img: Beef1, Price: '3.50' },
    { Name: 'Plain rice', Img: Beef2, Price: '3.50' },
    { Name: 'Plain rice', Img: Beef3, Price: '3.50' },
    { Name: 'Plain rice', Img: Beef4, Price: '3.50' }
  ];

  return (
    <div className="container mx-auto">
      <p className="text-xl font-bold mb-4">Rice</p>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
        {NonVegBeefData.map((obj, index) => (
          <div key={index} className='rice-item flex items-center p-4   font-inter'>
            <img className='w-[150px] h-[150px] mb-2' src={obj.Img} alt={obj.Name} />
            <p className="text-[22px] font-medium mx-2 ">{obj.Name}</p>
            <div className='w-full h-[2px] max-w-[200px] bg-black mx-2 '></div>
            <p className="text-md text-gray-700 font-semibold text-[22px]"> {obj.Price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonVegBeef;
