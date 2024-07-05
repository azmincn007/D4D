import { Button, Modal, Select, Label, Datepicker } from 'flowbite-react';
import React, { useState, useEffect, useCallback } from 'react';
import { IoIosClose } from "react-icons/io";
import { useForm, Controller } from 'react-hook-form';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

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
  const { register, handleSubmit, control, formState: { errors }, watch, reset, setValue } = useForm();
  const [categoriesShop, setCategoriesShop] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const queryClient = useQueryClient();

  const addFlyerMutation = useMutation(
    (formData) => {
      console.log('FormData contents for add:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }
      return axios.post(`${BASE_URL}/api/restaurent/add-flyer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
    },
    {
      onSuccess: (response) => {
        console.log('Add flyer response:', response.data);
        queryClient.invalidateQueries('flyers');
        onClose();
        reset();
        setImageFile(null);
        setPreviewUrl('');
        setFileName('');
      },
      onError: (error) => {
        console.error('Error adding flyer:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
      }
    }
  );

  const updateFlyerMutation = useMutation(
    (formData) => {
      console.log('FormData contents for update:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }
      return axios.post(`${BASE_URL}/api/restaurent/edit-flyer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
    },
    {
      onSuccess: (response) => {
        console.log('Edit flyer response:', response.data);
        queryClient.invalidateQueries('flyers');
        onClose();
        reset();
        setImageFile(null);
        setPreviewUrl('');
        setFileName('');
      },
      onError: (error) => {
        console.error('Error updating flyer:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
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
    if (flyerToEdit) {
      reset({
        cat_id: flyerToEdit.cat_id,
        subcat_id: flyerToEdit.subcat_id,
        valid_from: flyerToEdit.valid_from,
        valid_to: flyerToEdit.valid_to,
      });
      setPreviewUrl(`${BASE_URL}${flyerToEdit.image}`);
      setFileName(flyerToEdit.image.split("/").pop());
      fetchSubcategories(flyerToEdit.cat_id);
    } else {
      reset();
      setPreviewUrl('');
      setFileName('');
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
    setPreviewUrl('');
    setFileName('');
    setSubcategories([]);
    onClose();
  }, [reset, onClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    if (!checkAuthToken()) return;

    const formData = new FormData();
    formData.append('cat_id', data.cat_id);
    formData.append('subcat_id', data.subcat_id);
    formData.append('valid_from', data.valid_from);
    formData.append('valid_to', data.valid_to);

    if (imageFile && imageFile instanceof File) {
      formData.append('image', imageFile);
      console.log('Appending image file:', imageFile.name);
    } else {
      console.log('No new image file to append');
    }

    if (flyerToEdit) {
      formData.append('flyer_id', flyerToEdit.id);
      
      console.log('Editing flyer. Data being sent:', {
        flyer_id: flyerToEdit.id,
        cat_id: data.cat_id,
        subcat_id: data.subcat_id,
        valid_from: data.valid_from,
        valid_to: data.valid_to,
        image: imageFile ? `File: ${imageFile.name}` : 'No new image'
      });

      updateFlyerMutation.mutate(formData);
    } else {
      if (!imageFile) {
        alert("Please upload an image before submitting.");
        return;
      }
      console.log('Adding new flyer. Data being sent:', {
        cat_id: data.cat_id,
        subcat_id: data.subcat_id,
        valid_from: data.valid_from,
        valid_to: data.valid_to,
        image: `File: ${imageFile.name}`
      });
      addFlyerMutation.mutate(formData);
    }
  };

  return (
    <div>
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

                <div className="mb-4">
  <Label htmlFor="image-upload" value="Upload Flyer Image" />
  <div className="flex items-center">
    <input 
      type="file" 
      id="image-upload" 
      accept="image/*" 
      onChange={handleImageChange} 
      className="hidden" 
    />
    <label
      htmlFor="image-upload"
      className="cursor-pointer bg-violet-50 text-violet-700 py-2 px-4 rounded-full text-sm font-semibold hover:bg-violet-100"
    >
      Choose File
    </label>
    <span className="ml-2 text-sm text-gray-500">{fileName || "No file chosen"}</span>
  </div>
  {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 max-w-full h-auto" />}
</div>
              </div>

              <div className="mt-8 w-[50%] mx-auto">
                <Button
                  type="submit"
                  className="w-full py-2 bg-yellow text-black rounded"
                  disabled={addFlyerMutation.isLoading || updateFlyerMutation.isLoading}
                >
                  {flyerToEdit ? 'Update Flyer' : 'Add Flyer'}
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

export default ShopFlyerAdmin;