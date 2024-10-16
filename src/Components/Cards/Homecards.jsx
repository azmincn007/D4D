import React, { useContext, useState } from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LoginContext, FavCountContext } from "../../App";
import { Link } from "react-router-dom";
import useLanguageText from '../Uselanguagetext';
import { ShimmerCard } from "./Shimmer/Shimmer";
import { API_BASE_URL } from "../../config/config";
import axios from 'axios';

const truncateText = (text, limit) => {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
};

const Homecards = ({ product, isRestaurant, currencySymbol, isLoading }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const [FavCount, SetFavCount] = useContext(FavCountContext);
  
  if (isLoading) {
    return <ShimmerCard />;
  }

  const {
    id,
    image,
    product_eng,
    product_ar,
    product_mal,
    product_hin,
    menu_eng,
    menu_ar,
    menu_mal,
    menu_hin,
    normal_price,
    offer_price,
    is_favourite
  } = product;

  const [isFavorite, setIsFavorite] = useState(is_favourite === 1);

  const displayName = useLanguageText({
    country_eng: isRestaurant ? menu_eng : product_eng,
    country_ar: isRestaurant ? menu_ar : product_ar,
    country_mal: isRestaurant ? menu_mal : product_mal,
    country_hin: isRestaurant ? menu_hin : product_hin,
  });

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      // Handle not logged in state (e.g., show login prompt)
      return;
    }

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
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="card font-inter">
      <Card theme={Flowbitecard} className="cardfl p-1 rounded-[10px]">
        {!isRestaurant ? (
          <Link to={`/Shop-page/${id}`} className="block">
            <img
              src={`${API_BASE_URL}${image}`}
              alt={`Image of ${displayName}`}
              className="w-full h-[300px] Mobile:h-[150px] object-cover"
            />
          </Link>
        ) : (
          <img
            src={`${API_BASE_URL}${image}`}
            alt={`Image of ${displayName}`}
            className="w-full h-[300px] object-cover"
          />
        )}
        <div className="mb-2 flex items-center justify-between px-2">
          <div className="w-full">
            <div className="mb-2 flex justify-between items-center">
              <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter h-[40px] overflow-hidden">
                {truncateText(displayName, 3)}
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
              <div className="favorite-icon" onClick={handleFavoriteClick}>
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