import React from 'react';
import Categorytab from '../Home/Categorytab';
import { NavbarComponent } from '../Navbar';
import RatingComponent from './Rating';
import card from '../../assets/card.png';
import { Card, Dropdown, DropdownItem } from 'flowbite-react';
import Flowbitecard from '../../Themes/Flowbitecard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Rice1 from '../../assets/Resto/Rice1.png';
import Rice2 from '../../assets/Resto/Rice2.png';
import Rice3 from '../../assets/Resto/Rice3.png';
import Beef1 from '../../assets/Resto/Beef1.png';
import Beef2 from '../../assets/Resto/Beef2.png';
import Beef3 from '../../assets/Resto/Beef3.png';
import Beef4 from '../../assets/Resto/Beef4.png';
import MenuItemList from './MenuItem';

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

  const Ricedata = [
    { Name: 'Plain rice', Img: Rice1, Price: '3.50' },
    { Name: 'Plain rice', Img: Rice2, Price: '3.50' },
    { Name: 'Plain rice', Img: Rice3, Price: '3.50' }
  ];

  const NonVegBeefData = [
    { Name: 'Beef Stew', Img: Beef1, Price: '4.50' },
    { Name: 'Beef Curry', Img: Beef2, Price: '4.50' },
    { Name: 'Beef Fry', Img: Beef3, Price: '4.50' },
    { Name: 'Beef Roast', Img: Beef4, Price: '4.50' }
  ];

  return (
    <div>
      <NavbarComponent />
      <Categorytab />
      {restoData.map((restaurant, index) => (
        <div key={index} className="bgresto w-[100%] h-[300px] bg-cover bg-no-repeat font-inter flex items-center">
          <div className='w-[80%] mx-auto flex items-center'> 
            <div className="text-[32px] font-semibold text-white mr-[5px]">{restaurant.res}</div>
            <div>
              <RatingComponent rating={restaurant.rating} />
            </div>
          </div>
        </div>
      ))}
      <div className='relative ml-[5%]'>
        <div className="absolute top-1 right-[2%]">
          <Dropdown 
            style={{ backgroundColor: '#FFD814', color: 'black', padding: '0rem 1rem', borderRadius: '0px', fontWeight: '700' }} 
            label="All" 
            size="xs"
            className="bg-[#FFD814] text-black border-none font-inter"
          >
            <DropdownItem style={{ backgroundColor: '#FFD814', color: 'black', padding: '0.2rem 1rem', borderRadius: '0px' }}>Veg</DropdownItem>
            <DropdownItem style={{ backgroundColor: '#FFD814', color: 'black', padding: '0.2rem 1rem', borderRadius: '0px' }}>NonVeg</DropdownItem>
          </Dropdown>
        </div>
        <div>
          <p className='py-4 text-[24px] font-semibold'>Today's Special</p>
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
      </div>
      <div className='w-[90%] mx-auto'>
        <MenuItemList data={Ricedata} title="Rice" />
        <MenuItemList data={NonVegBeefData} title="Non-Veg Dishes(Beef)" />
      </div>
    </div>
  );
}

export default RestuarentMenu;
