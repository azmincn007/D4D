// LoginComponent.js
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Button, TextInput, Label, Spinner } from "flowbite-react";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";

const login = async (data) => {
  const response = await fetch("https://hezqa.com/api/shop-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw { status: response.status, data: responseData };
  }
  return responseData;
};

function LoginComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.data.shop_details.token);
      navigate('/Restorentdashboard');
    },
    onError: (error) => {
      console.error('API error:', error);
      if (error.status === 400) {
        console.log(error.data.message);
      } else {
        navigate('/404error', { state: { message: error.message || "An unexpected error occurred" } });
      }
    }
  });

  const handleLogin = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] ">
      <h1 className="text-[32px] font-semibold">Login</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleLogin)}
      >
        {mutation.error && <div className="text-red-500 mb-4">{mutation.error.data.message}</div>}
        <div className={`flex flex-col items-baseline ${errors.email ? 'mb-1' : 'mb-2'}`}>
          <div className="mb-1">
            <Label
              htmlFor="Username or Email Id"
              value="Username or Email Id"
              className="labelstyle text-[16px]"
            />
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input w-[100%]"
              id="email"
              type="email"
              placeholder="Username or Email Id"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <div className="flex justify-start">
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
          </div>
        </div>
        <div className={`flex flex-col items-baseline ${errors.password ? 'mb-2' : 'mb-2'}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="password" value="Password" className="labelstyle text-[16px]" />
            </div>
            <div className="text-sm underline font-semibold">
              <Link to="/forgetpassword">Forgot?</Link>
            </div>
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="password"
              placeholder="Password"
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
        <Button 
          className="mt-1 bg-yellow text-white auth-button" 
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <>
              <Spinner size="sm" light={true} />
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            'Login'
          )}
        </Button>
        <div className="flex items-center justify-between pb-2"></div>
        <div className="signupred text-[12px] font-monrop">
          Don't have an account yet?
          <span className="underline">
            <Link to={'/signup'}> Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;