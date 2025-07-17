import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentWrapper } from "../../components/ComponentWrapper";
import { FooterNavBar } from "../../components/FooterNavBar";
import { motion } from "framer-motion";

export const RequestFeedback = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleSendRequest = () => {
    if (selectedTemplate) {
      if (selectedTemplate === "Personal Growth") {
        navigate("/feedback/personal-growth");
      } else if (selectedTemplate === "Emotional Intelligence") {
        navigate("/feedback/emotional-intelligence");
      } else if (selectedTemplate === "Relationship") {
        navigate("/feedback/relationship");
      } else if (selectedTemplate === "Mental Health") {
        navigate("/feedback/mental-health");
      } else if (selectedTemplate === "Communication") {
        navigate("/feedback/communication");
      } else if (selectedTemplate === "Values") {
        navigate("/feedback/values");
      } else if (selectedTemplate === "Conflict Resolution") {
        navigate("/feedback/conflict-resolution");
      } else if (selectedTemplate === "Romantic") {
        navigate("/feedback/romantic");
      } else {
        alert(`Feedback request for "${selectedTemplate}" has been sent!`);
        navigate("/dashboard");
      }
    } else {
      alert("Please select a feedback template first");
    }
  };

  const templates = [
    { id: "personal-growth", name: "Personal Growth", icon: "https://c.animaapp.com/hUOULd8k/img/vector-8.svg" },
    { id: "emotional-intelligence", name: "Emotional Intelligence", icon: "https://c.animaapp.com/hUOULd8k/img/noto-brain.svg" },
    { id: "relationship", name: "Relationship", icon: "https://c.animaapp.com/hUOULd8k/img/vector-7.svg" },
    { id: "mental-health", name: "Mental Health", icon: "https://c.animaapp.com/hUOULd8k/img/meditation-streamline-flex-gradient@2x.png" },
    { id: "communication", name: "Communication", icon: "https://c.animaapp.com/hUOULd8k/img/vector-9.svg" },
    { id: "values", name: "Values", icon: "https://c.animaapp.com/hUOULd8k/img/vector-10.svg" },
    { id: "conflict-resolution", name: "Conflict Resolution", icon: "https://c.animaapp.com/hUOULd8k/img/group-21@2x.png" },
    { id: "romantic", name: "Romantic", icon: "https://c.animaapp.com/hUOULd8k/img/love@2x.png" }
  ];

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="713:3826"
    >
      <div className="bg-white overflow-hidden bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[380px] h-[800px] relative">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <div className="absolute w-[284px] font-title-3 font-[number:var(--title-3-font-weight)] text-inkdarkest text-[length:var(--title-3-font-size)] text-center tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)]">
            Request Feedback
          </div>
          
          <motion.button
            className="absolute left-4 w-[31px] h-[15px]"
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

        <div className="absolute w-[350px] h-[613px] top-[80px] left-3.5 bg-white rounded-[40px_40px_0px_0px] shadow-[0px_5px_15px_rgba(0,0,0,0.08)] pb-[100px]">
          <div className="w-full h-[60px] flex items-center justify-center border-b border-gray-100">
            <h3 className="font-medium text-primarybase text-lg">
              Choose a Template
            </h3>
          </div>

          {/* Featured Template */}
          <motion.div
            className="mx-auto mt-6 mb-8"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComponentWrapper className="!mx-auto" />
          </motion.div>

          {/* Template Grid */}
          <div className="grid grid-cols-3 gap-4 px-[20px]">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                className={`w-[87px] h-[110px] flex flex-col items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplateClick(template.name)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.05) }}
              >
                <div className={`w-[87px] h-[87px] rounded-[10px] border border-solid ${
                  selectedTemplate === template.name 
                    ? "border-[#74a4ee] bg-[#d4e4fa] shadow-[0px_5px_15px_rgba(116,164,238,0.2)]" 
                    : "border-[#e1e1e1] bg-blue-100"
                } flex items-center justify-center`}>
                  <img
                    className="w-[53px] h-[53px]"
                    alt={template.name}
                    src={template.icon}
                  />
                </div>
                <p className="text-xs text-center mt-2 font-medium">{template.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Send Request Button */}
          <motion.button
            className={`absolute w-[317px] h-12 bottom-[20px] left-1/2 transform -translate-x-1/2 rounded-[48px] ${
              selectedTemplate ? "bg-[#74a4ee]" : "bg-[#a8c9f8] cursor-not-allowed"
            }`}
            whileHover={selectedTemplate ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" } : {}}
            whileTap={selectedTemplate ? { scale: 0.97 } : {}}
            onClick={handleSendRequest}
            disabled={!selectedTemplate}
          >
            <div className="absolute h-4 top-[15px] left-0 right-0 font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-white text-[length:var(--regular-none-medium-font-size)] text-center tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
              Send Request
            </div>
          </motion.button>
        </div>

        {/* Status Bar */}
        <div className="absolute w-full h-11 top-0 left-0 bg-skywhite">
          <div className="absolute h-4 top-[15px] left-[30px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-inkdarkest text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
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

        <FooterNavBar />
      </div>
    </div>
  );
};
