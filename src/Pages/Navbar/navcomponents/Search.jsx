import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/config';
import { SearchContext } from '../../../App';

const Search = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState('');
  const { setShowSearchProducts, searchResults, setSearchResults } = useContext(SearchContext);

  const handleSearchButtonClick = () => {
    setShowSearchProducts(true);
  };

  const handleSearch = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/public/shop/search-products`, {
          region_id: 4,
          user_id: 0,
          lang: 'eng',
          search_key: query,
        });

        console.log('API Response:', response.data.data);

        if (response.data && response.data.data) {
          setSearchResults(response.data.data.products); // Store the entire response data in the context
        } else {
          console.error('Unexpected API response structure:', response.data);
          setSearchResults({});
        }
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults({});
      }
    } else {
      setSearchResults({});
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKey.length >= 3) {
        handleSearch(searchKey);
      } else {
        setSearchResults({});
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  return (
    <div className="flex w-full relative">
      <input
        type="text"
        className="inputfield text-xsm Tab:text-xs flex-grow"
        placeholder="🔍 Search for items, brands and inspiration"
        name="searchInput"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button
        className="navbutton text-black text-semibold"
        onClick={handleSearchButtonClick}
      >
        Search
      </button>
      {searchKey.length >= 3 && searchResults.products && searchResults.products.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b shadow-lg z-10">
          {searchResults.products.map((product, index) => (
            <li key={index}>
              <Link
                to="/Shoppage"
                state={{ productId: product.id }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSearch(product.product_eng);
                  setSearchKey('');
                  setSearchResults({});
                }}
              >
                {product.product_eng}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
