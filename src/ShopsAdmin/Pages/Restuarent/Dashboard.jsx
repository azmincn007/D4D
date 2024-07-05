import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Navbardashboard from "../../Components/Navbardashboard";
import "./restuarentdashboard.css";
import { IoMdAdd } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import ProfileModal from "../../Modal/Profile";
import EditDetailsModal from "../../Modal/EditDetailsmodal";
import Todayspecial from "../../Modal/TodaySpecial";
import MenuCardsAdmin from "./Components/Menucardicon";
import CategoryAdmin from "../../Modal/Categoryadmin";
import Errorpage404 from "../../../api/Errorpage404";
import Loading from "../../../api/Loading";
import { useNavigate } from "react-router-dom";
import restbg from "../../Assets/restdashbg.png";
import shopbg from "../../Assets/Shopdashbg.png";
import Addcategoryshop from "../../Modal/components/ShopFLyeradmin";
import ProductDetailsShop from "../../Modal/components/ProductDetailsShop";
import Categorymap from "./Components/Categorymap";
import TodaySpecialCards from "./Components/Todayspecialcard";
import ShopCardAdmin from "./Components/ShopCardadmin";
import ShopFlyerAdmin from "../../Modal/components/ShopFLyeradmin";
import Flyercard from "./Components/Flyercard";
import Flyer from "../../../Pages/Flyer";

function RestuarentDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State for managing various modal visibilities
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isShopCategoryModalOpen, setIsShopCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [flyerToEdit, setFlyerToEdit] = useState(null);
  const [isShopFlyerModalOpen, setIsShopFlyerModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

const handleCloseShopFlyerModal = useCallback(() => {
  setIsShopFlyerModalOpen(false);
  setFlyerToEdit(null);
}, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/categories`);
        setCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleEditFlyer = (flyer) => {
    setFlyerToEdit(flyer);
    setIsShopFlyerModalOpen(true);
  };
  // Function to fetch profile data from API
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await axios.get("https://hezqa.com/api/restaurent/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const profileData = {
          ...response.data.data.profile,
          country: response.data.data.country?.country_eng,
          region: response.data.data.region?.region_eng,
          currency_symbol: response.data.data.country?.currency_symbol
        };
        return profileData;
      } else {
        navigate("/404error");
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      navigate("/404error");
      console.error("API Error:", error);
      throw error;
    }
  };

  // React Query hook for fetching profile data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["restaurantProfile"],
    queryFn: fetchProfileData,
  });

  // Modal toggle functions
  const toggleMenuModal = () => setIsMenuModalOpen(!isMenuModalOpen);
  const toggleCategoryModal = () => setIsCategoryModalOpen(!isCategoryModalOpen);
  const toggleShopCategoryModal = () => setIsShopCategoryModalOpen(!isShopCategoryModalOpen);
  const toggleShopFlyerModal = () => {
    setIsShopFlyerModalOpen(!isShopFlyerModalOpen);
    if (!isShopFlyerModalOpen) {
      setFlyerToEdit(null);
    }
  };
  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
    if (!isProductModalOpen) {
      setProductToEdit(null);
    }
  };

  // Profile modal functions
  const handleProfileModalOpen = () => setShowProfileModal(true);
  const handleProfileModalClose = () => setShowProfileModal(false);

  // Edit details modal functions
  const openEditDetailsModal = () => {
    setShowProfileModal(false);
    setIsEditDetailsModalOpen(true);
  };

  const closeEditDetailsModal = () => {
    setIsEditDetailsModalOpen(false);
    queryClient.invalidateQueries(["restaurantProfile"]);
  };

  const refetchCategories = () => {
    queryClient.invalidateQueries('categoriesRestuarent');
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsProductModalOpen(true);
  };

  if (isProfileLoading) return <Loading />;
  if (isProfileError) return <Errorpage404 />;

  const { shopname_eng, email, region, country, currency_symbol, type } = profileData || {};

  const backgroundImage = type === "2" ? restbg : shopbg;
  const backgroundHeight = type === "2" ? "400px" : "680px";

  

  return (
    <div>
      <ProfileModal isOpen={showProfileModal} onClose={handleProfileModalClose} onEditProfileClick={openEditDetailsModal} profileData={profileData} />
      <EditDetailsModal isOpen={isEditDetailsModalOpen} onClose={closeEditDetailsModal} profileData={profileData} />
      <Todayspecial isOpen={isMenuModalOpen} onClose={toggleMenuModal} modalType="Menu" />
      <ShopFlyerAdmin isOpen={isShopFlyerModalOpen} onClose={toggleShopFlyerModal} flyerToEdit={flyerToEdit} />
      <CategoryAdmin 
        isOpen={isCategoryModalOpen} 
        onClose={() => {
          setIsCategoryModalOpen(false);
          setCategoryToEdit(null);
        }} 
        onCategoryAdded={refetchCategories}
        categoryToEdit={categoryToEdit}
      />
<ShopFlyerAdmin 
  isOpen={isShopFlyerModalOpen}
  onClose={handleCloseShopFlyerModal}
  flyerToEdit={flyerToEdit}
/>   
<ProductDetailsShop 
      isOpen={isProductModalOpen} 
      onClose={toggleProductModal} 
      productToEdit={productToEdit}
      categories={categories}
    />

      <div className="">
        <Navbardashboard onAvatarClick={handleProfileModalOpen} profileLogo={profileData?.logo} />
      </div>

      <div
        className="dashrestbg relative flex flex-col justify-end min-h-[200px]"
        style={{ backgroundImage: `url(${backgroundImage}`, height: backgroundHeight }}
      >
        <div className="bg-black bg-opacity-50 inline-block p-4 rounded font-inter ml-20 mb-20 text-white self-start mb-4">
          <h1 className="text-lgx font-semibold">{shopname_eng || "Restaurant name"}</h1>
          <p className="text-base2x">{email || "Restaurant Email"}</p>
          <div className="text-basex flex gap-2">
            <p>{region || "City"},</p>
            <p>{country || "Country"}</p>
          </div>
        </div>
        <div className="packagecard flex absolute top-12 right-16">
          <IoStar className="w-6 h-6 text-[#FFD814] mr-2" />
          <p className="text-[16px] font-semibold text-white">Premium Account</p>
        </div>
      </div>

      <div className="addres py-8 mx-auto w-[80%]">
        {type === "2" ? (
          <>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add your Categories</p>
                <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleCategoryModal} />
              </div>
              <Categorymap onEditCategory={handleEditCategory} />
            </div>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add Today's Special</p>
              </div>
              <TodaySpecialCards currencySymbol={currency_symbol} />
            </div>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add Your Restaurant Menu</p>
                <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleMenuModal} />
              </div>
              <MenuCardsAdmin currencySymbol={currency_symbol} />
            </div>
          </>
        ) : (
          <>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add your Products</p>
                <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleProductModal} />
              </div>
              <ShopCardAdmin currencySymbol={currency_symbol} onEditProduct={handleEditProduct} />
            </div>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add Flyers for Products</p>
                <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleShopFlyerModal} />              </div>
                <Flyercard onEditFlyer={handleEditFlyer} />        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RestuarentDashboard;