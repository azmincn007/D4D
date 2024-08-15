import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FavCountContext } from "../../App";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config/config";

const FavoriteCounter = ({ onClick }) => {
  const [FavCount, SetFavCount] = useContext(FavCountContext);
  const [showFavorites, setShowFavorites] = useContext(FavCountContext);

  const userToken = localStorage.getItem("usertoken");


  const handleClick = () => {
    onClick();
  
    setShowFavorites(true)
  };

  return (
    <div className="favorite-counter" onClick={handleClick}>
      <div className="icon-container">
        <AiOutlineHeart className="heart-icon" />
      </div>
    </div>
  );
};

export default FavoriteCounter;