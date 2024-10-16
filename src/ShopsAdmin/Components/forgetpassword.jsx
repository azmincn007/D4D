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
        console.log("OTP:", data.data.otp); // Log the OTP to the console
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
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Reset Password Request</h1>
      <form onSubmit={handleSubmit(handlesignupnumber)}>
        <div className="mb-4">
          <Label htmlFor="email" className="block mb-2">Please fill out your email. An OTP to reset your password will be sent there.</Label>
          <TextInput
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
            className="w-full"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <Button type="submit" disabled={sendOtpMutation.isLoading}>
          {sendOtpMutation.isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
        {sendOtpMutation.isError && (
          <ErrorMessage>Failed to send OTP. Please try again.</ErrorMessage>
        )}
      </form>
    </div>
  );
}

export default ResetPasswordadmin;
