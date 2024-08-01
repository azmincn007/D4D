import React, { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldShop({ name, language, register, errors, registerName, isEditMode }) {
  const [isFocused, setIsFocused] = useState(isEditMode);

  useEffect(() => {
    setIsFocused(isEditMode);
  }, [isEditMode]);

  const focusedClassName = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
  const defaultClassName = 'text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%]';

  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4 relative'>
        <TextInput
          className={`form-today w-[100%] peer`}
          id={`${registerName}${language}`}
          type="text"
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (e.target.value === '' && !isEditMode) {
              setIsFocused(false);
            }
          }}
          {...register(`${registerName}_${language}`, {
            required: `${name} (${language}) is required`,
          })}
        />
        <label
          htmlFor={`${registerName}${language}`}
          className={`absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none
            ${isFocused ? focusedClassName : defaultClassName}`}
        >
          {name} ({language})
        </label>
        {errors[`${registerName}_${language}`] && <ErrorMessage message={errors[`${registerName}_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldShop;