import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Textarea, Spinner } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { IoIosClose } from 'react-icons/io';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from 'react-hook-form';

const FeedbackModal = ({ isOpen, onClose }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [mobileError, setMobileError] = useState('');

  const phoneInputStyle = {
    containerStyle: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    buttonStyle: {
      backgroundColor: "rgb(241 241 241)",
      transition: "border-color 0.3s ease",
    },
    inputStyle: {
      backgroundColor: "rgb(241 241 241)",
      padding: "8px 12px",
      width: "100%",
      transition: "border-color 0.3s ease",
    },
  };
  
  const phoneInputCustomStyles = `
    .react-tel-input .form-control:hover,
    .react-tel-input .form-control:focus,
    .react-tel-input .selected-flag:hover,
    .react-tel-input .selected-flag:focus {
      border: 1px solid #FFD814 !important;
    }
  `;

  const { mutate, isLoading, isError, isSuccess, reset: resetMutation } = useMutation({
    mutationFn: async (data) => {
      const payload = {
        name: data.name,
        email: data.email,
        mobile: data.mobileNumber.phone,
        msg: data.feedback
      };

      console.log('Data being sent to API:', payload);

      const response = await axios.post(`${API_BASE_URL}/api/send-feedback`, payload);

      console.log('API Response:', response.data);

      return response;
    },
    onSuccess: (response) => {
      console.log('Mutation successful. Response:', response);
      setTimeout(() => {
        resetMutation();
        onClose();
      }, 3000);
    },
    onError: (error) => {
      console.error('Error submitting feedback:', error);
      console.error('Error response:', error.response);
    },
  });

  const onSubmit = (data) => {
    console.log('Form data submitted:', data);
    setMobileError('');
    mutate(data);
  };

  const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );

  useEffect(() => {
    if (!isOpen) {
      reset();
      setMobileError('');
      resetMutation();
    }
  }, [isOpen, reset, resetMutation]);

  return (
    <Modal show={isOpen} onClose={onClose} theme={modalthemeNational}>
      <style>{phoneInputCustomStyles}</style>
      <Modal.Body>
        <div className="space-y-6 relative">
          <div className="absolute top-0 right-0 ">
            <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
              <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Submit your feedback</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextInput
                    id="name"
                    placeholder="Name"
                    {...field}
                    className='inputuser'
                  />
                )}
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...field}
                    className='inputuser'
                  />
                )}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}

              <div>
                <Controller
                  name="mobileNumber"
                  control={control}
                  rules={{
                    required: "Mobile Number is required",
                    validate: (value) => {
                      const country = value?.country;
                      if (country && country.format) {
                        const dotCount = (country.format.match(/\./g) || []).length;
                        const phoneLength = value.phone.length;
                        return phoneLength === dotCount || "Number is not in the correct format";
                      }
                      return true;
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      country={"in"}
                      value={value?.phone || ''}
                      onChange={(phone, country) => {
                        onChange({ phone, country });
                        console.log('Phone number changed:', phone, country);
                      }}
                      inputClass=""
                      containerClass="w-full"
                      inputStyle={phoneInputStyle.inputStyle}
                      containerStyle={phoneInputStyle.containerStyle}
                      buttonStyle={phoneInputStyle.buttonStyle}
                      placeholder="Mobile Number"
                    />
                  )}
                />
                {errors.mobileNumber && <ErrorMessage message={errors.mobileNumber.message} />}
              </div>

              <Controller
                name="feedback"
                control={control}
                rules={{ required: "Feedback is required" }}
                render={({ field }) => (
                  <Textarea
                    id="feedback"
                    placeholder="Your feedback"
                    {...field}
                    rows={4}
                    className='bg-[#F1F1F1] focus:border-yellow hover:border-yellow'
                  />
                )}
              />
              {errors.feedback && <ErrorMessage message={errors.feedback.message} />}
            </div>
            <div className='w-[100%] flex justify-center mt-4'>
              <button
                type="submit"
                className="bg-yellow text-black font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" light={true} />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-500 text-white p-2 rounded-md mt-4"
              >
                Feedback submitted successfully!
              </motion.div>
            )}
            {isError && !mobileError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500 text-white p-2 rounded-md mt-4"
              >
                Error submitting feedback. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;