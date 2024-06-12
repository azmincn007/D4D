import { Button, TextInput, Label } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import { useNavigate } from "react-router-dom";

function Signupsecond() 
{
    const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlesignupnumber = (data) => {
    console.log(data);
    navigate('/verifyotp', { state: data });
    // Handle login logic here
  };

  const handleKeyDown = (event) => {
    // Check if the pressed key is a letter (excluding numeric keys and other special keys)
    const isLetter = /^[a-zA-Z]$/.test(event.key);

    // Prevent input of letters
    if (isLetter) {
      event.preventDefault();
    }
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px]">
      <h1 className="text-[26px] font-semibold">Sign Up</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handlesignupnumber)}
      >
        <div className={`flex flex-col items-baseline ${errors.phoneNumber ? 'mb-1' : 'mb-2'}`}>
          <div className="mb-1">
            <Label
              htmlFor="Phone Number"
              value="Phone Number"
              className="labelstyle"
            />
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input w-[100%]"
              id="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              onKeyDown={handleKeyDown}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </div>
          {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
        </div>
        <Button className="mt-4 bg-yellow text-white auth-button" type="submit">
          Send OTP
        </Button>
      </form>
    </div>
  );
}

export default Signupsecond;