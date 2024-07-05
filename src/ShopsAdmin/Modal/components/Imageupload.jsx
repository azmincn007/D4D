import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

const ImageUpload = ({ title, index, register, onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = () => {
    document.getElementById(`image-upload-${index}`).click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
      register('image', { value: file });
      setError('');
      onUploadSuccess(); // Call the onUploadSuccess callback
    } else {
      setError('Please select an image to upload.');
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center justify-center">
      <div
        className="w-28 h-28 bg-white flex items-center justify-center rounded-lg cursor-pointer border border-black"
        onClick={handleImageUpload}
      >
        {image ? (
          <div className="text-xs text-center text-[#4BB543]">
            {fileName}
            <span className='text-[#4BB543]'> uploaded</span>
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
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default ImageUpload;