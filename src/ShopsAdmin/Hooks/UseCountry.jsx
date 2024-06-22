// src/hooks/useCountries.js
import { useQuery } from 'react-query';

const fetchCountries = async () => {
  const response = await fetch('https://hezqa.com/api/countries');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data.countries;
};

export const useCountries = () => {
  return useQuery('countries', fetchCountries);
};