import { Button, Modal, TextInput, Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState, useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Timer from "../../Components/authentication/Timer";
import { AuthContext } from "../../App";
import { API_BASE_URL } from "../../config/config";
import modaltheme from "../../Themes/Modaltheme";
import LoginSuccess from "./FramerMotions.jsx/LoginSuccess";

function Otpverify({ isOpen, onClose, email, otpResponse, onSubmit, setOtpResponse, onOtpVerified }) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef(new Array(4).fill(null));
  const [timer, setTimer] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [, setAuthValue] = useContext(AuthContext);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

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
      setIsLoading(true);
      const enteredOtp = parseInt(otp.join(""), 10);
      
      if (enteredOtp === parseInt(otpResponse, 10)) {
        setOtpVerified(true);
        setTimeout(() => {
          setOtpVerified(false);
          onSubmit(enteredOtp);
          setAuthValue("reset");
          onOtpVerified();
        }, 2000);
      } else {
        setError("Incorrect OTP. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      setTimer(120);
      setIsRunning(true);
      setIsLoading(true);
      
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
        
        setOtpResponse(data.data.otp);
        
        setOtpResent(true);
        setTimeout(() => setOtpResent(false), 2000);
      } catch (error) {
        console.error("Error resending OTP:", error);
        setError("Failed to resend OTP. Please try again.");
        if (error.response && error.response.status !== 400) {
          navigate('/404error');
          return null;
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Modal theme={modaltheme} show={isOpen} onClose={onClose}>
        <Modal.Body>
          <div className="flex flex-col items-center font-inter">
            {otpVerified && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <LoginSuccess successMessage="OTP Verified Successfully!" />
              </div>
            )}
            {otpResent && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <LoginSuccess successMessage="OTP Resent Successfully!" />
              </div>
            )}
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
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" light={true} />
                    <span className="ml-2">Verifying...</span>
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-3">
              <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
                <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Otpverify;