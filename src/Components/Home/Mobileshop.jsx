import React, { useState } from 'react'
import card from '../../assets/mobilecard.png'
import '../../styles/Cards.css'
import { Link } from 'react-router-dom';
import cardlogo from '../../assets/mobilecardlogo.png'
import Homecards from '../Cards/Homecards';
import { Label, Radio } from 'flowbite-react';
import { FiFilter } from "react-icons/fi";
import { FaFilter } from 'react-icons/fa';
import Filter from '../Mobile/Filter';


function Mobileshop() {
    const [FilterActive,SetFilterActive]=useState(false)
    const contentcard=[{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  return (
    <div className="mobileshop">
      
     

      <div className="contentsdiv px-8  border-t-2 border-[#232F3E]">
      {FilterActive && <Filter />}
      <div className='flex justify-between py-2 items-center'>
        <div className="contentshead font-inter text-black font-semibold text-[20px] Mobile:text-[12px] py-2">
          Latest Lulu Hypermarket offers in UAE - Dubai
        </div>
        <div className='flex items-center'>
        {!FilterActive ? (
              <div className="flex items-center mr-[2rem]" onClick={()=>SetFilterActive(!FilterActive)}>
                <FiFilter className="mr-[0.5rem] w-6 h-6" />
                <Label htmlFor="Nearby">Filter</Label>
              </div>
            ) : (
              <div className="flex items-center mr-[2rem]" onClick={()=>SetFilterActive(!FilterActive)}>
                <FaFilter  className="mr-[0.5rem] w-6 h-6 text-yellow" />
                <Label htmlFor="Nearby">Filter</Label>
              </div>
            )}

           
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className=" nearby flex items-center gap-2">
              <Radio id="united-state" name="nearby" value="Nearby"  className=' h-6 w-6'/>
              <Label htmlFor="Nearby">Nearby</Label>
            </div>
          </fieldset>
        </div>
        </div>
      </div>
      <div>
     
      </div>
        <div className="contentscards">
          <div className="cardcontainer ">
            {contentcard.map((obj, index) => (
              <Link key={index} to={'/mobilesingle'}  >
              <Homecards
              key={index}
              img={obj.img}
              logo={obj.cardlogo}

              title={obj.title}
              content={obj.content}
            />
            </Link>
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Mobileshop
