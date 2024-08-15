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
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";


// Function to fetch categories
const fetchCategories = async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${API_BASE_URL}/api/restaurent/all-categories`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data.data.categories || [];
};

// Function to fetch tags
const fetchTags = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/tags`);
  return response.data.data.tags || [];
};

function Todayspecial({ isOpen, onClose, modalType, itemToEdit, currencySymbol }) {
  const navigate = useNavigate();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [normalPriceFocused, setNormalPriceFocused] = useState(false);
  const [offerPriceFocused, setOfferPriceFocused] = useState(false);
  const [isEditMode] = useState(modalType === "Edit Menu");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch, // Add this line
  } = useForm();

  // Use React Query to fetch categories
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Use React Query to fetch tags
  const {
    data: tags = [],
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  // Mutation for adding or editing a menu item
  const mutation = useMutation(
    async (formData) => {
      const authToken = localStorage.getItem("authToken");
      const url = modalType === "Edit Menu" ? `${API_BASE_URL}/api/restaurent/edit-menu` : `${API_BASE_URL}/api/restaurent/add-menu`;

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Mutation successful. Response data:", data);
        queryClient.invalidateQueries("menuItems");
        handleCloseModal();
      },
      onError: (error) => {
        navigate("/404error");
      },
    }
  );

  useEffect(() => {
    if (isOpen) {
      reset();
      setImageUploaded(false);
      queryClient.resetQueries("categories");
      queryClient.resetQueries("tags");

      if (modalType === "Edit Menu" && itemToEdit) {
        setValue("menu_eng", itemToEdit.menu_eng);
        setValue("menu_ar", itemToEdit.menu_ar);
        setValue("menu_hin", itemToEdit.menu_hin);
        setValue("menu_mal", itemToEdit.menu_mal);
        setValue("desc_eng", itemToEdit.desc_eng);
        setValue("desc_ar", itemToEdit.desc_ar);
        setValue("desc_hin", itemToEdit.desc_hin);
        setValue("desc_mal", itemToEdit.desc_mal);
        setValue("cat_id", itemToEdit.cat_id.toString());
        setValue("type", itemToEdit.type);
        setValue("normal_price", itemToEdit.normal_price);
        setValue("offer_price", itemToEdit.offer_price);
        setValue("tag_id", itemToEdit.tag_id.toString());
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
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.cover && data.cover[0]) {
        formData.append("image", data.cover[0]);
      }

      if (modalType === "Edit Menu" && itemToEdit) {
        formData.append("menu_id", itemToEdit.id);
      }

      console.log("Form data before sending:", Object.fromEntries(formData));

      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseModal = () => {
    reset();
    setImageUploaded(false);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className="" theme={modalshop}>
      <Modal.Body className="shopsadminmodal font-inter relative">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h1 className="text-[22px] font-semibold mb-4 w-[50%] mx-auto flex justify-center py-2">
            {modalType === "Edit Menu" ? "Edit Menu Item" : "Add Menu Item"}
          </h1>

          <FormFieldLanguage language="eng" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldLanguage language="ar" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldLanguage language="hin" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldLanguage language="mal" register={register} errors={errors} isEditMode={isEditMode} />

          <FormFieldDescription language="eng" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldDescription language="ar" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldDescription language="hin" register={register} errors={errors} isEditMode={isEditMode} />
          <FormFieldDescription language="mal" register={register} errors={errors} isEditMode={isEditMode} />

          <div className="w-[50%] mx-auto">
            <div className="mb-4 form-select">
              <Select
                id="categoryOfDish"
                {...register(`cat_id`, {
                  required: `Category of dish is required`,
                })}
                className="w-[100%] form-select"
                disabled={isLoading}
                value={watch('cat_id')}
              >
                <option value="">Select Category of Dish</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.cat_eng}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No categories available
                  </option>
                )}
              </Select>
              {errors.categoryOfDish && <ErrorMessage message={errors.categoryOfDish.message} />}
              {isError && <ErrorMessage message="Failed to load categories" />}
            </div>

            <div className="mb-4 form-select">
              <Select
                id="typeOfDish"
                {...register(`type`, {
                  required: `Type of dish is required`,
                })}
                className="w-[100%] form-select"
                value={watch('type')}
              >
                <option value="">Select Type of Dish</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </Select>
              {errors.typeOfDish && <ErrorMessage message={errors.typeOfDish.message} />}
            </div>

            <div className="mb-4 form-select">
              <Select
                id="tagSelect"
                {...register(`tag_id`, {
                  required: `Tag is required`,
                })}
                className="w-[100%] form-select"
                disabled={isTagsLoading}
                value={watch('tag_id')}
              >
                <option value="">Select Tag</option>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <option key={tag.id} value={tag.id.toString()}>
                      {tag.tag_eng}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No tags available
                  </option>
                )}
              </Select>
              {errors.tag_id && <ErrorMessage message={errors.tag_id.message} />}
              {isTagsError && <ErrorMessage message="Failed to load tags" />}
            </div>

            {/* Normal Price */}
            <div className="mb-4 relative">
              <TextInput
                className="form-today w-[100%] peer"
                id="normalPrice"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder=" "
                onFocus={() => setNormalPriceFocused(true)}
                onBlur={(e) => {
                  if (e.target.value === "" && !isEditMode) {
                    setNormalPriceFocused(false);
                  }
                }}
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
              <label
                htmlFor="normalPrice"
                className={`absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none
                  ${
                    normalPriceFocused || isEditMode
                      ? "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      : "text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%]"
                  }`}
              >
                Normal Price (in {currencySymbol})
              </label>
              {errors.normal_price && <ErrorMessage message={errors.normal_price.message} />}
            </div>

            {/* Offer Price */}
            <div className="mb-4 relative">
              <TextInput
                className="form-today w-[100%] peer"
                id="offerPrice"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder=" "
                onFocus={() => setOfferPriceFocused(true)}
                onBlur={(e) => {
                  if (e.target.value === "" && !isEditMode) {
                    setOfferPriceFocused(false);
                  }
                }}
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
              <label
                htmlFor="offerPrice"
                className={`absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none
                  ${
                    offerPriceFocused || isEditMode
                      ? "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      : "text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%]"
                  }`}
              >
                Offer Price (in {currencySymbol})
              </label>
              {errors.offer_price && <ErrorMessage message={errors.offer_price.message} />}
            </div>
          </div>

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
            <Button type="submit" className="w-full py-2 bg-yellow text-black rounded" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Uploading..." : modalType === "Edit Menu" ? "Update" : "Upload"}
            </Button>
          </div>
        </form>
        <div className="absolute top-0 right-0 mt-3 mr-3">
          <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white" onClick={handleCloseModal}>
            <IoIosClose className="text-base cursor-pointer" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Todayspecial;