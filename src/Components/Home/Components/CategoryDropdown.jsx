
import React from 'react';
import { Dropdown } from 'flowbite-react';
import useLanguageText from '../../Uselanguagetext';

const Categorydropdown = ({ selectedValue, onOptionClick }) => {
  const options = [
    {
      value: 'Shops',
      label: useLanguageText({
        country_eng: 'Shops',
        country_ar: 'متاجر',
        country_mal: 'കടകൾ',
        country_hin: 'दुकानें'
      })
    },
    {
      value: 'Restaurant',
      label: useLanguageText({
        country_eng: 'Restaurant',
        country_ar: 'مطعم',
        country_mal: 'ഭക്ഷണശാല',
        country_hin: 'रेस्तरां'
      })
    },
  ];

  // Find the selected option to display its label
  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <Dropdown
      label={selectedOption ? selectedOption.label : 'Select Category'}
      style={{
        backgroundColor: '#FFD814',
        color: 'black',
        borderRadius: '2px',
        fontSize: '18px',
      }}
    >
      {options.map((option) => (
        <Dropdown.Item
          key={option.value}
          onClick={() => onOptionClick(option.value)}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default Categorydropdown;