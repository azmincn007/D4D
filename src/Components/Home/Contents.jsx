
import React from 'react'

import { Card } from "flowbite-react";
import card from '../../assets/card.png'
import Flowbitecard from '../../Themes/Flowbitecard';
import '../../styles/categories.css'




function Contents() {

    const contentcard=[{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  return (
   <div className="contentsdiv px-8 pb-3p">
<div className="contentshead font-inter text-black font-semibold text-[20px] Mobile:text-[12px]">Latest Lulu Hypermarket offers in UAE - Dubai</div>
<div className="contentscards">



    <div className="cardcontainer justify-center ">

    {contentcard.map((obj, index) => (
  <Card
    key={index} // Use index as key, or replace with unique ID if available
    theme={Flowbitecard}
    className="cardfl max-w-[220px] p-1"
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
  )
}

export default Contents
