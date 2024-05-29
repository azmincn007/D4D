import React from 'react';
import { NavbarComponent } from '../Navbar';
import single from '../../assets/singlemobile.png';
import logomob from '../../assets/logomob.png';
import Homecards from '../Cards/Homecards';
import card from '../../assets/mobs.png'

function Mobilessingle() {
  const contentcard=[{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]

  const mobileData = [
    {
      imgSrc: single,
      title: 'Samsung Z Flip 5',
      price: 'AED 2499',
      title2: 'COMPU CELL MOBILES',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      branches: ['Butina - Sharjah', 'Qusais', 'Jebel Ali'],
      logoSrc: logomob,
    },
    // Add more objects for additional mobile phones if needed
  ];


  return (
    <div className='mobilessingle'>
      <NavbarComponent />
      <div className='py-3 px-5'>
      {mobileData.map((mobile, index) => (
        <div key={index} className="singlecarddetails flex bg-[#F1F1F1] py-4 px-4 rounded-[20px] font-inter">
          <div className="leftsingle">
            <div>
              <img src={mobile.imgSrc} alt="" className='max-w-[325px]' />
            </div>
            <div className='flex justify-between py-2 items-center'>
              <div className='text-[18px]'>{mobile.title}</div>
              <div className='bg-yellow rounded-[100px] px-4 py-2'>{mobile.price}</div>
            </div>
          </div>
          <div className="rightsingle px-2">
            <div className="righthead">
              <div className='flex items-center'>
                <img src={mobile.logoSrc} alt="" className='max-w-[48px]' />
                <div className='text-[22px] font-semibold px-3 py'>{mobile.title2}</div>
              </div>
            </div>
            <div className='text-[14px] leading-5 py-2'>{mobile.description}</div>
            <div>
              <div className='py-3 font-semibold text-[18px]'> Available Branches</div>
              <div className='flex'>
                {mobile.branches.map((branch, i) => (
                  <div className='px-4 rounded-[100px] border-[2px] py-2 mr-3' key={i}>{branch}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      
<div>
        <div className='font-semibold text-[20px] py-2 font-inter'>Similar Products</div>
      <div className="contentscards">
          <div className="cardcontainer ">
            {contentcard.map((obj, index) => (
            
              <Homecards
              key={index}
              img={obj.img}
              title={obj.title}
              content={obj.content}
            />
           
            ))}
          </div>
        </div>
      </div>

      </div>

      

      
      
    </div>
  );
}

export default Mobilessingle;