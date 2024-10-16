import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { OfferContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import useLanguageText from '../Uselanguagetext';
import { useNavigate } from 'react-router-dom';

// Shimmer effect component
const ShimmerEffect = () => (
  <div className="w-full bg-darkblue flex justify-center py-2 animate-pulse">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-8 bg-darkblue rounded mx-2 w-20"></div>
    ))}
  </div>
);

function Categorytab({ resetToAllOffers }) {
  const [activeTab, setActiveTab] = useState(0);
  const { selectedOfferId, setSelectedOfferId } = useContext(OfferContext);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/offers`);
    return response.data.data.offers;
  };

  const { data: caTabs, isLoading, error } = useQuery('offers', fetchCategories, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 0,
  });

  useEffect(() => {
    if (caTabs) {
      const allOffersIndex = caTabs.findIndex(tab => tab.id === 1);
      if (allOffersIndex !== -1) {
        setActiveTab(allOffersIndex);
        setSelectedOfferId(1);
      }
    }
  }, [caTabs, setSelectedOfferId, resetToAllOffers]);

  const handleTabClick = (index, offerId) => {
    setActiveTab(index);
    setSelectedOfferId(offerId);
  };

  if (error) return navigate('/404error');
    if (isLoading) return <ShimmerEffect />;

  return (
    <div className='w-full bg-darkblue flex justify-center text-white py-2 Mobile:text-[8px] Tab:text-xs text-small font-inter'>
      {caTabs.map((obj, index) => (
        <div
          key={index}
          className={`singletabs py-2 ${index === 0 ? 'pl-1' : 'pl-7 Tab:pl-2'} ${
            index === caTabs.length - 1 ? 'pr-1' : 'pr-7 Tab:pr-2'
          } cursor-pointer`}
          style={{
            borderBottom: '2px solid rgba(241, 241, 241, 0.5)',
            borderColor: activeTab === index ? 'white' : '#F1F1F1A0',
            color: activeTab === index ? 'white' : '#F1F1F1A0',
          }}
          onClick={() => handleTabClick(index, obj.id)}
        >
          {useLanguageText({
            country_eng: obj.offer_title_eng,
            country_ar: obj.offer_title_ar,
            country_mal: obj.offer_title_mal,
            country_hin: obj.offer_title_hin
          })}
        </div>
      ))}
    </div>
  );
}

export default Categorytab;