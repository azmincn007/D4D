import React from 'react';
import { Modal } from 'flowbite-react';
import Fly1 from '../../assets/Flyer/fly1.png';
import Fly2 from '../../assets/Flyer/Fly2.png';
import mobflyer1 from '../../assets/Flyer/Mobflyer.png';
import mobflyer2 from '../../assets/Flyer/Mobflyer2.png';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { modalthemeNational } from '../../Themes/Modaltheme';

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
        theme={modalthemeNational}
        show={isOpen}
        size="md"
        onClose={onClose}
        popup
        className='modal-contentcopy'
      >
        <Modal.Body>
          <div className='py-2 contentcopymodal'>
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={5}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              className='swipercontent'
              breakpoints={{

                300: {
                  slidesPerView: 4,
                },
                // Set breakpoint at 450px and below
                450: {
                  slidesPerView: 4,
                },
                // Set breakpoint at 770px and below
                770: {
                  slidesPerView:5 ,
                },
              }}
            >
              {imagesToRender.map((image, index) => (
                <SwiperSlide key={index}>
                  <img className='h-[100%] Mobile:max-h-[100px] max-h-[300px]' src={image.img} alt={`Flyer ${index}`} />
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