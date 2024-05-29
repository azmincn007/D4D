import { Button, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import flowbiteinput from "../../Themes/Flowbiteinput";
import LoginTab from "../../Components/authentication/Togleauthentication";
import { IoIosClose } from "react-icons/io";
import Flowbiteradio from "../../Themes/FlowbiteRadiobutton";
import ErrorMessage from "./ErrorValidation";

function SignupPopup({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    console.log("Submitted Data:", data);
    onSubmit(data.mobileNumber);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <h1 className="text-base font-semibold py-2">Signup</h1>
    
      <div className="form py-5 w-[90%]">
        <form
          className="flex max-w-md flex-col gap-3"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="email"
              type="email"
              placeholder=" Email"
              {...register("email", {
                required: "Email is requird",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              placeholder="Password"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="mobileNumber"
              type="text"
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.mobileNumber && <ErrorMessage message={errors.mobileNumber.message} />}
          </div>
          <div className="flex items-center justify-between gap-2 pb-2">
            <fieldset className="flex max-w-md gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  theme={Flowbiteradio}
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked
                  {...register("gender", { required: "Gender is required" })}
                />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  theme={Flowbiteradio}
                  id="female"
                  name="gender"
                  value="female"
              
                  {...register("gender", { required: "Gender is required" })}
                />
                <Label htmlFor="female">Female</Label>
              </div>
            </fieldset>
          </div>
          
          <Button className=" bg-yellow auth-button" type="submit">
            Continue
          </Button>
        </form>
      </div>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
        </div>
      </div>
    </>
  );
}

export default SignupPopup;