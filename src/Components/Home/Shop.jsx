import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button } from 'flowbite-react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import Filter from '../Mobile/Filter';
import Homecards from '../Cards/Homecards';
import '../../styles/Cards.css';

function Shop({ products, currencySymbol, isLoading }) {
  const [filterActive, setFilterActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const storedCurrencySymbol = localStorage.getItem('currencySymbol');
  const [displayCount, setDisplayCount] = useState(15);
  const [hasReceivedData, setHasReceivedData] = useState(false);

  useEffect(() => {
    if (products.length > 0 || !isLoading) {
      setHasReceivedData(true);
    }
    filterAndSortProducts();
  }, [products, sortOption, priceRange, isLoading]);

  const handleCloseFilter = () => {
    setFilterActive(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product =>
      product.offer_price >= priceRange.min && product.offer_price <= priceRange.max
    );

    switch (sortOption) {
      case "Price (Low to High)":
        filtered.sort((a, b) => a.offer_price - b.offer_price);
        break;
      case "Price (High to Low)":
        filtered.sort((a, b) => b.offer_price - a.offer_price);
        break;
      default:
        // "All" option, no sorting needed
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 15);
  };

  return (
    <div className="mobileshop">
      <div className="contentsdiv px-8 border-t-2 border-[#14202f]">
        {filterActive &&
          <Filter
            onClose={handleCloseFilter}
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        }
        <div className='flex justify-between py-2 items-center'>
          <div className="contentshead font-inter text-black font-semibold py-2">
            Latest Compu Cell in UAE - Dubai
          </div>
          <div className='flex items-center'>
            <div className="flex items-center mr-[2rem]" onClick={() => setFilterActive(!filterActive)}>
              {filterActive ? (
                <FaFilter className="mr-[0.5rem] w-6 h-6 text-yellow" />
              ) : (
                <FiFilter className="mr-[0.5rem] w-6 h-6" />
              )}
              <Label htmlFor="filter" className="Mobile:text-xs" id='filter'>
                Filter
              </Label>
            </div>
          </div>
        </div>
        <div className="contentscards">
          {isLoading ? (
            <div className="cardcontainer">
              {Array(15).fill().map((_, index) => (
                <Homecards key={index} isLoading={true} />
              ))}
            </div>
          ) : hasReceivedData && filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className='font-semibold text-lg text-gray-600'>No products available</p>
            </div>
          ) : (
            <div className="cardcontainer">
              {filteredProducts.slice(0, displayCount).map((product, index) => (
                <Link key={index}>
                  <Homecards
                    product={product}
                    currencySymbol={storedCurrencySymbol}
                    isRestaurant={false}
                    isLoading={false}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        {!isLoading && filteredProducts.length > 0 && displayCount < filteredProducts.length && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleShowMore}>Show More</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;