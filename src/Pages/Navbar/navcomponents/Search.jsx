import React, { useState, useEffect } from 'react';

const Search = () => {
  const [Tabscreen, setTabscreen] = useState(window.innerWidth <= 820);

  useEffect(() => {
    const handleResize = () => {
      setTabscreen(window.innerWidth <= 820);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handleResize initially to handle the initial window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
   <>
     <input
        type="text"
        className="inputfield w-[80%]"
        placeholder={!Tabscreen ? "Search products" : ""}
      />
      <button className='navbutton text-black text-semibold'>Search</button>
   </>
    
    
  );
};

export default Search;
