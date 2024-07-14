import React from 'react';

function ImageUploadFlyer({ title, index, register, onUploadSuccess, onError, initialImage }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file.name);
    if (file) {
      onUploadSuccess(file);
    }
  };

  return (
    <div>
      <label htmlFor={`image-upload-${index}`}>{title}</label>
      <input
        type="file"
        id={`image-upload-${index}`}
        accept="image/*"
        onChange={handleFileChange}
        // Temporarily remove the register function to isolate the issue
        // {...register(`image-${index}`)}
      />
      {initialImage && <img src={initialImage} alt="Current flyer" />}
    </div>
  );
}

export default ImageUploadFlyer;