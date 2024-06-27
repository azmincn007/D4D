import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import FormFieldCategory from './components/FormFieldCategory';

function CategoryAdmin({ isOpen, onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const addCategoryMutation = useMutation({
    mutationFn: (newCategory) => {
      // Retrieve the token from local storage
      const token = localStorage.getItem('authToken'); // Adjust this key if needed

      // Create headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Make the API call with the token in the header
      return axios.post('https://hezqa.com/api/restaurent/add-category', newCategory, { headers });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('categories');
      onClose();
    },
    onError: (error) => {
      // Handle any errors here
      console.error('Error adding category:', error);
      // You might want to show an error message to the user
    },
  });

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data) => {
    addCategoryMutation.mutate(data);
  };

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <div className='my-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
                <h1>Add Your Category</h1>
              </div>
              <FormFieldCategory language="eng" register={register} errors={errors} />
              <FormFieldCategory language="ar" register={register} errors={errors} />
              <FormFieldCategory language="mal" register={register} errors={errors} />
              <FormFieldCategory language="hin" register={register} errors={errors} />
              <div className="mt-8 w-[50%] mx-auto">
                <Button 
                  type="submit" 
                  className="w-full py-2 bg-yellow text-black rounded"
                  disabled={addCategoryMutation.isLoading}
                >
                  {addCategoryMutation.isLoading ? 'Uploading...' : 'Upload'}
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

export default CategoryAdmin;