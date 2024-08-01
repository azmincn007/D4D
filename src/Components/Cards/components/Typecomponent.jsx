import React from 'react';

const VegetarianIcon = () => (
  <div style={{
    width: '20px',
    height: '20px',
    border: '1px solid green',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'green'
    }} />
  </div>
);

const NonVegetarianIcon = () => (
  <div style={{
    width: '20px',
    height: '20px',
    border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '12px solid red'
    }} />
  </div>
);

export { VegetarianIcon, NonVegetarianIcon };