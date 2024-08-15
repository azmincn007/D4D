import { Button, TextInput, Label } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API_BASE_URL } from "../../config/config";

function ResetPasswordadmin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOtpMutation = useMutation(
    (email) => 
      fetch(`${API_BASE_URL}/api/send-reg-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to send OTP');
        return res.json();
      }),
    {
      onSuccess: (data, variables) => {
        
        navigate('/verifyotp', { 
          state: { 
            email: variables,
            backendOTP: data.data.otp  // Pass the backend OTP
          }
        });
      },
      onError: (error) => {
        console.error("Failed to send OTP:", error);
        // Handle error (e.g., show error message to user)
      },
    }
  );

  const handlesignupnumber = (data) => {
    sendOtpMutation.mutate(data.email);
  };

  const handleKeyDown = (event) => {
    // Allow all keys
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] max-w-[400px]">
      <h1 className="text-[26px] font-semibold">Reset Password Request</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handlesignupnumber)}
      >
        <div className={`flex flex-col items-baseline ${errors.email ? 'mb-1' : 'mb-2'}`}>
          <div className="mb-1 w-[80%]">
            <p className="text-14px leading-5 text-[#6D6D6D] text-left pb-2">
              Please fill out your email. A OTP to Reset password will be sent there.
            </p>
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input w-[100%]"
              id="email"
              type="text"
              placeholder="Enter your email address"
              onKeyDown={handleKeyDown}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <Button 
          className="mt-4 bg-yellow text-white auth-button" 
          type="submit"
          disabled={sendOtpMutation.isLoading}
        >
          {sendOtpMutation.isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
        {sendOtpMutation.isError && (
          <ErrorMessage message="Failed to send OTP. Please try again." />
        )}
      </form>
    </div>
  );
}

export default ResetPasswordadmin;