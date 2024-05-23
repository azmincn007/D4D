import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { Link } from "react-router-dom";
import buttongoogle from "../../assets/buttongoogle.png";
import LoginTab from "../../Components/authentication/Togleauthentication";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import { AuthContext } from "../../App";

function Loginpopup({ onClose }) {
  const [AuthValue,setAuthvalue]=useContext(AuthContext)

  const handleClose = () => {
    onClose();
    setstateauth('signup')
  };

  const handleShowSignupModal = () => {
       setAuthvalue('signup')
  };

  return (
    <>
      <h1 className="text-base font-semibold py-2">Login</h1>
      <div className="py-2">
        <LoginTab />
      </div>
      <div className="form py-5">
        <form className="flex max-w-md flex-col gap-3">
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="email1"
              type="email"
              placeholder="Username or Email ID"
              required
            />
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              placeholder="Password"
              id="password1"
              type="password"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-2 pb-2">
            <div>
              <Checkbox className="w-[22px] h-[22px] mr-3" id="remember" />
              <Label
                htmlFor="remember"
                className="text-basex font-normal"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm underline font-semibold">
              <Link>Forget?</Link>
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
      <div>
        {" "}
        <img src={buttongoogle} alt="" />{" "}
      </div>
      <div className="py-6">
        <p className="text-sm">
          Don't have an account yet?
          <span className="font-semibold cursor-pointer" onClick={handleShowSignupModal}>
            Sign UP
          </span>
        </p>
      </div>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose
            className="text-base cursor-pointer"
            onClick={handleClose}
          />
        </div>
      </div>
    </>
  );
}

export default Loginpopup;