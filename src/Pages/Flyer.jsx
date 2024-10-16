import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavbarFlyer from './Navbar/NavbarFlyer';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import FooterFlyer from '../Components/Home/Footer';
import { API_BASE_URL } from '../config/config';
import comingsoon from '../assets/coming.jpg';

const LoadingPlaceholder = () => (
  <div className="w-full h-0 pb-[133.33%] relative bg-gray-300 animate-pulse">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* You can add a loading spinner or text here if desired */}
    </div>
  </div>
);

function Flyer() {
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const [flyersData, setFlyersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // You can use the id to fetch flyer data if needed
        // For now, we'll use the data from location.state
        const data = location.state?.flyers || [];
        setFlyersData(data);
      } catch (error) {
        console.error("Error fetching flyer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);

  useEffect(() => {
    if (swiper) {
      setPrevDisabled(swiper.isBeginning);
      setNextDisabled(swiper.isEnd);
    }
  }, [swiper]);

  const handleSwipeChange = (swiperInstance) => {
    setPrevDisabled(swiperInstance.isBeginning);
    setNextDisabled(swiperInstance.isEnd);
  };

  const handleSwiperInit = (swiperInstance) => {
    setSwiper(swiperInstance);
  };

  const imagesToRender = isLoading
    ? [{ image: 'loading' }, { image: 'loading' }]
    : (!flyersData || flyersData.length === 0)
      ? [{ image: comingsoon }, { image: comingsoon }]
      : flyersData.length === 1
        ? [...flyersData, { image: comingsoon }]
        : flyersData;

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="flex-grow py-10 max-w-[1440px] Flyercomp flex items-center justify-between w-[60%] mx-auto min-w-[700px] Tab:min-w-[500px] LgMobile2:min-w-[420px]">
        <div ref={navigationPrevRef}>
          <button
            className={`bg-yellow rounded-[30px] w-[50px] h-[50px] flex items-center justify-center LgMobile2:w-[35px] LgMobile2:h-[35px] ${prevDisabled ? 'bg-red-500' : ''}`}
            disabled={prevDisabled}
          >
            <IoIosArrowBack className='h-[30px] w-[30px] LgMobile2:w-[20px] LgMobile2:h-[20px]' />
          </button>
        </div>
        <div className="w-full max-w-[450px]">
          <Swiper
            modules={[A11y, Navigation]}
            className="flyrcard"
            slidesPerView={1}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSwipeChange}
          >
            {imagesToRender.map((flyer, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-0 pb-[133.33%] relative">
                  {flyer.image === 'loading' ? (
                    <LoadingPlaceholder />
                  ) : (
                    <img
                      className='absolute inset-0 w-full h-full object-cover'
                      src={flyer.image === comingsoon ? comingsoon : (flyer.image.startsWith('/') ? `${API_BASE_URL}${flyer.image}` : flyer.image)}
                      alt={`Flyer ${index + 1}`}
                    />
                  )}
                </div>
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