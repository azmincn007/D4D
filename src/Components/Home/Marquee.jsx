import React, { useContext } from 'react';
import '../../styles/marquee.css';
import { GiFlowerStar } from "react-icons/gi";
import { useQuery } from 'react-query';
import axios from 'axios';
import useLanguageText from '../Uselanguagetext';
import { LanguageContext } from "../../App";
import { API_BASE_URL } from '../../config/config';
import Loading from '../../api/Loading';
import { Navigate, useNavigate } from 'react-router-dom';

const fetchFlashNews = async () => {
  const cachedData = localStorage.getItem('flashNews');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await axios.get(`${API_BASE_URL}/api/flash-news`);
  localStorage.setItem('flashNews', JSON.stringify(response.data.data.flash_news));
  return response.data.data.flash_news;
};

const MarqueeComponent = () => {
  const navigate=useNavigate();
  const [selectedLanguage] = useContext(LanguageContext);
  const { data, isLoading, isError } = useQuery('flashNews', fetchFlashNews, {
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    initialData: () => {
      const cachedData = localStorage.getItem('flashNews');
      return cachedData ? JSON.parse(cachedData) : undefined;
    },
  });

  if (isLoading) return <div><Loading/></div>;
  if (isError) return navigate('/error404');

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