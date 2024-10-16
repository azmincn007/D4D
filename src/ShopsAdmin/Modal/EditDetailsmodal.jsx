import React, { useEffect, useState } from "react";
import { Label, Modal, TextInput, Button, Textarea, Spinner } from "flowbite-react";
import ProfileBanner from "../Components/Profilebanner";
import { useForm } from "react-hook-form";
import "./Modalsprofile.css";
import { IoIosClose } from "react-icons/io";
import FormFieldOrgname from "./components/FormFieldorgName";
import { modalshop, modalthemeNational } from "../../Themes/Modaltheme";
import ErrorMessage from "../../Pages/Authentication/ErrorValidation";
import axios from "axios";
import { TbFileCertificate } from "react-icons/tb";
import { useQueryClient, useMutation } from 'react-query';
import { API_BASE_URL } from "../../config/config";
import { IoCloseSharp } from "react-icons/io5";

function EditDetailsModal({ isOpen, onClose, profileData }) {
  const [wordCount, setWordCount] = useState(0);
  const [logo, setLogo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [certificateFilename, setCertificateFilename] = useState(null);

  const queryClient = useQueryClient();
  console.log(profileData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      desc: "",
      shopname_eng: "",
      shopname_ar: "",
      shopname_mal: "",
      shopname_hin: "",
      alternate_num: "",
      contact_num: "",
      logo: null,
      certificate: null,
      background_img: null,
    },
  });

  useEffect(() => {
    if (profileData) {
      setValue("desc", profileData.desc || "");
      setValue("shopname_eng", profileData.shopname_eng || "");
      setValue("shopname_ar", profileData.shopname_ar || "");
      setValue("shopname_mal", profileData.shopname_mal || "");
      setValue("shopname_hin", profileData.shopname_hin || "");
      setValue("alternate_num", profileData.alternate_num || "");
      setValue("contact_num", profileData.contact_num || "");
      
      setLogo(profileData.logo || null);
      setBackgroundImage(profileData.background_img || null);
      
      if (profileData.certificate) {
        setCertificateFilename(profileData.certificate.split('/').pop().split('\\').pop());
      } else {
        setCertificateFilename(null);
      }
    } else {
      setLogo(null);
      setBackgroundImage(null);
      setCertificateFilename(null);
    }
  }, [profileData, setValue]);

  useEffect(() => {
    return () => {
      if (typeof logo === 'string' && logo.startsWith('blob:')) {
        URL.revokeObjectURL(logo);
      }
      if (typeof backgroundImage === 'string' && backgroundImage.startsWith('blob:')) {
        URL.revokeObjectURL(backgroundImage);
      }
    };
  }, [logo, backgroundImage]);

  const updateProfileMutation = useMutation(
    async (formData) => {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/api/restaurent/edit-profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["restaurantProfile"]);
        onClose();
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        onClose();
      },
    }
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    const fieldsToInclude = [
      'logo', 'certificate', 'contact_num', 'alternate_num', 
      'desc', 'shopname_eng', 'shopname_ar', 'shopname_hin', 'shopname_mal', 'background_img'
    ];

    fieldsToInclude.forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === 'logo' || key === 'certificate' || key === 'background_img') {
          if (data[key] instanceof FileList && data[key].length > 0) {
            formData.append(key, data[key][0], data[key][0].name);
          } else if (data[key] instanceof File) {
            formData.append(key, data[key], data[key].name);
          } else if (typeof data[key] === 'string') {
            formData.append(key, data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    updateProfileMutation.mutate(formData);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const description = watch("desc", "");
  useEffect(() => {
    const words = description.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [description]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
      setValue("logo", file);
    }
  };
  
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      setValue("background_img", file);
    }
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFilename(file.name);
      setValue("certificate", file);
    } else {
      setCertificateFilename(null);
      setValue("certificate", null);
    }
  };

  return (
    <Modal 
      show={isOpen} 
      onClose={onClose} 
      theme={modalthemeNational} 
      className="maxw-[52rem]"
    >
      <Modal.Body className="shopsadminmodal font-inter relative mb-8">
        <div className="absolute top-2 right-2">
          <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
            <IoIosClose className="text-base cursor-pointer" onClick={onClose} />
          </div>
        </div>
        <ProfileBanner 
          circleImage={logo} 
          backgroundImage={backgroundImage}
          showEditIcon={true} 
          onImageChange={handleImageChange}
          onBackgroundImageChange={handleBackgroundImageChange}
        />
        <div className="flex flex-col items-center mt-16">
          <React.Fragment>
            <div className="text-sm font-semibold mb-1">{profileData?.shopname_eng || ""}</div>
            <div className="text-[#696969] text-xs font-semibold mb-1">{profileData?.email || ""}</div>
            <div className="text-[#696969] text-xs flex font-semibold mb-4">
              <div>{profileData?.country || ""},{profileData?.region || ""}</div>
            </div>
          </React.Fragment>
        </div>

        <div className="h-[1px] bg-black w-[100%] mt-2 mb-8"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mx-auto formtext">
            <FormFieldOrgname language="eng" register={register} errors={errors} defaultValue={profileData?.shopname_eng || ""} />
            <FormFieldOrgname language="ar" register={register} errors={errors} defaultValue={profileData?.shopname_ar || ""} />
            <FormFieldOrgname language="mal" register={register} errors={errors} defaultValue={profileData?.shopname_mal || ""} />
            <FormFieldOrgname language="hin" register={register} errors={errors} defaultValue={profileData?.shopname_hin || ""} />

            <div className="w-[50%] mx-auto formtext Mobile:w-[70%]">
              <div className="mb-4">
                <Label className="flex text-[16px] font-semibold">Upload Certification (Optional)</Label>
                <div className="file-upload relative">
                  <input 
                    type="file" 
                    id="certificate" 
                    className="file-input" 
                    onChange={handleCertificateChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="certificate" className="file-label">
                    <span className={`placeholder ${certificateFilename ? 'text-green-500' : ''}`}>
                      {certificateFilename || "Choose a file"}
                    </span>
                    <span>
                      <TbFileCertificate />
                    </span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex flex-col justify-start">
                  <Label htmlFor="mobileNumber" value="Mobile Number" className="labelstyle text-[16px]" />
                  <span className="text-xs text-gray-500 font-semibold">Include country code</span>
                </div>
                <div className="flex">
                  <div className="w-[100%]">
                    <TextInput
                      className="form-today"
                      id="mobileNumber"
                      type="tel"
                      placeholder="Enter Mobile Number"
                      inputMode="numeric"
                      {...register("contact_num", {
                        required: "Mobile Number is required",
                      })}
                    />
                    <div className="flex justify-start">{errors.contact_num && <ErrorMessage message={errors.contact_num.message} />}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex flex-col justify-start">
                  <Label htmlFor="AlternativeNumber" value="Alternative Number" className="labelstyle text-[16px]" />
                  <span className="text-xs text-gray-500 font-semibold">Include country code</span>
                </div>
                <div className="flex">
                  <div className="w-[100%]">
                    <TextInput
                      className="form-today"
                      id="AlternativeNumber"
                      type="tel"
                      placeholder="Enter Whatsupp Number"
                      inputMode="numeric"
                      {...register("alternate_num", {
                        required: "Alternative Number is required",
                      })}
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
                      message: "Description must not exceed 200 words",
                    },
                  })}
                  className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm text-[#808080]"
                  placeholder="Enter a short description"
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-500">{wordCount}/200</div>
                {errors.desc && <ErrorMessage message={errors.desc.message} />}
              </div>

              <div>
                <Button
                  className="mt-4 bg-yellow text-white auth-button w-full"
                  type="submit"
                  disabled={updateProfileMutation.isLoading}
                >
                  {updateProfileMutation.isLoading ? (
                    <>
                      <Spinner size="sm" light={true} />
                      <span className="ml-2">Updating...</span>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className='absolute top-2 right-3 bg-white rounded-full' onClick={handleCloseModal}>
          <IoCloseSharp />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditDetailsModal;