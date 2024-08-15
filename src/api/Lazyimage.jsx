import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { API_BASE_URL } from '../config/config';

// Define the base URL

const LazyImage = ({ src, alt, className }) => {
  // Combine the base URL with the provided src
  const fullImageUrl = `${API_BASE_URL}${src}`;

  return (
    <LazyLoadImage
      alt={alt}
      src={fullImageUrl}
      placeholderSrc='https://dummyimage.com/150x150/cccccc/000000.png&text=Placeholder'
      height="auto"
      width="100%"
      className={className}
    />
  );
};

export default LazyImage;