import { Button, Label, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import { IoIosClose } from "react-icons/io";
import { useMutation } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import LoginSuccess from "../../Pages/Authentication/FramerMotions.jsx/LoginSuccess";

function CreateSecurepassword({ email, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("newPassword");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation(
    (data) => axios.post(`${API_BASE_URL}/api/reset-shop-psw`, data),
    {
      onSuccess: () => {
        setPasswordUpdateSuccess(true);
        setTimeout(() => {
          setPasswordUpdateSuccess(false);
          onClose();
        }, 2000);
      },
      onError: (error) => {
        console.error("Password reset failed:", error);
        if (error.response && error.response.status !== 400) {
          navigate('/404error');
          return null;
        }
      },
    }
  );

  const handleContinueToLogin = (data) => {
    resetPasswordMutation.mutate({ email, password: data.newPassword });
  };

  if (resetPasswordMutation.isError && resetPasswordMutation.error.response?.status !== 400) {
    navigate('/404error');
    return null;
  }

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] ">
      {passwordUpdateSuccess && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <LoginSuccess successMessage="Password Updated Successfully!" />
        </div>
      )}
      <h1 className="text-[28px] font-semibold">Change Password</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleContinueToLogin)}
      >
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

        <Button
          className="mt-1 bg-yellow text-white auth-button"
          type="submit"
          disabled={resetPasswordMutation.isLoading}
        >
          {resetPasswordMutation.isLoading ? (
            <>
              <Spinner size="sm" light={true} />
              <span className="ml-2">Resetting...</span>
            </>
          ) : (
            "Submit new password"
          )}
        </Button>
        {resetPasswordMutation.isError && resetPasswordMutation.error.response?.status === 400 && (
          <ErrorMessage message="Failed to reset password. Please try again." />
        )}
      </form>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default CreateSecurepassword;