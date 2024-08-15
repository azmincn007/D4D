// ShimmerComponents.js
import React from 'react';

const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  .shimmer {
    animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #e0e0e0 0%, #d3d3d3 20%, #e0e0e0 40%, #e0e0e0 100%);    background-size: 1000px 100%;
  }
`;

export const ShimmerEffect = ({ className }) => (
  <>
    <style>{shimmerStyle}</style>
    <div className={`shimmer rounded ${className}`}></div>
  </>
);

export const ShimmerText = ({ width = "w-24", height = "h-6" }) => (
  <>
    <style>{shimmerStyle}</style>
    <div className={`shimmer ${width} ${height} rounded`}></div>
  </>
);

export const ShimmerCard = () => (
  <>
    <style>{shimmerStyle}</style>
    <div className="shimmer rounded-[10px] p-4 h-[400px]">
      <div className="bg-gray-300  shimmer 2s infinite linear h-[200px] w-full mb-4 rounded"></div>
      <div className="bg-gray-300   h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-300  h-4 w-1/2 mb-2 rounded"></div>
      <div className="bg-gray-300   h-4 w-1/4 rounded"></div>
    </div>
  </>
);

export const ShimmerCardResto = () => (
  <>
    <style>{shimmerStyle}</style>
    <div className="shimmer rounded-[10px] p-4 h-[350px]">
      <div className="bg-gray-300  shimmer 2s infinite linear h-[220px] w-full mb-4 rounded"></div>
      <div className="bg-gray-300   h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-300  h-4 w-1/2 mb-2 rounded"></div>
      <div className="bg-gray-300   h-4 w-1/4 rounded"></div>
    </div>
  </>
);



// export const ShimmerCard = () => (
//   <>
//     <style>{shimmerStyle}</style>
//     <div className="shimmer rounded-[10px] p-4 h-[400px]">
//       <div className="bg-red-500  h-[200px] w-full mb-4 rounded"></div>
//       <div className="bg-red-500  r h-4 w-3/4 mb-2 rounded"></div>
//       <div className="bg-red-500   h-4 w-1/2 mb-2 rounded"></div>
//       <div className="bg-red-500   h-4 w-1/4 rounded"></div>
//     </div>
//   </>
// );

