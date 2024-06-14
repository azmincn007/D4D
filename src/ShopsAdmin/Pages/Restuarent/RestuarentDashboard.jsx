import React, { useState, useContext, useEffect } from 'react';
import NationalityModal from '../../../Components/modal/NationalityModal';
import RegionModal from '../../../Components/modal/RegionModal';
import LanguageModal from '../../../Components/modal/LanguageModal';
import { Countrycontext, LanguageContext, RegionContext } from '../../../App';
import Navbardashboard from '../../Components/Navbardashboard';
import './restuarentdashboard.css';
import { IoMdAdd } from "react-icons/io";
import ProfileModal from '../../Modal/Profile';
import EditDetailsModal from '../../Modal/EditDetailsmodal';
import Todayspecial from '../../Modal/TodaySpecial';
import foodimage from '../../Assets/foodimage.png'
import { Card } from 'flowbite-react';
import Flowbitecard from '../../../Themes/Flowbitecard';
import { MdEdit } from "react-icons/md";

function RestuarentDashboard() {
  const [nationality, selectNationality] = useState(false);
  const [region, selectRegion] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isTodaysSpecialModalOpen, setIsTodaysSpecialModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState('');
  const toggleTodaysSpecialModal = (type) => {
    setModalType(type);
    setIsTodaysSpecialModalOpen(!isTodaysSpecialModalOpen);
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

  if (loading) {
    return null;
  }

  const toggleEditDetailsModal = () => {
    setIsEditDetailsModalOpen(!isEditDetailsModalOpen);
  };

  const handleEditProfileClick = () => {
    console.log('asdasdas');
    setShowProfileModal(false); // Close the ProfileModal
    setIsEditDetailsModalOpen(true); // Open the EditDetailsModal
  };

  const foodcardadmin =[{img:foodimage,price:10 ,title:'Kerala porotta'}]


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
        onEditProfileClick={handleEditProfileClick}
      />
        <EditDetailsModal
        isOpen={isEditDetailsModalOpen}
        onClose={toggleEditDetailsModal}
      />

<Todayspecial
  isOpen={isTodaysSpecialModalOpen}
  onClose={toggleTodaysSpecialModal}
  modalType={modalType}
/>
      <div className=''>
        <Navbardashboard onAvatarClick={handleProfileModalOpen} />
      </div>
      <div className='dashrestbg'></div>
      <div className='addres py-8  mx-auto w-[80%]'>
        <div className='tdtags '>
          <div className='flex justify-between items-center'>
          <p>add todays special</p>
          <IoMdAdd className='h-5 w-5' onClick={() => toggleTodaysSpecialModal('todaySpecial')} />
          </div>

          <div className='cardrestoadmin'>
      {foodcardadmin.map((item, index) => (
        <Card
          key={index}
          theme={Flowbitecard}
          className="cardres relative max-w-[220px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px]"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={item.img}
        >
          <div className="cardcontentsres">
            <div className='flex justify-between items-center px-4'>
            <h5 className=" text-[13px] py-4 font-bold tracking-tight text-gray-900 dark:text-white font-inter Mobile:text-[6px] TabS:text-[6px]">
              {item.title}
            </h5>
            <div className='bg-yellow rounded-full'><MdEdit className='text-black h-[20px] w-[20px] m-1'/></div>
            </div>
           
      
            <div className="absolute h-[50px] Mobile:h-[15px] w-[96%] bottom-[65px] Mobile:bottom-[50px] p-0 bg-[rgba(0,0,0,0.5)] flex items-center">
              <p className="text-white text-20px font-semibold px-[5%] Mobile:text-[5px]">
                {item.price}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
         
        </div>
        <div className='tdtags'>
        <div className='flex justify-between items-center'>
        <p>add Your Restuarent Menu</p>
          <IoMdAdd className='h-5 w-5' onClick={() => toggleTodaysSpecialModal('Menu')} />
          </div>
          <div className='cardrestoadmin'>
      {foodcardadmin.map((item, index) => (
        <Card
          key={index}
          theme={Flowbitecard}
          className="cardres relative max-w-[220px] p-1 shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,_rgba(0,0,0,0.04)_0px_10px_10px_-5px]"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={item.img}
        >
          <div className="cardcontentsres">
            <div className='flex justify-between items-center px-4'>
            <h5 className=" text-[13px] py-4 font-bold tracking-tight text-gray-900 dark:text-white font-inter Mobile:text-[6px] TabS:text-[6px]">
              {item.title}
            </h5>
            <div className='bg-yellow rounded-full'><MdEdit className='text-black h-[20px] w-[20px] m-1'/></div>
            </div>
           
      
            <div className="absolute h-[50px] Mobile:h-[15px] w-[96%] bottom-[65px] Mobile:bottom-[50px] p-0 bg-[rgba(0,0,0,0.5)] flex items-center">
              <p className="text-white text-20px font-semibold px-[5%] Mobile:text-[5px]">
                {item.price}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
     
        </div>
      </div>
    </div>
  );
}

export default RestuarentDashboard;