import { Button, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "./ErrorValidation";
import PasswordInput from "../../Components/authentication/PassworInput";

// API function
const registerUser = async (userData) => {
  const response = await axios.post("https://hezqa.com/api/user/register", userData);
  return response.data;
};

function SignupPopup({ onClose, onSignupSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const password = watch("password");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      onSignupSuccess();
    },
    onError: (error) => {
      console.error("Signup error:", error);
      // Handle error (e.g., show error message to user)
    },
  });

  const onSubmitHandler = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      mutation.mutate(data);
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

  return (
    <>
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
              rules={{ required: "Password is required" }}
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
            <TextInput
              theme={flowbiteinput}
              id="mobile"
              type="tel"
              placeholder="Mobile Number (including country code)"
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
          <Button className="bg-yellow auth-button" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Signing Up..." : "Sign Up"}
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