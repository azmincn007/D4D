import React, { useContext } from 'react';
import '../../styles/marquee.css';
import { GiFlowerStar } from "react-icons/gi";
import { useQuery } from 'react-query';
import axios from 'axios';
import useLanguageText from '../Uselanguagetext';
import { LanguageContext } from "../../App";
import { API_BASE_URL } from '../../config/config';

const fetchFlashNews = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/flash-news`);
  return response.data.data.flash_news;
};

const MarqueeComponent = () => {
  const [selectedLanguage] = useContext(LanguageContext);
  const { data, isLoading, isError } = useQuery('flashNews', fetchFlashNews);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching flash news</div>;

  const newsText = data ? data.map(item => 
    useLanguageText({
      country_eng: item.flash_eng,
      country_ar: item.flash_ar,
      country_mal: item.flash_mal,
      country_hin: item.flash_hin
    })
  ).join(' | ') : '';

  return (
    <div className="containers font-inter">
      <div className="scroll py-[6px]">
        <div className="RightToLeft text-[14px]">
          {[...Array(20)].map((_, index) => (
            <span key={index} className='marquee-text flex items-center'>
              <GiFlowerStar className='mr-4 text-yellow' />
              {newsText}
              <GiFlowerStar className='ml-4 text-yellow' />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeComponent;