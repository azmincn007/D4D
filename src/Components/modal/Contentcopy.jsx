import React from 'react';
import { Modal } from 'flowbite-react';
import Fly1 from '../../assets/Flyer/fly1.png';
import Fly2 from '../../assets/Flyer/Fly2.png';
import mobflyer1 from '../../assets/Flyer/Mobflyer.png';
import mobflyer2 from '../../assets/Flyer/Mobflyer2.png';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Contentcopy({ isOpen, onClose, source }) {
  
  const FLyerimagesSupermarket = [
    { img: Fly1 },
    { img: Fly2 },
    { img: Fly1 },
    { img: Fly2 },
    { img: Fly2 },
    { img: Fly1 },
    { img: Fly2 },
  ];

  const FLyerimagesMobile = [
    { img: mobflyer1 },
    { img: mobflyer2 },
    { img: mobflyer1 },
    { img: mobflyer2 },
    { img: mobflyer1 },
    { img: mobflyer2 },
  ];

  const imagesToRender = source === 'supermarket' ? FLyerimagesSupermarket : FLyerimagesMobile;

  return (
    <div className='contentcopy'>

  
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
      popup
      className='modal-contentcopy'
    >
      <Modal.Body>
        <div className='py-2 contentcopymodal'>
        <Swiper
          // install Swiper modules
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className='swipercontent'
        >
          {imagesToRender.map((image, index) => (
            <SwiperSlide key={index}>
              <img className='h-[100%]' src={image.img} alt={`Flyer ${index}`} />
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
