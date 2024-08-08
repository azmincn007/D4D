import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FavCountContext } from "../../App";


const FavoriteCounter = ({ onClick }) => {
  const [FavCount, SetFavCount] = useContext(FavCountContext);


  return (
    <div className="favorite-counter" onClick={onClick}>
      <div className="icon-container">
        <AiOutlineHeart className="heart-icon" />
        <span className="count-badge">{FavCount}</span>
      </div>
    </div>
  );
};

export default FavoriteCounter;