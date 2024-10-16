import React, { useState, useEffect, useRef } from 'react';

const MultiSelectSearch = ({ allProductInfo, onChange, initialSelectedProducts = [], valueKey = 'product_eng', idKey = 'id' }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(allProductInfo);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Log incoming props

  useEffect(() => {
    if (initialSelectedProducts.length > 0) {
      setSelectedValues(initialSelectedProducts);
    }
  }, [initialSelectedProducts]);

  useEffect(() => {
    setFilteredOptions(allProductInfo);
  }, [allProductInfo]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearch = (query) => {
    setQuery(query);
    setLoading(true);
    setTimeout(() => {
      const filtered = allProductInfo.filter(
        (item) => item[valueKey].toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
      setLoading(false);
    }, 300);
  };

  const handleSelect = (option) => {
    setSelectedValues((prev) => {
      const newValues = prev.some((item) => item[idKey] === option[idKey])
        ? prev.filter((item) => item[idKey] !== option[idKey])
        : [...prev, option];
      
      onChange(newValues.map(item => item[idKey]));
      
      return newValues;
    });
  };

  const handleRemove = (id) => {
    setSelectedValues((prev) => {
      const newValues = prev.filter((item) => item[idKey] !== id);
      onChange(newValues.map(item => item[idKey]));
      return newValues;
    });
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="w-full p-3 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <span key={value[idKey]} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              {value[valueKey]}
              <button onClick={() => handleRemove(value[idKey])} className="ml-1.5 text-blue-800 hover:text-blue-900 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
          <input
            type="text"
            className="flex-grow bg-transparent outline-none placeholder-gray-400"
            placeholder={selectedValues.length ? '' : "Search"}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-center text-gray-500">Loading...</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option[idKey]}
                className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${
                  selectedValues.some((item) => item[idKey] === option[idKey]) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option[valueKey]}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectSearch;