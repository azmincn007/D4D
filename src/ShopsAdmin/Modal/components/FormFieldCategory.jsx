import React, { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldCategory({ language, register, errors, isEditMode, value }) {
  const [isFocusedOrFilled, setIsFocusedOrFilled] = useState(false);

  useEffect(() => {
    setIsFocusedOrFilled(isEditMode || !!value);
  }, [isEditMode, value]);

  const handleFocus = () => setIsFocusedOrFilled(true);
  
  const handleBlur = (e) => {
    if (!isEditMode && e.target.value === '') {
      setIsFocusedOrFilled(false);
    }
  };

  const labelClassName = `absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none flex justify-start items-center
    ${isFocusedOrFilled
      ? 'text-gray-500 dark:text-gray-400 -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 left-1'
      : 'text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%]'
    }`;

  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4 relative'>
        <TextInput
          className="form-today w-[100%] peer"
          id={`addcat${language}`}
          type="text"
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...register(`cat_${language}`, {
            required: `Category (${language}) is required`,
          })}
        />
        <label
          htmlFor={`addcat${language}`}
          className={labelClassName}
        >
          Add your Category ({language})
        </label>
        {errors[`cat_${language}`] && <ErrorMessage message={errors[`cat_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldCategory;