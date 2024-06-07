import React, { useState } from 'react';
import Search from './navcomponents/Search';
import Home from '../../assets/Nav/homeicon.png';
import Icon from '../../assets/Nav/luluicon.png';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import InfoFlyer from '../../Components/modal/InfoFlyer';
import Contentcopy from '../../Components/modal/Contentcopy';
import { Link } from 'react-router-dom';

function NavbarFlyer() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContentCopyOpen, setIsContentCopyOpen] = useState(false);

  const handleInfoIconClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleContentCopyClick = () => {
    setIsContentCopyOpen(true);
  };

  const handleCloseContentCopy = () => {
    setIsContentCopyOpen(false);
  };

  return (
    <div className='navbarfly bg-Navbarbg py-3'>
      <div className='relative w-[90%] mx-auto flex justify-between items-center py-2'>
        <div className="left flex">
          <div className='mr-[30px] flex items-center'>
            <Link to={'/'}>
            <img src={Home} className='w-[22px] h-[25px] Mobile:w-[18px] Mobile:h-[20px]' alt="" />

            </Link>
          </div>
          <div className='search flex items-center LgTab:hidden'>
            <Search />
          </div>
        </div>
        <div className="right flex items-center">
          <div className='mr-8 Mobile:mr-4 flex text-white'>
            <AiOutlineInfoCircle className='iconnav' onClick={handleInfoIconClick} />
            <MdContentCopy className='iconnav' onClick={handleContentCopyClick} />
            <MdOutlineShare className='iconnav' />
          </div>
          <div>
            <img src={Icon} className='w-[46px] h-[48px] Mobile:w-[31px] Mobile:h-[33px]' alt="" />
          </div>
        </div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 LgMobile2:-translate-x-full'>
          <button className='text-xsm rounded-[20px] bg-yellow px-3 py-[2px]'>Shop Online</button>
        </div>
      </div>
      <div className='search hidden pt-2 items-center justify-center LgTab:flex LgTab:w-[90%] mx-auto'>
        <Search />
      </div>
      <InfoFlyer isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
      <Contentcopy isOpen={isContentCopyOpen} onClose={handleCloseContentCopy} />
    </div>
  );
}

export default NavbarFlyer;
