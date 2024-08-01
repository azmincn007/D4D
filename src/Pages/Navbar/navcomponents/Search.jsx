import React from 'react';

const Search = () => {
  return (
    <>
      <input
        type="text"
        className="  inputfield text-xsm Tab:text-xs"
        placeholder="  🔍 Search for items, brands and inspiration"
     
        name="searchInput" // Added a unique name attribute
      />
      <button className='navbutton text-black text-semibold'>Search</button>
    </>
  );
};

export default Search;