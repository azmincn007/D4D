import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OfferCardComponent from '../Cards/OfferCard';
import '../../styles/Cards.css';
import { OfferContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import { ShimmerCard } from '../Cards/Shimmer/Shimmer';
import ShimmerOfferCard from '../Cards/Shimmer/ShimmerOffercard';

function OffersPage() {
  const [offerItems, setOfferItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedOfferId } = useContext(OfferContext);

  useEffect(() => {
    const fetchOfferItems = async () => {
      if (!selectedOfferId) {
        setError('No offer ID selected');
        setLoading(false);
        return;
      }

      try {
        // Simulate a 10-second delay
        // await new Promise(resolve => setTimeout(resolve, 10000));

        const response = await axios.get(`${API_BASE_URL}/api/offer-items/${selectedOfferId}`);
        setOfferItems(response.data.data.offer_items);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch offer items');
        setLoading(false);
      }
    };

    fetchOfferItems();
  }, [selectedOfferId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Latest Offers in UAE - Dubai
          </div>
        </div>
        <div className="contentscards">
          <div className="cardcontainer">
            {loading ? (
              // Display ShimmerOfferCard components while loading
              Array(8).fill().map((_, index) => (
                <ShimmerOfferCard key={index} />
              ))
            ) : offerItems && offerItems.length > 0 ? (
              offerItems.map((item) => (
                <Link >
                  <OfferCardComponent image={item.image} />
                </Link>
              ))
            ) : (
              <div>No offer items available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OffersPage;