import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { NavbarComponent } from "../../Pages/Navbar/Navbar";
import RatingComponent from "./Rating";
import { Dropdown } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import RestoCard from "../Cards/Restocard";
import TriangleSwitch from "./Triangleswitch";
import useLanguageText from '../Uselanguagetext';
import { LanguageContext } from "../../App";
import { API_BASE_URL } from "../../config/config";

const BASE_URL = "";

const fetchRestaurantData = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/api/public/restaurent/dashboard/${id}`);
  console.log("Fetched data:", data.data);
  return {
    restaurantDetails: data.data.details,
    menus: data.data.menus,
    todaySpecial: data.data.today_special,
  };
};

function RestuarentMenu() {
  const location = useLocation();
  const { id } = location.state;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);
  const [selectedLanguage] = useContext(LanguageContext);

  const handleNonVegSwitchChange = (isChecked) => {
    setShowNonVeg(isChecked);
  };

  const handleVegSwitchChange = (isChecked) => {
    setShowVeg(isChecked);
  };

  const { data, isLoading, error } = useQuery(["restaurantData", id], () => fetchRestaurantData(id), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    console.log("Filters:", { showVeg, showNonVeg });
  }, [showVeg, showNonVeg]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { restaurantDetails, menus, todaySpecial } = data;

  const shopName = useLanguageText({
    country_eng: restaurantDetails.shopname_eng,
    country_ar: restaurantDetails.shopname_ar,
    country_mal: restaurantDetails.shopname_mal,
    country_hin: restaurantDetails.shopname_hin
  });

  const allText = useLanguageText({
    country_eng: "All",
    country_ar: "الكل",
    country_mal: "എല്ലാം",
    country_hin: "सभी"
  });

  const menuText = useLanguageText({
    country_eng: "Menu",
    country_ar: "القائمة",
    country_mal: "മെനു",
    country_hin: "मेनू"
  });

  const todaysSpecialText = useLanguageText({
    country_eng: "Today's Special",
    country_ar: "عرض اليوم",
    country_mal: "ഇന്നത്തെ പ്രത്യേകത",
    country_hin: "आज का विशेष"
  });

  const filterMenuItems = (items) => {
    console.log("Filtering items:", items);
    return items.filter(item => {
      const itemType = (item.type || '').toLowerCase();
      return (showVeg && itemType.includes('veg') && !itemType.includes('non')) || 
             (showNonVeg && (itemType.includes('non') || !itemType.includes('veg')));
    });
  };

  const filteredMenus = menus
    .filter(category => selectedCategory === 'All' || category.category_eng === selectedCategory)
    .map(category => ({
      ...category,
      menus: filterMenuItems(category.menus)
    }))
    .filter(category => category.menus.length > 0);

  return (
    <div className="">
      <NavbarComponent hideToggle={true} />
      <div className="bgresto min-h-[100vh] bg-cover bg-no-repeat">
        <div className="w-[80%] font-inter mx-auto">
          <div className="mx-6 rounded-[12px] flex justify-center w-full text-center Mobile:w-[270px]">
            <div className="px-4 text-white flex flex-col py-2">
              <div className="flex items-center">
                <div className="text-[26px] font-semibold text-white mr-[5px] Mobile:text-[12px] LgMobile:text-[18px]">{shopName}</div>
                <div>
                  <RatingComponent rating={restaurantDetails.rating} />
                </div>
              </div>
              <div className="text-xs">
                <p>{useLanguageText({
                  country_eng: restaurantDetails.country_eng,
                  country_ar: restaurantDetails.country_ar,
                  country_mal: restaurantDetails.country_mal,
                  country_hin: restaurantDetails.country_hin
                })}</p>
                <p>
                  {restaurantDetails.city} - {useLanguageText({
                    country_eng: restaurantDetails.region_eng,
                    country_ar: restaurantDetails.region_ar,
                    country_mal: restaurantDetails.region_mal,
                    country_hin: restaurantDetails.region_hin
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-0">
            <div className="flex justify-between w-full">
              <div className="flex gap-8">
                <div className="bg-[#232F3E]/40 border border-white rounded-full inline-block backdrop-blur-sm p-4">
                  <TriangleSwitch onChange={handleNonVegSwitchChange} color="red" initialChecked={showNonVeg} />
                </div>
                <div className="bg-[#232F3E]/40 border border-white rounded-full inline-block backdrop-blur-sm p-4">
                  <TriangleSwitch onChange={handleVegSwitchChange} color="green" initialChecked={showVeg} />
                </div>
              </div>
              <div className="dropdownrescat">
                <Dropdown
                  label={selectedCategory === 'All' ? allText : useLanguageText({
                    country_eng: selectedCategory,
                    country_ar: menus.find(menu => menu.category_eng === selectedCategory)?.category_ar,
                    country_mal: menus.find(menu => menu.category_eng === selectedCategory)?.category_mal,
                    country_hin: menus.find(menu => menu.category_eng === selectedCategory)?.category_hin
                  })}
                  dismissOnClick={true}
                >
                  <Dropdown.Item onClick={() => setSelectedCategory('All')}>
                    {allText}
                  </Dropdown.Item>
                  {menus.map((menu, index) => {
                    const categoryText = useLanguageText({
                      country_eng: menu.category_eng,
                      country_ar: menu.category_ar,
                      country_mal: menu.category_mal,
                      country_hin: menu.category_hin
                    });
                    return (
                      <Dropdown.Item key={index} onClick={() => setSelectedCategory(menu.category_eng)}>
                        {categoryText}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown>
              </div>
            </div>
          </div>
          
          {/* Today's Special Section */}
          {todaySpecial.length > 0 && (
            <div className="mt-[30px]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="py-2 text-[24px] font-semibold text-white Mobile:text-[12px]">{todaysSpecialText}</p>
                </div>
              </div>
              <div className="swiper-container w-[100%] mx-auto pb-4">
                <Swiper
                  slidesPerView={2.5}
                  spaceBetween="10"
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    300: { slidesPerView: 1.5, spaceBetween: "20" },
                    450: { slidesPerView: 2.5, spaceBetween: "20" },
                    640: { slidesPerView: 2.5, spaceBetween: "20" },
                    768: { slidesPerView: 2.5, spaceBetween: "20" },
                    1024: { slidesPerView: 2.5, spaceBetween: "20" },
                    1250: { slidesPerView: 2.5, spaceBetween: "50" },
                    1450: { slidesPerView: 2.5, spaceBetween: "50" },
                  }}
                  modules={[Navigation, Pagination]}
                  className="mySwiper"
                >
                  {todaySpecial.map((item, index) => (
                    <SwiperSlide key={index} className="!w-auto">
                      <RestoCard 
                        offer_price={item.offer_price} 
                        normal_price={item._price} 
                        img={`${API_BASE_URL}${item.image}`}  
                        title={useLanguageText({
                          country_eng: item.menu_eng,
                          country_ar: item.menu_ar,
                          country_mal: item.menu_mal,
                          country_hin: item.menu_hin
                        })}  
                        type={item.type} 
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
        
        {/* Menu Section */}
        {filteredMenus.length > 0 ? (
          <>
            <div className="flex items-center justify-center my-4">
              <div className="h-[1px] flex-grow bg-white"></div>
              <p className="mx-4 text-center text-white font-['Marck_Script'] text-[60px]">{menuText}</p>
              <div className="h-[1px] flex-grow bg-white"></div> 
            </div>
            <div className="w-[80%] mx-auto py-8">
              {filteredMenus.map((category, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {useLanguageText({
                      country_eng: category.category_eng,
                      country_ar: category.category_ar,
                      country_mal: category.category_mal,
                      country_hin: category.category_hin
                    })}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[87px]">
                    {category.menus.map((item, itemIndex) => (
                      <RestoCard
                        key={itemIndex}
                        img={`${API_BASE_URL}${item.image}`}
                        title={useLanguageText({
                          country_eng: item.menu_eng,
                          country_ar: item.menu_ar,
                          country_mal: item.menu_mal,
                          country_hin: item.menu_hin
                        })}
                        normal_price={item.price}
                        type={item.type} 
                        offer_price={item.offer_price}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-white mt-8">
          </div>
        )}
      </div>
    </div>
  );
}

export default RestuarentMenu;