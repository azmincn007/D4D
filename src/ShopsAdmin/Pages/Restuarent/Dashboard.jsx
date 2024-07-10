import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Navbardashboard from "../../Components/Navbardashboard";
import "./restuarentdashboard.css";
import { IoMdAdd } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import ProfileModal from "../../Modal/Profile";
import EditDetailsModal from "../../Modal/EditDetailsmodal";
import Todayspecial from "../../Modal/Addmenu";
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
import { Dropdown, Label, Select } from "flowbite-react";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
const [subcategories, setSubcategories] = useState([]);

const [selectedFlyerCategory, setSelectedFlyerCategory] = useState("All");
const [selectedFlyerSubcategory, setSelectedFlyerSubcategory] = useState("All");
const [flyerSubcategories, setFlyerSubcategories] = useState([]);

const handleFlyerCategoryChange = (event) => {
  setSelectedFlyerCategory(event.target.value);
  setSelectedFlyerSubcategory("All"); // Reset subcategory when category changes
};

const handleFlyerSubcategoryChange = (event) => {
  setSelectedFlyerSubcategory(event.target.value);
  console.log("Selected Flyer Subcategory:", event.target.value);
};

useEffect(() => {
  const fetchFlyerSubcategories = async () => {
    if (selectedFlyerCategory !== "All") {
      try {
        const category = categories.find(cat => cat.cat_eng === selectedFlyerCategory);
        if (category) {
          const { data } = await axios.get(`https://hezqa.com/api/subcategories/${category.id}`);
          setFlyerSubcategories(data.data.subcategories);
        }
      } catch (error) {
        console.error("Error fetching flyer subcategories:", error);
      }
    } else {
      setFlyerSubcategories([]);
    }
  };
  fetchFlyerSubcategories();
}, [selectedFlyerCategory, categories]);

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
  setSelectedSubcategory("All"); // Reset subcategory when category changes
};

const handleSubcategoryChange = (event) => {
  setSelectedSubcategory(event.target.value);
  console.log("Selected Subcategory:", event.target.value);
};

  const handleCategoriesFetched = (fetchedCategories) => {
    setCategories(fetchedCategories);
  };

  const handleCloseShopFlyerModal = useCallback(() => {
    setIsShopFlyerModalOpen(false);
    setFlyerToEdit(null);
  }, []);


  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory !== "All") {
        try {
          const category = categories.find(cat => cat.cat_eng === selectedCategory);
          if (category) {
            const { data } = await axios.get(`https://hezqa.com/api/subcategories/${category.id}`);
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
  }, [selectedCategory, categories]);   
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`https://hezqa.com/api/categories`);
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
          currency_symbol: response.data.data.country?.currency_symbol,
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
    queryClient.invalidateQueries("categoriesRestuarent");
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
      <Todayspecial currencySymbol={currency_symbol} isOpen={isMenuModalOpen} onClose={toggleMenuModal} modalType="Menu" />
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
      <ShopFlyerAdmin isOpen={isShopFlyerModalOpen} onClose={handleCloseShopFlyerModal} flyerToEdit={flyerToEdit} />
      <ProductDetailsShop isOpen={isProductModalOpen} onClose={toggleProductModal} productToEdit={productToEdit} categories={categories} />

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
              <Categorymap onEditCategory={handleEditCategory} onCategoriesFetched={handleCategoriesFetched} />{" "}
            </div>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add Today's Special</p>
              </div>
              <TodaySpecialCards currencySymbol={currency_symbol} />
            </div>
            <div className="tdtags">
              <div className="flex justify-between items-center mb-4">
                <p className="">Add Your Restaurant Menu</p>
                <div className="flex items-center gap-4">
                  <Select id="countries" className="categoryfilter" required value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.cat_eng}>
                        {category.cat_eng}
                      </option>
                    ))}
                  </Select>
                  <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleMenuModal} />
                </div>
              </div>
              <MenuCardsAdmin currencySymbol={currency_symbol} selectedCategory={selectedCategory} />{" "}
            </div>
          </>
        ) : (
          <>
            <div className="tdtags">
              <div className="flex justify-between items-center">
                <p className="mb-4">Add your Products</p>
                <div className="flex items-center gap-4">
  <Select id="categories" className="categoryfilter" required value={selectedCategory} onChange={handleCategoryChange}>
    <option value="All">All Categories</option>
    {categories.map((category) => (
      <option key={category.id} value={category.cat_eng}>
        {category.cat_eng}
      </option>
    ))}
  </Select>
  {selectedCategory !== "All" && (
    <Select id="subcategories" className="categoryfilter" required value={selectedSubcategory} onChange={handleSubcategoryChange}>
      <option value="All">All Subcategories</option>
      {subcategories.map((subcategory) => (
        <option key={subcategory.id} value={subcategory.subcat_eng}>
          {subcategory.subcat_eng}
        </option>
      ))}
    </Select>
  )}
  <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleProductModal} />
</div>
              </div>
              <ShopCardAdmin 
  currencySymbol={currency_symbol} 
  onEditProduct={handleEditProduct} 
  selectedCategory={selectedCategory}
  selectedSubcategory={selectedSubcategory}
/>         </div>
<div className="tdtags">
            <div className="flex justify-between items-center">
              <p className="mb-4">Add Flyers for Products</p>
              <div className="flex items-center gap-4">
                <Select id="flyer-categories" className="categoryfilter" required value={selectedFlyerCategory} onChange={handleFlyerCategoryChange}>
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.cat_eng}>
                      {category.cat_eng}
                    </option>
                  ))}
                </Select>
                {selectedFlyerCategory !== "All" && (
                  <Select id="flyer-subcategories" className="categoryfilter" required value={selectedFlyerSubcategory} onChange={handleFlyerSubcategoryChange}>
                    <option value="All">All Subcategories</option>
                    {flyerSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.subcat_eng}>
                        {subcategory.subcat_eng}
                      </option>
                    ))}
                  </Select>
                )}
                <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleShopFlyerModal} />
              </div>
            </div>
            <Flyercard 
              onEditFlyer={handleEditFlyer} 
              selectedCategory={selectedFlyerCategory}
              selectedSubcategory={selectedFlyerSubcategory}
            />
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RestuarentDashboard;
