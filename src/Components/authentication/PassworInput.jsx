import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../Pages/Authentication/ErrorValidation';

const PasswordInput = ({ register, errors }) => {
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
            placeholder="Password"
            id="password"
            type={visible ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
            })}
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
      {errors.password && <ErrorMessage message={errors.password.message} />}
    </div>
  );
};

export default PasswordInput;