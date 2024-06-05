import React, {  } from 'react';

const Search = () => {
  

  return (
    <>
      <input
        type="text"
        className="inputfield  text-xsm Tab:text-xs"
        placeholder="Search for items, brands and inspiration"
      />
      <button className='navbutton text-black text-semibold'>Search</button>
    </>
  );
};

export default Search;