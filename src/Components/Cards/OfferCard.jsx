import React from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";
import LazyImage from "../../api/Lazyimage";

const OfferCardComponent = ({ image }) => {
 
  

  return (
    <div className="card font-inter">
      <Card
        theme={Flowbitecard}
        className="cardfl p-1 rounded-[10px]"
      >
        <LazyImage
          src={image}
          alt="Offer"
          className="w-full h-[400px] object-cover"
        />
      </Card>
    </div>
  );
};

export default OfferCardComponent;