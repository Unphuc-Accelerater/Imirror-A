import React from "react";
import { Button } from "../../components/Button";
import { Materials } from "../../components/Materials";

export const Getstarted = () => {
  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="681:908"
    >
      <div className="bg-new-fill-ffffff overflow-hidden border border-solid border-[#6ca1ef] w-[381px] h-[801px]">
        <div className="relative w-[390px] h-[844px]">
          <div className="absolute w-[390px] h-[844px] top-0 left-0 bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)]">
            <div className="relative w-[381px] h-[646px] top-[155px]">
              <Button
                divClassName="!mt-[unset]"
                label="Get Started"
                size="medium"
                stateProp="default"
                to="/loginu38signup"
                variant="primary"
                variantPrimaryClassName="!border-[#74a4ee] !h-[49px] !rounded-[25px] !shadow-[0px_7px_16px_#0000001a,0px_30px_30px_#00000017,0px_67px_40px_#0000000d,0px_120px_48px_#00000003,0px_187px_52px_transparent] !flex !absolute !left-[71px] !bg-new-fill-74a4ee !w-[272px] !top-[550px]"
              />
              <img
                className="absolute w-[381px] h-[646px] top-0 left-0"
                alt="Rectangle"
                src="https://c.animaapp.com/hUOULd8k/img/rectangle-3-1.svg"
              />

              <img
                className="absolute w-[89px] h-[89px] top-[13px] left-[150px] object-cover"
                alt="Image"
                src="https://c.animaapp.com/hUOULd8k/img/image-19@2x.png"
              />

              <div className="absolute top-[101px] left-[71px] font-heading font-[number:var(--heading-font-weight)] text-black text-[length:var(--heading-font-size)] tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] whitespace-nowrap [font-style:var(--heading-font-style)]">
                Grow Yourself Better
              </div>

              <p className="absolute w-[238px] top-[175px] left-[87px] font-body-base font-[number:var(--body-base-font-weight)] text-black text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                Transform feedback into actionable
                <br />
                growth plans. Track your progress and become the best version of
                yourself with personalized insights.
              </p>
            </div>
          </div>

          <div className="absolute w-[327px] h-11 top-[572px] left-8">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-2 relative top-2.5 left-[131px] rounded-[50px] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)]">
              <Materials
                className="!h-6 !rounded-[100px] !absolute !left-0 !bg-new-fill-bfbfbf !w-16 !top-0"
                style="ultrathin"
              />
              <div className="opacity-30 relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />

              <div className="opacity-30 relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />

              <div className="relative w-2 h-2 bg-system-colors-labels-primary rounded-[50px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
