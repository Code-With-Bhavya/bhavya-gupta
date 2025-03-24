"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const withOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith('rgb')) {
    const parts = color.match(/\d+/g);
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
  }
  return color;
};

export default function GlowCard({ children, className, color = '#ffffff' }) {
  const container = useRef(null);
  const glowElements = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!container.current) return;

      const rect = container.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 120;
      const y = e.clientY - rect.top - 120;

      const updatePosition = () => {
        glowElements.current.forEach((glow) => {
          if (glow) {
            glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
        });
      };
      requestAnimationFrame(updatePosition);
    };

    const currentContainer = container.current;
    if (!currentContainer) return;

    glowElements.current = [
      ...currentContainer.parentElement.querySelectorAll('.glow'),
      ...currentContainer.querySelectorAll('.glow')
    ];

    currentContainer.addEventListener('mousemove', handleMouseMove);
    return () => currentContainer.removeEventListener('mousemove', handleMouseMove);
  }, []);
  

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        // animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        exit={{ x: -50, opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}

        className=" bg-[#ffffff21] rounded-2xl p-1 relative !overflow-hidden pointer-events-auto group">
        {/* Outer glow */}
        <div
          className="glow w-[15em] h-[15em] rounded-full blur-3xl absolute  transition-opacity duration-200 group-hover:opacity-50 "
          style={{
            backgroundColor: color,
            transform: "translate3d(50%, 50%, 0)",
            willChange: "transform",
            transition: "opacity 0.4s ease",
          }}
        ></div>

        <div
          ref={container}
          className={`w-full h-full ${className}!relative overflow-hidden`}
        >
          {/* Inner glow */}
          <div
            className="glow w-[90%] z-[1] h-[80%] rounded-full blur-2xl absolute opacity-0 transition-opacity duration-200 group-hover:opacity-40"
            style={{
              backgroundColor: withOpacity(color, 0.3),
              transform: "translate3d(50%, 50%, 0)",
              willChange: "transform",
              transition: "opacity 0.2s ease",
            }}
          ></div>


          {children}

        </div>
      </motion.div>
    </AnimatePresence>

  );
}