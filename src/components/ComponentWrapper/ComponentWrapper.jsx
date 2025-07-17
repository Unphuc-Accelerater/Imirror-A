/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { IconFavouriteFull } from "../IconFavouriteFull";

export const ComponentWrapper = ({ className }) => {
  return (
    <div
      className={`relative w-[308px] h-[63px] bg-blue-100 rounded-[10px] shadow-[0px_6px_10px_#00000012] ${className}`}
    >
      <div className="absolute w-[63px] h-[63px] top-0 left-0 bg-[#8b5cf645] rounded-[10px_0px_0px_10px]">
        <IconFavouriteFull className="!relative bg-[url(https://c.animaapp.com/hUOULd8k/img/icon-favourite-3.svg)] !left-5 !top-[19px]" />
      </div>

      <div className="absolute w-[181px] top-[18px] left-[77px] [font-family:'Inter',Helvetica] font-semibold text-inkdarkest text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
        Personal Growth
      </div>
    </div>
  );
};
