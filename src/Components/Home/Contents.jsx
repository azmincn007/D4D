import React from "react";
import { Label, Radio } from "flowbite-react";
import card from "../../assets/card.png";
import Homecards from "../Cards/Homecards";
import cardlogo from "../../assets/supermarketcardlogo.png";
import { Link } from "react-router-dom";
import "../../styles/Containers.css";

function Contents() {
  const contentcard = [
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    { img: card, title: "Lulu Eranakulam", cardlogo: cardlogo, content: "Sprawling, residential Ernakulam is known for Marine Drive, a busy ..." },
    // ... other card objects
  ];

  return (
    <div className="contentsdiv px-8 border-t-2 border-[#232F3E]">
      <div className=" cnd flex justify-between py-2 items-center">
        <div className="contentshead font-inter text-black font-semibold   py-2">
          Latest Lulu Hypermarket offers in UAE - Dubai
        </div>
        <div>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className=" nearby flex items-center gap-2">
              <Radio id="united-state" name="nearby" value="Nearby" />
              <Label htmlFor="Nearby" className="Mobile:text-xs">Near by</Label>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="contentscards">
        <div className="cardcontainer justify-center">
          {contentcard.map((obj, index) => (
            <Link key={index} to={"/flyer"} state={{ source: "supermarket" }}>
              <Homecards key={index} img={obj.img} logo={obj.cardlogo} title={obj.title} content={obj.content} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contents;
