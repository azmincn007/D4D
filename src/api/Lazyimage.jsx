import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import your placeholder image
import placeholderImage from '../assets/lazyloading.jpg';

const LazyImage = ({ src, alt, className }) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect="blur"
      placeholderSrc={placeholderImage}
      width="100%"
      height="auto"
      className={className}
    />
  );
};

export default LazyImage;