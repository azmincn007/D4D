import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState, useContext } from "react";
import { IoIosClose } from "react-icons/io";
import Timer from "../../Components/authentication/Timer";
import { AuthContext } from "../../App";
import { API_BASE_URL } from "../../config/config";

function Otpverify({ onClose, email, otpResponse, onSubmit ,setOtpResponse}) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef(new Array(4).fill(null));
  const [timer, setTimer] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [, setAuthValue] = useContext(AuthContext);

  useEffect(() => {
    console.log('OTP Component - Email:', email);
    console.log('OTP Component - Reset Response:', otpResponse);
  }, [email, otpResponse]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    setIsValid(otp.every(digit => digit !== ""));
    setError(""); // Clear error when OTP changes
  }, [otp]);

  const handleChange = (index, value) => {
    const regex = /^[0-9]$/;
    const newOtp = [...otp];
    if (regex.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      const enteredOtp = parseInt(otp.join(""), 10);
      console.log("Entered OTP:", enteredOtp);
      
      // Compare the entered OTP (as integer) with the OTP from otpResponse
      if (enteredOtp === parseInt(otpResponse, 10)) {
        onSubmit(enteredOtp);
        setAuthValue("reset"); // Set AuthValue to "reset" after successful OTP submission
      } else {
        setError("Incorrect OTP. Please try again.");
      }
    }
  };

 
  const handleResendOTP = async () => {
    if (timer === 0) {
      setTimer(120);
      setIsRunning(true);
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/reset-psw-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to resend OTP');
        }

        const data = await response.json();
        
        // Update the otpResponse with the new data
        setOtpResponse(data.data.otp);
        
        console.log("OTP resent successfully:", data);
      } catch (error) {
        console.error("Error resending OTP:", error);
        setError("Failed to resend OTP. Please try again.");
      }
    }
  };
  return (
    <>
      <h1 className="text-base font-semibold py-2">OTP Verification</h1>
      <div className="form flex flex-col justify-center font-inter items-center w-[85%] py-5 LgMobile:w-[95%]">
        <div className="w-[100%]">
          <div className="pb-[50px]">
            <p className="text-sm">Enter the OTP sent to your email</p>
            <p className="text-sm text-[#FF0000] font-semibold">{email}</p>
          </div>
          <div className="pb-[85px]">
          <div className=" mb-4 flex justify-between">
            {otp.map((value, index) => (
              <TextInput
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(input) => (inputRefs.current[index] = input)}
                className="w-12 h-12 text-center focus:outline-none focus:ring-2 otpbox LgMobile:w-10 LgMobile:h-10"
                style={{ textAlign: 'center' }}
              />
            ))}
            <div className="flex items-end">
              <Timer timer={timer} setTimer={setTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </div>
          <div className="flex w-[100%] justify-between pb-10 text-sm">
            <p>Not received the OTP?</p>
            <p
              className="underline font-semibold cursor-pointer"
              style={{ opacity: timer > 0 ? 0.5 : 1 }}
              onClick={handleResendOTP}
            >
              Resend OTP
            </p>
          </div>
        </div>
        <Button
          className="bg-yellow auth-button w-[100%]"
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Continue
        </Button>
      </div>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
        </div>
      </div>
    </>
  );
}

export default Otpverify;