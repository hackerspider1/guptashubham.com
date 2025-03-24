"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CopyrightMessage = "▞▚▞▚▞▚▞_Copyright_2024_▞▚▞▚▞▚▞_Next.JS_Vercel_▞▚▞▚▞▚▞_INPUT MONO_▞▚▞▚▞▚▞_OFFBIT TYPE_▞▚▞▚▞▚▞_Copyright_2024_▞▚▞▞▚▞▚▞▚▞_Copyright_2024_▞▚▞▚▞▚▞_Next.JS_Vercel_▞▚▞▚▞▚▞_INPUT MONO_▞▚▞▚▞▚▞_OFFBIT TYPE_▞▚▞▚▞▚▞_Copyright_2024_▞▚▞";

export const Copyright = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % CopyrightMessage.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const shiftedMessage = CopyrightMessage.slice(position) + CopyrightMessage.slice(0, position);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-neutral-400 font-mono text-xs whitespace-nowrap"
      >
        {shiftedMessage}
      </motion.div>
    </div>
  );
};

export default Copyright;
