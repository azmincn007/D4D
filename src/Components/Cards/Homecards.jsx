import React, { useState, useEffect, useContext } from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";
import LazyImage from "../../api/Lazyimage";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LoginContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const Homecards = ({ product, isRestaurant, currencySymbol }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isFavorite, setIsFavorite] = useState(product.is_favourite === 1);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    id,
    image,
    product_eng,
    menu_eng,
    normal_price,
    offer_price,
  } = product;

  const displayName = isRestaurant ? menu_eng : product_eng;

  const checkUserToken = () => {
    const token = localStorage.getItem('usertoken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkUserToken();
    window.addEventListener('storage', checkUserToken);
    return () => {
      window.removeEventListener('storage', checkUserToken);
    };
  }, []);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      return;
    }

    setIsAnimating(true);

    try {
      const token = localStorage.getItem('usertoken');
      const endpoint = isFavorite ? 'remove-favourite' : 'add-favourite';
      const response = await axios.post(`${API_BASE_URL}/api/user/${endpoint}`, 
        { product_id: id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="card font-inter">
      <Card
        theme={Flowbitecard}
        className="cardfl p-1 rounded-[10px]"
      >
       {!isRestaurant ? (
         <Link 
         to="/Shoppage"
         state={{ productId:product.id }}  // Pass only the id as state
         className="block"
       >
            <LazyImage
              src={image}
              alt={`Image of ${displayName}`}
              className="w-full h-[300px]"
            />
          </Link>
        ) : (
          <LazyImage
            src={image}
            alt={`Image of ${displayName}`}
            className="w-full h-[300px]"
          />
        )}
        <div className="mb-2 flex items-center justify-between px-2">
          <div className="">
            <div className="mb-2 flex justify-between items-center">
              <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">
                {displayName}
              </h5>
            </div>
            <div className="flex gap-8 items-center">
              <p className="bg-yellow rounded-full px-4 text-[14px] font-semibold">{currencySymbol}{offer_price}</p>
              <div className="relative">
                <div className="absolute w-full h-[2px] bg-[#FF0000] top-1/2 transform -rotate-12"></div>
                <div className="absolute w-full h-[2px] bg-[#FF0000] top-1/2 transform rotate-12"></div>
                <p className="text-[#696969] text-[16px] font-semibold">{currencySymbol}{normal_price}</p>
              </div>
            </div>
          </div>
          <div>
            {!isRestaurant && isLoggedIn && (
              <div 
                className={`favorite-icon ${isAnimating ? 'animate' : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? 
                  <FaHeart className="h-10 w-10 text-[#DC143C]" />
                :
                  <CiHeart className="h-10 w-10 text-[#DC143C]" />
                }
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Homecards;