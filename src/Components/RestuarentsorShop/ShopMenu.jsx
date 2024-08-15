import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import RatingComponent from "./Rating";
import RestoCard from "../Cards/Restocard";
import useLanguageText from '../Uselanguagetext';
import { LanguageContext } from "../../App";
import { useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { API_BASE_URL } from "../../config/config";

const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

const fetchShopData = async (shopId) => {
  const cachedData = localStorage.getItem(`shopData_${shopId}`);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const requestData = {
    region_id: 4,
    cat_id: 0,
    subcat_id: 0,
    shop_id: shopId,
    user_id: 1,
  };

  const response = await axios.post(`${API_BASE_URL}/api/public/shop/filter-products`, requestData);
  const { data } = response;

  const shopData = {
    shopDetails: data.data.shop_details,
    products: data.data.products,
  };

  localStorage.setItem(`shopData_${shopId}`, JSON.stringify({
    data: shopData,
    timestamp: Date.now()
  }));

  return shopData;
};

const fetchCategories = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/categories`);
  return data.data.categories.map(category => ({
    ...category,
    cat_eng: category.cat_eng,
    cat_ar: category.cat_ar,
    cat_mal: category.cat_mal,
    cat_hin: category.cat_hin
  }));
};

const fetchSubcategories = async (categoryId) => {
  if (!categoryId || categoryId === "All") return [];
  const { data } = await axios.get(`${API_BASE_URL}/api/subcategories/${categoryId}`);
  return data.data.subcategories.map(subcategory => ({
    ...subcategory,
    subcat_eng: subcategory.subcat_eng,
    subcat_ar: subcategory.subcat_ar,
    subcat_mal: subcategory.subcat_mal,
    subcat_hin: subcategory.subcat_hin
  }));
};

function ShopMenu() {
  const [selectedLanguage] = useContext(LanguageContext);
  const location = useLocation();
  const shopId = location.state?.id;

  const [selectedShopCategory, setSelectedShopCategory] = useState({ id: "All", name: "All" });
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [visibleProducts, setVisibleProducts] = useState(12);

  const [shopData, setShopData] = useState(null);
  const [isShopDataLoading, setIsShopDataLoading] = useState(true);
  const [shopDataError, setShopDataError] = useState(null);

  useEffect(() => {
    const loadShopData = async () => {
      if (shopId) {
        try {
          setIsShopDataLoading(true);
          const data = await fetchShopData(shopId);
          setShopData(data);
          setIsShopDataLoading(false);
        } catch (error) {
          setShopDataError(error);
          setIsShopDataLoading(false);
        }
      }
    };

    loadShopData();
  }, [shopId]);

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
    ["subcategories", selectedShopCategory.id],
    () => fetchSubcategories(selectedShopCategory.id),
    {
      enabled: selectedShopCategory.id !== "All",
    }
  );

  const handleShopCategoryChange = (categoryId, categoryName) => {
    setSelectedShopCategory({ id: categoryId, name: categoryName });
    setSelectedSubcategory("All");
    setVisibleProducts(12);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setVisibleProducts(12);
  };

  const filterProducts = (products, categoryName, subcategoryName) => {
    return products.filter(product => {
      const categoryMatch = categoryName === 'All' || product.cat_eng === categoryName;
      const subcategoryMatch = subcategoryName === 'All' || product.subcat_eng === subcategoryName;
      return categoryMatch && subcategoryMatch;
    });
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prevVisible => prevVisible + 12);
  };

  const productsText = useLanguageText({
    country_eng: "Products",
    country_ar: "منتجات",
    country_mal: "ഉൽപ്പന്നങ്ങൾ", 
    country_hin: "उत्पाद"
  });

  return (
    <div className="">
      <div className="bgresto min-h-[100vh] bg-cover bg-no-repeat">
        <div className="w-[90%] font-inter mx-auto">
          <div className="mx-6 rounded-[12px] flex justify-center w-full text-center Mobile:w-[270px] ">
            <div className="px-6 py-4 text-white flex flex-col bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg my-20">
              <div className="flex items-center justify-center mb-2">
                <div className="text-[26px] font-semibold text-white mr-[5px] Mobile:text-[12px] LgMobile:text-[18px]">
                  {useLanguageText({
                    country_eng: shopData?.shopDetails.shopname_eng,
                    country_ar: shopData?.shopDetails.shopname_ar,
                    country_mal: shopData?.shopDetails.shopname_mal,
                    country_hin: shopData?.shopDetails.shopname_hin
                  })}
                </div>
                <div>
                  <RatingComponent rating={shopData?.shopDetails.ratings} />
                </div>
              </div>
              <div className="text-xs">
                <p>{useLanguageText({
                  country_eng: shopData?.shopDetails.country_eng,
                  country_ar: shopData?.shopDetails.country_ar,
                  country_mal: shopData?.shopDetails.country_mal,
                  country_hin: shopData?.shopDetails.country_hin
                })}</p>
                <p>
                  {shopData?.shopDetails.city} - {useLanguageText({
                    country_eng: shopData?.shopDetails.region_eng,
                    country_ar: shopData?.shopDetails.region_ar,
                    country_mal: shopData?.shopDetails.region_mal,
                    country_hin: shopData?.shopDetails.region_hin
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

        <div className="w-[90%] mx-auto my-4 flex justify-end space-x-4 dropdownrescat">
          <Dropdown
            label={selectedShopCategory.name === 'All' 
              ? useLanguageText({
                  country_eng: 'All Categories',
                  country_ar: 'جميع الفئات',
                  country_mal: 'എല്ലാ വിഭാഗങ്ങളും',
                  country_hin: 'सभी श्रेणियाँ'
                }) 
              : useLanguageText({
                  country_eng: selectedShopCategory.name,
                  country_ar: categories?.find(cat => cat.cat_eng === selectedShopCategory.name)?.cat_ar,
                  country_mal: categories?.find(cat => cat.cat_eng === selectedShopCategory.name)?.cat_mal,
                  country_hin: categories?.find(cat => cat.cat_eng === selectedShopCategory.name)?.cat_hin
                }) || 'All Categories'
            }
            dismissOnClick={true}
            className="w-full md:w-auto"
            placement="bottom-end"
          >
            <Dropdown.Item onClick={() => handleShopCategoryChange('All', 'All')}>
              {useLanguageText({
                country_eng: 'All Categories',
                country_ar: 'جميع الفئات',
                country_mal: 'എല്ലാ വിഭാഗങ്ങളും',
                country_hin: 'सभी श्रेणियाँ'
              })}
            </Dropdown.Item>
            {categories?.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => handleShopCategoryChange(category.id, category.cat_eng)}
              >
                {useLanguageText({
                  country_eng: category.cat_eng,
                  country_ar: category.cat_ar,
                  country_mal: category.cat_mal,
                  country_hin: category.cat_hin
                })}
              </Dropdown.Item>
            ))}
          </Dropdown>

          {selectedShopCategory.id !== "All" && (
            <div className="flex items-center">
              <Dropdown
                label={selectedSubcategory === 'All' 
                  ? useLanguageText({
                      country_eng: 'All Subcategories',
                      country_ar: 'جميع الفئات الفرعية',
                      country_mal: 'എല്ലാ ഉപവിഭാഗങ്ങളും',
                      country_hin: 'सभी उपश्रेणियाँ'
                    }) 
                  : useLanguageText({
                      country_eng: selectedSubcategory,
                      country_ar: subcategories?.find(subcat => subcat.subcat_eng === selectedSubcategory)?.subcat_ar,
                      country_mal: subcategories?.find(subcat => subcat.subcat_eng === selectedSubcategory)?.subcat_mal,
                      country_hin: subcategories?.find(subcat => subcat.subcat_eng === selectedSubcategory)?.subcat_hin
                    }) || 'All Subcategories'
                }
                dismissOnClick={true}
                className="w-full md:w-auto"
                placement="bottom-end"
              >
                <Dropdown.Item onClick={() => handleSubcategoryChange('All')}>
                  {useLanguageText({
                    country_eng: 'All Subcategories',
                    country_ar: 'جميع الفئات الفرعية',
                    country_mal: 'എല്ലാ ഉപവിഭാഗങ്ങളും',
                    country_hin: 'सभी उपश्रेणियाँ'
                  })}
                </Dropdown.Item>
                {subcategories?.map((subcategory) => (
                  <Dropdown.Item
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.subcat_eng)}
                  >
                    {useLanguageText({
                      country_eng: subcategory.subcat_eng,
                      country_ar: subcategory.subcat_ar,
                      country_mal: subcategory.subcat_mal,
                      country_hin: subcategory.subcat_hin
                    })}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )}
        </div>

        <div className="w-[90%] mx-auto py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {isShopDataLoading
            ? Array(12).fill().map((_, index) => <RestoCard key={index} isLoading={true} />)
            : filterProducts(shopData?.products || [], selectedShopCategory.name, selectedSubcategory)
                .slice(0, visibleProducts)
                .map((item, index) => (
                  <RestoCard
                    key={index}
                    img={`${API_BASE_URL}${item.image}`}
                    title={useLanguageText({
                      country_eng: item.product_eng,
                      country_ar: item.product_ar,
                      country_mal: item.product_mal,
                      country_hin: item.product_hin
                    })}
                    normal_price={item.normal_price}
                    type={item.type} 
                    id={item.id}
                    offer_price={item.offer_price}
                    className="shop-menu-card"
                    isLoading={false}
                    showVegIcon={false} 
                  />
                ))}
          </div>
          {!isShopDataLoading && shopData?.products && visibleProducts < filterProducts(shopData.products, selectedShopCategory.name, selectedSubcategory).length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreProducts}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {useLanguageText({
                  country_eng: "Show More",
                  country_ar: "أظهر المزيد",
                  country_mal: "കൂടുതൽ കാണിക്കുക",
                  country_hin: "और दिखाएं"
                })}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopMenu;