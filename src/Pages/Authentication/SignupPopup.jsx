import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Label, Radio, TextInput, Modal, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "./ErrorValidation";
import PasswordInput from "../../Components/authentication/PassworInput";
import countryList from 'react-select-country-list';
import { API_BASE_URL } from "../../config/config";
import LoginSuccess from "./FramerMotions.jsx/LoginSuccess";
import { useNavigate } from "react-router-dom";
import FavoriteModal from "../../Components/modal/Favouratemodal";
import { showFavmodal } from "../../App";

// API function
const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/register`, userData);
  return response.data;
};

function SignupPopup({ onClose, onSignupSuccess, isOpen }) {
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useContext(showFavmodal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const password = watch("password");
  const countries = useMemo(() => countryList().getData(), []);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.data && data.data.token) {
        localStorage.setItem('usertoken', data.data.token);
        window.dispatchEvent(new Event('tokenUpdated'));
      } else {
        console.warn("Token not found in the response");
      }
      setSignupSuccess(true);
      setTimeout(() => {
        setSignupSuccess(false);
        onSignupSuccess();
        setShowFavoriteModal(true); // Triggering FavoriteModal
      }, 2000);
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  const onSubmitHandler = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      const userData = {
        ...data,
        country: data.country,
      };
      mutation.mutate(userData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (!/[0-9+]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };
  
  if (mutation.isError && mutation.error.response?.status !== 400) {
    navigate('/404error');
    return null;
  }

  return (
    <>        
      <Modal show={isOpen} onClose={onClose} size="md">
        <Modal.Body>
          <div className="flex flex-col items-center relative">
            {signupSuccess && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <LoginSuccess successMessage="Signup Successful!" />
              </div>
            )}
            <h1 className="text-base font-semibold py-2">Sign Up</h1>
            <div className="form py-5 w-[90%]">
              {mutation.isError && (
                <ErrorMessage message={mutation.error?.response?.data?.message || "An error occurred during signup"} />
              )}
              <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-0">
                <div>
                  <TextInput
                    theme={flowbiteinput}
                    id="name"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <ErrorMessage message={errors.name.message} />}
                  <div className={`${errors.name ? 'mb-2' : 'mb-4'} block`}></div>
                </div>
                <div>
                  <TextInput
                    theme={flowbiteinput}
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <ErrorMessage message={errors.email.message} />}
                  <div className={`${errors.email ? 'mb-2' : 'mb-4'} block`}></div>
                </div>
                <div>
                  <PasswordInput
                    register={register}
                    name="password"
                    placeholder="Password"
                    rules={{ 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                      }
                    }}
                    error={errors.password}
                  />
                  <div className={`${errors.password ? 'mb-2' : 'mb-4'} block`}></div>
                </div>
                <div>
                  <PasswordInput
                    register={register}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) => value === password || "Passwords do not match",
                    }}
                    error={errors.confirmPassword}
                  />
                  <div className={`${errors.confirmPassword ? 'mb-2' : 'mb-4'} block`}></div>
                </div>
                <div>
                  <select
                    className="w-full countrydropdownuser rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow focus:ring-yellow dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...register("country", { required: "Country is required" })}
                  >
                    <option value="">Select a country</option>
                    {countries.map(({ value, label }) => (
                      <option key={value} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="mb-4"></div>
                </div>
                <div>
                  <TextInput
                    theme={flowbiteinput}
                    id="mobile"
                    type="tel"
                    placeholder="Mobile Number (including country Code)"
                    {...register("mobile", { 
                      required: "Mobile Number is required",
                      pattern: {
                        value: /^\+?[0-9]+$/,
                        message: "Invalid mobile number format"
                      }
                    })}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.mobile && <ErrorMessage message={errors.mobile.message} />}
                  <div className={`${errors.mobile ? 'mb-2' : 'mb-4'} block`}></div>
                </div>
                <div className="flex items-center justify-around mb-4 mt-2">
                  <div>
                    <Radio id="male" name="gender" value="Male" defaultChecked className="mr-2" {...register("gender")} />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div>
                    <Radio id="female" name="gender" value="Female" className="mr-2" {...register("gender")} />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </div>
                <Button 
                  className="bg-yellow auth-button" 
                  type="submit" 
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <>
                      <Spinner size="sm" light={true} />
                      <span className="ml-2">Signing up...</span>
                    </>
                  ) : (
                    "Sign Up"
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignupPopup;