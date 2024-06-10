import React from "react";

const ErrorMessage = ({ message }) => {
  return(
    <div className="mt-[-5px]">

   
   <span className="  text-xs font-inter ml-[5px] mt-[220] text-red-500">{message}</span>
   </div>

)  };

export default ErrorMessage;