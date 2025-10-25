'use client'
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function StatCounter({ target = 1000, duration = 1, label }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const increment = end / (duration * 60); 
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16); 

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
      }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center px-6 py-4 bg-gray-800/40 rounded-2xl backdrop-blur-sm border border-[#10b981]/30 text-center"
    >
      <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#10b981] drop-shadow-[0_0_10px_#10b981aa]">
        {count.toLocaleString()}
      </span>
      {label && (
        <span className="text-base md:text-lg mt-2 text-gray-300 font-medium tracking-wide">
          {label}
        </span>
      )}
    </motion.div>
  );
}
