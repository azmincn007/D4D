import React from 'react';
import { TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldDescription({ language, register, errors }) {
  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4'>
        <TextInput
          className="form-today h-[100px] w-[100%]"
          id={`description${language}`}
          type="text"
          placeholder={`Description (${language})`}
          {...register(`desc_${language}`, {
            required: `Description (${language}) is required`,
          })}
        />
        {errors[`desc_${language}`] && <ErrorMessage message={errors[`desc_${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldDescription;