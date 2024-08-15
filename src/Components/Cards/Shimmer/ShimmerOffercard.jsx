// ShimmerOfferCard.js
import React from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../../Themes/Flowbitecard";

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

const ShimmerOfferCard = () => {
  return (
    <div className="card font-inter">
      <style>{shimmerStyle}</style>
      <Card
        theme={Flowbitecard}
        className="cardfl p-1 rounded-[10px]"
      >
        <div className="shimmer w-full h-[400px]" />
      </Card>
    </div>
  );
};

export default ShimmerOfferCard;