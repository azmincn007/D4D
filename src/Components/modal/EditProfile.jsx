import React, { useState } from "react";
import { Button, Label, Modal, TextInput, Radio, Select } from "flowbite-react";
import { modalthemeNational } from "../../Themes/Modaltheme";
import { GrEdit } from "react-icons/gr";
import flowbiteinput from "../../Themes/Flowbiteinput";
import AvatarComponent from "../../Pages/Navbar/navcomponents/AvatarComponent";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";

const ErrorMessage = ({ message }) => (
  <span className="text-red-500 text-sm">{message}</span>
);

const EditProfile = ({ isOpen, onClose, initialValues }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(isOpen);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...initialValues,
      gender: "male", // Set default gender as male
    },
  });

  const countryOptions = [
    { value: "USA", name: "United States" },
    { value: "Canada", name: "Canada" },
    { value: "UK", name: "United Kingdom" },
    { value: "Australia", name: "Australia" },
    { value: "Germany", name: "Germany" },
    { value: "France", name: "France" },
    { value: "Japan", name: "Japan" },
    { value: "China", name: "China" },
  ];

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    onClose();
  };

  const onSubmit = (data) => {
    // Handle form submission with the updated data
    const updatedData = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== "") {
        updatedData[key] = data[key];
      }
    }
    console.log(updatedData);
    handleProfileModalClose();
    // You can perform further actions with the updatedData object
  };

  return (
    <>
      <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
        <Modal.Body>
          <div className="flex justify-center">
            <div className="w-[70%] mx-auto">
              <div>
                <div className="relative w-[120px] h-[120px]">
                  <AvatarComponent height={120} width={120} />
                  <div className="absolute bottom-2 right-[18px] -mb-1 -mr-4 bg-gray-900 text-gray-50 rounded-full p-2 flex items-center justify-center dark:bg-gray-50 dark:text-gray-900">
                    <GrEdit />
                  </div>
                </div>
              </div>
              <div>
                <div className="form py-5 w-[100%]">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div>
                      <TextInput
                        theme={flowbiteinput}
                        id="username"
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                      />
                      <div className="mb-4 block"></div>
                    </div>
                    <div>
                      <TextInput
                        theme={flowbiteinput}
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && <ErrorMessage message={errors.email.message} />}
                      <div className="mb-4 block"></div>
                    </div>
                    <div>
                      <TextInput
                        theme={flowbiteinput}
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                      />
                      <div className="mb-4 block"></div>
                    </div>
                    <div>
                      <TextInput
                        theme={flowbiteinput}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                      />
                      <div className="mb-4 block"></div>
                    </div>
                    <div>
                      <TextInput
                        theme={flowbiteinput}
                        id="mobileNumber"
                        type="tel"
                        placeholder="Mobile Number"
                        {...register("mobileNumber", {
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Invalid mobile number",
                          },
                        })}
                      />
                      {errors.mobileNumber && <ErrorMessage message={errors.mobileNumber.message} />}
                      <div className="mb-4 block"></div>
                    </div>
                    <div>
                      <Select
                        theme={flowbiteinput}
                        id="nationality"
                        placeholder="Select Nationality"
                        style={{
                          backgroundColor: '#F1F1F1',
                          border: 'none',
                          color: '#6D6D6D',
                        }}
                        {...register("nationality")}
                      >
                        <option value="">Select Nationality</option>
                        {countryOptions.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.name}
                          </option>
                        ))}
                      </Select>
                      <div className="mb-4 block"></div>
                    </div>
                    <div className="flex items-center justify-around mb-4">
                      <div className=""> 
                        <Radio id="male" name="gender" value="male" className="mr-2" {...register("gender")} defaultChecked />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div>
                        <Radio id="female" name="gender" value="female" className="mr-2" {...register("gender")} />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div>
                        <Radio id="other" name="gender" value="other" className="mr-2" {...register("gender")} />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </div>

                    <Button className="bg-yellow auth-button" type="submit">
                      Update Profile
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-3">
              <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
                <IoIosClose className="text-base cursor-pointer" onClick={handleProfileModalClose} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;