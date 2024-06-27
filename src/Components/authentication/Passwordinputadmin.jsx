import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../../src/ShopsAdmin/Pages/Restuarent/Baselayout.css'

const PasswordInputAdmin = ({ register, name, placeholder, rules, error }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className='w-[100%]'>
      <div className="flex items-center justify-between w-[100%] bg-transparent rounded-lg border-1 passborder">
        <div>
          <TextInput
            className="passtextadmin"
            placeholder={placeholder}
            id={name}
            type={visible ? 'text' : 'password'}
            {...register(name, rules)}
            autoComplete="new-password" 
          />
        </div>
        <div className="mr-4">
          {visible ? (
            <FaEyeSlash
              className="w-[20px] h-[16px] text-[#6D6D6D]"
              onClick={toggleVisibility}
            />
          ) : (
            <FaEye
              className="w-[20px] h-[16px] text-[#6D6D6D]"
              onClick={toggleVisibility}
            />
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1 flex justify-start">{error.message}</p>}
    </div>
  );
};

export default PasswordInputAdmin;
