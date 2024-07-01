import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import FormFieldShop from './FormFieldShop';

function Addcategoryshop({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data) => {
    console.log("saadasdasdsad");
    console.log('Form submitted. Data:', data);
    // Here you would typically handle form submission
    onClose();
  };
 const formFieldName = "Add your Category";
  const registerName = "category_type";

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <div className='my-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
                <h1>Add Your Category</h1>
              </div>
              <FormFieldShop name={formFieldName} language="eng" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="ar" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="mal" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="hin" register={register} errors={errors} registerName={registerName} />
              <div className="mt-8 w-[50%] mx-auto">
                <Button
                  type="submit"
                  className="w-full py-2 bg-yellow text-black rounded"
                >
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Addcategoryshop;