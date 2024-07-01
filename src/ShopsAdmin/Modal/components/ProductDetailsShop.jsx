import { Button, Datepicker, Modal, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormFieldShop from './FormFieldShop';
import FormFieldDescription from './FormFieldDescription';
import ErrorMessage from '../../../Pages/Authentication/ErrorValidation';

const fetchCategories = async () => {
  const response = await fetch('https://hezqa.com/api/categories');
  if (response.status !== 200) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.data.categories.cat_eng;
};

function ProductDetailsShop({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    onError: () => {
      navigate('/404error');
    }
  });

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data) => {
    console.log("Form submitted. Data:", data);
    onClose();
  };

  const formFieldName = "Product Name";
  const registerName = "product_name";

  React.useEffect(() => {
    if (categories) {
      console.log('Categories data:', categories);
    }
  }, [categories]);

  return (
    <div>
      <Modal show={isOpen} onClose={onClose} className='modalfav'>
        <Modal.Body>
          <div className='my-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-[50%] mx-auto flex justify-center py-2 text-[22px] font-semibold mb-4 '>
                <h1>Product Details</h1>
              </div>
              
              {/* FormField Product Name components */}
              <FormFieldShop name={formFieldName} language="ENG" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="ARB" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="HIN" register={register} errors={errors} registerName={registerName} />
              <FormFieldShop name={formFieldName} language="MAL" register={register} errors={errors} registerName={registerName} />

              {/* FormFieldDescription components */}
              <FormFieldDescription language="ENG" register={register} errors={errors} />
              <FormFieldDescription language="ARB" register={register} errors={errors} />
              <FormFieldDescription language="HIN" register={register} errors={errors} />
              <FormFieldDescription language="MAL" register={register} errors={errors} />

              <div className='w-[50%] mx-auto'>
                {/* Product Category */}
                <div className='mb-4 form-select'>
                  <Select
                    id="productCategory"
                    {...register(`productCategory`, {
                      required: `Product category is required`,
                    })}
                    className="w-[100%] form-select rounded-none"
                    style={{borderRadius:'6px'}}
                  >
                    <option value="">Select Product Category</option>
                    {isLoading ? (
                      <option>Loading categories...</option>
                    ) : error ? (
                      <option>Error loading categories</option>
                    ) : (
                      categories && categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))
                    )}
                  </Select>
                  {errors.productCategory && <ErrorMessage message={errors.productCategory.message} />}
                </div>

                

                {/* Normal Price */}
                <div className='mb-4'>
                  <TextInput
                    className="form-today w-[100%]"
                    id="normalPrice"
                    type="text"
                    placeholder="Normal Price"
                    {...register(`normalPrice`, {
                      required: `Normal Price is required`,
                    })}
                  />
                  {errors.normalPrice && <ErrorMessage message={errors.normalPrice.message} />}
                </div>

                {/* Offer Price */}
                <div className='mb-4'>
                  <TextInput
                    className="form-today w-[100%]"
                    id="offerPrice"
                    type="text"
                    placeholder="Offer Price"
                    {...register(`offerPrice`, {
                      required: `Offer Price is required`,
                    })}
                  />
                  {errors.offerPrice && <ErrorMessage message={errors.offerPrice.message} />}
                </div>

                {/* Offer Type */}
                <div className='mb-4 form-select'>
                  <Select
                    id="offerType"
                    {...register(`offerType`, {
                      required: `Offer type is required`,
                    })}
                    className="w-[100%] form-select rounded-none"
                    style={{borderRadius:'6px'}}
                  >
                    <option value="">Select Offer Type</option>
                    <option value="eid">Eid Offer</option>
                    <option value="christmas">Christmas Offer</option>
                    <option value="newyear">New Year Offer</option>
                    <option value="summer">Summer Sale</option>
                    <option value="blackfriday">Black Friday Deal</option>
                    <option value="ramadan">Ramadan Special</option>
                  </Select>
                  {errors.offerType && <ErrorMessage message={errors.offerType.message} />}
                </div>
            <div className='flex gap-2'>
              <div className='date'>
              <Datepicker className='date-c'/>
              </div>
              <div className='date'>
              <Datepicker className='date-c'/>
              </div>

            
             

            </div>
              </div>

              <div className="mt-8 w-[50%] mx-auto">
                <Button
                  type="submit"
                  className="w-full py-2 bg-yellow text-black rounded"
                >
                  Upload
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

export default ProductDetailsShop;