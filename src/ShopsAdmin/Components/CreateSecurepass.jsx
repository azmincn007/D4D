import { Button, Label } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";

function CreateSecurepassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleContinueToLogin = (data) => {
    console.log(data);
    // Handle any necessary logic here
    navigate('/loginadmin'); // Navigate to the login page
  };

  const password = watch("password");

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px]">
      <h1 className="text-[32px] font-semibold">Login</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleContinueToLogin)}
      >
        <div className={`flex flex-col items-baseline ${errors.password ? 'mb-2' : 'mb-2'}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="password" value="Password" className="labelstyle" />
            </div>
            <div className="text-sm underline font-semibold">
              <Link to="/forgetpassword">Forgot?</Link>
            </div>
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="password"
              placeholder="Enter New Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              error={errors.password}
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
              placeholder="Confirm Password"
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              error={errors.confirmPassword}
              className="w-[250px]"
            />
          </div>
        </div>

        <Button className="mt-1 bg-yellow text-white auth-button" type="submit">
          Continue to Login
        </Button>
        <div className="flex items-center justify-between pb-2"></div>
      </form>
    </div>
  );
}

export default CreateSecurepassword;