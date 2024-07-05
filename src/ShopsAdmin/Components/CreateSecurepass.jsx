import { Button, Label } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import { IoIosClose } from "react-icons/io";

function CreateSecurepassword({email, onClose}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleContinueToLogin = (data) => {
    console.log(data);
    // Handle any necessary logic here
    navigate('/loginadmin'); // Navigate to the login page
  };

  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");

  const handleProfileModalClose = () => {
   
    onClose();
  };
  

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] ">
      <h1 className="text-[28px] font-semibold">Change Password</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleContinueToLogin)}
      >
        <div className={`flex flex-col items-baseline ${errors.oldPassword ? 'mb-2' : 'mb-2'}`}>
          <div className="mb-1">
            <Label htmlFor="oldPassword" value="Old Password" className="labelstyle" />
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="oldPassword"
              placeholder="Enter Old Password"
              rules={{
                required: "Old password is required",
              }}
              error={errors.oldPassword}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className={`flex flex-col items-baseline ${errors.newPassword ? 'mb-2' : 'mb-2'}`}>
          <div className="mb-1">
            <Label htmlFor="newPassword" value="New Password" className="labelstyle" />
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="newPassword"
              placeholder="Enter New Password"
              rules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: (value) =>
                  value !== oldPassword || "New password must be different from the old password",
              }}
              error={errors.newPassword}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className={`flex flex-col items-baseline ${errors.confirmPassword ? 'mb-2' : 'mb-2'}`}>
          <div className="mb-1">
            <Label htmlFor="confirmPassword" value="Confirm New Password" className="labelstyle" />
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="confirmPassword"
              placeholder="Confirm New Password"
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              }}
              error={errors.confirmPassword}
              className="w-[250px]"
            />
          </div>
        </div>

        <Button className="mt-1 bg-yellow text-white auth-button" type="submit">
          Continue to Login
        </Button>
        <div className="flex items-center justify-between pb-2"></div>
      </form>
      <div className="absolute top-0 right-0 mt-3 mr-3">
          <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
            <IoIosClose className="text-base cursor-pointer" onClick={handleProfileModalClose} />
          </div>
        </div>
    </div>
  );
}

export default CreateSecurepassword;