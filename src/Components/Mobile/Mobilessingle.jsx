import React from 'react';
import { NavbarComponent } from '../../Pages/Navbar/Navbar';
import single from '../../assets/singlemobile.png';
import single2 from '../../assets/resingle.png';
import re from '../../assets/re.png'
import logomob from '../../assets/logomob.png';
import Homecards from '../Cards/Homecards';
import card from '../../assets/mobs.png'
import '../../styles/Cards.css'
import { Link, useLocation } from 'react-router-dom';


function Mobilessingle() {
  const location = useLocation();
  const source = location.state?.source;
  const contentcard=[{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:card,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]
  const contentcardres=[{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'},{img:re,title:'Lulu Eranakulam',content:'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...'}]

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

  const restaurantData = [
    {
      imgSrc: single2,
      title: 'Atmosphere Restaurant',
      price: 'AED 150',
      title2: 'ATMOSPHERE RESTAURANT',
      description: 'Experience the best fine dining experience in the city with our exquisite menu and stunning ambiance.',
      branches: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah'],
      logoSrc: 'https://example.com/restaurant-logo.png',
    },
    // Add more objects for additional restaurants if needed
  ];

  const renderData = source === 'restaurant' ? restaurantData : mobileData;
  const renderData2 = source === 'restaurant' ? contentcardres : contentcard;


  return (
    <div className='mobilessingle'>
      <NavbarComponent />
      <div className='py-6 px-5 pb-16'>
      {renderData.map((mobile, index) => (
        <div key={index} className="singlecarddetails mb-4 bg-[#F1F1F1] py-4 px-4 rounded-[20px] font-inter Mobile:px-2 Mobile:py-2">
          <div className="topsingle flex">
          <div className="leftsingle Tab:w-[50%] mr-4">
            <div>
              <img src={mobile.imgSrc} alt="" className='max-w-[325px] h-[245px] Tab:w-[100%] Tab:h-[auto] img' />
            </div>
          
          </div>
          <div className="rightsingle px-2 Tab:w-[50%]">
            <div className="righthead">
              <div className='flex items-center '>
                <img src={mobile.logoSrc} alt="" className='max-w-[48px] Tab:hidden' />
                <div className='text-[22px] font-semibold px-3 py'>{mobile.title2}</div>
              </div>
              <div className='hidden Tab:block py-1 mb-2'><p className='text-[12px] text-[#1F1F1F] LgMobile2:text-[8px]'>The Walk at - Jumeirah Beach Residence - Dubai - United Arab Emirates</p></div>
            </div>
            <div className='text-[14px] leading-5 py-2 Tab:hidden'>{mobile.description}</div>
            <div>
              <div className='py-3 font-semibold text-[18px] Tab:py-0 Tab:text-small branch Tab:font-[500] LgMobile2:text-xs'> Available Branches</div>
              <div className='flex flex-wrap'>
                {mobile.branches.map((branch, i) => (
                  <div className='px-4 rounded-[100px] border-[1px] border-black py-2 mr-2 mt-1 branchsingle text-12px Mobile:mr-1' key={i}>{branch}</div>
                ))}
              </div>
            </div>
          </div>

    
          </div>
          <div className="bottomsingle flex justify-between items-center py-2 Tab:hidden">
  <div className='flex  py-2 items-center justify-between  w-[322px]'>
              <div className='text-[18px]'>{mobile.title}</div>
              <div className='bg-yellow rounded-[100px] px-4 py-2'>{mobile.price}</div>
            </div>

           <Link to={'/flyer'} state={{ source: 'mobile' }} ><div className= " bg-yellow rounded-[100px] px-4 py-2 font-semibold  flex items-center h-[40px] justify-center">GO TO FLYERS</div> </Link> 
          </div>


          <div className="hidden bottomsingle  justify-between items-center py-2 Tab:block">
  <div className='flex  py-2 items-center justify-between  w-[100%]'>
              <div className='text-[18px] Mobile:text-[14px]'>{mobile.title}</div>
              <div className=' butsng bg-yellow rounded-[100px] px-2 py-2 Mobile:text-[12px] xsmMobile:text-[10px]'>{mobile.price}</div>
             <Link to={'/flyer'} state={{ source: 'mobile' }}  ><div className= " butsng bg-yellow rounded-[100px] px-2 py-2 font-semibold  flex items-center h-[40px] justify-center Mobile:text-[12px] Mobile:h-[34px] ">GO TO FLYERS</div></Link> 

            </div>

          </div>
          <div className='hidden  text-[14px] leading-5 py-2 Tab:block Mobile:text-[12px]'>{mobile.description}</div>


          
        
        </div>
      ))}

      
<div>

  
<div className='font-semibold text-[20px] py-2 font-inter'>
  {source === 'restaurant' ? 'Similar Food Items' : 'Similar Products'}
</div>      <div className="contentscards">
          <div className="cardcontainermobsingle ">
            {renderData2.map((obj, index) => (
            
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