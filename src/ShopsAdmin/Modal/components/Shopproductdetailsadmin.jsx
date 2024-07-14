import { useForm } from "react-hook-form";
import ImageUpload from "./Imageupload";
import { Modal, Select } from "flowbite-react";

function ShopProductDetailsAdmin({ isOpen, onClose, flyerToEdit,categories }) {
  const { register, handleSubmit, control, formState: { errors }, watch, reset } = useForm();
console.log(categories);
  // ...

  const handleImageUploadSuccess = (file) => {
    console.log("Image upload success, file:", file.name);
    setImageFile(file);
    setImageUploaded(true);
  };

  const handleImageUploadError = (error) => {
    console.error("Image upload error:", error);
    setImageUploaded(false);
    setImageFile(null);
  };
  const BASE_URL = 'https://hezqa.com';

  return (
    <Modal show={isOpen}  className='modalfav'>
      <Modal.Body>
      <div className='my-4'>
          <form >
            <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
              <h1>{flyerToEdit ? 'Edit Flyer' : 'Add Flyer'}</h1>
            </div>
            <div className='w-[50%] mx-auto'>
            {/* <div className='mb-4 form-select'>
            <Select
                  id="cat_id"
                  {...register(`cat_id`, {
                    required: `Product category is required`,
                  })}
                  className="w-[100%] form-select rounded-none"
                  style={{borderRadius:'6px'}}
                >
                  <option value="">Select Product Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.cat_eng}</option>
                  ))}
                </Select>
                {errors.cat_id && <ErrorMessage message={errors.cat_id.message} />}
              </div>

               <div className="mb-4 form-select">
              <Select
                id="subcat_id"
                {...register(`subcat_id`, {
                  required: 'Subcategory is required',
                })}
                className="w-[100%] form-select rounded-none"
                style={{ borderRadius: '6px' }}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.subcat_eng}
                  </option>
                ))}
              </Select>
              {errors.subcat_id && <ErrorMessage message={errors.subcat_id.message} />}
            </div> */}
              </div>
            
      <ImageUpload
        title="Upload Image"
        index="product"
        register={register}
        onUploadSuccess={handleImageUploadSuccess}
        onError={handleImageUploadError}
        initialImage={flyerToEdit?.image ? `${BASE_URL}${flyerToEdit.image}` : null}
      />
     </form>
    </div>
    </Modal.Body>
    </Modal>

  );
}

export default ShopProductDetailsAdmin