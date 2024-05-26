import React from "react";
import { Dropdown } from "flowbite-react";
import "../../styles/categories.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import appstore from '../../assets/appstore.png';
import playstore from '../../assets/googleplay.png';
import Categorydropdown from "./Components/CategoryDropdown";

function Categories({ selectedValue, onOptionClick, showInNavbar = false }) {
  const catdropdata = [
    { title: "electronics", titledata1: ["bakedgoods", "cofee"] },
    { title: "books", titledata1: ["fiction", "non-fiction"] },
    { title: "electronics", titledata1: ["bakedgoods", "cofee"] },
    { title: "books", titledata1: ["fiction", "non-fiction"] },
  ];

  const options = [
    { value: 'Supermarket', label: 'Supermarket' },
    { value: 'MobileShop', label: 'MobileShop' },
    { value: 'Restaurant', label: 'Restaurant' },
  ];

  return (
    <div className={`categories p bg-darkblue pl-4 font-inter ${showInNavbar ? 'block' : 'hidden md:block'}`}>
      {!showInNavbar && (
        <div className="supermarketbutton py-2 pt-6">
          <Categorydropdown selectedValue={selectedValue} onOptionClick={onOptionClick} />
        </div>
      )}
      <div className="downloadfield my-2 ">
        <p className="text-sm text-white text-center py-2 w-[80%] mx-auto">
          Unlock Exclusive Shopping Offers, Right on Your Mobile! Download the App Now!
        </p>
        <div className="downloadbuttons flex justify-between w-[80%] mx-auto">
          <img className="downloadbuttons" src={appstore} alt="" />
          <img className="downloadbuttons" src={playstore} alt="" />
        </div>
      </div>
      <div className="cathead text-[20px] text-white font-medium py-2 font-inter ">
        Categories
      </div>
      <div className="categoriesdropdown py-5 w-[95%]">
        {catdropdata.map((obj, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                "&.Mui-expanded": { minHeight: "48px" },
                ".MuiAccordionSummary-content.Mui-expanded": { margin: "12px 0" },
              }}
            >
              {obj.title}
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: "36px" }}>
              <ul>
                {obj.titledata1.map((data, dataIndex) => (
                  <li className="pb-1" key={dataIndex}>
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