import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { modalthemeNational } from "../../Themes/Modaltheme";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import PasswordInput from "../authentication/PassworInput";
import { useMutation } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import LoginSuccess from "../../Pages/Authentication/FramerMotions.jsx/LoginSuccess";

const ChangePasswordModal = ({ isOpen, onClose, email }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const newPassword = watch("newPassword");

  const changePasswordMutation = useMutation(
    (data) => axios.post(`${API_BASE_URL}/api/user/reset-user-psw`, data),
    {
      onSuccess: () => {
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          handleClose();
        }, 2000); // Close the modal after 2 seconds
      },
    }
  );

  const onSubmit = (data) => {
    changePasswordMutation.mutate({ email, password: data.newPassword });
  };

  // Function to handle modal closing
  const handleClose = () => {
    reset(); // Reset form fields
    onClose(); // Close the modal
  };

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={handleClose}>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[70%] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div>
                <PasswordInput
                  register={register}
                  name="newPassword"
                  placeholder="New Password"
                  rules={{
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    }
                  }}
                  error={errors.newPassword}
                />
                <div className={`${errors.newPassword ? 'mb-2' : 'mb-4'} block`}></div>
              </div>
              <div>
                <PasswordInput
                  register={register}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  rules={{
                    required: "Confirm new password is required",
                    validate: (value) => value === newPassword || "Passwords do not match",
                  }}
                  error={errors.confirmNewPassword}
                />
                <div className={`${errors.confirmNewPassword ? 'mb-2' : 'mb-4'} block`}></div>
              </div>
              <Button
                className="bg-yellow auth-button"
                type="submit"
                disabled={changePasswordMutation.isLoading}
              >
                {changePasswordMutation.isLoading ? (
                  <>
                    <Spinner size="sm" light={true} />
                    <span className="mloading-2">Changing...</span>
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
          <div className="absolute top-0 right-0 mt-3 mr-3">
            <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
              <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
            </div>
          </div>
        </div>
        {loginSuccess && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <LoginSuccess successMessage="Password changed successfully!" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;