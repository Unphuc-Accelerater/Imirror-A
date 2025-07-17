import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Coaches = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); // "All", "Therapist", "Coach"

  const handleGoBack = () => {
    navigate(-1);
  };

  const coachesData = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Clinical Psychologist",
      experience: "12 years exp",
      consultations: "300+",
      type: "Therapist",
      image: "https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16.png",
      route: "/coaches/sarah-chen",
    },
    {
      id: 2,
      name: "Coach Mike Johnson",
      specialty: "Basketball Coach",
      experience: "8 years exp",
      consultations: "250+",
      type: "Coach",
      image: "https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16-2.png",
      route: "/coaches/mike-johnson", // Example route for other coaches
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Marriage Counselor",
      experience: "15 years exp",
      consultations: "400+",
      type: "Therapist",
      image: "https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16-3.png",
      route: "/coaches/emily-white",
    },
    {
      id: 4,
      name: "Coach David Lee",
      specialty: "Fitness Trainer",
      experience: "10 years exp",
      consultations: "350+",
      type: "Coach",
      image: "https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16-4.png",
      route: "/coaches/david-lee",
    },
    {
      id: 5,
      name: "Dr. Alex Green",
      specialty: "Child Psychologist",
      experience: "7 years exp",
      consultations: "200+",
      type: "Therapist",
      image: "https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16-5.png",
      route: "/coaches/alex-green",
    },
  ];

  const filteredCoaches = coachesData.filter(
    (coach) =>
      (filterType === "All" || coach.type === filterType) &&
      (coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const CoachCard = ({ coach }) => (
    <motion.div
      className="w-full bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.08)] p-4 flex items-center relative"
      whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        className="w-[80px] h-[80px] rounded-full object-cover mr-4"
        alt="Profile"
        src={coach.image}
      />
      <div className="flex-grow">
        <h3 className="font-bold text-black text-lg">{coach.name}</h3>
        <p className="text-black text-sm">{coach.specialty}</p>
        <div className="flex items-center text-xs text-gray-600 mt-1">
          <span>{coach.experience}</span>
          <span className="mx-2">|</span>
          <span>{coach.consultations} Consultations</span>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              className="w-[14px] h-[14px] mr-1"
              alt="Star"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/star-4.svg"
            />
          ))}
        </div>
      </div>
      <motion.button
        className="absolute bottom-4 right-4 w-[100px] h-9 bg-[#74a4ee] rounded-[25px] text-white text-sm font-medium shadow-md"
        whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(116,164,238,0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(coach.route)}
      >
        Consult
      </motion.button>
    </motion.div>
  );

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white w-[381px] min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="w-full h-[180px] bg-[#6e9de3] rounded-b-[50px] flex flex-col items-center justify-center relative">
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
          <h1 className="font-bold text-white text-3xl text-center mt-4">
            Coaches
          </h1>
          <p className="w-[340px] font-normal text-gray-200 text-base text-center mt-2">
            Connect with experienced therapists and coaches who can guide you on
            your journey to better mental health and personal growth.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-[350px] h-[50px] mx-auto -mt-6 bg-white rounded-[25px] border border-solid border-[#7fabef] flex items-center px-4 shadow-md z-10">
          <input
            type="text"
            placeholder="Search by name or specialty..."
            className="flex-grow h-full bg-transparent outline-none text-black text-base pl-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="w-full px-4 py-4 flex overflow-x-auto space-x-2">
          {["All", "Therapist", "Coach"].map((type) => (
            <motion.button
              key={type}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filterType === type
                  ? "bg-[#74a4ee] text-white border border-solid border-[#7fabef]"
                  : "bg-white text-black border border-solid border-[#7fabef]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
            >
              {type}
            </motion.button>
          ))}
        </div>

        {/* Coaches List */}
        <div className="w-full px-4 py-4 space-y-6">
          {filteredCoaches.length > 0 ? (
            filteredCoaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg mb-2">No coaches found matching your criteria.</p>
              <p className="text-sm">Try a different search or filter.</p>
            </div>
          )}
        </div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
