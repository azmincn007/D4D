import React from 'react'
import card from '../../assets/mobilecard.png'
import '../../styles/Cards.css'
import { Link } from 'react-router-dom';
import cardlogo from '../../assets/mobilecardlogo.png'
import Homecards from '../Cards/Homecards';
import { Label, Radio } from 'flowbite-react';


function Mobileshop() {

    const contentcard=[{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{cardlogo:cardlogo,img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  return (
    <div className="mobileshop">
      
     

      <div className="contentsdiv px-8  border-t-2 border-[#232F3E]">
      <div className='flex justify-between py-2'>
        <div className="contentshead font-inter text-black font-semibold text-[20px] Mobile:text-[12px] py-2">
          Latest Lulu Hypermarket offers in UAE - Dubai
        </div>
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className=" nearby flex items-center gap-2">
              <Radio id="united-state" name="nearby" value="Nearby" />
              <Label htmlFor="Nearby">Nearby</Label>
            </div>
          </fieldset>
        </div>
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
