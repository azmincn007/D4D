import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Select, Label, Datepicker } from 'flowbite-react';
import { IoIosClose } from "react-icons/io";
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';
import ImageUpload from './Imageupload';
import ImageUploadFlyer from './ImageUploadFlyer';

const BASE_URL = 'https://hezqa.com';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const checkAuthToken = () => {
  const token = getAuthToken();
  if (!token) {
    console.error('No auth token found');
    return false;
  }
  return true;
};

function ShopFlyerAdmin({ isOpen, onClose, flyerToEdit }) {
  const { register, handleSubmit, control, formState: { errors }, watch, reset } = useForm();
  const [categoriesShop, setCategoriesShop] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const queryClient = useQueryClient();

  const addFlyerMutation = useMutation(
    (formData) => {
      return axios.post(`${BASE_URL}/api/restaurent/add-flyer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('flyers');
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Error adding flyer:', error);
        alert('Error adding flyer. Please try again.');
      }
    }
  );

  const updateFlyerMutation = useMutation(
    (formData) => {
      console.log("Sending update request with formData:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      if (formData.entries().next().done) {
        throw new Error("FormData is empty");
      }
      return axios.post(`${BASE_URL}/api/restaurent/edit-flyer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
    },
    {
      onSuccess: (data) => {
        console.log("Update success response:", data);
        queryClient.invalidateQueries('flyers');
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Error updating flyer:', error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
        alert('Error updating flyer. Please try again.');
      }
    }
  );

  const fetchCategories = async () => {
    if (!checkAuthToken()) return;
    try {
      const { data } = await axios.get(`${BASE_URL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      setCategoriesShop(data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId || !checkAuthToken()) return;
    try {
      const { data } = await axios.get(`${BASE_URL}/api/subcategories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      setSubcategories(data.data.subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("Effect triggered, flyerToEdit:", flyerToEdit);
    if (flyerToEdit) {
      reset({
        cat_id: flyerToEdit.cat_id,
        subcat_id: flyerToEdit.subcat_id,
        valid_from: flyerToEdit.valid_from,
        valid_to: flyerToEdit.valid_to,
      });
      fetchSubcategories(flyerToEdit.cat_id);
      setImageUploaded(true);
      setImageFile(null);  // Clear imageFile state when editing
    } else {
      reset();
      setImageUploaded(false);
      setImageFile(null);
    }
  }, [flyerToEdit, reset]);

  const watchCategory = watch("cat_id");

  useEffect(() => {
    if (watchCategory) {
      fetchSubcategories(watchCategory);
    }
  }, [watchCategory]);

  const handleCloseModal = useCallback(() => {
    reset({
      cat_id: "",
      subcat_id: "",
      valid_from: "",
      valid_to: "",
    });
    setImageFile(null);
    setImageUploaded(false);
    setSubcategories([]);
    onClose();
  }, [reset, onClose]);

  const handleImageUploadSuccess = (file) => {
    console.log("Image upload success, file:", file.name);
    setImageFile(file);
    setImageUploaded(true);
  };

  const onSubmit = async (data) => {
    if (!checkAuthToken()) return;
  
    console.log("Submitting form, data:", data);
    console.log("Submitting form, imageFile state:", imageFile);
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append('cat_id', data.cat_id);
    formData.append('subcat_id', data.subcat_id);
    formData.append('valid_from', data.valid_from);
    formData.append('valid_to', data.valid_to);
  
    if (flyerToEdit) {
      formData.append('flyer_id', flyerToEdit.id);
    }
  
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (flyerToEdit && flyerToEdit.image) {
      // Append a flag to indicate no change in image
      formData.append('keep_existing_image', 'true');
    }
  
    // Log the contents of formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      if (flyerToEdit) {
        console.log("Updating existing flyer, ID:", flyerToEdit.id);
        const response = await updateFlyerMutation.mutateAsync(formData);
        console.log("Update response:", response);
      } else {
        console.log("Adding new flyer");
        const response = await addFlyerMutation.mutateAsync(formData);
        console.log("Add response:", response);
      }
      alert(flyerToEdit ? "Flyer updated successfully!" : "Flyer added successfully!");
    } catch (error) {
      console.error(flyerToEdit ? "Error updating flyer:" : "Error adding flyer:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      alert(flyerToEdit ? "Error updating flyer. Please try again." : "Error adding flyer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploadError = (error) => {
    console.error("Image upload error:", error);
    setImageUploaded(false);
    setImageFile(null);
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className='modalfav'>
      <Modal.Body>
        <div className='my-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
              <h1>{flyerToEdit ? 'Edit Flyer' : 'Add Flyer'}</h1>
            </div>

            <div className='w-[50%] mx-auto'>
              <div className='mb-4 form-select'>
                <Select
                  id="cat_id"
                  {...register(`cat_id`, {
                    required: `Product category is required`,
                  })}
                  className="w-[100%] form-select rounded-none"
                  style={{borderRadius:'6px'}}
                >
                  <option value="">Select Product Category</option>
                  {categoriesShop.map(category => (
                    <option key={category.id} value={category.id}>{category.cat_eng}</option>
                  ))}
                </Select>
                {errors.cat_id && <ErrorMessage message={errors.cat_id.message} />}
              </div>

              <div className='mb-4 form-select'>
                <Select
                  id="subcat_id"
                  {...register(`subcat_id`, {
                    required: `Product subcategory is required`,
                  })}
                  className="w-[100%] form-select rounded-none"
                  style={{borderRadius:'6px'}}
                  disabled={!watchCategory}
                >
                  <option value="">Select Product Subcategory</option>
                  {subcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>{subcategory.subcat_eng}</option>
                  ))}
                </Select>
                {errors.subcat_id && <ErrorMessage message={errors.subcat_id.message} />}
              </div>

              <div className='flex gap-4'>
                <div className='mb-4'>
                  <Label htmlFor="valid_from" value="Valid From" />
                  <Controller
                    name="valid_from"
                    control={control}
                    render={({ field }) => (
                      <Datepicker
                        id="valid_from"
                        className="w-full"
                        onSelectedDateChanged={(date) => field.onChange(formatDate(date))}
                        selected={field.value ? new Date(field.value) : null}
                      />
                    )}
                  />
                </div>

                <div className='mb-4'>
                  <Label htmlFor="valid_to" value="Valid To" />
                  <Controller
                    name="valid_to"
                    control={control}
                    render={({ field }) => (
                      <Datepicker
                        id="valid_to"
                        className="w-full"
                        onSelectedDateChanged={(date) => field.onChange(formatDate(date))}
                        selected={field.value ? new Date(field.value) : null}
                      />
                    )}
                  />
                </div>
              </div>

              <ImageUpload
                title="Upload Image"
                index="product"
                register={register}
                onUploadSuccess={handleImageUploadSuccess}
                onError={handleImageUploadError}
                initialImage={flyerToEdit?.image ? `${BASE_URL}${flyerToEdit.image}` : null}
              />
            </div>

            <div className="mt-8 w-[50%] mx-auto">
              <Button
                type="submit"
                className="w-full py-2 bg-yellow text-black rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : (flyerToEdit ? "Update Flyer" : "Add Flyer")}
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
  );
}

export default ShopFlyerAdmin;