import React, { useState, useContext, useEffect } from 'react';
import NationalityModal from '../../../Components/modal/NationalityModal';
import RegionModal from '../../../Components/modal/RegionModal';
import LanguageModal from '../../../Components/modal/LanguageModal';
import { Countrycontext, LanguageContext, RegionContext } from '../../../App';
import Navbardashboard from '../../Components/Navbardashboard';
import './restuarentdashboard.css';
import { IoMdAdd } from 'react-icons/io';
import ProfileModal from '../../Modal/Profile';
import EditDetailsModal from '../../Modal/EditDetailsmodal';
import Todayspecial from '../../Modal/TodaySpecial';
import foodimage from '../../Assets/foodimage.png';
import MenuCardsAdmin from './Components/Menucardicon';
import CategoryAdmin from '../../Modal/Categoryadmin';
import { IoStar } from "react-icons/io5";

function RestuarentDashboard() {
  const [nationality, selectNationality] = useState(false);
  const [region, selectRegion] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isTodaysSpecialModalOpen, setIsTodaysSpecialModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };

  const toggleTodaysSpecialModal = () => {
    setIsTodaysSpecialModalOpen(!isTodaysSpecialModalOpen);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  useEffect(() => {
    if (selectedLanguage) {
      setShowLanguageModal(false);
      selectNationality(true);
    }
    setLoading(false);
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedCountry) {
      selectNationality(false);
      selectRegion(true);
    }
  }, [selectedCountry]);

  const handleRegionSelection = (selectedRegion) => {
    console.log('Selected Region:', selectedRegion);
    setSelectedRegion(selectedRegion);
    selectRegion(false);
  };

  const handleLanguageSelection = (selectedLanguage) => {
    console.log('Selected language:', selectedLanguage);
    setSelectedLanguage(selectedLanguage);
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
  };

  if (loading) {
    return null;
  }

  const foodcardadmin = [{ img: foodimage, price: 10, title: 'Kerala porotta' }];

  return (
    <div>
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSelect={handleLanguageSelection}
      />
      <NationalityModal isOpen={nationality} onClose={() => selectNationality(false)} />
      <RegionModal
        isOpen={region && !selectedRegion}
        onClose={() => selectRegion(false)}
        onSelect={handleRegionSelection}
      />
      <ProfileModal
        isOpen={showProfileModal}
        onClose={handleProfileModalClose}
        onEditProfileClick={openEditDetailsModal}
      />
      <EditDetailsModal 
        isOpen={isEditDetailsModalOpen} 
        onClose={closeEditDetailsModal} 
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
        <Navbardashboard onAvatarClick={handleProfileModalOpen} />
      </div>
      <div className="dashrestbg relative">
        <div className='packagecard flex absolute top-8 right-8'> 
          <IoStar className='w-6 h-6 text-[#FFD814] mr-2'/>
          <p className='text-[16px] font-semibold text-white'>Premium Account</p>
        </div>
      </div>
      <div className="addres py-8 mx-auto w-[80%]">
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add your Categories</p>
            <IoMdAdd
              className="h-5 w-5 cursor-pointer"
              onClick={toggleCategoryModal}
            />
          </div>
        </div>
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add Today's Special</p>
            <IoMdAdd
              className="h-5 w-5 cursor-pointer"
              onClick={toggleTodaysSpecialModal}
            />
          </div>
          <MenuCardsAdmin foodItems={foodcardadmin} />
        </div>
        <div className="tdtags">
          <div className="flex justify-between items-center">
            <p>Add Your Restaurant Menu</p>
            <IoMdAdd
              className="h-5 w-5 cursor-pointer"
              onClick={toggleMenuModal}
            />
          </div>
          <MenuCardsAdmin foodItems={foodcardadmin} />
        </div>
      </div>
    </div>
  );
}

export default RestuarentDashboard;