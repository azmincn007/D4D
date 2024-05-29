
import React from 'react'

import { Card, Dropdown, Tabs } from "flowbite-react";
import card from '../../assets/mobilecard.png'
import Flowbitecard from '../../Themes/Flowbitecard';
import '../../styles/categories.css'
import MobileTab from '../../Themes/FlowbiteTab';
import { ImBin } from "react-icons/im";
import DualRangeSlider from '../Home/Components/MultirangeSlider';
import Shopswiper from '../Home/Shopswiper';




function MobileFilter() {

    const contentcard=[{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  return (
    <div className="mobileshop">
       <div className=" font-inter my-6 filter w-[95%] mx-auto  rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] py-2 px-3">
        <div className="  flex items-center py-1">
          <div className='font-semibold text-18px'>Suggestion:</div>
          <div className='flex ml-2'>
            <Tabs
              theme={MobileTab}
              aria-label="Pills"
              style="pills"
              className="tabmob "
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
          <div className='flex'>   <div className='font-semibold text-18px'>Range Slider:</div>
          <div className='ml-8 '><DualRangeSlider/></div></div>
          <div className=' right-6 bottom-6'><ImBin className='text-[#6B6B6B]'/></div>
          </div>
         
      </div>



      <div className="shopswipermobile">

        <Shopswiper/>
      </div>
     

      <div className="contentsdiv px-8 py-2">
        <div className="contentshead font-inter text-black font-semibold text-[20px]">
          Latest Lulu Hypermarket offers in UAE - Dubai
        </div>
        <div className="contentscards">
          <div className="cardcontainer ">
            {contentcard.map((obj, index) => (
              <Card
                key={index} // Use index as key, or replace with unique ID if available
                theme={Flowbitecard}
                className=" cardfl max-w-[220px] p-1"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={obj.img}
              >
                <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">
                  {obj.title}
                </h5>
                <p className="font-normal text-[10px] text-[#949494] dark:text-gray-400">
                  {obj.content}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileFilter
