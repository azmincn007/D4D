import React from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { modalthemeNational } from "../../Themes/Modaltheme";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import PasswordInput from "../authentication/PassworInput";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-[70%] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div>
                <PasswordInput
                  register={register}
                  name="currentPassword"
                  placeholder="Current Password"
                  rules={{ required: "Current password is required" }}
                  error={errors.currentPassword}
                />
                <div className={`${errors.currentPassword ? 'mb-2' : 'mb-4'} block`}></div>
              </div>
              <div>
                <PasswordInput
                  register={register}
                  name="newPassword"
                  placeholder="New Password"
                  rules={{ required: "New password is required" }}
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
                    validate: (value) => value === register("newPassword").value || "Passwords do not match",
                  }}
                  error={errors.confirmNewPassword}
                />
                <div className={`${errors.confirmNewPassword ? 'mb-2' : 'mb-4'} block`}></div>
              </div>
              <Button className="bg-yellow auth-button" type="submit">
                Change Password
              </Button>
            </form>
          </div>
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

export default ChangePasswordModal;