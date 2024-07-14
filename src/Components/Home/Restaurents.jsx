import React from 'react'
import '../../styles/categories.css'
import Homecards from '../Cards/Homecards';
import { Radio } from 'flowbite-react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://hezqa.com';

function Restuarents({menus}) {
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
            <Link key={index} to="/mobilesingle" state={{ source: "restaurant" }}>
              <Homecards
                key={index}
                img={`${BASE_URL}${obj.image}`}
                logo={`${BASE_URL}${obj.logo}`}
                title={obj.menu_eng}
                content={obj.desc}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restuarents