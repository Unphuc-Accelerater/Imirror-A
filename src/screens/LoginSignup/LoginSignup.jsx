import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Component } from "../../components/Component";
import { ByContinuingYou } from "./sections/ByContinuingYou";
import { NavigationBarLarge } from "./sections/NavigationBarLarge";
import { motion } from "framer-motion";

export const LoginSignup = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Enable continue button only when exactly 10 digits are entered
    setIsContinueEnabled(phoneNumber.length === 10);
  }, [phoneNumber]);

  useEffect(() => {
    // Auto-focus and show keyboard when component mounts
    if (inputRef.current) {
      setTimeout(() => {
        setIsKeyboardVisible(true);
      }, 500);
    }
  }, []);

  const handlePhoneNumberChange = (digit) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      navigate("/enterotp");
    }
  };

  const handleInputFocus = () => {
    setIsKeyboardVisible(true);
    setIsFocused(true);
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="680:1706"
    >
      <div className="bg-white overflow-hidden border-2 border-solid border-[#74a4ee] w-[380px] h-[801px]">
        <div className="relative w-[390px] h-[844px] overflow-hidden bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)]">
          <div className="absolute w-[388px] h-[436px] top-[100px] left-0.5 bg-white shadow-[0px_18px_40px_#0000001a,0px_72px_72px_#00000017,0px_163px_98px_#0000000d,0px_289px_116px_#00000003,0px_452px_127px_transparent]">
            <motion.button 
              className={`all-[unset] box-border absolute w-[327px] h-12 top-[322px] left-[30px] rounded-[48px] ${isContinueEnabled ? 'bg-[#74a4ee]' : 'bg-[#a8c9f8] cursor-not-allowed'}`}
              whileHover={isContinueEnabled ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" } : {}}
              whileTap={isContinueEnabled ? { scale: 0.97 } : {}}
              onClick={handleContinue}
            >
              <div className="absolute h-4 top-[15px] left-[129px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-skywhite text-[length:var(--regular-none-medium-font-size)] text-center tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
                Continue
              </div>
            </motion.button>

            <div 
              className={`absolute w-[327px] h-12 top-[167px] left-[30px] rounded-lg cursor-text ${isFocused ? 'ring-2 ring-[#74a4ee]' : ''}`} 
              onClick={handleInputFocus}
              ref={inputRef}
            >
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

                  <div className="relative w-[217px] mt-[-1.00px] font-regular-none-regular font-[number:var(--regular-none-regular-font-weight)] text-inkdarkest text-[length:var(--regular-none-regular-font-size)] tracking-[var(--regular-none-regular-letter-spacing)] leading-[var(--regular-none-regular-line-height)] [font-style:var(--regular-none-regular-font-style)] flex items-center">
                    {phoneNumber || "Mobile number"}
                    {isFocused && phoneNumber.length < 10 && (
                      <motion.div 
                        className="w-[2px] h-[20px] bg-inkdarkest ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="absolute w-[327px] top-[235px] left-[46px] font-tiny-normal-regular font-[number:var(--tiny-normal-regular-font-weight)] text-inklight text-[length:var(--tiny-normal-regular-font-size)] tracking-[var(--tiny-normal-regular-letter-spacing)] leading-[var(--tiny-normal-regular-line-height)] [font-style:var(--tiny-normal-regular-font-style)]">
              You will receive an SMS verification that may apply message and
              data rates.
            </p>

            <div className="absolute w-[375px] h-[93px] top-[37px] left-1.5">
              <NavigationBarLarge />
              <Component
                className="!h-[69px] !opacity-[0.57] !absolute !left-[296px] !bg-white !w-[65px] !top-0"
                overlapGroupClassName="!h-[67px] !w-[63px]"
                rectangleClassName="!h-[54px] !w-[34px] !top-1"
                rectangleClassNameOverride="!h-[54px] !left-[17px] !w-[34px] !top-3.5"
                star="https://c.animaapp.com/hUOULd8k/img/star-5-3.svg"
                starClassName="!h-4 !left-[47px] !w-4"
              />
            </div>

            <ByContinuingYou />
          </div>

          <div className="absolute w-[390px] h-[47px] -top-px -left-0.5 bg-white">
            <div className="h-8 -top-0.5 left-[113px] absolute w-[164px]">
              <img
                className="h-[29px] top-[3px] left-0 absolute w-[164px]"
                alt="Notch"
                src="https://c.animaapp.com/hUOULd8k/img/notch.svg"
              />
            </div>

            <div className="absolute w-[54px] h-[21px] top-3.5 left-[27px]">
              <div className="relative h-[21px] rounded-3xl">
                <div className="absolute w-[54px] top-px left-0 font-default-bold-body font-[number:var(--default-bold-body-font-weight)] text-[#010101] text-[length:var(--default-bold-body-font-size)] text-center tracking-[var(--default-bold-body-letter-spacing)] leading-[var(--default-bold-body-line-height)] whitespace-nowrap [font-style:var(--default-bold-body-font-style)]">
                  9:41
                </div>
              </div>
            </div>

            <img
              className="absolute w-[77px] h-6 top-2 left-[286px]"
              alt="Right side"
              src="https://c.animaapp.com/hUOULd8k/img/right-side@2x.png"
            />
          </div>

          {isKeyboardVisible && (
            <motion.div 
              className="absolute w-[387px] h-[287px] bottom-0 left-0 bg-skylight backdrop-blur-[40.77px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40.77px)_brightness(100%)]"
              initial={{ y: 287 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute w-[387px] h-[34px] top-[253px] left-0">
                <div className="relative w-[134px] h-[5px] top-[21px] left-[127px] bg-inkdarkest rounded-[100px]" />
              </div>

              <div className="absolute w-[375px] h-[204px] top-1.5 left-1.5">
                <motion.button
                  className="absolute w-6 h-[18px] top-[172px] left-[307px]"
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBackspace}
                >
                  <img
                    className="w-full h-full"
                    alt="Delete"
                    src="https://c.animaapp.com/hUOULd8k/img/delete.svg"
                  />
                </motion.button>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, index) => {
                  const row = Math.floor(index / 3);
                  const col = index % 3;
                  const isZero = digit === 0;
                  
                  // Position for zero is special
                  const top = isZero ? 159 : (row * 54);
                  const left = isZero ? 127 : (col * 127);
                  
                  return (
                    <motion.button
                      key={digit}
                      className={`absolute w-[121px] h-[45px] top-[${top}px] left-[${left}px] bg-[url(https://c.animaapp.com/hUOULd8k/img/key-background.svg)] bg-[100%_100%]`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePhoneNumberChange(digit.toString())}
                    >
                      <div className="top-[5px] [font-family:'SF_Pro_Display-Regular',Helvetica] absolute w-[121px] left-0 font-normal text-inkdarkest text-[25px] text-center tracking-[0.29px] leading-[normal]">
                        {digit}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
