import React from 'react';
import { Modal, Button } from 'flowbite-react';
import './Modalsprofile.css';
import { modalshop } from '../../Themes/Modaltheme';
import { useForm } from 'react-hook-form';
import FormField from './components/Formfield';
import ImageUpload from './components/Imageupload';
import { IoIosClose } from 'react-icons/io';

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
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <h1 className='text-[22px] font-semibold mb-4 w-[50%] mx-auto flex justify-center py-2'>
            {modalType === 'todaySpecial' ? "Today's Special details" : 'Menu Details'}
          </h1>
          {/* English */}
          <FormField language="Eng" register={register} errors={errors} />
          <div className='bg-black w-[100%] h-[1px] mb-8'></div>
          {/* Arabic */}
          <FormField language="ARB" register={register} errors={errors} />
          <div className='bg-black w-[100%] h-[1px] mb-8'></div>
          {/* Hindi */}
          <FormField language="HIN" register={register} errors={errors} />
          <div className='bg-black w-[100%] h-[1px] mb-8'></div>
          {/* Malayalam */}
          <FormField language="MAL" register={register} errors={errors} />
          <div className='bg-black w-[100%] h-[1px] mb-8'></div>
          {/* Image Upload */}
          <div className='flex justify-between w-[60%] mx-auto'>
            <ImageUpload title="cover" index={0} register={register} />
            <ImageUpload title="More Photos" index={1} register={register} />
            <ImageUpload title="More Photos" index={2} register={register} />
          </div>
          <div className="mt-4 w-[50%] mx-auto">
            <Button type="submit" className="w-full py-2 bg-yellow text-black rounded">
              Submit
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