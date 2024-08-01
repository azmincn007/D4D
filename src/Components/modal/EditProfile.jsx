import React, { useEffect, useMemo } from "react";
import { Button, Label, Modal, TextInput, Radio } from "flowbite-react";
import { modalthemeNational } from "../../Themes/Modaltheme";
import { GrEdit } from "react-icons/gr";
import flowbiteinput from "../../Themes/Flowbiteinput";
import AvatarComponent from "../../Pages/Navbar/navcomponents/AvatarComponent";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import countryList from 'react-select-country-list';

const EditProfile = ({ isOpen, onClose, initialValues }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const countries = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (isOpen && initialValues) {
      reset({
        name: initialValues.name || "",
        email: initialValues.email || "",
        mobileNumber: initialValues.mobile || "",
        country: initialValues.country || "",
        gender: initialValues.gender || "male",
      });
    }
  }, [isOpen, initialValues, reset]);

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[70%] mx-auto">
            {/* Avatar section */}
            <div>
              <div className="relative w-[120px] h-[120px] mx-auto">
                <AvatarComponent height={120} width={120} />
                <div className="absolute bottom-2 right-[18px] -mb-1 -mr-4 bg-gray-900 text-gray-50 rounded-full p-2 flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                  <GrEdit />
                </div>
              </div>
            </div>
            <div>
              <div className="form py-5 w-[100%]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                  {/* Name input */}
                  <div>
                    <TextInput
                      theme={flowbiteinput}
                      id="name"
                      type="text"
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <ErrorMessage message={errors.name.message} />}
                    <div className="mb-4 block"></div>
                  </div>
                  {/* Email input */}
                  <div>
                    <TextInput
                      theme={flowbiteinput}
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && <ErrorMessage message={errors.email.message} />}
                    <div className="mb-4 block"></div>
                  </div>
                  {/* Mobile number input */}
                  <div>
                    <TextInput
                      theme={flowbiteinput}
                      id="mobileNumber"
                      type="tel"
                      placeholder="Mobile Number"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Invalid mobile number",
                        },
                      })}
                    />
                    {errors.mobileNumber && <ErrorMessage message={errors.mobileNumber.message} />}
                    <div className="mb-4 block"></div>
                  </div>
                  {/* Country select */}
                  <div>
                    <select
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      {...register("country", { required: "Country is required" })}
                    >
                      <option value="">Select a country</option>
                      {countries.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.country && <ErrorMessage message={errors.country.message} />}
                  </div>
                  <div className="mb-4 block"></div>
                  {/* Gender radio buttons */}
                  <div className="flex items-center justify-around mb-4">
                    <div className=""> 
                      <Radio 
                        id="male" 
                        name="gender" 
                        value="male" 
                        className="mr-2" 
                        {...register("gender")}
                        defaultChecked={initialValues?.gender === "Male" || !initialValues?.gender}
                      />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div>
                      <Radio 
                        id="female" 
                        name="gender" 
                        value="female" 
                        className="mr-2" 
                        {...register("gender")}
                        defaultChecked={initialValues?.gender === "Female"}
                      />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </div>
                  {/* Submit button */}
                  <Button className="bg-yellow auth-button" type="submit">
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </div>
          {/* Close button */}
          <div className="absolute top-0 right-0 mt-3 mr-3">
            <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
              <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;