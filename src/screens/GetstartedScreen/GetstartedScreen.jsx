import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Carousel } from "../../components/Carousel";
import { motion } from "framer-motion";

const GetStartedCard = ({ title, image, description }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <motion.div 
        className="w-[327px] h-[404px] bg-new-fill-ffffff rounded-[43px] flex flex-col items-center px-8 py-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="w-[65px] h-[65px] mt-4 mb-6 object-cover"
          alt={title}
          src={image}
        />
        
        <h2 className="font-heading font-[number:var(--heading-font-weight)] text-new-fill-000000 text-[length:var(--heading-font-size)] tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] mb-6 text-center">
          {title}
        </h2>
        
        <p className="font-body-base font-[number:var(--body-base-font-weight)] text-black text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] text-center">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

export const GetstartedScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/loginu38signup");
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="681:880"
    >
      <div className="bg-white bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] h-[801px] relative">
        <div className="absolute top-[168px] left-0 right-0 bottom-[150px]">
          <Carousel>
            <GetStartedCard
              title="Anonymous Feedback"
              image="https://c.animaapp.com/hUOULd8k/img/image-15@2x.png"
              description="Receive honest and anonymous feedback from people who know you best!"
            />
            <GetStartedCard
              title="Therapists & Coaches"
              image="https://c.animaapp.com/hUOULd8k/img/image-17@2x.png"
              description="Connect with professional therapists and certified coaches who can guide your personal development journey with expert insights."
            />
            <GetStartedCard
              title="Grow Yourself Better"
              image="https://c.animaapp.com/hUOULd8k/img/image-19@2x.png"
              description="Transform feedback into actionable growth plans. Track your progress and become the best version of yourself with personalized insights."
            />
          </Carousel>
        </div>

        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(116,164,238,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-[59px] bottom-[60px] w-[272px]"
        >
          <Button
            divClassName="!mt-[unset]"
            label="Get Started"
            size="medium"
            stateProp="default"
            variant="primary"
            variantPrimaryClassName="!border-[#7fabef] !h-[49px] !rounded-[25px] !shadow-[0px_7px_16px_#0000001a] !flex !w-full !bg-new-fill-74a4ee"
            to="/loginu38signup"
          />
        </motion.div>
      </div>
    </div>
  );
};
