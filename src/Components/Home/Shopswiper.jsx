import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';
import '../../styles/shopswiper.css';
import { useNavigate } from 'react-router-dom';
import useLanguageText from '../Uselanguagetext';

SwiperCore.use([Navigation]);

const BASE_URL = 'https://hezqa.com';

function Shopswiper({ data }) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

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

  const handleCardClick = (item) => {
    navigate('/resto', {
      state: { id: item.id }
    });
  };

  return (
    <div className="py-3 px-5 font-inter font-semibold text-sm Mobile:py-2 Tab:px-0" style={{ position: 'relative' }}>
      <div
        className="swiper-button-prev px-5 Tab:hidden"
        style={{ zIndex: 1, color: 'black' }}
        onClick={goToPrev}
      ></div>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        spaceBetween={15}
        navigation={false}
        loop={true}
        style={{ maxWidth: '90%', margin: '0 auto' }}
        breakpoints={{
          300: { slidesPerView: 6, spaceBetween: 15, maxWidth: 300 },
          450: { slidesPerView: 7, spaceBetween: 15, maxWidth: 450 },
          600: { slidesPerView: 9, spaceBetween: 15, maxWidth: 600 },
          768: { slidesPerView: 10, spaceBetween: 20, maxWidth: 768 },
          1024: { slidesPerView: 12, spaceBetween: 20, maxWidth: 1024 },
          1440: { slidesPerView: 14, spaceBetween: 30, maxWidth: 1440 },
        }}
      >
        {data.map((item, index) => {
          const shopName = useLanguageText({
            country_eng: item.shopname_eng,
            country_ar: item.shopname_ar,
            country_mal: item.shopname_mal,
            country_hin: item.shopname_hin
          });

          return (
            <SwiperSlide key={index}>
              <div className="swipercard" onClick={() => handleCardClick(item, index)}>
                <img className='w-[90px] h-[90px] rounded-full object-cover'
                  src={item.logo ? `${BASE_URL}${item.logo}` : '/path_to_default_image'}
                  alt={shopName}
                />
                <p className="flex justify-center pt-1 text-[14px] Mobile:text-[8px] text-center">
                  {shopName}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="swiper-button-next px-5 Tab:hidden"
        style={{ zIndex: 1, color: 'black' }}
        onClick={goToNext}
      ></div>
    </div>
  );
}

export default Shopswiper;