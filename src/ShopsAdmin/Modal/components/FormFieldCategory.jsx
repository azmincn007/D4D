import React from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldCategory({ language, register, errors }) {
  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`addcat${language}`}
          type="text"
          placeholder={`Add your Category (${language})`}
          {...register(`cat_${language}`, {
            required: `Category(${language}) is required`,
          })}
        />
        {errors[`cat_${language}`] && <ErrorMessage message={errors[`cat_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldCategory;