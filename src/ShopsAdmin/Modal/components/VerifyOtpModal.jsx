import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, TextInput } from 'flowbite-react';
import axios from 'axios';
import Timer from '../../../Components/authentication/Timer';



function VerifyOtpModal({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef(new Array(4).fill(null));
  const [timer, setTimer] = useState(120);
  const [isRunning, setIsRunning] = useState(true);
  const [error, setError] = useState('');
  const [backendOTP, setBackendOTP] = useState(null);

  useEffect(() => {
    if (isOpen) {
      sendOTP();
    }
  }, [isOpen]);

  const sendOTP = async () => {
    try {
      const response = await axios.post('https://hezqa.com/api/send-reg-otp', { email });
      console.log('OTP sent successfully', response.data.data.otp);
      setBackendOTP(response.data.data.otp);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

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
        onClose();
        // Navigate to change password page or show change password modal
      } else {
        setError('Incorrect OTP. Please try again.');
      }
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      setTimer(120);
      setIsRunning(true);
      sendOTP();
    }
  };

  useEffect(() => {
    setIsValid(otp.every(digit => digit !== ''));
  }, [otp]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Body className="font-inter">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center">OTP Verification</h2>
        <p className="text-sm mb-2">Enter the OTP sent to your email</p>
        <p className="text-sm text-[#FF0000] font-semibold mb-4">{email}</p>
        <div className="flex justify-between mb-4">
          {otp.map((value, index) => (
            <TextInput
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(input) => (inputRefs.current[index] = input)}
              className="w-12 h-12 text-center"
            />
          ))}
          <Timer timer={timer} setTimer={setTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
        </div>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">Not received the OTP?</p>
          <button
            className="text-sm font-semibold underline"
            onClick={handleResendOTP}
            disabled={timer > 0}
          >
            Resend OTP
          </button>
        </div>
        <Button
          className="w-full bg-yellow"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Verify OTP
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default VerifyOtpModal;