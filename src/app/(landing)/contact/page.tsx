"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import Button from '@/components/ui/button';


const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSending(true);
    
    try {
      // Get reCAPTCHA token
      const token = await recaptchaRef.current?.executeAsync();
      if (!token) {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }
      
      // Show the plane animation
      setShowPlane(true);
      
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });
      
      // Wait for plane animation while processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success! Clear form and show success message
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setShowPlane(false);
      setIsSending(false);
      setIsSent(true);
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Hide the plane animation
      setShowPlane(false);
      setIsSending(false);
      
      // Set error message
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Clean Dark Background with Subtle Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>



      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="bg-gradient-to-b from-black to-zinc-900 w-full flex justify-center pb-8">
          <div className="relative z-10 max-w-6xl w-full px-6">
            <div className="text-center mb-16 relative pt-20 flex flex-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="relative mb-6" 
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl"></div>
                <div className="relative w-20 h-20 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800 shadow-lg">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Get in Touch
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl"
              >
                Have a question or want to work together? Send me a message.
              </motion.p>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-3xl w-full px-6 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full flex-1 flex items-center justify-center -mt-10"
          >
            <div className="w-full">
              <AnimatePresence>
                {showPlane && (
                  <motion.div
                    initial={{ x: "-50%", y: 0 }}
                    animate={{ x: "200%", y: "-200%" }}
                    exit={{ x: "200%", y: "-200%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="fixed top-1/2 left-1/2 z-50"
                  >
                    <Send className="h-16 w-16 text-purple-400" />
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
                    className="relative"
                  >
                    {/* Card glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 rounded-xl blur-xl"></div>
                    
                    <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-zinc-800/60">
                      {/* Message header */}
                      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-4 flex items-center justify-between border-b border-zinc-800/80">
                        <h1 className="text-lg font-semibold text-white flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-purple-400" />
                          New Message
                        </h1>
                        <div className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                          Private & Secure
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="p-6">
                        {error && (
                          <div className="mb-4 p-3 bg-red-900/20 border border-red-800/40 rounded-lg flex items-start">
                            <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                          </div>
                        )}
                        
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Your Name</label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 text-white"
                                placeholder="John Doe"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Your Email</label>
                            <div className="relative">
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 text-white"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                            <div className="relative">
                              <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                rows={5}
                                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 text-white resize-none"
                                placeholder="Tell me about your project or ask a question..."
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/20 flex items-center justify-center hover:shadow-purple-500/30 transition-all duration-300"
                            disabled={isSending}
                          >
                            {isSending ? (
                              <>Sending...</>
                            ) : (
                              <>
                                Send Message
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </motion.button>
                        </div>
                        
                        <div className="mt-4 text-center text-xs text-zinc-500">
                          Your information is secure and will never be shared with third parties.
                        </div>
                        
                        {/* Invisible reCAPTCHA */}
                        <div className="hidden">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                          />
                        </div>
                      </form>
                    </div>
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
                    className="relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-zinc-900/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-zinc-800/60 flex flex-col items-center justify-center text-center">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 0.2, 
                          type: "spring",
                          stiffness: 260,
                          damping: 20 
                        }}
                        className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/30"
                      >
                        <Check className="h-10 w-10 text-green-500" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                      <p className="text-zinc-400 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSent(false)}
                        className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors text-sm"
                      >
                        Send Another Message
                      </motion.button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
