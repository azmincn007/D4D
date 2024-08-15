import React, { useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import './Multirangeslider.css'

const DualRangeSlider = ({ onRangeChange }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  const storedCurrencySymbol = localStorage.getItem('currencySymbol');

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
    onRangeChange(e.minValue, e.maxValue);
  };

  return (
    <div>
      <MultiRangeSlider
        min={0}
        max={100000}
        onChange={handleInput}
        minValue={minValue}
        maxValue={maxValue}
        ruler={false}
        label={false}
        step={1}
      />
      <div>
        {storedCurrencySymbol}: {minValue} - {maxValue}
      </div>
    </div>
  );
};

export default DualRangeSlider;