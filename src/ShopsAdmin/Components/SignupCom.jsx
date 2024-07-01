import { Button, TextInput, Label, Checkbox, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Padding } from "@mui/icons-material";

// API function to send OTP
const sendOTP = async ({ email, formData }) => {
  const response = await fetch("https://hezqa.com/api/send-reg-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw { status: response.status, data: responseData };
  }

  return { ...responseData, formData };
};

function Signupcomp() {
  const [phoneError, setPhoneError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation(sendOTP, {
    onSuccess: (data) => {
      console.log("OTP sent successfully", data.data.otp);
      const updatedData = data.formData;
      localStorage.setItem("signupData", JSON.stringify(updatedData));
      navigate("/verifyotp", {
        state: {
          ...updatedData,
          isSignup: true,
          backendOTP: data.data.otp,
        },
      });
    },
    onError: (error) => {
      console.error("API error:", error);
      if (error.status === 400) {
        console.log(error.data.message);
        // Handle 400 error (e.g., show error message to user)
      } else {
        // Handle other errors
        navigate("/404error", { state: { message: error.data?.message || "An unexpected error occurred" } });
      }
    },
  });

  const phoneInputStyle = {
    containerStyle: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    buttonStyle: {
      backgroundColor: "transparent",
      border: "1px solid black",
    },
    inputStyle: {
      backgroundColor: "transparent",
      border: "1px solid black",
      Padding: "8px 12px",
      width: "100%",
    },
  };

  const handleLogin = (data,dotCount) => {
    const updatedData = {
      ...data,
      contact_num: data.contact_num.phone, // Remove non-digit characters
    };
    
    if (!phoneError) {
      console.log(updatedData);
      mutation.mutate({ email: data.email, formData: updatedData });
    }
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center">
      <h1 className="text-[32px] font-semibold">Sign Up</h1>
      <form className="flex max-w-[400px] flex-col p-6 rounded" onSubmit={handleSubmit(handleLogin)}>
        {mutation.isError && <div className="text-red-500 mb-4">{mutation.error.data?.message || "An error occurred while sending OTP"}</div>}

        {/* Input field for Organisation Name */}
        <div className={`flex flex-col items-baseline ${errors.shopname_eng ? "mb-1" : "mb-2"}`}>
          <div className="mb-1">
            <Label htmlFor="Name of the Organisation" value="Name of the Organisation" className="labelstyle text-[16px]" />
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input"
              id="orgName"
              type="text"
              placeholder="Enter your Organisation name"
              {...register("shopname_eng", {
                required: "Organisation name is required",
              })}
            />
          </div>
          {errors.shopname_eng && <ErrorMessage message={errors.shopname_eng.message} />}
        </div>

        {/* Input field for Email */}
        <div className={`flex flex-col items-baseline ${errors.email ? "mb-1" : "mb-2"}`}>
          <div className="mb-1">
            <Label htmlFor="Email Id" value="Email Id" className="labelstyle text-[16px]" />
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input"
              id="email"
              type="email"
              placeholder="Enter your Email Id"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
   
        <div className={`flex flex-col items-baseline ${errors.contact_num ? "mb-1" : "mb-2"}`}>
  <div className="mb-1">
    <Label htmlFor="Mobile Number" value="Mobile Number" className="labelstyle text-[16px]" />
  </div>
  <div className="w-[100%]">
    <Controller
      name="contact_num"
      control={control}
      rules={{
        required: "Mobile Number is required",
        validate: (value) => {
          const country = value?.country;
          if (country && country.format) {
            const dotCount = (country.format.match(/\./g) || []).length;
            const phoneLength = value.phone.length;
            return phoneLength === dotCount || "Number is not in the correct format";
          }
          return true;
        }
      }}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          country={"in"}
          value={value?.phone || ''}
          onChange={(phone, country) => {
            onChange({ phone, country });
          }}
          inputClass="form-today"
          containerClass="w-full"
          inputStyle={phoneInputStyle.inputStyle}
          containerStyle={phoneInputStyle.containerStyle}
          buttonStyle={phoneInputStyle.buttonStyle}
        />
      )}
    />
  </div>
  {errors.contact_num && <ErrorMessage message={errors.contact_num.message} />}
</div>

      {/* Checkbox for agreeing to terms and conditions */}
<div className="mb-4 mt-2 w-[100%]">
  <div className="flex items-center">
    <div className="checkboxx">
      <Checkbox
        style={{ 
          border: "1px solid white",
          backgroundColor :'#880808',
          padding:'10px',
          outline:'none'
       
        }}
        id="agree"
        {...register("agree", { required: "You must agree to the terms and conditions" })}
      />
    </div>
    <div className="leading-4 ml-2 text-left">
      <Label htmlFor="agree" className="font-monrope text-[14px] font-semibold">
        I agree with Hazkart <span className="text-[#880808]">Terms of Service, Privacy Policy</span>, and default settings.
      </Label>
    </div>
  </div>
  <div className="flex justify-start">{errors.agree && <ErrorMessage message={errors.agree.message} />}</div>
</div>

        {/* Button to submit the form */}
        <Button className="mt-1 bg-yellow text-white auth-button" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <Spinner size="sm" light={true} />
              <span className="ml-2">Sending OTP...</span>
            </>
          ) : (
            "Continue"
          )}
        </Button>

        <div className="flex items-center justify-between pb-2"></div>

        {/* Link to login page */}
        <div className="signupred text-[12px] font-monrop">
          Already have an account?
          <span className="underline">
            <Link to={"/loginadmin"}> login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signupcomp;
