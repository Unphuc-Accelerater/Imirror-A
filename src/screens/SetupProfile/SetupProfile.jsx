import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoVideoCamera } from "../../icons/PhotoVideoCamera";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FooterNavBar } from "../../components/FooterNavBar";

export const SetupProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Store in localStorage for persistence
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="718:360"
    >
      <div className="bg-white bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[380px] h-[801px] relative">
        <div className="absolute w-[333px] h-8 top-[69px] left-4">
          <div className="absolute w-[317px] top-0 left-4 font-title-3 font-[number:var(--title-3-font-weight)] text-inkdarkest text-[length:var(--title-3-font-size)] text-center tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)]">
            Set up Profile
          </div>

          <motion.button
            className="absolute w-[31px] h-[15px] top-2.5 left-0"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/hUOULd8k/img/arrow-1-2.svg"
            />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="absolute w-[350px] h-[614px] top-[122px] left-[15px] bg-white rounded-[40px] border border-solid border-[#e9eefd] shadow-[0px_0px_35.3px_#00000017] pb-[100px]">
          {/* Profile Image Upload */}
          <motion.div 
            className="absolute w-[162px] h-[162px] top-[45px] left-[94px] bg-[#ecedff] rounded-[81px] overflow-hidden shadow-[0px_5px_15px_rgba(151,131,211,0.3)]"
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(151,131,211,0.4)" }}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                <PhotoVideoCamera className="!w-[78px] !h-[76px]" />
              </label>
            )}
          </motion.div>

          {/* Name Input */}
          <div className="absolute w-[309px] h-[60px] top-[224px] left-[20px]">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full h-full px-6 bg-[#f5f7fc] rounded-[15px] border-2 border-solid border-[#e9eefd] focus:border-[#74a4ee] focus:outline-none focus:ring-2 focus:ring-[#74a4ee]/30"
            />
          </div>

          {/* Age Input */}
          <div className="absolute w-[309px] h-[60px] top-[307px] left-[20px]">
            <input
              type="number"
              placeholder="Age"
              {...register("age", { required: true, min: 1, max: 120 })}
              className="w-full h-full px-6 bg-[#f5f7fc] rounded-[15px] border-2 border-solid border-[#e9eefd] focus:border-[#74a4ee] focus:outline-none focus:ring-2 focus:ring-[#74a4ee]/30"
            />
          </div>

          {/* Gender Input */}
          <div className="absolute w-[309px] h-[60px] top-[383px] left-[20px]">
            <select
              {...register("gender", { required: true })}
              className="w-full h-full px-6 bg-[#f5f7fc] rounded-[15px] border-2 border-solid border-[#e9eefd] focus:border-[#74a4ee] focus:outline-none focus:ring-2 focus:ring-[#74a4ee]/30 appearance-none"
              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto" }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Bio Input */}
          <div className="absolute w-[309px] h-[60px] top-[459px] left-[20px]">
            <textarea
              placeholder="Bio"
              {...register("bio")}
              className="w-full h-full px-6 py-4 bg-[#f5f7fc] rounded-[15px] border-2 border-solid border-[#e9eefd] focus:border-[#74a4ee] focus:outline-none focus:ring-2 focus:ring-[#74a4ee]/30 resize-none"
            />
          </div>

          {/* Continue Button */}
          <motion.button
            type="submit"
            className={`all-[unset] box-border absolute w-[309px] h-12 bottom-[60px] left-[20px] rounded-[48px] ${isValid ? 'bg-[#74a4ee]' : 'bg-[#a8c9f8] cursor-not-allowed'}`}
            whileHover={isValid ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(116,164,238,0.3)" } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
            disabled={!isValid}
          >
            <div className="left-0 right-0 text-white text-center absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
              Continue
            </div>
          </motion.button>

          {/* Skip Button */}
          <motion.button
            type="button"
            className="absolute w-[55px] h-[50px] bottom-[20px] left-[147px] font-regular-normal-regular font-[number:var(--regular-normal-regular-font-weight)] text-new-fill-4d1bf1 text-[length:var(--regular-normal-regular-font-size)] text-center tracking-[var(--regular-normal-regular-letter-spacing)] leading-[var(--regular-normal-regular-line-height)] [font-style:var(--regular-normal-regular-font-style)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
          >
            Skip
          </motion.button>
        </form>

        <div className="absolute w-[380px] h-11 top-0 left-0 bg-skywhite">
          <div className="left-[30px] text-inkdarkest absolute h-4 top-[15px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
            9:41
          </div>

          <img
            className="absolute w-[18px] h-2.5 top-5 left-[293px]"
            alt="Mobile signal"
            src="https://c.animaapp.com/hUOULd8k/img/mobile-signal-3@2x.png"
          />

          <div className="absolute w-[15px] h-[11px] top-[19px] left-[316px] bg-[url(https://c.animaapp.com/hUOULd8k/img/union-2.svg)] bg-[100%_100%]" />

          <div className="absolute w-[27px] h-[13px] top-[18px] left-[337px]">
            <div className="relative h-[13px]">
              <div className="absolute w-[25px] h-[13px] top-0 left-0 bg-[url(https://c.animaapp.com/hUOULd8k/img/rectangle-6.svg)] bg-[100%_100%]">
                <img
                  className="absolute w-5 h-2 top-0.5 left-0.5"
                  alt="Rectangle"
                  src="https://c.animaapp.com/hUOULd8k/img/rectangle-5.svg"
                />
              </div>

              <img
                className="absolute w-px h-1 top-[5px] left-[26px]"
                alt="Combined shape"
                src="https://c.animaapp.com/hUOULd8k/img/combined-shape-2.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
