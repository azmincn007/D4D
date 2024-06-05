import React from 'react'
import Search from './navcomponents/Search'
import Home from '../../assets/Nav/homeicon.png'
import Share from '../../assets/Nav/shareicon.png'
import Icon from '../../assets/Nav/luluicon.png'


function NavbarFlyer() {
  return (
    <div className='navbarfly bg-Navbarbg py-3'>

        <div className=' relative w-[90%] mx-auto flex justify-between items-center py-2'>

        

        <div className="left flex">
            <div className='mr-[5%] flex items-center'>
                <img src={Home} className='w-[22px] h-[25px] Mobile:w-[18px]  Mobile:h-[20px]' alt="" />
            </div>
            <div className='search flex items-center LgTab:hidden'>
            <Search/>
            </div>
        </div>

        <div className="right flex items-center ">
                <div className='mr-8 Mobile:mr-4'>
                    <img src={Share} className='w-[22px] h-[25px] Mobile:w-[18px]  Mobile:h-[20px]' alt="" />
                </div>
                <div>
                <img src={Icon} className='w-[46px] h-[48px] Mobile:w-[31px]  Mobile:h-[33px]' alt="" />

                </div>

        </div>

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2"'>
            <button className='  text-xsm rounded-[20px] bg-yellow px-3 py-[2px]' >Shop Online</button>
        </div>
      
    </div>

    <div className='search hidden pt-2 items-center justify-center LgTab:flex LgTab:w-[90%] mx-auto'>
            <Search/>
            </div>

    </div>
  )
}

export default NavbarFlyer
