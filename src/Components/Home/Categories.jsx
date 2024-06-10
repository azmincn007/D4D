import React from 'react';
import { Dropdown } from 'flowbite-react';
import '../../styles/categories.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import appstore from '../../assets/appstore.png';
import playstore from '../../assets/googleplay.png';
import Categorydropdown from './Components/CategoryDropdown';

function Categories({ selectedValue, onOptionClick, onSubcategoryClick, showInNavbar = false }) {
  const catdropdata = [
    { title: 'electronics', titledata1: ['Mobile', 'Laptop','Printer','Smartwatch'] },
    { title: 'Food - Grocery', titledata1: ['fiction', 'non-fiction'] },
    { title: 'Food - Grocery', titledata1: ['fiction', 'non-fiction'] },

    { title: 'Food - Grocery', titledata1: ['fiction', 'non-fiction'] },

    { title: 'Food - Grocery', titledata1: ['fiction', 'non-fiction'] },

    { title: 'Food - Grocery', titledata1: ['fiction', 'non-fiction'] },


  ];

  const options = [
    { value: 'Shops', label: 'Shops' },
    { value: 'Restaurant', label: 'Restaurant' },
  ];

  const handleSubcategoryClick = (subcategory) => {
    onSubcategoryClick(subcategory);
  };

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
        {catdropdata.map((obj, index) => (
          <Accordion
            key={index}
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
                cursor: 'pointer', // Add cursor pointer for category titles
              }}
            >
              {obj.title}
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: '26px'}}>
              <ul>
                {obj.titledata1.map((data, dataIndex) => (
                  <li
                    className="pb-4 cursor-pointer" // Add cursor pointer for subcategories
                    key={dataIndex}
                    onClick={() => handleSubcategoryClick(data)}
                  >
                    {data}
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Categories;