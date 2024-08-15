import React from 'react';
import { Modal } from 'flowbite-react';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { modalthemeNational } from '../../Themes/Modaltheme';
import Lottie from 'lottie-react';
import swipe from '../SwipeRight.json';
import { IoMdClose } from "react-icons/io";
import { API_BASE_URL } from '../../config/config';

function Contentcopy({ isOpen, onClose, flyersData }) {
  return (
    <div className='contentcopy'>
      <Modal
        theme={modalthemeNational}
        show={isOpen}
        size="md"
        onClose={onClose}
        popup
        className='modal-contentcopy'
      >
        <Modal.Body>
          <div className='py-2 contentcopymodal relative'>
            {/* Close icon */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-yellow text-black rounded-full p-2 shadow-md hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center"
              aria-label="Close modal"
            >
              <IoMdClose className="text-2xl" />
            </button>
            <Lottie className='h-[200px] w-[200px] absolute top-0 left-1/2 transform -translate-x-1/2 z-10' animationData={swipe} />
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={5}
              slidesPerView={5}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className='swipercontent'
              breakpoints={{
                300: {
                  slidesPerView: 4,
                },
                450: {
                  slidesPerView: 4,
                },
                770: {
                  slidesPerView: 5,
                },
              }}
            >
              {flyersData && flyersData.map((flyer, index) => (
                <SwiperSlide key={index}>
                  <img 
                    className='Mobile:max-h-[80px] h-[350px] w-[250px]' 
                    src={`${API_BASE_URL}${flyer.image}`} 
                    alt={`Flyer ${index + 1}`} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Contentcopy;