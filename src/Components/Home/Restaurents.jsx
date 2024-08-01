import React, { useState } from 'react'
import '../../styles/categories.css'
import Homecards from '../Cards/Homecards'
import { Radio } from 'flowbite-react'
import SingleDishModalDetails from '../modal/SingleDishModaldetails'

const BASE_URL = 'https://hezqa.com'

function Restuarents({menus,currencySymbol}) {
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
          {menus.map((obj, index) => (
            <div key={index} onClick={() => handleCardClick(obj)}>
              <Homecards
                img={`${BASE_URL}${obj.image}`}
                logo={`${BASE_URL}${obj.logo}`}
                title={obj.menu_eng}
                content={obj.desc}
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