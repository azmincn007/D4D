import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarFlyer from './Navbar/NavbarFlyer';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import FooterFlyer from '../Components/Home/Footer';
import Fly1 from '../assets/Flyer/fly1.png';
import Fly2 from '../assets/Flyer/Fly2.png';
import mobflyer1 from '../assets/Flyer/Mobflyer.png';
import mobflyer2 from '../assets/Flyer/Mobflyer2.png';

function Flyer() {
  const location = useLocation();
  const source = location.state?.source;

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [swiper, setSwiper] = useState(null);

  const FLyerimagesSUpermarket = [
    { img: Fly1 },
    { img: Fly2 },
  ];

  const FLyerimagesMobile = [
    { img: mobflyer1 },
    { img: mobflyer2 },
  ];

  const imagesToRender = source === 'supermarket' ? FLyerimagesSUpermarket : FLyerimagesMobile;

  useEffect(() => {
    if (swiper) {
      setPrevDisabled(swiper.isBeginning);
      setNextDisabled(swiper.isEnd);
    }
  }, [swiper]);

  const handleSwipeChange = (swiperInstance) => {
    const isBeginning = swiperInstance.isBeginning;
    const isEnd = swiperInstance.isEnd;

    setPrevDisabled(isBeginning);
    setNextDisabled(isEnd);
  };

  const handleSwiperInit = (swiperInstance) => {
    setSwiper(swiperInstance);
  };

  // Check if source prop is provided
  if (!source) {
    return <div>Please provide the source prop to render the Flyer component.</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarFlyer />
      <div className="flex-grow max-w-[1440px] Flyercomp flex items-center justify-between w-[60%] mx-auto min-w-[700px] Tab:min-w-[500px] LgMobile2:min-w-[420px]">
        <div ref={navigationPrevRef}>
          <button
            className={`bg-yellow rounded-[30px] w-[50px] h-[50px] flex items-center justify-center LgMobile2:w-[35px] LgMobile2:h-[35px] ${prevDisabled ? 'bg-red-500' : ''}`}
            disabled={prevDisabled}
          >
            <IoIosArrowBack className='h-[30px] w-[30px] LgMobile2:w-[20px] LgMobile2:h-[20px]' />
          </button>
        </div>
        <div>
          <Swiper
            modules={[A11y, Navigation]}
            className="flyrcard max-w-[450px] Tab:w-[300px] LgMobile:max-w-[250px]"
            slidesPerView={1}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSwipeChange}
          >
            {imagesToRender.map((image, index) => (
              <SwiperSlide key={index}>
                <img className='max-w-[450px] w-[100%]' src={image.img} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div ref={navigationNextRef}>
          <button
            className={`bg-yellow rounded-[30px] w-[50px] h-[50px] flex items-center justify-center LgMobile2:w-[30px] LgMobile2:h-[30px] ${nextDisabled ? 'bg-red-500' : ''}`}
            disabled={nextDisabled}
          >
            <IoIosArrowForward className='h-[30px] w-[30px] LgMobile2:w-[20px] LgMobile2:h-[20px]' />
          </button>
        </div>
      </div>
      <FooterFlyer />
    </div>
  );
}

export default Flyer;