import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

const ImageUpload = ({ title, index, register }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleImageUpload = () => {
    document.getElementById(`image-upload-${index}`).click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setFileName(file.name);
    register(`image${index}`, { value: file }); // Register the uploaded file
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      <div
        className="w-28 h-28 bg-white flex items-center justify-center rounded-lg cursor-pointer border border-black"
        onClick={handleImageUpload}
      >
        {image ? (
          <div className="text-xs text-center">
            {fileName}
            <span className='text-green'> uploaded</span>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className='text-xsm font-semibold text-[#808080]'>{title}</div>
            <div className='bg-yellow rounded-full'>
              <IoMdAdd className='text-black' />
            </div>
          </div>
        )}
      </div>
      <input
        id={`image-upload-${index}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;