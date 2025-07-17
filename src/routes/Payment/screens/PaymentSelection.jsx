import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const PaymentSelection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null); // "card" or "upi"
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);

  useEffect(() => {
    let enabled = false;
    if (selectedMethod === "card") {
      enabled =
        cardDetails.cardNumber.length === 16 &&
        cardDetails.expiryDate.length === 5 &&
        cardDetails.cvv.length === 3 &&
        cardDetails.cardholderName.trim() !== "";
    } else if (selectedMethod === "upi") {
      enabled = upiId.trim() !== "" && upiId.includes("@");
    }
    setIsPayButtonEnabled(enabled);
  }, [selectedMethod, cardDetails, upiId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpiInputChange = (e) => {
    setUpiId(e.target.value);
  };

  const handlePay = () => {
    if (isPayButtonEnabled) {
      // Simulate payment success
      navigate("/payment-success");
    }
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[#6e9de3] w-[381px] min-h-screen relative overflow-hidden">
        {/* Status Bar */}
        <div className="absolute w-full h-11 top-0 left-0 bg-transparent flex items-center justify-between px-4">
          <div className="text-white text-sm font-medium">9:41</div>
          <div className="flex items-center space-x-1">
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/mobile-signal-3@2x.png" alt="Mobile Signal" className="w-[18px] h-2.5" />
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/union-2.svg" alt="Wifi" className="w-[15px] h-[11px]" />
            <div className="w-[27px] h-[13px] border border-white rounded-[3px] flex items-center justify-center">
              <div className="w-5 h-2 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Header with Back Button and Amount */}
        <div className="absolute w-full h-[180px] top-0 left-0 flex flex-col items-center justify-center pt-10">
          <motion.button
            className="absolute top-8 left-6 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-white text-xl mt-4">Amount To Pay</h1>
          <p className="font-bold text-white text-4xl mt-2">$549</p>
        </div>

        {/* Main Content Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-6 px-6 pb-20 mt-[160px] relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Account Section */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-lg mb-3">Account</h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Credit/Debit Card */}
              <motion.div
                className="flex flex-col p-4 border-b border-gray-100 cursor-pointer"
                whileHover={{ backgroundColor: "#f0f7ff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(selectedMethod === "card" ? null : "card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://c.animaapp.com/md5feu4dyKLC8D/img/credit-card.svg"
                      alt="Credit Card"
                      className="w-6 h-6 mr-3"
                    />
                    <span className="text-black text-base">Credit/Debit Card</span>
                  </div>
                  <img
                    src="https://c.animaapp.com/md5feu4dyKLC8D/img/chevron-down.svg"
                    alt="Chevron Down"
                    className={`w-4 h-4 transition-transform ${selectedMethod === "card" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {selectedMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-3 overflow-hidden"
                    >
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        maxLength="16"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-[#74a4ee] outline-none text-sm"
                      />
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          className="w-1/2 h-10 px-3 rounded-md border border-gray-300 focus:border-[#74a4ee] outline-none text-sm"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className="w-1/2 h-10 px-3 rounded-md border border-gray-300 focus:border-[#74a4ee] outline-none text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        name="cardholderName"
                        placeholder="Cardholder Name"
                        value={cardDetails.cardholderName}
                        onChange={handleCardInputChange}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-[#74a4ee] outline-none text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pay by UPI */}
              <motion.div
                className="flex flex-col p-4 cursor-pointer"
                whileHover={{ backgroundColor: "#f0f7ff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(selectedMethod === "upi" ? null : "upi")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://c.animaapp.com/md5ftykhnMOpVD/img/vector-3.svg"
                      alt="Lock"
                      className="w-5 h-5 mr-3"
                    />
                    <span className="text-black text-base">Pay by UPI</span>
                  </div>
                  <img
                    src="https://c.animaapp.com/md5feu4dyKLC8D/img/chevron-down.svg"
                    alt="Chevron Down"
                    className={`w-4 h-4 transition-transform ${selectedMethod === "upi" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {selectedMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <input
                        type="text"
                        name="upiId"
                        placeholder="Enter UPI ID (e.g., example@bank)"
                        value={upiId}
                        onChange={handleUpiInputChange}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-[#74a4ee] outline-none text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
        <motion.button
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] h-12 rounded-[25px] text-white text-lg font-bold shadow-lg ${
            isPayButtonEnabled ? "bg-[#74a4ee]" : "bg-gray-300 cursor-not-allowed"
          }`}
          whileHover={isPayButtonEnabled ? { scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" } : {}}
          whileTap={isPayButtonEnabled ? { scale: 0.97 } : {}}
          onClick={handlePay}
          disabled={!isPayButtonEnabled}
        >
          Pay $549
        </motion.button>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
