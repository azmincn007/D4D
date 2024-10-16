import React from 'react';
import { Card } from 'flowbite-react';

const ShimmerOrganizerCard = () => {
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
      background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
      background-size: 1000px 100%;
    }
  `;

  return (
    <div className="w-full max-w-sm">
      <style>{shimmerStyle}</style>
      <Card className="w-full max-w-sm rounded-lg shadow-lg cardmenu">
        <div className="shimmer h-56 w-full rounded-t-lg"></div>
        <div className="p-4">
          <div className="shimmer h-4 w-1/2 mb-2"></div>
          <div className="shimmer h-6 w-3/4 mb-2"></div>
          <div className="shimmer h-8 w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="shimmer h-4 w-full"></div>
            <div className="shimmer h-4 w-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShimmerOrganizerCard;