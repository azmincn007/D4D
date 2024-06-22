import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { TbFileCertificate } from "react-icons/tb";
import "../Pages/Restuarent/Baselayout.css";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import OrgDropdowns from "./DropdownsofUpload";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

function SignupdataUpload() {
  const [wordCount, setWordCount] = useState(0);
  const [signupData, setSignupData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const description = watch("desc", "");

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

  const registerShopMutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      return axios.post('https://hezqa.com/api/register-shop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (data) => {
      console.log('API response:', data);
      navigate('/signup-success');
    },
    onError: (error) => {
      console.error('API error:', error);
console.log("not worked");
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

    const fullAlternativeNumber = alternate_num ? `+${data.country}${alternate_num}` : '';

    const finalData = {
      
      shopname_eng: signupData.shopname_eng,
      email: signupData.email,
      password: data.password,
      shop_type: data.shop_type,
      country: data.country,
      region: data.region,
      certificate: data.certificate[0], // Assuming it's a file input
      proprietor: data.proprietor,
      contact_num: signupData.contact_num,
      alternate_num: fullAlternativeNumber,
      desc: data.desc,
    };

    console.log('Data being sent to API:', finalData);
    registerShopMutation.mutate(finalData);
    
    localStorage.removeItem('signupData');
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px] mt-[100px]">
      <h1 className="text-[26px] font-semibold">Signup</h1>
      <form className="flex min-w-[400px] flex-col p-6 rounded" onSubmit={handleSubmit(handleSubmitsignup)}>
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
            />
            <label htmlFor="certificate" className="file-label">
              <span className="placeholder"></span>
              <span>
                <TbFileCertificate />
              </span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex justify-start">
            <Label htmlFor="AlternativeNumber" value="Alternative Number" className="labelstyle text-[16px]" />
          </div>
          <div className="flex">
            <div className="mr-4 slctnmbr">
              <select id="country-code" className="bg-transparent border-black" {...register("country")}>
                <option value="1">+1</option>
                <option value="44">+44</option>
                <option value="91">+91</option>
              </select>
            </div>
            <div className="w-[100%]">
              <TextInput
                className="form-today"
                id="AlternativeNumber"
                type="tel"
                placeholder="Enter Alternative Number"
                inputMode="numeric"
                pattern="[0-9]*"
                {...register("alternate_num", {
                  required: "Alternative Number is required"
                })}
                onChange={(e) => {
                  const input = e.target.value.replace(/[^0-9]/g, '');
                  setValue("alternate_num", input, { shouldValidate: true });
                }}
              />
              {errors.alternate_num && <ErrorMessage message={errors.alternate_num.message} />}
            </div>
          </div>
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
                minLength: {
                  value: 6,
                  message: "Confirm Password must be at least 6 characters long",
                },
              }}
              error={errors.confirmPassword}
              className="w-[250px]"
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