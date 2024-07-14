import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { NavbarComponent } from "../../Pages/Navbar/Navbar";
import RatingComponent from "./Rating";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import MenuItemList from "./MenuItem";
import { restorentpagedrop } from "../../Themes/Flowbitedrop";
import { MdKeyboardArrowRight } from "react-icons/md";
import RestoCard from "../Cards/Restocard";

const BASE_URL = "https://hezqa.com";

const fetchRestaurantData = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/api/public/restaurent/dashboard/${id}`);
  console.log(data.data);
  
  return {
    restaurantDetails: data.data.details,
    menus: data.data.menus,
    todaySpecial: data.data.today_special
  };
};

function RestuarentMenu() {
  const location = useLocation();
  const { id } = location.state;

  const { data, isLoading, error } = useQuery(
    ["restaurantData", id],
    () => fetchRestaurantData(id),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { restaurantDetails, menus, todaySpecial } = data;
  console.log(menus);

  return (
    <div className="bg-[#131921]">
      <div className="min-h-[124vh] flex flex-col Mobile:min-h-[90vh]">
        <NavbarComponent hideToggle={true} />
        <div className="bgresto bg-cover bg-no-repeat flex-grow overflow-auto flex center">
          <div className="w-[100%] font-inter flex flex-col justify-end">
            <div className="mx-6 w-[432px] backdrop-blur-[3px] rounded-[12px] bg-[#13192180] Mobile:w-[270px]">
              <div className="px-4 text-white flex flex-col py-2">
                <div className="flex items-center">
                  <div className="text-[22px] font-semibold text-white mr-[5px] Mobile:text-[12px] LgMobile:text-[18px]">
                    {restaurantDetails.shopname_eng}
                  </div>
                  <div>
                    <RatingComponent rating={restaurantDetails.rating} />
                  </div>
                </div>

                <div className="text-xs">
                  <p>{restaurantDetails.country_eng}</p>
                  <p>{restaurantDetails.city} - {restaurantDetails.region_eng}</p>
                </div>

                <div>
                  <p className="text-[20px] font-semibold Mobile:text-xs">Menu</p>
                  <div className="flex items-center text-xsm text-yellow Mobile:text-xs">
                    <p>Home</p> <MdKeyboardArrowRight /> <p>menu</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-[3px] mt-[30px] rounded-tl-[60px] rounded-tr-[60px] Tab:rounded-tr-[25px] Tab:rounded-tl-[25px] bg-[#13192180]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="py-2 text-[24px] font-semibold px-16 text-white Mobile:text-[12px] Mobile:px-8">Today's Special</p>
                </div>
                <div>
                  <Dropdown
                    theme={restorentpagedrop}
                    style={{
                      backgroundColor: "#FFD814",
                      color: "black",
                      padding: "0rem 0rem",
                      borderRadius: "0px",
                      fontWeight: "700",
                      fontSize: "12px",
                      marginRight: "35px",
                    }}
                    label="All"
                    size="xs"
                    className="bg-[#FFD814] text-black border-none font-inter"
                  >
                    <div className="dropdownss">
                      <DropdownItem className="dropdownitem" style={{
                        backgroundColor: "#FFD814",
                        color: "black",
                        padding: "0.2rem 1rem",
                        borderRadius: "0px",
                        fontWeight: "600",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                      }}>
                        Veg
                      </DropdownItem>
                      <DropdownItem className="dropdownitem" style={{
                        backgroundColor: "#FFD814",
                        color: "black",
                        padding: "0.2rem 1rem",
                        borderRadius: "0px",
                        fontWeight: "600",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                      }}>
                        Non-Veg
                      </DropdownItem>
                    </div>
                  </Dropdown>
                </div>
              </div>
              <div className="swiper-container w-[95%] mx-auto pb-4">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    300: { slidesPerView: 4.5, spaceBetween: 10 },
                    450: { slidesPerView: 5, spaceBetween: 10 },
                    640: { slidesPerView: 5, spaceBetween: 10 },
                    768: { slidesPerView: 5.5, spaceBetween: 10 },
                    1024: { slidesPerView: 6.5, spaceBetween: 10 },
                    1250: { slidesPerView: 8.5, spaceBetween: 15 },
                    1450: { slidesPerView: 9.5, spaceBetween: 5 },
                  }}
                  modules={[Navigation, Pagination]}
                  className="mySwiper"
                >
                  {todaySpecial.map((item, index) => (
                    <SwiperSlide key={index}>
                      <RestoCard
                        price={item.offer_price}
                        img={`${BASE_URL}${item.image}`}
                        title={item.menu_eng}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <div className="h-[1px] flex-grow bg-[#696969]"></div>
        <p className="mx-4 text-center text-white font-['Marck_Script'] text-[42px]">Menu</p>
        <div className="h-[1px] flex-grow bg-[#696969]"></div>
      </div>
      <div className="w-[90%] mx-auto">
        {menus.map((menuCategory, index) => (
          <MenuItemList key={index} data={menuCategory} title={menuCategory.menu_eng} />
        ))}
      </div>
    </div>

  );
}

export default RestuarentMenu;