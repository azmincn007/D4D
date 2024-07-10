import React, { useState } from 'react';
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

function Categories({ selectedValue, onOptionClick, onSubcategoryClick, showInNavbar = false }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    const response = await axios.get('https://hezqa.com/api/categories');
    return response.data.data.categories;
  };

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return [];
    const response = await axios.get(`https://hezqa.com/api/subcategories/${categoryId}`);
    console.log('Subcategories API Response:', response.data.data.subcategories);
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

  const options = [
    { value: 'Shops', label: 'Shops' },
    { value: 'Restaurant', label: 'Restaurant' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (subcategory) => {
    onSubcategoryClick(subcategory);
  };

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>An error occurred while loading categories: {categoriesError.message}</div>;

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
        {categories && categories.map((category) => {
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
                  <div>Loading subcategories...</div>
                ) : subcategoriesError ? (
                  <div>Error loading subcategories: {subcategoriesError.message}</div>
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
                          className="pb-4 cursor-pointer"
                          key={subcategory.id}
                          onClick={() => handleSubcategoryClick(subcategoryName)}
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
        })}
      </div>
    </div>
  );
}

export default Categories;