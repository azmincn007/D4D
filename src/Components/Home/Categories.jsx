import React, { useState, useContext } from 'react';
import { Dropdown } from 'flowbite-react';
import '../../styles/categories.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import appstore from '../../assets/appstore.png';
import playstore from '../../assets/googleplay.png';
import Categorydropdown from './Components/CategoryDropdown';
import axios from 'axios';
import { useQuery } from 'react-query';
import useLanguageText from '../Uselanguagetext';
import { SelectedCategoryContext, SelectedSubCategoryContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

// Shimmer component for loading state
const Shimmer = ({ count }) => (
  <>
    {[...Array(count)].map((_, index) => (
      <div key={index} className="animate-pulse bg-[#232F3E] h-12 mb-2 rounded"></div>
    ))}
  </>
);

function Categories({ selectedValue, onOptionClick, onSubcategoryClick, onCategoryClick, showInNavbar = false }) {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(SelectedCategoryContext);
  const { selectedSubCategoryId, setSelectedSubCategoryId } = useContext(SelectedSubCategoryContext);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/categories`);
    return response.data.data.categories;
  };

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return [];
    const response = await axios.get(`${API_BASE_URL}/api/subcategories/${categoryId}`);
    return response.data.data.subcategories;
  };

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: subcategories, isLoading: subcategoriesLoading, error: subcategoriesError } = useQuery({
    queryKey: ['subcategories', selectedCategoryId],
    queryFn: () => fetchSubcategories(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  const handleCategoryClick = (categoryId) => {
    const newSelectedId = categoryId === selectedCategoryId ? null : categoryId;
    setSelectedCategoryId(newSelectedId);
    setSelectedSubCategoryId(null);
    onCategoryClick();
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubCategoryId(subcategory.id);
    onSubcategoryClick();
  };

  if (categoriesError || subcategoriesError) {
    navigate('/404error');
    return null;
  }

  return (
    <div
      className={`categories p bg-[#131921] pl-4 h-[100%] font-inter ${
        showInNavbar ? 'block' : 'hidden md:block'
      }`}
    >
      {!showInNavbar && (
        <div className="supermarketbutton py-4 pt-6">
          <Categorydropdown selectedValue={selectedValue} onOptionClick={onOptionClick} />
        </div>
      )}
      <div className="downloadfield my-2 ">
        <div className="py-2">
          <p className="text-sm text-white text-center  w-[80%] mx-auto my-4 Mobile:text-small LgMobile2:text-[11px]">
            Unlock Exclusive Shopping Offers, Right on Your Mobile! Download the App Now!
          </p>
          <div className="downloadbuttons  flex justify-between w-[80%] mx-auto LgMobile2:w-[90%] ">
            <img className="downloadbuttons" src={appstore} alt="" />
            <img className="downloadbuttons" src={playstore} alt="" />
          </div>
        </div>
      </div>
      <div className="cathead text-[20px] text-white font-medium py-2 font-inter ">
        Categories
      </div>
      <div className="categoriesdropdown py-1 w-[95%]">
        {categoriesLoading ? (
          <Shimmer count={20} />
        ) : (
          categories && categories.map((category) => {
            const categoryName = useLanguageText({
              country_eng: category.cat_eng,
              country_ar: category.cat_ar,
              country_mal: category.cat_mal,
              country_hin: category.cat_hin
            });

            return (
              <Accordion
                key={category.id}
                expanded={selectedCategoryId === category.id}
                onChange={() => handleCategoryClick(category.id)}
                sx={{
                  color: 'white',
                  margin:'6px 0px',
                  backgroundColor:'#232F3E'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    '&.Mui-expanded': { minHeight: '48px' },
                    '.MuiAccordionSummary-content.Mui-expanded': { margin: '12px 0' },
                    cursor: 'pointer',
                  }}
                >
                  {categoryName}
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: '26px'}}>
                  {subcategoriesLoading ? (
                    <Shimmer count={3} />
                  ) : (
                    <ul>
                      {subcategories && subcategories.map((subcategory) => {
                        const subcategoryName = useLanguageText({
                          country_eng: subcategory.subcat_eng,
                          country_ar: subcategory.subcat_ar,
                          country_mal: subcategory.subcat_mal,
                          country_hin: subcategory.subcat_hin
                        });
                        return (
                          <li
                            className={`pb-4 cursor-pointer ${selectedSubCategoryId === subcategory.id ? 'font-bold' : ''}`}
                            key={subcategory.id}
                            onClick={() => handleSubcategoryClick(subcategory)}
                          >
                            {subcategoryName}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Categories;