/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Materials } from "../Materials";

export const PageControl = ({
  dots,
  selection,
  platter,
  className,
  frameClassName,
  materialsStyleUltrathinClassName,
}) => {
  return (
    <div className={`w-[402px] h-11 ${className}`}>
      <div
        className={`inline-flex items-center justify-center gap-2 px-3 py-2 relative top-2.5 left-[168px] rounded-[50px] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)] ${frameClassName}`}
      >
        <Materials
          className={materialsStyleUltrathinClassName}
          style="ultrathin"
        />
        <div className="relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />

        <div className="relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px] opacity-30" />

        <div className="relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px] opacity-30" />
      </div>
    </div>
  );
};
