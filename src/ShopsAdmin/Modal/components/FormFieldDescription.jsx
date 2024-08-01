import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldDescription({ language, register, errors, isEditMode }) {
  const [isFocused, setIsFocused] = useState(isEditMode);

  useEffect(() => {
    setIsFocused(isEditMode);
  }, [isEditMode]);

  const focusedClassName = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
  const defaultClassName = 'text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%] flex justify-start h-[80%]';

  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4 relative'>
        <textarea
          className={`form-today h-[100px] w-[100%] peer`}
          id={`description${language}`}
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (e.target.value === '' && !isEditMode) {
              setIsFocused(false);
            }
          }}
          {...register(`desc_${language}`, {
            required: `Description (${language}) is required`,
          })}
        />
        <label
          htmlFor={`description${language}`}
          className={`absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none
            ${isFocused ? focusedClassName : defaultClassName}`}
        >
          Description of Menu Item ({language})
        </label>
        {errors[`desc_${language}`] && <ErrorMessage message={errors[`desc_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldDescription;