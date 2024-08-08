import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { NavbarComponent } from "../../Pages/Navbar/Navbar";
import RatingComponent from "./Rating";
import RestoCard from "../Cards/Restocard";
import useLanguageText from '../Uselanguagetext';
import { LanguageContext } from "../../App";
import { useLocation } from "react-router-dom";
import Loading from "../../api/Loading";
import { Dropdown } from "flowbite-react";
import { API_BASE_URL } from "../../config/config";


const fetchShopData = async (shopId) => {
  const requestData = {
    region_id: 4,
    cat_id: 0,
    subcat_id: 0,
    shop_id: shopId,
    user_id: 1,
  };

  const response = await axios.post(`${API_BASE_URL}/api/public/shop/filter-products`, requestData);
  const { data } = response;

  return {
    shopDetails: data.data.shop_details,
    products: data.data.products,
  };
};

const fetchCategories = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/categories`);
  return data.data.categories;
};

const fetchSubcategories = async (categoryId) => {
  if (!categoryId || categoryId === "All") return [];
  const { data } = await axios.get(`${API_BASE_URL}/api/subcategories/${categoryId}`);
  return data.data.subcategories;
};

function ShopMenu() {
  const [selectedLanguage] = useContext(LanguageContext);
  const location = useLocation();
  const shopId = location.state?.id;

  const [selectedShopCategory, setSelectedShopCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const { 
    data: shopData, 
    isLoading: isShopDataLoading, 
    error: shopDataError 
  } = useQuery(
    ["shopData", shopId],
    () => fetchShopData(shopId),
    {
      enabled: !!shopId,
      cacheTime: 0,
      staleTime: 0,
      retry: 3,
    }
  );

  const { 
    data: categories, 
    isLoading: isCategoriesLoading, 
    error: categoriesError 
  } = useQuery("categories", fetchCategories);

  const { 
    data: subcategories, 
    isLoading: isSubcategoriesLoading, 
    error: subcategoriesError 
  } = useQuery(
    ["subcategories", selectedShopCategory],
    () => fetchSubcategories(selectedShopCategory),
    {
      enabled: selectedShopCategory !== "All",
    }
  );

  const handleShopCategoryChange = (category) => {
    setSelectedShopCategory(category);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  if (isShopDataLoading || isCategoriesLoading || isSubcategoriesLoading) {
    return <div className="h-[100vh] flex justify-center items-center "><Loading/></div>;
  }

  if (shopDataError) {
    return <div>Error loading shop data: {shopDataError.message}</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories: {categoriesError.message}</div>;
  }

  if (subcategoriesError) {
    return <div>Error loading subcategories: {subcategoriesError.message}</div>;
  }

  if (!shopData) {
    return <div>No shop data available. Please try refreshing the page.</div>;
  }

  if (!categories) {
    return <div>No categories available. Please try refreshing the page.</div>;
  }

  const { shopDetails, products } = shopData;

  const shopName = useLanguageText({
    country_eng: shopDetails.shopname_eng,
    country_ar: shopDetails.shopname_ar,
    country_mal: shopDetails.shopname_mal,
    country_hin: shopDetails.shopname_hin
  });

  const productsText = useLanguageText({
    country_eng: "Products",
    country_ar: "منتجات",
    country_mal: "ഉൽപ്പന്നങ്ങൾ",
    country_hin: "उत्पाद"
  });

  const filteredProducts = products;

  if (filteredProducts.length === 0) {
    return <div>No products available</div>;
  }

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
                  <RatingComponent rating={shopDetails.rating} />
                </div>
              </div>
              <div className="text-xs">
                <p>{useLanguageText({
                  country_eng: shopDetails.country_eng,
                  country_ar: shopDetails.country_ar,
                  country_mal: shopDetails.country_mal,
                  country_hin: shopDetails.country_hin
                })}</p>
                <p>
                  {shopDetails.city} - {useLanguageText({
                    country_eng: shopDetails.region_eng,
                    country_ar: shopDetails.region_ar,
                    country_mal: shopDetails.region_mal,
                    country_hin: shopDetails.region_hin
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center my-4">
          <div className="h-[1px] flex-grow bg-white"></div>
          <p className="mx-4 text-center text-white font-['Marck_Script'] text-[60px]">{productsText}</p>
          <div className="h-[1px] flex-grow bg-white"></div> 
        </div>

        <div className="w-[80%] mx-auto my-4 flex justify-end space-x-4 dropdownrescat">
          <Dropdown
            label={selectedShopCategory === 'All' ? 'All Categories' : categories.find(cat => cat.id === selectedShopCategory)?.cat_eng || 'All Categories'}
            dismissOnClick={true}
            className="w-full md:w-auto"
            placement="bottom-end"
            renderTrigger={() => (
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {selectedShopCategory === 'All' ? 'All Categories' : categories.find(cat => cat.id === selectedShopCategory)?.cat_eng || 'All Categories'}
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            )}
          >
            <div className="py-1">
              <Dropdown.Item onClick={() => handleShopCategoryChange('All')}>
                All Categories
              </Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.id}
                  onClick={() => handleShopCategoryChange(category.id)}
                >
                  {category.cat_eng}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>

          {selectedShopCategory !== "All" && (
            <Dropdown
              label={selectedSubcategory === 'All' ? 'All Subcategories' : subcategories.find(subcat => subcat.id === selectedSubcategory)?.subcat_eng || 'All Subcategories'}
              dismissOnClick={true}
              className="w-full md:w-auto"
              placement="bottom-end"
              renderTrigger={() => (
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {selectedSubcategory === 'All' ? 'All Subcategories' : subcategories.find(subcat => subcat.id === selectedSubcategory)?.subcat_eng || 'All Subcategories'}
                  <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              )}
            >
              <div className="py-1">
                <Dropdown.Item onClick={() => handleSubcategoryChange('All')}>
                  All Subcategories
                </Dropdown.Item>
                {subcategories.map((subcategory) => (
                  <Dropdown.Item
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                  >
                    {subcategory.subcat_eng}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          )}
        </div>

        <div className="w-[80%] mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[87px]">
            {filteredProducts.map((item, index) => (
              <RestoCard
                key={index}
                img={`${API_BASE_URL}${item.image}`}
                title={useLanguageText({
                  country_eng: item.product_eng,
                  country_ar: item.productar,
                  country_mal: item.productmal,
                  country_hin: item.producthin
                })}
                normal_price={item.price}
                type={item.type} 
                offer_price={item.offer_price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopMenu;