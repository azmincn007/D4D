// EditDetailsModal.js
import React from "react";
import { Label, Modal, TextInput, Dropdown } from "flowbite-react";
import ProfileBanner from "../Components/Profilebanner";
import { useForm } from "react-hook-form";
import "./Modalsprofile.css";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import { modalshop } from "../../Themes/Modaltheme";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import { IoIosClose } from 'react-icons/io';

function EditDetailsModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  const labels = [
    "Name of the Organisation (ENG)",
    "Name of the Organisation (ARB)",
    "Name of the Organisation (MAL)",
    "Name of the Organisation (HIN)",
    "Email Id",
    "Password",
    "Confirm Password",
    "Phone Number",
    "Address",
  ];

  const restaurantData = [
    {
      name: "Atmosphere Restaurant",
      email: "atmosphere730@gmail.com",
      location: "UAE, Dubai",
      branches: ["Butina - Sharjah", "Qusais", "Jebel Ali"],
    },
  ];

  return (
    <Modal show={isOpen} onClose={onClose} theme={modalshop} size="xl">
      <Modal.Body className="shopsadminmodal font-inter relative mb-8">
        <div className="absolute top-2 right-2">
          <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
            <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
          </div>
        </div>
        <ProfileBanner />
        <div className="flex flex-col items-center mt-16">
          {restaurantData.map((obj, index) => (
            <React.Fragment key={index}>
              <div className="text-sm font-semibold mb-1">{obj.name}</div>
              <div className="text-[#696969] text-xs font-semibold mb-1">{obj.email}</div>
              <div className="text-[#696969] text-xs flex font-semibold mb-4">
                <div>{obj.location}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="h-[1px] bg-black w-[100%] mt-2 mb-8"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mx-auto formtext">
            <div className="overflow-y-auto max-h-[60vh]">
              {labels.map((label, index) => (
                <div key={index} className={`flex flex-col items-baseline ${errors[`org${index}`] ? "mb-1" : "mb-4"}`}>
                  <Label htmlFor={`field${index}`} value={label} className="labelstyle mb-1" />
                  <div className="w-full formtext">
                    {label === "Password" || label === "Confirm Password" ? (
                      <PasswordInputAdmin
                        register={register}
                        name={label.toLowerCase().replace(/\s/g, "")}
                        placeholder={label}
                        rules={{
                          minLength: {
                            value: 6,
                            message: `${label} must be at least 6 characters long`,
                          },
                        }}
                        error={errors[label.toLowerCase().replace(/\s/g, "")]}
                        className="w-full"
                      />
                    ) : label === "Email Id" ? (
                      <TextInput
                        className="form-input w-full"
                        id={`field${index}`}
                        type="email"
                        placeholder={`Enter your ${label}`}
                        {...register(`org${index}`, {
                          pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    ) : (
                      <TextInput
                        className="form-input w-full"
                        id={`field${index}`}
                        type="text"
                        placeholder={`Enter your ${label}`}
                        {...register(`org${index}`)}
                      />
                    )}
                    {errors[`org${index}`] && <ErrorMessage message={errors[`org${index}`].message} />}
                  </div>
                </div>
              ))}
              
              {/* Types of Organisation Dropdown */}
              <div className="mb-4">
                <Label value="Types Of organisation" className="labelstyle mb-1" />
                <Dropdown label="Select type" dismissOnClick={false} className="w-full">
                  <Dropdown.Item>Restaurant</Dropdown.Item>
                  <Dropdown.Item>Cafe</Dropdown.Item>
                  <Dropdown.Item>Bakery</Dropdown.Item>
                  <Dropdown.Item>Food Truck</Dropdown.Item>
                </Dropdown>
              </div>

              {/* Country and Region Dropdowns */}
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <Label value="Country" className="labelstyle mb-1" />
                  <Dropdown label="Select country" dismissOnClick={false} className="w-full">
                    <Dropdown.Item>USA</Dropdown.Item>
                    <Dropdown.Item>UK</Dropdown.Item>
                    <Dropdown.Item>Canada</Dropdown.Item>
                    <Dropdown.Item>Australia</Dropdown.Item>
                  </Dropdown>
                </div>
                <div className="w-1/2">
                  <Label value="Region" className="labelstyle mb-1" />
                  <Dropdown label="Select region" dismissOnClick={false} className="w-full">
                    <Dropdown.Item>North</Dropdown.Item>
                    <Dropdown.Item>South</Dropdown.Item>
                    <Dropdown.Item>East</Dropdown.Item>
                    <Dropdown.Item>West</Dropdown.Item>
                  </Dropdown>
                </div>
              </div>

              {/* Proprietor's Name */}
              <div className={`flex flex-col items-baseline ${errors.proprietorName ? "mb-1" : "mb-4"}`}>
                <Label htmlFor="proprietorName" value="Proprietor's Name" className="labelstyle mb-1" />
                <TextInput
                  className="form-input w-full"
                  id="proprietorName"
                  type="text"
                  placeholder="Enter Proprietor's Name"
                  {...register("proprietorName")}
                />
                {errors.proprietorName && <ErrorMessage message={errors.proprietorName.message} />}
              </div>

              {/* Mobile Number */}
              <div className="mb-4">
                <Label htmlFor="mobileNumber" value="Mobile Number" className="labelstyle mb-1" />
                <div className="flex">
                  <Dropdown label="+91" dismissOnClick={false} className="w-1/4 mr-2">
                    <Dropdown.Item>+1</Dropdown.Item>
                    <Dropdown.Item>+44</Dropdown.Item>
                    <Dropdown.Item>+61</Dropdown.Item>
                  </Dropdown>
                  <TextInput
                    className="form-input w-3/4"
                    id="mobileNumber"
                    type="tel"
                    placeholder="Enter Mobile Number"
                    {...register("mobileNumber")}
                  />
                </div>
              </div>

              {/* Alternative Mobile Number */}
              <div className="mb-4">
                <Label htmlFor="altMobileNumber" value="Alternative Mobile Number" className="labelstyle mb-1" />
                <div className="flex">
                  <Dropdown label="+91" dismissOnClick={false} className="w-1/4 mr-2">
                    <Dropdown.Item>+1</Dropdown.Item>
                    <Dropdown.Item>+44</Dropdown.Item>
                    <Dropdown.Item>+61</Dropdown.Item>
                  </Dropdown>
                  <TextInput
                    className="form-input w-3/4"
                    id="altMobileNumber"
                    type="tel"
                    placeholder="Enter Alternative Mobile Number"
                    {...register("altMobileNumber")}
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-4">
                <Label htmlFor="shortDescription" value="Short description of your organisation" className="labelstyle mb-1" />
                <textarea
                  className="form-input w-full h-20"
                  id="shortDescription"
                  placeholder="Enter a short description"
                  {...register("shortDescription")}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditDetailsModal;