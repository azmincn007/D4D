import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Datepicker, Label, Modal, Select, TextInput } from "flowbite-react";
import { IoIosClose } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormFieldShop from "./FormFieldShop";
import FormFieldDescription from "./FormFieldDescription";
import ErrorMessage from "../../../Pages/Authentication/ErrorValidation";

const BASE_URL = "https://hezqa.com";

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
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const fetchSubcategories = useCallback(async (categoryId) => {
    if (!categoryId) return;
    try {
      const { data } = await axios.get(`${BASE_URL}/api/subcategories/${categoryId}`);
      setSubcategories(data.data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen && selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [isOpen, selectedCategory, fetchSubcategories]);

  useEffect(() => {
    if (productToEdit) {
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
        valid_from: formatDate(productToEdit.valid_from),
        valid_to: formatDate(productToEdit.valid_to),
      });
      setSelectedCategory(productToEdit.cat_id);
      setPreviewUrl(`${BASE_URL}${productToEdit.image}`);
      setFileName(productToEdit.image.split("/").pop());
    }
  }, [productToEdit, reset]);

  const handleCloseModal = useCallback(() => {
    // Clear the form
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
      valid_from: "",
      valid_to: "",
    });
    
    // Reset other state
    setSelectedCategory("");
    setImageFile(null);
    setPreviewUrl("");
    setFileName("");
    
    // Close the modal
    onClose();
  }, [onClose, reset]);

  const handleImageChange = useCallback((e) => {
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
  }, []);

  const onSubmit = useCallback(async (data) => {
    if (!imageFile && !productToEdit) {
      alert("Please upload an image before submitting.");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (productToEdit) {
      formData.append("product_id", productToEdit.id);
    }

    const url = productToEdit ? `${BASE_URL}/api/restaurent/edit-product` : `${BASE_URL}/api/restaurent/add-product`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(productToEdit ? "Product updated successfully:" : "Product added successfully:", response.data);
      alert(productToEdit ? "Product updated successfully!" : "Product added successfully!");
      reset();
      setImageFile(null);
      setPreviewUrl("");
      onClose();
      queryClient.invalidateQueries("products");
    } catch (error) {
      console.error(productToEdit ? "Error updating product:" : "Error adding product:", error);
      alert(productToEdit ? "Error updating product. Please try again." : "Error adding product. Please try again.");
    }
  }, [imageFile, productToEdit, reset, onClose, queryClient]);

  const watchCategory = watch("cat_id");

  useEffect(() => {
    if (watchCategory) {
      setSelectedCategory(watchCategory);
    }
  }, [watchCategory]);

  const formFields = useMemo(() => {
    return ['eng', 'ar', 'hin', 'mal'].map(lang => (
      <React.Fragment key={lang}>
        <FormFieldShop name="Product Name" language={lang} register={register} errors={errors} registerName="product" />
        <FormFieldDescription language={lang} register={register} errors={errors} />
      </React.Fragment>
    ));
  }, [register, errors]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className="modalfav">
      <Modal.Body>
        <div className="my-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 ">
              <h1>{productToEdit ? "Edit Product" : "Add Product"}</h1>
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

              <div className="mb-4">
                <TextInput
                  className="form-today w-[100%]"
                  id="normalPrice"
                  type="text"
                  placeholder="Normal Price"
                  {...register(`normal_price`, {
                    required: `Normal Price is required`,
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter only digits",
                    },
                  })}
                />
                {errors.normal_price && <ErrorMessage message={errors.normal_price.message} />}
              </div>

              <div className="mb-4">
                <TextInput
                  className="form-today w-[100%]"
                  id="offerPrice"
                  type="text"
                  placeholder="Offer Price"
                  {...register(`offer_price`, {
                    required: `Offer Price is required`,
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter only digits",
                    },
                  })}
                />
                {errors.offer_price && <ErrorMessage message={errors.offer_price.message} />}
              </div>

              <div className="flex gap-4">
                <div className="mb-4">
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

                <div className="mb-4">
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
                <Label htmlFor="image-upload" value="Upload Product Image" />
                <div className="flex items-center">
                  <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} className="hidden" />
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
              <Button type="submit" className="w-full py-2 bg-yellow text-black rounded">
                {productToEdit ? "Update Product" : "Add Product"}
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