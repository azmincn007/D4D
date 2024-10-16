import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Modal, Label, Datepicker, Radio } from 'flowbite-react';
import { IoIosClose } from "react-icons/io";
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';
import ImageUpload from './Imageupload';
import MultiSelectSearch from '../../Components/MultiSelectSearch';
import { API_BASE_URL } from '../../../config/config';

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  d.setDate(d.getDate() + 1); // Add one day to the date
  return d.toISOString().split("T")[0];
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

function ShopFlyerAdmin({ isOpen, onClose, flyerToEdit, allProductInfo, setFlyerToEdit }) {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      valid_from: null,
      valid_to: null,
      products: [],
      offers: [],
      dates_needed: 'no',
    }
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();
  const datesNeeded = watch('dates_needed');

  const addFlyerMutation = useMutation(
    (formData) => axios.post(`${API_BASE_URL}/api/restaurent/add-flyer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('flyers');
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Error adding flyer:', error);
      }
    }
  );

  const updateFlyerMutation = useMutation(
    (formData) => axios.post(`${API_BASE_URL}/api/restaurent/edit-flyer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('flyers');
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Error updating flyer:', error);
      }
    }
  );

  const { data: offersData } = useQuery('offers', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/shop/offers`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data.data.offers;
  });

  useEffect(() => {
    if (isOpen) {
      if (flyerToEdit) {
        setIsEditMode(true);
        const resetData = {
          valid_from: flyerToEdit.valid_from ? formatDate(flyerToEdit.valid_from) : null,
          valid_to: flyerToEdit.valid_to ? formatDate(flyerToEdit.valid_to) : null,
          products: flyerToEdit.products.map(product => product.id) || [],
          offers: flyerToEdit.offers?.map(offer => offer.id) || [],
          dates_needed: flyerToEdit.valid_from || flyerToEdit.valid_to ? 'yes' : 'no',
        };
        reset(resetData);
        setValue('products', resetData.products);
        setValue('offers', resetData.offers);
      } else {
        setIsEditMode(false);
        reset({
          valid_from: null,
          valid_to: null,
          products: [],
          offers: [],
          dates_needed: 'no',
        });
        setImageFile(null);
      }
    }
  }, [isOpen, flyerToEdit, reset, setValue]);

  const handleCloseModal = useCallback(() => {
    reset({
      valid_from: null,
      valid_to: null,
      products: [],
      offers: [],
      dates_needed: 'no',
    });
    setImageFile(null);
    setIsEditMode(false);
    setFlyerToEdit(null);
    onClose();
  }, [reset, onClose, setFlyerToEdit]);

  const handleImageUploadSuccess = useCallback((file) => {
    setImageFile(file);
  }, []);

  const handleProductSelection = useCallback((selectedIds) => {
    setValue('products', selectedIds);
  }, [setValue]);

  const handleOfferSelection = useCallback((selectedIds) => {
    setValue('offers', selectedIds);
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!checkAuthToken()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    if (data.dates_needed === 'yes') {
      formData.append('valid_from', formatDate(data.valid_from));
      formData.append('valid_to', formatDate(data.valid_to));
    }
    formData.append('products', data.products.join(','));
    formData.append('offers', data.offers.join(','));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (isEditMode) {
      formData.append('flyer_id', flyerToEdit.id);
    }

    try {
      if (isEditMode) {
        await updateFlyerMutation.mutateAsync(formData);
      } else {
        await addFlyerMutation.mutateAsync(formData);
      }
      // The modal will be closed automatically due to the onSuccess callbacks in the mutations
    } catch (error) {
      console.error(isEditMode ? "Error updating flyer:" : "Error adding flyer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = useMemo(() => {
    return (
      <div className='w-[50%] mx-auto'>
        <div className="mb-4">
          <Label>Expiry Date Needed?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Radio
                id="dates-yes"
                value="yes"
                {...register("dates_needed")}
              />
              <Label htmlFor="dates-yes" className="ml-2">
                Yes
              </Label>
            </div>
            <div className="flex items-center">
              <Radio
                id="dates-no"
                value="no"
                {...register("dates_needed")}
              />
              <Label htmlFor="dates-no" className="ml-2">
                No
              </Label>
            </div>
          </div>
        </div>

        {datesNeeded === 'yes' && (
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
                    onSelectedDateChanged={(date) => field.onChange(date)}
                    selected={field.value}
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
                    onSelectedDateChanged={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              />
            </div>
          </div>
        )}
        
        <div className='mb-4'>
          <MultiSelectSearch 
            allProductInfo={allProductInfo} 
            onChange={handleProductSelection}
            initialSelectedProducts={flyerToEdit?.products || []}
          />
          <input
            type="hidden"
            {...register('products')}
          />
        </div>

        <div className='mb-4'>
          <MultiSelectSearch 
            allProductInfo={offersData || []} 
            onChange={handleOfferSelection}
            initialSelectedProducts={flyerToEdit?.offers || []}
            valueKey="offer_title_eng"
            idKey="id"
          />
          <input
            type="hidden"
            {...register('offers')}
          />
        </div>

        <ImageUpload 
          title="Upload Image"
          index="flyer"
          register={register}
          onUploadSuccess={handleImageUploadSuccess}
          initialImage={isEditMode && flyerToEdit?.image ? `${API_BASE_URL}${flyerToEdit.image}` : null}
        />
      </div>
    );
  }, [register, control, handleImageUploadSuccess, isEditMode, flyerToEdit, allProductInfo, offersData, handleProductSelection, handleOfferSelection, datesNeeded]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className='modalfav'>
      <Modal.Body>
        <div className='my-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
              <h1>{isEditMode ? 'Edit Flyer' : 'Add Flyer'}</h1>
            </div>

            {formFields}

            <div className="mt-8 w-[50%] mx-auto">
              <Button 
                type="submit" 
                className="w-full py-2 bg-yellow text-black rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : (isEditMode ? "Update Flyer" : "Add Flyer")}
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