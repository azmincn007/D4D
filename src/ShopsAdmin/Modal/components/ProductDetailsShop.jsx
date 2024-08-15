import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Datepicker, Label, Modal, Select, TextInput, Radio } from "flowbite-react";
import { IoIosClose } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormFieldShop from "./FormFieldShop";
import FormFieldDescription from "./FormFieldDescription";
import ErrorMessage from "../../../Pages/Authentication/ErrorValidation";
import ImageUpload from "./Imageupload";
import { API_BASE_URL } from "../../../config/config";


const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

function ProductDetailsShop({ isOpen, onClose, productToEdit, categories }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      dates_needed: "no",
    }
  });  

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validFrom, setValidFrom] = useState(null);
  const [validTo, setValidTo] = useState(null);

  const datesNeeded = watch("dates_needed");

  const fetchSubcategories = useCallback(async (categoryId) => {
    if (!categoryId) return;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/subcategories/${categoryId}`);
      setSubcategories(data.data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        // Edit mode
        setIsEditMode(true);
        reset({
          product_eng: productToEdit.product_eng,
          product_ar: productToEdit.product_ar,
          product_hin: productToEdit.product_hin,
          product_mal: productToEdit.product_mal,
          desc_eng: productToEdit.desc_eng,
          desc_ar: productToEdit.desc_ar,
          desc_hin: productToEdit.desc_hin,
          desc_mal: productToEdit.desc_mal,
          cat_id: productToEdit.cat_id,
          subcat_id: productToEdit.subcat_id,
          normal_price: productToEdit.normal_price,
          offer_price: productToEdit.offer_price,
          dates_needed: productToEdit.valid_from || productToEdit.valid_to ? "yes" : "no",
        });
        setValidFrom(productToEdit.valid_from ? new Date(productToEdit.valid_from) : null);
        setValidTo(productToEdit.valid_to ? new Date(productToEdit.valid_to) : null);
        setSelectedCategory(productToEdit.cat_id);
        fetchSubcategories(productToEdit.cat_id).then(() => {
          reset((formValues) => ({
            ...formValues,
            subcat_id: productToEdit.subcat_id
          }));
        });
      } else {
        // Add mode
        setIsEditMode(false);
        reset({
          product_eng: "",
          product_ar: "",
          product_hin: "",
          product_mal: "",
          desc_eng: "",
          desc_ar: "",
          desc_hin: "",
          desc_mal: "",
          cat_id: "",
          subcat_id: "",
          normal_price: "",
          offer_price: "",
          dates_needed: "no",
        });
        setValidFrom(null);
        setValidTo(null);
        setSelectedCategory("");
        setSubcategories([]);
        setImageFile(null);
      }
    }
  }, [isOpen, productToEdit, reset, fetchSubcategories]);

  const handleCloseModal = useCallback(() => {
    reset({
      product_eng: "",
      product_ar: "",
      product_hin: "",
      product_mal: "",
      desc_eng: "",
      desc_ar: "",
      desc_hin: "",
      desc_mal: "",
      cat_id: "",
      subcat_id: "",
      normal_price: "",
      offer_price: "",
      dates_needed: "no",
    });
    setValidFrom(null);
    setValidTo(null);
    setSelectedCategory("");
    setImageFile(null);
    setIsEditMode(false);
    onClose();
  }, [onClose, reset]);

  const handleImageUploadSuccess = useCallback((file) => {
    console.log("Image upload success, file:", file);
    setImageFile(file);
  }, []);

  const onSubmit = useCallback(async (data) => {

    // Remove dates_needed from the form data
    const { dates_needed, ...formDataWithoutDates } = data;


    if (!imageFile && !isEditMode) {
      alert("Please upload an image before submitting.");
      return;
    }

    setIsSubmitting(true);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Authentication token not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    Object.entries(formDataWithoutDates).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    if (imageFile) {
      formData.append("image", imageFile);
    }
    
    if (isEditMode) {
      formData.append("product_id", productToEdit.id);
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const url = isEditMode ? `${API_BASE_URL}/api/restaurent/edit-product` : `${API_BASE_URL}/api/restaurent/add-product`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(isEditMode ? "Product updated successfully:" : "Product added successfully:", response.data);
      handleCloseModal();
      queryClient.invalidateQueries("products");
    } catch (error) {
      console.error(isEditMode ? "Error updating product:" : "Error adding product:", error);
      alert(isEditMode ? "Error updating product. Please try again." : "Error adding product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [imageFile, isEditMode, productToEdit, handleCloseModal, queryClient]);

  const watchCategory = watch("cat_id");

  useEffect(() => {
    if (watchCategory) {
      setSelectedCategory(watchCategory);
      fetchSubcategories(watchCategory);
    }
  }, [watchCategory, fetchSubcategories]);

  const PriceInput = ({ id, placeholder, registerName }) => {
    const [isFocused, setIsFocused] = useState(isEditMode);

    useEffect(() => {
      setIsFocused(isEditMode);
    }, [isEditMode]);

    const focusedClassName = 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 px-2 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1';
    const defaultClassName = 'text-gray-500 dark:text-gray-400 -translate-y-1/2 scale-100 top-1/2 left-1/2 -translate-x-1/2 w-[95%]';

    return (
      <div className="mb-4 relative">
        <TextInput
          className="form-today w-[100%] peer"
          id={id}
          type="text"
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (e.target.value === '' && !isEditMode) {
              setIsFocused(false);
            }
          }}
          {...register(registerName, {
            required: `${placeholder} is required`,
            pattern: {
              value: /^\d+$/,
              message: "Please enter only digits",
            },
          })}
        />
        <label
          htmlFor={id}
          className={`absolute text-sm duration-300 transform bg-white dark:bg-gray-900 pointer-events-none
            ${isFocused ? focusedClassName : defaultClassName}`}
        >
          {placeholder}
        </label>
        {errors[registerName] && <ErrorMessage message={errors[registerName].message} />}
      </div>
    );
  };

  const formFields = useMemo(() => {
    return (
      <>
        {['eng', 'ar', 'hin', 'mal'].map(lang => (
          <FormFieldShop 
            key={`product-${lang}`}
            name="Product Name"
            language={lang}
            register={register}
            errors={errors}
            registerName="product"
            isEditMode={isEditMode}
          />
        ))}
        {['eng', 'ar', 'hin', 'mal'].map(lang => (
          <FormFieldDescription 
            key={`desc-${lang}`}
            language={lang} 
            register={register} 
            errors={errors} 
            isEditMode={isEditMode}
          />
        ))}
      </>
    );
  }, [register, errors, isEditMode]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className="modalfav">
      <Modal.Body>
        <div className="my-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 ">
              <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
            </div>

            {formFields}

            <div className="w-[50%] mx-auto">
              <div className="mb-4 form-select">
                <Select
                  id="cat_id"
                  {...register(`cat_id`, {
                    required: `Product category is required`,
                  })}
                  className="w-[100%] form-select rounded-none"
                  style={{ borderRadius: "6px" }}
                >
                  <option value="">Select Product Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.cat_eng}
                    </option>
                  ))}
                </Select>
                {errors.cat_id && <ErrorMessage message={errors.cat_id.message} />}
              </div>

              <div className="mb-4 form-select">
                <Select
                  id="subcat_id"
                  {...register(`subcat_id`, {
                    required: `Product subcategory is required`,
                  })}
                  className="w-[100%] form-select rounded-none"
                  style={{ borderRadius: "6px" }}
                  disabled={!selectedCategory}
                >
                  <option value="">Select Product Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.subcat_eng}
                    </option>
                  ))}
                </Select>
                {errors.subcat_id && <ErrorMessage message={errors.subcat_id.message} />}
              </div>

              <PriceInput 
                id="normalPrice"
                placeholder="Normal Price"
                registerName="normal_price"
              />

              <PriceInput 
                id="offerPrice"
                placeholder="Offer Price"
                registerName="offer_price"
              />

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

              {datesNeeded === "yes" && (
                <div className="flex gap-4">
                  <div className="mb-4">
                    <Label htmlFor="valid_from" value="Valid From" />
                    <Datepicker
                      id="valid_from"
                      className="w-full"
                      onSelectedDateChanged={(date) => setValidFrom(date)}
                      selected={validFrom}
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="valid_to" value="Valid To" />
                    <Datepicker
                      id="valid_to"
                      className="w-full"
                      onSelectedDateChanged={(date) => setValidTo(date)}
                      selected={validTo}
                    />
                  </div>
                </div>
              )}
 
              <ImageUpload 
                title="Upload Image"
                index="product"
                register={register}
                onUploadSuccess={handleImageUploadSuccess}
                initialImage={isEditMode && productToEdit?.image ? `${API_BASE_URL}}${productToEdit.image}` : null}
              />
            </div>

            <div className="mt-8 w-[50%] mx-auto">
              <Button 
                type="submit" 
                className="w-full py-2 bg-yellow text-black rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : (isEditMode ? "Update Product" : "Add Product")}
              </Button>
            </div>
          </form>
          <div className="absolute top-0 right-0 mt-3 mr-3">
            <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white" onClick={handleCloseModal}>
              <IoIosClose className="text-base cursor-pointer" />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ProductDetailsShop);