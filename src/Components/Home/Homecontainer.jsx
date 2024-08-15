import React, { useContext, useEffect } from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import Categories from './Categories';
import Restuarents from './Restaurents';
import Categorydropdown from './Components/CategoryDropdown';
import '../../styles/DropdownStyle.css';
import { SelectionContext, ToggleContext, RegionContext, SelectedCategoryContext, SelectedSubCategoryContext, UseridContext, OfferContext, SearchContext, FavCountContext } from '../../App';
import Shop from './Shop';
import Loading from "../../api/Loading";
import FavoriteItems from '../../ShopsAdmin/Components/FavourateList';
import OffersPage from './OffersPage';
import { API_BASE_URL } from '../../config/config';
import SearchProduct from './SearchProduct';


function Homecontainer({ onDataFetched, setResetToAllOffers }) {
  const [selectedValue, setSelectedValue] = useContext(SelectionContext);
  const [ActiveToggle, setActiveToggle] = useContext(ToggleContext);
  const [selectedRegion] = useContext(RegionContext);
  const { selectedCategoryId } = useContext(SelectedCategoryContext);
  const { selectedSubCategoryId } = useContext(SelectedSubCategoryContext);
  const [Userid, setUserid] = useContext(UseridContext);
  const { selectedOfferId, setSelectedOfferId } = useContext(OfferContext);
 const { showSearchProducts, setShowSearchProducts } = useContext(SearchContext);
 const [showFavorites, setShowFavorites] = useContext(FavCountContext);
 const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 console.log(showFavorites);
 
 
console.log(Userid +"id");

 

 
 
 const fetchData = async () => {
  if (!selectedRegion) {
    return null;
  }

  let userId = Userid;  // Use the Userid from context

  let endpoint;
  let data;
  if (selectedValue === "Restaurant") {
    endpoint = `${API_BASE_URL}/api/public/restaurent/home/4`;
    const response = await axios.get(endpoint);
    data = response.data.data;
  } else {
    endpoint = `${API_BASE_URL}/api/public/shop/filter-products`;

    const postData = {
      region_id: selectedRegion,
      cat_id: selectedCategoryId,
      subcat_id: selectedSubCategoryId,
      shop_id: 0,
      user_id: userId,
    };
    const response = await axios.post(endpoint, postData);
    
    data = response.data.data;
  }
  return data;
};
 
 

const { data, isLoading, error, refetch } = useQuery(
  ["data", selectedRegion, selectedValue, selectedCategoryId, selectedSubCategoryId, Userid, "filter-products"],
  fetchData,
  {
    enabled: !!selectedRegion,
  }
);
  useEffect(() => {
    if (selectedRegion && (selectedCategoryId || selectedSubCategoryId)) {
      refetch();
    }
  }, [selectedCategoryId, selectedSubCategoryId, selectedRegion, refetch]);

  useEffect(() => {
    if (data) {
      if (selectedValue === "Restaurant") {
        onDataFetched(data.restaurants || []);
      } else {
        onDataFetched(data.shops || []);
      }
    }
  }, [data, selectedValue, onDataFetched]);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    if (value !== 'Restaurant' && ActiveToggle === 'Offer') {
      setActiveToggle('Product');
    }
  };

  useEffect(() => {
    if (selectedValue === 'Restaurant' && ActiveToggle === 'Product') {
      setActiveToggle('Offer');
    }
  }, [selectedValue, ActiveToggle, setActiveToggle]);

  const renderContent = () => {

    if (showSearchProducts) {
      return <SearchProduct />;
    }
    if (showFavorites) {
      return <FavoriteItems />;
    }

    if (selectedOfferId && selectedOfferId !== 1) {
      return <OffersPage offerId={selectedOfferId} />;
    }

    if (selectedValue === 'Shops' && ActiveToggle === 'Product') {
      return <Shop products={data?.products || []} currencySymbol={data?.shop_details?.currency_symbol}  isLoading={isLoading} />;
    }

    if (selectedValue === 'Restaurant' && ActiveToggle === 'Offer') {
      return <Restuarents menus={data?.menus || []} currencySymbol={data?.country?.currency_symbol || '$'} isLoading={isLoading} />;
    }

    return null;
  };

  const handleCategoryOrSubcategoryChange = () => {
    setShowFavorites(false);
    setSelectedOfferId(1);
    setResetToAllOffers(prev => !prev);
    setShowSearchProducts(false); 
  };

  

  return (
    <div className="homecontainer w-100 flex Tab:flex-col relative">
      
      {error && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
          <div>Error: {error.message}</div>
        </div>
      )}
      <div className="dropdowncontents hidden Tab:block py-4 w-[95%] mx-auto">
     
          <Categorydropdown
            selectedValue={selectedValue}
            onOptionClick={handleOptionClick}
            showInNavbar={true}
          />
     
      </div>
      <div
        className="left Tab:hidden"
        style={{
          minWidth: '280px',
          maxWidth: '330px',
        }}
      >
        <Categories
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
          onCategoryClick={handleCategoryOrSubcategoryChange}
          onSubcategoryClick={handleCategoryOrSubcategoryChange}
        />
      </div>
      <div className="right w-[100%] min-w-24 Tab:w-[100%] pb-16">
        {renderContent()}
      </div>
    </div>
  );
}

export default Homecontainer;