import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { Select } from "flowbite-react";

import Navbardashboard from "../../Components/Navbardashboard";
import ProfileModal from "../../Modal/Profile";
import EditDetailsModal from "../../Modal/EditDetailsmodal";
import Todayspecial from "../../Modal/Addmenu";
import CategoryAdmin from "../../Modal/Categoryadmin";
import ShopFlyerAdmin from "../../Modal/components/ShopFLyeradmin";
import ProductDetailsShop from "../../Modal/components/ProductDetailsShop";
import Errorpage404 from "../../../api/Errorpage404";

import Categorymap from "./Components/Categorymap";
import TodaySpecialCards from "./Components/Todayspecialcard";
import MenuCardsAdmin from "./Components/Menucardicon";
import ShopCardAdmin from "./Components/ShopCardadmin";
import Flyercard from "./Components/Flyercard";

import "./restuarentdashboard.css";
import { API_BASE_URL } from "../../../config/config";
import PlanComponent from "./PlanComponent";

const shimmerStyle = {
  animation: 'shimmer 2s infinite linear animate-pulse',
  

  // background: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
  backgroundSize: '1000px 100%',
};

const ShimmerBackground = () => (
  <div className="w-full h-[400px] bg-gray-300" style={shimmerStyle}></div>
);

const ShimmerContent = () => (
  <div className="w-4/5 mx-auto py-8 space-y-8 animate-pulse  bg-gray-300"style={shimmerStyle}>
    <div className="h-50 w-full rounded-md" style={shimmerStyle}></div>
    <div className="h-50 w-full rounded-md" style={shimmerStyle}></div>
    <div className="h-50 w-full rounded-md" style={shimmerStyle}></div>
  </div>
);

function RestuarentDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isShopFlyerModalOpen, setIsShopFlyerModalOpen] = useState(false);

  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [flyerToEdit, setFlyerToEdit] = useState(null);

  const [restaurantCategories, setRestaurantCategories] = useState([]);
  const [shopCategories, setShopCategories] = useState([]);
  const [selectedRestaurantCategory, setSelectedRestaurantCategory] = useState("All");
  const [selectedShopCategory, setSelectedShopCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [subcategories, setSubcategories] = useState([]);
  const [allProductInfo, setAllProductInfo] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [flyerCount, setFlyerCount] = useState(0);

  const handleProductsLoad = useCallback((productInfo) => {
    setAllProductInfo(productInfo);
  }, []);

  const handleRestaurantCategoryChange = (event) => {
    setSelectedRestaurantCategory(event.target.value);
  };

  const handleShopCategoryChange = (event) => {
    setSelectedShopCategory(event.target.value);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const fetchRestaurantCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get(`${API_BASE_URL}/api/restaurent/all-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurantCategories(data.data.categories);
    } catch (error) {
      console.error("Error fetching restaurant categories:", error);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleCategoriesFetched = (fetchedCategories) => {
    if (fetchedCategories.length > 0) {
      setRestaurantCategories(fetchedCategories);
    }
  };

  useEffect(() => {
    fetchRestaurantCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedShopCategory !== "All") {
        try {
          const category = shopCategories.find((cat) => cat.cat_eng === selectedShopCategory);
          if (category) {
            const { data } = await axios.get(`${API_BASE_URL}/api/subcategories/${category.id}`);
            setSubcategories(data.data.subcategories);
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedShopCategory, shopCategories]);

  useEffect(() => {
    const fetchShopCategories = async () => {
      setIsCategoryLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/categories`);
        setShopCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching shop categories:", error);
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchShopCategories();
  }, []);

  const fetchProfileData = async () => {

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/api/restaurent/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return {
          ...response.data.data.profile,
          country: response.data.data.country?.country_eng,
          region: response.data.data.region?.region_eng,
          currency_symbol: response.data.data.country?.currency_symbol,
        };
      }
      throw new Error("Unexpected response status");
    } catch (error) {
      console.error("API Error:", error);
      navigate("/404error");
      throw error;
    }
  };

  const fetchSubscriptionData = async () => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_BASE_URL}/api/shop/current-plan`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    
    return response.data;
  };

  const { data: subscriptionData, isLoading: isSubscriptionLoading, isError: isSubscriptionError } = useQuery("subscriptionData", fetchSubscriptionData);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["restaurantProfile"],
    queryFn: fetchProfileData,
  });

  const toggleModal = (setterFn) => () => setterFn((prev) => !prev);
  const toggleMenuModal = toggleModal(setIsMenuModalOpen);
  const toggleCategoryModal = toggleModal(setIsCategoryModalOpen);
  const toggleProductModal = toggleModal(setIsProductModalOpen);
  const toggleShopFlyerModal = toggleModal(setIsShopFlyerModalOpen);

  const handleProfileModalOpen = () => setShowProfileModal(true);
  const handleProfileModalClose = () => setShowProfileModal(false);

  const openEditDetailsModal = () => {
    setShowProfileModal(false);
    setIsEditDetailsModalOpen(true);
  };

  const closeEditDetailsModal = () => {
    setIsEditDetailsModalOpen(false);
    queryClient.invalidateQueries(["restaurantProfile"]);
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsProductModalOpen(true);
  };

  const handleEditFlyer = (flyer) => {
    setFlyerToEdit(flyer);
    setIsShopFlyerModalOpen(true);
  };

  if (isProfileError) return <Errorpage404 />;



  const { shopname_eng, email, region, country, currency_symbol, type, background_img, logo } = profileData || {};

  const backgroundHeight = type === "2" ? "400px" : "680px";
  const remainingProducts = subscriptionData?.data?.plan?.product_num - productCount;

  return (
    <div>
      <Navbardashboard onAvatarClick={handleProfileModalOpen} profileLogo={profileData?.logo} />

      {isProfileLoading ? (
        <ShimmerBackground />
      ) : (
        <div
          className="dashrestbg relative flex flex-col justify-end min-h-[200px]"
          style={{
            backgroundImage: `url(${API_BASE_URL}/${profileData?.background_img})`,
            height: profileData?.type === "2" ? "400px" : "680px",
          }}
        >
          <div className="bg-black bg-opacity-50 inline-block p-4 rounded font-inter ml-20 mb-20 text-white self-start">
            <h1 className="text-lgx font-semibold">{profileData?.shopname_eng || "Restaurant name"}</h1>
            <p className="text-base2x">{profileData?.email || "Restaurant Email"}</p>
            <div className="text-basex flex gap-2">
              <p>{profileData?.region || "City"},</p>
              <p>{profileData?.country || "Country"}</p>
            </div>
          </div>
          {!isSubscriptionLoading && !isSubscriptionError && (
            <PlanComponent subscriptionData={subscriptionData} userType={profileData?.type} />
          )}
        </div>
      )}

      <div className="addres py-8 mx-auto w-[80%]">
        {isProfileLoading ? (
          <>
          <div className="flex flex-col gap-10">

          <ShimmerContent  />
          <ShimmerContent />

          <ShimmerContent />
          </div>

          </>
          
          
        ) : (
          <>
            {profileData?.type === "2" ? (
              <>
                <div className="tdtags">
                  <div className="flex justify-between items-center">
                    <p className="mb-4">Add your Categories</p>
                    <IoMdAdd className="h-8 w-8 cursor-pointer" onClick={toggleCategoryModal} />
                  </div>
                  <Categorymap onEditCategory={handleEditCategory} onCategoriesFetched={handleCategoriesFetched} />
                </div>
                <div className="tdtags">
                  <div className="flex justify-between items-center">
                    <p className="mb-4">Add Today's Special</p>
                  </div>
                  <TodaySpecialCards currencySymbol={profileData?.currency_symbol} />
                </div>
                <div className="tdtags">
                  <div className="flex justify-between items-center mb-4">
                    <p className="">Add Your Restaurant Menu</p>
                    <div className="flex items-center gap-4">
                      {!isCategoryLoading && (
                        <Select
                          id="restaurantCategories"
                          className="categoryfilter"
                          required
                          value={selectedRestaurantCategory}
                          onChange={handleRestaurantCategoryChange}
                        >
                          <option value="All">All</option>
                          {restaurantCategories.map((category) => (
                            <option key={category.id} value={category.cat_eng}>
                              {category.cat_eng}
                            </option>
                          ))}
                        </Select>
                      )}
                      <IoMdAdd className="h-8 w-8 cursor-pointer" onClick={toggleMenuModal} />
                    </div>
                  </div>
                  <MenuCardsAdmin currencySymbol={profileData?.currency_symbol} selectedCategory={selectedRestaurantCategory} />
                </div>
              </>
            ) : (
              <>
                <div className="tdtags">
                  <div className="flex justify-between items-center">
                    <p className="mb-4">Add your Products (Remaining: {subscriptionData?.data?.plan?.product_num - productCount})</p>
                    <div className="flex items-center gap-4">
                      {!isCategoryLoading && (
                        <>
                          <Select id="shopCategories" className="categoryfilter" required value={selectedShopCategory} onChange={handleShopCategoryChange}>
                            <option value="All">All Categories</option>
                            {shopCategories.map((category) => (
                              <option key={category.id} value={category.cat_eng}>
                                {category.cat_eng}
                              </option>
                            ))}
                          </Select>
                          {selectedShopCategory !== "All" && (
                            <Select id="subcategories" className="categoryfilter" required value={selectedSubcategory} onChange={handleSubcategoryChange}>
                              <option value="All">All Subcategories</option>
                              {subcategories.map((subcategory) => (
                                <option key={subcategory.id} value={subcategory.subcat_eng}>
                                  {subcategory.subcat_eng}
                                </option>
                              ))}
                            </Select>
                          )}
                        </>
                      )}
 <IoMdAdd 
      className={`h-12 w-12 ${
        subscriptionData?.data?.plan?.product_num - productCount > 0 
          ? 'cursor-pointer text-current' 
          : 'cursor-not-allowed text-red-500'
      }`} 
      onClick={
        subscriptionData?.data?.plan?.product_num - productCount > 0 
          ? toggleProductModal 
          : undefined
      }
    />                    </div>
                  </div>
                  <ShopCardAdmin
  currencySymbol={profileData?.currency_symbol}
  selectedCategory={selectedShopCategory}
  selectedSubcategory={selectedSubcategory}
  onEditProduct={handleEditProduct}
  onProductsLoad={handleProductsLoad}
  setProductCount={setProductCount}  // This line is correct
/>
                </div>
                <div className="tdtags">
                  <div className="flex justify-between items-center">
                    <p className="mb-4">Add your Shop Flyers  (Remaining: {subscriptionData?.data?.plan?.offers - flyerCount})</p>
                    <IoMdAdd 
    className={`h-12 w-12 ${
      subscriptionData?.data?.plan?.offers - flyerCount > 0 
        ? 'cursor-pointer text-current' 
        : 'cursor-not-allowed text-red-500'
    }`} 
    onClick={
      subscriptionData?.data?.plan?.offers - flyerCount > 0 
        ? toggleShopFlyerModal 
        : undefined
    }
  />                  </div>
                  <Flyercard
                    onEditFlyer={handleEditFlyer}
                    setFlyerCount={setFlyerCount}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {profileData && (
        <>
          <ProfileModal
            isOpen={showProfileModal}
            onClose={handleProfileModalClose}
            onEditProfileClick={openEditDetailsModal}
            profileData={profileData}
          />
          <EditDetailsModal
            isOpen={isEditDetailsModalOpen}
            onClose={closeEditDetailsModal}
            profileData={profileData}
          />
        </>
      )}
      <Todayspecial currencySymbol={profileData?.currency_symbol} isOpen={isMenuModalOpen} onClose={toggleMenuModal} modalType="Menu" />
      <ShopFlyerAdmin
        isOpen={isShopFlyerModalOpen}
        onClose={toggleShopFlyerModal}
        flyerToEdit={flyerToEdit}
        setFlyerToEdit={setFlyerToEdit}
        categories={shopCategories}
        allProductInfo={allProductInfo}
      />
      <CategoryAdmin
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setCategoryToEdit(null);
        }}
        onCategoryAdded={() => {
          queryClient.invalidateQueries("categoriesRestuarent");
          fetchRestaurantCategories();
        }}
        categoryToEdit={categoryToEdit}
      />
      <ProductDetailsShop isOpen={isProductModalOpen} onClose={toggleProductModal} productToEdit={productToEdit} setProductToEdit={setProductToEdit} categories={shopCategories} />
    </div>
  );
}

export default RestuarentDashboard;