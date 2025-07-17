import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EnterTheDigit } from "./sections/EnterTheDigit";
import { motion } from "framer-motion";

export const Enterotp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(25);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    // Check if all OTP digits are filled
    const isComplete = otp.every(digit => digit !== "");
    setIsContinueEnabled(isComplete);
  }, [otp]);

  useEffect(() => {
    // Countdown timer for resend code
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [resendCountdown]);

  const handleDigitClick = (index) => {
    setActiveInputIndex(index);
    setIsKeyboardVisible(true);
  };

  const handleKeyPress = (digit) => {
    if (activeInputIndex < 4) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = digit;
      setOtp(newOtp);
      
      // Move to next input if available
      if (activeInputIndex < 3) {
        setActiveInputIndex(activeInputIndex + 1);
      }
    }
  };

  const handleBackspace = () => {
    if (activeInputIndex >= 0) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = "";
      setOtp(newOtp);
      
      // Move to previous input if not at first
      if (activeInputIndex > 0) {
        setActiveInputIndex(activeInputIndex - 1);
      }
    }
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      navigate("/setupprofile");
    }
  };

  const handleResendCode = () => {
    if (isResendEnabled) {
      // Reset OTP and countdown
      setOtp(["", "", "", ""]);
      setActiveInputIndex(0);
      setResendCountdown(25);
      setIsResendEnabled(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="656:622"
    >
      <div className="bg-white overflow-hidden w-[380px] h-[801px]">
        <div className="relative w-[390px] h-[844px]">
          <div className="absolute w-[390px] h-[844px] top-0 left-0 bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)]">
            <div className="absolute w-[327px] top-[148px] left-[34px] font-title-3 font-[number:var(--title-3-font-weight)] text-inkdarkest text-[length:var(--title-3-font-size)] text-center tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)]">
              Enter OTP
            </div>

            <EnterTheDigit />
            
            <motion.button 
              className={`all-[unset] box-border absolute w-[327px] h-12 top-[449px] left-8 rounded-[48px] ${isContinueEnabled ? 'bg-[#74a4ee]' : 'bg-[#a8c9f8] cursor-not-allowed'}`}
              whileHover={isContinueEnabled ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" } : {}}
              whileTap={isContinueEnabled ? { scale: 0.97 } : {}}
              onClick={handleContinue}
            >
              <div className="left-[129px] text-white text-center absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
                Continue
              </div>
            </motion.button>

            <motion.button 
              className="absolute w-[327px] h-12 top-[505px] left-[37px] rounded-[48px]"
              whileHover={isResendEnabled ? { scale: 1.03 } : {}}
              whileTap={isResendEnabled ? { scale: 0.97 } : {}}
              onClick={handleResendCode}
              disabled={!isResendEnabled}
            >
              <div className={`left-[114px] text-center absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)] ${isResendEnabled ? 'text-primarybase' : 'text-inklight'}`}>
                {isResendEnabled ? 'Resend code' : `Resend code (${resendCountdown}s)`}
              </div>
            </motion.button>

            <div className="absolute w-[390px] h-11 top-0 left-0 bg-skywhite">
              <div className="left-[30px] text-inkdarkest absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
                9:41
              </div>

              <img
                className="absolute w-[18px] h-2.5 top-5 left-[303px]"
                alt="Mobile signal"
                src="https://c.animaapp.com/hUOULd8k/img/mobile-signal-3@2x.png"
              />

              <div className="absolute w-[15px] h-[11px] top-[19px] left-[326px] bg-[url(https://c.animaapp.com/hUOULd8k/img/union-3.svg)] bg-[100%_100%]" />

              <div className="absolute w-[27px] h-[13px] top-[18px] left-[347px]">
                <div className="relative h-[13px]">
                  <div className="absolute w-[25px] h-[13px] top-0 left-0 bg-[url(https://c.animaapp.com/hUOULd8k/img/rectangle-6.svg)] bg-[100%_100%]">
                    <img
                      className="absolute w-5 h-2 top-0.5 left-0.5"
                      alt="Rectangle"
                      src="https://c.animaapp.com/hUOULd8k/img/rectangle-7.svg"
                    />
                  </div>

                  <img
                    className="absolute w-px h-1 top-[5px] left-[26px]"
                    alt="Combined shape"
                    src="https://c.animaapp.com/hUOULd8k/img/combined-shape-3.svg"
                  />
                </div>
              </div>
            </div>

            {/* OTP Input Boxes */}
            <div className="flex justify-center space-x-4 absolute top-[282px] left-[55px]">
              {otp.map((digit, index) => (
                <motion.div
                  key={index}
                  className={`w-[50px] h-[50px] bg-white rounded-[10px] border border-solid ${activeInputIndex === index ? 'border-[#74a4ee]' : 'border-[#e1e1e1]'} flex items-center justify-center cursor-pointer`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDigitClick(index)}
                >
                  <span className="text-2xl font-bold">{digit}</span>
                </motion.div>
              ))}
            </div>

            {isKeyboardVisible && (
              <div className="absolute w-[375px] h-[291px] bottom-0 left-2 bg-skylight backdrop-blur-[40.77px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40.77px)_brightness(100%)]">
                <div className="absolute w-[375px] h-[34px] top-[257px] left-0">
                  <div className="relative w-[134px] h-[5px] top-[21px] left-[121px] bg-inkdarkest rounded-[100px]" />
                </div>

                <div className="absolute w-[363px] h-[207px] top-1.5 left-1.5">
                  <button
                    className="absolute w-6 h-[18px] top-[174px] left-[295px]"
                    onClick={handleBackspace}
                  >
                    <img
                      className="w-full h-full"
                      alt="Delete"
                      src="https://c.animaapp.com/hUOULd8k/img/delete-1.svg"
                    />
                  </button>

                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, index) => {
                    const row = Math.floor(index / 3);
                    const col = index % 3;
                    const isZero = digit === 0;
                    
                    // Position for zero is special
                    const top = isZero ? 161 : (row * 54);
                    const left = isZero ? 123 : (col * 123);
                    
                    return (
                      <motion.button
                        key={digit}
                        className={`absolute w-[117px] h-[46px] top-[${top}px] left-[${left}px] bg-[url(https://c.animaapp.com/hUOULd8k/img/key-background-19.svg)] bg-[100%_100%]`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(digit.toString())}
                      >
                        <div className="top-1.5 [font-family:'SF_Pro_Display-Regular',Helvetica] absolute w-[117px] left-0 font-normal text-inkdarkest text-[25px] text-center tracking-[0.29px] leading-[normal]">
                          {digit}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <motion.button
            className="absolute w-9 h-[15px] top-[68px] left-[17px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/hUOULd8k/img/arrow-1-3.svg"
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
