import React from "react";
import { Card } from "flowbite-react";
import Flowbitecard from "../../Themes/Flowbitecard";

const Homecards = ({ img, title, content, logo }) => {
  return (
    <div className="card">
      <Card theme={Flowbitecard} className="cardfl  p-1 rounded-[10px] " imgAlt="Meaningful alt text for an image that is not purely decorative" imgSrc={img}>
        <h5 className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white font-inter">{title}</h5>
        <p className="font-normal text-[10px] text-[#949494] dark:text-gray-400">{content}</p>

        <div>
          <img className="logocard w-[40px] h-[40px] absolute top-[3%] left-[5%]" src={logo} alt="" />
        </div>
      </Card>
    </div>
  );
};

export default Homecards;
