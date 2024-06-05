
import React from 'react'

import { Card, Dropdown, Tabs } from "flowbite-react";
import card from '../../assets/mobilecard.png'
import Flowbitecard from '../../Themes/Flowbitecard';
import '../../styles/categories.css'
import MobileTab from '../../Themes/FlowbiteTab';
import { ImBin } from "react-icons/im";
import DualRangeSlider from '../Home/Components/MultirangeSlider';
import Shopswiper from '../Home/Shopswiper';




function Filter() {

    const contentcard=[{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  return (
    <div className="">
       <div className=" font-inter my-6 filter  mx-auto  rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] py-2 px-3">
        <div className="  flex items-center py-1 Mobile:items-start ">
          <div className='font-semibold text-18px'>Suggestion:</div>
          <div className='flex ml-2'>
            <Tabs
              theme={MobileTab}
              aria-label="Pills"
              style="pills"
              className="tabmob  Mobile:flex-wrap Mobile:gap-1 Mobile:max-h-16"
            >
              <Tabs.Item active title="asd"></Tabs.Item>
              <Tabs.Item  className="text-[13px.tab]" title="rice"></Tabs.Item>
              <Tabs.Item title="derssasd"></Tabs.Item>
              <Tabs.Item title="asdsad"></Tabs.Item>
            </Tabs>
          </div>
        </div>

        <div className="sort flex items-center py-3">
          <div className='font-semibold text-18px'>Sort By:</div>
          <div className="sort-drop max-w-[350px] w-[50%] ml-2">
            <Dropdown label="--Sort by--" dismissOnClick={false}>
              <Dropdown.Item>All</Dropdown.Item>
              <Dropdown.Item>Price (Low to High)</Dropdown.Item>
              <Dropdown.Item>Price (High to Low)</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="range flex justify-between mt-2 py-3 ">
          <div className='flex'>   <div className='font-semibold text-18px'>Price Range:</div>
          <div className='ml-8 '><DualRangeSlider/></div></div>
          <div className=' right-6 bottom-6'><ImBin className='text-[#6B6B6B]'/></div>
          </div>
         
      </div>



     
     

     
     
    
    </div>
  );
}

export default Filter
