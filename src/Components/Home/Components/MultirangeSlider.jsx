import React, { useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import './Multirangeslider.css'

const DualRangeSlider = () => {
  const [minValue, setMinValue] = useState(199);
  const [maxValue, setMaxValue] = useState(6000);

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <div>
      <MultiRangeSlider
        min={199}
        max={6000}
        onChange={handleInput}
        minValue={minValue}
        maxValue={maxValue}
        ruler={false}
        label={false}
        step={1}
      />
      <div>
        AED: {minValue} - {maxValue}
      </div>
    </div>
  );
};

export default DualRangeSlider;