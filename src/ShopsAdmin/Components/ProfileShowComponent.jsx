import { useState } from "react";
import ProfileShow from "../Modal/Profileshow";
import { useNavigate } from "react-router-dom";

const ProfileShowComponent = () => {
  const navigate =useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleEditProfileClick = () => {
    navigate('/subscription')
    // Handle edit profile logic here
   
  };

  return (
    <>
      {/* Your profile show component JSX */}
      <ProfileShow 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onEditProfileClick={handleEditProfileClick}
      />
    </>
  );
};

export default ProfileShowComponent;