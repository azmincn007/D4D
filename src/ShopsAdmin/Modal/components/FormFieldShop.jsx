import React from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldShop({ name, language, register, errors, registerName }) {
  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`${registerName}${language}`}
          type="text"
          placeholder={`${name} (${language})`}
          {...register(`${registerName}_${language}`, {
            required: `${name}(${language}) is required`,
          })}
        />
        {errors[`${registerName}_${language}`] && <ErrorMessage message={errors[`${registerName}_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldShop;