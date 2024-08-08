// src/hooks/useCountries.js
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../../config/config';

const fetchCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/api/countries`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data.countries;
};

export const useCountries = () => {
  return useQuery('countries', fetchCountries);
};