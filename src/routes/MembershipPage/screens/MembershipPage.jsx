import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const MembershipPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("Pro Plan"); // Default selected plan
  const [isYearly, setIsYearly] = useState(false); // Toggle for monthly/yearly

  const handleGoBack = () => {
    navigate(-1);
  };

  const plans = {
    free: {
      name: "Free Plan",
      priceMonthly: 0,
      features: [
        "Create up to 5 forms",
        "Basic form templates",
        "Email notifications",
        "Community support",
      ],
      buttonText: "Current Plan",
      buttonColor: "bg-gray-100",
      textColor: "text-gray-500",
      borderColor: "border-gray-300",
    },
    pro: {
      name: "Pro Plan",
      priceMonthly: 100,
      priceYearly: 80, // 100 * 12 * 0.8 = 960 / 12 = 80
      features: [
        "Create up to 25 forms",
        "Advanced form templates",
        "Custom branding",
        "Analytics dashboard",
        "Priority support",
      ],
      buttonText: (price) => `Start Pro Plan - ₹${price}`,
      buttonColor: "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]",
      textColor: "text-white",
      borderColor: "border-blue-500",
      popular: true,
    },
    premium: {
      name: "Premium Plan",
      priceMonthly: 250,
      priceYearly: 200, // 250 * 12 * 0.8 = 2400 / 12 = 200
      features: [
        "Unlimited forms",
        "Premium templates & themes",
        "Advanced integrations",
        "White-label solution",
        "Dedicated account manager",
        "24/7 phone support",
      ],
      buttonText: (price) => `Start Premium Plan - ₹${price}`,
      buttonColor: "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]",
      textColor: "text-white",
      borderColor: "border-gray-300",
    },
  };

  const getPrice = (plan) => {
    if (isYearly && plan.priceYearly !== undefined) {
      return plan.priceYearly;
    }
    return plan.priceMonthly;
  };

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = (planName) => {
    alert(`Subscribing to ${planName} for ₹${getPrice(plans[planName.toLowerCase().replace(/\s/g, '')])}${isYearly ? ' (yearly)' : ' (monthly)'}!`);
    // In a real app, you'd integrate with a payment gateway here
    navigate("/dashboard"); // Navigate back after "subscription"
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white w-[381px] min-h-screen relative overflow-hidden pb-20">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <motion.button
            className="absolute left-4 w-[31px] h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5feu4dyKLC8D/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Choose Your Plan</h1>
        </div>

        {/* Hero Section */}
        <div className="mt-[80px] flex flex-col items-center px-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-md">
            <img
              className="w-[21px] h-5"
              alt="Star Icon"
              src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector-11.svg"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Select Your Plan</h2>
          <p className="text-sm text-gray-500 mt-2">
            Choose the perfect plan for your form building needs
          </p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="w-[350px] h-[50px] mx-auto mt-8 bg-gray-100 rounded-[10px] flex items-center justify-around p-1 relative">
          <motion.div
            className="absolute h-[42px] bg-white rounded-lg shadow-md"
            animate={{ x: isYearly ? "50%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: "48%", left: "1%" }}
          />
          <button
            className={`relative z-10 w-1/2 h-full text-sm font-medium ${isYearly ? "text-gray-500" : "text-gray-800"}`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`relative z-10 w-1/2 h-full text-sm font-medium ${isYearly ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
          {isYearly && (
            <div className="absolute top-0 right-2 bg-emerald-500 rounded-[3px] px-1 py-0.5 text-white text-[9px] font-bold">
              SAVE 20%
            </div>
          )}
        </div>

        {/* Plan Cards */}
        <div className="mt-8 px-6 space-y-6">
          {Object.keys(plans).map((key) => {
            const plan = plans[key];
            const currentPrice = getPrice(plan);
            const isSelected = selectedPlan === plan.name;

            return (
              <motion.div
                key={plan.name}
                className={`w-full bg-white rounded-xl border-2 p-6 relative overflow-hidden ${
                  isSelected ? plan.borderColor : "border-gray-200"
                } shadow-md`}
                whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 rounded-[20px] px-4 py-1 text-white text-xs font-bold shadow-md">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.name === "Free Plan" ? "Perfect for getting started" : plan.name === "Pro Plan" ? "Best for growing businesses" : "For enterprise and power users"}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-800">₹{currentPrice}</span>
                    <span className="text-xs text-gray-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-800">
                      <img
                        className="w-4 h-4 mr-2"
                        alt="Checkmark"
                        src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector.svg"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full h-11 rounded-lg font-semibold text-sm ${
                    isSelected
                      ? plan.buttonColor + " " + plan.textColor
                      : "bg-gray-100 text-gray-500"
                  }`}
                  whileHover={isSelected ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(139,92,246,0.3)" } : {}}
                  whileTap={isSelected ? { scale: 0.97 } : {}}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={!isSelected}
                >
                  {plan.name === "Free Plan" ? plan.buttonText : plan.buttonText(currentPrice)}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Free Trial Info */}
        <div className="w-[350px] mx-auto mt-8 bg-[#f8f9fa] rounded-[10px] p-4 flex items-start shadow-sm">
          <img
            className="w-4 h-4 mt-1 mr-3"
            alt="Info Icon"
            src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector-23.svg"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Free Trial Available</h3>
            <p className="text-xs text-gray-500 mt-1">
              Start with a 7-day free trial on Pro and Premium plans. Cancel anytime during the trial period with no charges.
            </p>
          </div>
        </div>

        {/* Terms and Policy */}
        <p className="w-[350px] mx-auto text-[11px] text-gray-500 text-center mt-6">
          By subscribing, you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          . You can cancel your subscription at any time.
        </p>

        {/* Payment & Support Features */}
        <div className="flex justify-around w-[350px] mx-auto mt-6">
          <div className="flex flex-col items-center w-[100px] h-[80px] bg-gray-100 rounded-md p-2 shadow-sm">
            <img
              className="w-5 h-5 mb-1"
              alt="Secure Payment"
              src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector-1.svg"
            />
            <span className="text-[9px] font-medium text-gray-500 text-center">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center w-[100px] h-[80px] bg-gray-100 rounded-md p-2 shadow-sm">
            <img
              className="w-5 h-5 mb-1"
              alt="24/7 Support"
              src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector-22.svg"
            />
            <span className="text-[9px] font-medium text-gray-500 text-center">24/7 Support</span>
          </div>
          <div className="flex flex-col items-center w-[100px] h-[80px] bg-gray-100 rounded-md p-2 shadow-sm">
            <img
              className="w-5 h-5 mb-1"
              alt="Money Back"
              src="https://c.animaapp.com/md5feu4dyKLC8D/img/vector-8.svg"
            />
            <span className="text-[9px] font-medium text-gray-500 text-center">Money Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};
