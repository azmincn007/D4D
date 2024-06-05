import React from "react";
import Categorytab from "../Home/Categorytab";
import { NavbarComponent } from "../../Pages/Navbar/Navbar";
import RatingComponent from "./Rating";
import card from "../../assets/card.png";
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Rice1 from "../../assets/Resto/Rice1.png";
import Rice2 from "../../assets/Resto/Rice2.png";
import Rice3 from "../../assets/Resto/Rice3.png";
import Beef1 from "../../assets/Resto/Beef1.png";
import Beef2 from "../../assets/Resto/Beef2.png";
import Beef3 from "../../assets/Resto/Beef3.png";
import Beef4 from "../../assets/Resto/Beef4.png";
import MenuItemList from "./MenuItem";
import { restorentpagedrop } from "../../Themes/Flowbitedrop";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import RestoCard from "../Cards/Restocard";

function RestuarentMenu() {
  const restoData = [
    { res: "Relax Restaurant", rating: 4 },
    // Add more restaurant data objects here
  ];
  const contentcard = [
    { img: card, title: "Margherita Pizza", rating: 4, price: "$12.99" },
    { img: card, title: "Spaghetti ", rating: 5, price: "$10.99" },
    { img: card, title: "Margherita Pizza", rating: 4, price: "$12.99" },
    { img: card, title: "Spaghetti ", rating: 5, price: "$10.99" },
    { img: card, title: "Margherita Pizza", rating: 4, price: "$12.99" },
    { img: card, title: "Spaghetti ", rating: 5, price: "$10.99" },
    { img: card, title: "Chicken Biryani", rating: 4, price: "$14.99" },
    { img: card, title: "Falafel Wrap", rating: 3, price: "$8.99" },
    { img: card, title: "Beef Burger", rating: 4, price: "$11.99" },
    { img: card, title: "Pad Thai", rating: 5, price: "$13.99" },
    { img: card, title: "Fish and Chips", rating: 4, price: "$9.99" },
  ];

  const Ricedata = [
    { Name: "Plain rice", Img: Rice1, Price: "3.50" },
    { Name: "Plain rice", Img: Rice2, Price: "3.50" },
    { Name: "Plain rice", Img: Rice3, Price: "3.50" },
  ];

  const NonVegBeefData = [
    { Name: "Beef Stew", Img: Beef1, Price: "4.50" },
    { Name: "Beef Curry", Img: Beef2, Price: "4.50" },
    { Name: "Beef Fry", Img: Beef3, Price: "4.50" },
    { Name: "Beef Roast", Img: Beef4, Price: "4.50" },
  ];

  return (
    <div>
      <div className="min-h-screen Tab:min-h-[80vh] flex flex-col">

      
      <NavbarComponent />
      <div className=" bgresto bg-cover bg-no-repeat flex-grow overflow-auto flex center">

      
      {restoData.map((restaurant, index) => (
        <div key={index} className="  w-[100%]   font-inter flex flex-col justify-end ">
          <div className="mx-6 w-[432px] backdrop-blur-[3px] rounded-[12px] bg-[#13192180]  ">
            <div className="px-4 text-white flex flex-col  py-2">
              <div className="  flex  items-center">
                <div className="text-[32px] font-semibold text-white mr-[5px] Mobile:text-[14px] LgMobile:text-[18px]">{restaurant.res}</div>
                <div>
                  <RatingComponent rating={restaurant.rating} />
                </div>
              </div>

              <div className="text-xs">
                <p>The Walk at - Jumeirah Beach Residence</p>
                <p>Dubai - United Arab Emirates</p>
              </div>

              <div>
                <p className=" text-2xl font-semibold">Menu</p>
                <div className="flex items-center  text-xsm text-yellow"><p >Home</p> <MdKeyboardArrowRight/> <p>menu</p> </div>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-[3px] mt-[30px] rounded-tl-[60px]  rounded-tr-[60px] Tab:rounded-tr-[25px] Tab:rounded-tl-[25px] bg-[#13192180]">
          <p className="py-4 text-[24px] font-semibold px-16 text-white Mobile:text-[12px] Mobile:px-8">Today's Special</p>
          <div className="swiper-container w-[95%] mx-auto pb-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 4.5,
                  spaceBetween: 10,
                },
                450: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 5.5,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 6.5,
                  spaceBetween: 10,
                },
                1250: {
                  slidesPerView: 7.5,
                  spaceBetween: 15,
                },
                1450: {
                  slidesPerView: 6.5,
                  spaceBetween: 5,
                },
              }}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              {contentcard.map((obj, index) => (
                <SwiperSlide key={index}>
                  <RestoCard price={obj.price} img={obj.img} title={obj.title} rating={obj.rating} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        </div>
      ))}
      </div>
      </div>
      
      <div className="relative ml-[5%]">
        <div className="absolute top-1 right-[2%]">
          <Dropdown
            theme={restorentpagedrop}
            style={{ backgroundColor: "#FFD814", color: "black", padding: "0rem 0rem", borderRadius: "0px", fontWeight: "700", fontSize: "12px" }}
            label="All"
            size="xs"
            className="bg-[#FFD814] text-black border-none font-inter"
          >
            <div className="dropdownss">
              <DropdownItem
                className="dropdownitem"
                style={{
                  backgroundColor: "#FFD814",
                  color: "black",
                  padding: "0.2rem 1rem",
                  borderRadius: "0px",
                  fontWeight: "600",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                Veg
              </DropdownItem>
              <DropdownItem
                className="dropdownitem"
                style={{
                  backgroundColor: "#FFD814",
                  color: "black",
                  padding: "0.2rem 1rem",
                  borderRadius: "0px",
                  fontWeight: "600",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                Non-Veg
              </DropdownItem>
            </div>
          </Dropdown>
        </div>
        
      </div>
      <div className="w-[90%] mx-auto">
        <MenuItemList data={Ricedata} title="Rice" />
        <MenuItemList data={NonVegBeefData} title="Non-Veg Dishes(Beef)" />
      </div>
    </div>
  );
}

export default RestuarentMenu;
