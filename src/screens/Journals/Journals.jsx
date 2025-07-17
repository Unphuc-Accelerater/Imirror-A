import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { JournalEntry } from "../../components/JournalEntry";
import { FooterNavBar } from "../../components/FooterNavBar";

export const Journals = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Load journal entries from localStorage
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleAddEntry = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJournalText("");
    setSelectedMood(null);
  };

  const handleSaveEntry = () => {
    if (selectedMood && journalText.trim()) {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        text: journalText,
        date: new Date().toLocaleDateString()
      };
      
      const updatedEntries = [newEntry, ...journalEntries];
      setJournalEntries(updatedEntries);
      
      // Save to localStorage
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
      
      handleCloseModal();
    }
  };

  const handleDeleteEntry = (entryToDelete) => {
    const updatedEntries = journalEntries.filter(entry => entry.id !== entryToDelete.id);
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="718:280"
    >
      <div className="bg-white bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[380px] h-[801px] relative">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <div className="absolute w-[317px] font-title-3 font-[number:var(--title-3-font-weight)] text-inkdarkest text-[length:var(--title-3-font-size)] text-center tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)]">
            Journal
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

        {/* Mood Selector Card */}
        <div className="absolute w-[350px] h-[140px] top-[80px] left-[15px] bg-white rounded-[21px] shadow-[0px_5px_15px_rgba(0,0,0,0.08)]">
          <div className="w-full h-[50px] flex items-center justify-center border-b border-gray-100">
            <h3 className="font-bold text-primarybase text-lg">
              {userData?.name ? `How are you today, ${userData.name}?` : "How are you today?"}
            </h3>
          </div>

          <div className="flex justify-around items-center h-[90px]">
            <motion.button
              className={`flex flex-col items-center ${selectedMood === "Excited" ? "scale-110 bg-blue-50 p-2 rounded-full" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect("Excited")}
            >
              <span className="text-3xl">😄</span>
              <span className="text-xs mt-1 font-medium">Excited</span>
            </motion.button>
            
            <motion.button
              className={`flex flex-col items-center ${selectedMood === "Happy" ? "scale-110 bg-blue-50 p-2 rounded-full" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect("Happy")}
            >
              <span className="text-3xl">😊</span>
              <span className="text-xs mt-1 font-medium">Happy</span>
            </motion.button>
            
            <motion.button
              className={`flex flex-col items-center ${selectedMood === "Neutral" ? "scale-110 bg-blue-50 p-2 rounded-full" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect("Neutral")}
            >
              <span className="text-3xl">😐</span>
              <span className="text-xs mt-1 font-medium">Neutral</span>
            </motion.button>
            
            <motion.button
              className={`flex flex-col items-center ${selectedMood === "Sad" ? "scale-110 bg-blue-50 p-2 rounded-full" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect("Sad")}
            >
              <span className="text-3xl">😢</span>
              <span className="text-xs mt-1 font-medium">Sad</span>
            </motion.button>
          </div>
        </div>

        {/* Journal History */}
        <div className="absolute w-[350px] top-[240px] bottom-[100px] left-[15px] overflow-y-auto pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#333]">History</h2>
            {journalEntries.length > 0 && (
              <span className="text-xs text-gray-500">{journalEntries.length} entries</span>
            )}
          </div>
          
          {journalEntries.length > 0 ? (
            journalEntries.map(entry => (
              <JournalEntry 
                key={entry.id} 
                entry={entry} 
                onDelete={handleDeleteEntry}
              />
            ))
          ) : (
            <div className="bg-white rounded-[21px] shadow-[0px_5px_15px_rgba(0,0,0,0.08)] p-6 text-center">
              <p className="text-gray-500 mb-2">No journal entries yet.</p>
              <p className="text-sm text-gray-400">Add your first entry by clicking the button below!</p>
            </div>
          )}
        </div>

        {/* Add Entry Button */}
        <motion.button
          className="fixed w-[317px] h-12 bottom-[100px] left-1/2 transform -translate-x-1/2 bg-[#74a4ee] rounded-[48px] shadow-[0px_5px_15px_rgba(116,164,238,0.3)]"
          whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(116,164,238,0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddEntry}
        >
          <div className="absolute h-4 top-[15px] left-0 right-0 font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-white text-[length:var(--regular-none-medium-font-size)] text-center leading-[var(--regular-none-medium-line-height)] tracking-[var(--regular-none-medium-letter-spacing)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
            Add Entry
          </div>
        </motion.button>

        {/* Status Bar */}
        <div className="absolute w-[380px] h-11 top-0 left-0 bg-skywhite">
          <div className="absolute h-4 top-[15px] left-[30px] font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-inkdarkest text-[length:var(--regular-none-medium-font-size)] leading-[var(--regular-none-medium-line-height)] tracking-[var(--regular-none-medium-letter-spacing)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
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

        {/* Journal Entry Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-[20px] w-[320px] p-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-bold mb-4 text-center">New Journal Entry</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                  <div className="flex justify-around">
                    <motion.button
                      className={`p-2 rounded-full ${selectedMood === "Excited" ? "bg-blue-100" : ""}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoodSelect("Excited")}
                    >
                      <span className="text-2xl">😄</span>
                    </motion.button>
                    
                    <motion.button
                      className={`p-2 rounded-full ${selectedMood === "Happy" ? "bg-blue-100" : ""}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoodSelect("Happy")}
                    >
                      <span className="text-2xl">😊</span>
                    </motion.button>
                    
                    <motion.button
                      className={`p-2 rounded-full ${selectedMood === "Neutral" ? "bg-blue-100" : ""}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoodSelect("Neutral")}
                    >
                      <span className="text-2xl">😐</span>
                    </motion.button>
                    
                    <motion.button
                      className={`p-2 rounded-full ${selectedMood === "Sad" ? "bg-blue-100" : ""}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoodSelect("Sad")}
                    >
                      <span className="text-2xl">😢</span>
                    </motion.button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">What's on your mind?</label>
                  <textarea
                    className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#74a4ee]/30 focus:border-[#74a4ee]"
                    placeholder="Write your thoughts here..."
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <motion.button
                    className="px-4 py-2 bg-gray-100 rounded-md text-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    className={`px-4 py-2 rounded-md ${
                      selectedMood && journalText.trim() 
                        ? "bg-[#74a4ee] text-white" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileHover={selectedMood && journalText.trim() ? { scale: 1.05 } : {}}
                    whileTap={selectedMood && journalText.trim() ? { scale: 0.95 } : {}}
                    onClick={handleSaveEntry}
                    disabled={!selectedMood || !journalText.trim()}
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
