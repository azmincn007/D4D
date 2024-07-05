import React, { useState, useEffect } from "react";
import { Modal, Button, Select, TextInput } from "flowbite-react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import "./Modalsprofile.css";
import { modalshop } from "../../Themes/Modaltheme";
import { useForm } from "react-hook-form";
import ImageUpload from "./components/Imageupload";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import FormFieldDescription from "./components/FormFieldDescription";
import FormFieldLanguage from "./components/FormfieldLanguage";

const BASE_URL = 'https://hezqa.com';

// Function to fetch categories
const fetchCategories = async () => {
  const authToken = localStorage.getItem('authToken');
  const response = await axios.get(`${BASE_URL}/api/restaurent/all-categories`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data.data.categories || [];
};

function Todayspecial({ isOpen, onClose, modalType, itemToEdit }) {
  const [imageUploaded, setImageUploaded] = useState(false);


  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Use React Query to fetch categories
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Mutation for adding or editing a menu item
  const mutation = useMutation(
    async (formData) => {
      const authToken = localStorage.getItem('authToken');
      const url = modalType === "Edit Menu" 
        ? `${BASE_URL}/api/restaurent/edit-menu`
        : `${BASE_URL}/api/restaurent/add-menu`;

      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('Mutation successful. Response data:', data);
        queryClient.invalidateQueries('menuItems');
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Mutation error:', error);
        // You can add error handling here, e.g., showing an error message to the user
      }
    }
  );

  useEffect(() => {
    if (isOpen) {
      // Reset the form
      reset();
      setImageUploaded(false);
      
      // Reset the categories data
      queryClient.resetQueries('categories');

      if (modalType === "Edit Menu" && itemToEdit) {
        console.log(itemToEdit, 'items');
        setValue('menu_eng', itemToEdit.menu_eng);
        setValue('menu_ar', itemToEdit.menu_ar);
        setValue('menu_hin', itemToEdit.menu_hin);
        setValue('menu_mal', itemToEdit.menu_mal);
        setValue('desc_eng', itemToEdit.desc_eng);
        setValue('desc_ar', itemToEdit.desc_ar);
        setValue('desc_hin', itemToEdit.desc_hin);
        setValue('desc_mal', itemToEdit.desc_mal);
        setValue('cat_id', itemToEdit.cat_id);
        setValue('type', itemToEdit.type);
        setValue('normal_price', itemToEdit.normal_price);
        setValue('offer_price', itemToEdit.offer_price);
        setImageUploaded(true);
      }
    }
  }, [isOpen, reset, queryClient, modalType, itemToEdit, setValue]);

  const onSubmit = async (data) => {
    if (!imageUploaded && modalType !== "Edit Menu") {
      alert("Please upload an image");
      return;
    }
    
    try {
      // Create a FormData object
      const formData = new FormData();
      
      // Append all form fields to the FormData
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      // Append the image file
      if (data.cover && data.cover[0]) {
        formData.append('image', data.cover[0]);
      }

      // If editing, append the menu_id to the FormData
      if (modalType === "Edit Menu" && itemToEdit) {
        formData.append('menu_id', itemToEdit.id);
      }

      // Log the data before sending
      console.log('Form data before sending:', Object.fromEntries(formData));

      // Use the mutation to submit the form
      await mutation.mutateAsync(formData);

    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCloseModal = () => {
    reset();
    setImageUploaded(false);
    onClose();
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };


  return (
    <Modal show={isOpen} onClose={handleCloseModal} className="" theme={modalshop}>
      <Modal.Body className="shopsadminmodal font-inter relative">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h1 className="text-[22px] font-semibold mb-4 w-[50%] mx-auto flex justify-center py-2">
            {modalType === "Edit Menu" ? "Edit Menu Item" : "Add Menu Item"}
          </h1>

          {/* FormFieldLanguage components */}
          <FormFieldLanguage language="eng" register={register} errors={errors} />
          <FormFieldLanguage language="ar" register={register} errors={errors} />
          <FormFieldLanguage language="hin" register={register} errors={errors} />
          <FormFieldLanguage language="mal" register={register} errors={errors} />

          {/* FormFieldDescription components */}
          <FormFieldDescription language="eng" register={register} errors={errors} />
          <FormFieldDescription language="ar" register={register} errors={errors} />
          <FormFieldDescription language="hin" register={register} errors={errors} />
          <FormFieldDescription language="mal" register={register} errors={errors} />

          <div className="w-[50%] mx-auto">
            {/* Category of Dish */}
            <div className="mb-4 form-select">
              <Select
                id="categoryOfDish"
                {...register(`cat_id`, {
                  required: `Category of dish is required`,
                })}
                className="w-[100%] form-select"
                disabled={isLoading}
              >
                <option value="">Select Category of Dish</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.cat_eng}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No categories available</option>
                )}
              </Select>
              {errors.categoryOfDish && <ErrorMessage message={errors.categoryOfDish.message} />}
              {isError && <ErrorMessage message="Failed to load categories" />}
            </div>

            {/* Type of Dish */}
            <div className="mb-4 form-select">
              <Select
                id="typeOfDish"
                {...register(`type`, {
                  required: `Type of dish is required`,
                })}
                className="w-[100%] form-select "
              >
                <option value="">Select Type of Dish</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </Select>
              {errors.typeOfDish && <ErrorMessage message={errors.typeOfDish.message} />}
            </div>

            {/* Normal Price */}
            <div className="mb-4">
              <TextInput
                className="form-today w-[100%]"
                id="normalPrice"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Normal Price"
                onKeyDown={(e) => {
                  if (!/[0-9.]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                    e.preventDefault();
                  }
                }}
                {...register(`normal_price`, {
                  required: `Normal Price is required`,
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: "Please enter a valid number with up to 2 decimal places",
                  },
                })}
              />
              {errors.normalPrice && <ErrorMessage message={errors.normalPrice.message} />}
            </div>

            {/* Offer Price */}
            <div className="mb-4">
              <TextInput
                className="form-today w-[100%]"
                id="offerPrice"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder="Offer Price"
                onKeyDown={(e) => {
                  if (!/[0-9.]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                    e.preventDefault();
                  }
                }}
                {...register(`offer_price`, {
                  required: `Offer Price is required`,
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: "Please enter a valid number with up to 2 decimal places",
                  },
                })}
              />
              {errors.offerPrice && <ErrorMessage message={errors.offerPrice.message} />}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col w-[60%] mx-auto">
            <ImageUpload 
              title="cover" 
              index={0} 
              register={register} 
              onUploadSuccess={() => setImageUploaded(true)} 
              initialImage={itemToEdit?.image ? `${BASE_URL}${itemToEdit.image}` : null}
            />
          </div>

          <div className="mt-4 w-[50%] mx-auto">
            <Button 
              type="submit" 
              className="w-full py-2 bg-yellow text-black rounded"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Uploading...' : (modalType === "Edit Menu" ? 'Update' : 'Upload')}
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