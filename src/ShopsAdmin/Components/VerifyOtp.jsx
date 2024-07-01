import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import Timer from '../../Components/authentication/Timer';
import axios from 'axios';

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const email = formData.email;
  const [backendOTP, setBackendOTP] = useState(formData.backendOTP);

  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef(new Array(4).fill(null));
  const [timer, setTimer] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    const regex = /^[0-9]$/;
    const newOtp = [...otp];
    if (regex.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3 && value !== '') {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      const enteredOTP = Number(otp.join('')); 
      
      if (enteredOTP === backendOTP) {
        console.log('OTP matched');
        if (formData.isSignup) {
          navigate('/signupupload', { state: { signupData: localStorage.getItem('signupData') } });
        } else {
          navigate('/securepass');
        }
      } else {
        setError('Incorrect OTP. Please try again.');
      }
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      setTimer(120);
      setIsRunning(true);
      try {
        const response = await axios.post('https://hezqa.com/api/send-reg-otp', { email });
        console.log('New OTP sent successfully', response.data.data.otp);
        setBackendOTP(response.data.data.otp);
        setError('');
      } catch (error) {
        console.error('Error resending OTP:', error);
        setError('Failed to resend OTP. Please try again.');
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    setIsValid(otp.every(digit => digit !== ''));
  }, [otp]);

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px]">
      <h1 className="text-[32px] font-semibold mb-4">OTP Verification</h1>
      <div className="form max-w-[400px] flex flex-col justify-center items-center w-[85%] py-5 LgMobile:w-[95%]">
        <div className="w-[100%]">
          <div className="pb-2 text-left">
            <p className="text-sm">Enter the OTP sent to your email</p>
            <p className="text-sm text-[#FF0000] font-semibold">{email}</p>
          </div>
          <div className="pb-[15px] flex justify-between">
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
                style={{ textAlign: 'center', backgroundColor: 'transparent', border: '2px solid black' }}
              />
            ))}
            <div className="flex items-end">
              <Timer timer={timer} setTimer={setTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex w-[100%] justify-between pb-4 text-sm">
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
    </div>
  );
}

export default VerifyOtp;