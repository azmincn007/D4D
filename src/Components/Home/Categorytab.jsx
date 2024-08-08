import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { OfferContext } from '../../App'; // Adjust the import path as needed
import { API_BASE_URL } from '../../config/config';

function Categorytab({ resetToAllOffers }) {
  const [activeTab, setActiveTab] = useState(0);
  const { selectedOfferId, setSelectedOfferId } = useContext(OfferContext);

  const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/offers`);
    return response.data.data.offers;
  };

  const { data: caTabs, isLoading, error } = useQuery('offers', fetchCategories);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

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
          {obj.offer_title_eng}
        </div>
      ))}
    </div>
  );
}

export default Categorytab;