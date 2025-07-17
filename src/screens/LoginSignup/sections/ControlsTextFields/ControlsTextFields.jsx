import React from "react";

export const ControlsTextFields = () => {
  return (
    <div className="absolute w-[327px] h-12 top-[167px] left-[30px] rounded-lg">
      <div className="relative w-[329px] h-[50px] -top-px -left-px bg-skywhite rounded-lg border border-solid border-skylight">
        <div className="inline-flex items-center gap-4 relative top-4 left-4">
          <div className="inline-flex items-start gap-1 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-inkdarkest text-base tracking-[0] leading-4 whitespace-nowrap">
              +91
            </div>

            <div className="relative w-4 h-4">
              <img
                className="absolute w-2.5 h-1.5 top-[5px] left-[3px]"
                alt="Vector"
                src="https://c.animaapp.com/hUOULd8k/img/vector-6.svg"
              />
            </div>
          </div>

          <div className="relative w-[217px] mt-[-1.00px] font-regular-none-regular font-[number:var(--regular-none-regular-font-weight)] text-inklighter text-[length:var(--regular-none-regular-font-size)] tracking-[var(--regular-none-regular-letter-spacing)] leading-[var(--regular-none-regular-line-height)] [font-style:var(--regular-none-regular-font-style)]">
            Mobile number
          </div>
        </div>
      </div>
    </div>
  );
};
