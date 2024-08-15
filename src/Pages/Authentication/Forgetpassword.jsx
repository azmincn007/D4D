import React, { useContext, useState } from 'react';
import { Modal, TextInput, Button, Spinner } from 'flowbite-react';
import { IoIosClose } from 'react-icons/io';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import modaltheme from '../../Themes/Modaltheme';
import flowbiteinput from '../../Themes/Flowbiteinput';
import { AuthContext } from '../../App';
import { API_BASE_URL } from "../../config/config";
import Otpverify from './Otpverify';
import ResetPasswordModal from './ResetPassword';
import LoginSuccess from "./FramerMotions.jsx/LoginSuccess";

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [otpResponse, setOtpResponse] = useState('');
  const [forgetPasswordSuccess, setForgetPasswordSuccess] = useState(false);
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation(
    (email) => axios.post(`${API_BASE_URL}/api/user/reset-psw-otp`, { email }),
    {
      onSuccess: (response) => {
        setOtpResponse(response.data.data.otp);
        console.log(response.data.data.otp);
        
        setForgetPasswordSuccess(true);
        setTimeout(() => {
          setIsOtpModalOpen(true);
          setForgetPasswordSuccess(false);
        }, 2000);
      },
      onError: (error) => {
        console.error('Password reset error:', error);
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    resetPasswordMutation.mutate(email);
  };

  const handleOtpSubmit = (enteredOtp) => {
    setIsOtpModalOpen(false);
    setIsResetPasswordModalOpen(true);
  };

  const handleOtpVerified = () => {
    setIsOtpModalOpen(false);
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPasswordClose = () => {
    setIsResetPasswordModalOpen(false);
    onClose();
  };

  if (resetPasswordMutation.isError && resetPasswordMutation.error.response?.status !== 400) {
    navigate('/error404');
    return null;
  }

  return (
    <>
      <Modal theme={modaltheme} show={isOpen} onClose={onClose}>
        <Modal.Body>
          <div className="flex flex-col items-center font-inter">
            {forgetPasswordSuccess && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <LoginSuccess successMessage="Forget Password Request Successful!" />
              </div>
            )}
            <h2 className="text-[22px] font-semibold mb-16">Reset Password Request</h2>
            <form onSubmit={handleSubmit} className="w-[90%]">
              <div className='mb-2'><p className='text-[#6D6D6D] text-[14px]'>Please fill out your email. An OTP to reset password will be sent there.</p></div>
              <div className="mb-16">
                <TextInput
                  theme={flowbiteinput}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <Button
                type="submit"
                className="bg-yellow auth-button w-full text-white font-semibold py-2 rounded"
                disabled={resetPasswordMutation.isLoading}
              >
                {resetPasswordMutation.isLoading ? (
                  <>
                    <Spinner size="sm" light={true} />
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  'Reset Password'
                )}
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

      <Otpverify
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={email}
        otpResponse={otpResponse}
        onSubmit={handleOtpSubmit}
        setOtpResponse={setOtpResponse}
        onOtpVerified={handleOtpVerified}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={handleResetPasswordClose}
        email={email}
      />
    </>  
  );
};

export default ForgotPasswordModal;