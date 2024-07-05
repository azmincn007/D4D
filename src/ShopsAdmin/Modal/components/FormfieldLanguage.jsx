import React from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldLanguage({ language, register, errors }) {
  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`nameofdish${language}`}
          type="text"
          placeholder={`Name of the dish (${language})`}
          {...register(`menu_${language}`, {
            required: `Name of the dish (${language}) is required`,
          })}
        />
        {errors[`nameofdish${language}`] && <ErrorMessage message={errors[`nameofdish${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldLanguage;