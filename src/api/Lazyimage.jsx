import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import your placeholder image

const LazyImage = ({ src, alt, className }) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
     
      placeholderSrc='https://dummyimage.com/150x150/cccccc/000000.png&text=Placeholder'
      width="100%"
      height="auto"
      className={className}
    />
  );
};

export default LazyImage;