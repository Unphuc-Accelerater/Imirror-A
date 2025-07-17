import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Materials } from "../../components/Materials";

export const DivWrapper = () => {
  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="681:897"
    >
      <Link
        className="bg-new-fill-ffffff overflow-hidden w-[381px] h-[801px] block"
        to="/getstarted3"
      >
        <div className="relative w-[390px] h-[844px]">
          <div className="absolute w-[390px] h-[844px] top-0 left-0 border border-solid border-new-stroke-style bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)]">
            <Button
              divClassName="!mt-[unset]"
              label="Get Started"
              size="medium"
              stateProp="default"
              variant="primary"
              variantPrimaryClassName="!border-[#cfd6f4] !h-[49px] !rounded-[25px] !shadow-[0px_7px_16px_#0000001a,0px_30px_30px_#00000017,0px_67px_40px_#0000000d,0px_120px_48px_#00000003,0px_187px_52px_transparent] !flex !absolute !left-[59px] !bg-new-fill-74a4ee !w-[272px] !top-[704px]"
            />
            <div className="absolute w-[327px] h-[404px] top-[161px] left-8 bg-new-fill-ffffff rounded-[43px] shadow-drop-shadow-radius-24">
              <div className="absolute w-[246px] h-[124px] top-0 left-[45px]">
                <img
                  className="absolute w-24 h-24 top-0 left-[66px] object-cover"
                  alt="Image"
                  src="https://c.animaapp.com/hUOULd8k/img/image-17@2x.png"
                />

                <div className="absolute top-[95px] left-0 font-heading font-[number:var(--heading-font-weight)] text-black text-[length:var(--heading-font-size)] tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] whitespace-nowrap [font-style:var(--heading-font-style)]">
                  Therapists &amp; Coaches
                </div>
              </div>

              <p className="absolute w-[258px] top-[177px] left-[45px] font-body-base font-[number:var(--body-base-font-weight)] text-black text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                Connect with professional
                <br />
                therapists and certified coaches
                <br />
                who can guide your personal
                <br />
                development journey with expert insights.
              </p>
            </div>
          </div>

          <div className="absolute w-[365px] h-11 top-[568px] left-2.5">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-2 relative top-2.5 left-[150px] rounded-[50px] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)]">
              <Materials
                className="!h-6 !rounded-[100px] !absolute !left-0 !w-16 !top-0"
                style="ultrathin"
              />
              <div className="opacity-30 relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />

              <div className="relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />

              <div className="opacity-30 relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
