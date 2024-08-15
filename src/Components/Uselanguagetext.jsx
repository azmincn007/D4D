// useLanguageText.js
import { useContext } from 'react';
import { LanguageContext } from '../App';

const useLanguageText = (data) => {
  const [selectedLanguage] = useContext(LanguageContext);

  const getCountryText = () => {
    switch (selectedLanguage) {
      case 'English':
        return data.country_eng ;
      case 'Arabic':
        return data.country_ar ;
      case 'Malayalam':
        return data.country_mal ;
      case 'Hindi':
        return data.country_hin ;
      default:
        return data.country_eng ;
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
        case 'Malayalam':
          return data.region_mal || 'Default Language';
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