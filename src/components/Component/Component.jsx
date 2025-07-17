/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Component = ({
  className,
  overlapGroupClassName,
  rectangleClassName,
  rectangleClassNameOverride,
  starClassName,
  star = "https://c.animaapp.com/hUOULd8k/img/star-5-1.svg",
}) => {
  return (
    <div className={`w-[97px] h-[103px] ${className}`}>
      <div
        className={`relative w-[95px] h-[101px] top-0.5 ${overlapGroupClassName}`}
      >
        <div
          className={`absolute w-[50px] h-20 top-1.5 left-0 bg-[#9783d305] rounded-[10px] border-[5px] border-solid border-[#74a4ee] ${rectangleClassName}`}
        />

        <div
          className={`absolute w-[50px] h-20 top-[21px] left-[25px] rounded-[10px] border-[5px] border-solid border-[#9783d3] ${rectangleClassNameOverride}`}
        />

        <img
          className={`absolute w-[26px] h-[26px] top-0 left-[69px] ${starClassName}`}
          alt="Star"
          src={star}
        />
      </div>
    </div>
  );
};
