import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';
import '../../styles/shopswiper.css';
import { useNavigate } from 'react-router-dom';
import useLanguageText from '../Uselanguagetext';
import { API_BASE_URL } from '../../config/config';

SwiperCore.use([Navigation]);

function Shopswiper({ data, Type, isLoading }) {
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
    if (Type === 'Restaurant') {
      navigate('/restuarent', {
        state: { id: item.id }
      });
    } else {
      navigate('/shop', {
        state: { id: item.id }
      });
    }
  };

  const noDataAvailable = !isLoading && (!data || data.length === 0);

  // Function to repeat data to fill the swiper
  const repeatData = (originalData, minCount) => {
    if (originalData.length >= minCount) return originalData;
    const repeatedData = [];
    while (repeatedData.length < minCount) {
      repeatedData.push(...originalData);
    }
    return repeatedData.slice(0, minCount);
  };

  // Ensure we have at least 14 items (or more if needed)
  const repeatedData = isLoading || noDataAvailable ? [] : repeatData(data, 14);

  if (noDataAvailable) {
    return (
      <div className="py-3 px-5 font-inter font-semibold text-sm Mobile:py-2 Tab:px-0 flex justify-center items-center h-32">
        <p className="text-gray-600">No shops available in this location</p>
      </div>
    );
  }

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
          300: { slidesPerView: 4, spaceBetween: 15, maxWidth: 300 },
          450: { slidesPerView: 5, spaceBetween: 15, maxWidth: 450 },
          600: { slidesPerView: 7, spaceBetween: 15, maxWidth: 600 },
          768: { slidesPerView: 8, spaceBetween: 20, maxWidth: 768 },
          1024: { slidesPerView: 12, spaceBetween: 20, maxWidth: 1024 },
          1440: { slidesPerView: 14, spaceBetween: 30, maxWidth: 1440 },
        }}
      >
        {isLoading ? (
          // Render shimmer effect slides while loading
          Array(14).fill().map((_, index) => (
            <SwiperSlide key={index}>
              <div className="swipercard">
                <div className="w-[90px] h-[90px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          // Render repeated data once loaded
          repeatedData.map((item, index) => {
            const name = useLanguageText({
              country_eng: item.shopname_eng,
              country_ar: item.shopname_ar,
              country_mal: item.shopname_mal,
              country_hin: item.shopname_hin
            });

            return (
              <SwiperSlide key={index}>
                <div className="swipercard" onClick={() => handleCardClick(item, index % data.length)}>
                  <img className='w-[90px] h-[90px] rounded-full object-cover'
                    src={item.logo ? `${API_BASE_URL}${item.logo}` : '/path_to_default_image'}
                    alt={name}
                  />
                  <p className="flex w-[90px] justify-center pt-1 text-[14px] Mobile:text-[8px] text-center">
                    {name}
                  </p>
                </div>
              </SwiperSlide>
            );
          })
        )}
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