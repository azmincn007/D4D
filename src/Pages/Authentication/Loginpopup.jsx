import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../App";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorValidation";
import googleicon from "../../assets/Google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "react-query";
import axios from "axios";
import PasswordInput from "../../Components/authentication/PassworInput";
import { API_BASE_URL } from "../../config/config";
import Loading from "../../api/Loading";

function Loginpopup({ onClose, onLoginSuccess }) {
  const [AuthValue, setAuthValue] = useContext(AuthContext);
  const [visible, setvisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const googleLoginMutation = useMutation(
    (userData) => axios.post(`${API_BASE_URL}/api/user/socialize-login`, userData),
    {
      onSuccess: (response) => {
        console.log("Google Login successful:", response.data);
        if (response.data.data.token) {
          localStorage.setItem("usertoken", response.data.data.token);
          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess(response.data.data.token);
          }
          onClose();
          navigate("/"); // Navigate to home page
        } else {
          console.error("Invalid response data structure");
          setLoginError("An unexpected error occurred. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Google Login failed:", error);
        setLoginError("An error occurred during Google login. Please try again.");
      },
    }
  );

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const fetchUserInfo = async (accessToken) => {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          return res.json();
        };

        const data = await fetchUserInfo(response.access_token);
        console.log(data);
        
        // Send Google user data to your API
        googleLoginMutation.mutate({
          email: data.email,
          name: data.name,
          google_id: data.sub,
          // Add any other required fields
        });

      } catch (error) {
        console.log("Error fetching user info:", error);
        setLoginError("An error occurred during Google login. Please try again.");
      }
    },
    scope: "profile email",
  });
  
  const handleForgotPasswordClick = () => {
    setAuthValue("forget");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation(
    (credentials) =>
      axios.post(`${API_BASE_URL}/api/user/login`, credentials),
    {
      onSuccess: (response) => {
        console.log("Login successful:", response.data.data);
        if (response.data.data.token) {
          localStorage.setItem("usertoken", response.data.data.token);
          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess(response.data.data.token);
          }
          onClose();
          navigate("/"); // Navigate to home page
        } else {
          console.error("Invalid response data structure");
          setLoginError("An unexpected error occurred. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
        if (error.response && error.response.status === 400) {
          setLoginError(error.response.data.message || "Invalid email or password");
        } else {
          setLoginError("An error occurred. Please try again.");
        }
      },
    }
  );

  const handleClose = () => {
    onClose();
    setAuthValue("signup");
  };

  const handleShowSignupModal = () => {
    setAuthValue("signup");
  };

  const handleLogin = (data) => {
    setLoginError(""); // Clear any previous error messages
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  if (loginMutation.isError || googleLoginMutation.isError) {
    navigate('/error404');
    return null;
  }

  if (loginMutation.isLoading || googleLoginMutation.isLoading) {
    return (
    
          <Loading />
       
    );
  }

  return (
    <>
      <h1 className="text-base font-semibold py-2">Login</h1>

      <div className="form py-5 w-[90%]">
        <form className="flex max-w-md flex-col gap-0" onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-2 flex justify-center">   
            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
          </div>
          <div>
            <TextInput
              theme={flowbiteinput}
              id="email"
              type="email"
              placeholder="Username or Email Id"
              {...register("email", {
                required: "Email is required",
              })}
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
          <div className="flex items-center justify-between pb-2">
            <div>
              <Checkbox className="w-[22px] h-[22px] mr-3" id="remember" />
              <Label htmlFor="remember" className="text-basex font-normal">
                Remember me
              </Label>
            </div>
            <div className="text-sm underline font-semibold">
            <button type="button" onClick={handleForgotPasswordClick}>Forgot?</button>            </div>
          </div>
          <Button 
            className="mt-4 bg-yellow auth-button" 
            type="submit" 
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
      <div className="flex items-center w-[80%] pb-7 pt-3">
        <div className="w-full border-t border-[#E3E3E6]"></div>
        <div className="px-3 text-[#777E90] font-semibold">OR</div>
        <div className="w-full border-t border-[#E3E3E6]"></div>
      </div>

      <div 
        className="flex h-[55px] rounded-[10px] border-2 w-[80%] justify-center items-center Tab:h-[45px] cursor-pointer" 
        onClick={() => login()}
      >
        <img src={googleicon} className="w-[20px] h-[20px] mr-3" alt="" />
        <p className="font-semibold text-sm">Sign in with Google</p>
      </div>
      <div className="py-6">
        <p className="text-sm">
          Don't have an account yet?{" "}
          <span className="font-semibold cursor-pointer underline" onClick={handleShowSignupModal}>
            Sign Up
          </span>
        </p>
      </div>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
        </div>
      </div>
    </>
  );
}

export default Loginpopup;