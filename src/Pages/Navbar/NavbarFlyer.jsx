import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import Home from '../../assets/Nav/homeicon.png';
import Icon from '../../assets/Nav/luluicon.png';
import InfoFlyer from '../../Components/modal/InfoFlyer';
import Contentcopy from '../../Components/modal/Contentcopy';
import { API_BASE_URL } from '../../config/config';

function NavbarFlyer({flyersData}) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContentCopyOpen, setIsContentCopyOpen] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

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

  const handleShareClick = () => {
    const shopId = window.location.href.split('/').pop();
    const urlToCopy = `https://hezqa.com//#/Shop-page/${shopId}`;

    navigator.clipboard.writeText(urlToCopy).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    });
  };

  return (
    <div className='navbarfly bg-Navbarbg pt-7'>
      <div className='relative w-[90%] mx-auto flex justify-between items-center py-2'>
        <div className="left flex">
          <div className='mr-[30px] flex items-center'>
            <Link to={'/'}>
              <img src={Home} className='w-[22px] h-[25px] Mobile:w-[18px] Mobile:h-[20px]' alt="" />
            </Link>
          </div>
        </div>
        <div className="right flex items-center">
          <div className='mr-8 Mobile:mr-3 flex text-white'>
            <AiOutlineInfoCircle className='iconnav' onClick={handleInfoIconClick} />
            <MdContentCopy className='iconnav' onClick={handleContentCopyClick} />
            <MdOutlineShare className='iconnav' onClick={handleShareClick} />
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
      </div>
      <InfoFlyer isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
      <Contentcopy
        isOpen={isContentCopyOpen}
        onClose={handleCloseContentCopy}
        flyersData={flyersData}
      />
      <AnimatePresence>
        {showCopiedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavbarFlyer;