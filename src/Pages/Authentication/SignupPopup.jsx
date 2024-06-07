import { Button, Label, Radio, Select, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import flowbiteinput from "../../Themes/Flowbiteinput";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "./ErrorValidation";
import PasswordInput from "../../Components/authentication/PassworInput";

function SignupPopup({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    console.log("Submitted Data:", data);
    onSubmit(data.mobileNumber);
  };

  const handleClose = () => {
    onClose();
  };

  const countryOptions = [
    { value: "USA", name: "United States" },
    { value: "Canada", name: "Canada" },
    { value: "UK", name: "United Kingdom" },
    { value: "Australia", name: "Australia" },
    { value: "Germany", name: "Germany" },
    { value: "France", name: "France" },
    { value: "Japan", name: "Japan" },
    { value: "China", name: "China" },
  ];

  return (
    <>
      <h1 className="text-base font-semibold py-2">Signup</h1>
      <div className="form py-5 w-[90%]">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-0">
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <ErrorMessage message={errors.username.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <PasswordInput register={register} errors={errors} name="password" />
          </div>
          <div>
            <div className="mb-2 block"></div>
            <PasswordInput register={register} errors={errors} name="confirmPassword" />
          </div>
          <div>
            <div className="mb-2 block"></div>
            <TextInput
              theme={flowbiteinput}
              id="mobileNumber"
              type="tel"
              placeholder="Mobile Number"
              {...register("mobileNumber", { required: "Mobile Number is required" })}
            />
            {errors.mobileNumber && <ErrorMessage message={errors.mobileNumber.message} />}
          </div>
          <div>
            <div className="mb-2 block"></div>
            <Select
              theme={flowbiteinput}
              id="nationality"
              placeholder="Select Nationality"
              style={{
                backgroundColor: "#F1F1F1",
                border: "none",
                color: "#6D6D6D",
              }}
              {...register("nationality", { required: "Nationality is required" })}
            >
              <option value="">Select Nationality</option>
              {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.name}
                </option>
              ))}
            </Select>
            {errors.nationality && <ErrorMessage message={errors.nationality.message} />}
          </div>
          <div className="flex items-center justify-around">
            <div>
              <Radio id="male" name="gender" value="male" className="mr-2" {...register("gender")} />
              <Label htmlFor="male">Male</Label>
            </div>
            <div>
              <Radio id="female" name="gender" value="female" className="mr-2" {...register("gender")} />
              <Label htmlFor="female">Female</Label>
            </div>
            <div>
              <Radio id="other" name="gender" value="other" className="mr-2" {...register("gender")} />
              <Label htmlFor="other">Other</Label>
            </div>
          </div>
          <Button className="bg-yellow auth-button" type="submit">
            Continue
          </Button>
        </form>
      </div>
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
          <IoIosClose className="text-base cursor-pointer" onClick={handleClose} />
        </div>
      </div>
    </>
  );
}

export default SignupPopup;