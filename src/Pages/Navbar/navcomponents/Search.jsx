import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/config';
import { SearchContext } from '../../../App';
import useLanguageText from '../../../Components/Uselanguagetext';

const Search = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState('');
  const { setShowSearchProducts, searchResults, setSearchResults } = useContext(SearchContext);
  const storedLanguage = localStorage.getItem('userLanguageSelected');

  const handleSearchButtonClick = () => {
    setShowSearchProducts(true);
  };

  const getLangCode = (language) => {
    switch (language) {
      case 'Arabic':
        return 'ar';
      case 'Hindi':
        return 'hin';
      case 'Malayalam':
        return 'mal';
      default:
        return 'eng';
    }
  };

  const handleSearch = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/public/shop/search-products`, {
          region_id: 4,
          user_id: 0,
          lang: getLangCode(storedLanguage),
          search_key: query,
        });

        if (response.data && response.data.data) {
          setSearchResults(Object.values(response.data.data.products));
        } else {
          console.error('Unexpected API response structure:', response.data);
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKey.length >= 3) {
        handleSearch(searchKey);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  const placeholderText = useLanguageText({
    country_eng: "🔍 Search for items, brands and inspiration",
    country_ar: "🔍 ابحث عن المنتجات والعلامات التجارية والإلهام",
    country_mal: "🔍 ഉൽപ്പന്നങ്ങൾ, ബ്രാൻഡുകൾ, പ്രചോദനം എന്നിവ തിരയുക",
    country_hin: "🔍 वस्तुओं, ब्रांड्स और प्रेरणा के लिए खोजें"
  });

  const searchButtonText = useLanguageText({
    country_eng: "Search",
    country_ar: "بحث",
    country_mal: "തിരയുക",
    country_hin: "खोज"
  });

  const getProductName = (product) => {
    const langCode = getLangCode(storedLanguage);
    return product[`product_${langCode}`] || product.product_eng;
  };

  return (
    <div className="flex w-full relative">
      <input
        type="text"
        className="inputfield text-xsm Tab:text-xs flex-grow"
        placeholder={placeholderText}
        name="searchInput"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="navbutton text-black text-semibold" onClick={handleSearchButtonClick}>
        {searchButtonText}
      </button>
      {searchKey.length >= 3 && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b shadow-lg z-10">
          {searchResults.map((product, index) => (
            <li key={index}>
              <Link
                to="/Shoppage"
                state={{ productId: product.id }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSearch(product.shopname_eng);
                  setSearchKey('');
                  setSearchResults([]);
                }}
              >
                {getProductName(product)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;