"use client"

import { motion } from "framer-motion"

const BackgroundElements = () => {
  return (
    <motion.div
      className="absolute w-full h-full top-0 left-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute blur-[100px] top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#FD6F00]"
        initial={{ opacity: 0.03 }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute blur-[120px] bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#FD6F00]"
        initial={{ opacity: 0.02 }}
        animate={{
          opacity: [0.02, 0.04, 0.02],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  )
}

export default BackgroundElements
