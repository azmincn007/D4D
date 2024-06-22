import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import ErrorMessage from '../../../../Pages/Authentication/ErrorValidation';

function FieldLanguage({ language, errors, register }) {
  return (
    <div>
        <div className='mb-2'>
        <Label className='text-[18px] font-semibold'>{`Name of the Organisation (${language})`}</Label>
        </div>
    
      <TextInput
        className="form-today w-[100%]"
        id={`nameofdish${language}`}
        type="text"
        placeholder={`Name of the Organisation (${language})`}
        {...register(`nameoforg${language}`, {
          required: `Name of the Organisation (${language}) is required`,
        })}
      />
      {errors[`nameoforg${language}`] && <ErrorMessage message={errors[`nameoforg${language}`].message} />}
    </div>
  );
}

export default FieldLanguage;