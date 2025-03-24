"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showPlane, setShowPlane] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setShowPlane(true);
    
    // Wait for plane animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowPlane(false);
    setIsSending(false);
    setIsSent(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-8 h-full flex-1 w-full flex items-center justify-center"
    >
      <div className="w-full -mt-20">
        <AnimatePresence>
          {showPlane && (
            <motion.div
              initial={{ x: "-50%", y: 0 }}
              animate={{ x: "200%", y: "-200%" }}
              exit={{ x: "200%", y: "-200%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="fixed top-1/2 left-1/2 z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </motion.div>
          )}

          {!isSent && !showPlane ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
              className="bg-[#ffffff] dark:bg-[#1d1f21] rounded-xl overflow-hidden shadow-2xl border border-[#e2e2e2] dark:border-[#2d2f31]"
            >
              <div className="bg-[#f5f5f5] dark:bg-[#2d2f31] px-6 py-4 border-b border-[#e2e2e2] dark:border-[#3d3f41]">
                <h1 className="text-lg font-semibold text-[#1d1d1f] dark:text-neutral-200">
                  New Message
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center border-b border-[#e2e2e2] dark:border-[#3d3f41] py-2">
                    <label className="w-20 text-sm font-medium text-[#666] dark:text-neutral-400">From:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="flex-1 bg-transparent outline-none text-[#1d1d1f] dark:text-neutral-200"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="flex items-center border-b border-[#e2e2e2] dark:border-[#3d3f41] py-2">
                    <label className="w-20 text-sm font-medium text-[#666] dark:text-neutral-400">Subject:</label>
                    <input
                      type="text"
                      className="flex-1 bg-transparent outline-none text-[#1d1d1f] dark:text-neutral-200"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="pt-4">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={8}
                      className="w-full bg-transparent outline-none text-[#1d1d1f] dark:text-neutral-200 resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-[#007AFF] text-white font-medium hover:bg-[#0066CC] transition-colors"
                    disabled={isSending}
                  >
                    {isSending ? 'Sending...' : 'Send'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : isSent ? (
            <motion.div
              initial={{ scale: 0, y: -50 }}
              animate={{ 
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }
              }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-neutral-200 mb-2">Message Sent!</h2>
              <p className="text-[#666] dark:text-neutral-400">Thank you for your message. We'll get back to you soon!</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Page;
