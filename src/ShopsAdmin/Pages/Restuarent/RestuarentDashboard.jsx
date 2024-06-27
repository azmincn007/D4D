import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Navbardashboard from "../../Components/Navbardashboard";
import "./restuarentdashboard.css";
import { IoMdAdd } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import ProfileModal from "../../Modal/Profile";
import EditDetailsModal from "../../Modal/EditDetailsmodal";
import Todayspecial from "../../Modal/TodaySpecial";
import foodimage from "../../Assets/foodimage.png";
import MenuCardsAdmin from "./Components/Menucardicon";
import CategoryAdmin from "../../Modal/Categoryadmin";
import Errorpage404 from "../../../api/Errorpage404";
import Loading from "../../../api/Loading";
import { useNavigate } from "react-router-dom";
import restbg from '../../Assets/restdashbg.png'
import shopbg from '../../Assets/Shopdashbg.png'

function RestuarentDashboard() {
 const navigate=useNavigate()
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isTodaysSpecialModalOpen, setIsTodaysSpecialModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);



  // Determine which background image to use
  
  
  const queryClient = useQueryClient();

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await axios.get("https://hezqa.com/api/restaurent/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        console.log("API Response:", response.data.data.profile);
        return response.data.data.profile;
      } else {
        navigate('/404error')
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      navigate('/404error')
      console.error("API Error:", error);
      throw error;
    }
  };

  const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useQuery({
    queryKey: ["restaurantProfile"],
    queryFn: fetchProfileData,
  });

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };

  const toggleTodaysSpecialModal = () => {
    setIsTodaysSpecialModalOpen(!isTodaysSpecialModalOpen);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleProfileModalOpen = () => {
    setShowProfileModal(true);
  };

  const handleProfileModalClose = () => {
    setShowProfileModal(false);
  };

  const openEditDetailsModal = () => {
    setShowProfileModal(false);
    setIsEditDetailsModalOpen(true);
  };

  const closeEditDetailsModal = () => {
    setIsEditDetailsModalOpen(false);
    // Refetch profile data after closing the edit modal
    queryClient.invalidateQueries(["restaurantProfile"]);
  };

  if (isProfileLoading) {
    return <div><Loading/></div>;
  }

 

  const foodcardadmin = [{ img: foodimage, price: 10, title: "Kerala porotta" }];

  const { shopname_eng, email, region, country } = profileData || {};
 console.log(profileData.type,typeof profileData.type);
 
  const backgroundImage = profileData.type === "2" ? restbg : shopbg;
  const backgroundHeight =  profileData.type === "2" ? '400px' : '680px';
  return (
    <div>
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
      <Todayspecial 
        isOpen={isTodaysSpecialModalOpen} 
        onClose={toggleTodaysSpecialModal} 
        modalType="todaySpecial" 
      />
      <Todayspecial 
        isOpen={isMenuModalOpen} 
        onClose={toggleMenuModal} 
        modalType="Menu" 
      />
      <CategoryAdmin 
        isOpen={isCategoryModalOpen} 
        onClose={toggleCategoryModal} 
      />

      <div className="">
        <Navbardashboard onAvatarClick={handleProfileModalOpen}  profileLogo={profileData?.logo}/>
      </div>
      <div className="dashrestbg relative flex flex-col justify-end min-h-[200px] " style={{ backgroundImage: `url(${backgroundImage}`,height:backgroundHeight}}>
        <div className='bg-black bg-opacity-50 inline-block p-4 rounded font-inter ml-20 mb-20 text-white self-start mb-4'>
          <h1 className='text-lgx font-semibold'>{shopname_eng || "Restaurant name"}</h1>
          <p className='text-base2x'>{email || "Restaurant Email"}</p>
          <div className='text-basex flex gap-2'>
            <p>{region || "City"},</p>
            <p>{country || "Country"}</p>
          </div>
        </div>
        <div className='packagecard flex absolute top-8 right-8'> 
          <IoStar className='w-6 h-6 text-[#FFD814] mr-2'/>
          <p className='text-[16px] font-semibold text-white'>Premium Account</p>
        </div>
      </div>
      <div className="addres py-8 mx-auto w-[80%]">
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add your Categories</p>
            <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleCategoryModal} />
          </div>
        </div>
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add Today's Special</p>
            <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleTodaysSpecialModal} />
          </div>
          <MenuCardsAdmin foodItems={foodcardadmin} />
        </div>
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add Your Restaurant Menu</p>
            <IoMdAdd className="h-5 w-5 cursor-pointer" onClick={toggleMenuModal} />
          </div>
          <MenuCardsAdmin foodItems={foodcardadmin} />
        </div>
      </div>
    </div>
  );
}

export default RestuarentDashboard;