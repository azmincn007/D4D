// LoginSuccess.js
import React from 'react';
import { motion } from 'framer-motion';

const LoginSuccess = ({ successMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50 bg-green-500 p-3 rounded-lg shadow-lg flex items-center"
    >
      <div className="relative mr-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
        >
          <motion.svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm font-semibold text-white"
      >
        {successMessage}
      </motion.p>
    </motion.div>
  );
};

export default LoginSuccess;