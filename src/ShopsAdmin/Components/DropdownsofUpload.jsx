import React, { useState } from 'react';
import './basicstyles.css';
import { useQuery } from 'react-query';
import ErrorMessage from '../../Pages/Authentication/ErrorValidation';


const fetchShopTypes = async () => {
  const response = await fetch('https://hezqa.com/api/shop-types');
  if (!response.ok) {
    throw new Error('Failed to fetch shop types');
  }
  return response.json();
};

const fetchCountries = async () => {
  const response = await fetch('https://hezqa.com/api/countries');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};

const fetchRegions = async (countryId) => {
  if (!countryId) return [];
  const response = await fetch(`https://hezqa.com/api/regions/${countryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch regions');
  }
  return response.json();
};



const OrgDropdowns = ({ register, errors }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const { data: shopTypesData, isLoading: shopTypesLoading, error: shopTypesError } = useQuery({
    queryKey: ['shopTypes'],
    queryFn: fetchShopTypes,
  });

  const { data: countriesData, isLoading: countriesLoading, error: countriesError } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  const { data: regionsData, isLoading: regionsLoading, error: regionsError } = useQuery({
    queryKey: ['regions', selectedCountry],
    queryFn: () => fetchRegions(selectedCountry),
    enabled: !!selectedCountry,
  });

  if (shopTypesLoading || countriesLoading) return <div>Loading...</div>;
  if (shopTypesError || countriesError) return <div>An error occurred</div>;

  const shopTypes = shopTypesData?.data?.shop_types || [];
  const countries = countriesData?.data?.countries || [];
  const regions = regionsData?.data?.regions || [];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="flex flex-col mb-8">
      <div className="orgdrop mb-8">
        <select
          id="orgType"
          {...register("shop_type", { required: "Organization type is required" })}
        >
          <option value="">Select Organisation</option>
          {shopTypes.map((shopType) => (
            <option key={shopType.id} value={shopType.id}>
              {shopType.shop_type_eng}
            </option>
          ))}
        </select>
        {errors.shop_type && <ErrorMessage message={errors.shop_type.message} />}
      </div>

      <div className="flex justify-between gap-4">
        <div className="orgdrop">
        <select
  id="country"
  {...register("country", { required: "Country is required" })}
  onChange={handleCountryChange}
>
  <option value="">Select Country</option>
  {countries.map((country) => (
    <option key={country.id} value={country.id}>
      {country.country_eng}
    </option>
  ))}
</select>
          {errors.country && <ErrorMessage message={errors.country.message} />}
        </div>
        <div className="orgdrop">
          <select
            id="region"
            {...register("region", { required: "Region is required" })}
            disabled={!selectedCountry || regionsLoading}
          >
            <option value="">Select Region</option>
            {regionsLoading ? (
              <option value="">Loading regions...</option>
            ) : regionsError ? (
              <option value="">Error loading regions</option>
            ) : (
              regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.region_eng}
                </option>
              ))
            )}
          </select>
          {errors.region && <ErrorMessage message={errors.region.message} />}
        </div>
      </div>
    </div>
  );
};

export default OrgDropdowns;