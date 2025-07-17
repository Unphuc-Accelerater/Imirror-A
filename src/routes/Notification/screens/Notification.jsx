import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell } from "../icons/Bell"; // Assuming Bell is needed for the header or specific notification types

export const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All"); // "All", "Sessions", "Coaches", "Feedback", "App"

  useEffect(() => {
    // Simulate fetching notifications or load from local storage
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    if (storedNotifications.length === 0) {
      // Add some dummy notifications for demonstration if empty
      const dummyNotifications = [
        {
          id: 1,
          type: "Session",
          icon: "📅",
          title: "Session Confirmed",
          message: "Your basketball training session with Coach Mike is confirmed for tomorrow at 3:00 PM",
          time: "2 min ago",
          read: false,
          category: "Sessions",
          borderColor: "#4318d1",
        },
        {
          id: 2,
          type: "Coach",
          icon: "💬",
          title: "Message from Coach Sarah",
          message: "Great progress in today session! Keep practicing those free throws and you will see improvement soon.",
          time: "15 min ago",
          read: false,
          category: "Coaches",
          borderColor: "#EC4899", // pink-500
        },
        {
          id: 3,
          type: "Feedback",
          icon: "⭐",
          title: "Feedback Received",
          message: "Coach Mike rated your basketball session 5 stars and left positive feedback about your shooting technique.",
          time: "30 min ago",
          read: true,
          category: "Feedback",
          borderColor: "#F59E0B", // amber-500
        },
        {
          id: 4,
          type: "App",
          icon: "🔔",
          title: "Weekly Progress Report",
          message: "Your weekly training summary is ready. You completed 4 sessions this week!",
          time: "1 hour ago",
          read: false,
          category: "App",
          borderColor: "#000000", // default border
        },
        {
          id: 5,
          type: "Session",
          icon: "📅",
          title: "Session Rescheduled",
          message: "Your tennis session with Coach Alex has been moved to Friday 4:00 PM due to weather conditions",
          time: "2 hours ago",
          read: true,
          category: "Sessions",
          borderColor: "#4318d1",
        },
        {
          id: 6,
          type: "Feedback",
          icon: "⭐",
          title: "New Feedback Request",
          message: "Please rate your recent swimming session with Coach David and share your experience.",
          time: "3 hours ago",
          read: false,
          category: "Feedback",
          borderColor: "#F59E0B",
        },
      ];
      setNotifications(dummyNotifications);
      localStorage.setItem("notifications", JSON.stringify(dummyNotifications));
    } else {
      setNotifications(storedNotifications);
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    // Implement navigation to specific notification detail if applicable
    alert(`Navigating to notification ${id} details.`);
  };

  const filteredNotifications = notifications.filter(n => 
    filter === "All" ? true : n.category === filter
  );

  const totalNotifications = notifications.length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white w-[381px] min-h-screen relative overflow-hidden">
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
              src="https://c.animaapp.com/md5gg2nmEfs4JY/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Notifications</h1>
        </div>

        {/* Notification Summary */}
        <div className="w-full bg-white pt-[70px] pb-4 px-4 border-b border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <motion.button
              className="px-3 py-1 bg-indigo-50 rounded-xl text-[#4318d1] text-xs font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
            >
              Mark all read
            </motion.button>
          </div>
          <div className="flex space-x-4 text-sm font-medium text-gray-900">
            <span>Total: <span className="font-bold text-[#4318d1]">{totalNotifications}</span></span>
            <span>Unread: <span className="font-bold text-red-500">{unreadNotifications}</span></span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="w-full px-4 py-3 flex overflow-x-auto space-x-2 bg-white border-b border-gray-100">
          {["All", "Sessions", "Coaches", "Feedback", "App"].map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === cat ? "bg-[#4318d1] text-white" : "bg-gray-50 text-gray-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
            >
              {cat === "Sessions" && "📅 "}
              {cat === "Coaches" && "💬 "}
              {cat === "Feedback" && "⭐ "}
              {cat === "App" && "🔔 "}
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="w-full px-4 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`w-full bg-white rounded-[15px] p-4 shadow-md cursor-pointer relative overflow-hidden ${
                  !notification.read ? `border-l-4 border-[${notification.borderColor}]` : 'border border-gray-200'
                }`}
                whileHover={{ scale: 1.02, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start mb-2">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <span className="text-xl">{notification.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 text-base">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    notification.category === "Sessions" ? "bg-[#4318d1] text-white" :
                    notification.category === "Coaches" ? "bg-pink-500 text-white" :
                    notification.category === "Feedback" ? "bg-amber-500 text-white" :
                    "bg-emerald-500 text-white"
                  }`}>
                    {notification.category.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg mb-2">No notifications found.</p>
              <p className="text-sm">Check back later for updates!</p>
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
