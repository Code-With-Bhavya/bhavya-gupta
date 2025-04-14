"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const ReviewCard = ({ review, cardPosition, direction, isAnimating, animateCenter }) => {
  const { formattedDate, formattedTime } = formatDate(review.date)
  const isCenter = cardPosition === "center"
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // Reset animation flag when card becomes center or when transitionId changes
  useEffect(() => {
    if (isCenter) {
      setShouldAnimate(false)
      // Small delay to ensure state updates before triggering animation
      setTimeout(() => {
        setShouldAnimate(true)
      }, 50)
    }
  }, [isCenter, review.transitionId]) // Use transitionId instead of loopedIndex

  // Card position and style variants based on position
  const getCardStyles = () => {
    // Center card
    if (cardPosition === "center") {
      return {
        scale: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        zIndex: 50,
        x: 0,
        height: "459px",
      }
    }
    // Left card
    else if (cardPosition === "left") {
      return {
        scale: 0.9,
        y: 20,
        rotate: -3.74,
        filter: "blur(1.5px)",
        zIndex: 10,
        x: -200,
        height: "391px",
      }
    }
    // Right card
    else {
      return {
        scale: 0.9,
        y: 20,
        rotate: 3.74,
        filter: "blur(1.5px)",
        zIndex: 10,
        x: 200,
        height: "391px",
      }
    }
  }

  const cardStyle = getCardStyles()

  // Glow effect animation
  const glowVariants = {
    initial: {
      opacity: 0.3,
      rotate: -40.71,
    },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      rotate: [-40.71, -38, -40.71],
      transition: {
        opacity: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        },
      },
    },
  }

  // Card animation variants
  const cardVariants = {
    initial: (direction) => ({
      ...cardStyle,
      x:
        direction > 0
          ? cardPosition === "right"
            ? 1000
            : cardPosition === "center"
              ? 200
              : -200
          : direction < 0
            ? cardPosition === "left"
              ? -1000
              : cardPosition === "center"
                ? -200
                : 200
            : cardStyle.x,
      opacity: direction === 0 ? 0 : 1,
    }),
    animate: {
      ...cardStyle,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 1,
      },
    },
    exit: (direction) => ({
      ...cardStyle, // Keep the original card style properties during exit
      x:
        direction > 0
          ? cardPosition === "left"
            ? -1000
            : cardPosition === "center"
              ? -200
              : 200
          : cardPosition === "right"
            ? 1000
            : cardPosition === "center"
              ? 200
              : -200,
      opacity: cardPosition === "left" || cardPosition === "right" ? 0 : 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 22,
      },
    }),
    hover: isCenter
      ? {
          scale: 1.05,
          y: -10,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }
      : {},
    tap: isCenter
      ? {
          scale: 0.98,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }
      : {},
  }

  // Content animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  }

  const avatarVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      },
    },
  }

  const nameVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4,
        duration: 0.3,
      },
    },
  }

  const verifyVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }),
  }

  const reviewTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.3,
      },
    },
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.3,
      },
    },
  }

  const glowBarVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 0.6,
      scaleX: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      key={`${review.id || review.loopedIndex}-${cardPosition}`}
      custom={direction}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      className={`px-4 py-7 flex flex-col justify-between w-[398.06px] rounded-2xl border-2 border-[#333333] bg-[#0E1016] absolute`}
      style={{
        transformOrigin: cardPosition === "left" ? "right bottom" : cardPosition === "right" ? "left bottom" : "center",
        height: cardStyle.height,
      }}
      data-card-position={cardPosition}
    >
      <motion.div
        className="absolute -top-10 left-[40%] w-[69px] h-[545px] bg-[#d9d9d930]"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        style={{
          filter: "blur(50px)",
          background: "linear-gradient(180deg, rgba(253,111,0,0.2) 0%, rgba(217,217,217,0.1) 100%)",
        }}
      />

      {/* Card content with animations for the center card */}
      <div className="flex flex-col h-full justify-between">
        <motion.header
          className="flex items-center gap-4"
          variants={headerVariants}
          initial={isCenter && shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <motion.div
            variants={avatarVariants}
            initial={isCenter && shouldAnimate ? "hidden" : "visible"}
            animate="visible"
          >
            <Image
              src={review.picture || "/placeholder.svg"}
              alt={review.name}
              width={100}
              height={100}
              className="rounded-full w-[3.25rem] h-[3.25rem] border-2 border-[#333333]"
            />
          </motion.div>
          <div>
            <div className="flex gap-2 items-center">
              <motion.h2
                className="font-semibold leading-9 text-2xl"
                variants={nameVariants}
                initial={isCenter && shouldAnimate ? "hidden" : "visible"}
                animate="visible"
              >
                {review.name}
              </motion.h2>
              <motion.img
                src="/verify.svg"
                alt="verify"
                variants={verifyVariants}
                initial={isCenter && shouldAnimate ? "hidden" : "visible"}
                animate="visible"
              />
            </div>
            <div className="flex gap-1 justify-center items-center w-fit">
              {[...Array(Number.parseInt(review.star || 0))].map((_, i) => (
                <motion.img
                  src="/star.svg"
                  key={i}
                  alt="star"
                  custom={i}
                  variants={starVariants}
                  initial={isCenter && shouldAnimate ? "hidden" : "visible"}
                  animate="visible"
                />
              ))}
            </div>
          </div>
        </motion.header>

        <motion.div
          className="text-white font-normal leading-7 tracking-wider mt-4"
          variants={reviewTextVariants}
          initial={isCenter && shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          {review.review}
        </motion.div>

        <motion.footer
          className="text-[#FD6F00] mt-4"
          variants={footerVariants}
          initial={isCenter && shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          Posted on {formattedDate} · {formattedTime}
        </motion.footer>
      </div>

      {isCenter && (
        <motion.div
          className="absolute -bottom-2 left-0 right-0 mx-auto w-[80%] h-[10px] bg-[#FD6F00]"
          variants={glowBarVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
          style={{
            borderRadius: "10px",
            filter: "blur(8px)",
            transformOrigin: "center",
          }}
        />
      )}

      {/* Particle effects for center card */}
      {isCenter && (
        <>
          <motion.div
            className="absolute -right-4 top-1/4 w-2 h-2 rounded-full bg-[#FD6F00]"
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -left-4 top-2/3 w-3 h-3 rounded-full bg-[#FD6F00]"
            animate={{
              x: [0, -15, 0],
              y: [0, 15, 0],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}
    </motion.div>
  )
}

// Helper function
function formatDate(dateString) {
  if (!dateString) return { formattedDate: "Unknown date", formattedTime: "Unknown time" }

  const dateObj = new Date(dateString)

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return { formattedDate, formattedTime }
}

export default ReviewCard
