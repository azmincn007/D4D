import React from "react";
import { Label, Modal, TextInput, Dropdown } from "flowbite-react"; // Assuming TextInput and Dropdown components are imported
import ProfileBanner from "../Components/Profilebanner";
import { useForm } from "react-hook-form";
import "./Modalsprofile.css";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import { modalshop } from "../../Themes/Modaltheme";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";

function EditDetailsModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Log the form data to the console
    onClose(); // Call the onClose function to close the modal
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
    <Modal show={isOpen} onClose={onClose} theme={modalshop}>
      <Modal.Body className="shopsadminmodal font-inter relative mb-8">
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
          <div className="w-[50%] mx-auto formtext">
            <div className="overflow-y-auto max-h-64">
              {labels.map((label, index) => (
                <div key={index} className={`flex flex-col items-baseline ${errors[`org${index}`] ? "mb-1" : "mb-2"}`}>
                  <div className="mb-1">
                    <Label htmlFor={`field${index}`} value={label} className="labelstyle" />
                  </div>
                  <div className="w-[100%] formtext">
                    {label === "Password" || label === "Confirm Password" ? (
                      <PasswordInputAdmin
                        register={register}
                        name={label.toLowerCase().replace(/\s/g, "")} // Convert label to camelCase without spaces
                        placeholder={label}
                        rules={{
                          minLength: {
                            value: 6,
                            message: `${label} must be at least 6 characters long`,
                          },
                        }}
                        error={errors[label.toLowerCase().replace(/\s/g, "")]}
                        className="w-[250px]"
                      />
                    ) : label === "Email Id" ? (
                      <TextInput
                        className="form-input w-[100%]"
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
                        className="form-input w-[100%]"
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
              <div className="orgdroptwo  mb-8">
                <Dropdown label="Types Of organisation" dismissOnClick={false}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </div>

              <div className="flex justify-between gap-4 mb-8">
                <div className="orgdroptwo">
                  <Dropdown label="Country" dismissOnClick={false}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Dropdown>
                </div>
                <div className="orgdroptwo">
                  <Dropdown label="Region" dismissOnClick={false}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              <div className={`flex flex-col items-baseline ${errors.proprietorName ? "mb-1" : "mb-2"}`}>
                <div className="mb-2 ">
                  <Label htmlFor="proprietorName" value="Proprietor's Name" className="labelstyle" />
                </div>
                <div className="w-[100%] formtext">
                  <TextInput
                    className="form-input w-[100%]"
                    id="proprietorName"
                    type="text"
                    placeholder="Enter Proprietor's Name"
                    {...register("proprietorName")}
                  />
                </div>
                {errors.proprietorName && <ErrorMessage message={errors.proprietorName.message} />}
              </div>

              <div>
                <div className="mb-2">
                  <Label htmlFor="Mobile Number" value="Mobile Number" className="labelstyle" />
                </div>
                <div className="flex ">
                  <div className="orgdroptwo w-[20%] mr-4 ">
                    <Dropdown label="+91" dismissOnClick={false}>
                      <Dropdown.Item>+62</Dropdown.Item>
                      <Dropdown.Item>+45</Dropdown.Item>
                      <Dropdown.Item>+87</Dropdown.Item>
                      <Dropdown.Item>+45</Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div className="w-[100%]">
                    {" "}
                    <div className="w-[100%] formtext">
                      <TextInput
                        className="form-input w-[100%]"
                        id="proprietorName"
                        type="text"
                        placeholder="Enter Proprietor's Name"
                        {...register("proprietorName")}
                      />
                    </div>
                  </div>
                </div>


                <div className="mb-2">
                  <Label htmlFor="Alternative Mobile Number" value=" AlternativeMobile Number" className="labelstyle" />
                </div>
                <div className="flex ">
                  <div className="orgdroptwo w-[20%] mr-4 ">
                    <Dropdown label="+91" dismissOnClick={false}>
                      <Dropdown.Item>8</Dropdown.Item>
                      <Dropdown.Item>s</Dropdown.Item>
                      <Dropdown.Item>d</Dropdown.Item>
                      <Dropdown.Item>d</Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div className="w-[100%]">
                    {" "}
                    <div className="w-[100%] formtext">
                      <TextInput
                        className="form-input w-[100%]"
                        id="proprietorName"
                        type="text"
                        placeholder="Enter Proprietor's Name"
                        {...register("proprietorName")}
                      />
                    </div>
                  </div>
                  
                </div>
                <div className="mb-2">
                  <Label htmlFor="Short description of your organisation" value=" Short description of your organisation" className="labelstyle" />
                </div>
                 <div className="w-[100%] formtext">
                      <TextInput
                        className="form-inputdesc w-[100%] h-[80px]" // Increased height here
                        id="shortDescription"
                        type="text"
                       
                        {...register("shortDescription")}
                      />
                    </div>
              </div>

              
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditDetailsModal;
