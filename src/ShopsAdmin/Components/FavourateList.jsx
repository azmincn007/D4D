import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../../styles/Cards.css';
import Homecards from '../../Components/Cards/Homecards';
import { FavCountContext } from '../../App';
import { API_BASE_URL } from '../../config/config';

function FavoriteProducts() {
  const [FavCount, SetFavCount] = useContext(FavCountContext);
  const navigate = useNavigate();

  const fetchFavoriteProducts = async () => {
    const token = localStorage.getItem('usertoken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_BASE_URL}/api/user/favourite-products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  };

  const { data, isLoading, error } = useQuery('favoriteProducts', fetchFavoriteProducts);


  if (error) return navigate('/404error');

  const favoriteProducts = data?.data?.favourite_products || [];

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Favorite Products
          </div>
        </div>
        <div className="contentscards">
          {isLoading ? (
            <div className="cardcontainer">
              {Array(12).fill().map((_, index) => (
                <Homecards key={index} isLoading={true} />
              ))}
            </div>
          ) : favoriteProducts.length > 0 ? (
            <div className="cardcontainer">
              {favoriteProducts.map((product) => (
                <Link key={product.id}>
                  <Homecards
                    product={product}
                    isRestaurant={false}
                    isLoading={false}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className='font-semibold text-lg text-gray-600'>No favorite products available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteProducts;