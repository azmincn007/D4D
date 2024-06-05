import React from 'react';
import { Dropdown } from 'flowbite-react';

const Categorydropdown = ({ selectedValue, onOptionClick }) => {
  const options = [
    { value: 'Shops', label: 'Shops' },
    { value: 'Restaurant', label: 'Restaurant' },
  ];

  return (
      <Dropdown
        label={selectedValue}
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