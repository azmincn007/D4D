import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../../styles/Cards.css';
import Homecards from '../../Components/Cards/Homecards';
import { FavCountContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import Loading from '../../api/Loading';

// Set the base URL for axios

function FavoriteProducts() {
  const [FavCount, SetFavCount] = useContext(FavCountContext);

  // Fetch favorite products from the API
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

  useEffect(() => {
    if (data && data.data && data.data.favourite_products) {
      const favCount = data.data.favourite_products.length;
      SetFavCount(favCount);
     
    }
  }, [data, SetFavCount]);

  const currencySymbol = '$'; // You can change this as needed

 
  if (error) {
    return navigate('/error404');
  }

  if (isLoading)  {
    return (
      
          <Loading />
  
    );
  }

  const favoriteProducts = data?.data.favourite_products || [];

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Favorite Products
          </div>
        </div>
        <div className="contentscards">
          <div className="cardcontainer">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product) => (
                <Link key={product.id}>
                  <Homecards
                    product={product}
                    currencySymbol={currencySymbol}
                    isRestaurant={false}
                  />
                </Link>
              ))
            ) : (
              <p>No favorite products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteProducts;