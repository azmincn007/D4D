import { Button, Modal } from 'flowbite-react';
import React, { useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import FormFieldCategory from './components/FormFieldCategory';

function CategoryAdmin({ isOpen, onClose, onCategoryAdded, categoryToEdit }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (categoryToEdit) {
      console.log("Category data for editing:", categoryToEdit);
      reset(categoryToEdit);
    } else {
      reset({});
    }
  }, [categoryToEdit, reset]);

  const addOrUpdateCategoryMutation = useMutation({
    mutationFn: (categoryData) => {
      const token = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (categoryToEdit) {
        // Editing existing category
        const editData = {
          cat_eng: categoryData.cat_eng,
          cat_ar: categoryData.cat_ar,
          cat_mal: categoryData.cat_mal,
          cat_hin: categoryData.cat_hin,
          status: 'Active',
          cat_id: categoryToEdit.id
        };
        return axios.post('https://hezqa.com/api/restaurent/edit-category', editData, { headers });
      } else {
        // Adding new category
        return axios.post('https://hezqa.com/api/restaurent/add-category', categoryData, { headers });
      }
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log('Response:', response.data);
        queryClient.invalidateQueries('categories');
        onCategoryAdded();
        onClose();
      } else {
        navigate('/404error');
      }
    },
    onError: (error) => {
      console.error('Error adding/updating category:', error);
      navigate('/404error');
    },
  });

  const handleCloseModal = () => {
    onClose();
    reset({});
  };

  const onSubmit = (data) => {
    addOrUpdateCategoryMutation.mutate(data);
  };

  return (
    <div>
      <Modal show={isOpen} onClose={handleCloseModal} className='modalfav'>
        <Modal.Body>
          <div className='my-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
                <h1>{categoryToEdit ? 'Edit' : 'Add'} Your Category</h1>
              </div>
              <FormFieldCategory language="eng" register={register} errors={errors} />
              <FormFieldCategory language="ar" register={register} errors={errors} />
              <FormFieldCategory language="mal" register={register} errors={errors} />
              <FormFieldCategory language="hin" register={register} errors={errors} />
              <div className="mt-8 w-[50%] mx-auto">
                <Button
                  type="submit"
                  className="w-full py-2 bg-yellow text-black rounded"
                  disabled={addOrUpdateCategoryMutation.isLoading}
                >
                  {addOrUpdateCategoryMutation.isLoading ? 'Saving...' : (categoryToEdit ? 'Update' : 'Upload')}
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