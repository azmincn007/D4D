import React, { useState, useEffect } from 'react';
import './triangleswitch.css';

const TriangleSwitch = ({ onChange, color = 'red', label, initialChecked = true }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="switch-container">
      <label className="triangle-switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className={`slider ${color}`}>
          <span className={`toggle-shape ${color}`}></span>
        </span>
      </label>
    </div>
  );
};

export default TriangleSwitch;