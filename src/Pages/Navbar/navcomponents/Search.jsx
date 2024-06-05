import React, { useState, useEffect } from 'react';

const Search = () => {
  

  return (
    <>
      <input
        type="text"
        className="inputfield  text-[10px]"
        placeholder="Search for items, brands and inspiration"
      />
      <button className='navbutton text-black text-semibold'>Search</button>
    </>
  );
};

export default Search;