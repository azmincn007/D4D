import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';
import Homecards from '../Cards/Homecards';

function SearchProduct() {
    
  const { searchResults } = useContext(SearchContext);

  
  

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Searched Products
          </div>
        </div>
        <div className="contentscards">
          <div className="cardcontainer">
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
              searchResults.map((product, index) => (
                <Link key={index} to="/Shoppage" state={{ productId: product.id }}>
                  <Homecards
                    product={product}
                    currencySymbol={'$'}
                    isRestaurant={false}
                  />
                </Link>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;