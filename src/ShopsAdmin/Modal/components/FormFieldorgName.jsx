import React from 'react';
import { Label, TextInput } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormFieldOrgname({ language, register, errors,defaultValue }) {
  return (
    <div className="w-[50%] mx-auto formtext Mobile:w-[70%]">

        <div className='mb-1'>
            <Label className='text-[16px]'>Name of the Organisation ({language}) </Label>
        </div>

      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`nameofdish${language}`}
          type="text"
          placeholder={`Enter your organisation name (${language})`}
          defaultValue={defaultValue}
          {...register(`shopname_${language}`, {
            required: `Organisation name (${language}) is required`,
            
          })}
        />
        {errors[`nameofdish${language}`] && <ErrorMessage message={errors[`nameofdish${language}`].message} />}
      </div>
    </div>
  );
}

export default FormFieldOrgname;