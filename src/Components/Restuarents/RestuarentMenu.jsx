import React from 'react';
import Categorytab from '../Home/Categorytab';
import { NavbarComponent } from '../Navbar';
import RatingComponent from './Rating';
import card from '../../assets/card.png';
import { Card } from 'flowbite-react';
import Flowbitecard from '../../Themes/Flowbitecard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function RestuarentMenu() {
  const restoData = [
    { res: 'Relax Restaurant', rating: 4 },
    // Add more restaurant data objects here
  ];

  const contentcard = [
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' },
    { img: card, title: 'Lulu Eranakulam', content: 'Sprawling, residential Ernakulam is known for Marine Drive, a busy ...' }
  ];

  return (
    <div>
      <NavbarComponent />
      <Categorytab />
      {restoData.map((restaurant, index) => (
        <div key={index} className="bgresto w-[100%] h-[300px] bg-cover bg-no-repeat">
          <div className="text-[50px] text-white">{restaurant.res}</div>
          <div>
            <RatingComponent rating={restaurant.rating} />
          </div>
        </div>
      ))}
      <div className='ml-[70px] '>
        <div>
          <p>Todays Special</p>
          <Swiper
            slidesPerView={1}
            spaceBetween={2}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{

                450: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },

              640: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },

              1250: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },

              1450: {
                slidesPerView: 6.5,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {contentcard.map((obj, index) => (
              <SwiperSlide key={index}>
                <Card
                  theme={Flowbitecard}
                  className="max-w-[220px] p-1"
                  imgAlt="Meaningful alt text for an image that is not purely decorative"
                  imgSrc={obj.img}
                >
                  <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">
                    {obj.title}
                  </h5>
                  <p className="font-normal text-[10px] text-[#949494] dark:text-gray-400">
                    {obj.content}
                  </p>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        




        <div>
            <p>Rice</p>

        </div>
      </div>
   
    </div>
  );
}

export default RestuarentMenu;