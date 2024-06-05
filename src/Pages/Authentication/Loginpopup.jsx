import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../App";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorValidation";
import googleicon from "../../assets/Google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Loginpopup({ onClose }) {
  const [AuthValue, setAuthValue] = useContext(AuthContext);

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
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    },
    scope: "profile",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    onClose();
    setAuthValue("signup");
  };

  const handleShowSignupModal = () => {
    setAuthValue("signup");
  };

  const handleLogin = (data) => {
    localStorage.setItem("username", data.email);
    onClose(); // Call the onClose function after storing the username
  };

  return (
    <>
      <h1 className="text-base font-semibold py-2">Login</h1>

      <div className="form py-5 w-[90%]">
        <form className="flex max-w-md flex-col gap-3" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <div className="mb-2 block"></div>
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
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              placeholder="Password"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </div>
          <div className="flex items-center justify-between gap-2 pb-2">
            <div>
              <Checkbox className="w-[22px] h-[22px] mr-3" id="remember" />
              <Label htmlFor="remember" className="text-basex font-normal">
                Remember me
              </Label>
            </div>
            <div className="text-sm underline font-semibold">
              <Link>Forgot?</Link>
            </div>
          </div>
          <Button className=" bg-yellow auth-button" type="submit">
            Login
          </Button>
        </form>
      </div>
      <div className="flex items-center w-[80%] pb-7 pt-3">
        <div className="w-full border-t border-[#E3E3E6]"></div>
        <div className="px-3">Or</div>
        <div className="w-full border-t border-[#E3E3E6]"></div>
      </div>

      <div className="flex h-[55px] rounded-[10px] border-2 w-[80%] justify-center items-center Tab:h-[45px]" onClick={() => login()}>
        <img src={googleicon} className="w-[20px] h-[20px] mr-3" alt="" />
        <p className="font-semibold text-sm">Sign in with Google</p>
      </div>
      <div className="py-6">
        <p className="text-sm">
          Don't have an account yet?{" "}
          <span className="font-semibold cursor-pointer" onClick={handleShowSignupModal}>
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
