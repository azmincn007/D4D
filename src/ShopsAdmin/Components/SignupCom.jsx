import { Button, TextInput, Label, Checkbox } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";

function Signupcomp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); 
  const handleLogin = (data) => {
    console.log(data);
    navigate('/signupsecond')
    // Handle login logic here
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center">
      <h1 className="text-[26px] font-semibold">Sign Up</h1>
      <form
        className="flex max-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className={`flex flex-col items-baseline ${errors.orgName ? 'mb-1' : 'mb-2'}`}>
          <div className="mb-1">
            <Label
              htmlFor="Name of the Organisation"
              value="Name of the Organisation"
              className="labelstyle"
            />
          </div>
          <div className="w-[100%] formtext">
            <TextInput
              className="form-input"
              id="orgName"
              type="text"
              placeholder="Enter your Organisation name"
              {...register("orgName", {
                required: "Organisation name is required",
              })}
            />
          </div>
          {errors.orgName && <ErrorMessage message={errors.orgName.message} />}
        </div>

        <div className={`flex flex-col items-baseline ${errors.email ? 'mb-1' : 'mb-2'}`}>
          <div className="mb-1">
            <Label
              htmlFor="Email Id"
              value="Username or Email Id"
              className="labelstyle"
            />
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
        <div className={`flex flex-col items-baseline ${errors.password ? 'mb-2' : 'mb-2'}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="password" value="Password" className="labelstyle" />
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

        <div className={`flex flex-col items-baseline ${errors.confirmPassword ? 'mb-2' : 'mb-2'}`}>
          <div className="flex justify-between w-[100%]">
            <div className="mb-1">
              <Label htmlFor="Confirm Password" value="Confirm Password" className="labelstyle" />
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

   
        <div className=" mb-4 mt-2 w-[95%]">
            <div className="flex items-center">

         
            <div>
            <Checkbox
          style={{border:'1px solid black',backgroundColor:'transparent'}}
            id="agree"
            {...register("agree", { required: "You must agree to the terms and conditions" })}
          />
            </div>
         <div className="leading-4 ml-2 text-left">
         <Label htmlFor="agree" className="  font-monrope text-[12px] font-semibold">
            I agree with Hazkart <span className="text-[#880808]">Terms of Service, Privacy Policy</span>, and default settings.
          </Label>
        

         </div>
         </div>
         <div className="flex justify-start">
         {errors.agree && <ErrorMessage message={errors.agree.message} />}

         </div>
         
        </div>

        <Button className="mt-1 bg-yellow text-white auth-button" type="submit">
          Continue
        </Button>
        <div className="flex items-center justify-between pb-2"></div>
        <div className="signupred text-[12px] font-monrop">
          Already have an account ?
          <span className="underline">
            <Link to={'/loginadmin'}>  login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signupcomp;