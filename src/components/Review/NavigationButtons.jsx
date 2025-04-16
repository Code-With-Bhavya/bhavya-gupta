"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import {getPathVariants, buttonVariants} from "../functions"

const NavigationButtons = ({ handlePrev, handleNext, isAnimating, reviewsCount }) => {

  const isDisabled = useMemo(() => isAnimating || reviewsCount <= 1, [isAnimating, reviewsCount])
  const pathVariants = useMemo(() => getPathVariants(isDisabled), [isDisabled])

  return (
    <>
      <motion.button
        onClick={handlePrev}
        className="absolute -left-0 top-1/2 -translate-y-1/2 z-[51]"
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
        className="absolute -right-0 top-1/2 -translate-y-1/2 z-[51]"
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
