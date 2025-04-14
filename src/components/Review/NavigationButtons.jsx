"use client"

import { motion } from "framer-motion"

const NavigationButtons = ({ handlePrev, handleNext, isAnimating, reviewsCount }) => {
  // Button hover animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  }

  const isDisabled = isAnimating || reviewsCount < 3

  // Path animation variants
  const pathVariants = {
    initial: {
      fill: isDisabled ? "#FFFFFF" : "#FD6F00",
    },
    animate: {
      fill: isDisabled ? "#FFFFFF" : ["#FD6F00", "#FF9F4A", "#FD6F00"],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    hover: {
      fill: "#FF9F4A",
    },
  }

  return (
    <>
      <motion.button
        onClick={handlePrev}
        className="absolute -left-0 top-1/2 -translate-y-1/2 z-50"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={isDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            variants={pathVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
          />
        </svg>
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute -right-0 top-1/2 -translate-y-1/2 z-50"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={isDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            variants={pathVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
          />
        </svg>
      </motion.button>
    </>
  )
}

export default NavigationButtons
