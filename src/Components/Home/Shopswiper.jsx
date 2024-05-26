import React, { useRef } from 'react';
import lulu from '../../assets/lulu.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';
import '../../styles/shopswiper.css';

// Initialize Swiper's Navigation module
SwiperCore.use([Navigation]);

function Shopswiper() {
  const swiperRef = useRef(null);

  const swiperdata = [
    { img: lulu, title: 'Lulu 1' },
    { img: lulu, title: 'Lulu 2' },
    { img: lulu, title: 'Lulu 3' },
    { img: lulu, title: 'Lulu 4' },
    { img: lulu, title: 'Lulu 5' },
    { img: lulu, title: 'Lulu 6' },
    { img: lulu, title: 'Lulu 7' },
    { img: lulu, title: 'Lulu 8' },
    { img: lulu, title: 'Lulu 9' },
    { img: lulu, title: 'Lulu 10' },
    { img: lulu, title: 'Lulu 11' },
    { img: lulu, title: 'Lulu 12' },
    { img: lulu, title: 'Lulu 13' },
  ];

  const goToNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goToPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="py-3 px-5 font-inter font-semibold text-sm Mobile:py-2" style={{ position: 'relative' }}>
      <div
        className="swiper-button-prev px-5 Tab:hidden"
        style={{ zIndex: 1000, color: 'black' }}
        onClick={goToPrev}
      ></div>
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={3}
        navigation={false}
        loop={true}
        style={{ maxWidth: '90%', margin: '0 auto' }}
        breakpoints={{

          300: {
            slidesPerView: 6,
            maxWidth: 300, // Set the maximum width to 768px
          },

          450: {
            slidesPerView: 6,
            maxWidth: 450, // Set the maximum width to 768px
          },
          600: {
            slidesPerView: 7,
            maxWidth: 600, // Set the maximum width to 768px
          },


          768: {
            slidesPerView: 8,
            maxWidth: 768, // Set the maximum width to 768px
          },
          1024: {
            slidesPerView: 8,
            maxWidth: 1024,
          },
          1440: {
            slidesPerView: 14,
            maxWidth: 1440,
          },
        }}
      >
        {swiperdata.map((obj, index) => (
          <SwiperSlide key={index}>
            <div className="swipercard">
              <img  src={obj.img} alt={obj.title} />
              <p className="flex justify-center pt-1 text-[16px] Mobile: text-[8px]">{obj.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="swiper-button-next px-5 Tab:hidden"
        style={{ zIndex: 1000, color: 'black' }}
        onClick={goToNext}
      ></div>
    </div>
  );
}

export default Shopswiper;
