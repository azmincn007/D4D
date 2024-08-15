import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loading() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center '>
      <ClipLoader size={40} color="#fbbf24" />
    </div>
  );
}

export default Loading;