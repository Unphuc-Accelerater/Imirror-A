import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "../../../components/UI/BackButton";

export const PaymentSelection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let enabled = false;
    if (selectedMethod === "card") {
      enabled =
        cardDetails.cardNumber.replace(/\s/g, "").length === 16 &&
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
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (formattedValue.length > 5) return;
    }

    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 3) return;
    }

    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleUpiInputChange = (e) => {
    setUpiId(e.target.value);
    if (errors.upiId) {
      setErrors(prev => ({ ...prev, upiId: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedMethod === "card") {
      if (cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (cardDetails.expiryDate.length !== 5) {
        newErrors.expiryDate = "Enter valid expiry date (MM/YY)";
      }
      if (cardDetails.cvv.length !== 3) {
        newErrors.cvv = "CVV must be 3 digits";
      }
      if (!cardDetails.cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required";
      }
    } else if (selectedMethod === "upi") {
      if (!upiId.includes("@")) {
        newErrors.upiId = "Enter valid UPI ID";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    if (validateForm() && isPayButtonEnabled) {
      setProcessing(true);
      
      // Simulate payment processing
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store payment details in localStorage for demo
        const paymentData = {
          method: selectedMethod,
          amount: 549,
          timestamp: new Date().toISOString(),
          ...(selectedMethod === 'card' ? {
            cardNumber: cardDetails.cardNumber.slice(-4),
            cardholderName: cardDetails.cardholderName
          } : {
            upiId: upiId
          })
        };
        
        localStorage.setItem('lastPayment', JSON.stringify(paymentData));
        
        navigate("/payment-success");
      } catch (error) {
        alert("Payment failed. Please try again.");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6e9de3] to-[#74a4ee] pt-8 pb-8">
        <div className="flex items-center justify-between px-6 mb-6">
          <BackButton onClick={handleGoBack} style="dark" />
          <h1 className="text-white text-xl font-bold">Payment</h1>
          <div className="w-12" />
        </div>
        
        <div className="text-center">
          <p className="text-white/80 text-lg mb-2">Amount to Pay</p>
          <h2 className="text-white text-4xl font-bold">$549</h2>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-6 -mt-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Select Payment Method</h3>

          {/* Credit/Debit Card */}
          <motion.div
            className={`border-2 rounded-2xl p-4 mb-4 cursor-pointer transition-all ${
              selectedMethod === "card" 
                ? "border-[#74a4ee] bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMethod(selectedMethod === "card" ? null : "card")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="4" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/>
                    <path d="M1 10H23" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Credit/Debit Card</h4>
                  <p className="text-sm text-gray-500">Visa, Mastercard, Rupay</p>
                </div>
              </div>
              <motion.div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "card" ? "border-[#74a4ee] bg-[#74a4ee]" : "border-gray-300"
                }`}
                animate={{ scale: selectedMethod === "card" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {selectedMethod === "card" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </motion.div>
            </div>

            <AnimatePresence>
              {selectedMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      className={`w-full h-12 px-4 rounded-xl border-2 focus:outline-none transition-colors ${
                        errors.cardNumber ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#74a4ee]"
                      }`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        className={`w-full h-12 px-4 rounded-xl border-2 focus:outline-none transition-colors ${
                          errors.expiryDate ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#74a4ee]"
                        }`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        className={`w-full h-12 px-4 rounded-xl border-2 focus:outline-none transition-colors ${
                          errors.cvv ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#74a4ee]"
                        }`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      placeholder="John Doe"
                      value={cardDetails.cardholderName}
                      onChange={handleCardInputChange}
                      className={`w-full h-12 px-4 rounded-xl border-2 focus:outline-none transition-colors ${
                        errors.cardholderName ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#74a4ee]"
                      }`}
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* UPI Payment */}
          <motion.div
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
              selectedMethod === "upi" 
                ? "border-[#74a4ee] bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMethod(selectedMethod === "upi" ? null : "upi")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">UPI Payment</h4>
                  <p className="text-sm text-gray-500">Pay using UPI ID</p>
                </div>
              </div>
              <motion.div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "upi" ? "border-[#74a4ee] bg-[#74a4ee]" : "border-gray-300"
                }`}
                animate={{ scale: selectedMethod === "upi" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {selectedMethod === "upi" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </motion.div>
            </div>

            <AnimatePresence>
              {selectedMethod === "upi" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={handleUpiInputChange}
                    className={`w-full h-12 px-4 rounded-xl border-2 focus:outline-none transition-colors ${
                      errors.upiId ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#74a4ee]"
                    }`}
                  />
                  {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22S8 18 8 12V5L12 3L16 5V12C16 18 12 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 text-sm">Secure Payment</h4>
                <p className="text-green-700 text-xs">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <motion.button
          className={`w-full h-14 rounded-2xl font-bold text-lg transition-all flex items-center justify-center ${
            isPayButtonEnabled && selectedMethod && !processing
              ? "bg-gradient-to-r from-[#74a4ee] to-[#9783d3] text-white shadow-lg" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={isPayButtonEnabled && selectedMethod && !processing ? { scale: 1.02 } : {}}
          whileTap={isPayButtonEnabled && selectedMethod && !processing ? { scale: 0.98 } : {}}
          onClick={handlePay}
          disabled={!isPayButtonEnabled || !selectedMethod || processing}
        >
          {processing ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            "Pay $549"
          )}
        </motion.button>
      </div>
    </div>
  );
};