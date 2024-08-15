import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { TbFileCertificate } from "react-icons/tb";
import "../Pages/Restuarent/Baselayout.css";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import OrgDropdowns from "./DropdownsofUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import PhoneInput from "react-phone-input-2";
import { API_BASE_URL } from "../../config/config";

function SignupdataUpload() {
  const [wordCount, setWordCount] = useState(0);
  const [signupData, setSignupData] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [fileName, setFileName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
      padding: "8px 12px",
      width: "100%",
    },
  }; 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm();

  const description = watch("desc", "");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const storedData = localStorage.getItem('signupData') || 
                       (location.state && location.state.signupData);
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    }
  }, [location]);

  useEffect(() => {
    const words = description.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [description]);

  useEffect(() => {
    if (isTyping) {
      clearTimeout(typingTimer);
      setTypingTimer(setTimeout(() => {
        setIsTyping(false);
        trigger("confirmPassword");
      }, 1000)); // Wait for 1 second after typing stops
    }
    return () => clearTimeout(typingTimer);
  }, [password, confirmPassword, isTyping, trigger, typingTimer]);

  const handlePasswordChange = () => {
    setIsTyping(true);
  };

  const registerShopMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
     
      for (const key in data) {
        formData.append(key, data[key]);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/register-shop`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw { status: response.status, data: responseData };
      }
      
      return responseData;
    },
    onSuccess: (data, variables) => {
      navigate('/profileshow', { state: { formData: variables } });
    },
    onError: (error) => {
      console.error('API error:', error);
      if (error.status === 400) {
        console.log("400 error:", error.data.message);
      } else {
        navigate('/404error', { state: { message: error.data?.message || "An unexpected error occurred" } });
      }
    },
  });

  const handleSubmitsignup = (data) => {
    const {
      countryCodeAlt,
      countryCodeMobile,
      alternate_num,
      MobileNumber,
      ...restData
    } = data;

    const finalData = {
      shopname_eng: signupData.shopname_eng,
      email: signupData.email,
      password: data.password,
      shop_type: data.shop_type,
      country: data.country,
      region: data.region,
      certificate: data.certificate[0],
      proprietor: data.proprietor,
      contact_num: signupData.contact_num,
      alternate_num: alternate_num.phone,
      desc: data.desc,
    };

    console.log('Data being sent to API:', finalData);
    registerShopMutation.mutate(finalData);
    
    localStorage.removeItem('signupData');
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] mt-[100px]">
      <h1 className="text-[26px] font-semibold">Sign Up</h1>
      <form className="flex min-w-[400px] flex-col p-6 rounded" onSubmit={handleSubmit(handleSubmitsignup)}>
        {registerShopMutation.isError && registerShopMutation.error.status === 400 && (
          <div className="text-red-500 mb-4">{registerShopMutation.error.data.message}</div>
        )}
        <OrgDropdowns register={register} errors={errors} />

        <div className={`flex flex-col items-baseline ${errors.proprietor ? "mb-2" : "mb-4"}`}>
          <div className="mb-1">
            <Label htmlFor="proprietor" value="Proprietor Name" className="labelstyle text-[16px]" />
          </div>
          <div className="w-[100%]">
            <TextInput
              className="form-today"
              id="proprietor"
              type="text"
              placeholder="Enter Proprietor Name"
              {...register("proprietor", {
                required: "Proprietor Name is required",
              })}
            />
          </div>
          {errors.proprietor && <ErrorMessage message={errors.proprietor.message} />}
        </div>

        <div className="mb-4">
          <Label className="flex text-[16px] font-semibold">Upload Certification (Optional)</Label>
          <div className="file-upload">
            <input 
              type="file" 
              id="certificate" 
              className="file-input" 
              {...register("certificate")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name);
                }
              }}
            />
            <label htmlFor="certificate" className="file-label">
              <span className="placeholder">{fileName || ""}</span>
              <span>
                <TbFileCertificate  className="text-black h-[16px] w-[16px]"/>
              </span>
            </label>
          </div>
        </div>

        <div className={`flex flex-col items-baseline ${errors.email ? "mb-1" : "mb-2"}`}>
          <div className="mb-1">
            <Label htmlFor=" Alternate Number" value="Alternate Number" className="labelstyle text-[16px]" />
          </div>

          <div className="w-[100%]">
          <Controller
            name="alternate_num"
            control={control}
            rules={{
              required: "Alternate Number is required",
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
        {errors.alternate_num && <ErrorMessage message={errors.alternate_num.message} />}

          </div>

        <div className="mb-4 relative">
          <div className="mb-1 flex justify-start">
            <Label htmlFor="desc" value="Short description of your organisation" className="labelstyle text-[16px]" />
          </div>
          <Textarea
            id="desc"
            {...register("desc", {
              required: "Description is required",
              maxLength: {
                value: 200,
                message: "Description must not exceed 200 words"
              }
            })}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter a short description"
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">{wordCount}/200</div>
          {errors.desc && <ErrorMessage message={errors.desc.message} />}
        </div>

        <div className={`flex flex-col items-baseline ${errors.password ? "mb-2" : "mb-2"}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="password" value="Password" className="labelstyle text-[16px]" />
            </div>
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="password"
              placeholder="Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              error={errors.password}
              className="w-[250px]"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className={`flex flex-col items-baseline ${errors.confirmPassword ? "mb-2" : "mb-2"}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="Confirm Password" value="Confirm Password" className="labelstyle text-[16px]" />
            </div>
          </div>
          <div className="w-[100%]">
            <PasswordInputAdmin
              register={register}
              name="confirmPassword"
              placeholder="Confirm Password"
              rules={{
                required: "Confirm Password is required",
                validate: (value) => {
                  if (isTyping) return true; // Skip validation while typing
                  return value === password || "Passwords do not match";
                }
              }}
              error={!isTyping && errors.confirmPassword}
              className="w-[250px]"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <Button 
          className="mt-4 bg-yellow text-white auth-button" 
          type="submit"
          disabled={registerShopMutation.isLoading}
        >
          {registerShopMutation.isLoading ? 'Submitting...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}

export default SignupdataUpload;