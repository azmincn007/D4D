// useLanguageText.js
import { useContext } from 'react';
import { LanguageContext } from '../App';

const useLanguageText = (data) => {
  const [selectedLanguage] = useContext(LanguageContext);

  const getCountryText = () => {
    switch (selectedLanguage) {
      case 'English':
        return data.country_eng || 'Default Language';
      case 'Arabic':
        return data.country_ar || 'Default Language';
      case 'Malayalam':
        return data.country_mal || 'Default Language';
      case 'Hindi':
        return data.country_hin || 'Default Language';
      default:
        return data.country_eng || 'Default Language';
    }
  };

  const getRegionText = () => {
    switch (selectedLanguage) {
      case 'English':
        return data.region_eng || 'Default Language';
      case 'Arabic':
        return data.region_ar || 'Default Language';
      case 'Hindi':
        return data.region_hin || 'Default Language';
      default:
        return data.region_eng || 'Default Language';
    }
  };

  if (!data) return 'Default Language';

  if ('country_eng' in data) {
    return getCountryText();
  } else if ('region_eng' in data) {
    return getRegionText();
  } else {
    return 'Default Language';
  }
};

export default useLanguageText;