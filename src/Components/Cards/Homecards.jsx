import React from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";
import LazyImage from "../../api/Lazyimage";

const Homecards = ({ img, title, content, logo }) => {
  console.log(img);

  return (
    <div className="card">
      <Card 
        theme={Flowbitecard} 
        className="cardfl p-1 rounded-[10px]"
      >
        <LazyImage
          src={img}
          alt="Meaningful alt text for an image that is not purely decorative"
          className="w-full h-auto"
        />
        <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">
          {title}
        </h5>
        <p className="font-normal text-[10px] text-[#949494] dark:text-gray-400">
          {content}
        </p>
      </Card>
    </div>
  );
};

export default Homecards;