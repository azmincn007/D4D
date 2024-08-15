import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import modaltheme from '../../Themes/Modaltheme';
import { IoIosClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import PasswordInput from '../../Components/authentication/PassworInput';
import ErrorMessage from './ErrorValidation';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { API_BASE_URL } from "../../config/config";


const ResetPasswordModal = ({ isOpen, onClose, email }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [, setAuthValue] = useContext(AuthContext);


  const resetPasswordMutation = useMutation(
    (data) => axios.post(`${API_BASE_URL}/api/user/reset-user-psw`, data),
    {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error resetting password:', error);
        setError('Failed to reset password. Please try again.');
      },
    }
  );

  const onSubmitForm = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    resetPasswordMutation.mutate({ email, password: data.newPassword });
  };

  return (
    <Modal theme={modaltheme} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="flex flex-col items-center font-inter">
          <h2 className="text-[22px] font-semibold mb-16">Create Secure Password</h2>
          <form onSubmit={handleSubmit(onSubmitForm)} className="w-[90%]">
            <div className="mb-4">
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
            </div>
            <div className="mb-16">
              <PasswordInput
                register={register}
                name="confirmPassword"
                placeholder="Confirm New Password"
                rules={{ 
                  required: "Please confirm your password",
                  validate: (val) => {
                    if (watch('newPassword') != val) {
                      return "Your passwords do not match";
                    }
                  }
                }}
                error={errors.confirmPassword}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
            <Button
              type="submit"
              className="bg-yellow auth-button w-full text-white font-semibold py-2 rounded"
              disabled={resetPasswordMutation.isLoading}
            >
              {resetPasswordMutation.isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
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

export default ResetPasswordModal;