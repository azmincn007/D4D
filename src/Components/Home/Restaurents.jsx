import React, { useState } from 'react'
import '../../styles/categories.css'
import Homecards from '../Cards/Homecards'
import SingleDishModalDetails from '../modal/SingleDishModaldetails'


function Restuarents({menus, currencySymbol}) {
  const [selectedMenu, setSelectedMenu] = useState(null)
  
  const handleCardClick = (menu) => {
    setSelectedMenu(menu)
  }

  return (
    <div className="contentsdiv w-[100%] px-8 pb-3p border-t-2 border-[#232F3E]">
      <div className='flex justify-between items-center py-2'>
        <div className="font-inter text-black font-semibold text-[20px] Mobile:text-[12px] py-2">
          Latest Atmosphere Restaurant offers in UAE - Dubai
        </div>
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className="nearby flex items-center gap-2">
            </div>
          </fieldset>
        </div>
      </div>
      <div className="contentscards-resto">
        <div className="cardcontainer-resto ">
          {menus.map((menu, index) => (
            <div key={index} onClick={() => handleCardClick(menu)}>
             <Homecards
  product={menu}

  currencySymbol={currencySymbol}
  isRestaurant={true}
/>
            </div>
          ))}
        </div>
      </div>
      {selectedMenu && (
        <SingleDishModalDetails 
          menu={selectedMenu}
          currencySymbol={currencySymbol}
          onClose={() => setSelectedMenu(null)}
        />
      )}
    </div>
  )
}

export default Restuarents