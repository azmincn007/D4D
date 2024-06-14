import React from 'react';
import { TextInput, Select } from 'flowbite-react';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

function FormField({ language, register, errors }) {
  return (
    <div className="w-[50%] mx-auto formtext">
      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`nameofdish${language}`}
          type="text"
          placeholder={`Name of the dish (${language})`}
          {...register(`nameofdish${language}`, {
            required: `Name of the dish (${language}) is required`,
          })}
        />
        {errors[`nameofdish${language}`] && <ErrorMessage message={errors[`nameofdish${language}`].message} />}
      </div>

      <div className='mb-4 form-select'>
        <Select
          id={`typeOfDish${language}`}
          {...register(`typeOfDish${language}`, {
            required: `Type of dish (${language}) is required`,
          })}
          className="w-[100%] form-select"
        >
          <option value="">Select Type of Dish ({language})</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </Select>
        {errors[`typeOfDish${language}`] && <ErrorMessage message={errors[`typeOfDish${language}`].message} />}
      </div>

      <div className='mb-4'>
        <TextInput
          className="form-today w-[100%]"
          id={`offerPrice${language}`}
          type="text"
          placeholder={`Offer Price (${language})`}
          {...register(`offerPrice${language}`, {
            required: `Offer Price (${language}) is required`,
          })}
        />
        {errors[`offerPrice${language}`] && <ErrorMessage message={errors[`offerPrice${language}`].message} />}
      </div>

      <div className='mb-4'>
        <TextInput
          className="form-today h-[100px] w-[100%]"
          id={`description${language}`}
          type="text"
          placeholder={`Description (${language})`}
          {...register(`description${language}`, {
            required: `Description (${language}) is required`,
          })}
        />
        {errors[`description${language}`] && <ErrorMessage message={errors[`description${language}`].message} />}
      </div>
    </div>
  );
}

export default FormField;
