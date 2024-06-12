import { Button, TextInput, Label, Dropdown } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import '../Pages/Restuarent/Baselayout.css'
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import PasswordInputAdmin from "../../Components/authentication/Passwordinputadmin";
import { TbFileCertificate } from "react-icons/tb";
function SignupdataUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="justify-center w-[100%] font-inter flex flex-col items-center min-w[400px]">
      <h1 className="text-[26px] font-semibold">Signup</h1>
      <form
        className="flex min-w-[400px] flex-col p-6 rounded"
        onSubmit={handleSubmit(handleLogin)}
      >

        <div className="orgdrop mb-8">
        <Dropdown label="Types Of organisation" dismissOnClick={false}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
        </div>

        <div className="flex justify-between gap-4 mb-8"> {/* Add gap-4 for spacing between dropdowns */}
  <div className="orgdrop">
    <Dropdown label="Country" dismissOnClick={false}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  </div>
  <div className="orgdrop">
    <Dropdown label="Region" dismissOnClick={false}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  </div>
  
</div>

<div>
  <Label className="flex">Upload Certification</Label>
<div class="file-upload">
  <input type="file" id="file-input" class="file-input" />
  <label for="file-input" class="file-label">
    <span class="placeholder"></span>
    <span><TbFileCertificate/></span>
  </label>
</div>
</div>


      
       
        <Button className="mt-16 bg-yellow text-white auth-button" type="submit">
          Continue
        </Button>
       
      </form>
    </div>
  );
}

export default SignupdataUpload;