import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let toastId = 0;
const toastCallbacks = new Set();

export const toast = {
  success: (message) => showToast(message, 'success'),
  error: (message) => showToast(message, 'error'),
  info: (message) => showToast(message, 'info'),
  warning: (message) => showToast(message, 'warning')
};

const showToast = (message, type) => {
  const id = ++toastId;
  const toast = { id, message, type };
  toastCallbacks.forEach(callback => callback(toast));
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toastCallbacks.forEach(callback => callback({ id, remove: true }));
  }, 3000);
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const callback = (toast) => {
      if (toast.remove) {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      } else {
        setToasts(prev => [...prev, toast]);
      }
    };

    toastCallbacks.add(callback);
    return () => toastCallbacks.delete(callback);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast }) => {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`px-4 py-3 rounded-lg shadow-lg max-w-sm ${typeStyles[toast.type]}`}
    >
      {toast.message}
    </motion.div>
  );
};