import React from 'react';
import { Modal, Button, Select, TextInput } from 'flowbite-react';
import './Modalsprofile.css';
import { modalshop } from '../../Themes/Modaltheme';
import { useForm } from 'react-hook-form';
import ImageUpload from './components/Imageupload';
import { IoIosClose } from 'react-icons/io';
import ErrorMessage from '../../Pages/Authentication/ErrorValidation';
import FormFieldDescription from './components/FormFieldDescription';
import FormFieldLanguage from './components/FormfieldLanguage';

function Todayspecial({ isOpen, onClose, modalType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your submission logic here
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className='' theme={modalshop}>
      <Modal.Body className='shopsadminmodal font-inter relative'>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
          <h1 className='text-[22px] font-semibold mb-4 w-[50%] mx-auto flex justify-center py-2'>
            {modalType === 'todaySpecial' ? "Today's Special details" : 'Menu Details'}
          </h1>

          {/* FormFieldLanguage components */}
          <FormFieldLanguage language="Eng" register={register} errors={errors} />
          <FormFieldLanguage language="ARB" register={register} errors={errors} />
          <FormFieldLanguage language="HIN" register={register} errors={errors} />
          <FormFieldLanguage language="MAL" register={register} errors={errors} />

          {/* FormFieldDescription components */}
          <FormFieldDescription language="Eng" register={register} errors={errors} />
          <FormFieldDescription language="ARB" register={register} errors={errors} />
          <FormFieldDescription language="HIN" register={register} errors={errors} />
          <FormFieldDescription language="MAL" register={register} errors={errors} />

          <div className='w-[50%] mx-auto'>
          

            {/* Category of Dish */}
            <div className='mb-4 form-select'>
              <Select
                id="categoryOfDish"
                {...register(`categoryOfDish`, {
                  required: `Category of dish is required`,
                })}
                className="w-[100%] form-select"
              >
                <option value="">Select Category of Dish</option>
                <option value="Appetizers">Appetizers</option>
                <option value="MainCourse">Main Course</option>
                <option value="Desserts">Desserts</option>
              </Select>
              {errors.categoryOfDish && <ErrorMessage message={errors.categoryOfDish.message} />}
            </div>

            {/* Type of Dish and Offer Price */}
            <div className='mb-4 form-select'>
              <Select
                id="typeOfDish"
                {...register(`typeOfDish`, {
                  required: `Type of dish is required`,
                })}
                className="w-[100%] form-select "
              >
                <option value="">Select Type of Dish</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Drinks">Drinks</option>
              </Select>
              {errors.typeOfDish && <ErrorMessage message={errors.typeOfDish.message} />}
            </div>

              {/* Normal Price */}
              <div className='mb-4'>
              <TextInput
                className="form-today w-[100%]"
                id="normalPrice"
                type="text"
                placeholder="Normal Price"
                {...register(`normalPrice`, {
                  required: `Normal Price is required`,
                })}
              />
              {errors.normalPrice && <ErrorMessage message={errors.normalPrice.message} />}
            </div>
            <div className='mb-4'>
              <TextInput
                className="form-today w-[100%]"
                id="offerPrice"
                type="text"
                placeholder="Offer Price"
                {...register(`offerPrice`, {
                  required: `Offer Price is required`,
                })}
              />
              {errors.offerPrice && <ErrorMessage message={errors.offerPrice.message} />}
            </div>
          </div>

          {/* Image Upload */}
          <div className='flex justify-between w-[60%] mx-auto'>
            <ImageUpload title="cover" index={0} register={register} />
            <ImageUpload title="More Photos" index={1} register={register} />
            <ImageUpload title="More Photos" index={2} register={register} />
          </div>
          <div className="mt-4 w-[50%] mx-auto">
            <Button type="submit" className="w-full py-2 bg-yellow text-black rounded">
              Upload
            </Button>
          </div>
        </form>
        <div className="absolute top-0 right-0 mt-3 mr-3">
          <div
            className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white"
            onClick={handleCloseModal}
          >
            <IoIosClose className="text-base cursor-pointer" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Todayspecial;