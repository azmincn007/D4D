import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

function Otpverify({ onClose, mobileNumber, onSubmit }) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef(new Array(4).fill(null));

  const handleChange = (index, value) => {
    const regex = /^[0-9]$/; // Only allow numbers
    const newOtp = [...otp];

    if (regex.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field
      if (index < 3 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the previous input field
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

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    setIsValid(otp.every(digit => digit !== ""));
  }, [otp]);

  const handleSubmit = () => {
    if (isValid) {
      const otpValue = otp.join("");
      console.log("OTP:", otpValue); // Log the OTP value
      onSubmit(otpValue);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <h1 className="text-base font-semibold py-2">Otp Verification</h1>
      <div className="form flex flex-col justify-center font-inter items-center w-[85%] py-5">
        <div className="w-[100%]">
          <div className="pb-[50px]">
            <p className="text-sm">Enter the OTP sent to your mobile number</p>
            <p className="text-sm text-[#FF0000] font-semibold">{`+91 ${mobileNumber}`}</p>
          </div>
          <div className="pb-[85px] flex justify-center">
            {otp.map((value, index) => (
              <TextInput
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(input) => (inputRefs.current[index] = input)}
                className="w-12 h-12 mr-3 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" // Added focus:border-blue-500 for border color change
                style={{
                  textAlign: 'center', // Center the text horizontally
                }}
              />
            ))}
          </div>
          <div className="flex w-[100%] justify-between pb-10 text-sm">
            <p>Not received the OTP?</p>
            <p className="underline font-semibold cursor-pointer">Resend OTP</p>
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
          <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
        </div>
      </div>
    </>
  );
}

export default Otpverify;
