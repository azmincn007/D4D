import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ register, name, placeholder, rules, error }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-[100%] bg-[#F1F1F1] rounded-lg">
        <div>
          <TextInput
            className="passtext"
            placeholder={placeholder}
            id={name}
            type={visible ? 'text' : 'password'}
            {...register(name, rules)}
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
      {error && <p className="text-red-500 text-[10px] mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
